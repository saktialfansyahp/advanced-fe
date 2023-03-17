<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <customers-table />
      </div>
    </div>
  </div>
</template>

<script>
import CustomersTable from "./components/CustomersTable.vue";

export default {
  name: "tables",
  components: {
    CustomersTable,
  },
  data() {
    return {
      
    };
  },
};
</script>
