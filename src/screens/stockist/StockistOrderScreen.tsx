import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
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
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  Edit3,
  Filter,
  Home,
  IndianRupee,
  MapPin,
  Menu,
  Mic,
  MoreVertical,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Truck,
  User,
  X,
  Box,
  AlertTriangle,
  Clock3,
  Warehouse,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import { DealerOrder, DealerStatus, MainTab, PurchaseOrder, PurchaseStatus, StepItem, StockistOrdersData } from '../../api/mock/stockist/stockistOrders.mock';
import { getStockistOrders } from '../../api/stockist/stockistOrders.api';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);
const fs = (value: number) => rs(value + 3);





const Header = ({activeTab}: {activeTab: MainTab}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8}>
        <Menu color="#FFFFFF" size={rs(36)} strokeWidth={2.5} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        {activeTab === 'dealer' ? 'Orders' : 'Purchase Orders'}
      </Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Filter color="#FFFFFF" size={rs(36)} strokeWidth={2.4} />
      </TouchableOpacity>
    </View>
  );
};

const MainTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}) => {
  return (
    <View style={styles.mainTabs}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setActiveTab('dealer')}
        style={[
          styles.mainTabButton,
          activeTab === 'dealer' && styles.activeMainTab,
        ]}>
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'dealer' && styles.activeMainTabText,
          ]}>
          Dealer Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setActiveTab('purchase')}
        style={[
          styles.mainTabButton,
          activeTab === 'purchase' && styles.activeMainTab,
        ]}>
        <Text
          style={[
            styles.mainTabText,
            activeTab === 'purchase' && styles.activeMainTabText,
          ]}>
          Purchase Orders
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchBox = ({
  value,
  onChangeText,
  activeTab,
}: {
  value: string;
  onChangeText: (text: string) => void;
  activeTab: MainTab;
}) => {
  return (
    <View style={styles.searchBox}>
      <Search color="#5D607E" size={rs(28)} strokeWidth={2.1} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={
          activeTab === 'dealer'
            ? 'Search order ID, dealer, company or product'
            : 'Search PO ID, company, product or SKU'
        }
        placeholderTextColor="#5D607E"
        style={styles.searchInput}
      />

      {activeTab === 'purchase' && (
        <Mic color="#5D607E" size={rs(24)} strokeWidth={2.1} />
      )}
    </View>
  );
};

