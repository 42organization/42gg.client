// dynamic import로 Quill 불러오는 컴포넌트
import dynamic from 'next/dynamic';

// TODO : 로딩 컴포넌트 구체화 필요함.
const DynamicQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default DynamicQuill;
