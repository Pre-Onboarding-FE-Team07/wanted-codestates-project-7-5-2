import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useCanvas from '../hooks/useCanvas';

const CanvasContext = createContext();
const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  return context;
};

export default function ImageDragSelector({ src, width, height }) {
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);
  const [area, setArea] = useState({ sx: null, sy: null, dx: null, dy: null });
  const { canvasRef, ctxRef, setSize } = useCanvas();

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
      setSize(width, height);
      setImageWidth(width);
      setImageHeight(height);
      ctxRef.current.drawImage(image, 0, 0, width, height);
    });
  }, []);

  useEffect(() => {
    if (area.dx && area.dy) onDrawEnd();
  }, [area]);

  const onDrawEnd = () => {
    const { sx, sy, dx, dy } = area;
    ctxRef.current.fillStyle = 'rgba(129, 236, 236, 0.3)';
    ctxRef.current.strokeStyle = 'rgba(9, 132, 227,1.0)';
    ctxRef.current.fillRect(sx, sy, dx - sx, dy - sy);
    ctxRef.current.strokeRect(sx, sy, dx - sx, dy - sy);
    ctxRef.current.fillStyle = 'black';
    ctxRef.current.font = 'bold 20px Arial';
    ctxRef.current.textBaseline = 'top';
    ctxRef.current.fillText(window.prompt('이름을 입력해주세요.'), sx, sy);
  };

  return (
    <CanvasContext.Provider value={{ imageWidth, imageHeight, area, setArea }}>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} />
        <TempCanvas />
      </div>
    </CanvasContext.Provider>
  );
}

ImageDragSelector.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

function TempCanvas() {
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
    ctxRef.current.strokeRect(sx, sy, mx - sx, my - sy);
  };

  const onMouseDown = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    isDrawing.current = true;
    setArea({ sx: x, sy: y, dx: null, dy: null });
  };

  const onMouseUp = ({ nativeEvent: { offsetX: dx, offsetY: dy } }) => {
    clearDrawBox();
    isDrawing.current = false;
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
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
}
