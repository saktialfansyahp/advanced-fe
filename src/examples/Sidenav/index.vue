<template>
  <div
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-transparent'}`"
  />
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start'
    } 
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.sidebarType}`"
    id="sidenav-main"
    v-if="this.$store.state.expandedSidenav"
  >
    <div class="sidenav-header">
      <router-link class="m-0 navbar-brand" to="/">
        <span class="font-weight-bold">Customer Relationship <br> Management</span>
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="custom_class" />
  </aside>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    style="width: fit-content;"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start'
    } 
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.sidebarType}`"
    id="sidenav-main"
    v-else
  >
    <div class="sidenav-header">
      <router-link class="m-0 navbar-brand" to="/">
        <span class="font-weight-bold">CRM <button @click="handleToggleSidenav">P</button></span>
      </router-link>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-min :cardBg="custom_class" />
  </aside>
</template>

<script>
import SidenavList from "./SidenavList.vue";
import SidenavMin from "./SidenavMin.vue";
import logo from "@/assets/img/logo-ct-dark.png";
import logoWhite from "@/assets/img/logo-ct.png";

export default {
  name: "index",
  components: {
    SidenavList,
    SidenavMin,
  },
  data() {
    return {
      logo,
      logoWhite
    };
  },
  methods: {
    handleToggleSidenav() {
      this.$store.state.expandedSidenav = !this.$store.state.expandedSidenav;
    }
  },
  props: ["custom_class", "layout", "toggle"]
};
</script>
