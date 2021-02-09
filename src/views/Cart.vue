<template>
  <div class="cart-box">
    <SimpleHeader title="购物车"></SimpleHeader>
    <h1>测试sdfsdf测试</h1>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
export default {
  name: "Cart",
  components: { SimpleHeader }
}
</script>

<style lang="less" scoped>
  h1{
    width: 100px;
    height: 100px;
  }
</style>
