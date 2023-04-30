<template>
  <div class="form-wrapper">
    <h2>{{ title }}</h2>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" v-model="formData.phone" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="formData.message" required></textarea>
      </div>
      <button type="submit" @click.prevent="submitForm">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Contact Us',
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.formData);
      // You can send the form data to your server using axios or fetch API
    }
  }
}
</script>

<style>
.form-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  display: block;
  width: 100%;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}
</style>
