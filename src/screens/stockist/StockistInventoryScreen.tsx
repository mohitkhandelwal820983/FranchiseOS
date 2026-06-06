import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertTriangle,
  Barcode,
  Box,
  Clock3,
  FilePlus2,
  History,
  Link2,
  Menu,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
  IndianRupee,
  RotateCw,
} from 'lucide-react-native';
import {
  InventoryFilter,
  InventoryProduct,
  InventorySummary,
  ProductStatus,
  StockistInventoryData,
} from '../../api/mock/stockist/stockistInventory.mock';
import { getStockistInventory } from '../../api/stockist/stockistInventory.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, size as rs, textSize as fs } from '../../theme';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color={colors.white} size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Inventory</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Barcode color={colors.white} size={rs(34)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const SearchBar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.searchBox}>
      <Search color={colors.slateText} size={rs(28)} strokeWidth={2.1} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search product, SKU or barcode"
        placeholderTextColor={colors.slateText}
        style={styles.searchInput}
      />
    </View>
  );
};

const FilterChips = ({
  active,
  onChange,
}: {
  active: InventoryFilter;
  onChange: (filter: InventoryFilter) => void;
}) => {
  const filters: InventoryFilter[] = [
    'All',
    'Low Stock',
    'Out of Stock',
    'Fast Moving',
    'Expiring Soon',
    'High Value',
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map(item => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => onChange(item)}
            style={[styles.filterChip, isActive && styles.activeFilterChip]}
          >
            <Text
              style={[
                styles.filterText,
                isActive && styles.activeFilterText,
                item === 'Low Stock' && !isActive && styles.orangeText,
                item === 'Out of Stock' && !isActive && styles.redText,
                item === 'Fast Moving' && !isActive && styles.greenText,
                item === 'Expiring Soon' && !isActive && styles.purpleText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const SummaryCard = ({ data }: { data: InventorySummary }) => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryItem}>
        <View style={styles.summaryIconSoft}>
          <Box color={colors.financeBlue} size={rs(34)} strokeWidth={2.3} />
        </View>
        <View>
          <Text style={styles.summaryValue}>{data.products}</Text>
          <Text style={styles.summaryLabel}>Products</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIconSoft, styles.greenSoft]}>
          <IndianRupee color={colors.success} size={rs(34)} strokeWidth={2.3} />
        </View>
        <View>
          <Text style={styles.summaryValueGreen}>{data.stockValue}</Text>
          <Text style={styles.summaryLabel}>stock value</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={[styles.summaryIconSoft, styles.orangeSoft]}>
          <AlertTriangle color={colors.profileOrange} size={rs(34)} strokeWidth={2.3} />
        </View>
        <View>
          <Text style={styles.summaryValueOrange}>{data.lowStockAlerts}</Text>
          <Text style={styles.summaryLabel}>low stock alerts</Text>
        </View>
      </View>
    </View>
  );
};

const StatusBadge = ({ status }: { status: ProductStatus }) => {
  const isFast = status === 'Fast Moving';
  const isLow = status === 'Low Stock';
  const isOut = status === 'Out of Stock';
  const isExpiring = status === 'Expiring Soon';

  return (
    <View
      style={[
        styles.statusBadge,
        isFast && styles.fastBadge,
        isLow && styles.lowBadge,
        isOut && styles.outBadge,
        isExpiring && styles.expireBadge,
      ]}
    >
      {isFast && <Text style={styles.fastBadgeText}>↗ {status}</Text>}
      {isLow && <Text style={styles.lowBadgeText}>⚠ {status}</Text>}
      {isOut && <Text style={styles.outBadgeText}>{status}</Text>}
      {isExpiring && <Text style={styles.expireBadgeText}>{status}</Text>}
    </View>
  );
};

const StockProgress = ({ value, color }: { value: number; color: string }) => {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${value}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{value}%</Text>
    </View>
  );
};

const StatBlock = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
};

