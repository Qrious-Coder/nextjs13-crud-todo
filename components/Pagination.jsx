import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodosWithFeatures } from '@/redux/actions/todoActions'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export const Pagination = () => {
 const dispatch = useDispatch()
 const { total } = useSelector(state => state.todo)
 const [curPage, setCurPage] = useState(1)
 const [limit, setLimit] = useState(5)

 useEffect(() => {
   dispatch(getAllTodosWithFeatures(null, null, null, curPage, limit))
 }, [dispatch, curPage, limit])

 const totalPages = Math.ceil(total/limit)

 const handleLimitChange = (e) => {
   setLimit(e.target.value)
   setCurPage(1)
 }

 const handlePrevPage = () => {
   setCurPage(curPage > 1 ? curPage - 1 : 1)
 }
 
 const handleNextPage = () => {
   setCurPage(curPage < totalPages ? curPage + 1 : totalPages)
 }

 return (
   <div className="flex justify-end mt-2">
     <button 
       onClick={handlePrevPage} 
       disabled={curPage === 1}
       className={`${curPage === 1 ? 'text-gray-400' : 'text-purple-400 hover:text-purple-500'}
                   transition-colors duration-200`}
     >
       <MdKeyboardArrowLeft size={24} />
     </button>
     {Array.from({length: totalPages}, (_, index) => index + 1).map(page => (
       <button 
         key={page}
         onClick={() => setCurPage(page)}
         className={`mx-1 px-3 rounded border border-purple-400 
                     ${curPage === page ? 'bg-purple-400 text-white' : ''}`}
       >
         {page}
       </button>
     ))}
     <button 
       onClick={handleNextPage} 
       disabled={curPage === totalPages}
       className={`${curPage === totalPages ? 'text-gray-400' : 'text-purple-400 hover:text-purple-500'}
                   transition-colors duration-200`}
     >
       <MdKeyboardArrowRight size={24} />
     </button>
     <select className='filter_input mr-2' value={limit} onChange={handleLimitChange}>
       <option value={5}>5 per page</option>
       <option value={10}>10 per page</option>
       <option value={15}>15 per page</option>
       <option value={20}>20 per page</option>
     </select>
     of {total} {total > 1 ? `${total} todos` : `${total} todo`}
   </div>
 )
}
