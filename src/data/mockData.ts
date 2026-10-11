export interface Product {
  id: string;
  name: string;
  category: 'paltas' | 'lacteos' | 'huevos' | 'otros';
  badge?: string;
  badgeType?: 'optimo' | 'regular' | 'diario' | 'especial' | 'bajo' | 'mayorista';
  price: number;
  unit: string;
  cost: number;
  marginPercent: number;
  stock: number;
  stockUnit: string;
  stockLabel: string;
  image: string;
  minStock?: number;
}

export interface SaleItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  total: number;
  image?: string;
}

export interface Sale {
  id: string;
  folio: string;
  clientName: string;
  clientType: string;
  date: string;
  time: string;
  amount: number;
  paymentStatus: 'cobrado' | 'pendiente';
  paymentMethod: 'yape' | 'plin' | 'efectivo' | 'bcp';
  itemsSummary: string;
  items: SaleItem[];
  deliveryPoint: string;
  dueDate?: string;
  creditDays?: number;
  notes?: string;
}

export interface Expense {
  id: string;
  concept: string;
  category: 'flete' | 'insumos' | 'empaques' | 'jornales' | 'mantenimiento';
  categoryLabel: string;
  amount: number;
  date: string;
  time: string;
  receiptType: 'Factura' | 'Boleta' | 'Recibo simple' | 'Sin ticket';
  paymentMethod: 'Yape Empresa' | 'Efectivo' | 'Tarjeta Débito' | 'Plin / Transf.';
  receiptPhoto?: string;
}

