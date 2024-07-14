// src/components/agenda/agendaDetail/Participant.stories.tsx

import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Coalition } from 'constants/agenda/coalition';
import Participant from 'components/agenda/agendaDetail/taps/Participant';

interface ParticipantProps {
  name: string;
  iconType: Coalition;
}

export default {
  title: 'Agenda/Participant',
  component: Participant,
  argTypes: {
    iconType: {
      control: {
        type: 'select',
        options: Object.values(Coalition),
      },
    },
  },
} as Meta;

const Template: Story<ParticipantProps> = (args) => <Participant {...args} />;

export const Gam = Template.bind({});
Gam.args = {
  name: 'intraID',
  iconType: Coalition.GAM,
};

export const Gon = Template.bind({});
Gon.args = {
  name: 'intraID',
  iconType: Coalition.GON,
};

export const Gun = Template.bind({});
Gun.args = {
  name: 'intraID',
  iconType: Coalition.GUN,
};

export const Lee = Template.bind({});
Lee.args = {
  name: 'intraID',
  iconType: Coalition.LEE,
};
