"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonalDetailsProps {
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    university: string
    nationality: string
  }
  onChange: (data: Partial<PersonalDetailsProps["data"]>) => void
  onNext: () => void
  onBack: () => void
}

export function PersonalDetails({ data, onChange, onNext, onBack }: PersonalDetailsProps) {
  const isNextDisabled = !data.firstName || !data.lastName || !data.email || !data.university || !data.nationality

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="university">University/College *</Label>
        <Input
          id="university"
          value={data.university}
          onChange={(e) => onChange({ university: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality *</Label>
        <Input
          id="nationality"
          value={data.nationality}
          onChange={(e) => onChange({ nationality: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={isNextDisabled} className="flex-1">
          Continue to Summary
        </Button>
      </div>
    </div>
  )
}
