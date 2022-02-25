import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useCanvasContext } from '../ImageAreaSelector';

const Canvas = forwardRef(({ name, area }, ref) => {
  const { imageWidth, imageHeight } = useCanvasContext();

  useEffect(() => {
    const ctx = ref.current.getContext('2d');
    const { sx, sy, dx, dy } = area;
    ctx.fillStyle = 'rgba(129, 236, 236, 0.3)';
    ctx.strokeStyle = 'rgba(9, 132, 227,1.0)';
    ctx.fillRect(sx, sy, dx - sx, dy - sy);
    ctx.strokeRect(sx, sy, dx - sx, dy - sy);
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText(name, sx, sy);
  }, []);

  return (
    <canvas
      ref={ref}
      width={imageWidth}
      height={imageHeight}
      data-id={`${name}+${Date.now()}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
});

Canvas.displayName = 'Canvas';

Canvas.propTypes = {
  name: PropTypes.string,
  area: PropTypes.object,
};

export default Canvas;