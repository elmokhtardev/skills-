"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Briefcase, Award, Calendar, Download, Edit, Star, Clock, Users } from "lucide-react"
import { ResourceScheduleView } from "@/components/resource-schedule-view"
import { useState } from "react"

export default function ProfileDetail({ params }: { params: { id: string } }) {
  // Mock data - en production, ceci viendrait d'une API
  const profile = {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@company.com",
    phone: "+33 1 23 45 67 89",
    department: "IT",
    position: "Développeur Full-Stack",
    location: "Paris",
    avatar: "/placeholder.svg?height=120&width=120",
    joinDate: "15 Mars 2022",
    skills: [
      {
        name: "React",
        level: 8,
        certified: true,
        certificationDate: "2023-06-15",
        certificationFile: "react-cert.pdf",
      },
      { name: "Node.js", level: 7, certified: false },
      { name: "TypeScript", level: 6, certified: false },
      {
        name: "Python",
        level: 7,
        certified: true,
        certificationDate: "2023-01-20",
        certificationFile: "python-cert.pdf",
      },
      { name: "Docker", level: 5, certified: false },
      { name: "AWS", level: 6, certified: true, certificationDate: "2023-09-10", certificationFile: "aws-cert.pdf" },
    ],
    projects: [
      {
        name: "Projet Alpha",
        role: "Lead Developer",
        status: "En cours",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        description: "Développement d'une application web moderne avec React et Node.js",
      },
      {
        name: "Refonte Site Web",
        role: "Frontend Developer",
        status: "En cours",
        startDate: "2023-11-15",
        endDate: "2024-03-15",
        description: "Refonte complète du site web corporate avec les dernières technologies",
      },
      {
        name: "API Backend",
        role: "Backend Developer",
        status: "Terminé",
        startDate: "2023-06-01",
        endDate: "2023-10-31",
        description: "Développement d'une API REST robuste et scalable",
      },
    ],
    availability: "Disponible",
    calendar: [
      { date: "2024-01-15", type: "project", title: "Projet Alpha - Dev", time: "09:00-12:00" },
      { date: "2024-01-15", type: "meeting", title: "Réunion équipe", time: "14:00-15:30" },
      { date: "2024-01-16", type: "project", title: "Refonte Site Web", time: "09:00-17:00" },
      { date: "2024-01-17", type: "training", title: "Formation AWS", time: "10:00-16:00" },
      { date: "2024-01-18", type: "leave", title: "Congé", time: "Toute la journée" },
    ],
    schedule: [
      { start: "2024-01-22T09:00:00", end: "2024-01-22T12:00:00", title: "Projet Alpha - Dev" },
      { start: "2024-01-22T14:00:00", end: "2024-01-22T15:30:00", title: "Réunion équipe" },
      { start: "2024-01-23T09:00:00", end: "2024-01-23T17:00:00", title: "Refonte Site Web" },
      { start: "2024-01-24T10:00:00", end: "2024-01-24T16:00:00", title: "Formation AWS" },
      { start: "2024-01-25T00:00:00", end: "2024-01-25T23:59:59", title: "Congé" },
    ],
  }

  const [isScheduleViewOpen, setIsScheduleViewOpen] = useState(false)

  const getLevelLabel = (level) => {
    switch (level) {
      case 1:
        return "Débutant"
      case 2:
        return "Débutant +"
      case 3:
        return "Junior"
      case 4:
        return "Junior +"
      case 5:
        return "Confirmé"
      case 6:
        return "Confirmé +"
      case 7:
        return "Senior"
      case 8:
        return "Senior +"
      case 9:
        return "Expert"
      case 10:
        return "Lead"
      default:
        return "Débutant"
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-gray-100 text-gray-800"
      case 2:
        return "bg-blue-100 text-blue-800"
      case 3:
        return "bg-green-100 text-green-800"
      case 4:
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case "project":
        return "bg-blue-100 text-blue-800"
      case "meeting":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-purple-100 text-purple-800"
      case "leave":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* En-tête du profil */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  <p className="text-xl text-gray-600 mb-3">{profile.position}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {profile.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Depuis le {profile.joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    profile.availability === "Disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }
                >
                  {profile.availability}
                </Badge>
                <Button variant="outline" onClick={() => setIsScheduleViewOpen(true)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Planning
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations de contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Compétences totales</span>
                <span className="font-medium">{profile.skills.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Certifications</span>
                <span className="font-medium">{profile.skills.filter((s) => s.certified).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Projets actifs</span>
                <span className="font-medium">{profile.projects.filter((p) => p.status === "En cours").length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Niveau Moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Compétences</span>
                  <span className="font-medium">
                    {(profile.skills.reduce((sum, skill) => sum + skill.level, 0) / profile.skills.length).toFixed(1)}
                    /10
                  </span>
                </div>
                <Progress
                  value={(profile.skills.reduce((sum, skill) => sum + skill.level, 0) / profile.skills.length) * 10}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets détaillés */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Matrice des Compétences</CardTitle>
                <CardDescription>Détail des compétences et certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <Badge className={getLevelColor(skill.level)}>{getLevelLabel(skill.level)}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={skill.level * 10} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Niveau {skill.level}/10</span>
                          {skill.certified && (
                            <div className="flex items-center gap-1 text-green-600">
                              <Award className="w-3 h-3" />
                              <span>Certifié</span>
                            </div>
                          )}
                        </div>
                        {skill.certified && skill.certificationDate && (
                          <div className="text-xs text-muted-foreground">
                            Certifié le {new Date(skill.certificationDate).toLocaleDateString("fr-FR")}
                            {skill.certificationFile && (
                              <Button variant="link" size="sm" className="h-auto p-0 ml-2">
                                <Download className="w-3 h-3 mr-1" />
                                Télécharger
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Projets</CardTitle>
                <CardDescription>Projets passés et en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-muted-foreground">{project.role}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Début: {new Date(project.startDate).toLocaleDateString("fr-FR")}</span>
                        <span>Fin: {new Date(project.endDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier de Disponibilité</CardTitle>
                <CardDescription>Planning et affectations de la semaine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.calendar.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="text-sm font-medium min-w-[80px]">
                        {new Date(event.date).toLocaleDateString("fr-FR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getEventColor(event.type)} variant="outline">
                            {event.type === "project" && <Clock className="w-3 h-3 mr-1" />}
                            {event.type === "meeting" && <Users className="w-3 h-3 mr-1" />}
                            {event.type === "training" && <Award className="w-3 h-3 mr-1" />}
                            {event.type === "leave" && <Calendar className="w-3 h-3 mr-1" />}
                            {event.title}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Schedule View Modal */}
        <ResourceScheduleView
          isOpen={isScheduleViewOpen}
          onClose={() => setIsScheduleViewOpen(false)}
          resourceName={profile.name}
          schedule={profile.schedule}
        />
      </div>
    </div>
  )
}
