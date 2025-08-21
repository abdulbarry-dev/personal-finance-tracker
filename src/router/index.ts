import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/signup.vue'
import ResetPassword from '../pages/ResetPassword.vue'
import PasswordResetConfirm from '../components/PasswordResetConfirm.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router
