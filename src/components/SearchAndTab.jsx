import React from 'react'
import SearchBar from './SearchBar'
import Tabs from './Tabs'

function searchANDtab() {
    return (
        <div className='bg-slate-400/50 rounded-b-2xl backdrop-blur-2xl w-full left-1/2 -translate-x-1/2 fixed z-100 top-0 text-white'>
            <div className='max-w-350 mx-auto'>
                <SearchBar />
                <Tabs />
            </div>
        </div>
    )
}

export default searchANDtab
