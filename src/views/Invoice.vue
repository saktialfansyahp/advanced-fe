<template>
    <div class="py-4 container-fluid">
      <div class=" row">
        <div class="col-12">
          <invoice-card />
        </div>
      </div>
    </div>
</template>

<script>
import InvoiceCard from "./components/InvoiceCard.vue";

export default {
  name: "tables",
  components: {
    InvoiceCard,
  },
  data() {
    return {
      
    };
  },
};
</script>