<template>
  <AppHeader />

  <main class="main-content">
    <div class="inner-content">
      <RouterView />      
    </div>
  </main>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue';
export default {
  components: {
    AppHeader
  }
}
</script>


