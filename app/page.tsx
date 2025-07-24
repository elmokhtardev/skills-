"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, Award, Calendar, TrendingUp, AlertCircle } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Ressources Humaines",
      value: "247",
      description: "Profils actifs",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Compétences",
      value: "156",
      description: "Compétences référencées",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Certifications",
      value: "89",
      description: "Certifications validées",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Disponibilité",
      value: "73%",
      description: "Ressources disponibles",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const competenceTypes = [
    { name: "Développement", count: 45, percentage: 85 },
    { name: "Langues", count: 32, percentage: 92 },
    { name: "Gestion", count: 28, percentage: 67 },
    { name: "Techniques", count: 51, percentage: 78 },
  ]

  const recentProfiles = [
    {
      name: "Marie Dubois",
      role: "Développeur Full-Stack",
      skills: ["React", "Node.js", "TypeScript"],
      availability: "Disponible",
    },
    { name: "Jean Martin", role: "Chef de Projet", skills: ["PMP", "Agile", "Leadership"], availability: "Occupé" },
    {
      name: "Sarah Johnson",
      role: "Designer UX/UI",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      availability: "Disponible",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard RH - Matrice de Compétences</h1>
          <p className="text-gray-600">Vue d'ensemble de la gestion des compétences et des ressources humaines</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Répartition des compétences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Répartition des Compétences
              </CardTitle>
              <CardDescription>Taux de maîtrise par type de compétence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {competenceTypes.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{type.name}</span>
                    <span className="text-sm text-muted-foreground">{type.count} compétences</span>
                  </div>
                  <Progress value={type.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">{type.percentage}% de maîtrise moyenne</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Profils récents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Profils Récemment Consultés
              </CardTitle>
              <CardDescription>Dernières ressources visualisées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProfiles.map((profile, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{profile.name}</div>
                    <div className="text-sm text-muted-foreground">{profile.role}</div>
                    <div className="flex gap-1">
                      {profile.skills.slice(0, 2).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {profile.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={profile.availability === "Disponible" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {profile.availability}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Alertes et notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertes & Notifications
            </CardTitle>
            <CardDescription>Points d'attention nécessitant une action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">15 profils sans évaluation de compétences</div>
                  <div className="text-xs text-muted-foreground">Dernière mise à jour il y a plus de 6 mois</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">8 certifications expirent ce mois</div>
                  <div className="text-xs text-muted-foreground">Renouvellement requis</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">23 nouvelles compétences ajoutées</div>
                  <div className="text-xs text-muted-foreground">Cette semaine</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
