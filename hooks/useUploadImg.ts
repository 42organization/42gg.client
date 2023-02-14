import { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function useUploadImg() {
  const [imgData, setImgData] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>();

  const uploadImg = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImgData(file);
    }
  };

  const imgCompress = async (fileSrc: File) => {
    // const options = {
    //   maxSizeMB: 0.1,
    //   maxWidthOrHeight: 320,
    //   useWebWorker: true,
    // };
    try {
      //   const res = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.readAsDataURL(fileSrc);
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgData) {
      imgCompress(imgData);
    }
  }, [imgData]);

  return { imgData, imgPreview, uploadImg };
}
