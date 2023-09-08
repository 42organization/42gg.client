import imageCompression from 'browser-image-compression';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';

interface ICompressProps {
  maxSizeMB: number;
  maxWidthOrHeight: number;
}

export default function useUploadImg({
  maxSizeMB,
  maxWidthOrHeight,
}: ICompressProps) {
  const [imgData, setImgData] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const setSnackbar = useSetRecoilState(toastState);
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files?.[0]);
  };

  const imgCompress = async (fileSrc: File) => {
    const options = {
      maxSizeMB: maxSizeMB,
      maxWidthOrHeight: maxWidthOrHeight,
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
      setSnackbar({
        toastName: 'uploadImg',
        severity: 'error',
        message: '이미지 압축에 실패했습니다.',
        clicked: true,
      });
    }
  };

  useEffect(() => {
    if (file) {
      imgCompress(file);
    }
  }, [file]);

  return { imgData, imgPreview, uploadImg };
}
