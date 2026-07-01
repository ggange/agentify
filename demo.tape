# demo.tape — render with: vhs demo.tape
# Prerequisites:
#   brew install vhs
#   npm install -g telogen   (so npx doesn't show download spinner)
#   git clone --depth 1 https://github.com/shadcn-ui/taxonomy /tmp/taxonomy-demo

Output demo.gif

Set Shell "bash"
Set FontSize 16
Set Width 1100
Set Height 600
Set Padding 24
Set Theme "Catppuccin Mocha"
Set TypingSpeed 60ms

# Start inside the cloned repo
Type "cd /tmp/taxonomy-demo" Enter
Sleep 500ms

# Show it's a real Next.js project
Type "ls app/" Enter
Sleep 2s

# Run telogen
Type "npx telogen" Enter
Sleep 4s

# Show the llms.txt index
Type "cat public/llms.txt" Enter
Sleep 3s

# Show one rich .md file
Type "cat public/pricing.md" Enter
Sleep 4s
