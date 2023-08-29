import type { Meta, StoryObj } from '@storybook/react';
import AdminEditItemModal from 'components/modal/admin/AdminEditItem';

const meta: Meta<typeof AdminEditItemModal> = {
  title: 'admin/AdminEditItemModal',
  component: AdminEditItemModal,
  tags: ['autodocs'],
  argTypes: {
    itemId: Number,
    itemName: String,
    mainContent: String,
    imageUri: String,
    originalPrice: Number,
    discount: Number,
  },
};

export default meta;
type Story = StoryObj<typeof AdminEditItemModal>;

export const Megaphone: Story = {
  args: {
    itemId: 1,
    itemName: '확성기',
    mainContent: '확성기입니다',
    imageUri: 'https://picsum.photos/200/300?grayscale',
    originalPrice: 42,
    discount: 50,
  },
};

export const ProfileChange: Story = {
  args: {
    itemId: 2,
    itemName: '프로필 변경권',
    mainContent: '프로필 변경권입니다',
    imageUri: 'https://picsum.photos/200/300?grayscale',
    originalPrice: 42,
    discount: 50,
  },
};
export const ProfileBackgroundChange: Story = {
  args: {
    itemId: 3,
    itemName: '프로필 배경 변경권',
    mainContent: '프로필 배경 변경권입니다',
    imageUri: 'https://picsum.photos/200/300?grayscale',
    originalPrice: 100,
    discount: 40,
  },
};
