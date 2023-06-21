import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { AiOutlineFlag,  AiOutlineThunderbolt, AiFillDownSquare,
  AiOutlineFileAdd, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

export const tabHeaderData = [
  {
    text: 'task',
    icon: (size) => <BiTask size={size} />,
    sort: true,
    position: 'center',
    smallScreen: true,
    width: '40%',
  },
  {
    text: 'priority',
    icon: (size) => <AiOutlineFlag size={size} />,
    sort: true,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: true,
    width: '10%',
  },
  {
    text: 'action',
    icon: (size) => <AiOutlineThunderbolt size={size} />,
    sort: false,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: false,
    width: '10%',
  },
  {
    text: 'completed',
    icon: (size) => <AiFillDownSquare size={size}/>,
    sort: true,
    sortUpIc: <RiArrowUpSLine/>,
    sortDownIc: <RiArrowDownSLine/>,
    position: 'between',
    smallScreen: true,
    width: '10%',
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
    icon: (size) => <AiOutlineFileAdd size={size}/>,
    sort: false,
    position: 'center',
    smallScreen: false,
    width: '10%',
  },
  {
    text: 'edit',
    icon: (size) => <AiOutlineEdit size={size}/>,
    sort: false,
    position: 'center',
    smallScreen: true,
    width: '10%',
  },
  {
    text: 'delete',
    icon: (size) => <AiOutlineDelete size={size}/>,
    sort: false,
    position: 'center',
    smallScreen: true,
    width: '10%',
  },
]
