<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Customer</h6>
      <a href="/addCustomer"><argon-button variant="gradient">Add Customer</argon-button></a>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Address</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Status</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Phone</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Action</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customers, index) in customers" :key="index">
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ customers.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ customers.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ customers.kota }}</p>
                <p class="text-xs text-secondary mb-0">{{ customers.alamat }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span v-if="customers.status === 'Active'" class="badge badge-sm bg-gradient-success">{{ customers.status }}</span>
                <span v-else class="badge badge-sm bg-gradient-danger">{{ customers.status }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ customers.no_telp}}</span>
              </td>
              <td class="align-middle text-center">
                <a :href="'/updateCustomer' + '/' + customers.id" class="text-secondary font-weight-bold text-xs me-2">
                  <span class="text-secondary text-xs font-weight-bold">Edit</span>
                </a>
                <a href="#" @click="deleteCustomer(customers.id)" class="text-secondary font-weight-bold text-xs">
                  <i class="bi bi-trash ms-2"></i>
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

export default {
  name: "customers-table",
  data(){
    return {
      customers: []
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
      axios.get('http://127.0.0.1:8000/api/auth/displayPelanggan', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.customers = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteCustomer(id) {
    axios.post(`http://127.0.0.1:8000/api/auth/deletePelanggan/${id}`, {
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
