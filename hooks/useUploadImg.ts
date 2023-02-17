import { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import imageCompression from 'browser-image-compression';

export default function useUploadImg() {
  const [imgData, setImgData] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>();

  const setError = useSetRecoilState(errorState);
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgData(file);
    }
  };

  const imgCompress = async (fileSrc: File) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 320,
      useWebWorker: true,
    };
    try {
      const res = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
    } catch (error) {
      setError('SW00');
    }
  };

  useEffect(() => {
    if (imgData) {
      imgCompress(imgData);
    }
  }, [imgData]);

  return { imgPreview, uploadImg };
}
