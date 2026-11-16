# 포트폴리오 운영 메뉴얼

이 문서는 내 PC에서 화면과 API를 고치고, 같은 Vultr 서버에 올리고, 문제가 생겼을 때 확인하는 순서입니다.

가족캘린더와 서버를 같이 씁니다. 포트폴리오만 고치고, 캘린더 파일과 서비스는 건드리지 않습니다.

## 1. 한눈에 보는 주소

| 구분 | 주소 |
|---|---|
| 운영 화면 | https://pjs94dev.com/profile/ |
| 운영 API | https://pjs94dev.com/profile/api/profile |
| 가족캘린더 | https://pjs94dev.com |
| 로컬 화면 | http://localhost:5173 |
| 로컬 API | http://localhost:8080/api/profile |
| GitHub | https://github.com/afwkdtlr/profile |
| 로컬 소스 | `C:\profile\workspace` |

예전 주소 https://pjs94dev.com/portfolio/ 는 `/profile/` 로 301 이동합니다.

브랜치는 `main` 이고, 원격 이름은 `origin` 입니다.

## 2. 개발 PC 환경

운영체제에서 이 작업을 하는 셸은 PowerShell입니다. 편집기는 Cursor입니다.

시스템 환경변수는 다른 메인 프로젝트와 공유합니다. 제어판, `setx`, 설치 프로그램으로 `JAVA_HOME` 과 Path를 바꾸지 않습니다.

| 항목 | 이 PC의 값 | 확인 명령 |
|---|---|---|
| 시스템 `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_202\bin` | `echo $env:JAVA_HOME` |
| 이 프로젝트 Java | Temurin 17.0.18, `C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot` | 아래 경로의 `java.exe -version` |
| 다른 Java 17 | `C:\Program Files\Java\jdk-17.0.0.1` | 같은 방식 |
| Node.js | 24.13.1 | `node -v` |
| npm | 11.8.0 | `npm -v` |
| Git 사용자 | 이미 PC에 설정되어 있음 | `git config --get user.name` |

시스템 `JAVA_HOME` 은 JDK 루트가 아니라 `bin` 까지 포함되어 있습니다. 그래서 그 값을 그대로 쓰면 Gradle 래퍼가 "invalid directory"로 멈춥니다. 고치지 않고, 이 프로젝트 실행 파일 안에서만 Java 17 루트를 지정합니다.

Java 17을 가리키는 곳은 세 파일입니다. JDK를 옮기면 세 곳을 같이 바꿉니다. `gradle.properties` 는 `C:/Program Files/...` 처럼 슬래시로 적습니다. 역슬래시를 쓰면 `\\` 로 이스케이프해야 합니다.

- `backend\gradle.properties` 의 `org.gradle.java.home`
- `run-backend.bat` 의 `SET "JAVA_HOME=..."`
- `deploy\publish.ps1` 의 `$JavaHome`

Gradle은 PC에 전역 설치하지 않습니다. `backend\gradlew.bat` 이 Gradle 8.10.2를 사용자 홈의 Gradle 캐시에 받아 씁니다. 첫 실행은 다운로드 때문에 시간이 걸립니다.

Node 패키지는 `frontend\node_modules` 에 있습니다. 이 폴더는 Git에 없습니다. `run-frontend.bat` 는 폴더가 없으면 `npm install` 을 먼저 실행합니다. 잠금 파일은 `frontend\package-lock.json` 입니다.

처음 받은 저장소에서 의존성만 다시 깔 때:

```powershell
cd C:\profile\workspace\frontend
npm install
```

## 3. 만든 프로그램의 버전

프론트는 JavaScript입니다. TypeScript 프로젝트로 바꾸지 않았습니다. 스타일은 Tailwind CSS이고, 별도 `tailwind.config.js` 는 없습니다. Tailwind 4는 `frontend\src\index.css` 의 `@import "tailwindcss"` 와 Vite 플러그인으로 동작합니다.

| 구분 | 버전 | 적힌 곳 |
|---|---|---|
| React, React DOM | 19.3 | `frontend\package.json` |
| Vite | 8.3 | `frontend\package.json` |
| Tailwind CSS, `@tailwindcss/vite` | 4.3 | `frontend\package.json` |
| 린트 | oxlint | `npm run lint` |
| Spring Boot | 3.2.12 | `backend\build.gradle` |
| Spring dependency management | 1.1.6 | `backend\build.gradle` |
| Java 소스 레벨 | 17 | `backend\build.gradle` |
| Gradle Wrapper | 8.10.2 | `backend\gradle\wrapper\gradle-wrapper.properties` |
| 서버 JRE | Ubuntu `openjdk-17-jre-headless` 17.0.21 | 서버의 `java -version` |

