// src/components/agenda/agendaDetail/AgendaTap.stories.js

import { action } from '@storybook/addon-actions';
import React from 'react';
import { TABS } from 'constants/agenda/agendaDetail/agendaTabs';
import AgendaTap from 'components/agenda/agendaDetail/AgendaTap';

export default {
  title: 'Agenda/AgendaTap', // Storybook에서 보이는 경로
  component: AgendaTap,
};

const Template = (args) => <AgendaTap {...args} />;

export const Default = Template.bind({});
Default.args = {
  // 필요한 경우 기본 props를 정의할 수 있습니다.
};
