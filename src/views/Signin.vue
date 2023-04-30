<template>
  <ArgonAlert v-if="errorMessage" type="error" dismissible>
    {{ errorMessage }}
  </ArgonAlert>
  <main class="main-content mt-0 pt-4 pb-1">
    <div class="page-header align-items-start pt-5 pb-7 m-2 border-radius-lg" style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: center;">
      <div class="container mt-10">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
          <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0">
              <div class="card-header text-center pt-4">
                <h5>Login</h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitForm">
                    <argon-input type="email" placeholder="Email" aria-label="Email" @input="emailvalue"/>
                    <argon-input type="password" placeholder="Password" aria-label="Password" @input="passwordvalue"/>
                    <!-- <argon-checkbox checked>
                      <label class="form-check-label" for="flexCheckDefault">
                        I agree the
                        <a
                          href="javascript:;"
                          class="text-dark font-weight-bolder"
                        >Terms and Conditions</a>
                      </label>
                    </argon-checkbox> -->
                    <div class="text-center">
                      <argon-button type="submit" fullWidth color="dark" variant="gradient" class="my-4 mb-2">Login</argon-button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
// import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import axios from 'axios';
import ArgonAlert from "@/components/ArgonAlert.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  data(){
    return{
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  components: {
    ArgonInput,
    // ArgonCheckbox,
    ArgonButton,
    ArgonAlert,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    // this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    emailvalue(email){
      this.email = email.target.value
    },
    passwordvalue(password){
      this.password = password.target.value
    },
    async submitForm(){
      const data = {
        email: this.email,
        password: this.password,
      };
      await axios.post('http://localhost:8000/api/auth/login/', data)
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        console.log(response.data)
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error, data)
        this.errorMessage = error.response.data.error
      })
    }
  }
};
</script>