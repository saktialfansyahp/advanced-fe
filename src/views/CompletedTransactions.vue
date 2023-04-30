<template>
    <div class="py-4 container-fluid">
      <div class=" row">
        <div class="col-12">
          <transactions />
        </div>
      </div>
    </div>
</template>

<script>
import Transactions from "./components/Transactions.vue";

export default {
  name: "tables",
  components: {
    Transactions,
  },
  data() {
    return {
      
    };
  },
};
</script>