import { useEffect, useRef } from 'react';

export default function useCanvas(options) {
  const canvasRef = useRef();
  const ctxRef = useRef();

  const setSize = (width, height) => {
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  };

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
      if (options?.style?.fill) {
        ctxRef.current.fillStyle = options.style.fill;
      }
      if (options?.style?.stroke) {
        ctxRef.current.strokeStyle = options.style.stroke;
      }
    }
  }, []);

  return { canvasRef, ctxRef, setSize };
}