const StatusFilters = ({
  activeTab,
  dealerStatus,
  purchaseStatus,
  setDealerStatus,
  setPurchaseStatus,
}: {
  activeTab: MainTab;
  dealerStatus: DealerStatus;
  purchaseStatus: PurchaseStatus;
  setDealerStatus: (status: DealerStatus) => void;
  setPurchaseStatus: (status: PurchaseStatus) => void;
}) => {
  const dealerTabs: DealerStatus[] = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const purchaseTabs: PurchaseStatus[] = [
    'All',
    'Pending',
    'Approved',
    'In Transit',
    'Delivered',
    'Cancelled',
  ];

  const tabs = activeTab === 'dealer' ? dealerTabs : purchaseTabs;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}>
      {tabs.map(tab => {
        const active =
          activeTab === 'dealer'
            ? dealerStatus === tab
            : purchaseStatus === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.85}
            onPress={() => {
              if (activeTab === 'dealer') {
                setDealerStatus(tab as DealerStatus);
              } else {
                setPurchaseStatus(tab as PurchaseStatus);
              }
            }}
            style={[styles.statusChip, active && styles.activeStatusChip]}>
            <Text
              style={[
                styles.statusChipText,
                active && styles.activeStatusChipText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const SummaryBar = ({
  data,
  activeTab,
}: {
  data: StockistOrdersData;
  activeTab: MainTab;
}) => {
  const items =
    activeTab === 'dealer'
      ? [
          {
            label: 'Total Orders',
            value: data.dealerSummary.totalOrders,
            icon: 'orders',
            color: '#173CFF',
          },
          {
            label: 'Order Value',
            value: data.dealerSummary.orderValue,
            icon: 'rupee',
            color: '#138A36',
          },
          {
            label: 'Pending Approvals',
            value: data.dealerSummary.pendingApprovals,
            icon: 'user',
            color: '#F06419',
          },
          {
            label: 'Dispatch Today',
            value: data.dealerSummary.dispatchToday,
            icon: 'truck',
            color: '#7B22EA',
          },
        ]
      : [
          {
            label: 'Total POs',
            value: data.purchaseSummary.totalPOs,
            icon: 'orders',
            color: '#7B22EA',
          },
          {
            label: 'PO Value',
            value: data.purchaseSummary.poValue,
            icon: 'rupee',
            color: '#138A36',
          },
          {
            label: 'Pending Approval',
            value: data.purchaseSummary.pendingApproval,
            icon: 'clock',
            color: '#F06419',
          },
          {
            label: 'In Transit',
            value: data.purchaseSummary.inTransit,
            icon: 'truck',
            color: '#173CFF',
          },
        ];

  return (
    <View style={styles.summaryBar}>
      {items.map((item, index) => (
        <View key={item.label} style={styles.summaryItem}>
          <View style={[styles.summaryIcon, {backgroundColor: item.color}]}>
            {item.icon === 'orders' && (
              <ClipboardList color="#FFFFFF" size={rs(27)} />
            )}
            {item.icon === 'rupee' && (
              <IndianRupee color="#FFFFFF" size={rs(28)} />
            )}
            {item.icon === 'user' && <User color="#FFFFFF" size={rs(28)} />}
            {item.icon === 'truck' && <Truck color="#FFFFFF" size={rs(28)} />}
            {item.icon === 'clock' && <Clock3 color="#FFFFFF" size={rs(28)} />}
          </View>

          <View>
            <Text style={[styles.summaryValue, {color: item.color}]}>
              {item.value}
            </Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>

          {index !== items.length - 1 && <View style={styles.summaryDivider} />}
        </View>
      ))}
    </View>
  );
};

const StatusBadge = ({
  text,
  color,
  bg,
}: {
  text: string;
  color: string;
  bg: string;
}) => {
  return (
    <View style={[styles.badgePill, {backgroundColor: bg, borderColor: color}]}>
      <Text style={[styles.badgePillText, {color}]}>{text}</Text>
    </View>
  );
};

const OrderIcon = ({item}: {item: DealerOrder}) => {
  return (
    <View style={[styles.orderIcon, {backgroundColor: item.iconBg}]}>
      {item.icon === 'approval' && (
        <ClipboardList color="#FFFFFF" size={rs(30)} />
      )}
      {item.icon === 'dispatch' && <Truck color="#FFFFFF" size={rs(30)} />}
      {item.icon === 'delivered' && (
        <CheckCircle2 color="#FFFFFF" size={rs(32)} />
      )}
    </View>
  );
};

const StepTimeline = ({steps}: {steps: StepItem[]}) => {
  return (
    <View style={styles.timelineRow}>
      {steps.map((step, index) => {
        const done = step.status === 'done';
        const active = step.status === 'active';

        return (
          <React.Fragment key={step.id}>
            <View style={styles.stepBlock}>
              <View
                style={[
                  styles.stepCircle,
                  done && styles.doneStep,
                  active && styles.activeStep,
                ]}>
                {done && <CheckCircle2 color="#FFFFFF" size={rs(18)} />}
                {active && <Text style={styles.activeStepText}>⌛</Text>}
              </View>

              <View>
                <Text style={styles.stepLabel}>{step.label}</Text>
                {!!step.sub && <Text style={styles.stepSub}>{step.sub}</Text>}
              </View>
            </View>

            {index !== steps.length - 1 && <View style={styles.dashedLine} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const DealerOrderCard = ({
  item,
  onApprove,
  onReject,
  onDispatch,
}: {
  item: DealerOrder;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDispatch: (id: string) => void;
}) => {
  const isPending = item.status === 'Pending';
  const isReady = item.status === 'Ready Dispatch';
  const isDelivered = item.status === 'Delivered';

  return (
    <View
      style={[
        styles.orderCard,
        isPending && {borderLeftColor: '#F06419'},
        isReady && {borderLeftColor: '#173CFF'},
        isDelivered && {borderLeftColor: '#138A36'},
      ]}>
      <View style={styles.orderHeader}>
        <OrderIcon item={item} />

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDealer}>{item.dealer}</Text>
          <Text style={styles.orderMeta}>{item.meta}</Text>
        </View>

        <View style={styles.orderRight}>
          <StatusBadge
            text={item.status}
            color={item.statusColor}
            bg={item.statusBg}
          />
        </View>

        <ChevronRight color="#061247" size={rs(26)} strokeWidth={2.4} />
      </View>

      {!isDelivered && (
        <>
          <View style={styles.orderMetrics}>
            {!!item.products && (
              <View style={styles.metricBox}>
                <Box color="#5D607E" size={rs(24)} />
                <Text style={styles.metricText}>{item.products}</Text>
              </View>
            )}

            {!!item.units && (
              <View style={styles.metricBox}>
                <Package color="#5D607E" size={rs(24)} />
                <Text style={styles.metricText}>{item.units}</Text>
              </View>
            )}

            <View style={styles.metricBox}>
              <Text style={styles.metricAmount}>{item.amount}</Text>
              <Text style={styles.metricSub}>{item.amountLabel}</Text>
            </View>

            {!!item.warehouse && (
              <View style={styles.metricBox}>
                <Text style={styles.metricAmount}>{item.warehouse}</Text>
                <Text style={styles.metricSub}>Warehouse</Text>
              </View>
            )}
          </View>

          <StepTimeline steps={item.steps} />
        </>
      )}

      {isDelivered && (
        <View style={styles.paidBox}>
          <Text style={styles.paidText}>Paid Full  ✅</Text>
        </View>
      )}

      {isPending && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onApprove(item.id)}
            style={styles.primaryAction}>
            <CheckCircle2 color="#FFFFFF" size={rs(20)} />
            <Text style={styles.primaryActionText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onReject(item.id)}
            style={styles.dangerOutlineAction}>
            <X color="#E00014" size={rs(20)} />
            <Text style={styles.dangerOutlineText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <ChevronRight color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {isReady && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onDispatch(item.id)}
            style={styles.primaryAction}>
            <Truck color="#FFFFFF" size={rs(20)} />
            <Text style={styles.primaryActionText}>Dispatch Now</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <ClipboardList color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Invoice PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <ChevronRight color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Track</Text>
          </TouchableOpacity>
        </View>
      )}

      {isDelivered && (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineActionWide}>
            <RefreshCw color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Repeat Order</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineActionWide}>
            <Download color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const SectionTitle = ({
  title,
  count,
  color,
}: {
  title: string;
  count: string;
  color: string;
}) => {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionLine, {backgroundColor: color}]} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.countBadge, {backgroundColor: color}]}>
        <Text style={styles.countBadgeText}>{count}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All</Text>
        <ChevronRight color="#173CFF" size={rs(20)} />
      </TouchableOpacity>
    </View>
  );
};

const PurchaseIcon = ({item}: {item: PurchaseOrder}) => {
  return (
    <View style={[styles.orderIcon, {backgroundColor: item.iconBg}]}>
      {item.icon === 'supplier' && <Home color="#FFFFFF" size={rs(32)} />}
      {item.icon === 'truck' && <Truck color="#FFFFFF" size={rs(32)} />}
      {item.icon === 'warning' && (
        <AlertTriangle color="#E00014" size={rs(34)} strokeWidth={2.4} />
      )}
    </View>
  );
};

const PurchaseOrderCard = ({
  item,
  onCancel,
}: {
  item: PurchaseOrder;
  onCancel: (id: string) => void;
}) => {
  const delayed = item.status === 'Delayed';

  return (
    <View style={styles.purchaseCard}>
      <View style={styles.orderHeader}>
        <PurchaseIcon item={item} />

        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDealer}>{item.supplier}</Text>
          <Text style={[styles.orderMeta, delayed && styles.redText]}>
            {item.subtitle}
          </Text>
        </View>

        <StatusBadge
          text={item.status}
          color={item.statusColor}
          bg={item.statusBg}
        />

        <MoreVertical color="#061247" size={rs(26)} />
      </View>

      {!delayed && (
        <>
          <View style={styles.purchaseMetrics}>
            <View style={styles.purchaseMetric}>
              <Box color="#5D607E" size={rs(26)} />
              <Text style={styles.metricText}>{item.skus || item.cartons}</Text>
            </View>

            <View style={styles.purchaseMetric}>
              <Package color="#5D607E" size={rs(26)} />
              <Text style={styles.metricText}>{item.units}</Text>
            </View>

            <View style={styles.purchaseMetric}>
              <Text style={styles.metricAmount}>{item.amount}</Text>
              <Text style={styles.metricSub}>Est. Value</Text>
            </View>

            {!!item.lowStock && (
              <View style={styles.purchaseMetric}>
                <AlertTriangle color="#F06419" size={rs(26)} />
                <Text style={styles.metricAmount}>{item.lowStock}</Text>
                <Text style={styles.metricSub}>Low Stock Items</Text>
              </View>
            )}
          </View>

          <StepTimeline steps={item.steps} />
        </>
      )}

      {delayed && (
        <>
          <View style={styles.delayBoxes}>
            <View style={styles.delayBoxRed}>
              <Clock3 color="#E00014" size={rs(22)} />
              <Text style={styles.delayTextRed}>{item.delayed}</Text>
            </View>

            <View style={styles.delayBoxOrange}>
              <AlertTriangle color="#F06419" size={rs(22)} />
              <Text style={styles.delayTextOrange}>{item.impact}</Text>
            </View>
          </View>

          <View style={styles.aiBox}>
            <Text style={styles.aiIcon}>✦</Text>
            <Text style={styles.aiText}>
              <Text style={styles.aiTitle}>AI Suggestion:{'\n'}</Text>
              {item.aiSuggestion}
            </Text>
          </View>
        </>
      )}

      {item.status === 'Approval Pending' && (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <Edit3 color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Edit PO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onCancel(item.id)}
            style={styles.dangerOutlineAction}>
            <X color="#E00014" size={rs(20)} />
            <Text style={styles.dangerOutlineText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.primaryAction}>
            <ChevronRight color="#FFFFFF" size={rs(20)} />
            <Text style={styles.primaryActionText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'In Transit' && (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <MapPin color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Track Shipment</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <Warehouse color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Warehouse Prepare</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.outlineAction}>
            <Download color="#173CFF" size={rs(20)} />
            <Text style={styles.outlineActionText}>Download GRN</Text>
          </TouchableOpacity>
        </View>
      )}

      {delayed && (
        <View style={styles.actionRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.dangerOutlineAction}>
            <Phone color="#E00014" size={rs(20)} />
            <Text style={styles.dangerOutlineText}>Contact Supplier</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.purpleOutlineAction}>
            <RefreshCw color="#7B22EA" size={rs(20)} />
            <Text style={styles.purpleOutlineText}>Alternative Vendor</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.dangerOutlineAction}>
            <AlertTriangle color="#E00014" size={rs(20)} />
            <Text style={styles.dangerOutlineText}>Escalate</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const CreatePurchaseButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.createPOButton}>
      <Plus color="#FFFFFF" size={rs(28)} />
      <Text style={styles.createPOText}>Create Purchase Order</Text>
    </TouchableOpacity>
  );
};

const FloatingButton = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.floatingButton}
      onPress={() => navigation.navigate('PlaceNewOrder')}>
      <Plus color="#FFFFFF" size={rs(38)} strokeWidth={2.4} />
    </TouchableOpacity>
  );
};

const StockistOrderScreen = () => {
  const [data, setData] = useState<StockistOrdersData | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('dealer');
  const [search, setSearch] = useState('');
  const [dealerStatus, setDealerStatus] = useState<DealerStatus>('All');
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getStockistOrders();
      setData(response);
    } catch (error) {
      console.log('Stockist Orders API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredDealerOrders = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.dealerOrders.filter(item => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.dealer.toLowerCase().includes(query) ||
        item.meta.toLowerCase().includes(query);

      const normalizedStatus =
        item.status === 'Ready Dispatch' ? 'Processing' : item.status;

      const matchesStatus =
        dealerStatus === 'All' || normalizedStatus === dealerStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, dealerStatus]);

  const filteredPurchaseOrders = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.purchaseOrders.filter(item => {
      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query);

      const normalizedStatus =
        item.status === 'Approval Pending'
          ? 'Pending'
          : item.status === 'Delayed'
          ? 'Pending'
          : item.status;

      const matchesStatus =
        purchaseStatus === 'All' || normalizedStatus === purchaseStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, purchaseStatus]);

  const updateDealerOrder = (id: string, nextStatus: DealerOrder['status']) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      dealerOrders: data.dealerOrders.map(item =>
        item.id === id
          ? {
              ...item,
              status: nextStatus,
              statusColor:
                nextStatus === 'Delivered'
                  ? '#138A36'
                  : nextStatus === 'Ready Dispatch'
                  ? '#173CFF'
                  : '#F06419',
              statusBg:
                nextStatus === 'Delivered'
                  ? '#EAF8EC'
                  : nextStatus === 'Ready Dispatch'
                  ? '#F1F5FF'
                  : '#FFF3E9',
              icon:
                nextStatus === 'Delivered'
                  ? 'delivered'
                  : nextStatus === 'Ready Dispatch'
                  ? 'dispatch'
                  : 'approval',
              iconBg:
                nextStatus === 'Delivered'
                  ? '#138A36'
                  : nextStatus === 'Ready Dispatch'
                  ? '#173CFF'
                  : '#F06419',
            }
          : item,
      ),
    });
  };

  const cancelPurchaseOrder = (id: string) => {
    if (!data) {
      return;
    }

    setData({
      ...data,
      purchaseOrders: data.purchaseOrders.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'Cancelled',
              statusColor: '#E00014',
              statusBg: '#FFF0F0',
            }
          : item,
      ),
    });
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.loaderScreen}>
        <StatusBar backgroundColor="#061B66" barStyle="light-content" />
        <ActivityIndicator size="large" color="#173CFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <Header activeTab={activeTab} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <MainTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <SearchBox
          value={search}
          onChangeText={setSearch}
          activeTab={activeTab}
        />

        <StatusFilters
          activeTab={activeTab}
          dealerStatus={dealerStatus}
          purchaseStatus={purchaseStatus}
          setDealerStatus={setDealerStatus}
          setPurchaseStatus={setPurchaseStatus}
        />

        <SummaryBar data={data} activeTab={activeTab} />

        {activeTab === 'dealer' ? (
          <>
            <SectionTitle title="Dealer Orders" count="142" color="#173CFF" />

            {filteredDealerOrders.map(item => (
              <DealerOrderCard
                key={item.id}
                item={item}
                onApprove={id => updateDealerOrder(id, 'Ready Dispatch')}
                onReject={id => updateDealerOrder(id, 'Cancelled')}
                onDispatch={id => updateDealerOrder(id, 'Delivered')}
              />
            ))}

            <SectionTitle title="Purchase Orders" count="48" color="#7B22EA" />

            {data.purchaseOrders.slice(0, 1).map(item => (
              <PurchaseOrderCard
                key={item.id}
                item={item}
                onCancel={cancelPurchaseOrder}
              />
            ))}
          </>
        ) : (
          <>
            {filteredPurchaseOrders.map(item => (
              <PurchaseOrderCard
                key={item.id}
                item={item}
                onCancel={cancelPurchaseOrder}
              />
            ))}

            <CreatePurchaseButton />
          </>
        )}
      </ScrollView>

      {activeTab === 'dealer' && <FloatingButton />}
    </SafeAreaView>
  );
};

