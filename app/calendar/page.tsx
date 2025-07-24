"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, MapPin } from "lucide-react"

export default function CalendarPage() {
  const [selectedResource, setSelectedResource] = useState("all")
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const resources = [
    { id: 1, name: "Marie Dubois", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Jean Martin", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const events = [
    {
      id: 1,
      resourceId: 1,
      title: "Projet Alpha - Développement",
      start: "09:00",
      end: "12:00",
      day: 1,
      type: "project",
      location: "Bureau Paris",
    },
    {
      id: 2,
      resourceId: 1,
      title: "Réunion équipe",
      start: "14:00",
      end: "15:30",
      day: 1,
      type: "meeting",
      location: "Salle de réunion A",
    },
    {
      id: 3,
      resourceId: 2,
      title: "Formation PMP",
      start: "09:00",
      end: "17:00",
      day: 2,
      type: "training",
      location: "Centre de formation",
    },
    {
      id: 4,
      resourceId: 3,
      title: "Design System - Review",
      start: "10:00",
      end: "11:30",
      day: 3,
      type: "project",
      location: "Remote",
    },
    {
      id: 5,
      resourceId: 1,
      title: "Congés",
      start: "00:00",
      end: "23:59",
      day: 4,
      type: "leave",
      location: "",
    },
  ]

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven"]
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`)

  const getEventColor = (type) => {
    switch (type) {
      case "project":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "meeting":
        return "bg-green-100 text-green-800 border-green-200"
      case "training":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "leave":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventIcon = (type) => {
    switch (type) {
      case "project":
        return <Clock className="w-3 h-3" />
      case "meeting":
        return <Users className="w-3 h-3" />
      case "training":
        return <Calendar className="w-3 h-3" />
      case "leave":
        return <Calendar className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const filteredEvents =
    selectedResource === "all"
      ? events
      : events.filter((event) => event.resourceId === Number.parseInt(selectedResource))

  const filteredResources =
    selectedResource === "all"
      ? resources
      : resources.filter((resource) => resource.id === Number.parseInt(selectedResource))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendrier des Ressources</h1>
            <p className="text-gray-600">Visualisez la disponibilité et les affectations de vos équipes</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes les ressources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les ressources</SelectItem>
                {resources.map((resource) => (
                  <SelectItem key={resource.id} value={resource.id.toString()}>
                    {resource.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation semaine */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Semaine du 15 - 19 Janvier 2024
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  Aujourd'hui
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Calendrier principal */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* En-tête du calendrier */}
                <div className="grid grid-cols-6 border-b">
                  <div className="p-4 bg-gray-50 border-r">
                    <span className="font-medium">Ressources</span>
                  </div>
                  {weekDays.map((day, index) => (
                    <div key={day} className="p-4 bg-gray-50 border-r last:border-r-0 text-center">
                      <div className="font-medium">{day}</div>
                      <div className="text-sm text-muted-foreground">{15 + index} Jan</div>
                    </div>
                  ))}
                </div>

                {/* Lignes des ressources */}
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="grid grid-cols-6 border-b last:border-b-0">
                    {/* Colonne ressource */}
                    <div className="p-4 border-r bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={resource.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {resource.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{resource.name}</div>
                        </div>
                      </div>
                    </div>

                    {/* Colonnes des jours */}
                    {weekDays.map((_, dayIndex) => (
                      <div key={dayIndex} className="p-2 border-r last:border-r-0 min-h-[120px] relative">
                        <div className="space-y-1">
                          {filteredEvents
                            .filter((event) => event.resourceId === resource.id && event.day === dayIndex + 1)
                            .map((event) => (
                              <div key={event.id} className={`p-2 rounded text-xs border ${getEventColor(event.type)}`}>
                                <div className="flex items-center gap-1 mb-1">
                                  {getEventIcon(event.type)}
                                  <span className="font-medium truncate">{event.title}</span>
                                </div>
                                <div className="text-xs opacity-75">
                                  {event.start} - {event.end}
                                </div>
                                {event.location && (
                                  <div className="flex items-center gap-1 text-xs opacity-75 mt-1">
                                    <MapPin className="w-2 h-2" />
                                    <span className="truncate">{event.location}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Légende */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Légende</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
                <span className="text-sm">Projets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                <span className="text-sm">Réunions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200"></div>
                <span className="text-sm">Formations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
                <span className="text-sm">Congés/Absences</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
