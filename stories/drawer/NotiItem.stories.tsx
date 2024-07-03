import type { Meta, StoryObj } from '@storybook/react';
import NotiItem from 'components/takgu/Layout/NotiBar/NotiItem';

const meta: Meta<typeof NotiItem> = {
  title: 'Drawer/NotiItem',
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
      message: '공지입니다 읽음x',
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
      message: '<intraId::Cypress>님과 곧 경기가 시작됩니다 읽음x',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
export const UnreadCanceledByMan: Story = {
  args: {
    data: {
      id: 101010,
      type: 'CANCELEDBYMAN',
      isChecked: false,
      message: '경기가 취소되었습니다 읽음x',
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
      message: '매칭 잡혔습니다 읽음x',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};

export const ReadAnnounce: Story = {
  args: {
    data: {
      id: 101010,
      type: 'ANNOUNCE',
      isChecked: true,
      message: '공지입니다 읽음o',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};

export const ReadImminent: Story = {
  args: {
    data: {
      id: 101010,
      type: 'IMMINENT',
      isChecked: true,
      message: '<intraId::Cypress>님과 곧 경기가 시작됩니다 읽음o',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
export const ReadCanceledByMan: Story = {
  args: {
    data: {
      id: 101010,
      type: 'CANCELEDBYMAN',
      isChecked: true,
      message: '경기가 취소되었습니다 읽음o',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};

export const ReadMatched: Story = {
  args: {
    data: {
      id: 101010,
      type: 'MATCHED',
      isChecked: true,
      message: '매칭 잡혔습니다 읽음o',
      createdAt: '1900-01-01T01:01:01',
    },
  },
};
