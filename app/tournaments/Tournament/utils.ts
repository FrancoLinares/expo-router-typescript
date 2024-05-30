export const isTournamentFinished = (endDate: string) => {
  const date = new Date(endDate)
  // Add one day
  date.setDate(date.getDate() + 1)

  // Check if date is in the past
  const now = new Date()
  return date.getTime() < now.getTime()
}
