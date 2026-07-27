import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi'
import { setQuery, setActiveTab, setError, setLoading, setResults } from '../features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

function ResultGrid() {
    const { query, activeTab, results, loading, error } = useSelector((state) => state.search)
    let dispatch = useDispatch()

    useEffect(() => {
        if (!query) return
        try {
            const getData = async () => {
                let data = [];
                if (activeTab == "Photos") {
                    let response = await fetchPhotos(query)
                    data = response.results.map((item) => ({
                        id: item.id,
                        title: item.user.username,
                        type: "photo",
                        url: item.urls.full
                    }))
                }
                if (activeTab == "Videos") {
                    let response = await fetchVideos(query)
                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: "video",
                        title: item.user.name,
                        url: item.video_files[0].link
                    }))
                }
                if (activeTab == "Gifs") {
                    let response = await fetchGifs(query)
                    data = response.data.map((item) => ({
                        id: item.id,
                        type: "gif",
                        title: item.title,
                        url: item.images.original.url
                    }))
                }
                console.log(data)
                dispatch(setResults(data))
            }
            getData()
        } catch (err) {
            dispatch(setError(err))
        }
    }, [query, activeTab])

    if(error) return <h1>Error</h1>
    if(loading) return <h1>Loading...</h1>

    return (
        <div className='place-items-center w-full max-w-350 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto px-4 pt-35 sm:pt-45 pb-4 gap-6'>
            {results.map((item,idx)=>{
            return <div className='flex justify-center' key={idx}>
                <ResultCard item={item}/>
            </div>
            })}
        </div>
    )
}

export default ResultGrid