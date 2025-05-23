import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/organisms/Layout'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/Dashboard'
import ReportedIssues from '../pages/ReportedIssues'
import Users from '../pages/Users'
import Videos from '../pages/Videos'
import QuranVerse from '../pages/QuranVerse'
import Store from '../pages/Store'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import paths from './paths'
import Merchants from '../pages/Merchants'
import School from '../pages/School'
import Categories from '../pages/Categories'
import Mosques from '../pages/Mosques'
import Businesses from '../pages/Businesses'
import useAuthStore from '../store/authStore'
import ProtectedRoutes from './ProtectedRoutes'
import PublicOnlyRoute from './PublicRoutes'

function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={paths.dashboard} replace />
          ) : (
            <Navigate to={paths.login} replace />
          )
        }
      />
      <Route
        path={paths.login}
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      <Route
        path={paths.dashboard}
        element={
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path={paths.orders} element={<Orders />} />
        <Route path={paths.products} element={<Products />} />
        <Route path={paths.categories} element={<Categories />} />
        <Route path={paths.quranVerses} element={<QuranVerse />} />
        <Route path={paths.reportedIssues} element={<ReportedIssues />} />
        <Route path={paths.store} element={<Store />} />
        <Route path={paths.users} element={<Users />} />
        <Route path={paths.schools} element={<School />} />
        <Route path={paths.merchants} element={<Merchants />} />
        <Route path={paths.videos} element={<Videos />} />
        <Route path={paths.mosques} element={<Mosques />} />
        <Route path={paths.businesses} element={<Businesses />} />
      </Route>
      {/* Optional catch-all route */}
      <Route
        path="*"
        element={
          <h1 className="flex items-center justify-center h-screen text-3xl font-bold">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  )
}

export default AppRoutes
