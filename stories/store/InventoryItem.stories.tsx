import type { Meta, StoryObj } from '@storybook/react';
import { InvetoryItem } from 'components/store/InventoryItem';

// args: {
//   item: InventoryItem,
// }

const meta: Meta<typeof InvetoryItem> = {
  title: 'Store/InvetoryItem',
  component: InvetoryItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InvetoryItem>;

const fallBackImage = 'https://via.placeholder.com/600';

export const Before: Story = {
  args: {
    item: {
      receiptId: 1,
      itemName: '사용 전 아이템',
      imageUri: fallBackImage,
      purchaserIntra: 'kim-takgu',
      itemType: 'MEGAPHONE',
      itemStatus: 'BEFORE',
    },
  },
};

export const Waiting: Story = {
  args: {
    item: {
      receiptId: 1,
      itemName: '대기 중 아이템',
      imageUri: fallBackImage,
      purchaserIntra: 'kim-takgu',
      itemType: 'MEGAPHONE',
      itemStatus: 'WAITING',
    },
  },
};

export const Using: Story = {
  args: {
    item: {
      receiptId: 1,
      itemName: '사용 중 아이템',
      imageUri: fallBackImage,
      purchaserIntra: 'kim-takgu',
      itemType: 'MEGAPHONE',
      itemStatus: 'USING',
    },
  },
};
