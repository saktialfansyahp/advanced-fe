<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Billing Information</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li v-for="customer in customers" :key="customer.id" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{ customer.name }}</h6>
            <span class="mb-2 text-xs">
              Company Name:
              <span class="text-dark font-weight-bold ms-sm-2">Viking Burrito</span>
            </span>
            <span class="mb-2 text-xs">
              Email Address:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ customer.email }}</span>
            </span>
            <span class="text-xs">
              VAT Number:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ customer.no_telp }}</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "billing-card",
  data(){
    return {
      customers: []
    }
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      axios.get('https://alfajri.arw.my.id/api/auth/displayPelanggan', {
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
  }
};
</script>
