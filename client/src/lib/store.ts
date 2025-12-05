// Global state management with localStorage persistence

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  vendorType?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  vendor: string;
  vendorId: string;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  vendorId: string;
}

export interface EventBooking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  vendorId: string;
  vendorName: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  guests: number;
  budget: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

// Local Storage Keys
const STORAGE_KEYS = {
  USER: 'eventhub_user',
  CART: 'eventhub_cart',
  ORDERS: 'eventhub_orders',
  BOOKINGS: 'eventhub_bookings'
};

// User Management
export const saveUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

// Cart Management
export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem(STORAGE_KEYS.CART);
  return cartData ? JSON.parse(cartData) : [];
};

// Orders Management
export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getOrders = (): Order[] => {
  const ordersData = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return ordersData ? JSON.parse(ordersData) : [];
};

export const addOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
};

export const getVendorOrders = (vendorId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.vendorId === vendorId);
};

export const getCustomerOrders = (customerId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.customerId === customerId);
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId ? { ...order, status } : order
  );
  saveOrders(updatedOrders);
};

// Event Bookings Management
export const saveBookings = (bookings: EventBooking[]) => {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
};

export const getBookings = (): EventBooking[] => {
  const bookingsData = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookingsData ? JSON.parse(bookingsData) : [];
};

export const addBooking = (booking: EventBooking) => {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
};

export const getVendorBookings = (vendorId: string): EventBooking[] => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.vendorId === vendorId);
};

export const getCustomerBookings = (customerId: string): EventBooking[] => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.customerId === customerId);
};

export const updateBookingStatus = (bookingId: string, status: EventBooking['status']) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking =>
    booking.id === bookingId ? { ...booking, status } : booking
  );
  saveBookings(updatedBookings);
};

// Mock data with consistent IDs
export const MOCK_VENDORS = [
  {
    id: 'vendor-hotel-1',
    name: 'Grand Plaza Hotel',
    email: 'contact@grandplaza.com',
    type: 'hotel' as const
  },
  {
    id: 'vendor-crafts-1',
    name: "Potter's Corner",
    email: 'contact@potterscorner.com',
    type: 'crafts' as const
  },
  {
    id: 'vendor-crafts-2',
    name: 'Silver Artisan',
    email: 'contact@silverartisan.com',
    type: 'crafts' as const
  },
  {
    id: 'vendor-crafts-3',
    name: 'Dream Weddings Co',
    email: 'contact@dreamweddings.com',
    type: 'crafts' as const
  },
  {
    id: 'vendor-hotel-2',
    name: 'Riverside Resort',
    email: 'contact@riversideresort.com',
    type: 'hotel' as const
  }
];

export const getVendorById = (vendorId: string) => {
  return MOCK_VENDORS.find(v => v.id === vendorId);
};
