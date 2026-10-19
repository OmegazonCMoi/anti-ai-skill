#!/usr/bin/env sh
# Usage: ./install.sh [project-dir] [--global]
# Copies the skill to <project>/.claude/skills/anti-ai-design (or the user-level Claude folder with --global).
set -eu

NAME=anti-ai-design
SRC="$(cd "$(dirname "$0")" && pwd)/skills/$NAME"
[ -f "$SRC/SKILL.md" ] || { echo "Skill source not found: $SRC" >&2; exit 1; }

GLOBAL=0
TARGET=""
for a in "$@"; do
  case "$a" in
    --global) GLOBAL=1 ;;
    *) TARGET="$a" ;;
  esac
done

case "$(uname -s)" in
  Darwin) OS=macOS ;;
  Linux) OS=Linux ;;
  MINGW*|MSYS*|CYGWIN*) OS=Windows ;;
  *) OS="$(uname -s)" ;;
esac

if [ "$GLOBAL" = 1 ]; then
  BASE="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
else
  [ -n "$TARGET" ] || TARGET="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  [ -d "$TARGET" ] || { echo "Project folder not found: $TARGET" >&2; exit 1; }
  BASE="$(cd "$TARGET" && pwd)/.claude"
fi

DEST="$BASE/skills/$NAME"
mkdir -p "$BASE/skills"
rm -rf "$DEST" # only our own skill folder, so reinstalling updates it
cp -R "$SRC" "$DEST"

echo "Detected OS: $OS"
echo "Installed $NAME -> $DEST"
echo "Restart Claude Code if it is running, then use /$NAME."
