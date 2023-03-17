import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import AddCustomer from "../views/AddCustomer.vue";
import UpdateCustomer from "../views/UpdateCustomer.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addCustomer",
    name: "Add Customer",
    component: AddCustomer,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/updateCustomer/:id",
    name: "Update Customer",
    component: UpdateCustomer,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    // Jika rute yang dituju memerlukan otentikasi dan tidak ada akses token,
    // maka batalkan navigasi dan arahkan ke halaman login
    next({ name: 'signin' })
  } else {
    // Jika akses token ada atau rute yang dituju tidak memerlukan otentikasi,
    // maka izinkan navigasi ke rute yang dituju
    next()
  }

  const decodedToken = jwt_decode(token)
  const expirationDate = new Date(decodedToken.exp * 1000)
  if (expirationDate <= new Date()) {
    localStorage.removeItem('access_token');
    this.$router.push('/signin');
  }
  else {
    this.$router.push('/signin')
  }
})

export default router;
