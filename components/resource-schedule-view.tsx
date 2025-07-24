"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Users, Plane, Coffee, ChevronLeft, ChevronRight } from "lucide-react"

interface ResourceScheduleViewProps {
  isOpen: boolean
  onClose: () => void
  resourceName: string
  schedule?: any
}

export function ResourceScheduleView({ isOpen, onClose, resourceName, schedule }: ResourceScheduleViewProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  // Mock schedule data if none provided
  const mockSchedule = {
    workingHours: {
      monday: { start: "09:00", end: "17:00", active: true },
      tuesday: { start: "09:00", end: "17:00", active: true },
      wednesday: { start: "09:00", end: "17:00", active: true },
      thursday: { start: "09:00", end: "17:00", active: true },
      friday: { start: "09:00", end: "17:00", active: true },
      saturday: { start: "", end: "", active: false },
      sunday: { start: "", end: "", active: false },
    },
    absences: [
      {
        id: 1,
        type: "vacation",
        title: "Congés d'été",
        startDate: "2024-07-15",
        endDate: "2024-07-30",
        description: "Vacances familiales",
      },
      {
        id: 2,
        type: "training",
        title: "Formation React Advanced",
        startDate: "2024-03-10",
        endDate: "2024-03-12",
        description: "Formation technique",
      },
    ],
    projects: [
      {
        id: 1,
        name: "Projet Alpha",
        allocation: 60,
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        color: "bg-blue-100 text-blue-800",
      },
      {
        id: 2,
        name: "Maintenance",
        allocation: 40,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        color: "bg-green-100 text-green-800",
      },
    ],
  }

  const currentSchedule = schedule || mockSchedule

  const daysOfWeek = [
    { key: "monday", label: "Lundi", short: "Lun" },
    { key: "tuesday", label: "Mardi", short: "Mar" },
    { key: "wednesday", label: "Mercredi", short: "Mer" },
    { key: "thursday", label: "Jeudi", short: "Jeu" },
    { key: "friday", label: "Vendredi", short: "Ven" },
    { key: "saturday", label: "Samedi", short: "Sam" },
    { key: "sunday", label: "Dimanche", short: "Dim" },
  ]

  const absenceTypes = {
    vacation: { label: "Congés", icon: Plane, color: "bg-blue-100 text-blue-800" },
    sick: { label: "Maladie", icon: Coffee, color: "bg-red-100 text-red-800" },
    training: { label: "Formation", icon: Users, color: "bg-purple-100 text-purple-800" },
    other: { label: "Autre", icon: Clock, color: "bg-gray-100 text-gray-800" },
  }

  const getWeekDates = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek)
      currentDate.setDate(startOfWeek.getDate() + i)
      week.push(currentDate)
    }
    return week
  }

  const weekDates = getWeekDates(currentWeek)

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  const isDateInRange = (date: Date, startDate: string, endDate: string) => {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const start = new Date(startDate)
    const end = new Date(endDate)
    return checkDate >= start && checkDate <= end
  }

  const getAbsenceForDate = (date: Date) => {
    return currentSchedule.absences?.find((absence) => isDateInRange(date, absence.startDate, absence.endDate))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Planning - {resourceName}
          </DialogTitle>
          <DialogDescription>Vue d'ensemble de la disponibilité et des affectations</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="working-hours">Horaires</TabsTrigger>
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Semaine du {weekDates[0].toLocaleDateString("fr-FR")} au {weekDates[6].toLocaleDateString("fr-FR")}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
                      Aujourd'hui
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, index) => {
                    const dayKey = daysOfWeek[index].key
                    const workingDay = currentSchedule.workingHours[dayKey]
                    const absence = getAbsenceForDate(date)
                    const isToday = date.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg min-h-[120px] ${
                          isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                      >
                        <div className="text-center mb-2">
                          <div className="font-medium text-sm">{daysOfWeek[index].short}</div>
                          <div className="text-lg font-bold">{date.getDate()}</div>
                        </div>

                        {workingDay?.active ? (
                          <div className="space-y-1">
                            <div className="text-xs text-center bg-green-100 text-green-800 rounded px-1 py-0.5">
                              {workingDay.start} - {workingDay.end}
                            </div>
                            {absence && (
                              <div
                                className={`text-xs text-center rounded px-1 py-0.5 ${
                                  absenceTypes[absence.type]?.color
                                }`}
                              >
                                {absence.title}
                              </div>
                            )}
                            {currentSchedule.projects?.map((project) => (
                              <div
                                key={project.id}
                                className={`text-xs text-center rounded px-1 py-0.5 ${project.color}`}
                              >
                                {project.name} ({project.allocation}%)
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-center text-gray-400">Non travaillé</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="working-hours" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horaires de Travail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daysOfWeek.map((day) => {
                    const workingDay = currentSchedule.workingHours[day.key]
                    return (
                      <div key={day.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="font-medium">{day.label}</div>
                        {workingDay?.active ? (
                          <Badge variant="secondary">
                            {workingDay.start} - {workingDay.end}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Non travaillé</Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="absences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Absences Planifiées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSchedule.absences?.length > 0 ? (
                    currentSchedule.absences.map((absence) => {
                      const typeInfo = absenceTypes[absence.type] || absenceTypes.other
                      return (
                        <div key={absence.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Badge className={typeInfo.color}>
                            <typeInfo.icon className="w-3 h-3 mr-1" />
                            {typeInfo.label}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">{absence.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(absence.startDate).toLocaleDateString("fr-FR")} -{" "}
                              {new Date(absence.endDate).toLocaleDateString("fr-FR")}
                            </div>
                            {absence.description && (
                              <div className="text-xs text-muted-foreground">{absence.description}</div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Plane className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Aucune absence planifiée</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Affectations de Projets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSchedule.projects?.length > 0 ? (
                    <>
                      {currentSchedule.projects.map((project) => (
                        <div key={project.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Badge className={project.color}>{project.allocation}%</Badge>
                          <div className="flex-1">
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(project.startDate).toLocaleDateString("fr-FR")} -{" "}
                              {new Date(project.endDate).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Allocation totale:</span>
                          <Badge
                            variant={
                              currentSchedule.projects.reduce((sum, p) => sum + p.allocation, 0) > 100
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {currentSchedule.projects.reduce((sum, p) => sum + p.allocation, 0)}%
                          </Badge>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Aucun projet assigné</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
