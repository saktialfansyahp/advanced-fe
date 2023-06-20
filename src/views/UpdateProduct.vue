<template>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Update Product</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProduct">
              <div class="form-group">
                <label for="nama_produk">Product Name</label>
                <input type="text" class="form-control" id="name" v-model="product.nama_produk">
              </div>
              <div class="form-group">
                <label for="deskripsi">Description</label>
                <input type="text" class="form-control" id="no_telepon" v-model="product.deskripsi">
              </div>
              <div class="form-group">
                <label for="harga">Invoice Amount</label>
                <input type="number" class="form-control" id="alamat" v-model="product.harga">
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
  name: "UpdateProduct",
  data() {
    return {
      product: {
        nama_produk: "",
        deskripsi: "",
        harga: ""
      }
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const productId = this.$route.params.id
      axios.get(`http://127.0.0.1:8000/api/auth/getProduk/${productId}`, {
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          this.product = response.data.produk
          console.log(this.product)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateProduct() {
      const productId = this.$route.params.id
      axios.post(`http://127.0.0.1:8000/api/auth/updateProduk/${productId}`, this.product, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data);
          this.$router.push('/product');
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
