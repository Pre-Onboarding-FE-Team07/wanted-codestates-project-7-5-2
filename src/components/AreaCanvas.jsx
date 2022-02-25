import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useCanvas from '../hooks/useCanvas';
import { useCanvasContext } from '../ImageAreaSelector';

export default function AreaCanvas() {
  const { imageWidth, imageHeight, selectedAreaList } = useCanvasContext();
  const { canvasRef, ctxRef } = useCanvas();

  useEffect(() => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, imageWidth, imageHeight);
    if (selectedAreaList.length) {
      selectedAreaList.forEach(({ name, area }) => {
        const { sx, sy, dx, dy } = area;
        ctx.fillStyle = 'rgba(129, 236, 236, 0.3)';
        ctx.strokeStyle = 'rgba(9, 132, 227,1.0)';
        ctx.fillRect(sx, sy, dx - sx, dy - sy);
        ctx.strokeRect(sx, sy, dx - sx, dy - sy);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 20px Arial';
        ctx.textBaseline = 'top';
        ctx.fillText(name, sx, sy);
      });
    }
  }, [selectedAreaList]);

  return (
    <canvas
      ref={canvasRef}
      width={imageWidth}
      height={imageHeight}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
}

AreaCanvas.propTypes = {
  name: PropTypes.string,
  area: PropTypes.object,
};
