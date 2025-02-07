<template>

  <BaseError :error="error" v-if="error" />

  <div class="movies-wrapper">
    <MoviesList :movies="movies" />    
  </div>

  <Loader v-if="loading" />

</template>



<script>
import { mapState, mapGetters } from 'vuex';
import MoviesList from '@/components/movies/MoviesList.vue';
import BaseError from '@/components/commons/BaseError.vue';

export default {
  components: {
    MoviesList,
    BaseError,
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
