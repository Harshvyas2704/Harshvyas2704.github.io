import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import TerminalHeader from './TerminalHeader'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import TerminalTrigger from './TerminalTrigger'
import MatrixEffect from './MatrixEffect'
import { commands } from './commands'
import { allProjects } from './data'
import { FS_DIRS } from './filesystem'
import { BANNER } from './extraCommands'
import { line, makeId, runCommand } from './engine'
import type { TerminalContext, TerminalEntry } from './types'

const TITLE = 'harsh@portfolio:~'
const BOOT_STEP_MS = 90
const HIST_KEY = 'term.history'
const MAX_KEY = 'term.max'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Load persisted command history (per-browser, best-effort). */
function loadHistory(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(HIST_KEY) || '[]')
    return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []
  } catch {
    return []
  }
}

function welcomeEntries(): TerminalEntry[] {
  return [
    ...BANNER.map(l => line(l, 'info')),
    line(''),
    line('Welcome to harsh@portfolio', 'success'),
    line(''),
    line('Developer terminal initialized.'),
    line(''),
    line('Type "help" to see available commands.', 'info'),
    line(''),
    line('Try:'),
    line('  $ whoami'),
    line('  $ projects'),
    line('  $ stack'),
    line('  $ neofetch'),
    line('  $ sudo hire harsh'),
    line(''),
  ]
}

const BOOT_STEPS = [
  'Initializing terminal...',
  'Loading portfolio...',
  'Loading projects...',
  'Loading skills...',
]

