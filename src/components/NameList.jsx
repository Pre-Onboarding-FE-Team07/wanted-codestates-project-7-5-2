import PropTypes from 'prop-types';
import { useCanvasContext } from '../ImageAreaSelector';

export default function NameList({ offsetLeft = 0, offsetTop = 0 }) {
  const { selectedAreaList, setSelectedAreaList } = useCanvasContext();

  return selectedAreaList.length ? (
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
      {selectedAreaList.map(({ name, id }, index) => (
        <li style={{ color: 'black', margin: 2 }} key={index}>
          <button
            style={{ fontSize: 14, padding: '0px 3px', cursor: 'pointer' }}
            onClick={() =>
              setSelectedAreaList(selectedAreaList.filter((a) => a.id !== id))
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
