
<template>

    <div class="movie-card" v-for="movie in movies" :key="movie.id">
      <div class="movie-card__image-wrapper">
        <img :src="movie.image" :alt="movie.title" loading="lazy" class="movie-card__image">
        <div class="movie__launch-and-rate">
          <p class="movie__launch">{{ formatDate(movie.release_date) }}</p>
          <p class="movie__rate"><v-icon name="bi-star-fill" />{{ (movie.vote_average).toFixed(1) }}</p>
        </div>
        <button class="movie-card__favorite-button btn" @click="setFavorite(movie)">
          <v-icon :name="isFavorite(movie.id) ? 'bi-heart-fill' : 'bi-heart'" scale="1.5" :fill=" isFavorite(movie.id) ? '#ff0000' : '#fff' " />
        </button>
      </div>
      <div class="movie-card__content">
        <h2 class="movie__title">{{ movie.title }}</h2> 
        <div v-if="movie.genre_ids.length" class="movie__genres" v-html='getGenreNames(movie.genre_ids)'></div>
        <div class="movie-card__price-and-action">
          <p class="movie__price">{{ brCurrency(movie.price) }}</p>
          <button class="btn btn-lg" @click="addToShopCart(movie)">Adicionar</button>
        </div>
      </div>
    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import {formatDate} from "../../mixins/format-date.mixin"
import { currencies } from "../../mixins/currency-mixin";

export default {
  props: {
    movies: {
      required: true,
      type: Array
    },
  },


  mixins: [formatDate, currencies],
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
    ...mapState(['genres', 'currentPage', 'totalPages', 'totalResults']),
    ...mapGetters(['loading', 'error', 'favorites', 'isFavorite']),
  },

  methods: {
    ...mapActions(['fetchMovies', 'addMovieToCart', 'toggleSidebar', 'toggleMovieAsFavorite']),
    getGenreNames(genreIds) {

      return genreIds
        .map((id) => {
          const genre = this.genres.find((genre) => genre.id === id);
          return genre ? `<span class="movie__genre">${genre.name}</span>` : '';
        }).join('');
    },

    addToShopCart(movie) {
      this.addMovieToCart(movie);
      this.toggleSidebar(true);
    },

    setFavorite(movie) {
      this.toggleMovieAsFavorite(movie);
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

<style lang="scss" scoped>

  .movie-card {
    background: #fff;    
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0 0 6px 6px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    &:hover {
      .movie-card__image {
        scale: 1.05
      }
    }
  }

  .movie__launch-and-rate {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    padding: 8px 16px;
    text-align: center;
    color: #ffbd25;
    font-weight: 600;
    font-size: 16px;    
    display: flex;
    justify-content: space-between;
  }

  
  .movie__rate {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .movie__title {
    font-size: 20px;
    font-weight: 600;
  }

  .movie-card__favorite-button {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .movie-card__image-wrapper {
    position: relative;
    overflow: hidden;
  }

  .movie-card__image {
    width: 100%;
    min-height: 480px;
    transition: 0.8s;
  }

  .movie-card__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }

  .movie__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .movie-card__price-and-action {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    align-items: center;
    padding: 4px 8px;
    background: #f1f1f1;
    border-radius: 8px;
    margin-top: auto;
  }


  .movie-card__price-and-action .btn {
    flex: 1;
    background: #010E7E;
    color: #fff;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0.8;
    transition: 0.3s;
    outline: solid 3px transparent;
    outline-offset: 8px;    
    &:enabled {
      cursor: pointer;
      &:hover {
        outline: solid 0 #26AEFF;
         outline-offset: 0;  
      }
    }
  }

  .movie__price {
    font-weight: 600;
    font-size: 20px;
  }

  .movie__genre {
    background: #ffbd25;
    color: #000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 10px;
    height: 20px;
    line-height: 1.3;
    font-weight: 500;
  }


</style>
