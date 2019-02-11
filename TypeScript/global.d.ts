// declare namespace Tool {
  interface Moment {
    format(timestamp?: number): string
  }

  interface Browser {
    query(name: string): string
  }
// }