# MASTER PROMPT — Interactive Developer Terminal

You are working inside my existing **Vite + React.js portfolio website**.

Your task is to add a polished, interactive **developer terminal experience** to the existing portfolio.

Do NOT rebuild the portfolio from scratch.

Do NOT replace the existing design.

Do NOT change existing sections unless absolutely necessary for terminal integration.

The terminal should feel like a natural extension of the existing portfolio and should match its visual identity.

---

# 1. PRIMARY OBJECTIVE

Add an interactive terminal that can be opened using:

**Ctrl + `**

The terminal should appear as an overlay/panel above the existing portfolio.

The terminal should behave like a lightweight real terminal while actually being a React UI.

It should allow visitors to explore information about me, my skills, projects, experience, contact information, and some fun developer-oriented Easter eggs.

The terminal is NOT a real shell.

It must never execute arbitrary operating-system commands.

All commands must be handled by the React application using a predefined command system.

---

# 2. FIRST STEP — INSPECT THE EXISTING PROJECT

Before writing code:

1. Inspect the entire project structure.
2. Understand:
   - Vite configuration
   - React version
   - TypeScript or JavaScript usage
   - Existing component structure
   - Existing styling approach
   - Existing theme/colors
   - Existing routing
   - Existing reusable components
   - Existing animation libraries
   - Existing icon libraries
   - Existing portfolio data

3. Identify the correct place to integrate the terminal.
4. Reuse existing utilities, components, styles, fonts, colors, animation libraries, and design tokens whenever possible.

Do NOT introduce a new dependency if the existing project already provides equivalent functionality.

Before making architectural changes, understand the current architecture.

---

# 3. IMPORTANT — DO NOT BREAK THE EXISTING PORTFOLIO

The existing portfolio is the primary product.

The terminal is an additional experience.

Therefore:

- Existing sections must continue working.
- Existing navigation must continue working.
- Existing responsive behavior must continue working.
- Existing animations must continue working.
- Existing theme must remain intact.
- Existing typography must remain intact.
- Existing links must remain intact.
- Existing mobile behavior must remain intact.

Do not perform unrelated refactoring.

Do not modify unrelated files.

Keep the implementation isolated and maintainable.

---

# 4. TERMINAL DESIGN

The terminal should visually feel like a modern developer terminal rather than an old Windows CMD window.

Use the existing portfolio visual language.

The portfolio currently follows a dark, technical, sharp visual identity.

The terminal should use:

- Midnight / near-black background
- Existing royal/blue accent
- Existing fire/orange accent where appropriate
- Subtle glow
- Thin borders
- Soft shadows
- Slight transparency where appropriate
- Existing portfolio font
- Monospace font for terminal content if already available
- Clean spacing
- Minimal visual noise

Do NOT introduce random colors.

Do NOT make it look like a generic hacker website.

Do NOT use excessive green text.

Do NOT use excessive Matrix-style effects.

The terminal should feel premium and intentional.

---

# 5. TERMINAL OPEN/CLOSE

Keyboard shortcut:

```text
Ctrl + `
```

Pressing it should:

- Open the terminal if closed.
- Close the terminal if open.

Important:

Ctrl + ` should not trigger browser-breaking behavior.

Handle the keyboard event carefully.

The terminal should also have:

- Close button
- Minimize button if appropriate
- Maximize/fullscreen button
- Click outside behavior only if it does not interfere with terminal usage

Do not make accidental clicks close the terminal while the user is interacting with it.

---

# 6. TERMINAL WINDOW

Use a structure similar to:

```text
┌──────────────────────────────────────────────────────┐
│ ● ● ●    harsh@portfolio:~                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Welcome to harsh@portfolio                           │
│                                                      │
│ Type "help" to see available commands.               │
│                                                      │
│ harsh@portfolio:~$ _                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The terminal should:

- Have its own scroll area.
- Preserve command history.
- Keep the input at the bottom.
- Automatically scroll to the latest output.
- Support long output.
- Work correctly on smaller screens.
- Not overflow the viewport.

---

# 7. INITIAL TERMINAL MESSAGE

When opened for the first time:

```text
Welcome to harsh@portfolio

Developer terminal initialized.

Type "help" to see available commands.

Try:

$ whoami
$ projects
$ stack
$ neofetch
$ sudo hire harsh
```

