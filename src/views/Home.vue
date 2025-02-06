<template>

  <div class="movies-wrapper">

    <MoviesList :movies="movies" />
    
  </div>
  <Loader v-if="loading" />

  <div v-if="error">{{ error }}</div>
</template>



<script>
import { mapState, mapGetters } from 'vuex';
import MoviesList from '@/components/movies/MoviesList.vue';

export default {
  components: {
    MoviesList,
  },

  computed: {
    ...mapState(['movies']),
    ...mapGetters(['loading', 'error']),
  }
}
</script>

<style lang="scss" scoped>
  .movies-wrapper {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
</style>