백엔드 의존성은 `spring-boot-starter-web` 하나입니다. 데이터베이스, 보안 라이브러리, 템플릿 엔진은 없습니다. 테스트는 `spring-boot-starter-test` 와 JUnit 5입니다.

글꼴은 Google Fonts의 IBM Plex Sans KR입니다. `frontend\index.html` 에서 불러옵니다. 인터넷이 없으면 브라우저 기본 글꼴로 보입니다.

## 4. 폴더 구조

```text
C:\profile\workspace
├── run-backend.bat          이 창에서만 Java 17을 잡고 bootRun
├── run-frontend.bat         npm run dev. node_modules 없으면 install
├── docs\OPERATIONS.md       이 문서
├── deploy\
│   ├── publish.ps1          평소 배포 스크립트
│   ├── Caddyfile            서버 Caddy 원본. 평소 배포는 이 파일을 올리지 않음
│   └── portfolio.service    systemd 유닛 원본
├── backend\
│   ├── build.gradle
│   ├── gradle.properties    org.gradle.java.home
│   ├── gradlew.bat
│   └── src\main\java\com\portfolio\
│       ├── PortfolioApplication.java
│       ├── config\CorsConfig.java
│       ├── controller\ProfileController.java
│       ├── dto\ProfileResponse.java
│       ├── service\ProfileService.java
│       └── resources\
│           ├── application.properties       포트 8080
│           └── application-prod.properties  127.0.0.1 만 수신
└── frontend\
    ├── vite.config.js
    ├── index.html
    └── src\
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api\profile.js
        ├── data\fallbackProfile.js
        └── components\
            Header, Hero, About, Skills, Experience, Projects, Contact, Footer
```

Git에 넣지 않는 폴더:

- `frontend\node_modules`
- `frontend\dist`
- `backend\.gradle`
- `backend\build`

서버에는 소스가 없습니다. 빌드 결과만 아래 경로에 있습니다.

| 서버 경로 | 내용 |
|---|---|
| `/opt/profile/frontend` | `npm run build` 결과. Caddy가 이 파일을 제공 |
| `/opt/profile/backend/portfolio.jar` | `bootJar` 결과. 서비스가 실행 |
| `/opt/profile/backend/portfolio.jar.bak` | 직전 jar |
| `/opt/profile/frontend.bak` | 직전 화면 파일 |
| `/etc/systemd/system/portfolio.service` | 서비스 정의 |
| `/etc/caddy/Caddyfile` | 경로 분기. 가족캘린더 규칙도 들어 있음 |
| `/opt/family-calendar` | 가족캘린더. 이 배포가 수정하지 않음 |

## 5. 요청이 오가는 방식

로컬과 운영의 주소 규칙이 다릅니다.

로컬 `vite.config.js` 는 개발 서버에서 `base` 를 `/` 로 둡니다. 브라우저가 `http://localhost:5173/api/profile` 을 호출하면 Vite가 `http://localhost:8080/api/profile` 로 넘깁니다. 포트는 5173 고정입니다. 다른 프로그램이 5173을 쓰고 있으면 Vite는 다른 포트로 피하지 않고 실패합니다.

운영 빌드만 `base` 가 `/profile/` 입니다. 빌드된 HTML의 스크립트 주소는 `/profile/assets/...` 입니다. API 호출은 `import.meta.env.BASE_URL` 때문에 `/profile/api/profile` 이 됩니다.

운영 서버의 Caddy는 이렇게 나눕니다.

1. `/profile/api/*` 에서 `/profile` 을 제거해 `127.0.0.1:8080` 으로 보냅니다. Spring은 `/api/profile` 로 받습니다.
2. `/profile` 로 시작하는 나머지 요청은 `/opt/profile/frontend` 파일을 줍니다.
3. 그 외 모든 주소는 `127.0.0.1:4000` 가족캘린더로 보냅니다.

로컬에서 화면이 API를 직접 열 수 있도록 `CorsConfig` 는 `http://localhost:5173` 만 허용합니다. 메서드는 GET과 OPTIONS입니다. 운영 화면과 API는 같은 도메인이라 브라우저 CORS 검사가 없습니다.

API가 실패하면 `frontend\src\api\profile.js` 가 `fallbackProfile.js` 를 화면에 넣습니다. 푸터 문구로 구분합니다.

- `데이터 출처: 백엔드 API` : 서버 또는 로컬 API에서 받은 값
- `데이터 출처: 프론트 내장 샘플` : API 연결 실패

## 6. API 데이터 모양

