<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="'Customers'"
              :value="totalCustomerLastWeek"
              :percentage="customersIncrease" 
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
              :title="'Product'"
              :value="this.productLastMonth"
              :percentage="productIncrease"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="'since last month'"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="'Invoice'"
              :value="invoiceUnpaid"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="'unpaid invoices status'"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="'Reminder'"
              :value="status"
              :iconClass="'fas fa-bell'"
              :iconBackground="stats.sales.iconBackground"
              :detail="detailStatus"
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
      lastMonthDate: null,
      role: null,
      totalCustomer: "",
      totalProduct: "",
      totalInvoice: "",
      customersIncrease: "",
      productIncrease: "",
      invoiceUnpaid: "",
      status: "",
      detailStatus: "",
      time: "",
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
          iconBackground: "bg-gradient-dark",
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
    this.fetchProduct()
    this.fetchInvoice()
    this.fetchStatus()
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
        this.customersIncrease = percentageIncrease.toFixed(2) + "%";
        console.log(customersLastWeek);
        console.log(this.customersIncrease)
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchProduct() {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      this.lastMonthDate = lastMonth.toISOString();
      
      axios.get('https://alfajri.arw.my.id/api/auth/getProduk', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.totalProduct = response.data.produk.length
        console.log(this.totalProduct)
        const products = response.data.produk;
        const productsAddedLastMonth = products.filter(product => {
          const productAddedDate = new Date(product.created_at); // Ganti "addedDate" dengan properti yang sesuai pada objek produk
          return productAddedDate >= lastMonth && productAddedDate <= today;
        });

        this.productLastMonth = productsAddedLastMonth.length;
        console.log(this.productLastMonth);
        const percentage = (this.productLastMonth / this.totalProduct) * 100;
        this.productIncrease = percentage.toFixed(2) + "%";
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchInvoice() {
      const today = new Date();
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      this.yesterdayDate = yesterday.toISOString();
      
      axios.get('https://alfajri.arw.my.id/api/auth/displayTransaksi', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
        this.totalInvoice = Object.keys(response.data).length
        console.log(this.totalInvoice)
        const invoice = response.data;
        const invoicesBelumLunas = Object.keys(invoice).filter(key => invoice[key].status_tagihan === 'Belum Bayar');
        this.invoiceUnpaid = invoicesBelumLunas.length;
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchStatus() {
      axios.get('https://alfajri.arw.my.id/api/auth/status/reminder')
        .then(response => {
          const remind = response.data.active
          this.time = response.data.time
          if (remind == 1) {
            this.status = 'Active'
            this.detailStatus = 'Reminder at ' + this.time
          } else {
            this.status = 'Inactive'
            this.detailStatus = 'Manually Reminder'
          }
          console.log(response.data);
      })
    },

  }
};
</script>
