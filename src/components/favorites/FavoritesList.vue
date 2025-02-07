<template>
    <header class="sidebar__header">
      <div class="sidebar__header-content">
        
          <h3 class="sidebar__title">Meus Favoritos</h3>
          <BaseTooltip label="Limpar favoritos" v-if="favorites.length">
            <button @click="emptyFavorites" class="btn" type="button" aria-label="Limpar Favoritos"><v-icon name="io-heart-dislike-outline" scale="1.3" fill="#fff"  /></button>
          </BaseTooltip>
        
          <BaseTooltip label="Fechar" style="margin-left: auto">
            <button  class="btn btn-close" @click="toggleSidebar(false)" aria-label="Fechar carrinho"><v-icon name="bi-arrow-right" /></button>
          </BaseTooltip>
      </div>
    </header>
    <div class="sidebar__content">
      <table class="sidebar__table" v-if="favorites.length">
        <thead>
          <tr>
            <th class="text--left">&nbsp;</th>
            <th class="text--left">Descrição</th>
            <th class="text--right">Valor</th>
            <th class="text--right">&nbsp;</th>
            <th class="text--right">&nbsp;</th>
          </tr>
        </thead>
        <transition-group name="fade" tag="tbody">
          <tr v-for="movie in favorites" :key="movie.id">
            <td>
              <img :src="movie.image" :alt="movie.title" class="sidebar__image" width="36" height="54">
            </td>
            <td>
              {{ movie.title }}
            </td>
            <td>
              {{ movie.price }}
            </td>
            <td>
              <BaseTooltip label="Adicionar ao carrinho">
                <button class="btn" @click="addMovieToCart(movie)">
                  <v-icon name="bi-cart-plus"  />
                </button>
              </BaseTooltip>
            </td>
            <td class="text--right">
              <BaseTooltip label="Remover">
                <button class="btn" @click="removeFavorite(movie)"> <v-icon name="md-clear-round" fill="#ff0000" /> </button>
              </BaseTooltip>
            </td>
          </tr>
        </transition-group>
      </table>
      <div class="empty-cart" v-else>
        <v-icon name="io-heart-dislike-outline" scale="5"></v-icon>
        <p>Sua lista de favoritos está vazia!</p>
      </div>

    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    methods: {
    ...mapActions(['toggleSidebar', 'removeFavorite', 'emptyFavorites', 'addMovieToCart']),
  },
  computed: {
    ...mapState(['shopCart']),
    ...mapGetters(['loading', 'error', 'sidebarStatus', 'favorites']),

  },
}
</script>

<style scoped lang="scss">
  .sidebar__table {
    thead {
      display: none;
    }  
  }
</style>