import React, { Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LangContext';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShiftStatusProvider } from './contexts/ShiftContext';
import LoginPage from './pages/LoginPage/LoginPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import MenuPagesLayout from './Layouts/MenuPagesLayout';
import Dashboard from './pages/MenuPage/Dashboard';
import Authorization from './Auth/Authorization';
import LoadingPage from './pages/ErrorAndLoadingPages/LoadingPage';

const SalePage = lazy(() => import('./pages/SalePage/SalePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage/PaymentPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage/ReportsPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage/CustomersPage'));


function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <ShiftStatusProvider>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path='/login' element={<LoginPage/>} />

                  <Route element={<Authorization />}>
                    <Route path='/settings' element={<SettingsPage/>} />
                  </Route>

                  <Route element={<Authorization allowedRoles={['cashier']} />}>
                    <Route path='/sale' element={
                      <Suspense fallback={<LoadingPage/>}>
                        <SalePage/>
                      </Suspense>
                    } />
                    <Route path='/payment' element={
                      <Suspense fallback={<LoadingPage/>}>
                        <PaymentPage/>
                      </Suspense>
                    } />
                    <Route path='/products' element={
                      <Suspense fallback={<LoadingPage/>}>
                        <ProductsPage/>
                      </Suspense>
                    } />
                  </Route>


                  <Route element={<Authorization />}>
                    <Route element={<MenuPagesLayout/>} >
                      <Route path='/menu' element={<Dashboard/>} />
                      <Route element={<Authorization allowedRoles={['admin']} />}>
                        <Route path='/reports' element={
                          <Suspense fallback={<LoadingPage/>}>
                            <ReportsPage/>
                          </Suspense>
                        } />
                        <Route path='/customers' element={
                          <Suspense fallback={<LoadingPage/>}>
                            <CustomersPage/>
                          </Suspense>
                        } />
                      </Route>
                    </Route>
                  </Route>


                </Routes>
              </AuthProvider>
            </BrowserRouter>
        </ShiftStatusProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
