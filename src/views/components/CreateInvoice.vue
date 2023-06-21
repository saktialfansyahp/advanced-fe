<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Add Invoice</h3>
            </div>
            <div class="card-body">
              <form>
                <ArgonAlert v-if="errorMessage" type="error" dismissible>
                  {{ errorMessage }}
                </ArgonAlert>
                <div class="form-group">
                  <label for="name">Invoice Number</label>
                  <input type="text" class="form-control" id="name" v-model="form.no_tagihan">
                </div>
                <div class="form-group">
                  <label for="kota">Due Date</label>
                  <input type="date" class="form-control" id="kota" v-model="form.jatuh_tempo">
                </div>
                <div class="form-group">
                  <label for="jenis">Status</label>
                    <select class="form-control" id="status" value="Choose Status" v-model="form.status_tagihan">
                        <option value="">Choose Type</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Bayar">Belum Bayar</option>
                    </select>
                </div>
                <div class="form-group">
                  <label for="customerId">Customer Id</label>
                  <select @change="setUserid" class="form-control" id="status" value="Choose Status" v-model="form.pelanggan_id">
                    <option value="" disabled selected>Pilih pelanggan</option>
                    <option v-for="option in customerOptions" :key="option.id" :data-userid="option.user_id" :value="option.id">{{ option.firstname }} {{ option.lastname}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="produk">Products</label>
                  <div v-for="(product, index) in form.produks" :key="index">
                    <div class="input-group mb-3">
                      <select @change="setProductid" class="form-select" v-model="product.produk_id">
                        <option value="" disabled selected>Pilih produk</option>
                        <option v-for="option in productOptions" :disabled="isProductSelected(option.id)" :data-productid="option.id" :key="option.id" :value="option.id">{{ option.nama_produk }}</option>
                      </select>
                      <input @change="calculateTotal" type="number" class="form-control" placeholder="Quantity" v-model="product.quantity">
                      <i @click="removeProduct(index)" :title="'Remove'" style="display: flex; align-items: center; justify-content: center;" class="bi bi-x-square ms-4 me-4"></i>
                      <!-- <button type="button" class="btn btn-danger ms-2" @click="removeProduct(index)">Remove</button> -->
                      <div class="ms-12"></div>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn-primary ms-2" @click="addProduct">Add Product</button>
                <div class="form-group">
                  <label for="alamat">Invoice Amount</label>
                  <input type="number" class="form-control" id="alamat" v-model="form.jumlah_tagihan" readonly :style="{ backgroundColor: 'white' }">
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
    name: "create-invoice",
    data() {
        return {
        customerOptions: [],
        productOptions: [],
        form: {
            no_tagihan: "",
            produk: "",
            jatuh_tempo: "",
            jumlah_tagihan: "",
            status_tagihan: "",
            pelanggan_id: "",
            user_id: "",
            produks: []
        },
        errorMessage: ''
        };
    },
    components: {
      ArgonAlert
    },
    computed: {
      formattedDate: {
        get(){
          return this.form.jatuh_tempo
        },
        set(newValue){
          this.form.jatuh_tempo = this.formattedDate(newValue)
        }
      },
    },
    created(){
      this.fetchData()
      this.fetchProduk()
      this.no_tagihan()
    },
    methods: {
      isProductSelected(productId) {
        return this.form.produks.some(product => product.produk_id === productId);
      },
      addProduct() {
        this.form.produks.push({
          nama_produk: '',
        });
      },
      removeProduct(index) {
        this.form.produks.splice(index, 1);
      },
      async no_tagihan() {
        const no_tagihan = localStorage.getItem('no_tagihan')
        const angkaTagihan = parseInt(no_tagihan.slice(1)); // Mengambil angka dari string 'noTagihan'
        const nomorTagihanBaru = angkaTagihan + 1; // Menambahkan 1 ke angkaTagihan
        const noTagihanBaru = 'A' + nomorTagihanBaru.toString().padStart(2, '0');
        this.form.no_tagihan = noTagihanBaru
      },
      async submitForm(){
          await axios.post('https://alfajri.arw.my.id/api/auth/createTransaksi', this.form, {
              headers:{
              'Authorization': 'Bearer' + localStorage.getItem('access_token')
              }
          })
          .then(response => {
              this.$router.push('/invoice')
              console.log(response.data)
          })
          .catch(error => {
              console.log(error.response.data)
              this.errorMessage = error.response.data.error
          })
          console.log(this.form)
      },
      async fetchData() {
        await axios.get('https://alfajri.arw.my.id/api/auth/displayPelanggan', {
          headers:{
            'Authorization': 'Bearer' + localStorage.getItem('access_token')
          }
        })
        .then(response => {
          this.customerOptions = response.data
          .filter( c => c.status === 'Active')
          .map(c => {
            return { 
              id: c.id, firstname: c.user.firstname, lastname: c.user.lastname, user_id: c.user_id
            }
          })
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      fetchProduk() {
      axios.get('https://alfajri.arw.my.id/api/auth/getProduk', {
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
        .then(response => {
          // const transactions = response.data;

          // const filteredTransactions = transactions.filter(item => item.transaksi.length > 0);

          // this.transactions = filteredTransactions;
          this.productOptions = response.data.produk
          console.log(this.productOptions)
        })
        .catch(error => {
          console.log(error)
        })
      },
      setUserid(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedUserId = selectedOption.getAttribute('data-userid');
        this.form.user_id = selectedUserId;
        console.log(this.form.user_id);
      },
      setProductid(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const selectedProductId = selectedOption.getAttribute('data-productid');
        this.form.produks.produk_id = selectedProductId
        console.log(this.form.produks.produk_id);
      },
      formatDate(date){
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      },
      calculateTotal() {
        let total = 0;

        // Iterasi melalui produk yang dipilih
        this.form.produks.forEach((product) => {
          // Ambil harga produk dari daftar produk berdasarkan produk_id
          const selectedProduct = this.productOptions.find((option) => option.id === product.produk_id);
          const productPrice = selectedProduct.harga;

          // Hitung subtotal berdasarkan harga produk x quantity
          const subtotal = productPrice * product.quantity;

          // Tambahkan subtotal ke total
          total += subtotal;
        });

        // Tambahkan total ke properti jumlah_tagihan di dalam form
        this.form.jumlah_tagihan = total;
      },
    }
    };
</script>
  