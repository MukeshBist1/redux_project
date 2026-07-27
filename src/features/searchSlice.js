import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "Search",
    initialState: {
        query: '',
        activeTab: "Photos",
        results: [],
        loading: false,
        error: null
    },
    reducers: {
        setQuery(state, action) {
            state.query=action.payload
        },
        setActiveTab(state, action) {
            state.activeTab=action.payload
        },
        setLoading(state, action) {
            state.loading=action.payload
        },
        setResults(state, action) {
            state.results=action.payload
            state.loading=false
            state.error = null;
        },
        setError(state, action) {
            state.error=action.payload
            state.loading=false
        },
        clearResults(state){
            state.results=[]
        }
    }
})

export const {setQuery,setActiveTab,setError,setLoading,setResults,clearResults}=searchSlice.actions
export default searchSlice.reducer;