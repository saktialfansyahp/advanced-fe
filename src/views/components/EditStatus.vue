<template>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Update Status</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateStatus(transactions.user.firstname, transactions.user.lastname, transactions.pelanggan.no_telp, transactions.status_tagihan)">
              <div class="form-group">
                  <label for="jenis">Status</label>
                    <select class="form-control" id="status" value="Choose Status" v-model="transactions.status_tagihan">
                        <option value="">Choose Type</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Bayar">Belum Bayar</option>
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
  name: "edit-status",
  data() {
    return {
      transactions: {
        status_tagihan: "",
      },
    };
  },
  created(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      const id = this.$route.params.id
      axios.get(`https://alfajri.arw.my.id/api/auth/getTransaksi/${id}`, {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.transactions = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    send(){

    },
    updateStatus(firstname, lastname, no_telp, status_tagihan) {
      const id = this.$route.params.id
      axios.post(`https://alfajri.arw.my.id/api/auth/updateTransaksi/${id}`, this.transactions, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        const name = firstname + ' ' + lastname
        console.log(response.data, no_telp);
        if(status_tagihan == 'Lunas'){
          axios.post(`https://alfajri.arw.my.id/api/auth/lunas`, {
            no_telp: no_telp,
            name: name,
          },{
            headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
          })
          .then(
            console.log('Whatsapp Send Success')
          )
        }
        this.$router.push('/invoice');
      })
      .catch(error => console.log(error));
    },
  }
};
</script>
