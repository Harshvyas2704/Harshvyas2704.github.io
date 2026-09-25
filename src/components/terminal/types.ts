import type { ReactNode } from 'react'

/** Visual/semantic category for a rendered terminal line. */
export type EntryKind =
  | 'command' // the echoed `prompt$ input` line
  | 'text' // default output
  | 'success'
  | 'error'
  | 'info'
  | 'link'
  | 'node' // arbitrary React content (rendered as-is)

export interface TerminalEntry {
  id: string
  kind: EntryKind
  /** Plain text, or a ReactNode when kind === 'node'. */
  content: ReactNode
  /** For kind === 'link'. */
  href?: string
}

/** Logical grouping used by the `help` command. */
export type CommandGroup = 'ABOUT' | 'TECH' | 'WORK' | 'CONNECT' | 'SYSTEM'

/**
 * Side-effect surface handed to command handlers so they never touch
 * React state or the DOM directly.
 */
export interface TerminalContext {
  clear: () => void
  close: () => void
  openUrl: (url: string) => void
  /** Append lines asynchronously (for staged/animated output). */
  print: (entries: TerminalEntry[]) => void
  /** Trigger the (cancellable) matrix overlay. */
  runMatrix: () => void
  /** Current working directory of the fake filesystem, e.g. '~' or '~/projects'. */
  cwd: string
  /** Change directory in the fake filesystem. Returns true if the dir exists. */
  setDirectory: (dir: string) => boolean
  /** Scroll the underlying portfolio to an element id and close the terminal. Returns true if found. */
  navigate: (elementId: string) => boolean
  /** Command history (chronological), for the `history` command. */
  history: string[]
  registry: Command[]
}

export interface Command {
  name: string
  group: CommandGroup
  description: string
  aliases?: string[]
  /** Hidden commands are excluded from `help` (easter eggs). */
  hidden?: boolean
  /**
   * Returns lines to print. Returning nothing means the command handled
   * its own output (e.g. `clear`).
   */
  handler: (args: string[], ctx: TerminalContext) => TerminalEntry[] | void
}
