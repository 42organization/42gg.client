import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import type { Meta, StoryObj } from '@storybook/react';
import { errorState } from 'utils/recoil/error';
import ErrorPage from 'components/error/Error';

const meta: Meta = {
  title: '/ErrorPage',
  component: ErrorPage,
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

function useSetError() {
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    setError('HJ00');
  }, []);
}

const ErrorDefault = () => {
  useSetError();
  return <ErrorPage />;
};

export const Default: Story = {
  render: () => <ErrorDefault />,
};
