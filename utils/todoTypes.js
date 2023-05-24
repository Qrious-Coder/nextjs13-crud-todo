import { TbSquareRoundedNumber1, TbSquareRoundedNumber2, 
    TbSquareRoundedNumber3, TbSquareRoundedNumber4 } from 'react'

export const prioTypes = {
    1: 'Important and urgent',
    2: 'Important but NOT urgent',
    3: 'NOT important but urgent',
    4: 'NOT important and NOT urgent'
}

export const prioIcons = {
    1: <TbSquareRoundedNumber1 />,
    2: <TbSquareRoundedNumber2 />,
    3: <TbSquareRoundedNumber3 />,
    4: <TbSquareRoundedNumber4 />
}

export const actionTypes = {
    1: 'Do it now',
    2: 'Plan',
    3: 'Delegate',
    4: 'Delete'
}