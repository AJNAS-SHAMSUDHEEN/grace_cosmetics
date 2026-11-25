import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, OrderStatus, Coupon, CartItem, Address, PaymentMethod, PaymentStatus } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Firestore } from 'firebase/firestore';

interface ShopContextType {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  // Product actions (Admin)
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleStock: (id: string) => void;
  // Order actions
  placeOrder: (data: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    couponCode?: string;
    notes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getUserOrders: (userId?: string, email?: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  // Coupon actions
  applyCoupon: (code: string, subtotal: number) => { valid: boolean; discountAmount: number; message: string };
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  // Analytics
  analytics: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    processingOrdersCount: number;
  };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_PRODUCTS_KEY = 'grace_custom_products';
const LOCAL_ORDERS_KEY = 'grace_store_orders';
const LOCAL_COUPONS_KEY = 'grace_store_coupons';

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GRACE10',
    discountPercent: 10,
    minOrder: 25,
    description: '10% off on all authentic skincare orders above $25',
    isActive: true,
  },
  {
    code: 'GLOW20',
    discountPercent: 20,
    minOrder: 50,
    description: '20% off on luxury glowing routines over $50',
    isActive: true,
  },
  {
    code: 'WELCOME15',
    discountPercent: 15,
    minOrder: 30,
    description: '15% off first order for new Grace Beauty members',
    isActive: true,
  },
];

