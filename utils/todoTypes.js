import { TbSquareRoundedNumber1, TbSquareRoundedNumber2, 
    TbSquareRoundedNumber3, TbSquareRoundedNumber4 } from 'react-icons/tb'

export const prioTypes = {
    1: 'Important and urgent',
    2: 'Important but NOT urgent',
    3: 'NOT important but urgent',
    4: 'NOT important and NOT urgent'
}

export const prioIcons = {
    1: <TbSquareRoundedNumber1 style={{ color: 'red', fontSize: '32px'}}/>,
    2: <TbSquareRoundedNumber2 style={{ color: 'yellow', fontSize: '32px'}}/>,
    3: <TbSquareRoundedNumber3 style={{ color: 'green', fontSize: '32px'}}/>,
    4: <TbSquareRoundedNumber4 style={{ color: 'grey', fontSize: '32px'}}/>
}

export const actionTypes = {
    1: 'Do it now',
    2: 'Plan',
    3: 'Delegate',
    4: 'Delete'
}