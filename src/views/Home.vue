<template>
  
  <div class="error-message" v-if="error">
    <v-icon name="ri-alarm-warning-line" fill="#ff0000" scale="8" />
    <p>{{ error }}</p>  
  </div>

  <div class="movies-wrapper">
    <MoviesList :movies="movies" />    
  </div>

  <Loader v-if="loading" />

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

  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    p {
      max-width: 32ch;
      text-align: center;
    }

  }

</style>
