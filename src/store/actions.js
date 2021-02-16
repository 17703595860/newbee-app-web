import cart from "@/api/cart";

export default {
  async updateCart(context) {
    const {data} = await cart.getAll()
    context.commit('updateCart', data.length || 0)
  }
}
