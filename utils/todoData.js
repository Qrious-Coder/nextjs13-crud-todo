import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { AiOutlineFlag,  AiOutlineThunderbolt, AiOutlineCheckCircle, AiFillDownSquare, AiTwotoneCalendar,
  AiOutlineFileAdd, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

export const tabHeaderData = [
  {
    text: 'task',
    icon: <BiTask />,
    sort: true,
    position: 'center',
    smallScreen: true,
  },
  {
    text: 'priority',
    icon: <AiOutlineFlag />,
    sort: true,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: false,
  },
  {
    text: 'action',
    icon: <AiOutlineThunderbolt />,
    sort: false,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: false,
  },
  {
    text: 'completed',
    icon: <AiFillDownSquare />,
    sort: true,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: true,
  },
  // {
  //   text: 'date',
  //   icon: <AiTwotoneCalendar />,
  //   sort: false,
  //   sortUpIc: <RiArrowUpSLine/>,
  //   sortDownIc: <RiArrowDownSLine/>,
  //   position: 'between'
  // },
  {
    text: 'note',
    icon: <AiOutlineFileAdd />,
    sort: false,
    position: 'center',
    smallScreen: false,
  },
  {
    text: 'edit',
    icon: <AiOutlineEdit />,
    sort: false,
    position: 'center',
    smallScreen: true,
  },
  {
    text: 'delete',
    icon: <AiOutlineDelete />,
    sort: false,
    position: 'center',
    smallScreen: true,
  },
]