Do not make this excessively long.

---

# 8. COMMAND PROMPT

The prompt should look like:

```text
harsh@portfolio:~$
```

Example:

```text
harsh@portfolio:~$ whoami
```

Output follows.

Then a new prompt appears:

```text
harsh@portfolio:~$ _
```

The user should be able to continue entering commands.

---

# 9. COMMAND ENGINE

Create a clean command architecture.

Do NOT create one giant component containing every command.

Prefer something conceptually similar to:

```text
terminal/
├── Terminal.jsx
├── TerminalHeader.jsx
├── TerminalInput.jsx
├── TerminalOutput.jsx
├── terminalCommands.js
├── terminalUtils.js
└── terminalData.js
```

Adjust the exact structure according to the existing project's architecture.

The command engine should make it easy to add commands later.

Each command should have a clear responsibility.

For example:

```text
command
description
handler
aliases
```

Avoid hardcoding command behavior directly inside the input component.

---

# 10. CORE COMMANDS

Implement these commands.

## help

Command:

```bash
help
```

Display available commands grouped logically.

Example:

```text
COMMANDS

ABOUT
  whoami       Who I am
  about        About me
  experience   Professional experience

TECH
  skills       Technical skills
  stack        Technology stack
  focus        Current technical focus

WORK
  projects     List projects
  project      Show project details

CONNECT
  resume       Resume
  github       GitHub
  linkedin     LinkedIn
  contact      Contact information

SYSTEM
  neofetch     System information
  status       Current status
  clear        Clear terminal
  exit         Close terminal
```

Also mention that hidden Easter egg commands exist without revealing all of them.

---

# 11. whoami

Command:

```bash
whoami
```

Show a concise developer identity.

Example concept:

```text
Harsh Vyas

Software Engineer

React Native → Full Stack → Backend

I like understanding how things work,
not just how to use them.
```

Use actual portfolio/resume information from the existing project wherever available.

Do not invent professional information.

---

# 12. about

Command:

```bash
about
```

Display the existing portfolio's About information in a terminal-friendly format.

Do not duplicate information unnecessarily if existing portfolio data can be reused.

If the project has centralized profile data, reuse it.

---

# 13. skills

Command:

```bash
skills
```

Show technical skills grouped logically.

Example:

```text
FRONTEND
├── React
├── React Native
├── Next.js
└── TypeScript

BACKEND
├── Node.js
├── Express
└── Go

DATABASE
├── MongoDB
└── MySQL

TOOLS
├── Git
├── GitHub
└── ...
```

Use the actual skills already present in the portfolio.

Do not invent skills.

---

# 14. stack

Command:

```bash
stack
```

Show the technology stack in a visually appealing tree.

Example:

```text
Frontend
 ├─ React
 ├─ React Native
 └─ Next.js

Backend
 ├─ Node.js
 ├─ Express
 └─ Go

Database
 ├─ MongoDB
 └─ MySQL
```

If the existing portfolio has a different stack, use that instead.

---

# 15. focus

Command:

```bash
focus
```

Show the current learning/development focus.

Example concept:

```text
CURRENT FOCUS

01  Backend Engineering
02  Go
03  Database Architecture
04  System Design
05  Understanding systems under the hood
```

Use actual portfolio information where available.

---

# 16. experience

Command:

```bash
experience
```

Show professional experience in a terminal-friendly timeline.

Example:

```text
2024 ───────────────────────── 2026

Application Development Engineer

├── React Native
├── Android
├── iOS
└── API Integration

Current direction

├── Backend Engineering
├── Node.js
├── Go
├── Databases
└── System Design
```

Do not invent dates or responsibilities.

Use the portfolio/resume data.

---

# 17. projects

Command:

```bash
projects
```

Show available portfolio projects.

Example:

```text
01  Mokshapat
    React Native • Zustand • Reanimated

02  Resume vs JD Matcher
    Next.js • Tailwind • REST API

03  Let'sBlog
    Node.js • Express • MongoDB

04  Sasta Reddit
    Node.js • MongoDB
```

Use actual project information from the portfolio.

---

# 18. project command

Support:

