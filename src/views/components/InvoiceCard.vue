<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Invoice</h6>
      <a href="/addInvoice"><argon-button variant="gradient">Add Invoice</argon-button></a>
      <!-- <argon-button @click="startSimulation">Mulai Simulasi</argon-button>
      <argon-button @click="stopSimulation">Hentikan Simulasi</argon-button>
      <argon-button @click="toggle">
        <i :class="isToggled ? 'bi bi-toggle2-on' : 'bi bi-toggle2-off'"></i>
      </argon-button> -->
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead v-if="transactions.length != 0">
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Invoice Number</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Phone</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 pe-2" style="text-align: right;" 
              >Invoice Amount</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4"
              >Due Date</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Status</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Action</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <thead v-else>
            <span class="text-bold mt-2 ms-4">No Data Found</span>
          </thead>
          <tbody>
            <tr v-for="(transactions, index) in transactions" :key="index">
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="text-xs font-weight-bold">{{ transactions.no_tagihan}}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ transactions.user.firstname }} {{ transactions.user.lastname }}</h6>
                    <span class="text-secondary text-xs font-weight-bold">{{ transactions.user.email}}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.pelanggan.no_telp}}</span>
              </td>
              <td style="text-align: right;">
                <span class="text-secondary text-xs font-weight-bold">Rp{{ transactions.jumlah_tagihan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold ms-3 me-2">{{ transactions.jatuh_tempo}}</span>
              </td>
              <td class="text-sm">
                <span v-if="transactions.status_tagihan === 'Lunas'" class="badge badge-sm bg-gradient-success">{{ transactions.status_tagihan }}</span>
                <span v-else class="badge badge-sm bg-gradient-danger">{{ transactions.status_tagihan }}</span>
                <a :href="'/updateStatus' + '/' + transactions.no_tagihan" class="text-dark text-xs ms-2">
                <!-- <a href="#" @click="cek(transactions.transaksi.no_tagihan, transactions.transaksi.status_tagihan)" class="text-dark text-xs ms-2"> -->
                    <i :title="'Edit Status'" class="bi bi-pencil-square"></i>
                  </a>
              </td>
              <td class="align-middle text-center">
                <template  v-if="transactions.status_tagihan === 'Belum Bayar'">
                  <a href="#" @click="sendMail(transactions.user.email, transactions.user.firstname, transactions.user.lastname, transactions.no_tagihan, transactions.user.address, transactions.jatuh_tempo, transactions.jumlah_tagihan, transactions.transaksi_produk)" class="text-secondary font-weight-bold text-xs">
                    <i :title="'Send Mail'" class="bi bi-send-fill"></i>
                  </a>
                  <!-- <a href="#" @click="cobak(transactions.transaksi_produk)" class="text-secondary font-weight-bold text-xs ms-3"> -->
                    <a href="#" @click="pdf(transactions.user.email, transactions.user.firstname, transactions.user.lastname, transactions.no_tagihan, transactions.user.address, transactions.jatuh_tempo, transactions.jumlah_tagihan, transactions.transaksi_produk)" class="text-secondary font-weight-bold text-xs ms-3">
                    <i :title="'Detail'" class="bi bi-eye-fill"></i>
                  </a>
                  <a href="#" @click="sendWa(transactions.pelanggan.no_telp, transactions.user.firstname, transactions.user.lastname, transactions.jatuh_tempo)" class="text-secondary font-weight-bold text-xs ms-3">
                    <i :title="'Send Whatsapp'" class="bi bi-whatsapp"></i>
                  </a>
                </template>
                <template v-else>
                  <a href="#" @click="pdf(transactions.user.email, transactions.user.firstname, transactions.user.lastname, transactions.no_tagihan, transactions.user.address, transactions.jatuh_tempo, transactions.jumlah_tagihan, transactions.transaksi_produk)" class="text-secondary font-weight-bold text-xs">
                    <i :title="'Detail'" class="bi bi-eye-fill"></i>
                  </a>
                </template>
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
import Swal from 'sweetalert2'

export default {
  name: "transactions",
  data(){
    return {
      product: [],
      transactions: [],
      quantity: "",
      intervalId: null,
      simulationTime: null,
      jatuhTempo: '2023-05-11',
      isToggled: null
    }
  },
  components: {
    ArgonButton
  },
  beforeMount() {
    this.fetchData()
  },
  // created(){
  //   this.fetchData()
  // },
  methods: {
    cek(no_tagihan, status_tagihan){
      axios.post(`https://alfajri.arw.my.id/api/auth/updateTransaksi/${no_tagihan}`, {
        status_tagihan: status_tagihan,
      }, {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        console.log(response)
      })
    },
    toggle() {
      this.isToggled = !this.isToggled;
      if(this.isToggled == true){
        console.log('on')
      } else {
        console.log('off')
      }
    },
    fetchData(){
      // axios.get('https://alfajri.arw.my.id/api/auth/displayTransaksi?sort=invoice_number&order=asc', {
      axios.get('https://alfajri.arw.my.id/api/auth/displayTransaksi', {
        headers:{
          'Authorization': 'Bearer' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        // const transactions = response.data;

        // const filteredTransactions = transactions.filter(item => item.transaksi.length > 0);

        // this.transactions = filteredTransactions;
        this.transactions = response.data
        console.log(this.transactions)

        for (var key in response.data) {
          var transaksi = response.data[key];
          this.product.push(transaksi.transaksi_produk);
        }
        const index = Object.keys(this.transactions).length.toString()
      
        const lastInvoiceNumber = this.transactions[index-1].no_tagihan;
        localStorage.setItem('no_tagihan', lastInvoiceNumber)
        
      })
      .catch(error => {
        console.log(error)
      })
    },
    async sendMail(email, firstname, lastname, no_tagihan, address, jatuh_tempo, jumlah_tagihan, produk) {
      Swal.fire({
        title: 'Sending email...',
        text: `Sending email to ${firstname} ${lastname} at ${email}...`,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      this.product = [];
      if (produk && produk.length > 0) {
        produk.forEach(transaksi => {
          const produk = transaksi;
          if (produk) {
            // const namaProduk = produk.nama_produk;
            // console.log(namaProduk); // Contoh tindakan yang ingin Anda lakukan dengan nama_produk
            this.product.push(produk)
          }
        });
      }
      const requestData = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        no_tagihan: no_tagihan,
        address: address,
        jatuh_tempo: jatuh_tempo,
        jumlah_tagihan: jumlah_tagihan,
        produk: this.product
      };

      await axios.post(`https://alfajri.arw.my.id/api/auth/send`, requestData, {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        Swal.fire({
          title: 'Email sent',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        console.log(response.status)
        console.log(response)
      })
      .catch(error => {
        Swal.fire({
          title: 'Failed to send email',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      });
    },
    async pdf(email, firstname, lastname, no_tagihan, address, jatuh_tempo, jumlah_tagihan, produk) {
      this.product = [];
      if (produk && produk.length > 0) {
        produk.forEach(transaksi => {
          const produk = transaksi;
          if (produk) {
            // const namaProduk = produk.nama_produk;
            // console.log(namaProduk); // Contoh tindakan yang ingin Anda lakukan dengan nama_produk
            this.product.push(produk)
          }
        });
      }
      const requestData = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        no_tagihan: no_tagihan,
        address: address,
        jatuh_tempo: jatuh_tempo,
        jumlah_tagihan: jumlah_tagihan,
        produk: this.product
      };

      await axios.post(`https://alfajri.arw.my.id/api/auth/pdf`, requestData, { responseType: 'blob' }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      })
        .then(response => {
          console.log(response)
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          console.log(requestData)
          localStorage.setItem('invoice', url);
          this.$router.push('/pdf')
        })
        .catch(error => {
          console.log(error)
          console.log(requestData, 'error')
        });
    },
    async sendWa(no_telp, firstname, lastname, jatuh_tempo) {
      Swal.fire({
        title: 'Sending whatsapp...',
        text: `Sending whatsapp message to ${firstname} ${lastname} at ${no_telp}...`,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      const name = firstname + ' ' + lastname
      await axios.post(`https://alfajri.arw.my.id/api/auth/whatsapp`, {
        no_telp: no_telp,
        name: name,
        jatuh_tempo: jatuh_tempo
      },{
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      .then(response => {
        Swal.fire({
          title: 'Whatsapp sent',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        console.log(response)
      })
      .catch(error => {
        Swal.fire({
          title: 'Failed to send whatsapp',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        console.log(name)
      });
    },
    // async sendMail(email, name) {
    //   await axios.post(`https://alfajri.arw.my.id/api/auth/send`, {
    //     subject: 'reminder',
    //     email: email,
    //     body: name
    //   }, {
    //     headers: {
    //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    //     }
    //   })
    //   .then(response => {
    //     console.log(response.status)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // }
    startSimulation() {
      // Mulai simulasi waktu setiap detik
      this.simulationTime = new Date();
      this.intervalId = setInterval(this.simulateTime, 60000);
      console.log('Start')
    },
    stopSimulation() {
      // Hentikan simulasi waktu
      clearInterval(this.intervalId);
      console.log('Stop')
    },
    simulateTime() {
      // Simulasikan waktu dengan mengurangi beberapa detik atau menit dari waktu saat ini
      this.simulationTime.setSeconds(this.simulationTime.getSeconds() - 1);

      // Periksa apakah waktu simulasi sama dengan waktu jatuh tempo yang diinginkan
      const currentTime = this.simulationTime.toISOString().split('T')[0];
      if (currentTime === this.jatuhTempo) {
        // Lakukan tindakan yang diinginkan saat waktu jatuh tempo tercapai
        console.log('Waktu jatuh tempo telah tercapai!');
        // this.metodeLain(); // Panggil metode lain yang diinginkan
      }
    },
    async cobak(transaksiProduk) {
      this.product = [];
      if (transaksiProduk && transaksiProduk.length > 0) {
        transaksiProduk.forEach(transaksi => {
          const produk = transaksi.produk;
          if (produk) {
            // const namaProduk = produk.nama_produk;
            // console.log(namaProduk); // Contoh tindakan yang ingin Anda lakukan dengan nama_produk
            this.product.push(produk)
            console.log(produk)
          }
        });
      }
      console.log(this.product)
    }
  }
};
</script>
