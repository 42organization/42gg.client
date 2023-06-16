import type { Meta, StoryObj } from '@storybook/react';
import NotiItem from 'components/Layout/NotiBar/NotiItem';

const meta: Meta<typeof NotiItem> = {
  title: 'Header/NotiItem',
  component: NotiItem,
  tags: ['autodocs'],
  argTypes: {
    data: {
      id: Number,
      type: 'string',
      isChecked: [true, false],
      message: String,
      createdAt: String,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotiItem>;

export const UnreadAnnounce: Story = {
  args: {
    data: {
      id: 101010,
      type: 'ANNOUNCE',
      isChecked: false,
      message: '공지다',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};

export const UnreadImminent: Story = {
  args: {
    data: {
      id: 101010,
      type: 'IMMINENT',
      isChecked: false,
      message: '<intraId::Cypress>님과 곧 경기가 시작됩니다',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
export const UnreadCancedByMan: Story = {
  args: {
    data: {
      id: 101010,
      type: 'CANCELEDBYMAN',
      isChecked: false,
      message: '경기가 취소되었다',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
export const UnreadMatched: Story = {
  args: {
    data: {
      id: 101010,
      type: 'MATCHED',
      isChecked: false,
      message: '매칭 잡혔다',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};

export const readNoti: Story = {
  args: {
    data: {
      id: 101010,
      type: 'MATCHED',
      isChecked: true,
      message: '매칭 잡혔다',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