```bash
project <project-name>
```

Examples:

```bash
project mokshapat
project letsblog
project sasta-reddit
```

Output should contain:

```text
PROJECT NAME

Description

TECHNOLOGIES

FEATURES

Links
```

Links should be clickable where appropriate.

Support aliases where useful.

For example:

```text
project mokshapat
project moksha
```

can resolve to the same project.

Unknown project:

```text
Project not found.

Try:

projects
```

---

# 19. resume

Command:

```bash
resume
```

Display something like:

```text
RESUME

Harsh Vyas
Software Engineer

[ Open Resume ]
[ Download Resume ]
```

Use the existing resume URL/file if one already exists.

Do not invent a resume path.

If the portfolio does not currently contain a resume, create the command structure but clearly indicate that the resume is not configured.

---

# 20. github

Command:

```bash
github
```

Open the existing GitHub profile in a new browser tab.

Use the actual GitHub URL from the portfolio.

Do not invent URLs.

---

# 21. linkedin

Command:

```bash
linkedin
```

Open the existing LinkedIn profile in a new browser tab.

Use the actual LinkedIn URL from the portfolio.

---

# 22. contact

Command:

```bash
contact
```

Show available contact information.

Example:

```text
CONTACT

Email
...

GitHub
...

LinkedIn
...

Location
India
```

Use only information actually available in the portfolio.

---

# 23. neofetch

Command:

```bash
neofetch
```

Create a portfolio-specific developer system information display.

Example:

```text
        HARSH VYAS

OS:          Developer
Shell:       zsh
Editor:      VS Code
Frontend:    React
Mobile:      React Native
Backend:     Node.js / Go
Database:    MongoDB / MySQL
Experience:  2+ years
Focus:       Backend Engineering
Status:      Building
```

Important:

Do not present fictional operating-system information as factual personal data.

This is a stylized portfolio command.

Use actual technical information from the portfolio where possible.

---

# 24. status

Command:

```bash
status
```

Create a compact system-style display.

Example:

```text
PORTFOLIO STATUS

Portfolio      ONLINE
Learning       ACTIVE
Building       ACTIVE
Curiosity      HIGH
Coffee         REQUIRED
```

The humorous values are intentionally fictional UI elements.

---

# 25. clear

Command:

```bash
clear
```

Remove terminal output while keeping the terminal open.

Keyboard shortcut:

```text
Ctrl + L
```

should also clear the terminal if appropriate.

---

# 26. exit

Command:

```bash
exit
```

Close the terminal.

---

# 27. COMMAND HISTORY

Implement command history.

Arrow Up:

```text
↑
```

loads previous command.

Arrow Down:

```text
↓
```

moves toward newer commands.

Example:

```text
$ whoami
$ projects
$ stack
```

Pressing Up should cycle through:

```text
stack
projects
whoami
```

Do not duplicate the same command unnecessarily in history.

---

# 28. TAB AUTOCOMPLETE

Implement terminal-style autocomplete.

Example:

User types:

```text
pro
```

and presses:

```text
Tab
```

Possible completion:

```text
projects
project
```

If there is only one match, complete it automatically.

If there are multiple matches, display suggestions.

Example:

```text
projects    project
```

---

# 29. UNKNOWN COMMANDS

For:

```bash
foobar
```

display:

```text
Command not found: foobar

Type "help" to see available commands.
```

Do not throw a React error.

Do not break the terminal.

---

# 30. COMMAND ARGUMENTS

The command parser should support:

```text
project mokshapat
```

rather than only exact command matches.

Architecture should support future commands with arguments.

Example:

```text
project <name>
open <section>
search <query>
```

Do not over-engineer this.

Keep the parser simple and maintainable.

---

# 31. EASTER EGGS

Add several hidden commands.

These should NOT appear in normal `help` output.

## sudo

Command:

```bash
sudo
```

Response:

```text
Nice try.

You don't have sudo privileges here.
```

---

## sudo hire harsh

Command:

```bash
sudo hire harsh
```

Create a playful interaction.

Example:

```text
Checking permissions...

User: recruiter
Request: hire harsh

████████████████████ 100%

Additional information required.

Try:
projects
experience
resume
```

Do not make claims about employment, qualifications, or hiring outcomes.

