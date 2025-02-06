<template>
  <AppHeader />

  <main class="main-content">
    <div class="inner-content">
      <RouterView />      
    </div>
  </main>

  <aside class="sidebar" :class="{'opened': sidebarStatus}">

    <ShoppingCart :is-sidebar="true">
        <template #content__footer>
        </template>
    </ShoppingCart>

  </aside>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppHeader from './components/layout/AppHeader.vue';
import ShoppingCart from './components/cart/ShoppingCart.vue';

export default {
  components: {
    AppHeader,
    ShoppingCart
  },

  methods: {
    ...mapActions(['toggleSidebar']),
  },  

  computed: {
    ...mapGetters(['loading', 'error', 'sidebarStatus']),    
  },

  watch: {
    '$route'(to, from) {
      this.toggleSidebar(false)
    }
  }  
}
</script>


