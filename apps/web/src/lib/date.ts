/**
 * Format a date to a string
 * @param input The date to format.
 * @returns The formatted date.
 */
export function formatDate(input: Date | number | string): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
