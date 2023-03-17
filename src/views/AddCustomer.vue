<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <create-customer />
      </div>
    </div>
  </div>
</template>

<script>
import CreateCustomer from "./components/CreateCustomer.vue";

export default {
  name: "AddCustomer",
  components: {
    CreateCustomer,
  },
  data() {
    return {
      
    };
  },
};
</script>