This is purely an interactive joke.

---

## coffee

Command:

```bash
coffee
```

Example:

```text
Brewing coffee...

████████████████████ 100%

Developer mode activated.
```

---

## 42

Command:

```bash
42
```

Response:

```text
The answer is correct.

Unfortunately,
the question is still missing.
```

---

## matrix

Command:

```bash
matrix
```

Trigger a subtle visual effect.

Do NOT make it consume the entire page indefinitely.

The effect should be cancellable.

---

# 32. Hidden command discovery

The terminal can occasionally hint:

```text
There may be commands that aren't listed in help.
```

Do not reveal every Easter egg.

---

# 33. Fake filesystem

If practical, support:

```bash
ls
```

Display:

```text
about/
projects/
experience/
skills/
contact/
resume.pdf
README.md
```

Also support:

```bash
pwd
```

Response:

```text
/home/harsh
```

This is fictional terminal UI state, not the user's real computer filesystem.

Support:

```bash
cd projects
```

and update the prompt:

```text
harsh@portfolio:~/projects$
```

However, only implement filesystem behavior if it can be done cleanly.

Do not over-engineer this feature.

---

# 34. cat command

If implementing the fake filesystem, support:

```bash
cat README.md
```

and display a portfolio README.

Example:

```text
# Harsh Vyas

Software Engineer

I build software,
learn how systems work,
and enjoy solving difficult problems.

See:

projects
skills
experience
contact
```

Also support project-related fictional files if useful.

---

# 35. VISUAL ANIMATIONS

Use subtle animations.

Recommended:

- Terminal open/close animation
- Cursor blink
- Command output fade/typing where appropriate
- Small terminal glow
- Button hover effects
- Autocomplete animation
- Matrix Easter egg animation

Do NOT animate every line of text.

Do NOT make normal navigation slow.

Typing animation should not block user interaction.

The user should be able to type immediately.

---

# 36. CURSOR

Display a terminal cursor.

Example:

```text
harsh@portfolio:~$ _
```

Use a blinking cursor.

If using a real input element, make the input itself accessible rather than creating a fake inaccessible cursor.

---

# 37. INPUT BEHAVIOR

The terminal must support:

- Keyboard input
- Enter
- Backspace
- Arrow Up
- Arrow Down
- Tab autocomplete
- Ctrl + L
- Escape where appropriate
- Ctrl + ` to close/open

Do not interfere with normal keyboard shortcuts outside the terminal.

When terminal is closed, normal site keyboard behavior should remain unchanged.

---

# 38. RESPONSIVE DESIGN

Desktop:

Terminal can appear centered with a large width.

Tablet:

Reduce width and height appropriately.

Mobile:

Use almost full-screen terminal.

On mobile, there is no reliable Ctrl + ` shortcut.

Provide a visible terminal button in the UI.

For example:

```text
>_
```

or a terminal icon.

The mobile terminal must still be fully usable.

---

# 39. ACCESSIBILITY

The terminal must be accessible.

Implement:

- Proper buttons
- Keyboard focus
- Visible focus states
- `aria-label` where needed
- Dialog semantics if appropriate
- Proper contrast
- Screen-reader-friendly command output where practical

Do not sacrifice accessibility for terminal aesthetics.

---

# 40. PERFORMANCE

Keep the terminal lightweight.

Avoid:

- unnecessary global state
- excessive re-renders
- large animation libraries
- continuous animation loops
- unnecessary dependencies

If the project already uses Zustand or another state library, only use it if it genuinely makes sense.

Do not introduce state management just for the terminal.

Local React state is sufficient unless the existing architecture suggests otherwise.

---

# 41. DATA ARCHITECTURE

Separate portfolio data from terminal presentation.

For example:

```text
terminalData
    ↓
command handlers
    ↓
terminal output
```

Do not duplicate project descriptions, skills, experience, links, etc. if the portfolio already stores this information elsewhere.

Prefer reusing existing portfolio data.

The terminal should automatically reflect changes to the underlying portfolio data where practical.

---

# 42. SECURITY

The terminal is purely simulated.

NEVER execute:

- shell commands
- JavaScript entered by users
- eval()
- Function()
- arbitrary code
- filesystem commands
- network commands

