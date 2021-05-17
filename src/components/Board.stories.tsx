import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Board, BoardProps } from './Board';

export default {
  title: 'Example/Board',
  component: Board,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BoardProps> = (args) => <Board {...args} />;

export const RedBoard = Template.bind({});
RedBoard.args = {
    backgroundColor:'#ffffff',
};




