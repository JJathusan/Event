// src/lib/store.ts

export interface OrderItem {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

export interface EventBooking {
  id: string;
  userId: string;
  eventTitle: string;
  eventDate: string;
  eventDescription?: string;
  vendorName: string;
  guests: number;
  budget: string;
  status: "pending" | "confirmed" | "cancelled";
}

// ---- SAMPLE DATA (you can replace anytime) ----

const orders: Order[] = [
  {
    id: "order123",
    userId: "user1",
    createdAt: new Date().toISOString(),
    status: "processing",
    total: 150,
    items: [
      {
        id: "item1",
        name: "Handmade Necklace",
        vendor: "Craft Studio",
        category: "Accessories",
        price: 50,
        quantity: 1,
        image: "https://placehold.co/100x100",
      },
      {
        id: "item2",
        name: "Wooden Sculpture",
        vendor: "Artisan Woodworks",
        category: "Decor",
        price: 100,
        quantity: 1,
        image: "https://placehold.co/100x100",
      },
    ],
  },
];

const bookings: EventBooking[] = [
  {
    id: "book001",
    userId: "user1",
    eventTitle: "Wedding Photography",
    eventDate: "2025-12-20",
    vendorName: "Dream Studio",
    guests: 150,
    budget: "$2000",
    status: "confirmed",
  },
];

// ---- FUNCTIONS THAT DASHBOARD USES ----

export function getCustomerOrders(userId: string): Order[] {
  return orders.filter((order) => order.userId === userId);
}

export function getCustomerBookings(userId: string): EventBooking[] {
  return bookings.filter((booking) => booking.userId === userId);
}
