# React Image Area Selector <!-- omit in toc -->

이미지의 특정 영역을 드래그하여 선택하고 조작합니다.

>[프로젝트 진행 후기](./project.md)

## 목차 <!-- omit in toc -->

- [배포 주소](#배포-주소)
- [실행 방법](#실행-방법)
- [NPM 설치 방법](#npm-설치-방법)
- [사용 방법](#사용-방법)

## 배포 주소

- [Main Page](https://wanted-codestates-project-7-5-2.surge.sh)
- [Npm Module](https://www.npmjs.com/package/react-image-area-selector)

## 실행 방법

1. 원격 저장소를 로컬 저장소로 복사합니다.
   ```sh
   $ git clone https://github.com/Pre-Onboarding-FE-Team07/wanted-codestates-project-7-5-2.git
   ```

2. 프로젝트 의존 모듈을 설치합니다.
   ```sh
   $ yarn
   ```

3. 개발 서버를 시작합니다.
   ```sh
   $ yarn start:dev
   ```

## NPM 설치 방법

React, ReactDOM(>=17.0.0)을 필요로 합니다.

- npm
  ```sh
  $ npm i react-image-area-selector
  ```
- yarn
  ```sh
  $ yarn add react-image-area-selector
  ```

## 사용 방법

| Prop   | Description   |
| :----- | :------------ |
| src    | 이미지의 주소 |
| width  | 이미지의 너비 |
| height | 이미지의 높이 |


```jsx
const source = '...';
ReactDOM.render(<ImageAreaSelector src={source} width={500} />, document.getElementById('root'));
```
