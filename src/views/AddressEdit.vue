<template>
  <div class="address-edit-box">
    <SimpleHeader :title="title" :parent-go-back="true" />
    <van-address-edit
        class="edit"
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="type === 'edit'"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import { tdist } from '@/common/js/utils'
import userAddress from "@/api/userAddress";

export default {
  name: "AddressEdit",
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
    editAddressId: {
      type: String,
      default: null
    },
    from: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      title: !this.$route.params.editAddressId ? '新增地址' : '修改地址',
      type: !this.$route.params.editAddressId ? 'add' : 'edit',
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      addressInfo: {},
      searchResult: []
    }
  },
  async mounted() {
    // 省市区列表构造
    let _province_list = {}
    let _city_list = {}
    let _county_list = {}
    tdist.getLev1().forEach(p => {
      _province_list[p.id] = p.text
      tdist.getLev2(p.id).forEach(c => {
        _city_list[c.id] = c.text
        tdist.getLev3(c.id).forEach(q => _county_list[q.id] = q.text)
      })
    })
    this.areaList.province_list = _province_list
    this.areaList.city_list = _city_list
    this.areaList.county_list = _county_list

    if (this.editAddressId) {
      const { data: address } = await userAddress.getUserAddressById(this.editAddressId)
      let _areaCode = ''
      const province = tdist.getLev1()
      Object.entries(this.areaList.county_list).forEach(([id, text]) => {
        // 先找出当前对应的区
        if (text == address.regionName) {
          // 找到区对应的几个省份
          const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
          // 找到区对应的几个市区
          const cityItem = Object.entries(this.areaList.city_list).filter(([cityId]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
          // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
          if (province[provinceIndex].text == address.provinceName && cityItem[1] == address.cityName) {
            _areaCode = id
          }
        }
      })
      this.addressInfo = {
        id: address.addressId,
        name: address.userName,
        tel: address.userPhone,
        province: address.provinceName,
        city: address.cityName,
        county: address.regionName,
        addressDetail: address.detailAddress,
        areaCode: _areaCode,
        isDefault: !!address.defaultFlag
      }
    }
  },
  methods: {
    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault,
      }
      if (this.type === 'edit') {
        params['addressId'] = this.addressId
      }
      await this.type === 'add' ? userAddress.addUserAddress(params) : userAddress.updateUserAddress(params)
      this.$toast.success('保存成功')
      setTimeout(() => {
        this.$router.push({ name: `address`, params: {cartIds: this.cartIds, addressId: this.addressId, from: this.from} })
      }, 1000)
    },
    goBack() {
      this.$router.push({ name: `address`, params: {cartIds: this.cartIds, addressId: this.addressId, from: this.from} })
    },
    async onDelete() {
      await userAddress.deleteUserAddress(this.editAddressId)
      this.$toast.success('删除成功')
      setTimeout(() => {
        this.$router.push({ name: `address`, params: {cartIds: this.cartIds, addressId: this.addressId, from: this.from} })
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import '../common/style/mixin';
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }
    .van-switch--on {
      background: @primary;
    }
  }
}
</style>
