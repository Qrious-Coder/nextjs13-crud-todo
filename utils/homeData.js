import React from "react";
import { GiCuckooClock, GiPencil } from "react-icons/gi";
import { BsClipboard, BsCheck2All } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const homeLeftData = [
  {
    key: 'objLeft',
    bubble: true,
    icon: <GiCuckooClock className="text-violet-700" style={{fontSize: '100px'}}/>,
    position: 'absolute',
    animation: 'bounce1',
    top: '-150px',
    left: '8%',
  },
  {
    key: 'objCenter',
    bubble: false,
    icon: <BsClipboard className="text-blue-500" style={{fontSize: '250px'}}/>,
    position: 'absolute',
    animation: null,
    top: '-120px',
    left: '25%',
  },
  {
    key: 'objCenterOnTop',
    bubble: false,
    icon: <BsCheck2All className="text-green-400" style={{fontSize: '90px'}}/>,
    position: 'absolute',
    animation: null,
    top: '-20px',
    left: '39%',
  },
  {
    key: 'objRight',
    bubble: true,
    icon: <GiPencil className="text-violet-700" style={{fontSize: '100px'}}/>,
    position: 'absolute',
    animation: 'bounce3',
    top: '80px',
    left: '67%',
  },
]