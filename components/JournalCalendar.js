import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const JournalCalendar = () => {
  return (
    <View>
    <Calendar
      onDayPress={day => {
        console.log('selected day', day);
      }}
    />    
</View>
  )
}

export default JournalCalendar

const styles = StyleSheet.create({})