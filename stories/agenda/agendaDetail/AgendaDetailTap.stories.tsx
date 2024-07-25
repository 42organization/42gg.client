// src/components/agenda/agendaDetail/AgendaTab.stories.js

import { action } from '@storybook/addon-actions';
import React from 'react';
import { TABS } from 'constants/agenda/agendaDetail/agendaTabs';
import AgendaTab from 'components/agenda/agendaDetail/AgendaTab';

export default {
  title: 'Agenda/AgendaTab',
  component: AgendaTab,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template = (args) => <AgendaTab {...args} />;

export const Default = Template.bind({});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Default.args = {};
