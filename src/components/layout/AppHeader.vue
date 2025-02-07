<template>
  <header>
    <div class="inner-content">
     <AppLogo />
     <form @submit.prevent="searchForMovies" class="search-form" v-if="!isCheckoutPage">
      <div class="form-group-icon">
        <input type="text" v-model="searchString" placeholder="Qual filme deseja encontrar?">
        <button class="btn" type="submit" aria-label="Buscar filmes" :disabled="searchString.length < 3"><v-icon name="bi-search" scale="1.2" class="icon" /></button>
      </div>
      <button class="btn" type="button" aria-label="Limpar filtro"  @click="resetMoviesList" :disabled="!searchString.length"><v-icon name="md-clear-round" class="icon" scale="1.2" /></button>
     </form>


     <div class="actions">
      <BaseTooltip label="Favoritos">
        <button class="btn" aria-label="Filmes adicionados aos favoritos" @click="toggleAsideContent('favorites')"><v-icon :name="favorites.length ? 'bi-heart-fill' : 'bi-heart' " fill="#ff0000" scale="1.5" /></button>
      </BaseTooltip>
      <BaseTooltip label="Carrinho">
      <button class="btn btn-shopping-cart" @click="toggleAsideContent('shopping-cart')"  aria-label="Filmes adicionados ao carrinho"><v-icon name="bi-cart" scale="1.5" /> <span class="shopping-cart-total">{{ totalItensShopCart }}</span></button>
      </BaseTooltip>
     </div>

    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
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

      ...mapActions(['fetchMovies', 'searchMovies', 'toggleSidebar', 'toggleSidebarContent']),

       ...mapMutations(['TOGGLE_SIDEBAR']),

      toggleSidebar(content) {
        this.TOGGLE_SIDEBAR(content);
      },       

      toggleAsideContent(content) {
        this.toggleSidebarContent(content);
      },  

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

    },
    computed: {
      ...mapGetters(['shopCart', 'favorites', 'sidebarContent']),
      ...mapState(['sidebarStatus']),
      totalItensShopCart() {
        return this.shopCart.reduce((acumulator, currentItem) => {
          return acumulator += currentItem.quantity;
        },0)
      },

      isCheckoutPage() {
        return this.$route.name === 'checkout'; 
      }
    }  
}
</script>

<style scoped lang="scss">
header {
  height: 80px;
  background: #fff;
  box-shadow: 0 5px 5px rgba(0,0,0,0.05);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.inner-content {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  height: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-shopping-cart {
  position: relative;
}

.shopping-cart-total {
    background: #ff0000;
    position: absolute;
    top: -8px;
    right: -12px;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    font-size: 12px;
    min-width: 22px;
    aspect-ratio: 1;
    font-weight: 500;
    color: #fff;
}

.search-form {
  display: flex;
  gap: 8px;
  .icon {
    fill: #aaa;
  }  
}

.form-group-icon {
  display: flex;
  position: relative;
  input {
    padding: 8px 16px;
    height: 40px;
    border-radius: 20px;
    border: solid 1px #cacaca;
    min-width: 150px;    
    max-width: 195px;
    padding-right: 50px;
    font-size: 16px;
  }
  .btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);

  }
}


@media (min-width: 768px) {
  .search-form {
    display: flex;
  }
  .form-group-icon {
    input {
      min-width: 450px;
      
    }
  }
}

</style>

