<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <edit-customer />
      </div>
    </div>
  </div>
</template>

<script>
import EditCustomer from "./components/EditCustomer.vue";

export default {
  name: "UpdateCustomer",
  components: {
    EditCustomer,
  },
  data() {
    return {
      
    };
  },
};
</script>
