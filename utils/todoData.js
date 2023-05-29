import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { AiOutlineFlag,  AiOutlineThunderbolt, AiOutlineCheckCircle, AiFillDownSquare, AiTwotoneCalendar,
  AiOutlineFileAdd, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

export const tabHeaderData = [
    {
      text: 'task',
      icon: <BiTask />,
      sort: true,
      position: 'center'
    },
    {
      text: 'priority',
      icon: <AiOutlineFlag />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'action',
      icon: <AiOutlineThunderbolt />,
      sort: false,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'completed',
      icon: <AiFillDownSquare />,
      sort: true,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'date',
      icon: <AiTwotoneCalendar />,
      sort: false,
      sortUpIc: <RiArrowUpSLine/>,
      sortDownIc: <RiArrowDownSLine/>,
      position: 'between'
    },
    {
      text: 'note',
      icon: <AiOutlineFileAdd />,
      sort: false,
      position: 'center'
    },
    {
      text: 'edit',
      icon: <AiOutlineEdit />,
      sort: false,
      position: 'center'
    },
    {
      text: 'delete',
      icon: <AiOutlineDelete />,
      sort: false,
      position: 'center'
    },
  ]