import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

const Pagination = ({ onPaginationChange }) => {
  const { total, limit, curPage } = useSelector(state => state.todo)
  const [ localCurPage, setLocalCurPage ] = useState( curPage )
  const [ localLimit, setLocalLimit ] = useState( limit )
  const totalPages = Math.ceil(total/localLimit)

  const handlePageNum = (num) =>{
    setLocalCurPage(num)
    onPaginationChange(num, localLimit)
  }
  const handleLimitChange = (e) => {
    setLocalLimit(e.target.value)
    setLocalCurPage(1)
    onPaginationChange(1, e.target.value)
  }
  const handlePrevPage = () => {
    let prevPage = curPage > 1 ? curPage - 1 : 1
    setLocalCurPage(prevPage)
    onPaginationChange(prevPage, localLimit)
  }
  const handleNextPage = () => {
    let nextPage = curPage < totalPages ? curPage + 1 : totalPages
    setLocalCurPage(nextPage)
    onPaginationChange(nextPage, localLimit)
  }

  const jumpToFirstPage = () => {
    setLocalCurPage(1)
    onPaginationChange(1, localLimit)
  }
 
  const jumpToLastPage = () => {
    setLocalCurPage(totalPages)
    onPaginationChange(totalPages, localLimit)
  }

 return (
   <>
     { total > 0 && <div className="flex justify-end mt-6">
       <button
         onClick={ jumpToFirstPage }
         disabled={ localCurPage === 1 }
         className={`${localCurPage === 1 ? 'text-gray-400' : 'text-indigo-700 hover:text-indigo-500'}
                   transition-colors duration-200`}
       >
         <MdKeyboardDoubleArrowLeft size={24} />
       </button>
       <button
         onClick={ handlePrevPage }
         disabled={ localCurPage === 1 }
         className={`${localCurPage === 1 ? 'text-gray-400' : 'text-indigo-700 hover:text-indigo-500'}
                   transition-colors duration-200`}
       >
         <MdKeyboardArrowLeft size={24} />
       </button>
       {Array.from({length: totalPages}, (_, index) => index + 1).map( (page, idx ) => (
         <button
           key={ idx }
           onClick={ () => handlePageNum(page) }
           className={`mx-1 px-3 rounded border border-indigo-400 
                     ${ localCurPage === page ? 'bg-indigo-900 accent-amber-200' : ''}` }
         >
           {page}
         </button>
       ))}
       <button
         onClick={ handleNextPage }
         disabled={ curPage === totalPages }
         className={`${curPage === totalPages ? 'text-gray-400' : 'text-purple-400 hover:text-purple-500'}
                   transition-colors duration-200`}
       >
         <MdKeyboardArrowRight size={24} />
       </button>
       <button
         onClick={ jumpToLastPage }
         disabled={ localCurPage === totalPages }
         className={`${localCurPage === totalPages ?  'text-gray-400' : 'text-purple-700 hover:text-purple-500'}
                   transition-colors duration-200`}
       >
         <MdKeyboardDoubleArrowRight size={24} />
       </button>
       <select className='filter_input ml-2' value={ localLimit } onChange={ handleLimitChange }>
         <option value={ 5 }>5</option>
         <option value={ 10 }>10</option>
         <option value={ 15 }>15</option>
         <option value={ 20 }>20</option>
       </select>
       <span className='ml-2 mt-2' >of {total > 1 ? ` ${total} todos` : ` ${total} todo`}</span>
     </div> }
   </>

 )
}

export default Pagination
