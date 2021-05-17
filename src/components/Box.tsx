import { promises } from 'dns';
import React from 'react';
import styled from 'styled-components'
import {x,o} from '../styles/styles'


export interface BoxProps {
  shape?: 'empty' | 'x' | 'o';
  backgroundColor?: string;
  size?: '100' | '200' | '300';
  id:number;
  onclick?:(id:number)=>void
}

/**
 * Primary UI component for user interaction
 */
export const Box: React.FC<BoxProps> = ({
  shape = "empty",
  size = "200",
  backgroundColor = "red",
  id = 1,
  ...props
  
}) => {
 

  return (
    
    <Content 
             shape={shape} 
             size={size} 
             backgroundColor={backgroundColor}
             onClick={(e)=>{
               
              if(props.onclick)props.onclick(id)} }
             {...props}
     
    >
     <Shape shape={shape} size={size}>&#8203;</Shape>
    </Content>
   
  );
};


interface ContentProps {
  shape?: 'empty' | 'x' | 'o';
  backgroundColor?: string;
  size?: '100' | '200' | '300';
}

interface ShapeProps {
  shape?: 'empty' | 'x' | 'o';
  size?: '100' | '200' | '300';
}

const Content = styled.div<ContentProps>`
background:${props => props.backgroundColor};
color:blue;
width:${props => props.size}px;
height:${props => props.size}px;
display:flex;
justify-content:center;
align-items:center;
border-style: solid;
border-width: 1px;
border-color:black;
cursor:${props=>props.shape === 'empty' ? 'pointer' : 'default'};
box-sizing:border-box;
`
const Shape = styled.span<ShapeProps>`
${props=>{
  if(props.shape === 'o'){
    return o(props.size)
  }
  else if (props.shape === 'x'){
    return x(props.size)
  }
}
}
`

