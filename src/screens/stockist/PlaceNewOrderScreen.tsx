import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  Search,
  ShoppingCart,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import { PlaceNewOrderData } from '../../api/mock/stockist/placeNewOrder.mock';
import { getPlaceNewOrder } from '../../api/stockist/placeNewOrder.api';
import { showErrorToast } from '../../utils/toast';
import { colors, fonts, mobileSize as rs, mobileTextSize as fs } from '../../theme';

const PlaceNewOrderScreen = () => {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<PlaceNewOrderData | null>(null);
  const [customer, setCustomer] = useState('');
  const [search, setSearch] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

 const loadPlaceNewOrder = async () => {
  try {
    setLoading(true);

    const response = await getPlaceNewOrder();

    setData(response);
    setCustomer(response.defaultCustomer);
    setDeliveryAddress(response.defaultDeliveryAddress);
    setQuantities(response.defaultQuantities);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Unable to load place new order data. Please try again.';

    showErrorToast(errorMessage);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadPlaceNewOrder();
  }, []);

  const selectedProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.products.filter(item => (quantities[item.id] || 0) > 0);
  }, [data, quantities]);

  const subtotal = useMemo(() => {
    return selectedProducts.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0);
    }, 0);
  }, [selectedProducts, quantities]);

  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const filteredProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    return data.products.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query),
    );
  }, [data, search]);

  const updateQuantity = (id: string, type: 'plus' | 'minus') => {
    setQuantities(prev => {
      const current = prev[id] || 0;

      return {
        ...prev,
        [id]: type === 'plus' ? current + 1 : Math.max(0, current - 1),
      };
    });
  };

  const placeOrder = () => {
    if (!customer.trim()) {
      Alert.alert('Customer required', 'Please select or enter customer name.');
      return;
    }

    if (selectedProducts.length === 0) {
      Alert.alert('Product required', 'Please add at least one product.');
      return;
    }

    Alert.alert('Order Created', 'Your order has been created successfully.', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <View style={styles.loaderScreen}>
          <ActivityIndicator size="large" color={colors.financeBlue} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white} size={rs(22)} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Place New Order</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <ShoppingCart color={colors.white} size={rs(22)} strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Customer</Text>

        <View style={styles.inputBox}>
          <Search color={colors.slateText} size={rs(16)} />
          <TextInput
            value={customer}
            onChangeText={setCustomer}
            placeholder="Search or select customer"
            placeholderTextColor={colors.stockistTimelineGrey}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.customerChip}
          onPress={() => setCustomer('Customer 1')}>
          <Text style={styles.customerChipText}>Customer 1</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Products</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productSearchBox}>
          <Search color={colors.slateText} size={rs(15)} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search product"
            placeholderTextColor={colors.stockistTimelineGrey}
            style={styles.productSearchInput}
          />
        </View>

        {filteredProducts.map(item => {
          const quantity = quantities[item.id] || 0;

          return (
            <View key={item.id} style={styles.productRow}>
              <View style={[styles.productIcon, {backgroundColor: item.color}]} />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productStock}>{item.stock} pcs left</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => updateQuantity(item.id, 'minus')}
                style={styles.qtyButton}>
                <Minus color={colors.financeBlue} size={rs(14)} strokeWidth={2.4} />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => updateQuantity(item.id, 'plus')}
                style={styles.qtyButton}>
                <Plus color={colors.financeBlue} size={rs(14)} strokeWidth={2.4} />
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cart Summary</Text>

          {selectedProducts.map(item => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                {item.name} × {quantities[item.id]}
              </Text>
              <Text style={styles.summaryAmount}>
                ₹{(item.price * quantities[item.id]).toLocaleString('en-IN')}
              </Text>
            </View>
          ))}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tax</Text>
            <Text style={styles.summaryAmount}>₹{tax.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{total.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        <Text style={styles.label}>Delivery Details</Text>

        <View style={styles.addressBox}>
          <TextInput
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
            style={styles.addressInput}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.orderButton}
          onPress={placeOrder}>
          <CheckCircle2 color={colors.white} size={rs(18)} />
          <Text style={styles.orderButtonText}>Submit Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceNewOrderScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.financeBackground,
  },
  header: {
    height: rs(52),
    backgroundColor: colors.primary,
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: rs(14),
    paddingBottom: rs(28),
  },
  label: {
    color: colors.text,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
    marginBottom: rs(7),
  },
  inputBox: {
    height: rs(42),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
  },
  loaderScreen: {
  flex: 1,
  backgroundColor: colors.financeBackground,
  alignItems: 'center',
  justifyContent: 'center',
},
  input: {
    flex: 1,
    marginLeft: rs(8),
    color: colors.text,
    fontSize: fs(12),
    paddingVertical: 0,
  },
  customerChip: {
    alignSelf: 'flex-start',
    height: rs(25),
    backgroundColor: colors.primary,
    borderRadius: rs(4),
    paddingHorizontal: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
    marginBottom: rs(18),
  },
  customerChipText: {
    color: colors.white,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  showAllText: {
    color: colors.financeBlue,
    fontSize: fs(11),
    fontFamily: fonts.extraBold,
  },
  productSearchBox: {
    height: rs(38),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(10),
    marginTop: rs(10),
    marginBottom: rs(10),
  },
  productSearchInput: {
    flex: 1,
    marginLeft: rs(8),
    fontSize: fs(12),
    color: colors.text,
    paddingVertical: 0,
  },
  productRow: {
    minHeight: rs(58),
    backgroundColor: colors.white,
    borderRadius: rs(6),
    paddingHorizontal: rs(10),
    marginBottom: rs(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIcon: {
    width: rs(34),
    height: rs(34),
    borderRadius: rs(5),
    marginRight: rs(10),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  productStock: {
    color: colors.success,
    fontSize: fs(11),
    fontFamily: fonts.semiBold,
    marginTop: rs(4),
  },
  qtyButton: {
    width: rs(26),
    height: rs(26),
    borderWidth: 1,
    borderColor: colors.blueBorderSoft,
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    width: rs(28),
    textAlign: 'center',
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: rs(7),
    padding: rs(12),
    marginTop: rs(10),
    marginBottom: rs(16),
  },
  summaryTitle: {
    color: colors.text,
    fontSize: fs(13),
    fontFamily: fonts.extraBold,
    marginBottom: rs(10),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(8),
  },
  summaryText: {
    color: colors.slateText,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
  },
  summaryAmount: {
    color: colors.text,
    fontSize: fs(12),
    fontFamily: fonts.extraBold,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.financeDivider,
    paddingTop: rs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.text,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
  },
  totalAmount: {
    color: colors.financeBlue,
    fontSize: fs(15),
    fontFamily: fonts.extraBold,
  },
  addressBox: {
    minHeight: rs(70),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: rs(6),
    padding: rs(10),
    marginBottom: rs(16),
  },
  addressInput: {
    color: colors.text,
    fontSize: fs(12),
    fontFamily: fonts.semiBold,
    padding: 0,
    textAlignVertical: 'top',
  },
  orderButton: {
    height: rs(46),
    backgroundColor: colors.primary,
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: colors.white,
    fontSize: fs(14),
    fontFamily: fonts.extraBold,
    marginLeft: rs(8),
  },
});