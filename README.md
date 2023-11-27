# BeatBridge (NewsFeed Website)

BeatBridge(BB)는 비트로 함께 연결되는 사용자들이 음악과 관련된 경험과 의견을 나누며 새로운 음악을 발견하는 새로운 경험을 할 수 있습니다.

## Project Type

팀 프로젝트

## Project Member

천민규, 이진호, 윤창근, 이하민, 김소이

## Technologies assigned to each individual

천민규 - CRUD
이진호 - Login, Modal
윤창근 - mainpage 카테고리별 post 생성
이하민 - mypage 생성 및 프로필 수정
김소이 - 회원가입 기능 구현

## Duration

21/11/2023 - 27/11/2023

## Development Environment

1. React(+ Context API)
2. JavaScript
3. HTML
4. firebase
5. Styled-Components (CSS)
6. React Router Dom (Multiple Pages Building)
7. Redux

## Data Manamgement

- Firebase Firestore, Authentication 사용
- Fire Store Data : Post Context 이용하여 데이터 관리
- Authentication Data : Auth Context 이용하여 사용자 정보 관리
- Modal Data : Redux를 이용하여 Custom Modal 사용할 수 있도록 모달 정보 관리

## Features

1. Build UI
2. View only my posts
3. Move to the my page
4. Login
5. Sign up
6. Edit Profile
7. Display posts by category
8. Save Profile Img at firestore
9. Custom Alert, Confirm Modal

## Mockup

Figma 활용하여 디자인 구현

![image](https://github.com/dygmm4288/team-newsfeed/assets/145360585/85d0831b-2a2e-4689-8e79-c1a943365fe4)

<p>로그인/회원가입 페이지</p>

![image](https://github.com/dygmm4288/team-newsfeed/assets/145360585/2c73abe0-7223-4068-b591-be4a7db69abb)

<p>메인페이지</p>

![image](https://github.com/dygmm4288/team-newsfeed/assets/145360585/e3132974-b560-4f1a-9099-421f6b0ddb45)

<p>상세페이지</p>

## Review

각자 나름 공정하게 역할 분담을 잘해서 마감일 전 따로 우리 팀의 목표 기한을 정해서 기술 구현 이후
부족한 부분은 보완하는 식으로 프로젝트를 진행하였는데, 생각보다 쉽지 않은 기능 구현에 협업이다 보니,
연동되어야만 하는 기능이 있어서 기다리다 멈추고 기다리다 멈추고 그러한 과정이 쌓이니 진행이 더뎌지는 느낌이 있었다.
그래도 매일 각자 진행상황을 공유하는 회의를 진행함으로써 어느 파트에 힘을 더 실어야 하고 구현이 끝난 팀원도
프로젝트에 도움이 되도록 각자의 역할을 극한으로 끌어올리며 도우면서 진행하니 나름대로 미흡하지만
좋은 호흡으로 프로젝트를 성공적으로 완성한 것 같다.

## Individual review

- 천민규 : 처음 프로젝트 팀장을 진행해보며, 실력적으로는 부족하나 그만큼 프로젝트가 정해진 기한 안에 최선의 결과를 낼 수 있도록 팀이 샛길로 빠지지 않도록 노력했던 것 같다.
  기능 구현 관점에서는 개념 자체가 부족한 상태로 주어진 기한 안에 턱걸이로 겨우 겨우 커리큘럼을 따라가다보니 이번 CRUD도 쉽지 않았던 것 같고,
  주말을 알차게 복습하는 시간으로 보내지 않는 이상 매 과정이 겉핧기 식으로 지나갈 것만 같아 정신을 똑바로 차려야겠다는 생각이 들었다.
- 이진호 : 그동안 해왔던 비동기 처리는 애교 수준으로 굉장히 많은 비동기 처리를 다뤄야 하는데 어떻게 하면 더 효율적으로 다룰 수 있을까 고민을 하게 만든 과제였습니다.데이터의 종류, 타입, 정확한 흐름 등 데이터에 대해서 제대로 알지 못하여 기능 구현에 대한 애로사항은 분명히 나중에도 있을 법한 일이었고 이를 통해서 다들 성장할 수 있었던 과제였다고 생각합니다. 마지막까지 맡은 기능을 구현하기 위해 고군분투한 팀원들이 정말 대단하고 앞으로 끝까지 잘 수료할 수 있길 바랍니다.

- 윤창근 : 처음으로 파이어베이스라는 외부데이터를 다루면서 어려움도 있었지만, 팀원들과 활발한 소통을 통해 데이터의 흐름을 이해할 수 있어서 문제점들을 잘 해결할 수 있었습니다.
  어떤 데이터가 1차적으로 처리가 되어야 동시에 코드 작성이 가능한지, 다른 데이터들이 구축되는 동안 어떤 방법으로 작업을 진행해야 효율적으로 진행할 수 있을지에 대한 고민을 많이
  해볼 수 있었습니다.
  모든 데이터가 거쳐가고 클라이언트에게 가장 먼저 보여지는 페이지를 어떻게 구성해야할지 고민한 끝에 만족스러운 결과물을 만들게 되어 좋았습니다.
  마지막까지 각 파트간 연결시 발생하는 오류를 디버깅하고 CSS를 작성하고 UX를 개선하는 등 끝까지 같이 노력한 팀원들이 너무 고마웠습니다.
  계속해서 디벨롭해 가는 프로젝트와 같이 계속 성장하는 좋은 개발자가 되기위해서 더 노력해야겠다는 생각이 들었습니다.
- 이하민 : 이번 협업을 하면서 git flow에 대해 잘 알게되었다. 또한, 협업에서 중요한 것이 프로젝트 기획단계에서 상세하게 그리고 정확한 룰을 가지고 시작하는 것이 효율적이라는 것을 깨달았다. 데드라인을 잡고 해도 일이 밀리는 상황이 많기 때문에, 데드라인을 명확하게 잡고 최대한 지켜야 다른 팀원들의 일 진척도에도 딜레이가 안생긴다는 것을 알게되었다. 언제나 열린마음으로 피드백이 있다면 수용하고, 질문도 서로에게 적극적으로 하며 의사소통을 해야 작업 속도가 올라간다는 것을 배웠다.

- 김소이 : 이번 프로젝트를 하면서 중요한것은 실력도 중요하지만 프로젝트 기획 단계에서 상세하고 정확한 룰을 팀원들고 맞춰 시작해야하고 데드라인을 명확하게 잡고 지킬줄 알며 마지막까지 포기하지않고 맡은 기능을 구현하기 위해 최선을 다한 팀원들께 너무 감사하다는 말씀 드립니다. 또한 개인적으로 현재 많이 부족한 부분을 깨닫고 실력을 향상시키기 위해서 공부 복습과 다양한 코드를 직접 만들고 오류를 만나보면서 오늘보다 내일 더 성장해있는 개발자가 되도록 노력할 것입니다.

## Deployment

[https:/beat-bridge.store](https://www.beat-bridge.store/)

## Built With

- Icon : Icons8
- Deployment Host : Vercel (https://vercel.com/)
