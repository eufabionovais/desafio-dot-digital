// store/index.js
import { createStore } from 'vuex';

const baseUrl = `https://api.themoviedb.org/3`;
const apiKey = '7b0e2c434489951eb3a12786a20218b8';
const moviesUrl = `${baseUrl}/movie/top_rated?language=pt-BR&api_key=${apiKey}`;
const genresUrl = `${baseUrl}/genre/movie/list?language=pt-BR&api_key=${apiKey}`;
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjBlMmM0MzQ0ODk5NTFlYjNhMTI3ODZhMjAyMThiOCIsIm5iZiI6MTY5ODEwNjkxMi42MDYwMDAyLCJzdWIiOiI2NTM3MGUyMDFmNzQ4YjAxM2ViNGRlNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MponbgWZP9kc1xoVpC-h1vAxAVm6Kjlh2bvsrb5mC0c`; 

// Cria o store
const store = createStore({
  state: {
    movies: [],
    genres: [],
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    loading: false,
    error: null,
    shopCart: [],
    sidebarStatus: false,
  },
  mutations: {
    SET_MOVIES(state, payload) {

      let normalizedList = payload.results.map((result) => {
        return {
          ...result,
          image: `https://image.tmdb.org/t/p/w342${result.poster_path}`,
          price: 79.99,
          quantity: 1 
        }
      })

      state.movies = [...state.movies, ...normalizedList];
      state.currentPage = payload.page + 1;
      state.totalPages = payload.total_pages;
      state.totalResults = payload.total_results;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
    },

    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },

    ADD_MOVIE_TO_CART(state, movie) {

      const addedMovieIndex = state.shopCart.findIndex((currentItem) => {
        return currentItem.id === movie.id
      })

      if(addedMovieIndex !== -1) {
        state.shopCart[addedMovieIndex].quantity += 1;
        return
      }

      state.shopCart.push(movie)
      state.sidebarStatus = true;
    },

    REMOVE_MOVIE_FROM_CART(state, movie) {
      state.shopCart = state.shopCart.filter((currentMovie) => {
        return currentMovie.id !== movie.id
      })
    },
    
    EMPTY_SHOP_CART(state) {
      debugger
      state.shopCart.forEach((currentItem) => {
        currentItem.quantity = 1;
      })
      state.shopCart = []
    },
    
    TOGGLE_SIDEBAR(state, status) {
      state.sidebarStatus = status;
    }

  },
  actions: {
    async fetchMovies({ commit, state }, reset = false) {

      if(reset) {
          state.movies = [];
          state.genres = [];
          state.currentPage = 1;
          state.totalPages = 1;
          state.totalResults = 0;
      }

      if (state.loading || state.currentPage > state.totalPages) {
        return;
      }

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await fetch(
          `${moviesUrl}&page=${state.currentPage}`
        );

        const data = await response.json();

        commit('SET_MOVIES', data); 
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
         commit('SET_ERROR', 'Erro ao carregar produtos.');
      }
      finally {
        commit('SET_LOADING', false);
      }
    },

    async fetchGenres({ commit }) {
      try {
        const response = await fetch(
          genresUrl
        );
        const data = await response.json();
        commit('SET_GENRES', data.genres); // Atualiza a lista de gêneros
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    },


    async searchMovies({commit, state}, searchText){
        try {

          const response = await fetch(`${baseUrl}/search/movie?query=${searchText}&include_adult=false&language=pt-BR&page=1`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
          })

          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
          }

          const data = await response.json();

          state.movies = [];
          state.genres = [];
          state.currentPage = 1;
          state.totalPages = 1;
          state.totalResults = 0;

          commit('SET_MOVIES', data);


        } catch (error) {
            console.log("Error", error)
        }
        finally {
          console.log("Acabou")
        }
    },
    
    async addMovieToCart({commit, state}, movie) {
      commit('ADD_MOVIE_TO_CART', movie)
    }, 

    async removeMovieFromCart({commit, state}, movie) {
      commit('REMOVE_MOVIE_FROM_CART', movie)
    },   
    
    async emptyShopCart({commit}) {
      commit('EMPTY_SHOP_CART')
    },
    
    toggleSidebar({commit}) {
      commit('TOGGLE_SIDEBAR')
    }


  },


  getters: {
    movies: (state) => state.movies,
    genres: (state) => state.genres,
    shopCart: (state) => state.shopCart,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
    totalResults: (state) => state.totalResults,
    sidebarStatus: (state) => state.sidebarStatus,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
});

export default store;
