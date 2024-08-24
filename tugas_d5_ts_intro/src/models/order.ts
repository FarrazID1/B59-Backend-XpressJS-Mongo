//TODO 3: use interface to define Object => Order
export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'shipped' | 'delivered';
}
