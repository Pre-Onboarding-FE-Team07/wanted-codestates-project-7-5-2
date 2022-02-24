import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function ImageDragSelector({ src, width, height }) {
  const canvasRef = useRef();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    const ctx = canvasRef.current.getContext('2d');
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
        width = image.naturalWidth;
        height = image.naturalHeight;
      }
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      ctx.drawImage(image, 0, 0, width, height);
    });
  }, []);

  return <canvas ref={canvasRef} />;
}

ImageDragSelector.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
