import PropTypes from 'prop-types';
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import useCanvas from '../hooks/useCanvas';
import Canvas from './components/Canvas';
import DrawingCanvas from './components/DrawingCanvas';
import NameList from './components/NameList';

const CanvasContext = createContext();
export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  return context;
};

export default function ImageDragSelector({ src, width, height }) {
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);
  const [canvasList, setCanvasList] = useState([]);
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
    const name = window.prompt('이름을 입력해주세요.');
    if (!name) return;
    const ref = createRef();
    canvasList.push({ name, ref, area });
    setCanvasList([...canvasList]);
  };

  return (
    <CanvasContext.Provider
      value={{
        imageWidth,
        imageHeight,
        area,
        setArea,
        canvasList,
        setCanvasList,
      }}
    >
      <div style={{ position: 'relative' }}>
        <NameList offsetLeft={10} offsetTop={10} />
        <canvas ref={canvasRef} />
        <DrawingCanvas />
        {canvasList.map(({ name, ref }, index) => (
          <Canvas key={index} ref={ref} name={name} />
        ))}
      </div>
    </CanvasContext.Provider>
  );
}

ImageDragSelector.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
