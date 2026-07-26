import React from 'react'
import { fetchPhotos,fetchVideos,fetchGifs } from './api/mediaApi'
import ResultGrid from './components/ResultGrid'
import SearchANDtab from './components/SearchAndTab'

const App = () => {
  return (
    <>
       <div>
          <SearchANDtab/>
          <ResultGrid/>
       </div>
    </>
  )
}

export default App