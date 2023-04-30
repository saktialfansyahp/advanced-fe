<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Invoice</h6>
      <a href="/addInvoice"><argon-button variant="gradient">Add Invoice</argon-button></a>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Invoice Number</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</th>
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
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Status</th>
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
                    <h6 class="text-xs font-weight-bold">{{ transactions.no_tagihan}}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ transactions.pelanggan.name }}</h6>
                    <span class="text-secondary text-xs font-weight-bold">{{ transactions.pelanggan.email}}</span>
                  </div>
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
              <td class="text-sm">
                <span v-if="transactions.status_tagihan === 'Lunas'" class="badge badge-sm bg-gradient-success">{{ transactions.status_tagihan }}</span>
                <span v-else class="badge badge-sm bg-gradient-danger">{{ transactions.status_tagihan }}</span>
              </td>
              <td class="align-middle text-center">
                <a href="#" v-if="transactions.status_tagihan === 'Belum Bayar'" @click="sendMail(transactions.pelanggan.email, transactions.pelanggan.name, transactions.no_tagihan)" class="text-secondary font-weight-bold text-xs">
                  <i :title="'Send Mail'" class="bi bi-send-fill"></i>
                </a>
                <a href="#" v-else @click="sendMail(transactions.pelanggan.email, transactions.pelanggan.name)" class="text-secondary font-weight-bold text-xs">
                  <i :title="'Detail'" class="bi bi-eye-fill"></i>
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
import ArgonButton from '@/components/ArgonButton.vue'
import Swal from 'sweetalert2'

export default {
  name: "transactions",
  data(){
    return {
      transactions: [],
    }
  },
  components: {
    ArgonButton
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
        console.log()
      })
      .catch(error => {
        console.log(error)
      })
    },
    async sendMail(email, name, no_tagihan) {
      Swal.fire({
        title: 'Sending email...',
        text: `Sending email to ${name} at ${email}...`,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });

      await axios.post(`http://127.0.0.1:8000/api/auth/send`, {
        subject: 'Send Mail',
        no_tagihan: no_tagihan,
        email: email,
        name: name
      }, {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        Swal.fire({
          title: 'Email sent',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        console.log(response.status)
      })
      .catch(error => {
        Swal.fire({
          title: 'Failed to send email',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      });
    }
    // async sendMail(email, name) {
    //   await axios.post(`http://127.0.0.1:8000/api/auth/send`, {
    //     subject: 'reminder',
    //     email: email,
    //     body: name
    //   }, {
    //     headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    //     }
    //   })
    //   .then(response => {
    //     console.log(response.status)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // }
  }
};
</script>
