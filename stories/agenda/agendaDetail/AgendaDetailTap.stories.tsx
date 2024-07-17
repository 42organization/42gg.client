// src/components/agenda/agendaDetail/AgendaTap.stories.js

import { action } from '@storybook/addon-actions';
import React from 'react';
import { TABS } from 'constants/agenda/agendaDetail/agendaTabs';
import AgendaTap from 'components/agenda/agendaDetail/AgendaTap';

export default {
  title: 'Agenda/AgendaTap',
  component: AgendaTap,
};

const Template = (args) => <AgendaTap {...args} />;

export const Default = Template.bind({});
Default.args = {};
