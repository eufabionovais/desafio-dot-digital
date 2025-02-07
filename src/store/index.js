import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist'

const baseUrl = `https://api.themoviedb.org/3`;
const apiKey = '7b0e2c434489951eb3a12786a20218b8';
const moviesUrl = `${baseUrl}/movie/top_rated?language=pt-BR&api_key=${apiKey}`;
const genresUrl = `${baseUrl}/genre/movie/list?language=pt-BR&api_key=${apiKey}`;
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjBlMmM0MzQ0ODk5NTFlYjNhMTI3ODZhMjAyMThiOCIsIm5iZiI6MTY5ODEwNjkxMi42MDYwMDAyLCJzdWIiOiI2NTM3MGUyMDFmNzQ4YjAxM2ViNGRlNTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MponbgWZP9kc1xoVpC-h1vAxAVm6Kjlh2bvsrb5mC0c`; 

const store = createStore(
  {
    plugins: [new VuexPersistence().plugin],
   
  state: {
    movies: [],
    genres: [],
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    shopCart: [],
    favorites: [],
    sidebarStatus: false,
    sidebarContent: 'shopping-cart',
    loading: false,
    error: null,
  },
  mutations: {
    SET_MOVIES(state, payload) {

      let normalizedList = payload.results.map((result) => {
        return {
          ...result,
          image: `https://image.tmdb.org/t/p/w342${result.poster_path}`,
          price: 79.99,
          quantity: 1,
          isFavorite: false 
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

      state.sidebarContent = 'shopping-cart';

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

      state.shopCart.forEach((currentItem) => {
        if(movie.id === currentItem.id) {}
        currentItem.quantity = 1;
      })      

      state.shopCart = state.shopCart.filter((currentMovie) => {
        return currentMovie.id !== movie.id
      })
    },
    
    EMPTY_SHOP_CART(state) {
      state.shopCart.forEach((currentItem) => {
        currentItem.quantity = 1;
      })
      state.shopCart = []
    },

    SET_FAVORITE(state, movie) {
      const movieIndex = state.favorites.findIndex(currentItem => currentItem.id === movie.id)

      if(movieIndex === -1) {
        state.favorites.push(movie)
        return
      }
      state.favorites.splice(movieIndex, 1);
    },
    
    REMOVE_FAVORITE(state, movie) {
        state.favorites = state.favorites.filter((currentItem) => {
            return currentItem.id !== movie.id;
        })
    },

    EMPTY_FAVORITES(state) {
      state.favorites = []
    },    

    TOGGLE_SIDEBAR(state, status) {
      state.sidebarStatus = status;
    },
    
    TOGGLE_SIDEBAR_CONTENT(state, content) {
        if (state.sidebarContent === content) {
          state.sidebarStatus = !state.sidebarStatus;
          return
        } 
        state.sidebarContent = content;
        state.sidebarStatus = true;             
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

        if (!response.ok || response.status !== 200) {
          throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }        

        const data = await response.json();
        commit('SET_MOVIES', data); 
      } catch (error) {
         console.error('Erro ao buscar filmes:', error);
         commit('SET_ERROR', 'Não foi possível carregar os filmes. Tente novamente mais tarde.');
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

        if (!response.ok || response.status !== 200) {
          throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        commit('SET_GENRES', data.genres); 
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        commit('SET_GENRES', [])
      }
      finally {
        commit('SET_LOADING', false);
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

          if (!response.ok || response.status !== 200) {
             throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();

          state.movies = [];
          state.genres = [];
          state.currentPage = 1;
          state.totalPages = 1;
          state.totalResults = 0;

          commit('SET_MOVIES', data);
        } catch (error) {
          console.error('Erro ao buscar filmes:', error);
          commit('SET_ERROR', 'Erro ao buscar os filmes. Verifique sua conexão e tente novamente.');
        }
        finally {
          commit('SET_LOADING', false);
        }
    },
    
    addMovieToCart({commit}, movie) {
      commit('ADD_MOVIE_TO_CART', movie)
    }, 

    removeMovieFromCart({commit}, movie) {
      commit('REMOVE_MOVIE_FROM_CART', movie)
    },   
    
    emptyShopCart({commit}) {
      commit('EMPTY_SHOP_CART')
    },

    toggleMovieAsFavorite({commit}, movie) {
      commit('SET_FAVORITE', movie)
    },

    removeFavorite({commit}, movie) {
      debugger
      commit("REMOVE_FAVORITE", movie)
    },

    emptyFavorites({commit}) {
      commit('EMPTY_FAVORITES')
    },    
    
    toggleSidebar({commit}, status) {
      commit('TOGGLE_SIDEBAR', status)
    },

    toggleSidebarContent({commit}, content) {
      commit("TOGGLE_SIDEBAR_CONTENT", content)
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
    favorites: (state) => state.favorites,
    isFavorite: (state) => {
      return (movieId) => {
        const isFavorite = state.favorites.findIndex(currentItem => currentItem.id === movieId);
        return isFavorite !== -1;
      }
    },
    sidebarContent: (state) => state.sidebarContent,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
});

export default store;
