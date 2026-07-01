# demo.tape — render with: vhs demo.tape
# Prerequisites:
#   brew install vhs ttyd ffmpeg
#   npm install -g telogen
#   git clone --depth 1 https://github.com/shadcn-ui/taxonomy /tmp/taxonomy-demo

Output demo.gif

Set FontSize 16
Set Width 1100
Set Height 600
Set Padding 24
Set Theme "Catppuccin Mocha"
Set TypingSpeed 40ms

Type "cd /tmp/taxonomy-demo" Enter
Sleep 1s

Type "ls app/" Enter
Sleep 2s

Type "telogen" Enter
Sleep 6s

Type "cat public/llms.txt" Enter
Sleep 4s

Type "cat public/pricing.md" Enter
Sleep 5s