const FastMovingCard = ({ item }: { item: InventoryProduct }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productMain}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>

            <View style={styles.skuRow}>
              <Text style={styles.skuText}>SKU: {item.sku}</Text>
              <Text style={styles.dotText}>•</Text>
              <Text style={styles.skuText}>{item.warehouse}</Text>
              <Link2 color={colors.slateText} size={rs(16)} strokeWidth={2.1} />
            </View>
          </View>

          <StatusBadge status={item.status} />
        </View>

        <View style={styles.productBodyRow}>
          <View style={styles.leftStockArea}>
            <View style={styles.statsRow}>
              <StatBlock
                label="Available"
                value={item.available}
                color={colors.success}
              />
              <StatBlock
                label="Reserved"
                value={item.reserved}
                color={colors.financeBlue}
              />
              <StatBlock
                label="Incoming"
                value={item.incoming}
                color={colors.purple}
              />
            </View>

            <StockProgress value={item.progress} color={colors.success} />
          </View>

          <View style={styles.salesDivider} />

          <View style={styles.soldBlock}>
            <Text style={styles.soldIcon}>↗</Text>
            <Text style={styles.soldNumber}>{item.soldThisWeek}</Text>
            <Text style={styles.soldText}>sold this week</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
            <SlidersHorizontal color={colors.financeBlue} size={rs(22)} />
            <Text style={styles.actionText}>Adjust</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
            <RotateCw color={colors.financeBlue} size={rs(22)} />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
            <History color={colors.financeBlue} size={rs(22)} />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const LowStockCard = ({ item }: { item: InventoryProduct }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productMain}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.skuRow}>
              <Text style={styles.skuText}>SKU: {item.sku}</Text>
              <Text style={styles.dotText}>•</Text>
              <Text style={styles.skuText}>{item.warehouse}</Text>
              <Link2 color={colors.slateText} size={rs(16)} strokeWidth={2.1} />
            </View>
          </View>

          <StatusBadge status={item.status} />
        </View>

        <View style={styles.lowStockBody}>
          <View style={styles.lowLeft}>
            <View style={styles.warningBox}>
              <AlertTriangle color={colors.profileOrange} size={rs(19)} strokeWidth={2.2} />
              <Text style={styles.warningText}>{item.alertText}</Text>
            </View>

            <View style={styles.statsRow}>
              <StatBlock
                label="Available"
                value={item.available}
                color={colors.profileOrange}
              />
              <StatBlock
                label="Reserved"
                value={item.reserved}
                color={colors.financeBlue}
              />
              <StatBlock
                label="Incoming"
                value={item.incoming}
                color={colors.purple}
              />
            </View>

            <StockProgress value={item.progress} color={colors.profileOrange} />
          </View>

          <View style={styles.reorderBox}>
            <Text style={styles.reorderTitle}>Suggested reorder:</Text>
            <Text style={styles.reorderSub}>{item.suggestedReorder}</Text>

            <TouchableOpacity activeOpacity={0.8} style={styles.purchaseButton}>
              <Text style={styles.purchaseButtonText}>
                Create Purchase Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const OutOfStockCard = ({ item }: { item: InventoryProduct }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productMain}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.skuRow}>
              <Text style={styles.skuText}>SKU: {item.sku}</Text>
              <Text style={styles.dotText}>•</Text>
              <Text style={styles.skuText}>{item.warehouse}</Text>
              <Link2 color={colors.slateText} size={rs(16)} strokeWidth={2.1} />
            </View>
          </View>

          <StatusBadge status={item.status} />
        </View>

        <View style={styles.outWarningBox}>
          <Text style={styles.outWarningTitle}>⊗ {item.alertText}</Text>
          <Text style={styles.outWarningSub}>{item.alertSubText}</Text>
        </View>

        <View style={styles.outActionRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.urgentButton}>
            <ShoppingCart color={colors.white} size={rs(22)} />
            <Text style={styles.urgentButtonText}>Urgent Restock</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.notifyButton}>
            <AlertTriangle color={colors.dangerDark} size={rs(22)} />
            <Text style={styles.notifyButtonText}>Notify Dealers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ExpiringCard = ({ item }: { item: InventoryProduct }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productMain}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.skuRow}>
              <Text style={styles.skuText}>SKU: {item.sku}</Text>
              <Text style={styles.dotText}>•</Text>
              <Text style={styles.skuText}>{item.warehouse}</Text>
              <Link2 color={colors.slateText} size={rs(16)} strokeWidth={2.1} />
            </View>
          </View>

          <StatusBadge status={item.status} />
        </View>

        <View style={styles.expiringBody}>
          <View style={styles.expiringLeft}>
            <View style={styles.expireAlertBox}>
              <Clock3 color={colors.purple} size={rs(20)} />
              <View>
                <Text style={styles.expireTitle}>{item.alertText}</Text>
                <Text style={styles.expireSub}>{item.alertSubText}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatBlock
                label="Available"
                value={item.available}
                color={colors.purple}
              />
              <StatBlock
                label="Reserved"
                value={item.reserved}
                color={colors.financeBlue}
              />
              <StatBlock
                label="Incoming"
                value={item.incoming}
                color={colors.purple}
              />
            </View>

            <StockProgress value={item.progress} color={colors.purple} />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.createOfferButton}
            >
              <Text style={styles.createOfferText}>Create Offer</Text>
            </TouchableOpacity>
          </View>

          <QuickMenu />
        </View>
      </View>
    </View>
  );
};

