<template>
  <div class="py-4 container-fluid">
      <div class=" row">
        <div class="col-12">
          <div class="card">
          <div class="card-body">
            <h5 class="card-title">Settings Reminder Status</h5>
            <form>
              <div class="">
                <div class="form-group">
                  <label for="status">Status:</label>
                  <select id="status" class="form-control" v-model="status.active">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="time">Time:</label>
                  <input type="time" id="time" class="form-control" v-model="status.time" step="3600" />
                </div>
                <div class="form-group">
                  <label for="daysToReminder">Days to Reminder 1:</label>
                  <select class="form-control" v-model="status.daystoadd1" id="daysToReminder">
                    <option value="1">1 Day</option>
                    <option value="3">3 Day</option>
                    <option value="7">7 Day</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="daysToReminder">Days to Reminder 2:</label>
                  <select class="form-control" v-model="status.daystoadd2" id="daysToReminder">
                    <option value="1">1 Day</option>
                    <option value="3">3 Day</option>
                    <option value="7">7 Day</option>
                  </select>
                </div>
              </div>
              <button @click.prevent="saveSettings" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Swal from 'sweetalert2';
// import { spawn } from 'child_process';

export default {
  name: "settings",
  data() {
    return {
      status: [],
      selectedStatus: '',
      selectedTime: '',
      isToggled: null
    }
  },
  components: {
    
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('https://alfajri.arw.my.id/api/auth/status/reminder')
        .then(response => {
          this.status = response.data
          console.log(response.data);
      })
    },
    saveSettings() {
      axios.post('https://alfajri.arw.my.id/api/auth/updateStatus', this.status)
        .then(response => {
          console.log(response)
          Swal.fire({
          title: 'Data Updated',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        })
        .catch(error => {
          console.log(error)
      })
    }
  }
};
</script>
