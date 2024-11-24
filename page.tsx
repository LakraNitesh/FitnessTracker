'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CalorieTracker() {
  const [intakeArray, setIntakeArray] = useState<number[]>([])
  const [burnedArray, setBurnedArray] = useState<number[]>([])
  const [intakeInput, setIntakeInput] = useState('')
  const [burnedInput, setBurnedInput] = useState('')

  const logValues = () => {
    const intakeValue = parseInt(intakeInput)
    const burnedValue = parseInt(burnedInput)

    if (!isNaN(intakeValue) && !isNaN(burnedValue)) {
      setIntakeArray([...intakeArray, intakeValue])
      setBurnedArray([...burnedArray, burnedValue])
      setIntakeInput('')
      setBurnedInput('')
    }
  }

  const calculateResults = () => {
    const totalIntake = intakeArray.reduce((total, intake) => total + intake, 0)
    const totalBurned = burnedArray.reduce((total, burned) => total + burned, 0)
    const calorieDeficit = totalIntake - totalBurned
    const fatBurned = calorieDeficit / 7700 // Calories per 1 kg of fat

    return { calorieDeficit, fatBurned }
  }

  const formatWeight = (value: number) => {
    if (Math.abs(value) < 1) {
      return `${(value * 1000).toFixed(2)} grams`
    } else {
      return `${value.toFixed(2)} kilograms`
    }
  }

  const { calorieDeficit, fatBurned } = calculateResults()

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Calorie Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="caloriesInput" className="block text-sm font-medium">
                Calories Intake:
              </label>
              <Input
                id="caloriesInput"
                type="number"
                value={intakeInput}
                onChange={(e) => setIntakeInput(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="caloriesBurnedInput" className="block text-sm font-medium">
                Calories Burned:
              </label>
              <Input
                id="caloriesBurnedInput"
                type="number"
                value={burnedInput}
                onChange={(e) => setBurnedInput(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={logValues} className="w-full">
              Log
            </Button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Weekly Results</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Intake</TableHead>
                  <TableHead>Burned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {intakeArray.map((intake, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{intake}</TableCell>
                    <TableCell>{burnedArray[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 space-y-2">
            <p>
              Calorie Deficit: <span className="font-semibold">{calorieDeficit}</span>
            </p>
            <p>
              Fat Status: <span className="font-semibold">{formatWeight(fatBurned)}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

