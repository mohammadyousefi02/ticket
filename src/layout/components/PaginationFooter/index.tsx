import React from 'react'

import {FiChevronsLeft,FiChevronsRight,FiChevronLeft,FiChevronRight} from "react-icons/fi"

import {nextPage,prevPage, dblNextPage, dblPrevPage} from "../../../../redux/slices/paginationSlice"

import {useDispatch, useSelector} from "react-redux"


function PaginationFooter() {
 const dispatch = useDispatch()
 const {page} = useSelector((store:any)=>store.pagination)
  return (
    <div className='flex items-center justify-center gap-8 mb-6 text-[20px]'>
        <div className='flex gap-2'>
          <FiChevronsRight className='cursor-pointer' onClick={()=>dispatch(dblNextPage())}/>
          <FiChevronRight className='cursor-pointer' onClick={()=>dispatch(nextPage())}/>
        </div>
        <span className="text-[14px]">{page}</span>
        <div className='flex gap-2'>
          <FiChevronLeft className='cursor-pointer' onClick={()=>dispatch(prevPage())}/>
          <FiChevronsLeft className='cursor-pointer' onClick={()=>dispatch(dblPrevPage())}/>
        </div>
    </div>
  )
}

export default PaginationFooter