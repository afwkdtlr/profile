# 포트폴리오만 서버에 올립니다. 가족캘린더 서비스와 Caddy 설정은 바꾸지 않습니다.
# 사용: 프로젝트 루트에서  powershell -ExecutionPolicy Bypass -File .\deploy\publish.ps1

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$JavaHome = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
$Key = Join-Path $env:USERPROFILE ".ssh\oracle.key"
$Server = "root@158.247.212.82"
$Jar = Join-Path $Root "backend\build\libs\backend-0.0.1-SNAPSHOT.jar"

if (-not (Test-Path $JavaHome)) {
    throw "Java 17 경로가 없습니다. backend\gradle.properties 와 이 스크립트의 `$JavaHome 을 같은 경로로 맞추세요: $JavaHome"
}
if (-not (Test-Path $Key)) {
    throw "SSH 키가 없습니다: $Key"
}

# 이 프로세스에서만 Java 17을 사용합니다. PC의 JAVA_HOME은 바꾸지 않습니다.
$env:JAVA_HOME = $JavaHome
$env:PATH = "$JavaHome\bin;" + $env:PATH

Write-Host "1/4 프론트 빌드"
Push-Location (Join-Path $Root "frontend")
npm run build
Pop-Location

Write-Host "2/4 백엔드 jar 빌드"
Push-Location (Join-Path $Root "backend")
& .\gradlew.bat bootJar --no-daemon
Pop-Location

if (-not (Test-Path $Jar)) {
    throw "jar 파일이 없습니다: $Jar"
}

Write-Host "3/4 서버에 기존 파일 백업 후 업로드"
ssh -i $Key -o BatchMode=yes $Server "cp -a /opt/profile/backend/portfolio.jar /opt/profile/backend/portfolio.jar.bak && rm -rf /opt/profile/frontend.bak && cp -a /opt/profile/frontend /opt/profile/frontend.bak && rm -rf /opt/profile/frontend/*"
scp -i $Key -o BatchMode=yes $Jar "${Server}:/opt/profile/backend/portfolio.jar"
scp -i $Key -o BatchMode=yes -r (Join-Path $Root "frontend\dist\*") "${Server}:/opt/profile/frontend/"
ssh -i $Key -o BatchMode=yes $Server "chmod -R a+rX /opt/profile/frontend && systemctl restart portfolio.service"

Write-Host "4/4 확인"
ssh -i $Key -o BatchMode=yes $Server "for i in 1 2 3 4 5 6 7 8 9 10; do curl -fsS http://127.0.0.1:8080/api/profile >/dev/null && break; sleep 2; done; systemctl is-active portfolio family-calendar caddy; curl -fsS http://127.0.0.1:4000/api/health; echo"

Write-Host "배포 완료: https://pjs94dev.com/profile/"
