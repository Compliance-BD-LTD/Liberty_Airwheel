import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Searching = ({search,setSearch}) => {
    return (
        <div className='w-full h-[50px]rounded-sm flex items-center justify-center md:my-5 my-5'>
            <div className='w-90/100 relative md:w-30/100'>
                <div className='px-2 rounded-full border-2 border-cyan-500 flex items-center'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' className='text-cyan-500' ></FontAwesomeIcon>
                    <input type="text" name="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Product' className='p-2 text-cyan-500 text-lg  w-full focus:outline-none' id="" />

                </div>

            </div>

        </div>
    )
}
