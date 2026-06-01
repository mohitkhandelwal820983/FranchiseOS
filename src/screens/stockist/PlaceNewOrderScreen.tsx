import React, {useMemo, useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  Search,
  ShoppingCart,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;
const rs = (value: number) => Math.round(value * scale);

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  color: string;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product A',
    sku: 'PRD-A',
    price: 500,
    stock: 248,
    color: '#173CFF',
  },
  {
    id: '2',
    name: 'Product B',
    sku: 'PRD-B',
    price: 900,
    stock: 110,
    color: '#138A36',
  },
  {
    id: '3',
    name: 'Product C',
    sku: 'PRD-C',
    price: 1200,
    stock: 72,
    color: '#F06419',
  },
];

const PlaceNewOrderScreen = () => {
  const navigation = useNavigation<any>();
  const [customer, setCustomer] = useState('');
  const [search, setSearch] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(
    '123 Business Park, Jaipur Road,\nMumbai, Maharashtra - 400001',
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 1,
    '2': 0,
    '3': 0,
  });

  const selectedProducts = useMemo(() => {
    return mockProducts.filter(item => (quantities[item.id] || 0) > 0);
  }, [quantities]);

  const subtotal = useMemo(() => {
    return selectedProducts.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0);
    }, 0);
  }, [selectedProducts, quantities]);

  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mockProducts.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query),
    );
  }, [search]);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#061B66" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#FFFFFF" size={rs(22)} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Place New Order</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <ShoppingCart color="#FFFFFF" size={rs(22)} strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Customer</Text>

        <View style={styles.inputBox}>
          <Search color="#5D607E" size={rs(16)} />
          <TextInput
            value={customer}
            onChangeText={setCustomer}
            placeholder="Search or select customer"
            placeholderTextColor="#8A8CA0"
            style={styles.input}
          />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.customerChip}>
          <Text style={styles.customerChipText}>Customer 1</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Products</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productSearchBox}>
          <Search color="#5D607E" size={rs(15)} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search product"
            placeholderTextColor="#8A8CA0"
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
                <Minus color="#173CFF" size={rs(14)} strokeWidth={2.4} />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => updateQuantity(item.id, 'plus')}
                style={styles.qtyButton}>
                <Plus color="#173CFF" size={rs(14)} strokeWidth={2.4} />
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

        <TouchableOpacity activeOpacity={0.85} style={styles.orderButton} onPress={placeOrder}>
          <CheckCircle2 color="#FFFFFF" size={rs(18)} />
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
    backgroundColor: '#F8F9FD',
  },
  header: {
    height: rs(52),
    backgroundColor: '#061B66',
    paddingHorizontal: rs(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: rs(15),
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: rs(14),
    paddingBottom: rs(28),
  },
  label: {
    color: '#111327',
    fontSize: rs(12),
    fontWeight: '800',
    marginBottom: rs(7),
  },
  inputBox: {
    height: rs(42),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(12),
  },
  input: {
    flex: 1,
    marginLeft: rs(8),
    color: '#111327',
    fontSize: rs(12),
    paddingVertical: 0,
  },
  customerChip: {
    alignSelf: 'flex-start',
    height: rs(25),
    backgroundColor: '#061B66',
    borderRadius: rs(4),
    paddingHorizontal: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rs(8),
    marginBottom: rs(18),
  },
  customerChipText: {
    color: '#FFFFFF',
    fontSize: rs(11),
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '900',
  },
  showAllText: {
    color: '#173CFF',
    fontSize: rs(11),
    fontWeight: '800',
  },
  productSearchBox: {
    height: rs(38),
    borderWidth: 1,
    borderColor: '#D9DCE8',
    backgroundColor: '#FFFFFF',
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
    fontSize: rs(12),
    color: '#111327',
    paddingVertical: 0,
  },
  productRow: {
    minHeight: rs(58),
    backgroundColor: '#FFFFFF',
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
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '900',
  },
  productStock: {
    color: '#138A36',
    fontSize: rs(11),
    fontWeight: '600',
    marginTop: rs(4),
  },
  qtyButton: {
    width: rs(26),
    height: rs(26),
    borderWidth: 1,
    borderColor: '#B8C8FF',
    borderRadius: rs(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    width: rs(28),
    textAlign: 'center',
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '900',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(7),
    padding: rs(12),
    marginTop: rs(10),
    marginBottom: rs(16),
  },
  summaryTitle: {
    color: '#111327',
    fontSize: rs(13),
    fontWeight: '900',
    marginBottom: rs(10),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rs(8),
  },
  summaryText: {
    color: '#5D607E',
    fontSize: rs(12),
    fontWeight: '600',
  },
  summaryAmount: {
    color: '#111327',
    fontSize: rs(12),
    fontWeight: '800',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEF0F6',
    paddingTop: rs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#111327',
    fontSize: rs(14),
    fontWeight: '900',
  },
  totalAmount: {
    color: '#173CFF',
    fontSize: rs(15),
    fontWeight: '900',
  },
  addressBox: {
    minHeight: rs(70),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DCE8',
    borderRadius: rs(6),
    padding: rs(10),
    marginBottom: rs(16),
  },
  addressInput: {
    color: '#111327',
    fontSize: rs(12),
    fontWeight: '600',
    padding: 0,
    textAlignVertical: 'top',
  },
  orderButton: {
    height: rs(46),
    backgroundColor: '#061B66',
    borderRadius: rs(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: rs(14),
    fontWeight: '900',
    marginLeft: rs(8),
  },
});