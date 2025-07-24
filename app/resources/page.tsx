"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Users, MapPin, Briefcase, Eye } from "lucide-react"
import Link from "next/link"
import { ResourceForm } from "@/components/resource-form"

export default function Resources() {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@company.com",
      phone: "+33 1 23 45 67 89",
      department: "IT",
      position: "Développeur Full-Stack",
      location: "Paris",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "React", level: "Avancé", certified: true },
        { name: "Node.js", level: "Avancé", certified: false },
        { name: "TypeScript", level: "Intermédiaire", certified: false },
      ],
      availability: "Disponible",
      projects: ["Projet Alpha", "Refonte Site Web"],
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@company.com",
      phone: "+33 1 23 45 67 90",
      department: "Management",
      position: "Chef de Projet",
      location: "Lyon",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "PMP", level: "Expert", certified: true },
        { name: "Agile", level: "Avancé", certified: true },
        { name: "Leadership", level: "Avancé", certified: false },
      ],
      availability: "Occupé",
      projects: ["Projet Beta", "Migration Cloud"],
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+33 1 23 45 67 91",
      department: "Design",
      position: "Designer UX/UI",
      location: "Marseille",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: [
        { name: "Figma", level: "Expert", certified: false },
        { name: "Adobe XD", level: "Avancé", certified: true },
        { name: "Prototyping", level: "Avancé", certified: false },
      ],
      availability: "Disponible",
      projects: ["Design System", "App Mobile"],
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState(null)

  const handleSubmit = (formData, resourceSkills) => {
    if (editingResource) {
      setResources(
        resources.map((resource) =>
          resource.id === editingResource.id ? { ...resource, ...formData, skills: resourceSkills } : resource,
        ),
      )
    } else {
      const newResource = {
        id: Date.now(),
        ...formData,
        avatar: "/placeholder.svg?height=40&width=40",
        skills: resourceSkills,
        availability: "Disponible",
        projects: [],
      }
      setResources([...resources, newResource])
    }
    setIsDialogOpen(false)
    setEditingResource(null)
  }

  const handleEdit = (resource) => {
    setEditingResource(resource)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "Occupé":
        return "bg-red-100 text-red-800"
      case "Partiellement disponible":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ressources Humaines</h1>
            <p className="text-gray-600">Gérez les profils et compétences de vos collaborateurs</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingResource(null)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Ressource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{editingResource ? "Modifier la ressource" : "Nouvelle ressource"}</DialogTitle>
                <DialogDescription>
                  {editingResource
                    ? "Modifiez les informations de la ressource"
                    : "Ajoutez une nouvelle ressource à votre équipe"}
                </DialogDescription>
              </DialogHeader>
              <ResourceForm
                editingResource={editingResource}
                onSubmit={handleSubmit}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ressources Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
              <p className="text-xs text-muted-foreground">Collaborateurs actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resources.filter((r) => r.availability === "Disponible").length}
              </div>
              <p className="text-xs text-muted-foreground">Ressources libres</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(resources.map((r) => r.department)).size}</div>
              <p className="text-xs text-muted-foreground">Départements actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Localisations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(resources.map((r) => r.location)).size}</div>
              <p className="text-xs text-muted-foreground">Villes représentées</p>
            </CardContent>
          </Card>
        </div>

        {/* Resources Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Ressources</CardTitle>
            <CardDescription>Gérez les profils de vos collaborateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Collaborateur</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Compétences</TableHead>
                  <TableHead>Disponibilité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={resource.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {resource.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-sm text-muted-foreground">{resource.position}</div>
                          <div className="text-xs text-muted-foreground">{resource.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {resource.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {resource.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                        {resource.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAvailabilityColor(resource.availability)}>{resource.availability}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/resources/${resource.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(resource)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
