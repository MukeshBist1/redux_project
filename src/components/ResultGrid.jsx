import React, { useEffect } from 'react';
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi';
import { setError, fetchStart, setResults } from '../features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import ResultCard from './ResultCard';

function ResultGrid() {
    const { query, activeTab, results, status, error } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        // setQuery already resets status to 'idle' when query is empty
        if (!query) return;

        const getData = async () => {
            try {
                dispatch(fetchStart());

                let data = [];
                if (activeTab === "Photos") {
                    const response = await fetchPhotos(query);
                    data = response.results.map(item => ({
                        id: item.id,
                        title: item.user.username,
                        type: "photo",
                        url: item.urls.full
                    }));
                } else if (activeTab === "Videos") {
                    const response = await fetchVideos(query);
                    data = response.videos.map(item => ({
                        id: item.id,
                        type: "video",
                        title: item.user.name,
                        url: item.video_files[0].link
                    }));
                } else if (activeTab === "Gifs") {
                    const response = await fetchGifs(query);
                    data = response.data.map(item => ({
                        id: item.id,
                        type: "gif",
                        title: item.title,
                        url: item.images.original.url
                    }));
                }

                if (data.length === 0) {
                    dispatch(setError(`No ${activeTab.toLowerCase()} found for "${query}"`));
                } else {
                    dispatch(setResults(data));
                }
            } catch (err) {
                console.error("Fetch error:", err);
                dispatch(setError(err.message || "Failed to fetch data. Please try again."));
            }
        };

        getData();
    }, [query, activeTab, dispatch]);

    // Render logic – order matters
    if (status === 'loading') return <h1 className="text-center text-white mt-40">Loading...</h1>;
    if (status === 'failed') return <h1 className="text-center text-red-500 mt-40">{error}</h1>;
    if (status === 'idle') return <h1 className="text-center text-stone-600 mt-40">🔍 Search for something</h1>;
    if (status === 'succeeded' && results.length === 0) return <h1 className="text-center text-red-800 mt-40">No results found for "{query}"</h1>;

    return (
        <div className="place-items-center w-full max-w-350 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto px-4 pt-35 sm:pt-45 pb-4 gap-6">
            {results.map((item) => (
                <div className="flex justify-center" key={item.id}>
                    <ResultCard item={item} />
                </div>
            ))}
        </div>
    );
}

export default ResultGrid;