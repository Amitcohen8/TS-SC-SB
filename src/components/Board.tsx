import { promises } from 'dns';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { Box } from './Box'
import { genInitialState, boardArrOfObj, winnerCheck } from '../utils/utils';


// let boardLayout: { id: number, shape: 'empty' | 'x' | 'o',size:'100' | '200' | '300' }[] = Array(9);
// const intialState = boardLayout.fill({id:Math.random(),shape:"empty",size:'200'},0,9)
const intialState = genInitialState('200')

export interface BoardProps {
  shape?: 'empty' | 'x' | 'o';
  backgroundColor?: string;
  size?: '100' | '200' | '300';
  id: number
}

/**
 * Primary UI component for user interaction
 */
export const Board: React.FC<BoardProps> = ({
  backgroundColor = "yellow",

}) => {



  const [state, setstate] = useState(intialState)
  const { boardArr, turn, winner } = state

  const fillBox = (id: number) => {
    if (winner?.length) return
    let temp: boardArrOfObj = [...boardArr];
    const index = temp.findIndex(el => el.id === id);
    const currentPlater = turn ? 'x' : 'o'
    temp[index]['shape'] = currentPlater;

    setstate({
      ...state,
      boardArr: [...temp],
      turn: !turn,
    })

    const resultStr = temp.filter(el => el.shape === currentPlater).sort((a, b) => a.id - b.id).map(el => el.id.toString()).join(",").replaceAll(",", "")

    for (const sequence of winnerCheck) {
      if (resultStr.includes(sequence)) setstate({
        ...state,
        winner: currentPlater
      })
    }
  }
  const layout = boardArr.map(el => <Box key={el.id} shape={el.shape} size={el.size} backgroundColor={backgroundColor} id={el.id} onclick={() => fillBox(el.id)} />)

  return (
    <Fragment>
      <Grid backgroundColor={backgroundColor}>
        {layout}
      </Grid>
      {winner?.length ? <h2>{`${winner} is the Winner !`}</h2> : <div />}
    </Fragment>
  );
};


const Grid = styled.div<{ backgroundColor?: string }>`
display:flex;
flex-wrap:wrap;
width:600px;
height:600px;
background-color:${props => props.backgroundColor}
`

// interface ContentProps {
//   shape?: 'empty' | 'x' | 'o';
//   backgroundColor?: string;
//   size?: '100' | '200' | '300';
// }

// interface ShapeProps {
//   shape?: 'empty' | 'x' | 'o';
//   size?: '100' | '200' | '300';
// }

// const Content = styled.div<ContentProps>`
// background:${props => props.backgroundColor};
// color:blue;
// width:${props => props.size}px;
// height:${props => props.size}px;
// display:flex;
// justify-content:center;
// align-items:center;
// `
// const Shape = styled.span<ShapeProps>`
// ${props=>{
//   if(props.shape === 'o'){
//     return o(props.size)
//   }
//   else if (props.shape === 'x'){
//     return x(props.size)
//   }
// }
// }
// `

