<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <create-invoice />
      </div>
    </div>
  </div>
</template>

<script>
import CreateInvoice from "./components/CreateInvoice.vue";

export default {
  name: "AddInvoice",
  components: {
    CreateInvoice,
  },
  data() {
    return {
      
    };
  },
};
</script>
