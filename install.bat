@echo off
rem Usage: install.bat [project-dir] [--global]
rem Copies the skill to <project>\.claude\skills\anti-ai-design (or %USERPROFILE%\.claude with --global).
setlocal
set "NAME=anti-ai-design"
set "SRC=%~dp0skills\%NAME%"
if not exist "%SRC%\SKILL.md" (echo Skill source not found: %SRC% 1>&2 & exit /b 1)

set "GLOBAL=0"
set "TARGET="
for %%A in (%*) do (
  if /I "%%~A"=="--global" (set "GLOBAL=1") else (set "TARGET=%%~A")
)

if "%GLOBAL%"=="1" (
  if defined CLAUDE_CONFIG_DIR (set "BASE=%CLAUDE_CONFIG_DIR%") else (set "BASE=%USERPROFILE%\.claude")
) else (
  if not defined TARGET (
    for /f "delims=" %%G in ('git rev-parse --show-toplevel 2^>nul') do set "TARGET=%%G"
  )
  if not defined TARGET set "TARGET=%CD%"
  if not exist "%TARGET%\" (echo Project folder not found: %TARGET% 1>&2 & exit /b 1)
  set "BASE=%TARGET%\.claude"
)

set "DEST=%BASE%\skills\%NAME%"
if exist "%DEST%" rmdir /S /Q "%DEST%"
xcopy "%SRC%" "%DEST%\" /E /I /Q /Y >nul || (echo Copy failed 1>&2 & exit /b 1)

echo Detected OS: Windows
echo Installed %NAME% -^> %DEST%
echo Restart Claude Code if it is running, then use /%NAME%.
