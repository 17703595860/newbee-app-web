<template>
  <div class="address-box">
    <SimpleHeader :title="title" :parent-go-back="from === 'order'" />
    <div class="address-item">
      <van-address-list
        v-if="from === 'order'"
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import userAddress from "@/api/userAddress";

export default {
  name: "Address",
  components: { SimpleHeader },
  props: {
    cartIds: {
      type: String,
      default: null
    },
    addressId: {
      type: String,
      default: null
    },
    from: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      title: '地址管理',
      addressList: [],
      chosenAddressId: 1
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const {data} = await userAddress.getAll()
      this.addressList = data.map(address => {
        return {
          id: address.addressId,
          name: address.userName,
          tel: address.userPhone,
          address: address.provinceName + ' ' + address.cityName + ' ' + address.regionName + ' ' + address.detailAddress,
          isDefault: address.defaultFlag
        }
      })
    },
    goBack() {
      this.$router.push({name: 'createOrder', params: {cartIds: this.cartIds, addressId: this.addressId}})
    },
    onAdd() {
      this.$router.push({ name: 'addressEdit', params: { cartIds: this.cartIds, addressId: this.addressId, from: this.from}})
    },
    onEdit(item) {
      this.$router.push({ name: 'addressEdit', params: { cartIds: this.cartIds, addressId: this.addressId, from: this.from, editAddressId: item.id }})
    },
    select(item) {
      this.$router.push({name: 'createOrder', params: {cartIds: this.cartIds, addressId: item.id}})
    }
  }
}
</script>

<style lang="less">
  @import '../common/style/mixin';
  .address-box {
    .van-radio__icon {
      display: none;
    }
    .address-item {
      margin-top: 44px;
      .van-button {
        background: @primary;
        border-color: @primary;
      }
    }
  }
</style>