export default StockistOrderScreen;

const PAGE_PADDING = rs(28);

const styles = StyleSheet.create({
  summaryBar: {
  minHeight: rs(112),
  borderRadius: rs(8),
  backgroundColor: '#FFFFFF',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: rs(24),
  paddingVertical: rs(12),
  shadowColor: '#000000',
  shadowOpacity: 0.04,
  shadowRadius: rs(12),
  shadowOffset: {width: 0, height: rs(5)},
  elevation: 3,
},

summaryItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: rs(6),
  position: 'relative',
},

summaryIcon: {
  width: rs(50),
  height: rs(50),
  borderRadius: rs(25),
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: rs(8),
},

summaryValue: {
  fontSize: fs(22),
  fontWeight: '900',
  textAlign: 'center',
},

summaryLabel: {
  color: '#5D607E',
  fontSize: fs(11),
  fontWeight: '700',
  marginTop: rs(5),
  textAlign: 'center',
  lineHeight: fs(14),
},

summaryDivider: {
  position: 'absolute',
  right: 0,
  width: 1,
  height: rs(70),
  backgroundColor: '#D9DCE8',
},
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  loaderScreen: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: rs(78),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(28),
    paddingTop: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fs(30),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: rs(22),
    paddingBottom: rs(120),
  },
  mainTabs: {
    height: rs(54),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    flexDirection: 'row',
    marginBottom: rs(18),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  mainTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMainTab: {
    backgroundColor: '#061B66',
  },
  mainTabText: {
    color: '#5D607E',
    fontSize: fs(18),
    fontWeight: '800',
  },
  activeMainTabText: {
    color: '#FFFFFF',
  },
  searchBox: {
    height: rs(62),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(8),
    paddingHorizontal: rs(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(18),
  },
  searchInput: {
    flex: 1,
    color: '#111327',
    fontSize: fs(18),
    fontWeight: '500',
    paddingVertical: 0,
    marginLeft: rs(16),
  },
  filterRow: {
    paddingBottom: rs(18),
  },
  statusChip: {
    minWidth: rs(112),
    height: rs(46),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(7),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(20),
    paddingHorizontal: rs(14),
  },
  activeStatusChip: {
    backgroundColor: '#061B66',
    borderColor: '#061B66',
  },
  statusChipText: {
    color: '#061247',
    fontSize: fs(15),
    fontWeight: '800',
  },
  activeStatusChipText: {
    color: '#FFFFFF',
  },
 
  sectionTitleRow: {
    height: rs(52),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    width: rs(3),
    height: rs(36),
    borderRadius: rs(2),
    marginRight: rs(18),
  },
  sectionTitle: {
    color: '#111327',
    fontSize: fs(24),
    fontWeight: '900',
    marginRight: rs(10),
  },
  countBadge: {
    minWidth: rs(42),
    height: rs(28),
    borderRadius: rs(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(8),
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: fs(14),
    fontWeight: '900',
  },
  viewAllButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#173CFF',
    fontSize: fs(16),
    fontWeight: '800',
    marginRight: rs(8),
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(9),
    borderLeftWidth: rs(4),
    padding: rs(20),
    marginBottom: rs(16),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  purchaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(9),
    padding: rs(20),
    marginBottom: rs(18),
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIcon: {
    width: rs(58),
    height: rs(58),
    borderRadius: rs(29),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rs(18),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: '#061247',
    fontSize: fs(25),
    fontWeight: '900',
  },
  orderDealer: {
    color: '#111327',
    fontSize: fs(16),
    fontWeight: '900',
    marginTop: rs(6),
  },
  orderMeta: {
    color: '#5D607E',
    fontSize: fs(14),
    fontWeight: '600',
    marginTop: rs(8),
  },
  orderRight: {
    marginRight: rs(16),
  },
  badgePill: {
    minWidth: rs(130),
    height: rs(32),
    borderRadius: rs(5),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rs(10),
  },
  badgePillText: {
    fontSize: fs(14),
    fontWeight: '800',
  },
  orderMetrics: {
    height: rs(74),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(18),
  },
  purchaseMetrics: {
    height: rs(72),
    borderWidth: 1,
    borderColor: '#EEF0F6',
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(20),
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEF0F6',
    flexDirection: 'row',
  },
  purchaseMetric: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEF0F6',
    flexDirection: 'row',
  },
  metricText: {
    color: '#111327',
    fontSize: fs(15),
    fontWeight: '800',
    marginLeft: rs(10),
  },
  metricAmount: {
    color: '#111327',
    fontSize: fs(19),
    fontWeight: '900',
    textAlign: 'center',
  },
  metricSub: {
    color: '#5D607E',
    fontSize: fs(12),
    fontWeight: '700',
    marginTop: rs(5),
    marginLeft: rs(6),
  },
  timelineRow: {
    minHeight: rs(60),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(16),
  },
  stepBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: rs(22),
    height: rs(22),
    borderRadius: rs(11),
    borderWidth: 2,
    borderColor: '#8A8CA0',
    marginRight: rs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneStep: {
    backgroundColor: '#138A36',
    borderColor: '#138A36',
  },
  activeStep: {
    borderColor: '#F06419',
  },
  activeStepText: {
    color: '#F06419',
    fontSize: fs(13),
  },
  stepLabel: {
    color: '#111327',
    fontSize: fs(12),
    fontWeight: '800',
  },
  stepSub: {
    color: '#5D607E',
    fontSize: fs(11),
    marginTop: rs(5),
  },
  dashedLine: {
    width: rs(70),
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8A8CA0',
    marginHorizontal: rs(12),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(16),
  },
  primaryAction: {
    width: '31%',
    height: rs(42),
    backgroundColor: '#173CFF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  outlineAction: {
    width: '31%',
    height: rs(42),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionWide: {
    width: '49%',
    height: rs(42),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineActionText: {
    color: '#173CFF',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  dangerOutlineAction: {
    width: '31%',
    height: rs(42),
    borderWidth: 1,
    borderColor: '#FFB6B6',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dangerOutlineText: {
    color: '#E00014',
    fontSize: fs(15),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  purpleOutlineAction: {
    width: '31%',
    height: rs(42),
    borderWidth: 1,
    borderColor: '#D8B8FF',
    borderRadius: rs(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  purpleOutlineText: {
    color: '#7B22EA',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
  paidBox: {
    height: rs(34),
    minWidth: rs(100),
    backgroundColor: '#EAF8EC',
    borderRadius: rs(5),
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(18),
    paddingHorizontal: rs(12),
  },
  paidText: {
    color: '#138A36',
    fontSize: fs(13),
    fontWeight: '900',
  },
  redText: {
    color: '#E00014',
  },
  delayBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(22),
  },
  delayBoxRed: {
    width: '49%',
    height: rs(50),
    backgroundColor: '#FFF0F0',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delayBoxOrange: {
    width: '49%',
    height: rs(50),
    backgroundColor: '#FFF3E9',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delayTextRed: {
    color: '#E00014',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  delayTextOrange: {
    color: '#A34900',
    fontSize: fs(14),
    fontWeight: '900',
    marginLeft: rs(10),
  },
  aiBox: {
    minHeight: rs(62),
    backgroundColor: '#F8F1FF',
    borderWidth: 1,
    borderColor: '#E3CCFF',
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(18),
    marginTop: rs(16),
  },
  aiIcon: {
    color: '#7B22EA',
    fontSize: fs(28),
    fontWeight: '900',
    marginRight: rs(14),
  },
  aiText: {
    color: '#111327',
    fontSize: fs(14),
    fontWeight: '600',
  },
  aiTitle: {
    fontWeight: '900',
  },
  createPOButton: {
    height: rs(60),
    backgroundColor: '#173CFF',
    borderRadius: rs(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
  },
  createPOText: {
    color: '#FFFFFF',
    fontSize: fs(22),
    fontWeight: '900',
    marginLeft: rs(12),
  },
  floatingButton: {
    position: 'absolute',
    right: rs(28),
    bottom: rs(88),
    width: rs(72),
    height: rs(72),
    borderRadius: rs(36),
    backgroundColor: '#173CFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: rs(12),
    shadowOffset: {width: 0, height: rs(5)},
    
  },
});