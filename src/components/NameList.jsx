import PropTypes from 'prop-types';
import { useCanvasContext } from '../ImageAreaSelector';

export default function NameList({ offsetLeft, offsetTop }) {
  const { canvasList, setCanvasList } = useCanvasContext();

  // console.log(
  //   canvasList.map(({ name, ref }) => [name, ref.current?.dataset.id])
  // );

  return canvasList.length ? (
    <ul
      style={{
        position: 'absolute',
        top: offsetTop,
        left: offsetLeft,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 8,
        borderRadius: 10,
        listStyle: 'none',
        zIndex: 100,
      }}
    >
      {canvasList.map(({ name, ref }, index) => (
        <li style={{ color: 'black', margin: 2 }} key={index}>
          <button
            style={{ fontSize: 14, padding: '0px 3px', cursor: 'pointer' }}
            onClick={() =>
              setCanvasList(
                canvasList.filter(({ ref: canvasRef }) => canvasRef !== ref)
              )
            }
          >
            ×
          </button>
          <span> {name}</span>
        </li>
      ))}
    </ul>
  ) : null;
}

NameList.propTypes = {
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
};
