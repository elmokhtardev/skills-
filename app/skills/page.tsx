"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, BookOpen, Award, FileText } from "lucide-react"

export default function Skills() {
  const [skills, setSkills] = useState(
    [
      {
        id: 1,
        name: "React",
        type: "Développement",
        level: "Avancé",
        certificationRequired: true,
        description: "Bibliothèque JavaScript pour créer des interfaces utilisateur",
        resourceCount: 23,
      },
      {
        id: 2,
        name: "Anglais",
        type: "Langues",
        level: "Intermédiaire",
        certificationRequired: false,
        description: "Langue anglaise - communication professionnelle",
        resourceCount: 45,
      },
      {
        id: 3,
        name: "PMP",
        type: "Gestion",
        level: "Expert",
        certificationRequired: true,
        description: "Project Management Professional - Gestion de projet",
        resourceCount: 12,
      },
      {
        id: 4,
        name: "Node.js",
        type: "Développement",
        level: "Avancé",
        certificationRequired: false,
        description: "Runtime JavaScript côté serveur",
        resourceCount: 18,
      },
      {
        id: 5,
        name: "Figma",
        type: "Design",
        level: "Intermédiaire",
        certificationRequired: false,
        description: "Outil de design d'interface utilisateur",
        resourceCount: 8,
      },
    ].map((skill) => {
      delete skill.level
      return skill
    }),
  )

  const skillTypes = ["Développement", "Langues", "Gestion", "Techniques", "Design"]

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    certificationRequired: false,
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingSkill) {
      setSkills(skills.map((skill) => (skill.id === editingSkill.id ? { ...skill, ...formData } : skill)))
    } else {
      const newSkill = {
        id: Date.now(),
        ...formData,
        resourceCount: 0,
      }
      setSkills([...skills, newSkill])
    }
    setIsDialogOpen(false)
    setEditingSkill(null)
    setFormData({
      name: "",
      type: "",
      certificationRequired: false,
      description: "",
    })
  }

  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      type: skill.type,
      certificationRequired: skill.certificationRequired,
      description: skill.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Compétences</h1>
            <p className="text-gray-600">Référentiel des compétences de votre organisation</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingSkill(null)
                  setFormData({
                    name: "",
                    type: "",
                    certificationRequired: false,
                    description: "",
                  })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Compétence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Modifier la compétence" : "Nouvelle compétence"}</DialogTitle>
                <DialogDescription>
                  {editingSkill
                    ? "Modifiez les informations de la compétence"
                    : "Ajoutez une nouvelle compétence au référentiel"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la compétence</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: React, Anglais, PMP..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de compétence</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certification">Certification requise</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="certification"
                        checked={formData.certificationRequired}
                        onCheckedChange={(checked) => setFormData({ ...formData, certificationRequired: checked })}
                      />
                      <Label htmlFor="certification" className="text-sm">
                        {formData.certificationRequired ? "Oui" : "Non"}
                      </Label>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description de la compétence..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">{editingSkill ? "Modifier" : "Créer"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compétences Totales</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skills.length}</div>
              <p className="text-xs text-muted-foreground">Référentiel complet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skills.filter((skill) => skill.certificationRequired).length}</div>
              <p className="text-xs text-muted-foreground">Compétences certifiantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Niveau Expert</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skills.filter((skill) => skill.level === "Expert").length}</div>
              <p className="text-xs text-muted-foreground">Compétences expertes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ressources Moyennes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(skills.reduce((sum, skill) => sum + skill.resourceCount, 0) / skills.length)}
              </div>
              <p className="text-xs text-muted-foreground">Par compétence</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Table */}
        <Card>
          <CardHeader>
            <CardTitle>Référentiel des Compétences</CardTitle>
            <CardDescription>Gérez toutes les compétences de votre organisation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compétence</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Ressources</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{skill.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{skill.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {skill.certificationRequired ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="w-3 h-3 mr-1" />
                          Requise
                        </Badge>
                      ) : (
                        <Badge variant="outline">Optionnelle</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{skill.resourceCount} personnes</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(skill)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
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