export interface Client {
  id: string;
  name: string;
  type: 'bodega' | 'mercado' | 'restaurante' | 'particular';
  typeLabel: string;
  phone: string;
  address: string;
  creditAllowed: boolean;
  creditLimit: number;
  creditUsed: number;
  paymentTermDays: number;
  totalPurchased: number;
  status: 'al_dia' | 'pendiente';
  debtAmount: number;
  debtDescription?: string;
  dueDate?: string;
  lastOrderDate?: string;
  lastOrderDescription?: string;
  frequency: string;
  preferredProduct?: string;
  notes?: string;
  isGold?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Palta Hass Selección',
    category: 'paltas',
    badge: 'Óptimo',
    badgeType: 'optimo',
    price: 8.50,
    unit: 'kg',
    cost: 4.80,
    marginPercent: 43,
    stock: 180,
    stockUnit: 'kg',
    stockLabel: 'Stock en granja',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mE1kIS2FyhNbGkI2jU4SsUDxuQCMDUVqrF7YXlUBomMwwzlTxWlnF2h4MwNf12p8QHY-VtpPP31HTz5e3dRRSTw1KqNSLZZOJtT7W_jvfmPxcNWFwC3Yx3RYK0OGiy1FoMYbpfJydhaQackAsx41Z8iAxtQRUFz2iIhhIbkJBj5UzC5Ji9eSs9lSh4VAwHg4RjI1-BfAjKTlFWi3FNFWkvQBVSfrTUYBEU8CLWi-1DEhyRSDPrMLVA',
    minStock: 25,
  },
  {
    id: 'prod-2',
    name: 'Palta Fuerte de Valle',
    category: 'paltas',
    badge: 'Regular',
    badgeType: 'regular',
    price: 7.00,
    unit: 'kg',
    cost: 4.00,
    marginPercent: 42,
    stock: 95,
    stockUnit: 'kg',
    stockLabel: 'Stock en granja',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCnDEmEc-uAcSRxu9eDDVXvnAjVYPDJ8vlz5Z-EkIjoPl5Mp_B0Y-bAihdYwraMXmoQGUR22xNkPX8lSHRAuPc1BcR4SP1e9d7caXdoCEBc1Hd8UKqJh685BmOvq_kXpea3QzpjMs6cPyMj3q-UH2LriWfx9FtOn0lsweJtXylibpm1Dh_sugKCuVE7u1Wh_5QyH06KFJCKR0JaVRt5Xi_qwKmBX_BPVfcJb54GZKml7cF9rSmdRS79w',
    minStock: 20,
  },
  {
    id: 'prod-3',
    name: 'Queso Fresco Artesanal',
    category: 'lacteos',
    badge: 'Diario',
    badgeType: 'diario',
    price: 27.00,
    unit: 'molde (~1kg)',
    cost: 18.00,
    marginPercent: 33,
    stock: 24,
    stockUnit: 'moldes',
    stockLabel: 'Stock en maduración / cámara',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPHCqpKF93lQzfjJLQwKJAZccy57nDs6y-kKxHqTYbvzs2iqsRdsuV6WVtj0U-0s3YSlV0VUFPtINrnoxksFT6g8Arx0JqSczgmy0SbxytO5GEHinvFEiRZ7vKjA3zwNnOMn57TF7dDPQCXbx7WhWAL8TMLwn9lfqMoveBZryR_yFjQSGh4kWxN8V99cCHhEfLkpkt4uSPjBW2HRt8YUc4miybNUhRpLmD38pDgi8nWtULJk6ITLiYw',
    minStock: 8,
  },
  {
    id: 'prod-4',
    name: 'Queso Andino Madurado',
    category: 'lacteos',
    badge: 'Especial',
    badgeType: 'especial',
    price: 34.00,
    unit: 'molde',
    cost: 22.00,
    marginPercent: 35,
    stock: 12,
    stockUnit: 'moldes',
    stockLabel: 'Stock en cava',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_0Gm5y99wqnUhUcgHoXEKFneoqDAs18_edCsps7uayF_PLgkiBijR7SAhRG5q9Ee_fTc_Kfu11t-pkyFRs_UjECS_q3O0idisCg5x5R-aQt5PxcbjN4lLp-HGEYg73xF6Gj4hJWCEWpKpj2IwbQhlvYtBEgCF-t8ri_7TdgLeHzizwBJLBfFUT33v1nUBN_LsGg106c1AtBuYPrDgtZfxxDa3EvYmoMhfZPN2yidwC5deGSGt98fiDA',
    minStock: 5,
  },
  {
    id: 'prod-5',
    name: 'Huevos de Corral (30 u.)',
    category: 'huevos',
    badge: 'Stock Bajo',
    badgeType: 'bajo',
    price: 18.50,
    unit: 'jaba',
    cost: 13.50,
    marginPercent: 27,
    stock: 4,
    stockUnit: 'jabas',
    stockLabel: 'Stock en postura',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW3GeuqL9TZ6aREAIjM06Nt6bHKhWbCKK0GEXcLAE-_5fSEr4SxyNxSiUPq3g2yN2Jx_wTqo5uAb4G4U2SicRg1RV7Guf-zKG5SFEKnJBhWEUuLLtWWy5WBaT88SXEE0RexmZpHAZh-Ztu9FveC_X93LrXPBzqZix8ge3L-2POU8aJ8Mbo195Ez70nXaEUB9bHj35Q-t7qsot8mmn_k9cqqlBl_JN_pUzQ9I1Mckgqh8xJr5L6wFCPuA',
    minStock: 10,
  },
  {
    id: 'prod-6',
    name: 'Huevos Rosados (Caja 180)',
    category: 'huevos',
    badge: 'Mayorista',
    badgeType: 'mayorista',
    price: 98.00,
    unit: 'caja',
    cost: 72.00,
    marginPercent: 26,
    stock: 15,
    stockUnit: 'cajas',
    stockLabel: 'Stock en bodega',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHCofT1zEgRujWhAmXOdHE1BckilCC6_CAI4bRLjQ6uUax2KDvbEOyYJxZHe1_0n6dHB2AELOsmfFdgLjTQ1D__tjECP2SjMydP6yEb982CCxd6XCGw-Xjjf6u69GbWslrTeqn2iUjfr2QjyAjd8L5DnZB64keTyQCBD2ukYbouYuq4UDmWJlmb-VGgS4M_DTxb9PnWK1vmvzv8Vb0XLbM5fLjbQSStDgCaU7CdKQK0RsiPvD1ZBI80Q',
    minStock: 5,
  },
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Restaurante Sabores del Valle',
    type: 'restaurante',
    typeLabel: 'Mayorista',
    phone: '+51 984 221 094',
    address: 'Av. Los Libertadores 142, Lunahuaná',
    creditAllowed: true,
    creditLimit: 600.00,
    creditUsed: 216.00,
    paymentTermDays: 7,
    totalPurchased: 8450.00,
    status: 'pendiente',
    debtAmount: 216.00,
    debtDescription: '8 moldes de queso mantecoso',
    dueDate: 'Vence en 3 días',
    frequency: 'Semanal (Jueves)',
    preferredProduct: 'Queso madurado y palta',
    notes: 'Jueves temprano (antes de las 9:00 AM) para abastecimiento del fin de semana.',
    isGold: true,
  },
  {
    id: 'cli-2',
    name: 'Sra. Carmen - Feria Dominical',
    type: 'mercado',
    typeLabel: 'Puesto de mercado',
    phone: '+51 952 443 118',
    address: 'Puesto #28 Feria Dominical Central',
    creditAllowed: true,
    creditLimit: 300.00,
    creditUsed: 110.00,
    paymentTermDays: 7,
    totalPurchased: 1980.00,
    status: 'pendiente',
    debtAmount: 110.00,
    debtDescription: '2 Jabas de huevos de corral (60 un.)',
    dueDate: 'Pendiente semanal',
    frequency: 'Semanal (Domingos)',
    preferredProduct: 'Huevos de corral',
    notes: 'Entregar a las 6:30 AM en puerta lateral.',
  },
  {
    id: 'cli-3',
    name: 'Mercado San José - Puesto 14',
    type: 'mercado',
    typeLabel: 'Comercial / Mayorista',
    phone: '+51 977 102 938',
    address: 'Puesto Central de Frutas, Jr. Cañete 420',
    creditAllowed: true,
    creditLimit: 1500.00,
    creditUsed: 0,
    paymentTermDays: 7,
    totalPurchased: 2450.00,
    status: 'al_dia',
    debtAmount: 0,
    lastOrderDate: 'Hoy 08:45 AM',
    lastOrderDescription: '15 Jabas Huevos + 20 kg Palta Hass',
    frequency: 'Martes y Viernes',
    preferredProduct: 'Palta Hass y huevos',
    notes: 'Cliente estrella. Paga puntual por Yape.',
    isGold: true,
  },
  {
    id: 'cli-4',
    name: 'Bodega Don Lucho',
    type: 'bodega',
    typeLabel: 'Bodega local',
    phone: '+51 941 882 105',
    address: 'Calle Real 104, San Vicente',
    creditAllowed: true,
    creditLimit: 400.00,
    creditUsed: 0,
    paymentTermDays: 3,
    totalPurchased: 820.00,
    status: 'al_dia',
    debtAmount: 0,
    lastOrderDate: 'Ayer 04:20 PM',
    lastOrderDescription: '10 kg Palta Hass',
    frequency: 'Jueves',
    preferredProduct: 'Palta Hass y quesos',
    notes: 'Despacho en campo.',
  },
  {
    id: 'cli-5',
    name: 'Doña Martha (Particular)',
    type: 'particular',
    typeLabel: 'Particular',
    phone: '+51 930 112 233',
    address: 'Recoge en portón del fundo',
    creditAllowed: false,
    creditLimit: 100.00,
    creditUsed: 0,
    paymentTermDays: 0,
    totalPurchased: 310.00,
    status: 'al_dia',
    debtAmount: 0,
    lastOrderDate: '23 Oct',
    lastOrderDescription: 'Huevos de campo',
    frequency: 'Quincenal',
    preferredProduct: 'Huevos de campo y palta',
    notes: 'Entrega directa.',
  },
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-0412',
    folio: '#0412',
    clientName: 'Mercado San José - Puesto 14',
    clientType: 'Mayorista',
    date: 'Hoy, 24 Oct',
    time: '08:45 AM',
    amount: 995.00,
    paymentStatus: 'cobrado',
    paymentMethod: 'yape',
    itemsSummary: '15 Jabas Huevos de corral + 20 kg Palta Hass',
    deliveryPoint: 'Puesto Central de Frutas, Jr. Cañete 420',
    items: [
      {
        productId: 'prod-5',
        productName: 'Huevos de Corral',
        unitPrice: 18.50,
        quantity: 15,
        unit: 'Jabas (30 u. c/u)',
        total: 277.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhrps5iqSgHQkrNKOP0z-uNURacW8KSZDPEDoQjSDOlX8-_J4tAlyMYhrj-i2lSCQx5rYbWPmsnLAWk_9l7iBAyT_szbq59D4dAHSuw1JqpgKW3BVTqZSnMYM4LEEOLrzMJ4UpMN-WCtKkARONa2qbHfxkwXXPzHFEaRPBJghR48oZkwLFSK48ee08mbACYUtGkP1GydMGSoHsJyrxhYrZ9MjS9IXiWqF-Gq43rRif0q9vLqCo3VbcQ'
      },
      {
        productId: 'prod-1',
        productName: 'Palta Hass de Exportación',
        unitPrice: 8.50,
        quantity: 75,
        unit: 'kg seleccionados',
        total: 637.50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1sFn1HycitpoQU6ps-KUs6LNSFPu1s3QLDsYetS6h1BSGB3qvci9T9UzcibS9tdw3qh2SnxHSjAdlvL2aC9p2euw1kRo6gEB9lgX_knE8fDvSSXDWTMLSwQ7r_awYcxwr93HjD0HTUcFpy-UEXhiBONqwuddMoAIeHong7hYac9mIOc8qhzgkJvV9xv7YKY9vxMhd4XqluI2b77MH12ZJIgdUVYLXJi2npptYkE-1AJXtIgBsypaTew'
      },
      {
        productId: 'prod-3',
        productName: 'Queso Fresco Andino',
        unitPrice: 20.00,
        quantity: 4,
        unit: 'Moldes sellados',
        total: 80.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeXm07fIjod1qZlSlP_L81IgEr7LTC0lPLLUWk4S2EXKylxDmFzxN_ouN12cvr6UUvl5J4rftNcCu_tjbl3e8sKmwh3Pj25XcSMTrr1ToMCjohsalQuhUYnegh9JuuYQIwphXV8fnCK7C_-6EzDeUV36M6cFvM8dxRHP_dK7aNGHBmUVC9EcQ5AUhFEIbvXCEyVr2ql5jpxXRGg0GQ383MFotzqpLeWu3fhTshe6iGBczMKWIWKZqZWg'
      }
    ],
    notes: 'Entrega directa en puesto.',
  },
  {
    id: 'sale-0411',
    folio: '#0411',
    clientName: 'Bodega Don Lucho',
    clientType: 'Bodega local',
    date: 'Ayer, 23 Oct',
    time: '04:20 PM',
    amount: 85.00,
    paymentStatus: 'cobrado',
    paymentMethod: 'efectivo',
    itemsSummary: '10 kg Palta Hass (a S/. 8.50/kg)',
    deliveryPoint: 'Despacho en campo',
    items: [
      {
        productId: 'prod-1',
        productName: 'Palta Hass',
        unitPrice: 8.50,
        quantity: 10,
        unit: 'kg',
        total: 85.00,
      }
    ],
    notes: 'Despacho directo en fundo.',
  },
  {
    id: 'sale-0408',
    folio: '#0408',
    clientName: 'Restaurante Sabores del Valle',
    clientType: 'Mayorista',
    date: '24 Oct',
    time: '11:00 AM',
    amount: 216.00,
    paymentStatus: 'pendiente',
    paymentMethod: 'bcp',
    itemsSummary: '8 Moldes de Queso Fresco Artesanal',
    deliveryPoint: 'Av. Los Libertadores 142',
    dueDate: 'Vence en 3 días',
    creditDays: 7,
    items: [
      {
        productId: 'prod-3',
        productName: 'Queso Fresco Artesanal',
        unitPrice: 27.00,
        quantity: 8,
        unit: 'moldes',
        total: 216.00,
      }
    ],
    notes: 'Crédito a 7 días pactado.',
  },
  {
    id: 'sale-0409',
    folio: '#0409',
    clientName: 'Doña Martha (Particular)',
    clientType: 'Particular',
    date: '23 Oct',
    time: '11:15 AM',
    amount: 79.50,
    paymentStatus: 'cobrado',
    paymentMethod: 'plin',
    itemsSummary: '1 Jaba Huevo + 3 kg Palta Fuerte',
    deliveryPoint: 'Recojo en portón',
    items: [
      {
        productId: 'prod-5',
        productName: 'Huevos de corral',
        unitPrice: 18.50,
        quantity: 1,
        unit: 'jaba',
        total: 18.50,
      },
      {
        productId: 'prod-2',
        productName: 'Palta Fuerte de Valle',
        unitPrice: 7.00,
        quantity: 3,
        unit: 'kg',
        total: 21.00,
      }
    ],
    notes: 'Recojo en portón del fundo.',
  },
  {
    id: 'sale-0405',
    folio: '#0405',
    clientName: 'Restaurante El Huerto',
    clientType: 'Restaurante',
    date: '22 Oct',
    time: '02:30 PM',
    amount: 140.00,
    paymentStatus: 'cobrado',
    paymentMethod: 'efectivo',
    itemsSummary: '5 Moldes Queso Andino',
    deliveryPoint: 'Calle Comercio 55',
    items: [
      {
        productId: 'prod-4',
        productName: 'Queso Andino',
        unitPrice: 28.00,
        quantity: 5,
        unit: 'moldes',
        total: 140.00,
      }
    ],
  },
  {
    id: 'sale-0402',
    folio: '#0402',
    clientName: 'Sra. Carmen - Feria Dominical',
    clientType: 'Puesto de mercado',
    date: '20 Oct',
    time: '07:00 AM',
    amount: 110.00,
    paymentStatus: 'pendiente',
    paymentMethod: 'yape',
    itemsSummary: '2 Jabas Huevos corral (60 un.)',
    deliveryPoint: 'Feria Dominical Puesto #28',
    dueDate: 'Vence 27 Oct',
    creditDays: 7,
    items: [
      {
        productId: 'prod-5',
        productName: 'Huevos de corral',
        unitPrice: 55.00,
        quantity: 2,
        unit: 'jabas',
        total: 110.00,
      }
    ],
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    concept: 'Flete Camión - Mercado Central',
    category: 'flete',
    categoryLabel: 'Transporte & Envíos',
    amount: 180.00,
    date: 'Hoy (24 Oct)',
    time: '09:30 AM',
    receiptType: 'Factura',
    paymentMethod: 'Yape Empresa',
    receiptPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJtttR28Xd6_UGDvBIcMRvqvFs1UH1Mgzg3RywqAoxYnMU6vr4RuOps18ZUBxDRAq-RKNbkuto6Kfril4WdjqSIZTVzKlbnOHmZIQhHpMjwLdELcm8cHRA6jU1za6wFTI47-v7m4xU6-IOqn3XctYmNvwp0cJMo1aH-b3fd7lxsJwBZiaMBd8TqilALoEONO5kKYsQ58xbfbcHreASnlgPW4a460Alt_1ibp9jFrQ2_JgNLRVODu3yQ',
  },
  {
    id: 'exp-2',
    concept: 'Alimento Balanceado Postura (4 sacos)',
    category: 'insumos',
    categoryLabel: 'Alimento aves & insumos',
    amount: 340.00,
    date: 'Ayer',
    time: '04:15 PM',
    receiptType: 'Boleta',
    paymentMethod: 'Efectivo',
  },
  {
    id: 'exp-3',
    concept: 'Compra de 50 Jabas de plástico',
    category: 'empaques',
    categoryLabel: 'Cajas, Jabas & Cintas',
    amount: 120.00,
    date: '22 Oct',
    time: '11:00 AM',
    receiptType: 'Factura',
    paymentMethod: 'Yape Empresa',
  },
  {
    id: 'exp-4',
    concept: 'Combustible Motofurgón',
    category: 'flete',
    categoryLabel: 'Transporte & Envíos',
    amount: 45.00,
    date: '20 Oct',
    time: '08:20 AM',
    receiptType: 'Boleta',
    paymentMethod: 'Efectivo',
  },
  {
    id: 'exp-5',
    concept: 'Fertilizante Foliar Orgánico (Palto)',
    category: 'insumos',
    categoryLabel: 'Alimento aves & insumos',
    amount: 95.00,
    date: '18 Oct',
    time: '03:40 PM',
    receiptType: 'Recibo simple',
    paymentMethod: 'Yape Empresa',
  },
  {
    id: 'exp-6',
    concept: 'Mantenimiento motobomba de riego',
    category: 'mantenimiento',
    categoryLabel: 'Mantenimiento & Otros',
    amount: 160.00,
    date: '15 Oct',
    time: '10:00 AM',
    receiptType: 'Boleta',
    paymentMethod: 'Efectivo',
  },
];
