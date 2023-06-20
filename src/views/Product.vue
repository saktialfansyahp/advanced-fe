<template>
  <div class="py-4 container-fluid">
      <div class=" row">
        <div class="col-12">
          <div class="card">
          <div class="card-header pb-0">
            <h6>Product</h6>
            <a href="/addProduct"><argon-button variant="gradient">Add Product</argon-button></a>
            <!-- <argon-button @click="startSimulation">Mulai Simulasi</argon-button>
            <argon-button @click="stopSimulation">Hentikan Simulasi</argon-button>
            <argon-button @click="toggle">
              <i :class="isToggled ? 'bi bi-toggle2-on' : 'bi bi-toggle2-off'"></i>
            </argon-button> -->
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >Description</th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >Price</th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in product" :key="index">
                    <td>
                      <div class="d-flex px-3 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ product.nama_produk }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ product.deskripsi }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">Rp{{ product.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</span>
                    </td>
                    <td class="align-middle text-center">
                        <a :href="'/updateProduct' + '/' + product.id" class="text-secondary font-weight-bold text-xs me-2">
                          <span class="text-secondary text-xs font-weight-bold">Edit</span>
                        </a>
                        <a href="#" @click="deleteProduct(product.id)" class="text-secondary font-weight-bold text-xs">
                          <i class="bi bi-trash ms-2"></i>
                        </a>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ArgonButton from '@/components/ArgonButton.vue'
import { CronJob } from 'cron';
// import { spawn } from 'child_process';

export default {
  name: "products",
  data() {
    return {
      product: [],
      intervalId: null,
      simulationTime: null,
      jatuhTempo: '2023-05-11',
      isToggled: null
    }
  },
  components: {
    ArgonButton
  },
  created() {
    this.fetchData()
  },
  methods: {
    cek(no_tagihan, status_tagihan) {
      axios.post(`http://127.0.0.1:8000/api/auth/updateTransaksi/${no_tagihan}`, {
        status_tagihan: status_tagihan,
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response)
        })
    },
    toggle() {
      this.isToggled = !this.isToggled;
      if (this.isToggled == true) {
        console.log('on')
      } else {
        console.log('off')
      }
    },
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/auth/getProduk', {
        // headers: {
        //   'Authorization': 'Bearer' + localStorage.getItem('access_token')
        // }
      })
        .then(response => {
          // const transactions = response.data;

          // const filteredTransactions = transactions.filter(item => item.transaksi.length > 0);

          // this.transactions = filteredTransactions;
          this.product = response.data.produk
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProduct(id) {
      axios.post(`http://127.0.0.1:8000/api/auth/deleteProduk/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data);
          console.log(id)
          this.fetchData();
        })
        .catch(error => console.log(error));
    },
    schedule() {
      axios.get(`http://127.0.0.1:8000/api/auth/status/reminder`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        });
    },
    stop() {
      const job = new CronJob({
        cronTime: '* * * * *', // Atur jadwal sesuai kebutuhan Anda
        onTick: function () {
          // Logika yang akan dijalankan oleh cron job
          console.log('Cron job is stopped ...');
        },
        start: false,
      });

      job.start();
    }
  }
};
</script>
