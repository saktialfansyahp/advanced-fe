<template>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Update Customer</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateCustomer">
              <div class="form-group">
                  <label for="firstname">Firstname</label>
                  <input type="text" class="form-control" id="firstname" v-model="customers.firstname">
              </div>
              <div class="form-group">
                <label for="lastname">Lastname</label>
                <input type="text" class="form-control" id="lastname" v-model="customers.lastname">
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="customers.username">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="customers.email" >
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" v-model="customers.address">
              </div>
              <div class="form-group">
                <label for="no_telp">Phone</label>
                <input type="text" class="form-control" id="no_telepon" v-model="customers.pelanggan.no_telp">
              </div>
              <div class="form-group">
                <label for="role">Role</label>
                  <select class="form-control" id="role" value="Choose Role" v-model="customers.role">
                      <option value="">Choose Type</option>
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                  </select>
              </div>
              <div class="form-group">
                <label for="kota">City</label>
                <input type="text" class="form-control" id="kota" v-model="customers.pelanggan.kota">
              </div>
              <div class="form-group">
                <label for="jenis">Type</label>
                  <select class="form-control" id="status" value="Pilih Status" v-model="customers.pelanggan.jenis">
                      <option value="">Choose Type</option>
                      <option value="Individu">Individu</option>
                      <option value="Organisasi">Organization</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="status">Status</label>
                  <select class="form-control" id="status" value="Pilih Status" v-model="customers.pelanggan.status">
                      <option value="">Choose Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                  </select>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "edit-customer",
  data() {
    return {
      customers: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        address: "",
        role: "",
        pelanggan: {
          kota: "",
          status: "",
          no_telp: "",
          jenis: "",
        }
      },
    };
  },
  created(){
    this.fetchData()
    const custId = this.$route.params.id
    console.log(custId)
  },
  methods: {
    fetchData(){
      const customersId = this.$route.params.id
      axios.get(`http://127.0.0.1:8000/api/auth/getPelanggan/${customersId}`, {
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
    updateCustomer() {
      const customersId = this.$route.params.id
      axios.post(`http://127.0.0.1:8000/api/auth/update/${customersId}`, this.customers, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        console.log(response.data);
        this.$router.push('/tables');
      })
      .catch(error => console.log(error));
    }
  }
};
</script>
