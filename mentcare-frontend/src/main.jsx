import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import AdminPage from './AdminPage';
import StaffPage from './StaffPage';
import PatientListView from './StaffPage/Overview/OverviewDisplay/PatientListView';
import DailySummary from './StaffPage/Overview/OverviewDisplay/DailySummary';
import MonthlyReport from './StaffPage/Overview/OverviewDisplay/MonthlyReport';
import AdminMonthlyReport from './AdminPage/Dashboard/DashboardMainDisplay/AdminMonthlyReport';
import HIPPACompliance from './AdminPage/Dashboard/DashboardMainDisplay/HIPPACompliance';
import StaffManagement from './AdminPage/Dashboard/DashboardMainDisplay/StaffManagement';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/*',
    element: <AdminPage />,
    children: [
      {
        path: 'compliance',
        element: <HIPPACompliance />,
      },
      {
        path: 'user-management',
        element: <StaffManagement />,
      },
      {
        path: 'monthly-report',
        element: <AdminMonthlyReport />
      },
    ],
  },
  {
    path: '/staff',
    element: <StaffPage />,
    children: [
      {
        path: 'records',
        element: <PatientListView />
      },
      {
        path: 'daily-summary',
        element: <DailySummary />
      },
      {
        path: 'monthly-report',
        element: <MonthlyReport />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
