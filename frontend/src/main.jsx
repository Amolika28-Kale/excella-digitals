import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import Payment from './pages/Payment'
import Referral from './pages/Referral'
import Wallet from './pages/Wallet'

import AdminLayout from "./layout/AdminLayout"
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import AdminCourseEditor from './pages/admin/AdminCourseEditor'
import AdminUsers from './pages/admin/AdminUsers'
import AdminPayments from './pages/admin/AdminPayments'
import AdminReferrals from './pages/admin/AdminReferrals'
import AdminWithdrawals from './pages/admin/AdminWithdrawals'

import './styles.css'
import AdminSettings from './pages/admin/AdminSettings'
import StudentLayout from './layout/StudentLayout'
import CoursePlayer from './pages/cOURSEpLAYER.JSX'
import ReferralShare from './pages/ReferralShare'
import Settings from './pages/Setting'
import AdminNotifications from './pages/admin/notifications'


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
}

function AdminPrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/courses/:id" element={<PrivateRoute><Course /></PrivateRoute>} />
        <Route path="/payment/:userId" element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path="/referral" element={<PrivateRoute>
          <Referral />
          </PrivateRoute>} />
        <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />

        {/* ADMIN ROUTES WITH LAYOUT */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminCourses /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/courses/:id"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminCourseEditor /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminUsers /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminPayments /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/referrals"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminReferrals /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/withdrawals"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminWithdrawals /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        {/* ⭐ ADMIN SETTINGS (Correct Position!) */}
        <Route
          path="/admin/settings"
          element={
            <AdminPrivateRoute>
              <AdminLayout><AdminSettings /></AdminLayout>
            </AdminPrivateRoute>
          }
        />

        <Route
  path="/my-courses"
  element={
    <PrivateRoute>
      <StudentLayout><Course/></StudentLayout>
    </PrivateRoute>
  }
/>
<Route path="/course-player/:courseId" element={<CoursePlayer />} />
<Route path="/share" element={<ReferralShare />} />

<Route path="/settings" element={<Settings/>} />
<Route
  path="/admin/notifications"
  element={
    <AdminPrivateRoute>
      <AdminLayout><AdminNotifications /></AdminLayout>
    </AdminPrivateRoute>
  }
/>



      </Routes>
    </BrowserRouter>
  );
}


createRoot(document.getElementById('root')).render(<App />)
