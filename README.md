# 개발자 포트폴리오

프론트엔드(React + Vite)와 백엔드(Spring Boot)를 분리한 프로필 웹입니다.

로컬 수정, 서버 배포, 장애 확인은 `docs/OPERATIONS.md` 에 정리해 두었습니다. 운영 주소는 https://pjs94dev.com/profile/ 입니다.

- 프론트: `frontend` — http://localhost:5173
- 백엔드: `backend` — http://localhost:8080
- 프로필 API: `GET /api/profile`

시스템 `JAVA_HOME`은 바꾸지 않습니다. Java 17 경로는 `backend/gradle.properties`의 `org.gradle.java.home`과 루트 `run-backend.bat`에만 적습니다.

## 실행

루트에서 터미널을 두 개 열고 각각 실행합니다.

```bat
run-backend.bat
run-frontend.bat
```

직접 실행할 때:

```bat
cd backend
gradlew.bat bootRun

cd frontend
npm install
npm run dev
```

백엔드가 꺼져 있으면 화면은 `frontend/src/data/fallbackProfile.js` 샘플로 채워집니다. 푸터의 데이터 출처가 `프론트 내장 샘플`이면 API에 연결되지 않은 상태입니다.

샘플 문구를 본인 이력으로 바꿀 위치:

- API: `backend/src/main/java/com/portfolio/service/ProfileService.java`
- 화면 폴백: `frontend/src/data/fallbackProfile.js`
