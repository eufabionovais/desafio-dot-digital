<template>
  <header>
    <div class="inner-content">
     <AppLogo />
     <form>
      <input type="text">
      <button type="submit">Buscar</button>
     </form>

     <div class="actions">
      <button>Favoritos</button>
      <button>Carrinho</button>
     </div>

    </div>
  </header>
</template>

<script>
import AppLogo from './AppLogo.vue';
export default {
  components: {
    AppLogo
  }
}
</script>

<style scoped>
.inner-content {
  display: flex;
  justify-content: space-between;
}
</style>