User input must only be interpreted by the predefined command parser.

Do not use:

```javascript
eval(...)
```

or similar dynamic execution.

---

# 43. TERMINAL STATE

Maintain:

```text
isOpen
history
currentInput
commandHistory
historyIndex
currentDirectory
```

Only maintain state that is actually necessary.

When terminal closes, decide whether command history should persist based on the existing UX.

Prefer preserving terminal history during the current page session.

---

# 44. TERMINAL OUTPUT MODEL

Use structured output rather than putting everything into one giant HTML string.

Conceptually:

```text
TerminalEntry

type:
- command
- text
- success
- error
- info
- component
- link
```

This allows different visual treatment.

For example:

```text
command
text
error
link
```

can each have their own rendering behavior.

---

# 45. LINKS

When output contains links:

- Make them keyboard accessible.
- Open external links safely.
- Use `target="_blank"` when appropriate.
- Use `rel="noopener noreferrer"` for external links.

---

# 46. ERROR HANDLING

If a command handler throws an error:

Do not crash the terminal.

Show:

```text
An unexpected error occurred.

Try:
help
```

Log useful debugging information only in development if appropriate.

---

# 47. TERMINAL HEADER

Use a polished header:

```text
● ● ●    harsh@portfolio:~
```

The circles can behave like:

- Red = close
- Yellow = minimize
- Green = maximize

But they do NOT need to imitate macOS perfectly.

Use the existing portfolio styling.

---

# 48. TERMINAL OPEN BUTTON

Add a subtle way to discover the terminal.

Possible UI:

```text
>_ Terminal
```

or:

```text
[ Ctrl + ` ]
```

Place it somewhere that doesn't compete with the primary portfolio CTA.

On desktop, keyboard shortcut is the primary interaction.

On mobile, visible button is primary.

---

# 49. FIRST-OPEN EXPERIENCE

When the terminal is opened for the first time:

Use a short initialization effect.

Example:

```text
Initializing terminal...
Loading portfolio...
Loading projects...
Loading skills...

Ready.

Type "help" to continue.
```

Do not make users wait several seconds.

Keep it under approximately 500–800ms.

Allow skipping if the user starts typing.

---

# 50. DESIGN PRINCIPLE

The terminal should communicate:

```text
This person is a developer.
This portfolio was intentionally engineered.
There is more to discover here.
```

It should NOT communicate:

```text
I added a fake terminal because developer portfolios have terminals.
```

Every feature should have a purpose.

---

# 51. DO NOT OVERDO THE TERMINAL

Avoid:

- fake hacking screens
- excessive green text
- random binary
- fake cybersecurity warnings
- skull graphics
- excessive glitch effects
- loud sound effects
- forced typing animations
- annoying popups
- auto-opening terminal
- terminal taking over the page unexpectedly

The experience should remain professional.

---

# 52. EXISTING PORTFOLIO DATA

Before implementing commands, identify where the following information currently exists:

```text
Name
Role
Bio
Skills
Experience
Projects
Education
Resume
GitHub
LinkedIn
Email
Other social links
Current focus
```

Reuse that data.

If something does not exist:

Do not invent it.

Either omit it or create a clearly marked placeholder that I can fill later.

---

# 53. PROFILE INJECTION

If the existing portfolio has a profile/resume data section, integrate the terminal with it.

The architecture should allow me to update my profile in one place and have both:

```text
Portfolio UI
Terminal UI
```

reflect the same information.

---

# 54. COMMAND ALIASES

Add useful aliases.

Example:

```text
h       → help
?       → help
me      → whoami
p       → projects
cls     → clear
quit    → exit
```

Do not add unnecessary aliases.

---

# 55. COMMAND CASE HANDLING

Commands should be case-insensitive.

For example:

```text
HELP
Help
help
```

should all work.

Project names can also be normalized where appropriate.

---

# 56. COMMAND OUTPUT STYLE

Keep terminal output concise.

Do not dump huge walls of text.

Use:

```text
headers
trees
tables
short paragraphs
links
```

where appropriate.

Terminal content should be easy to scan.

---

# 57. NO BACKEND REQUIRED

The terminal should work entirely on the frontend.

No API should be required for terminal functionality unless the existing portfolio already has an API that contains relevant data.

The portfolio must still work if offline after the app has loaded.

---

# 58. IMPLEMENTATION PROCESS

Work in phases.

## PHASE 1 — AUDIT

Inspect the existing project.

Report:

```text
Current architecture
Relevant files
Styling system
Existing data sources
Existing dependencies
Recommended integration point
Potential conflicts
```

Do not modify files yet.

Wait for my confirmation.

---

## PHASE 2 — ARCHITECTURE

After approval:

Design the terminal architecture.

Show:

```text
Component structure
Data structure
Command structure
State management
Keyboard handling
Integration points
```

Wait for my confirmation.

---

## PHASE 3 — CORE TERMINAL

Implement:

```text
Terminal window
Open/close
Ctrl + `
Prompt
Input
Output
help
clear
exit
unknown command handling
```

