<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <edit-status />
      </div>
    </div>
  </div>
</template>

<script>
import EditStatus from "./components/EditStatus.vue";

export default {
  name: "UpdateCustomer",
  components: {
    EditStatus,
  },
  data() {
    return {
      
    };
  },
};
</script>