`GET /api/profile` 은 JSON 객체 하나입니다. 필드는 `ProfileResponse` 와 `fallbackProfile.js` 가 같아야 합니다.

```json
{
  "name": "이름",
  "title": "직함",
  "tagline": "한 줄 소개",
  "about": "소개 문단",
  "highlights": [{ "title": "문제 해결", "description": "설명" }],
  "skills": [{ "category": "Language", "items": ["Java"] }],
  "experiences": [{
    "company": "회사",
    "role": "역할",
    "period": "기간",
    "summary": "요약",
    "points": ["한 일"]
  }],
  "projects": [{
    "name": "프로젝트",
    "period": "2026",
    "summary": "설명",
    "stack": ["Spring Boot"],
    "link": "https://github.com"
  }],
  "contact": {
    "email": "hello@example.com",
    "github": "https://github.com",
    "blog": "https://example.com"
  }
}
```

화면 섹션은 `App.jsx` 가 이 객체를 컴포넌트에 넘깁니다. 필드를 추가하면 DTO, `ProfileService`, 폴백 JSON, 그 값을 그리는 컴포넌트를 같이 수정합니다.

| 화면 | 컴포넌트 | 읽는 필드 |
|---|---|---|
| 상단 메뉴 | `Header.jsx` | `name` |
| 첫 화면 | `Hero.jsx` | `name`, `title`, `tagline` |
| 소개 | `About.jsx` | `about`, `highlights` |
| 기술 | `Skills.jsx` | `skills` |
| 경력 | `Experience.jsx` | `experiences` |
| 프로젝트 | `Projects.jsx` | `projects` |
| 연락 | `Contact.jsx` | `contact` |
| 바닥 | `Footer.jsx` | `name`, 데이터 출처 |

운영에 반영되는 문장의 기준은 `ProfileService.java` 입니다. 폴백은 로컬에서 백엔드를 끄고 볼 때의 예비 데이터입니다.

## 7. PC에서 실행하고 수정하기

루트에서 터미널을 두 개 엽니다.

```bat
run-backend.bat
run-frontend.bat
```

백엔드 창에는 `JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot` 이 먼저 찍히고, 이어서 Spring Boot 로그가 나옵니다. `Tomcat started on port 8080` 이 보이면 API가 떠 있습니다. 이 창의 `JAVA_HOME` 은 그 터미널 세션에만 적용됩니다.

프론트 창에는 `Local: http://localhost:5173/` 이 보입니다. 브라우저에서 그 주소를 엽니다.

