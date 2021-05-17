import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Box, BoxProps } from './Box';

export default {
  title: 'Example/Box',
  component: Box,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<BoxProps> = (args) => <Box {...args} />;

export const O = Template.bind({});
O.args = {
    shape : 'o',
    size : '100',
    backgroundColor:'blue',
};

export const X = Template.bind({});
X.args = {
    shape : 'x',
    size : '200',
    backgroundColor:'red',
};

export const Empty = Template.bind({});
Empty.args = {
    shape : 'empty',
    size : '200',
    backgroundColor:'yellow',
};