const QuickMenu = () => {
  const items = [
    { id: '1', title: 'Add Product', icon: 'box' },
    { id: '2', title: 'Stock Adjustment', icon: 'adjust' },
    { id: '3', title: 'Warehouse Transfer', icon: 'truck' },
    { id: '4', title: 'Bulk Upload CSV', icon: 'file' },
  ];

  return (
    <View style={styles.quickMenu}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.quickMenuRow}
        >
          {item.icon === 'box' && <Box color={colors.financeBlue} size={rs(25)} />}
          {item.icon === 'adjust' && (
            <SlidersHorizontal color={colors.financeBlue} size={rs(25)} />
          )}
          {item.icon === 'truck' && <Truck color={colors.financeBlue} size={rs(25)} />}
          {item.icon === 'file' && <FilePlus2 color={colors.financeBlue} size={rs(25)} />}
          <Text style={styles.quickMenuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ProductCard = ({ item }: { item: InventoryProduct }) => {
  if (item.status === 'Fast Moving') {
    return <FastMovingCard item={item} />;
  }

  if (item.status === 'Low Stock') {
    return <LowStockCard item={item} />;
  }

  if (item.status === 'Out of Stock') {
    return <OutOfStockCard item={item} />;
  }

  return <ExpiringCard item={item} />;
};

const StockistInventoryScreen = () => {
  const [data, setData] = useState<StockistInventoryData | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<InventoryFilter>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const response = await getStockistInventory();

      setData(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unable to load stockist inventory. Please try again.';

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.products.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.warehouse.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'All' ||
        item.status === activeFilter ||
        (activeFilter === 'High Value' && item.available * 1000 > 100000);

      return matchesSearch && matchesFilter;
    });
  }, [data, search, activeFilter]);

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <ActivityIndicator size="large" color={colors.financeBlue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar value={search} onChangeText={setSearch} />

        <FilterChips active={activeFilter} onChange={setActiveFilter} />

        <SummaryCard data={data.summary} />

        {filteredProducts.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockistInventoryScreen;

const PAGE_PADDING = rs(22);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.financeBackground,
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: colors.financeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(82),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(30),
    paddingTop: rs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(22),
    paddingBottom: rs(110),
  },
  searchBox: {
    height: rs(62),
    borderWidth: 1,
    borderColor: colors.stockistInputBorder,
    borderRadius: rs(11),
    backgroundColor: colors.white,
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  searchInput: {
    flex: 1,
    marginLeft: rs(16),
    color: colors.text,
    fontSize: fs(18),
    fontFamily: fonts.medium,
    paddingVertical: 0,
  },
  filterContent: {
    paddingBottom: rs(18),
  },
  filterChip: {
    minWidth: rs(116),
    height: rs(50),
    borderWidth: 1,
    borderColor: colors.stockistInputBorder,
    borderRadius: rs(25),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(10),
    paddingHorizontal: rs(18),
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.primaryText,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  activeFilterText: {
    color: colors.white,
  },
  orangeText: {
    color: colors.profileOrange,
  },
  redText: {
    color: colors.dangerDark,
  },
  greenText: {
    color: colors.success,
  },
  purpleText: {
    color: colors.purple,
  },
  summaryCard: {
    height: rs(105),
    backgroundColor: colors.white,
    borderRadius: rs(8),
    paddingHorizontal: rs(28),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(22),
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIconSoft: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(32),
    backgroundColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(22),
  },
  greenSoft: {
    backgroundColor: colors.successLight,
  },
  orangeSoft: {
    backgroundColor: colors.stockistOrangeSoft,
  },
  summaryValue: {
    color: colors.primaryText,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
    letterSpacing: rs(4),
  },
  summaryValueGreen: {
    color: colors.success,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
    letterSpacing: rs(4),
  },
  summaryValueOrange: {
    color: colors.profileOrange,
    fontSize: fs(31),
    fontFamily: fonts.extraBold,
  },
  summaryLabel: {
    color: colors.text,
    fontSize: fs(15),
    fontFamily: fonts.bold,
    marginTop: rs(8),
  },
  summaryDivider: {
    width: 1,
    height: rs(60),
    backgroundColor: colors.stockistInputBorder,
    marginHorizontal: rs(18),
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: rs(10),
    padding: rs(18),
    marginBottom: rs(16),
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: rs(14),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 3,
  },
  productImage: {
    width: rs(145),
    height: rs(120),
    borderRadius: rs(7),
    backgroundColor: colors.stockistImageBg,
    marginRight: rs(26),
  },
  productMain: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    color: colors.text,
    fontSize: fs(25),
    fontFamily: fonts.extraBold,
  },
  skuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(11),
  },
  skuText: {
    color: colors.slateText,
    fontSize: fs(17),
    fontFamily: fonts.semiBold,
    marginRight: rs(10),
  },
  dotText: {
    color: colors.slateText,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
    marginRight: rs(10),
  },
  statusBadge: {
    minWidth: rs(118),
    height: rs(34),
    borderRadius: rs(6),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(12),
  },
  fastBadge: {
    backgroundColor: colors.successLight,
    borderColor: colors.successBorder,
  },
  lowBadge: {
    backgroundColor: colors.stockistOrangeSoft,
    borderColor: colors.orangeBorder,
  },
  outBadge: {
    backgroundColor: colors.dangerLight,
    borderColor: colors.dangerBorder,
  },
  expireBadge: {
    backgroundColor: colors.purpleSoft,
    borderColor: colors.stockistPurpleBorder,
  },
  fastBadgeText: {
    color: colors.success,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  lowBadgeText: {
    color: colors.profileOrange,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  outBadgeText: {
    color: colors.dangerDark,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  expireBadgeText: {
    color: colors.purple,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  productBodyRow: {
    flexDirection: 'row',
    marginTop: rs(28),
  },
  leftStockArea: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBlock: {
    width: '31%',
  },
  statLabel: {
    color: colors.slateText,
    fontSize: fs(14),
    fontFamily: fonts.semiBold,
  },
  statValue: {
    fontSize: fs(23),
    fontFamily: fonts.extraBold,
    marginTop: rs(6),
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(18),
  },
  progressTrack: {
    flex: 1,
    height: rs(10),
    backgroundColor: colors.dealerProgressTrack,
    borderRadius: rs(8),
    overflow: 'hidden',
  },
  progressFill: {
    height: rs(10),
    borderRadius: rs(8),
  },
  progressText: {
    color: colors.primaryText,
    fontSize: fs(17),
    fontFamily: fonts.extraBold,
    marginLeft: rs(16),
  },
  salesDivider: {
    width: 1,
    height: rs(78),
    backgroundColor: colors.stockistInputBorder,
    marginHorizontal: rs(28),
  },
  soldBlock: {
    width: rs(145),
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldIcon: {
    color: colors.success,
    fontSize: fs(28),
    fontFamily: fonts.extraBold,
  },
  soldNumber: {
    color: colors.primaryText,
    fontSize: fs(28),
    fontFamily: fonts.extraBold,
  },
  soldText: {
    color: colors.text,
    fontSize: fs(15),
    fontFamily: fonts.semiBold,
    marginTop: rs(5),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(28),
  },
  actionButton: {
    width: '32%',
    height: rs(50),
    borderWidth: 1,
    borderColor: colors.stockistInputBorder,
    borderRadius: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionText: {
    color: colors.financeBlue,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  lowStockBody: {
    flexDirection: 'row',
    marginTop: rs(24),
  },
  lowLeft: {
    flex: 1,
    marginRight: rs(24),
  },
  warningBox: {
    height: rs(48),
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    backgroundColor: colors.stockistWarningBg,
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    marginBottom: rs(16),
  },
  warningText: {
    color: colors.profileOrange,
    fontSize: fs(18),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  reorderBox: {
    width: rs(220),
    backgroundColor: colors.stockistPanelBg,
    borderRadius: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
    padding: rs(14),
  },
  reorderTitle: {
    color: colors.text,
    fontSize: fs(16),
    fontFamily: fonts.bold,
  },
  reorderSub: {
    color: colors.profileOrange,
    fontSize: fs(15),
    fontFamily: fonts.bold,
    marginTop: rs(10),
    marginBottom: rs(18),
  },
  purchaseButton: {
    width: '100%',
    height: rs(45),
    backgroundColor: colors.financeBlue,
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: colors.white,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  outWarningBox: {
    minHeight: rs(82),
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    backgroundColor: colors.stockistDangerSoft,
    borderRadius: rs(6),
    paddingHorizontal: rs(18),
    justifyContent: 'center',
    marginTop: rs(24),
  },
  outWarningTitle: {
    color: colors.dangerDark,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
  },
  outWarningSub: {
    color: colors.text,
    fontSize: fs(15),
    fontFamily: fonts.semiBold,
    marginTop: rs(8),
  },
  outActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(24),
  },
  urgentButton: {
    width: '49%',
    height: rs(50),
    backgroundColor: colors.dangerDark,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentButtonText: {
    color: colors.white,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  notifyButton: {
    width: '49%',
    height: rs(50),
    borderWidth: 1,
    borderColor: colors.dangerDark,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyButtonText: {
    color: colors.dangerDark,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
    marginLeft: rs(12),
  },
  expiringBody: {
    flexDirection: 'row',
    marginTop: rs(24),
  },
  expiringLeft: {
    flex: 1,
    marginRight: rs(24),
  },
  expireAlertBox: {
    minHeight: rs(82),
    borderWidth: 1,
    borderColor: colors.stockistPurpleBorder,
    backgroundColor: colors.stockistPurpleSoft,
    borderRadius: rs(6),
    paddingHorizontal: rs(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
    gap: rs(12),
  },
  expireTitle: {
    color: colors.purple,
    fontSize: fs(20),
    fontFamily: fonts.extraBold,
  },
  expireSub: {
    color: colors.text,
    fontSize: fs(15),
    fontFamily: fonts.semiBold,
    marginTop: rs(6),
  },
  createOfferButton: {
    width: rs(310),
    height: rs(48),
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(26),
  },
  createOfferText: {
    color: colors.purple,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
  },
  quickMenu: {
    width: rs(245),
    backgroundColor: colors.white,
    borderRadius: rs(10),
    paddingVertical: rs(12),
    paddingHorizontal: rs(18),
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowRadius: rs(16),
    shadowOffset: { width: 0, height: rs(7) },
    elevation: 8,
  },
  quickMenuRow: {
    height: rs(54),
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickMenuText: {
    color: colors.text,
    fontSize: fs(16),
    fontFamily: fonts.extraBold,
    marginLeft: rs(18),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(30),
    bottom: rs(86),
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    backgroundColor: colors.financeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: { width: 0, height: rs(5) },
    elevation: 10,
  },
});
