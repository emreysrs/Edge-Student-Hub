"use client"

import { useState } from "react"
import { DayPicker, type DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { Button } from "@/components/ui/button"
import { addDays, differenceInDays } from "date-fns"

interface BookingCalendarProps {
  checkIn: Date | null
  checkOut: Date | null
  onDatesChange: (checkIn: Date | null, checkOut: Date | null) => void
  onNext: () => void
}

export function BookingCalendar({ checkIn, checkOut, onDatesChange, onNext }: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: checkIn || undefined,
    to: checkOut || undefined,
  })

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      setRange(selectedRange)
      onDatesChange(selectedRange.from || null, selectedRange.to || null)
    }
  }

  const isNextDisabled = !range?.from || !range?.to

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={{ before: new Date() }}
          numberOfMonths={2}
          className="border rounded-lg p-4"
        />
      </div>

      {range?.from && range?.to && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="text-sm font-medium mb-2">Selected Dates:</div>
          <div className="text-sm text-muted-foreground">
            Check-in: <span className="font-medium text-foreground">{range.from.toLocaleDateString()}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Check-out: <span className="font-medium text-foreground">{range.to.toLocaleDateString()}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Duration: <span className="font-medium text-foreground">{differenceInDays(range.to, range.from)} nights</span>
          </div>
        </div>
      )}

      <Button onClick={onNext} disabled={isNextDisabled} className="w-full">
        Continue to Room Selection
      </Button>
    </div>
  )
}
