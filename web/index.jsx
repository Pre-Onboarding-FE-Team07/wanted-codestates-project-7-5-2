import ReactDOM from 'react-dom';
import ImageAreaSelector from '../src';
import './style.css';

const imageAddress =
  'https://pineapple-caribou-462.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F451a2619-a21b-462d-bb59-a50196e3057a%2Ffashion-unsplash.jpg?table=block&id=efd09440-86df-4dcc-ae21-29097de2bc9b&spaceId=06605955-0fd9-4614-ba9a-0812be412dbe&width=2000&userId=&cache=v2';

ReactDOM.render(
  <ImageAreaSelector src={imageAddress} width={500} />,
  document.getElementById('root')
);
