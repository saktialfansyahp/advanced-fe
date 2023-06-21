<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="'Customers'"
              :value="totalCustomer"
              :percentage="percentageIncrease" 
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="'since last week'"
              directionReverse
              v-if="role === 'admin'"
            ></card>
            <card
              :title="'Invoice'"
              :value="5"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
              v-if="role === 'customer'"
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.money.title"
              :value="stats.money.value"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value="stats.clients.value"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.sales.title"
              :value="stats.sales.value"
              :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass"
              :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import axios from "axios";

export default {
  name: "dashboard-default",
  data() {
    return {
      transactions: [],
      lastWeekDate: null,
      role: null,
      totalCustomer: "",
      percentageIncrease: "",
      stats: {
        money: {
          title: "Today's Money",
          value: "$53,000",
          percentage: "+55%",
          iconClass: "ni ni-money-coins",
          detail: "since yesterday",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Customers",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "since last week",
        },
        clients: {
          title: "New Clients",
          value: "+3,462",
          percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "since last quarter",
        },
        sales: {
          title: "Sales",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "than last month",
        },
      },
      sales: {
        
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
  },
  created(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.role = user.role;
    }
  },
  mounted(){
    this.fetchCustomers()
  },
  methods: {
    fetchCustomers() {
      const today = new Date();
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      this.lastWeekDate = lastWeek.toISOString();
      
      axios.get('https://alfajri.arw.my.id/api/auth/displayPelanggan', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.totalCustomer = response.data.length
        const customers = response.data;
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const customersLastWeek = customers.filter(customer => {
          const updatedAt = new Date(customer.updated_at);
          return updatedAt >= lastWeekDate;
        });

        this.totalCustomer = customers.length;
        this.totalCustomerLastWeek = customersLastWeek.length;
        const percentageIncrease = ((this.totalCustomer - this.totalCustomerLastWeek) / this.totalCustomerLastWeek) * 100;
        this.percentageIncrease = percentageIncrease + "%";
        console.log(customersLastWeek);
        console.log(this.percentageIncrease)
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchProduct() {
      const today = new Date();
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      this.lastWeekDate = lastWeek.toISOString();
      
      axios.get('https://alfajri.arw.my.id/api/auth/displayPelanggan', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.totalCustomer = response.data.length
        const customers = response.data;
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);

        const customersLastWeek = customers.filter(customer => {
          const updatedAt = new Date(customer.updated_at);
          return updatedAt >= lastWeekDate;
        });

        this.totalCustomer = customers.length;
        this.totalCustomerLastWeek = customersLastWeek.length;
        const percentageIncrease = ((this.totalCustomer - this.totalCustomerLastWeek) / this.totalCustomerLastWeek) * 100;
        this.percentageIncrease = percentageIncrease + "%";
        console.log(customersLastWeek);
        console.log(this.percentageIncrease)
      })
      .catch(error => {
        console.log(error)
      })
    },

  }
};
</script>
