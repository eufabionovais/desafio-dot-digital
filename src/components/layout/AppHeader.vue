<template>
  <header>
    <div class="inner-content">
     <AppLogo />
     <form @submit.prevent="searchForMovies">
      <input type="text" v-model="searchString">
      <button type="submit">Buscar</button>
      <button type="button"  @click="resetMoviesList">Limpar</button>
     </form>

     <div class="actions">
      <button>Favoritos</button>
      <button>Carrinho</button>
     </div>

    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import AppLogo from './AppLogo.vue';
export default {
  components: {
    AppLogo
  },
   data() {
      return {
        searchString: ''
      }
    },
    methods: {

      ...mapActions(['fetchMovies', 'searchMovies']),

      async searchForMovies() {
        if(this.searchString === '' || this.searchString.length <= 3) {
          return
        }
        await this.$store.dispatch('searchMovies', this.searchString);
      },

      async resetMoviesList() {
       await this.$store.dispatch('fetchMovies', true);
       this.searchString = '';
      }

    }  
}
</script>

<style scoped>
.inner-content {
  display: flex;
  justify-content: space-between;
}
</style>

