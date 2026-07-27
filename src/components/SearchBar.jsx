import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import{setQuery} from '../features/searchSlice'

function SearchBar() {
    const dispatch= useDispatch()
    const [text, settext] = useState('')
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(setQuery(text))
        settext("")
    }
    return (
        <>
            <div>
                <form onSubmit={(e)=>{submitHandler(e)}} className='flex gap-5 px-5 pt-5'>
                    <input  
                        value={text} 
                        onChange={(e)=>{settext(e.target.value)}}
                        className='transition-colors duration-500 focus:outline-none w-full
                        text-20 rounded-md border-2 border-gray-200 p-2' 
                        type="text" placeholder='Search...' 
                    />
                    <button className='active:shadow-[0px_0px_10px_10px_rgba(31,41,55,1)] active:shadow-gray-800 rounded-xl font-semibold active:scale-[0.95]  cursor-pointer border-2 border-gray-200 p-2 px-4 max-h-25'>Search</button>
                </form>
            </div>
        </>
    )
}

export default SearchBar