export const supabaseFormatDate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}+00`

export const formatDate = (date: Date) => {
  const options = { timeZone: 'America/Argentina/Buenos_Aires' }
  const artTime = date.toLocaleString('en-US', options).split(',')
  const artTimeSplitted = artTime[0].split('/')

  return `${artTimeSplitted[2]}-${artTimeSplitted[0]}-${artTimeSplitted[1]}`
}
