import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodosWithFeatures } from '@/redux/actions/todoActions'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export const Pagination = () => {
    const dispatch = useDispatch()
    const { total } = useSelector( state => state.todo )
    const [ curPage, setCurPage ] = useState(1)
    const [ limit, setLimit] = useState(5)

    useEffect(()=>{
        dispatch(getAllTodosWithFeatures(null, null, null, curPage, limit))
    }, [dispatch, curPage, limit])


    const totalPages = Match.ceil(total/limit)

    const handleLimitChange = (e) => {
        setLimit(e.target.value)
        setCurPage(1)
      };
    
    const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };
    
    const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    };  

  return (
    <div className="flex justify-end mt-2">
      <button onClick={ handlePrevPage } disabled={ currentPage === 1 }><MdKeyboardArrowLeft /></button>
      <span>{ curPage }</span>
      <button onClick={ handleNextPage }><MdKeyboardArrowRight /> </button>
      <select className='filter_input' value={ limit } onChange={ handleLimitChange }>
        <option value={ 5 }>5 per page</option>
        <option value={ 10 }>10 per page</option>
        <option value={ 15 }>15 per page</option>
        <option value={ 20 }>20 per page</option>
      </select>
      of { total > 1 ? `todos` : `todo`}
    </div>
  )
}
