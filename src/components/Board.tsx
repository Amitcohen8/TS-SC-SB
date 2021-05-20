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
  // id: number
}

/**
 * Primary UI component for user interaction
 */
export const Board: React.FC<BoardProps> = ({
  backgroundColor = "#f2dcdc",
  shape = 'empty',
  size = '200'

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
      {winner?.length ? <Winner>{`${winner} is the Winner !`}</Winner> : <div />}
    </Fragment>
  );
};


const Grid = styled.div<{ backgroundColor?: string }>`
display:flex;
flex-wrap:wrap;
width:600px;
height:600px;
background-color:${props => props.backgroundColor};
position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
`

const Winner = styled.h1`
text-align:center;
color:blue;
margin-bottom:-200px;
font-family: Arial, Helvetica, sans-serif;
`

export default Board


