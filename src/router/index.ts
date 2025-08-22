import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import ResetPassword from '../pages/ResetPassword.vue'
import PasswordResetConfirm from '../components/PasswordResetConfirm.vue'
import DefaultLayout from '../layouts/default.vue'
import DashboardContent from '../pages/DashboardContent.vue'
import AddTransaction from '../pages/AddTransaction.vue'
import Transactions from '../pages/Transactions.vue'
import Reports from '../pages/Reports.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Authentication routes
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
    },
    {
      path: '/password-reset-confirm',
      name: 'password-reset-confirm',
      component: PasswordResetConfirm,
    },

    // Protected dashboard routes (with layout)
    {
      path: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardContent,
        },
      ],
    },
    {
      path: '/transactions',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'transactions',
          component: Transactions,
        },
        {
          path: 'add',
          name: 'add-transaction',
          component: AddTransaction,
        },
        {
          path: 'edit/:id',
          name: 'edit-transaction',
          component: AddTransaction,
          props: true,
        },
      ],
    },
    {
      path: '/reports',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'reports',
          component: Reports,
        },
      ],
    },

    // TODO: Add these routes when components are created:
    // {
    //   path: '/accounts',
    //   name: 'accounts',
    //   component: () => import('../pages/Accounts.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/accounts/:id',
    //   name: 'account-details',
    //   component: () => import('../pages/AccountDetails.vue'),
    //   props: true,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/budget',
    //   name: 'budget',
    //   component: () => import('../pages/Budget.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/categories',
    //   name: 'categories',
    //   component: () => import('../pages/Categories.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import('../pages/Profile.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('../pages/Settings.vue'),
    //   meta: { requiresAuth: true }
    // }
  ],
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  // TODO: Replace with actual authentication check from store
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to sign in if trying to access protected route while not authenticated
    next({ name: 'signin', query: { redirect: to.fullPath } })
  } else if (
    !to.meta.requiresAuth &&
    isAuthenticated &&
    (to.name === 'signin' || to.name === 'signup' || to.name === 'home')
  ) {
    // Redirect to dashboard if trying to access auth pages while authenticated
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
