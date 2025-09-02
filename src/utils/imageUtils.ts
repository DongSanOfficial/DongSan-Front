import heic2any from 'heic2any';

/**
 * 이미지 압축 함수
 */
export const compressImage = (file: File, maxWidth: number = 800): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('압축 실패'));
            }
          },
          'image/jpeg',
          0.8
        );
      };

      img.onerror = () => reject(new Error('이미지 로드 실패'));
    };

    reader.onerror = () => reject(new Error('파일 읽기 실패'));
  });
};

/**
 * HEIC 파일인지 확인하는 함수
 */
export const isHeicFile = (file: File): boolean => {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif')
  );
};

/**
 * HEIC 파일을 JPEG로 변환하는 함수
 */
export const convertHeicToJpeg = async (file: File): Promise<File> => {
  try {
    const convertedResult = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });

    const convertedBlob = Array.isArray(convertedResult)
      ? convertedResult[0]
      : convertedResult;

    return new File(
      [convertedBlob], 
      file.name.replace(/\.(heic|heif)$/i, '.jpg'), 
      {
        type: 'image/jpeg',
        lastModified: Date.now(),
      }
    );
  } catch (error) {
    console.error('HEIC 변환 실패:', error);
    throw error;
  }
};