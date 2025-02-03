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
  },
  mutations: {
    SET_MOVIES(state, payload) {
      state.movies = [...state.movies, ...payload.results];
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
        console.log("data fetched movies", data)

        commit('SET_MOVIES', data); // Atualiza o estado com os dados recebidos
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

      debugger

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
          console.log('Filmes encontratos:', data);

        } catch (error) {
            console.log("Error", error)
        }
        finally {
          console.log("Acabou")
        }
    }    


  },


  getters: {
    movies: (state) => state.movies,
    genres: (state) => state.genres,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
    totalResults: (state) => state.totalResults,
       loading: (state) => state.loading,
    error: (state) => state.error,
  },
});

export default store;
