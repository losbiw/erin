export interface LinuxCommands {
  set: string,
  align?: string
}

export interface Distros {
  other: LinuxCommands,
  kde: LinuxCommands,
  xfce: LinuxCommands
}
