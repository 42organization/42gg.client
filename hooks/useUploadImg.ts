import { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import imageCompression from 'browser-image-compression';

export default async function useUploadImg() {
  const [imgData, setImgData] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const setError = useSetRecoilState(errorState);
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files?.[0]);
  };

  const imgCompress = async (fileSrc: File) => {
    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 150,
      filetype: 'image/jpeg',
      useWebWorker: true,
    };
    try {
      const res = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      setImgData(res);
      reader.readAsDataURL(res);
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
    } catch (error) {
      setError('SW00');
    }
  };

  useEffect(() => {
    if (file) {
      imgCompress(file);
    }
  }, [file]);

  return { imgData, imgPreview, uploadImg };
}
