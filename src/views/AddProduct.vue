<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Add Product</h3>
          </div>
          <div class="card-body">
            <form>
              <ArgonAlert v-if="errorMessage" type="error" dismissible>
                {{ errorMessage }}
              </ArgonAlert>
              <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" class="form-control" id="name" v-model="form.nama_produk">
              </div>
              <div class="form-group">
                <label for="telepon">Description</label>
                <input type="text" class="form-control" id="no_telepon" v-model="form.deskripsi">
              </div>
              <div class="form-group">
                <label for="alamat">Invoice Amount</label>
                <input type="number" class="form-control" id="alamat" v-model="form.harga">
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
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "create-product",
  data() {
    return {
      customerOptions: [],
      form: {
        nama_produk: "",
        deskripsi: "",
        harga: "",
      },
      errorMessage: ''
    };
  },
  components: {
    ArgonAlert
  },
  computed: {
    formattedDate: {
      get() {
        return this.form.jatuh_tempo
      },
      set(newValue) {
        this.form.jatuh_tempo = this.formattedDate(newValue)
      }
    }
  },
  created() {
    
  },
  methods: {
    async submitForm() {
      await axios.post('http://127.0.0.1:8000/api/auth/createProduk', this.form, {
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          this.$router.push('/product')
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
          this.errorMessage = error.response.data.error
        })
    },
  }
};
</script>
  