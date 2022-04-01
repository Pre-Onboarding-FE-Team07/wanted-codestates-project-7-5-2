# wanted-codestates-project-7-5-2

## 박진용

#### 구현한 방법

- `ImageAreaSelector` 컴포넌트를 작성했습니다. `src`, `width`, `height` 속성을 전달 받습니다.

- `ImageAreaSelector`는 Context API를 포함하며 다음 state를 관리합니다.

  - `imageWidth`, `imageHeight`: 이미지의 높이와 너비입니다. 캔버스의 높이와 너비를 결정할 때 필요합니다.
  - `area`: 현재 그려지고 있는 영역의 시작 지점과 종료 지점을 갖습니다.
  - `selectedAreaList`: 그려진 영역 목록 정보를 관리합니다.

- `ImageAreaSelector`는 다음의 역할로 레이어가 나뉩니다.

  - `img`: 사용자에게 보여줄 이미지입니다.
  - `DrawingCanvas`: 사용자가 그리는 도중의 영역을 보여줄 캔버스입니다.
  - `AreaCanvas`: 그린 결과를 보여줄 캔버스입니다.
  - `NameList`: 그린 영역의 목록입니다.

- 사용자가 이미지 위에서 마우스를 클릭한 후 움직이면 `DrawingCanvas` 위에서 영역이 그려집니다. 이 때 발생하는 이벤트는 아래와 같습니다.

  - `mousedown`: 마우스를 클릭하면 발생하는 이벤트입니다. `area`에 시작 지점을 저장합니다.
  - `mousemove`: 마우스를 움직이면 발생하는 이벤트입니다. 움직일 때마다 매번 `DrawingCanvas` 위에 그려진 영역을 지우고 시작 지점부터 현재 마우스 지점까지 영역을 다시 그립니다.
  - `mouseup`: 마우스 클릭을 때면 발생하는 이벤트입니다. `area`에 종료 지점을 저장합니다. 그 후, `selectedAreaList`에 새로운 영역을 추가합니다. 리렌더링을 통해 `AreaCanvas`에 새로운 영역이 그려집니다.

- 시작 지점과 종료 지점의 차이가 너무 작다면 추가하지 않도록 했습니다. 또한, 이름을 작성하지 않고 엔터를 누르면 추가되지 않도록 했습니다.

- 하나의 컴포넌트로서 동작하므로 이를 Npm Module로서 배포까지 완료했습니다. 배포의 경우 `package.json`의 역할이 매우 중요했습니다. `version`을 명시했고, `files`에 `dist`를 포함하여 해당 폴더만 배포될 수 있도록 하였습니다. 그리고 React에 의존성을 가지므로 `peerDependencies`에 `react`를 추가하였습니다.

#### 어려웠던 점 (에러 핸들링)

- `DrawingCanvas`를 클릭했을 때, 이미지의 시작 지점으로부터 클릭한 위치까지의 거리를 구하기 위해서 `event.clientX - ctx.canvas.offsetLeft` 연산으로 시도해보았지만, 제대로 동작하지 않는 문제가 있었습니다. 브라우저의 고유 이벤트를 얻기 위해 `nativeEvent` 속성에 접근하여 `offsetX`와 `offsetY`를 가져오는 방식으로 문제를 해결했습니다.

- 이미지가 load되기 전에 width와 height가 결정되지 않아서 canvas의 초기 높이와 너비를 변경할 수 없는 문제가 있었습니다. `onLoad` 이벤트를 통해 load가 완료된다면 `imageWidth`와 `imageHeight`가 변경되도록 해서 문제를 해결했습니다.

- 캔버스의 `style` 속성을 통해 `width`와 `height`를 설정하게 되면 [`fillRect`가 이상하게 동작하는](https://stackoverflow.com/q/51449692) 버그가 있었습니다. `canvas`의 `width`와 `height` 속성을 직접 설정하는 것으로 변경하여 문제를 해결했습니다.

- `webpack`을 통해 빌드할 때, `development`, `production`을 분기하여 빌드할 필요성을 느꼈습니다. 공통으로 적용할 속성을 `webpack.common.js`에 작성하고, `webpack-merge`를 활용하여 `webpack.dev.js`와 `webpack.prod.js` 각각의 파일에서 합쳐서 빌드하는 방법으로 문제를 해결했습니다.

## 김정훈

#### 구현한 방법

#### 어려웠던 점 (에러 핸들링)