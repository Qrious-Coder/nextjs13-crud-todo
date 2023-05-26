import React from 'react'
import { getAllTodosWithFeatures } from '@/redux/actions/todoActions'

export const Pagination = () => {
    const dispatch = useDispatch()
    const [ curPage, setCurPage ] = useState(1)
    const [ limit, setLimit] = useState(5)

    useEffect(()=>{
        dispatch(getAllTodosWithFeatures(null, null, null, curPage, limit))
    }, [dispatch, curPage, limit])

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
    <div className="pagination-controls">
      <select className='filter_input' value={ limit } onChange={ handleLimitChange }>
        <option value={ 5 }>5 per page</option>
        <option value={ 10 }>10 per page</option>
        <option value={ 15 }>15 per page</option>
        <option value={ 20 }>20 per page</option>
      </select>

      <button onClick={ handlePrevPage } disabled={ currentPage === 1 }>Prev</button>
      <span>{ curPage }</span>
      <button onClick={ handleNextPage }>Next</button>
    </div>
  )
}
