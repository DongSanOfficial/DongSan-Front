# 동산(DongSan) - 나만의 산책로 생성 및 공유 웹앱 🌳

## 📝 프로젝트 소개
동산(DongSan)은 사용자들이 자신만의 산책 경로를 생성하고 공유할 수 있는 웹 애플리케이션입니다. '동네'와 '산책'의 합성어로, 일상적인 산책을 더욱 즐겁고 의미있게 만들어주는 서비스입니다.

## 👥 팀원 구성
### Frontend
| 노성원 | 이다은 | 이예림 |
|--------|--------|--------|
## 🚀 주요 기능

### 1. 산책로 생성 및 관리
- 지도 위에서 직접 산책 경로 그리기
- 산책로 거리, 소요 시간 계산
- 나만의 산책로 저장 및 관리

### 2. 산책로 공유 및 소통
- 다른 사용자들과 산책로 공유
- 산책로에 대한 리뷰 및 별점 기능
- 산책로 추천 및 즐겨찾기

## 💻 기술 스택

### Frontend
- React.js
- TypeScript
- Styled-components
- Kakao Maps API
- ...

## 📂 프로젝트 구조
```
DONGSAN/
├── src/                
│   ├── apis/           # API 통신 관련 로직
│   ├── assets/         # 이미지, 미디어 파일 등
│   ├── components/     # 재사용 가능한 공통 컴포넌트
│   ├── constants/      # 상수 값 정의
│   ├── hooks/          # 커스텀 훅
│   ├── navigator/      # 라우팅 관련 로직
│   ├── pages/          # 페이지 컴포넌트
│   ├── styles/         # 스타일 관련 파일, 전역 스타일 설정
│   ├── type_declaration/  
│   ├── types/         # 타입 정의 파일
│   ├── utils/         # 유틸리티 함수
│   ├── App.tsx        
│   └── index.tsx     
└── .env
```

## ⚙️ 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/username/dongsan.git
cd dongsan
```

2. 의존성 패키지 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
# .env 파일에 필요한 환경 변수 입력
```

4. 개발 서버 실행
```bash
npm start
```