배치 파일 없이 직접 실행할 때:

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
cd C:\profile\workspace\backend
.\gradlew.bat bootRun
```

```powershell
cd C:\profile\workspace\frontend
npm run dev
```

자주 쓰는 명령:

| 목적 | 위치 | 명령 |
|---|---|---|
| 화면 개발 서버 | `frontend` | `npm run dev` |
| 운영용 화면 빌드 | `frontend` | `npm run build` |
| 빌드 결과만 미리보기 | `frontend` | `npm run preview` |
| 린트 | `frontend` | `npm run lint` |
| API 실행 | `backend` | `gradlew.bat bootRun` |
| 테스트 | `backend` | `gradlew.bat test` |
| 배포용 jar | `backend` | `gradlew.bat bootJar` |

테스트를 돌릴 때도 그 터미널의 `JAVA_HOME` 이 Java 17 루트여야 합니다. 테스트 클래스는 `ProfileControllerTest` 이고, `/api/profile` 의 이름, 직함, 첫 기술 분류, 이메일을 확인합니다.

끄는 방법은 각 터미널에서 Ctrl+C 입니다. 포트가 이미 사용 중이면 이전에 켜 둔 창이 아직 떠 있는 것입니다. 그 창을 끄고 다시 실행합니다.

고친 뒤 로컬에서 볼 것:

- 소개, 기술, 경력, 프로젝트, 연락 문구
- 메뉴 클릭 시 해당 섹션으로 이동
- 푸터가 `백엔드 API` 인지
- 백엔드를 끈 상태에서는 푸터가 `프론트 내장 샘플` 인지

`vite.config.js` 의 개발용 `base: '/'` 는 유지합니다. 로컬 주소를 `/profile/` 로 바꾸면 개발 서버와 프록시가 어긋납니다.

## 8. 서버 환경

| 항목 | 값 |
|---|---|
| 제공자 | Vultr, 서울 |
| IP | `158.247.212.82` |
| OS | Ubuntu 24.04 LTS |
| 사양 | 1 vCPU, 메모리 1024MB, SSD 25GB |
| 접속 계정 | `root` |
| SSH 키 | `%USERPROFILE%\.ssh\oracle.key` |
| 웹 서버 | Caddy. 80, 443 |
| 인증서 | Caddy가 `pjs94dev.com` 으로 자동 발급. 이메일 `admin@pjs94dev.com` |
| 포트폴리오 API | `127.0.0.1:8080`, 서비스 이름 `portfolio` |
| 가족캘린더 | `127.0.0.1:4000`, 서비스 이름 `family-calendar` |
| Java 힙 | 최소 64MB, 최대 256MB, Serial GC |

접속:

```powershell
ssh -i $env:USERPROFILE\.ssh\oracle.key root@158.247.212.82
```

서비스 실행 줄은 다음입니다. 원본은 `deploy\portfolio.service` 입니다.

```text
/usr/bin/java -Xms64m -Xmx256m -XX:+UseSerialGC -jar /opt/profile/backend/portfolio.jar --spring.profiles.active=prod
```

`prod` 프로파일은 `server.address=127.0.0.1` 입니다. 그래서 서버 밖에서는 8080으로 직접 접속되지 않습니다. 공개 입구는 Caddy의 `/profile/api/` 뿐입니다.

메모리가 1GB입니다. 힙을 512MB 이상으로 올리면 가족캘린더와 같이 있기 어렵습니다. 값을 바꿀 때는 로컬 `deploy\portfolio.service` 를 고친 뒤 서버의 `/etc/systemd/system/portfolio.service` 에 복사하고 `systemctl daemon-reload` 후 `systemctl restart portfolio` 합니다.

## 9. Git에 남기기

동작하는 단위로 커밋합니다.

```powershell
cd C:\profile\workspace
git status
git add .
git commit -m "변경 이유를 한 줄로"
git push
```

GitHub에 있는 소스가 PC 작업의 기준입니다. 서버에는 빌드 결과만 있으므로, 서버 파일을 고쳐서 PC로 되돌리는 흐름은 쓰지 않습니다.

## 10. 서버에 올리기

평소 배포는 이 명령 하나입니다. 프론트를 빌드하고, jar를 만들고, `/opt/profile` 만 교체한 뒤 `portfolio` 서비스만 재시작합니다. Caddy와 가족캘린더는 재시작하지 않습니다.

```powershell
cd C:\profile\workspace
powershell -ExecutionPolicy Bypass -File .\deploy\publish.ps1
```

스크립트가 하는 일:

1. 이 프로세스에서만 `JAVA_HOME` 을 Temurin 17로 지정합니다.
2. `frontend` 에서 `npm run build` 를 실행합니다.
3. `backend` 에서 `gradlew.bat bootJar --no-daemon` 을 실행합니다.
4. 서버의 현재 jar와 화면 폴더를 `.bak` 으로 복사합니다.
5. jar를 `/opt/profile/backend/portfolio.jar` 로 올립니다.
6. `frontend\dist` 내용으로 `/opt/profile/frontend` 를 바꿉니다.
7. `systemctl restart portfolio.service` 만 실행합니다.
8. 포트폴리오 API, 가족캘린더 헬스, 세 서비스의 `active` 를 확인합니다.

성공이면 마지막에 `active` 가 세 줄 나오고 캘린더 응답은 `{"ok":true}` 입니다. 브라우저에서 https://pjs94dev.com/profile/ 을 새로고침합니다. 이전 파일이 보이면 Ctrl+F5 입니다. 배포 뒤 https://pjs94dev.com 로그인 화면도 한 번 엽니다.

직접 올릴 때는 스크립트와 같은 순서입니다.

```powershell
cd C:\profile\workspace
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH

