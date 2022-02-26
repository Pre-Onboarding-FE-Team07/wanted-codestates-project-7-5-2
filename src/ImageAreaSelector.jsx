import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import AreaCanvas from './components/AreaCanvas';
import DrawingCanvas from './components/DrawingCanvas';
import NameList from './components/NameList';
import { getUniqueId } from './utils/util';

const CanvasContext = createContext();
export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  return context;
};

export default function ImageAreaSelector({ src, width, height }) {
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);
  const [selectedAreaList, setSelectedAreaList] = useState([]);
  const [area, setArea] = useState({ sx: 0, sy: 0, dx: 0, dy: 0 });
  const imgRef = useRef();

  useEffect(() => {
    if (area.dx && area.dy) {
      const name = window.prompt('이름을 입력해주세요.');
      if (!name) return;
      const id = getUniqueId();
      selectedAreaList.push({ id, name, area });
      setSelectedAreaList([...selectedAreaList]);
    }
  }, [area]);

  useEffect(() => {
    setImageWidth(imgRef.current.width);
    setImageHeight(imgRef.current.height);
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        imageWidth,
        setImageWidth,
        imageHeight,
        setImageHeight,
        area,
        setArea,
        selectedAreaList,
        setSelectedAreaList,
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={src}
          ref={imgRef}
          width={width}
          height={height}
          alt="no source"
          draggable={false}
        />
        <NameList offsetLeft={10} />
        <AreaCanvas />
        <DrawingCanvas />
      </div>
    </CanvasContext.Provider>
  );
}

ImageAreaSelector.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
