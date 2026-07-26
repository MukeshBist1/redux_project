import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../features/searchSlice'

function Tabs() {
    const tabs=['Photos','Videos','Gifs']
    const dispatch=useDispatch()
    const activeTab=useSelector((state)=>state.search.activeTab)
  return (
    <div className='flex flex-wrap'>
        {tabs.map((el,idx)=>{
            return <button
                        className={`${activeTab==el?'bg-amber-400':'bg-gray-400'} transition-colors duration-50 m-1 sm:m-5 rounded-md p-0.5 cursor-pointer min-w-20`}
                        key={idx}
                        onClick={()=>{
                            dispatch(setActiveTab(el))
                        }}
                   >
                            {el}
                     </button>
        })}
    </div>
  )
}

export default Tabs