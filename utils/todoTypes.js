import { TbSquareRoundedNumber1, TbSquareRoundedNumber2, 
    TbSquareRoundedNumber3, TbSquareRoundedNumber4 } from 'react-icons/tb'

export const prioTypes = {
    1: 'Important and urgent',
    2: 'Important but NOT urgent',
    3: 'NOT important but urgent',
    4: 'NOT important and NOT urgent'
}

export const prioIcons = {
    1: <TbSquareRoundedNumber1 className={'text-purple-500'} style={{ fontSize: '32px', margin:'auto'}}/>,
    2: <TbSquareRoundedNumber2 className={'text-indigo-500'} style={{ fontSize: '32px' , margin:'auto'}}/>,
    3: <TbSquareRoundedNumber3 className={'text-violet-500'} style={{ fontSize: '32px', margin:'auto'}}/>,
    4: <TbSquareRoundedNumber4 className={'text-blue-500'}  style={{ fontSize: '32px', margin:'auto'}}/>
}

export const actionTypes = {
    1: 'Do it now',
    2: 'Plan',
    3: 'Delegate',
    4: 'Delete'
}