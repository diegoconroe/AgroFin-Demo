import React, { useState } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CLIENTS,
  INITIAL_SALES,
  INITIAL_EXPENSES,
  Product,
  Client,
  Sale,
  Expense,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { SalesScreen } from './screens/SalesScreen';
import { ProductsScreen } from './screens/ProductsScreen';
import { ExpensesScreen } from './screens/ExpensesScreen';
import { ClientsScreen } from './screens/ClientsScreen';
import { SaleDetailScreen } from './screens/SaleDetailScreen';
import { ClientDetailScreen } from './screens/ClientDetailScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NewSaleModal } from './components/NewSaleModal';
import { NewExpenseModal } from './components/NewExpenseModal';
import { NewProductModal } from './components/NewProductModal';
import { NewClientModal } from './components/NewClientModal';
import { PaymentModal } from './components/PaymentModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [activeScreen, setActiveScreen] = useState<
    'main' | 'sale_detail' | 'client_detail' | 'calendar' | 'reports' | 'profile'
  >('main');

  const [selectedSaleId, setSelectedSaleId] = useState<string>('sale-0412');
  const [selectedClientId, setSelectedClientId] = useState<string>('cli-1');

  // Interactive local states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [sales, setSales] = useState<Sale[]>(INITIAL_SALES);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);

  // Modals state
  const [isNewSaleOpen, setIsNewSaleOpen] = useState<boolean>(false);
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState<boolean>(false);
  const [isNewProductOpen, setIsNewProductOpen] = useState<boolean>(false);
  const [isNewClientOpen, setIsNewClientOpen] = useState<boolean>(false);
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    clientName: string;
    amount: number;
  }>({
    isOpen: false,
    clientName: '',
    amount: 0,
  });

  // Toast state
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Navigation handlers
  const handleViewSaleDetail = (saleId: string) => {
    setSelectedSaleId(saleId);
    setActiveScreen('sale_detail');
  };

  const handleViewClientDetail = (clientIdOrName: string) => {
    const found = clients.find(
      (c) => c.id === clientIdOrName || c.name.toLowerCase().includes(clientIdOrName.toLowerCase())
    );
    if (found) {
      setSelectedClientId(found.id);
    } else {
      setSelectedClientId('cli-1');
    }
    setActiveScreen('client_detail');
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setActiveScreen('main');
  };

  // Creation handlers
  const handleSaveSale = (saleData: Partial<Sale>) => {
    const newFolio = `#${Math.floor(413 + Math.random() * 50)}`;
    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      folio: newFolio,
      clientName: saleData.clientName || 'Cliente Particular',
      clientType: saleData.clientType || 'Comercial',
      date: 'Hoy, 24 Oct',
      time: '11:30 AM',
      amount: saleData.amount || 164.50,
      paymentStatus: saleData.paymentStatus || 'cobrado',
      paymentMethod: saleData.paymentMethod || 'yape',
      itemsSummary: saleData.itemsSummary || 'Cosecha fresca del día',
      items: saleData.items || [],
      deliveryPoint: saleData.deliveryPoint || 'Despacho Local',
      notes: saleData.notes,
      creditDays: saleData.creditDays,
    };

    setSales((prev) => [newSale, ...prev]);
    showToast(`Venta ${newFolio} guardada exitosamente (S/. ${newSale.amount.toFixed(2)})`);
  };

  const handleSaveExpense = (expData: Partial<Expense>) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      concept: expData.concept || 'Gasto Operativo',
      category: expData.category || 'flete',
      categoryLabel: expData.categoryLabel || 'Transporte & Envíos',
      amount: expData.amount || 180.00,
      date: expData.date || 'Hoy (24 Oct)',
      time: '11:45 AM',
      receiptType: expData.receiptType || 'Boleta',
      paymentMethod: expData.paymentMethod || 'Yape Empresa',
    };

    setExpenses((prev) => [newExpense, ...prev]);
    showToast(`Gasto registrado: S/. ${newExpense.amount.toFixed(2)} (${newExpense.concept})`);
  };

  const handleSaveProduct = (prodData: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: prodData.name || 'Nuevo Cultivo',
      category: prodData.category || 'paltas',
      badge: prodData.badge,
      badgeType: prodData.badgeType,
      price: prodData.price || 9.50,
      unit: prodData.unit || 'kg',
      cost: prodData.cost || 5.20,
      marginPercent: prodData.marginPercent || 45,
      stock: prodData.stock || 100,
      stockUnit: prodData.stockUnit || 'kg',
      stockLabel: prodData.stockLabel || 'Stock en granja',
      image: prodData.image || INITIAL_PRODUCTS[0].image,
      minStock: prodData.minStock || 20,
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" agregado al catálogo con éxito`);
  };

  const handleSaveClient = (cliData: Partial<Client>) => {
    const newClient: Client = {
      id: `cli-${Date.now()}`,
      name: cliData.name || 'Nuevo Cliente',
      type: cliData.type || 'bodega',
      typeLabel: cliData.typeLabel || 'Bodega local',
      phone: cliData.phone || '+51 900 000 000',
      address: cliData.address || 'Lunahuaná',
      creditAllowed: cliData.creditAllowed ?? true,
      creditLimit: cliData.creditLimit || 500.00,
      creditUsed: 0,
      paymentTermDays: cliData.paymentTermDays || 7,
      totalPurchased: 0,
      status: 'al_dia',
      debtAmount: 0,
      frequency: cliData.frequency || 'Semanal',
      notes: cliData.notes,
    };

    setClients((prev) => [newClient, ...prev]);
    showToast(`Cliente "${newClient.name}" registrado en la cartera rural`);
  };

  const handleUpdateStock = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextStock = Math.max(0, p.stock + delta);
          return { ...p, stock: nextStock };
        }
        return p;
      })
    );
  };

  const handleConfirmPayment = (amount: number, method: string) => {
    setPaymentModalData({ isOpen: false, clientName: '', amount: 0 });

    // Update client debt if matched
    setClients((prev) =>
      prev.map((c) => {
        if (c.name === paymentModalData.clientName) {
          const newDebt = Math.max(0, c.debtAmount - amount);
          return {
            ...c,
            debtAmount: newDebt,
            status: newDebt === 0 ? 'al_dia' : 'pendiente',
            totalPurchased: c.totalPurchased + amount,
          };
        }
        return c;
      })
    );

    // Update sales if matched
    setSales((prev) =>
      prev.map((s) => {
        if (s.clientName === paymentModalData.clientName && s.paymentStatus === 'pendiente') {
          return { ...s, paymentStatus: 'cobrado' };
        }
        return s;
      })
    );

    showToast(`Cobro de S/. ${amount.toFixed(2)} registrado con éxito vía ${method}`);
  };

  // Determine active title
  const getSubTitle = () => {
    if (activeScreen === 'sale_detail') return 'Detalleventa';
    if (activeScreen === 'client_detail') return 'Detallecliente';
    if (activeScreen === 'calendar') return 'Agenda de Campo';
    if (activeScreen === 'reports') return 'Reportesfinanzas';
    if (activeScreen === 'profile') return 'Perfil Productor';
    const map: Record<string, string> = {
      inicio: 'Inicio',
      ventas: 'Ventas',
      productos: 'Productos',
      gastos: 'Gastos',
      clientes: 'Clientes',
    };
    return map[currentTab] || 'Inicio';
  };

  const selectedSale = sales.find((s) => s.id === selectedSaleId) || sales[0];
  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  return (
    <div className="bg-surface font-body text-on-surface flex flex-col min-h-screen relative antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Fixed Top Header */}
      <Header
        currentTab={currentTab}
        subTitle={getSubTitle()}
        onOpenCalendar={() => setActiveScreen('calendar')}
        onOpenProfile={() => setActiveScreen('profile')}
        canBack={activeScreen !== 'main'}
        onBack={() => setActiveScreen('main')}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface">
        {activeScreen === 'sale_detail' ? (
          <SaleDetailScreen
            sale={selectedSale}
            onBack={() => setActiveScreen('main')}
            onViewClientDetail={handleViewClientDetail}
          />
        ) : activeScreen === 'client_detail' ? (
          <ClientDetailScreen
            client={selectedClient}
            onBack={() => setActiveScreen('main')}
            onOpenPaymentModal={(name, amt) =>
              setPaymentModalData({ isOpen: true, clientName: name, amount: amt })
            }
            onOpenNewSale={() => setIsNewSaleOpen(true)}
          />
        ) : activeScreen === 'calendar' ? (
          <CalendarScreen
            onBack={() => setActiveScreen('main')}
            onOpenNewSale={() => setIsNewSaleOpen(true)}
            onOpenNewExpense={() => setIsNewExpenseOpen(true)}
          />
        ) : activeScreen === 'reports' ? (
          <ReportsScreen onBack={() => setActiveScreen('main')} />
        ) : activeScreen === 'profile' ? (
          <ProfileScreen onBack={() => setActiveScreen('main')} />
        ) : (
          <>
            {currentTab === 'inicio' && (
              <HomeScreen
                onOpenNewSale={() => setIsNewSaleOpen(true)}
                onOpenNewExpense={() => setIsNewExpenseOpen(true)}
                onOpenReports={() => setActiveScreen('reports')}
                onNavigateTab={handleTabChange}
                onViewSaleDetail={handleViewSaleDetail}
                sales={sales}
                expenses={expenses}
              />
            )}

            {currentTab === 'ventas' && (
              <SalesScreen
                sales={sales}
                onOpenNewSale={() => setIsNewSaleOpen(true)}
                onViewSaleDetail={handleViewSaleDetail}
                onOpenPaymentModal={(name, amt) =>
                  setPaymentModalData({ isOpen: true, clientName: name, amount: amt })
                }
              />
            )}

            {currentTab === 'productos' && (
              <ProductsScreen
                products={products}
                onOpenNewProduct={() => setIsNewProductOpen(true)}
                onUpdateStock={handleUpdateStock}
                showToast={showToast}
              />
            )}

            {currentTab === 'gastos' && (
              <ExpensesScreen
                expenses={expenses}
                onOpenNewExpense={() => setIsNewExpenseOpen(true)}
              />
            )}

            {currentTab === 'clientes' && (
              <ClientsScreen
                clients={clients}
                onOpenNewClient={() => setIsNewClientOpen(true)}
                onViewClientDetail={handleViewClientDetail}
                onOpenPaymentModal={(name, amt) =>
                  setPaymentModalData({ isOpen: true, clientName: name, amount: amt })
                }
                onOpenNewSale={() => setIsNewSaleOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation (visible on main tabs) */}
      {activeScreen === 'main' && (
        <BottomNav currentTab={currentTab} onSelectTab={handleTabChange} />
      )}

      {/* Modals */}
      <NewSaleModal
        isOpen={isNewSaleOpen}
        onClose={() => setIsNewSaleOpen(false)}
        products={products}
        clients={clients}
        onSaveSale={handleSaveSale}
      />

      <NewExpenseModal
        isOpen={isNewExpenseOpen}
        onClose={() => setIsNewExpenseOpen(false)}
        onSaveExpense={handleSaveExpense}
      />

      <NewProductModal
        isOpen={isNewProductOpen}
        onClose={() => setIsNewProductOpen(false)}
        onSaveProduct={handleSaveProduct}
      />

      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
        onSaveClient={handleSaveClient}
      />

      <PaymentModal
        isOpen={paymentModalData.isOpen}
        clientName={paymentModalData.clientName}
        defaultAmount={paymentModalData.amount}
        onClose={() => setPaymentModalData({ isOpen: false, clientName: '', amount: 0 })}
        onConfirm={handleConfirmPayment}
      />

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-on-surface text-surface-container-lowest px-4 py-2.5 rounded-full text-xs font-label flex items-center gap-2 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]">
            check_circle
          </span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
