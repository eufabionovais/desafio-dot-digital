<template>
  <div class="movies-wrapper">
    <div class="movie-card" v-for="movie in movies" :key="movie.id">
      <div class="movie-card__image-wrapper">
        <img :src="movie.image" :alt="movie.title" loading="lazy" class="movie-card__image">
        <p>Lançamento: {{ movie.release_date }}</p>
        <button>Favoritar</button>
      </div>
      <div class="movie-card__content">
      <h2>Nome: {{ movie.title }}</h2>
      <p>Nota média: {{ movie.vote_average}}</p>
      <p>Gêneros: {{ getGenreNames(movie.genre_ids)}}</p>
      <p>Preço: {{ movie.price }}</p>
      <button @click="addToShopCart(movie)">Adicionar</button>
      </div>
    </div>

    <div v-if="loading">Carregando...</div>
    <div v-if="error">{{ error }}</div>

  </div>
</template>

<style langs="scss">
  .movies-wrapper {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  .movie-card {
    background: red;    
    border: solid 1px #000;
  }

  .movie-card__image {
    width: 100%
  }

  .movie-card__content {
    padding: 16px;
  }


</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      moviePosterBaseUrl: 'https://image.tmdb.org/t/p/w342/'
    }
  },

  mounted() {
    this.fetchMovies(this.currentPage);
    window.addEventListener('scroll', this.handleScroll); 
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  created() {
    this.$store.dispatch('fetchGenres');
  },  


  computed: {
    ...mapState(['movies', 'genres', 'currentPage', 'totalPages', 'totalResults']),
    ...mapGetters(['loading', 'error']),
  },

  methods: {
    ...mapActions(['fetchMovies', 'addMovieToCart', 'toggleSidebar']),
    getGenreNames(genreIds) {

      return genreIds
        .map((id) => {
          const genre = this.genres.find((genre) => genre.id === id);
          return genre ? genre.name : '';
        }).join(', ');
    },

    addToShopCart(movie) {
      this.addMovieToCart(movie);
      this.toggleSidebar(true);
    },

    handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !this.loading) {
        this.fetchMovies();
      }
    },

  }
}

</script>
