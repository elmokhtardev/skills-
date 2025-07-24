"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react"

export default function SkillTypes() {
  const [skillTypes, setSkillTypes] = useState([
    {
      id: 1,
      name: "Développement",
      description: "Compétences techniques de développement logiciel",
      skillCount: 45,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Langues",
      description: "Compétences linguistiques et communication",
      skillCount: 32,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Gestion",
      description: "Compétences managériales et de gestion de projet",
      skillCount: 28,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "Techniques",
      description: "Compétences techniques spécialisées",
      skillCount: 51,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 5,
      name: "Design",
      description: "Compétences créatives et de design",
      skillCount: 19,
      color: "bg-pink-100 text-pink-800",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState(null)
  const [formData, setFormData] = useState({ name: "", description: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingType) {
      setSkillTypes(skillTypes.map((type) => (type.id === editingType.id ? { ...type, ...formData } : type)))
    } else {
      const newType = {
        id: Date.now(),
        ...formData,
        skillCount: 0,
        color: "bg-gray-100 text-gray-800",
      }
      setSkillTypes([...skillTypes, newType])
    }
    setIsDialogOpen(false)
    setEditingType(null)
    setFormData({ name: "", description: "" })
  }

  const handleEdit = (type) => {
    setEditingType(type)
    setFormData({ name: type.name, description: type.description })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setSkillTypes(skillTypes.filter((type) => type.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Types de Compétences</h1>
            <p className="text-gray-600">Gérez les catégories de compétences de votre organisation</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingType(null)
                  setFormData({ name: "", description: "" })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingType ? "Modifier le type de compétence" : "Nouveau type de compétence"}
                </DialogTitle>
                <DialogDescription>
                  {editingType
                    ? "Modifiez les informations du type de compétence"
                    : "Créez un nouveau type de compétence pour organiser vos compétences"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom du type</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Développement, Langues, Gestion..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description du type de compétence..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">{editingType ? "Modifier" : "Créer"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Types Actifs</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skillTypes.length}</div>
              <p className="text-xs text-muted-foreground">Catégories de compétences</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compétences Totales</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skillTypes.reduce((sum, type) => sum + type.skillCount, 0)}</div>
              <p className="text-xs text-muted-foreground">Toutes catégories confondues</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne par Type</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(skillTypes.reduce((sum, type) => sum + type.skillCount, 0) / skillTypes.length)}
              </div>
              <p className="text-xs text-muted-foreground">Compétences par catégorie</p>
            </CardContent>
          </Card>
        </div>

        {/* Types Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Types de Compétences</CardTitle>
            <CardDescription>Gérez et organisez vos catégories de compétences</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Compétences</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Badge className={type.color}>{type.name}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">{type.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{type.skillCount} compétences</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(type)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(type.id)}
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
