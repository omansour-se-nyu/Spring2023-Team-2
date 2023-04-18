import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import AdminPage from './AdminPage';
import StaffPage from './StaffPage';
import PatientListView from './StaffPage/Overview/OverviewDisplay/PatientListView';
import HIPPACompliance from './AdminPage/Dashboard/DashboardMainDisplay/HIPPACompliance';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        path: 'compliance',
        element: <HIPPACompliance />,
      },
    ],
  },
  {
    path: '/staff',
    element: <StaffPage />,
    children: [
      {
        path: 'records',
        element: <PatientListView />,
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
