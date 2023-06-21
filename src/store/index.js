import { createStore } from "vuex";
import axios from 'axios';
import router from '@/router';


export default createStore({
  state: {
    user: null,
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    expandedSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default"
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    sideNav(state) {
      state.expandedSidenav = !state.expandedSidenav;
      console.log('p')
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios.post('https://alfajri.arw.my.id/api/auth/login/', credentials)
        .then(response => {
          console.log(response)
          localStorage.setItem('access_token', response.data.access_token)
          const user = response.data.data;
          localStorage.setItem('user', JSON.stringify(user));
          commit('setUser', user);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        // Lakukan permintaan HTTP menggunakan Axios
        const token = localStorage.getItem('access_token')
        axios.post('http://localhost:8000/api/auth/logout/', {
          headers:{
            'Authorization': 'Bearer' + token
          }
        })
        .then(response => {
          console.log(response)
          commit('setUser', null);
          // localStorage.removeItem('user')
          // localStorage.removeItem('access_token')
          localStorage.clear()
          router.push('/signin')
          resolve();
        })
        .catch(error => {
          reject(error);
        });
      });
    }
  },
  getters: {
    getUser: state => state.user
  },
});
