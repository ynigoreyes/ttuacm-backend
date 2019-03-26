import React from 'react'
import { render, getByText } from 'react-testing-library'
import { expect } from 'chai'
import moment from 'moment'
import EventsSection, { filterEvents } from './EventsSection'

// We create a mock calendar to assert upon
const CALENDAR = []

const today = moment()

for (let i = 1; i <= 15; i += 1) {
  CALENDAR.push({
    id: i,
    title: `Test Event ${(Number(i)).toString()}`,
    location: 'IMSE 119',
    startTime: today.toDate(),
    endTime: today.toDate(),
    description: 'Lorem Ipsum Text goes here',
  })

  today.add(1, 'days')
}

/**
 * Every event has a startTime that is already a JS Date object
 * We will use an ID to make these assertions very strict
 */
describe('Events Section Component', () => {
  describe('Filtering Function', () => {
    test('should be able to filter out events for `TODAY`', () => {
      const filteredEvents = filterEvents('TODAY', CALENDAR)
      expect(filteredEvents.length).to.equal(1)
    })

    test('should be able to filter out events for `TOMORROW`', () => {
      const filteredEvents = filterEvents('TOMORROW', CALENDAR)
      expect(filteredEvents.length).to.equal(1)
    })

    test('should be able to filter out events for `THIS WEEK`', () => {
      const filteredEvents = filterEvents('THIS WEEK', CALENDAR)
      expect(filteredEvents.length).to.equal(4)
    })

    test('should be able to filter out events for `THIS MONTH`', () => {
      const filteredEvents = filterEvents('THIS MONTH', CALENDAR)
      expect(filteredEvents.length).to.equal(15)
    })
  })

  describe('Component', () => {
    test('should display the only event for `TODAY`', () => {
      const { container } = render(<EventsSection time='TODAY' events={CALENDAR} />)
      getByText(container, 'TODAY', { exact: false })
      getByText(container, 'Test Event 1', { exact: false })
    })

    test('should display the only event for `TOMORROW`', () => {
      const { container } = render(<EventsSection time='TOMORROW' events={CALENDAR} />)
      getByText(container, 'TOMORROW', { exact: false })
      getByText(container, 'Test Event 2', { exact: false })
    })

    test('should display the events for `THIS WEEK`', () => {
      const { container } = render(<EventsSection time='THIS WEEK' events={CALENDAR} />)
      getByText(container, 'THIS WEEK', { exact: false })
      getByText(container, 'Test Event 1', { exact: false })
      getByText(container, 'Test Event 2', { exact: false })
      getByText(container, 'Test Event 3', { exact: false })
      getByText(container, 'Test Event 4', { exact: false })
    })

    test('should display the events for `THIS MONTH`', () => {
      const { container } = render(<EventsSection time='THIS MONTH' events={CALENDAR} />)
      getByText(container, 'THIS MONTH', { exact: false })
      for (let i = 1; i < 15; i += 1) {
        getByText(container, `Test Event ${i}`, { exact: false })
      }
    })
  })
})
