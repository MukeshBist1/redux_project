import React from 'react'
function ResultCard({ item }) {

    const handleSave = async () => {
        const response = await fetch(item.url);
        const blobData = await response.blob();
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blobData);
        downloadLink.download = `${item.title || 'download'}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className='result-card relative flex flex-col items-center overflow-hidden w-[90%] sm:h-70 aspect-7/8 sm:aspect-7/8 rounded-2xl'>
            <h1 className='bg-[#09090933] text-amber-50 px-3 rounded-sm backdrop-blur-lg absolute top-2 text-center z-10'>
                {item.title}
            </h1>
            {item.type === "photo" && <img loading='lazy' src={item.url} className='h-full w-full object-cover' alt={item.title} />}
            {item.type === "video" && <video controls src={item.url} className='h-full w-full object-cover' />}
            {item.type === "gif" && <img src={item.url} className='h-full w-full object-cover' alt={item.title} />}

            <button
                onClick={handleSave}
                className='active:scale-90 absolute bottom-15 right-1 py-0.3 px-2 cursor-pointer rounded-md bg-blue-600 text-white z-10'
            >
                Save
            </button>
        </div>
    )
}

export default ResultCard