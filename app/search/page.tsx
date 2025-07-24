"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Award, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { ResourceScheduleView } from "@/components/resource-schedule-view"

export default function SearchProfiles() {
  const [searchFilters, setSearchFilters] = useState({
    skillType: "all",
    skill: "all",
    minLevel: [1],
    certificationRequired: false,
    location: "all",
    availability: "all",
  })

  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      position: "Développeur Full-Stack",
      department: "IT",
      location: "Paris",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "React", level: 8, certified: true },
        { name: "Node.js", level: 8, certified: false },
        { name: "TypeScript", level: 6, certified: false },
      ],
      availability: "Disponible",
      matchScore: 95,
      projects: ["Projet Alpha", "Refonte Site Web"],
      schedule: [],
    },
    {
      id: 2,
      name: "Pierre Durand",
      position: "Développeur Frontend",
      department: "IT",
      location: "Lyon",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "React", level: 6, certified: false },
        { name: "Vue.js", level: 8, certified: true },
        { name: "JavaScript", level: 8, certified: false },
      ],
      availability: "Partiellement disponible",
      matchScore: 87,
      projects: ["Interface Admin"],
      schedule: [],
    },
    {
      id: 3,
      name: "Sophie Martin",
      position: "Développeur Full-Stack",
      department: "IT",
      location: "Paris",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "React", level: 6, certified: true },
        { name: "Python", level: 8, certified: false },
        { name: "Django", level: 6, certified: false },
      ],
      availability: "Disponible",
      matchScore: 82,
      projects: ["API Backend"],
      schedule: [],
    },
  ])

  const [selectedResourceForSchedule, setSelectedResourceForSchedule] = useState(null)
  const [isScheduleViewOpen, setIsScheduleViewOpen] = useState(false)

  const skillTypes = ["Développement", "Langues", "Gestion", "Techniques", "Design"]
  const skills = ["React", "Node.js", "Python", "JavaScript", "TypeScript", "Vue.js", "Angular"]
  const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux"]
  const availabilities = ["Disponible", "Partiellement disponible", "Occupé"]

  const getLevelLabel = (level) => {
    if (level <= 2) return "Débutant"
    if (level <= 4) return "Intermédiaire"
    if (level <= 7) return "Avancé"
    return "Expert"
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
      case 5:
        return "bg-gray-100 text-gray-800"
      case 6:
        return "bg-blue-100 text-blue-800"
      case 7:
        return "bg-green-100 text-green-800"
      case 8:
        return "bg-purple-100 text-purple-800"
      case 9:
        return "bg-gray-100 text-gray-800"
      case 10:
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "Partiellement disponible":
        return "bg-yellow-100 text-yellow-800"
      case "Occupé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleViewSchedule = (profile) => {
    setSelectedResourceForSchedule(profile)
    setIsScheduleViewOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recherche de Profils</h1>
          <p className="text-gray-600">Trouvez les ressources correspondant à vos besoins spécifiques</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres de recherche */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres de Recherche
                </CardTitle>
                <CardDescription>Affinez votre recherche de profils</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Type de compétence</Label>
                  <Select
                    value={searchFilters.skillType}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, skillType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {skillTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Compétence spécifique</Label>
                  <Select
                    value={searchFilters.skill}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, skill: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les compétences" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les compétences</SelectItem>
                      {skills.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Niveau minimum requis</Label>
                  <div className="px-2">
                    <Slider
                      value={searchFilters.minLevel}
                      onValueChange={(value) => setSearchFilters({ ...searchFilters, minLevel: value })}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Débutant</span>
                      <span>Expert</span>
                    </div>
                    <div className="text-center text-sm font-medium mt-2">
                      {getLevelLabel(searchFilters.minLevel[0])}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="certification"
                      checked={searchFilters.certificationRequired}
                      onCheckedChange={(checked) =>
                        setSearchFilters({ ...searchFilters, certificationRequired: checked })
                      }
                    />
                    <Label htmlFor="certification" className="text-sm">
                      Certification requise
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Localisation</Label>
                  <Select
                    value={searchFilters.location}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les villes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Disponibilité</Label>
                  <Select
                    value={searchFilters.availability}
                    onValueChange={(value) => setSearchFilters({ ...searchFilters, availability: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes disponibilités" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes disponibilités</SelectItem>
                      {availabilities.map((availability) => (
                        <SelectItem key={availability} value={availability}>
                          {availability}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Résultats de recherche */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Résultats de Recherche</span>
                  <Badge variant="outline">{searchResults.length} profils trouvés</Badge>
                </CardTitle>
                <CardDescription>Profils correspondant à vos critères, triés par pertinence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((profile) => (
                    <div key={profile.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {profile.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{profile.name}</h3>
                            <p className="text-muted-foreground">{profile.position}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {profile.location}
                              </span>
                              <Badge variant="outline">{profile.department}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className={`w-4 h-4 ${getMatchScoreColor(profile.matchScore)}`} />
                            <span className={`font-semibold ${getMatchScoreColor(profile.matchScore)}`}>
                              {profile.matchScore}%
                            </span>
                          </div>
                          <Badge className={getAvailabilityColor(profile.availability)}>{profile.availability}</Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-2">Compétences principales :</h4>
                        <div className="flex gap-2 flex-wrap">
                          {profile.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <Badge className={getLevelColor(skill.level)}>
                                {skill.name} - {getLevelLabel(skill.level)}
                              </Badge>
                              {skill.certified && <Award className="w-3 h-3 text-green-600" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Projets actifs :</h4>
                        <div className="flex gap-2 flex-wrap">
                          {profile.projects.map((project, index) => (
                            <Badge key={index} variant="secondary">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Score de correspondance basé sur les critères de recherche
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/resources/${profile.id}`}>
                            <Button variant="outline" size="sm">
                              Voir le profil
                            </Button>
                          </Link>
                          <Button size="sm" onClick={() => handleViewSchedule(profile)}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Planning
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Schedule View Modal */}
      {selectedResourceForSchedule && (
        <ResourceScheduleView
          isOpen={isScheduleViewOpen}
          onClose={() => {
            setIsScheduleViewOpen(false)
            setSelectedResourceForSchedule(null)
          }}
          resourceName={selectedResourceForSchedule.name}
          schedule={selectedResourceForSchedule.schedule}
        />
      )}
    </div>
  )
}
