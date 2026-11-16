@echo off
setlocal
cd /d "%~dp0frontend"

if not exist node_modules (
  echo node_modules 가 없어 npm install 을 먼저 실행합니다.
  call npm install
  if errorlevel 1 (
    echo npm install 에 실패했습니다.
    exit /b 1
  )
)

call npm run dev
endlocal
