<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Dashboard' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Table' : 'Customers'"
          v-if="role === 'admin'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-badge text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/invoice"
          :class="getRoute() === 'invoice' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Table' : 'Invoice'"
          v-if="role === 'admin'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/product"
          :class="getRoute() === 'product' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Table' : 'Product'"
          v-if="role === 'admin'"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/form"
          :class="getRoute() === 'form' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Table' : 'Product'"
          v-if="role === 'customer'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/form"
          :class="getRoute() === 'form' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'Table' : 'Whatsapp Form'"
          v-if="role === 'customer'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/settings"
          :class="getRoute() === 'settings' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? '' : 'Setting'"
          v-if="role === 'admin'"
        >
          <template v-slot:icon>
            <i class="ni ni-settings-gear-65 text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          url="/virtual-reality"
          :class="getRoute() === 'virtual-reality' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? '' : 'Virtual Reality'"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
// import { mapActions } from 'vuex';

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      role: null
    };
  },
  created(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.role = user.role;
    }
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
