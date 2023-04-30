<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Completed Transactions</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Invoice Number</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer Name</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Product</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Invoice Amount</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Due Date</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Action</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transactions, index) in transactions" :key="index">
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <span class="text-secondary text-xs font-weight-bold">{{ transactions.no_tagihan}}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex px-3 py-1">
                  <span class="text-secondary text-xs font-weight-bold">{{ transactions.pelanggan.name}}</span>
                </div>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.produk}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.jumlah_tagihan}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.jatuh_tempo}}</span>
              </td>
              <td class="align-middle text-center">
                <a href="#" @click="deleteCustomer(transactions.id)" class="text-secondary font-weight-bold text-xs">
                  <i class="bi bi-eye-fill"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'

export default {
  name: "transactions",
  data(){
    return {
      transactions: []
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      axios.get('http://127.0.0.1:8000/api/auth/displayTransaksi', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.transactions = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteCustomer(id) {
    axios.post(`http://127.0.0.1:8000/api/auth/deleteTransaksi/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(response => {
      console.log(response.data);
      this.fetchData();
    })
    .catch(error => console.log(error));
    }
  }
};
</script>
