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
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
                <div class="form-group">
                  <label for="telepon">Phone</label>
                  <input type="text" class="form-control" id="no_telepon" v-model="form.no_telp">
                </div>
                <div class="form-group">
                  <label for="kota">City</label>
                  <input type="text" class="form-control" id="kota" v-model="form.kota">
                </div>
                <div class="form-group">
                  <label for="alamat">Address</label>
                  <input type="text" class="form-control" id="alamat" v-model="form.alamat">
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
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" v-model="form.email">
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
        form: {
            name: "",
            no_telp: "",
            kota: "",
            alamat: "",
            jenis: "",
            email: "",
            status: "",
        }
        };
    },
    methods: {
        async submitForm(){
            await axios.post('http://127.0.0.1:8000/api/auth/createPelanggan', this.form, {
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
  