cd frontend
npm run build
cd ..\backend
.\gradlew.bat bootJar --no-daemon
```

jar 경로는 `backend\build\libs\backend-0.0.1-SNAPSHOT.jar` 입니다. 서버 파일 이름은 항상 `portfolio.jar` 입니다.

```powershell
$key = "$env:USERPROFILE\.ssh\oracle.key"
$server = "root@158.247.212.82"
scp -i $key .\backend\build\libs\backend-0.0.1-SNAPSHOT.jar "${server}:/opt/profile/backend/portfolio.jar"
scp -i $key -r .\frontend\dist\* "${server}:/opt/profile/frontend/"
ssh -i $key $server "systemctl restart portfolio.service"
```

화면 파일만 바뀌었어도 API를 재시작해도 됩니다. 재시작 동안 몇 초는 API가 폴백으로 보일 수 있습니다. `systemctl restart caddy` 와 `systemctl restart family-calendar` 는 문구 수정 배포에 쓰지 않습니다.

## 11. 경로와 도메인을 바꿀 때만

Caddy 파일을 잘못 저장하면 가족캘린더까지 멈춥니다. 화면 문구 수정에는 이 작업을 하지 않습니다.

로컬 원본은 `deploy\Caddyfile` 입니다. 서버에 반영하기 전에 검사합니다.

```powershell
scp -i $env:USERPROFILE\.ssh\oracle.key .\deploy\Caddyfile root@158.247.212.82:/tmp/Caddyfile
ssh -i $env:USERPROFILE\.ssh\oracle.key root@158.247.212.82 "caddy validate --config /tmp/Caddyfile && cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak-manual && cp /tmp/Caddyfile /etc/caddy/Caddyfile && systemctl reload caddy"
```

`Valid configuration` 이 나온 뒤에만 교체합니다. 검사가 실패하면 `/etc/caddy/Caddyfile` 을 덮어쓰지 않습니다.

운영 경로를 바꾸면 다음을 같은 경로로 맞춥니다.

- `frontend\vite.config.js` 의 빌드용 `base`
- `deploy\Caddyfile` 의 `handle` 과 `redir`
- 프론트 API 주소는 `BASE_URL` 을 쓰므로 base만 맞으면 `/profile/api/profile` 형태가 됩니다.

`handle` 한 줄에 경로를 두 개 적으면 Caddy 문법이 실패합니다. 예전 주소로 보내는 규칙은 `redir` 를 한 줄에 하나씩 적습니다.

## 12. 상태 확인

서버에서:

```bash
systemctl is-active portfolio family-calendar caddy
free -h
curl -fsS http://127.0.0.1:8080/api/profile
curl -fsS http://127.0.0.1:4000/api/health
```

셋 다 `active` 이고, 캘린더 응답이 `{"ok":true}` 이면 정상입니다.

포트폴리오 로그:

```bash
journalctl -u portfolio.service -n 80 --no-pager
journalctl -u portfolio.service -f
```

따라가는 로그는 Ctrl+C 로 끝냅니다.

PC에서 운영 주소만 볼 때:

```powershell
curl.exe -sI https://pjs94dev.com/profile/
curl.exe -s https://pjs94dev.com/profile/api/profile
curl.exe -s https://pjs94dev.com/api/health
```

## 13. 문제가 생겼을 때

화면은 나오는데 푸터가 `프론트 내장 샘플` 이면 API가 죽은 것이거나, 배포 직후 아직 기동 중입니다.

```bash
systemctl status portfolio.service --no-pager
systemctl restart portfolio.service
```

직전 jar로 되돌리기:

```bash
cp -a /opt/profile/backend/portfolio.jar.bak /opt/profile/backend/portfolio.jar
systemctl restart portfolio.service
```

화면 파일만 되돌리기:

```bash
rm -rf /opt/profile/frontend
cp -a /opt/profile/frontend.bak /opt/profile/frontend
```

화면 파일은 Caddy가 디스크에서 바로 읽습니다. Java를 재시작하지 않아도 반영됩니다.

로컬에서 `JAVA_HOME is set to an invalid directory` 가 나오면 시스템 환경변수를 고치지 말고 `run-backend.bat` 으로 실행합니다. 배치 파일 안의 경로에 `bin` 이 들어가면 안 됩니다. JDK 루트 폴더여야 합니다.

로컬에서 5173 또는 8080이 이미 사용 중이면 기존 터미널을 종료합니다.

포트폴리오만 문제가 있으면 `family-calendar` 와 `caddy` 는 재시작하지 않습니다. 캘린더 데이터는 `/opt/family-calendar` 에 있습니다.

Caddy 수정 직후 사이트 전체가 안 열리면:

```bash
cp -a /etc/caddy/Caddyfile.bak-manual /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

`free -h` 에서 available이 매우 작고 서비스가 반복 재시작되면 메모리 부족입니다. `-Xmx256m` 을 더 올리지 않습니다.

## 14. 하지 않을 것

- Windows 시스템 `JAVA_HOME` 과 Path를 바꾸지 않습니다.
- 서버에서 `/opt/family-calendar` 를 지우거나 `family-calendar.service` 를 중지하지 않습니다.
- 문구만 바꿀 때 Caddy를 재시작하지 않습니다.
- 8080을 인터넷에 열지 않습니다. `127.0.0.1` 수신을 유지합니다.
- `ProfileService.java` 만 고치고 배포하지 않으면 운영 사이트는 바뀌지 않습니다.
- 서버의 jar나 HTML을 직접 고쳐서 소스로 삼지 않습니다. 수정은 PC 소스에서 하고 `publish.ps1` 로 올립니다.
