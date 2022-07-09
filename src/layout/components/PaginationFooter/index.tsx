import React from 'react'

import {FiChevronsLeft,FiChevronsRight,FiChevronLeft,FiChevronRight} from "react-icons/fi"

import {nextPage,prevPage, dblNextPage, dblPrevPage} from "../../../../redux/slices/paginationSlice"

import {useDispatch, useSelector} from "react-redux"


function PaginationFooter() {
 const dispatch = useDispatch()
 const {page} = useSelector((store:any)=>store.pagination)
  return (
    <div className='flex items-center justify-center gap-4 mb-2 text-[16px]'>
        <FiChevronsRight onClick={()=>dispatch(dblNextPage())}/>
        <FiChevronRight onClick={()=>dispatch(nextPage())}/>
        <span>{page}</span>
        <FiChevronLeft onClick={()=>dispatch(prevPage())}/>
        <FiChevronsLeft onClick={()=>dispatch(dblPrevPage())}/>
    </div>
  )
}

export default PaginationFooter