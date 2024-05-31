import React from 'react'
import { Calendar } from '@ui-kitten/components'
import { CalendarIcon } from '../Icons'
import { Styled } from '../styled'

type Props = {
  date: Date
  setDate: (date: Date) => void
  showCalendar: boolean
  setShowCalendar: (showCalendar: boolean) => void
}

const HomeCalendar = ({ setShowCalendar, date, setDate, showCalendar }: Props) => {
  return (
    <>
      <Styled.Button onPress={() => setShowCalendar(!showCalendar)} accessoryLeft={CalendarIcon} />
      {showCalendar && (
        <Calendar
          date={date}
          onSelect={(nextDate: Date) => {
            setShowCalendar(!showCalendar)
            setDate(nextDate)
          }}
        />
      )}
    </>
  )
}

export default HomeCalendar
