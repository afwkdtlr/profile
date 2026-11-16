@echo off
setlocal
REM 이 창에서만 JAVA_HOME을 지정합니다. 시스템 환경변수는 바꾸지 않습니다.
REM Java 17 경로가 다르면 아래 한 줄과 backend\gradle.properties 를 함께 수정하세요.
SET "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
SET "PATH=%JAVA_HOME%\bin;%PATH%"

cd /d "%~dp0backend"
echo JAVA_HOME=%JAVA_HOME%
call gradlew.bat bootRun
endlocal
