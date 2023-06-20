import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import Invoice from "../views/Invoice.vue";
import Product from "../views/Product.vue";
import Settings from "../views/Settings.vue";
import Form from "../views/Form.vue";
import CompletedTransactions from "../views/CompletedTransactions.vue";
import AddCustomer from "../views/AddCustomer.vue";
import AddInvoice from "../views/AddInvoice.vue";
import AddProduct from "../views/AddProduct.vue";
import UpdateCustomer from "../views/UpdateCustomer.vue";
import UpdateProduct from "../views/UpdateProduct.vue";
import UpdateStatus from "../views/UpdateStatus.vue";
import Pdf from "../views/Pdf.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Log from "../views/Log.vue";
import jwt_decode from "jwt-decode";

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/log",
    name: "Log",
    component: Log,
  },
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
    meta: {
      requiresAuth: true
    }
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
    path: "/invoice",
    name: "Invoice",
    component: Invoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: CompletedTransactions,
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
    path: "/addInvoice",
    name: "Add Invoice",
    component: AddInvoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addProduct",
    name: "Add Product",
    component: AddProduct,
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
    path: "/updateProduct/:id",
    name: "Update Product",
    component: UpdateProduct,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/updateStatus/:id",
    name: "Update Status",
    component: UpdateStatus,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pdf",
    name: "Pdf",
    component: Pdf,
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
  const user = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && token == null && user == null) {
    // Jika rute yang dituju memerlukan otentikasi dan tidak ada akses token,
    // maka batalkan navigasi dan arahkan ke halaman login
    next('/signin')
  } else {
    // Jika akses token ada atau rute yang dituju tidak memerlukan otentikasi,
    // maka izinkan navigasi ke rute yang dituju
    next()
  }

  const decodedToken = jwt_decode(token)
  const expirationDate = new Date(decodedToken.exp * 1000)
  if (expirationDate <= new Date()) {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user');
    localStorage.clear()
    this.$router.push('/signin');
  }
  else {
    next()
  }
})

export default router;
