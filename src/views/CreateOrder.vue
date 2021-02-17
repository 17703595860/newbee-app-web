<template>
  <div class="create-order">
    <h1>{{cartIds}}</h1>
    <h1>{{this.$route.params.cartIds}}</h1>
  </div>
</template>

<script>
export default {
  name: "CreateOrder",
  props: {
    cartIds: {
      type: String,
      default: null
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>
