"use client"

import DayPicker from '@/app/components/DayPicker'
import Timeline from '@/app/components/Timeline'
import EventPicker from '@/app/components/EventPicker'
import { TimelineContextProvider } from '@/app/contexts/Timeline'

export default function Home() {
  return (
    <TimelineContextProvider>
      <main className="flex flex-col">
        <DayPicker />
        <EventPicker />
        <Timeline />
      </main>
    </TimelineContextProvider>
  )
}