/** Command + alias names available for Tab completion (visible commands only). */
const COMPLETABLE = commands
  .filter(c => !c.hidden)
  .flatMap(c => [c.name, ...(c.aliases ?? [])])

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [maximized, setMaximized] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MAX_KEY) === '1'
    } catch {
      return false
    }
  })
  const [entries, setEntries] = useState<TerminalEntry[]>([])
  const [input, setInput] = useState('')
  const [hasBooted, setHasBooted] = useState(false)
  const [booting, setBooting] = useState(false)

  // Command history (chronological). histPos === length means "editing a fresh line".
  const [cmdHistory, setCmdHistory] = useState<string[]>(loadHistory)
  const [histPos, setHistPos] = useState(() => loadHistory().length)

  // Fake filesystem cwd + matrix easter-egg overlay.
  const [cwd, setCwd] = useState('~')
  const [matrixOn, setMatrixOn] = useState(false)

  const prompt = `harsh@portfolio:${cwd}$`

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bootTimers = useRef<number[]>([])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Global toggle shortcuts:
  //  - Ctrl + `  (primary, cross-platform)
  //  - Cmd + /   (Mac-friendly alternative; Cmd + ` is reserved by macOS)
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const backtick =
        (e.ctrlKey || e.metaKey) && (e.key === '`' || e.code === 'Backquote')
      const cmdSlash = e.metaKey && e.key === '/'
      if (backtick || cmdSlash) {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const clearBootTimers = useCallback(() => {
    bootTimers.current.forEach(id => window.clearTimeout(id))
    bootTimers.current = []
  }, [])

  const finishBoot = useCallback(() => {
    clearBootTimers()
    setEntries([
      ...BOOT_STEPS.map(s => line(s, 'info')),
      line(''),
      line('Ready.', 'success'),
      line(''),
      ...welcomeEntries(),
    ])
    setBooting(false)
  }, [clearBootTimers])

  // First-open boot sequence (skippable). Instant when reduced motion is set.
  useEffect(() => {
    if (!isOpen || hasBooted) return
    setHasBooted(true)

    if (prefersReducedMotion()) {
      finishBoot()
      return
    }

    setBooting(true)
    BOOT_STEPS.forEach((step, i) => {
      const id = window.setTimeout(() => {
        setEntries(prev => [...prev, line(step, 'info')])
      }, BOOT_STEP_MS * (i + 1))
      bootTimers.current.push(id)
    })
    const doneId = window.setTimeout(() => {
      setEntries(prev => [
        ...prev,
        line(''),
        line('Ready.', 'success'),
        line(''),
        ...welcomeEntries(),
      ])
      setBooting(false)
    }, BOOT_STEP_MS * (BOOT_STEPS.length + 1))
    bootTimers.current.push(doneId)
  }, [isOpen, hasBooted, finishBoot])

  useEffect(() => () => clearBootTimers(), [clearBootTimers])

  // Focus the input whenever the terminal opens.
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => window.clearTimeout(id)
    }
  }, [isOpen])

  // Lock background page scroll while the terminal is open.
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // Blur the input while the matrix overlay is active so stray keystrokes
  // don't accumulate in the hidden field.
  useEffect(() => {
    if (matrixOn) inputRef.current?.blur()
    else if (isOpen) inputRef.current?.focus()
  }, [matrixOn, isOpen])

  // Always tear down the matrix overlay when the terminal closes.
  useEffect(() => {
    if (!isOpen) setMatrixOn(false)
  }, [isOpen])

  // Persist history + maximized state per browser (best-effort).
  useEffect(() => {
    try {
      localStorage.setItem(HIST_KEY, JSON.stringify(cmdHistory.slice(-50)))
    } catch {
      /* storage unavailable — ignore */
    }
  }, [cmdHistory])

  useEffect(() => {
    try {
      localStorage.setItem(MAX_KEY, maximized ? '1' : '0')
    } catch {
      /* storage unavailable — ignore */
    }
  }, [maximized])

  // Keep the newest output in view.
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [entries, isOpen])

  const ctx: TerminalContext = {
    clear: () => setEntries([]),
    close,
    openUrl: (url: string) => window.open(url, '_blank', 'noopener,noreferrer'),
    print: (extra: TerminalEntry[]) => setEntries(prev => [...prev, ...extra]),
    runMatrix: () => setMatrixOn(true),
    cwd,
    setDirectory: (dir: string) => {
      if (dir === '~') {
        setCwd('~')
        return true
      }
      if (FS_DIRS.includes(dir)) {
        setCwd(`~/${dir}`)
        return true
      }
      return false
    },
    navigate: (elementId: string) => {
      const el = document.getElementById(elementId)
      if (!el) return false
      close()
      window.setTimeout(
        () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        120,
      )
      return true
    },
    history: cmdHistory,
    registry: commands,
  }

  const submit = useCallback(() => {
    const raw = input
    const trimmed = raw.trim()
    setInput('')

    const echoed: TerminalEntry = {
      id: makeId(),
      kind: 'command',
      content: `${prompt} ${raw}`,
    }

    // Append to history (skip consecutive duplicates), then park the cursor
    // at the fresh line below the newest entry.
    const nextHistory =
      trimmed && cmdHistory[cmdHistory.length - 1] !== trimmed
        ? [...cmdHistory, trimmed]
        : cmdHistory
    setCmdHistory(nextHistory)
    setHistPos(nextHistory.length)

    if (!trimmed) {
      setEntries(prev => [...prev, echoed])
    } else {
      const output = runCommand(raw, commands, ctx)
      setEntries(prev => [...prev, echoed, ...output])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, cmdHistory, prompt])

  const historyPrev = () => {
    if (cmdHistory.length === 0) return
    const next = Math.max(0, histPos - 1)
    setHistPos(next)
    setInput(cmdHistory[next])
  }

  const historyNext = () => {
    if (cmdHistory.length === 0) return
    const next = Math.min(cmdHistory.length, histPos + 1)
    setHistPos(next)
    setInput(next === cmdHistory.length ? '' : cmdHistory[next])
  }

  const autocomplete = () => {
    const raw = input
    const parts = raw.trimStart().split(/\s+/)
    const hasArg = raw.trimStart().includes(' ')

    // Completing a command name.
    if (!hasArg) {
      const token = (parts[0] || '').toLowerCase()
      if (!token) return
      const matches = Array.from(new Set(COMPLETABLE.filter(n => n.startsWith(token))))
      if (matches.length === 1) setInput(matches[0] + ' ')
      else if (matches.length > 1) {
        setEntries(prev => [...prev, line(matches.join('    '), 'info')])
      }
      return
    }

    // Completing a `project <name>` argument.
    if (parts[0].toLowerCase() === 'project') {
      const argTok = (parts[1] || '').toLowerCase()
      const ids = allProjects.map(p => p.id)
      const matches = ids.filter(id => id.startsWith(argTok))
      if (matches.length === 1) setInput(`project ${matches[0]}`)
      else if (matches.length > 1) {
        setEntries(prev => [...prev, line(matches.join('    '), 'info')])
      }
    }
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // A keystroke during boot skips straight to the ready state.
    if (booting) finishBoot()

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        if (matrixOn) setMatrixOn(false)
        else close()
        break
      case 'ArrowUp':
        e.preventDefault()
        historyPrev()
        break
      case 'ArrowDown':
        e.preventDefault()
        historyNext()
        break
      case 'Tab':
        e.preventDefault()
        autocomplete()
        break
      case 'l':
      case 'L':
        if (e.ctrlKey) {
          e.preventDefault()
          setEntries([])
        }
        break
    }
  }

  if (!isOpen) {
    return <TerminalTrigger onOpen={open} />
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
    >
      {/* Backdrop */}
      <div
        className="term-backdrop absolute inset-0 bg-bg/70 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      {/* Window */}
      <div
        className={`term-window relative flex flex-col bg-surface/95 border border-royal-blue/25
                    shadow-2xl shadow-royal-blue/10 rounded-lg overflow-hidden
                    ${maximized
                      ? 'w-full h-full'
                      : 'w-full max-w-3xl h-[80vh] sm:h-[70vh] max-h-[560px]'}`}
        onClick={() => inputRef.current?.focus()}
      >
        <TerminalHeader
          title={TITLE}
          maximized={maximized}
          onClose={close}
          onToggleMax={() => setMaximized(m => !m)}
        />
        <TerminalOutput ref={scrollRef} entries={entries} />
        <TerminalInput
          ref={inputRef}
          prompt={prompt}
          value={input}
          onChange={setInput}
          onSubmit={submit}
          onKeyDown={onInputKeyDown}
        />
        {matrixOn && <MatrixEffect onStop={() => setMatrixOn(false)} />}
      </div>
    </div>
  )
}
