import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useCanvas from '../hooks/useCanvas';
import { useCanvasContext } from '../ImageAreaSelector';

export default function ImageCanvas({ src, width, height }) {
  const { imageWidth, imageHeight, setImageWidth, setImageHeight } =
    useCanvasContext();
  const { canvasRef, ctxRef } = useCanvas();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.addEventListener('load', () => {
      const { naturalWidth: nw, naturalHeight: nh } = image;
      if (width && height) {
        image.width = width;
        image.height = height;
      } else if (width) {
        image.width = width;
        image.height = (+nh / +nw) * width;
        height = image.height;
      } else if (height) {
        image.height = height;
        image.width = (+nw / +nh) * height;
        width = image.width;
      } else {
        width = nw;
        height = nh;
      }
      setImageWidth(width);
      setImageHeight(height);
      ctxRef.current.drawImage(image, 0, 0, width, height);
    });
  }, []);

  return <canvas ref={canvasRef} width={imageWidth} height={imageHeight} />;
}

ImageCanvas.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
