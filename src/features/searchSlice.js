import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "Search",
  initialState: {
    query: '',
    activeTab: "Photos",
    results: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.results = [];
      state.error = null;
      state.status = action.payload ? 'loading' : 'idle';
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
      state.results = [];
      state.error = null;
      state.status = state.query ? 'loading' : 'idle';
    },
    fetchStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    setResults(state, action) {
      state.results = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    clearResults(state) {
      state.results = [];
    }
  }
});

export const { setQuery, setActiveTab, setError, setResults, fetchStart, clearResults } = searchSlice.actions;
export default searchSlice.reducer;