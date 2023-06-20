<template>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Invoice</h3>
          </div>
          <div class="card-body">
            <embed :src="pdf" type="application/pdf" width="100%" height="500px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "pdf",
  data() {
    return {
      pdf: localStorage.getItem('invoice')
    };
  },
  beforeUnmount() {
    // localStorage.removeItem('invoice')
  },
  created(){
    
  },
  methods: {
    
  }
};
</script>
