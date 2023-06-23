import type { Meta, StoryObj } from '@storybook/react';
import AnnouncementModal from 'components/modal/event/AnnouncementModal';

const meta: Meta<typeof AnnouncementModal> = {
  title: 'Modal/AnnouncementModal',
  component: AnnouncementModal,
  tags: ['autodocs'],
  argTypes: {
    announcement: {
      content: String,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnnouncementModal>;

export const Default: Story = {
  args: {
    announcement: {
      content:
        '별에도 동경과 봄이 봅니다. 이름자를 멀리 별 그리워 나는 무엇인지 추억과 경, 듯합니다. 써 이름과, 오면 듯합니다.',
    },
  },
};

export const LongContent: Story = {
  args: {
    announcement: {
      content:
        '했던 별빛이 비둘기, 소녀들의 위에 이름자 덮어 노루, 있습니다. 어머니, 이웃 딴은 이름과 없이 이름자를 다 위에도 있습니다. 하나 새워 같이 했던 벌레는 부끄러운 하나에 까닭입니다. 가을 애기 동경과 속의 별빛이 헤는 하나에 밤이 버리었습니다. 별 이름과, 이웃 겨울이 당신은 때 버리었습니다. 나는 내 멀리 남은 별 있습니다. 이런 청춘이 멀리 흙으로 봅니다. 잔디가 않은 불러 마리아 별에도 아무 봅니다. 프랑시스 불러 이름과, 이런 무성할 까닭입니다. 아침이 프랑시스 별들을 까닭입니다. 말 사람들의 별 이름자를 이름과, 어머님, 있습니다. 옥 별이 별들을 그리워 내 계절이 계십니다. 릴케 이네들은 지나고 있습니다. 계집애들의 불러 토끼, 책상을 패, 위에 까닭입니다. 둘 헤는 어머니, 새워 내 이름을 가난한 가득 하나에 버리었습니다. 청춘이 된 없이 오는 계십니다. 무성할 위에 프랑시스 이 밤을 듯합니다. 새워 무덤 때 아직 시와 버리었습니다. 이웃 잔디가 그리워 가을 까닭입니다. 너무나 경, 하나에 있습니다. 위에 시인의 위에도 계십니다.',
    },
  },
};
