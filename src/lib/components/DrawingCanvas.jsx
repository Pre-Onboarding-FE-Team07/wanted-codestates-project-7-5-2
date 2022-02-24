import { useEffect, useRef } from 'react';
import useCanvas from '../../hooks/useCanvas';
import { useCanvasContext } from '../ImageDragSelector';

export default function DrawingCanvas() {
  const { imageWidth, imageHeight, area, setArea } = useCanvasContext();
  const { canvasRef, ctxRef, setSize } = useCanvas();
  const isDrawing = useRef(false);

  useEffect(() => {
    setSize(imageWidth, imageHeight);
  }, [imageWidth, imageHeight]);

  const clearDrawBox = () => {
    ctxRef.current.clearRect(0, 0, imageWidth, imageHeight);
  };

  const drawCanvasBox = ({ mx, my }) => {
    clearDrawBox();
    const { sx, sy } = area;
    ctxRef.current.fillStyle = 'rgba(253, 121, 168, 0.3)';
    ctxRef.current.strokeStyle = 'rgba(232, 67, 147, 1.0)';
    ctxRef.current.fillRect(sx, sy, mx - sx, my - sy);
    ctxRef.current.strokeRect(sx, sy, mx - sx, my - sy);
  };

  const onMouseDown = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    isDrawing.current = true;
    setArea({ sx: x, sy: y, dx: null, dy: null });
  };

  const onMouseUp = ({ nativeEvent: { offsetX: dx, offsetY: dy } }) => {
    clearDrawBox();
    isDrawing.current = false;
    if (Math.abs(area.sx - dx) < 10 || Math.abs(area.sy - dy) < 10) return;
    setArea((prev) => ({ ...prev, dx, dy }));
  };

  const onMouseMove = ({ nativeEvent: { offsetX: mx, offsetY: my } }) => {
    if (!isDrawing.current) return;
    drawCanvasBox({ mx, my });
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 50 }}
    />
  );
}
