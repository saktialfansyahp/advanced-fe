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
                  <label for="telepon">Product</label>
                  <input type="text" class="form-control" id="no_telepon" v-model="form.produk">
                </div>
                <div class="form-group">
                  <label for="kota">Due Date</label>
                  <input type="date" class="form-control" id="kota" v-model="form.jatuh_tempo">
                </div>
                <div class="form-group">
                  <label for="alamat">Invoice Amount</label>
                  <input type="text" class="form-control" id="alamat" v-model="form.jumlah_tagihan">
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
                    <select class="form-control" id="status" value="Choose Status" v-model="form.pelanggan_id">
                      <option value="" disabled selected>Pilih pelanggan</option>
                      <option v-for="option in customerOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
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
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
    name: "create-invoice",
    data() {
        return {
        customerOptions: [],
        form: {
            no_tagihan: "",
            produk: "",
            jatuh_tempo: "",
            jumlah_tagihan: "",
            status_tagihan: "",
            pelanggan_id: "",
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
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      async submitForm(){
          await axios.post('http://127.0.0.1:8000/api/auth/createTransaksi', this.form, {
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
      },
      async fetchData() {
        await axios.get('http://127.0.0.1:8000/api/auth/displayPelanggan', {
          headers:{
            'Authorization': 'Bearer' + localStorage.getItem('access_token')
          }
        })
        .then(response => {
          this.customer = response.data
          this.customerOptions = response.data.map(c => {
            return { value: c.id, text: c.name }
          })
          console.log(this.customerOptions)
        })
        .catch(error => {
          console.log(error)
        })
      },
      formatDate(date){
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      }
    }
    };
</script>
  