Test it.

Wait for my confirmation.

---

## PHASE 4 — PORTFOLIO COMMANDS

Implement:

```text
whoami
about
skills
stack
focus
experience
projects
project
resume
github
linkedin
contact
```

Use existing portfolio data.

Test every command.

Wait for my confirmation.

---

## PHASE 5 — TERMINAL UX

Implement:

```text
history
arrow navigation
autocomplete
Ctrl + L
responsive behavior
mobile trigger
animations
accessibility
```

Test keyboard interactions carefully.

Wait for my confirmation.

---

## PHASE 6 — EASTER EGGS

Implement:

```text
sudo
sudo hire harsh
coffee
42
matrix
```

Optionally implement:

```text
ls
pwd
cd
cat
```

if the fake filesystem can be implemented cleanly.

Wait for my confirmation.

---

## PHASE 7 — POLISH

Perform a final pass for:

- Visual consistency
- Responsive behavior
- Accessibility
- Performance
- Keyboard behavior
- Code quality
- Error handling
- Unnecessary dependencies
- Unnecessary duplication

Do not redesign unrelated parts of the portfolio.

---

# 59. TESTING CHECKLIST

Before considering the implementation complete, verify:

### Opening

```text
Ctrl + `
```

opens the terminal.

### Closing

```text
Ctrl + `
```

closes it.

### Commands

```text
help
whoami
about
skills
stack
focus
experience
projects
project <name>
resume
github
linkedin
contact
neofetch
status
clear
exit
```

all work.

### Input

```text
Enter
Backspace
Arrow Up
Arrow Down
Tab
Ctrl + L
Escape
```

work correctly.

### Errors

Unknown commands don't crash the app.

Invalid project names don't crash the app.

### Responsive

Desktop works.

Tablet works.

Mobile works.

### Accessibility

Keyboard-only interaction works.

Focus behavior works.

### Performance

No unnecessary re-render loops.

No runaway animations.

No memory leaks.

---

# 60. CODE QUALITY RULES

Follow the existing project's conventions.

Prefer:

- Small components
- Clear naming
- Reusable utilities
- Data-driven commands
- Minimal dependencies
- Clean state management
- Separation of concerns

Avoid:

- Giant components
- Giant switch statements
- Duplicate portfolio data
- Inline hacks
- `eval`
- arbitrary HTML injection
- unnecessary global state
- unrelated refactoring

---

# 61. FINAL RESULT

The finished portfolio should have two experiences.

## Normal portfolio

The polished visual portfolio.

## Developer terminal

A hidden interactive layer accessible through:

```text
Ctrl + `
```

where visitors can explore:

```text
whoami
about
skills
stack
experience
projects
resume
contact
neofetch
status
```

and discover hidden interactions such as:

```text
sudo
coffee
42
matrix
```

The terminal should feel like something the developer intentionally built, not a template feature.

---

# 62. MOST IMPORTANT RULE

Do not blindly implement everything in this prompt.

First inspect the existing codebase.

If an existing implementation conflicts with this prompt, preserve the existing application's architecture and adapt the terminal accordingly.

Do not overwrite working functionality just to follow an example structure.

Use judgment.

The final result should feel like:

**A premium developer portfolio with an interactive command-line interface hidden inside it.**

Start with **PHASE 1 — AUDIT ONLY**.

Do not modify any files until I approve the audit.