// Pre-seeded Demo Orders
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'GBS-98241',
    userId: 'cust-101',
    customerName: 'Aisha Sharma',
    customerEmail: 'aisha.sharma@example.com',
    customerPhone: '+91 91234 56789',
    shippingAddress: {
      id: 'addr-cust-1',
      fullName: 'Aisha Sharma',
      phone: '+91 91234 56789',
      streetAddress: '702 Lotus Boulevard, Marine Drive',
      apartment: 'Tower B, 7th Floor',
      city: 'Kochi',
      state: 'Kerala',
      postalCode: '682011',
      country: 'India',
      isDefault: true,
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Abib Glutathiosome Pad
        quantity: 1,
      },
      {
        product: INITIAL_PRODUCTS[1], // Abib Glutathiosome Serum
        quantity: 1,
      },
    ],
    subtotal: 58,
    shippingFee: 0,
    discount: 5.8,
    total: 52.2,
    paymentMethod: 'card_test',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    couponCode: 'GRACE10',
    createdAt: '2026-11-20T10:14:00.000Z',
    updatedAt: '2026-11-23T15:30:00.000Z',
    estimatedDelivery: 'Nov 23, 2026',
  },
  {
    id: 'ord-1002',
    orderNumber: 'GBS-98315',
    userId: 'cust-101',
    customerName: 'Aisha Sharma',
    customerEmail: 'aisha.sharma@example.com',
    customerPhone: '+91 91234 56789',
    shippingAddress: {
      id: 'addr-cust-1',
      fullName: 'Aisha Sharma',
      phone: '+91 91234 56789',
      streetAddress: '702 Lotus Boulevard, Marine Drive',
      apartment: 'Tower B, 7th Floor',
      city: 'Kochi',
      state: 'Kerala',
      postalCode: '682011',
      country: 'India',
      isDefault: true,
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Anua Azelaic Acid 10+
        quantity: 1,
      },
      {
        product: INITIAL_PRODUCTS[8], // Beauty of Joseon Relief Sun
        quantity: 2,
      },
    ],
    subtotal: 56,
    shippingFee: 0,
    discount: 0,
    total: 56.0,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'shipped',
    createdAt: '2026-11-24T08:30:00.000Z',
    updatedAt: '2026-11-24T16:00:00.000Z',
    estimatedDelivery: 'Nov 27, 2026',
  },
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (seeded from default catalogue + custom products)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COUPONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Sync coupons to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_COUPONS_KEY, JSON.stringify(coupons));
    } catch (e) {
      console.warn('Failed to save coupons to localStorage', e);
    }
  }, [coupons]);

  // Firestore sync if configured
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      const firestore = db;
      const fetchFirebaseOrders = async () => {
        try {
          const q = query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const remoteOrders: Order[] = [];
            snapshot.forEach((docSnap) => {
              remoteOrders.push({ id: docSnap.id, ...docSnap.data() } as Order);
            });
            setOrders(remoteOrders);
          }
        } catch (e) {
          console.warn('Could not sync orders from Firestore', e);
        }
      };
      fetchFirebaseOrders();
    }
  }, []);

  // Admin Product Actions
  const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const id = 'prod-' + Date.now();
    const newProduct: Product = {
      ...productData,
      id,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      inStock: productData.inStock !== false,
      stockCount: productData.stockCount ?? 50,
      activeCompounds: productData.activeCompounds || [],
      usageDirections: productData.usageDirections || 'Apply gently onto clean face morning and evening.',
      skinType: productData.skinType || ['All Skin Types'],
      texture: productData.texture || 'Silky Liquid',
    };

    setProducts((prev) => [newProduct, ...prev]);

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db as Firestore, 'products'), newProduct);
      } catch (e) {
        console.warn('Error saving to Firestore:', e);
      }
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

    if (isFirebaseConfigured && db) {
      try {
        const prodRef = doc(db as Firestore, 'products', id);
        await updateDoc(prodRef, updates);
      } catch (e) {
        console.warn('Error updating in Firestore:', e);
      }
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, inStock: p.inStock === false ? true : false } : p
      )
    );
  };

  // Order Placement
  const placeOrder = async (data: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    couponCode?: string;
    notes?: string;
  }): Promise<Order> => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `GBS-${randomSuffix}`;
    const id = `ord-${Date.now()}`;
    const now = new Date();
    
    // Delivery estimated 3-5 days ahead
    const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      id,
      orderNumber,
      userId: data.userId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
      items: data.items,
      subtotal: data.subtotal,
      shippingFee: data.shippingFee,
      discount: data.discount,
      total: data.total,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      orderStatus: 'processing',
      couponCode: data.couponCode,
      notes: data.notes,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      estimatedDelivery,
    };

    setOrders((prev) => [newOrder, ...prev]);

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db as Firestore, 'orders'), newOrder);
      } catch (e) {
        console.warn('Failed to add order to Firestore:', e);
      }
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    const updatedAt = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status, updatedAt } : o))
    );

    if (isFirebaseConfigured && db) {
      try {
        const orderRef = doc(db as Firestore, 'orders', orderId);
        await updateDoc(orderRef, { orderStatus: status, updatedAt });
      } catch (e) {
        console.warn('Failed to update status in Firestore:', e);
      }
    }
  };

  const getUserOrders = (userId?: string, email?: string): Order[] => {
    return orders.filter((o) => {
      if (userId && o.userId === userId) return true;
      if (email && o.customerEmail.toLowerCase() === email.toLowerCase()) return true;
      return false;
    });
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Coupons
  const applyCoupon = (
    code: string,
    subtotal: number
  ): { valid: boolean; discountAmount: number; message: string } => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === clean && c.isActive);

    if (!found) {
      return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < found.minOrder) {
      return {
        valid: false,
        discountAmount: 0,
        message: `This coupon requires a minimum subtotal of $${found.minOrder}.`,
      };
    }

    const discountAmount = Number(((subtotal * found.discountPercent) / 100).toFixed(2));
    return {
      valid: true,
      discountAmount,
      message: `Coupon applied: ${found.discountPercent}% off (-$${discountAmount})`,
    };
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
  };

  // KPI Analytics
  const analytics = {
    totalRevenue: Number(
      orders
        .filter((o) => o.orderStatus !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0)
        .toFixed(2)
    ),
    totalOrders: orders.length,
    totalProducts: products.length,
    processingOrdersCount: orders.filter((o) => o.orderStatus === 'processing').length,
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        orders,
        coupons,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        placeOrder,
        updateOrderStatus,
        getUserOrders,
        getOrderById,
        applyCoupon,
        addCoupon,
        deleteCoupon,
        analytics,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
