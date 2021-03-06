import React from 'react'
import PageLayout from 'client/pages/PageLayout'
import EventsContainer from './EventsContainer'

function EventsPage() {
  const EventsPageInfo = {
    title: 'EVENTS',
    info: `Many events are organized throughout the semester.
      From companies' info sessions to simple workshops,
      we offer you many opportunities to become successful in your studies and your career`,
  }

  return (
    <PageLayout headerInfo={EventsPageInfo} content={<EventsContainer />} />
  )
}

export default EventsPage
