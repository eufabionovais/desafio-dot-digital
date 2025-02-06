import { mapState, mapGetters } from 'vuex';
export const cartTotal = {  
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['loading', 'error', 'sidebarStatus']),

    totalValue() {
      return this.shopCart.reduce((acumulator, currentItem) => {
        const total = Number(acumulator) + Number(currentItem.price) * currentItem.quantity;
        return  total;
      },0)
    },
  },  
}