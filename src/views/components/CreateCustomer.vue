<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Add Customer</h3>
            </div>
            <div class="card-body">
              <form>
                <!-- <label for="userId">User Id</label>
                  <select @change="updateEmail" class="form-control" id="status" value="Choose Status" v-model="form.user_id">
                    <option value="" disabled selected>Choose User</option>
                    <option v-for="option in customerOptions" :key="option.value" :value="option.value">{{ option.firstname }} {{  option.lastname }}</option>
                  </select> -->
                  <!-- onkeydown="return false;" -->
                <div class="form-group">
                  <label for="firstname">Firstname</label>
                  <input type="text" class="form-control" id="firstname" v-model="form.firstname">
                </div>
                <div class="form-group">
                  <label for="lastname">Lastname</label>
                  <input type="text" class="form-control" id="lastname" v-model="form.lastname">
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="username" v-model="form.username">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" v-model="form.email" >
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" v-model="form.password">
                </div>
                <div class="form-group">
                  <label for="password_confirmation">Password</label>
                  <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation">
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" v-model="form.address">
                </div>
                <div class="form-group">
                  <label for="no_telp">Phone</label>
                  <input type="text" class="form-control" id="no_telepon" v-model="form.no_telp">
                </div>
                <div class="form-group">
                  <label for="kota">City</label>
                  <input type="text" class="form-control" id="kota" v-model="form.kota">
                </div>
                <div class="form-group">
                  <label for="jenis">Type</label>
                    <select class="form-control" id="status" value="Pilih Status" v-model="form.jenis">
                        <option value="">Choose Type</option>
                        <option value="Individu">Individu</option>
                        <option value="Organisasi">Organization</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <select class="form-control" id="status" value="Pilih Status" v-model="form.status">
                        <option value="">Choose Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="submitForm">Add</button>
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
    name: "create-customer",
    data() {
        return {
          customerOptions: [],
          email: [],
          form: {
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              password: "",
              address: "",
              role: "customer",
              kota: "",
              status: "",
              no_telp: "",
              jenis: "",
          }
        };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        await axios.get('https://alfajri.arw.my.id/api/auth/dataUser', {
          headers:{
            'Authorization': 'Bearer' + localStorage.getItem('access_token')
          }
        })
        .then(response => {
          console.log(response)
          this.customerOptions = response.data
          .filter( c => c.role === 'customer')
          .map(c => {
            return { 
              value: c.id, firstname: c.firstname, lastname: c.lastname, email: c.email, address: c.address
            }
          })
          console.log(this.customerOptions)
        })
        .catch(error => {
          console.log(error)
        })
      },
      updateEmail(){
        axios.get('https://alfajri.arw.my.id/api/auth/dataUser', {
          headers:{
            'Authorization': 'Bearer' + localStorage.getItem('access_token')
          }
        })
        .then(response => {
          console.log(response)
          this.email = response.data
          .filter( c => c.id === this.form.user_id)
          .map(c => {
            return { 
              email: c.email, address: c.address
            }
          })
          var emails = this.email.map(option => option.email).join(", ");
          var address = this.email.map(option => option.address).join(", ");
          // var alamat = this.email.map(option => option.address).join(", ");
          this.email = emails
          this.alamat = address
        })
        .catch(error => {
          console.log(error)
        })
      },
      async submitForm(){
          await axios.post('https://alfajri.arw.my.id/api/auth/register', this.form, {
              headers:{
              'Authorization': 'Bearer' + localStorage.getItem('access_token')
              }
          })
          .then(response => {
              this.$router.push('/tables')
              console.log(response.data)
          })
          .catch(error => {
              console.log(error)
          })
      }
    }
    };
</script>
  