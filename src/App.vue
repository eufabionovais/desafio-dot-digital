<template>
  <AppHeader />

  <main class="main-content">
    <div class="inner-content">
      <RouterView />      
    </div>
  </main>

  <aside class="sidebar" :class="{'opened': sidebarStatus}">
    
    <ShoppingCart :is-sidebar="true"  v-if="sidebarContent === 'shopping-cart'">
        <template #content__footer>
        </template>
    </ShoppingCart>

    <FavoritesList  v-if="sidebarContent === 'favorites'" /> 

  </aside>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import AppHeader from './components/layout/AppHeader.vue';
import ShoppingCart from './components/cart/ShoppingCart.vue';
import FavoritesList from './components/favorites/FavoritesList.vue';

export default {
  components: {
    AppHeader,
    ShoppingCart,
    FavoritesList
  },

  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
    ...mapActions(['toggleSidebar']),
      toggleSidebar() {
        this.TOGGLE_SIDEBAR(null);
      }    
  },  

  computed: {
    ...mapGetters(['loading', 'error', 'sidebarStatus', 'sidebarContent']),    
  },

  watch: {
    '$route'(to, from) {
      this.toggleSidebar(false)
    }
  }  
}
</script>


