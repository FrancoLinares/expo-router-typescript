import { Styled } from 'app/styled'
import React from 'react'
import { CalendarIcon } from '../Icons'
import { Calendar } from '@ui-kitten/components'

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
