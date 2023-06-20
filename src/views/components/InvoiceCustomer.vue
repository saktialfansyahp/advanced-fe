<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Invoice</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Invoice Number</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Phone</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Product</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Invoice Amount</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
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
          <tbody>
            <tr v-for="(transactions, index) in transactions" :key="index">
              <td>
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="text-xs font-weight-bold">{{ transactions.transaksi[index].no_tagihan}}</h6>
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
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.no_telp}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.transaksi[index].produk}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.transaksi[index].jumlah_tagihan}}</span>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ transactions.transaksi[index].jatuh_tempo}}</span>
              </td>
              <td class="text-sm">
                <span v-if="transactions.transaksi[index].status_tagihan === 'Lunas'" class="badge badge-sm bg-gradient-success">{{ transactions.transaksi[index].status_tagihan }}</span>
                <span v-else class="badge badge-sm bg-gradient-danger">{{ transactions.transaksi[index].status_tagihan }}</span>
                <a href="#" class="text-dark text-xs ms-2">
                    <i :title="'Edit Status'" class="bi bi-pencil-square"></i>
                  </a>
              </td>
              <td class="align-middle text-center">
                <template  v-if="transactions.transaksi[index].status_tagihan === 'Belum Bayar'">
                  <a href="#" @click="sendMail(transactions.user.email, transactions.user.firstname, transactions.transaksi[index].no_tagihan)" class="text-secondary font-weight-bold text-xs">
                    <i :title="'Send Mail'" class="bi bi-send-fill"></i>
                  </a>
                  <a href="#" @click="sendWa(transactions.no_telp, transactions.user.firstname, transactions.user.lastname, transactions.transaksi[index].jatuh_tempo)" class="text-secondary font-weight-bold text-xs ms-4">
                    <i :title="'Send Whatsapp'" class="bi bi-whatsapp"></i>
                  </a>
                </template>
                <template v-else>
                  <a href="#" class="text-secondary font-weight-bold text-xs">
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
import Swal from 'sweetalert2'

export default {
  name: "transactions",
  data(){
    return {
      transactions: [],
      intervalId: null,
      simulationTime: null,
      jatuhTempo: '2023-05-11',
      isToggled: null
    }
  },
  components: {
    
  },
  mounted(){
    this.fetchData()
  },
  methods: {
    toggle() {
      this.isToggled = !this.isToggled;
      if(this.isToggled == true){
        console.log('on')
      } else {
        console.log('off')
      }
    },
    fetchData(){
      axios.get('http://127.0.0.1:8000/api/auth/displayTransaksi', {
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
    async sendMail(email, name, no_tagihan) {
      Swal.fire({
        title: 'Sending email...',
        text: `Sending email to ${name} at ${email}...`,
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });

      await axios.post(`http://127.0.0.1:8000/api/auth/send`, {
        subject: 'Send Mail',
        no_tagihan: no_tagihan,
        email: email,
        name: name
      }, {
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
      await axios.post(`http://127.0.0.1:8000/api/auth/whatsapp`, {
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
          title: 'Failed to send email',
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
    //   await axios.post(`http://127.0.0.1:8000/api/auth/send`, {
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
  }
};
</script>
