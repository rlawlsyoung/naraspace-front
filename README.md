# 🛰️ NARA SPACE

### 1. Github 링크

https://github.com/rlawlsyoung/naraspace-front

***

### 2. 실행 방법

#### 2-1. node.js를 최신 버전으로 설치해주세요.
vite를 사용하였기 때문에 최소 14.8 버전 이상이 요구됩니다.

#### 2-2. 레포지토리를 클론해주세요.
`git clone https://github.com/rlawlsyoung/naraspace-front.git`
 
#### 2-3. dependencies를 설치해주세요.
`npm install`

#### 2-4. json-server 서버를 실행시켜주세요.
`json-server ./user-data.json --port 9000`

#### 2-5.  새로운 터미널 창을 열어 dev server를 실행시켜주세요.
`npm run dev`

#### 2-6.  http://localhost:3010/ 으로 접속해주세요.
`http://localhost:3010/`

***

### 3. 프로젝트 설명

#### 3-1. PAGE 01 (http://localhost:3010/)
각 컨테이너의 헤더 부분(select가 있는)은 같은 컴포넌트를 공유합니다.
또한 오름차순이든 내림차순이든 생년월일이 같다면 먼저 영어 이름을 가진 유저 정보가 오도록 로직을 구현했습니다.

그리고 추가적으로 checkbox, select, scrollbar의 커스텀을 진행하였습니다.
그 중, select는 다른 부분을 클릭하면 닫히는 기능도 구현했습니다.

좌측에서 유저 정보를 체크한 후 저장하기 버튼을 누르면 json-server를 통해 user-data.json 파일에 수정된 값이 저장되도록 구현했습니다.

#### 3-2. PAGE 02 (http://localhost:3010/user)
user-data.json에서 checked가 true인 유저 정보들을 불러와 출력합니다.
그리고 추가적으로 저는 유저 정보를 클릭했을 때, 자세히 보기 링크를 만들어 /user/:id 페이지로 쉽게 이동할 수 있도록 했습니다.

여기 또한 1페이지와 마찬가지로 컨테이너의 헤더 부분을 공유했습니다.

#### 3-3. PAGE 03 (http://localhost:3010/user/:id)
저는 상세페이지에 추가적으로 프로필 수정 기능을 만들어 사용자의 프로필 사진, 이름, 생년월일, 한마디를 수정할 수 있는 기능을 추가했습니다.
state를 통해 수정된 유저 정보 값을 저장하고 json-server를 통해 전달하여 수정이 가능하도록 구현했습니다.

추가적으로 모든 페이지를 반응형으로 구현하고 잘못된 경로로 접속했을 때 잘못된 접근이라고 알리는 페이지도 구현했습니다.
