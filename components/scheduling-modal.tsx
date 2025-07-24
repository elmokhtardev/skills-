"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, Plus, Trash2, Users, Coffee, Plane } from "lucide-react"

interface SchedulingModalProps {
  isOpen: boolean
  onClose: () => void
  resourceName?: string
  existingSchedule?: any
  onSave: (schedule: any) => void
}

export function SchedulingModal({ isOpen, onClose, resourceName, existingSchedule, onSave }: SchedulingModalProps) {
  const [workingHours, setWorkingHours] = useState(
    existingSchedule?.workingHours || {
      monday: { start: "09:00", end: "17:00", active: true },
      tuesday: { start: "09:00", end: "17:00", active: true },
      wednesday: { start: "09:00", end: "17:00", active: true },
      thursday: { start: "09:00", end: "17:00", active: true },
      friday: { start: "09:00", end: "17:00", active: true },
      saturday: { start: "", end: "", active: false },
      sunday: { start: "", end: "", active: false },
    },
  )

  const [absences, setAbsences] = useState(
    existingSchedule?.absences || [
      {
        id: 1,
        type: "vacation",
        title: "Congés d'été",
        startDate: "2024-07-15",
        endDate: "2024-07-30",
        description: "Vacances familiales",
      },
    ],
  )

  const [projects, setProjects] = useState(
    existingSchedule?.projects || [
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
  )

  const [newAbsence, setNewAbsence] = useState({
    type: "vacation",
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [newProject, setNewProject] = useState({
    name: "",
    allocation: 50,
    startDate: "",
    endDate: "",
  })

  const daysOfWeek = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
    { key: "saturday", label: "Samedi" },
    { key: "sunday", label: "Dimanche" },
  ]

  const absenceTypes = [
    { value: "vacation", label: "Congés", icon: Plane, color: "bg-blue-100 text-blue-800" },
    { value: "sick", label: "Maladie", icon: Coffee, color: "bg-red-100 text-red-800" },
    { value: "training", label: "Formation", icon: Users, color: "bg-purple-100 text-purple-800" },
    { value: "other", label: "Autre", icon: Clock, color: "bg-gray-100 text-gray-800" },
  ]

  const updateWorkingHours = (day: string, field: string, value: string | boolean) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  const addAbsence = () => {
    if (newAbsence.title && newAbsence.startDate && newAbsence.endDate) {
      const absence = {
        id: Date.now(),
        ...newAbsence,
      }
      setAbsences([...absences, absence])
      setNewAbsence({
        type: "vacation",
        title: "",
        startDate: "",
        endDate: "",
        description: "",
      })
    }
  }

  const removeAbsence = (id: number) => {
    setAbsences(absences.filter((absence) => absence.id !== id))
  }

  const addProject = () => {
    if (newProject.name && newProject.startDate && newProject.endDate) {
      const project = {
        id: Date.now(),
        ...newProject,
        color: "bg-orange-100 text-orange-800",
      }
      setProjects([...projects, project])
      setNewProject({
        name: "",
        allocation: 50,
        startDate: "",
        endDate: "",
      })
    }
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleSave = () => {
    const schedule = {
      workingHours,
      absences,
      projects,
    }
    onSave(schedule)
    onClose()
  }

  const getAbsenceTypeInfo = (type: string) => {
    return absenceTypes.find((t) => t.value === type) || absenceTypes[0]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Planning - {resourceName || "Nouvelle Ressource"}
          </DialogTitle>
          <DialogDescription>
            Définissez les horaires de travail, absences planifiées et affectations de projets
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="working-hours" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="working-hours">Horaires de Travail</TabsTrigger>
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
          </TabsList>

          <TabsContent value="working-hours" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horaires Hebdomadaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-20">
                      <Label className="font-medium">{day.label}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={workingHours[day.key]?.active || false}
                        onChange={(e) => updateWorkingHours(day.key, "active", e.target.checked)}
                        className="rounded"
                      />
                      <Label className="text-sm">Actif</Label>
                    </div>
                    {workingHours[day.key]?.active && (
                      <>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">De:</Label>
                          <Input
                            type="time"
                            value={workingHours[day.key]?.start || ""}
                            onChange={(e) => updateWorkingHours(day.key, "start", e.target.value)}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">À:</Label>
                          <Input
                            type="time"
                            value={workingHours[day.key]?.end || ""}
                            onChange={(e) => updateWorkingHours(day.key, "end", e.target.value)}
                            className="w-32"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
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
              <CardContent className="space-y-4">
                {/* Formulaire d'ajout */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Ajouter une absence</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type d'absence</Label>
                      <Select
                        value={newAbsence.type}
                        onValueChange={(value) => setNewAbsence({ ...newAbsence, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {absenceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Titre</Label>
                      <Input
                        value={newAbsence.title}
                        onChange={(e) => setNewAbsence({ ...newAbsence, title: e.target.value })}
                        placeholder="Ex: Congés d'été"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Input
                        type="date"
                        value={newAbsence.startDate}
                        onChange={(e) => setNewAbsence({ ...newAbsence, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <Input
                        type="date"
                        value={newAbsence.endDate}
                        onChange={(e) => setNewAbsence({ ...newAbsence, endDate: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Description (optionnel)</Label>
                      <Textarea
                        value={newAbsence.description}
                        onChange={(e) => setNewAbsence({ ...newAbsence, description: e.target.value })}
                        placeholder="Détails supplémentaires..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button onClick={addAbsence} className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter l'absence
                  </Button>
                </div>

                {/* Liste des absences */}
                <div className="space-y-3">
                  {absences.map((absence) => {
                    const typeInfo = getAbsenceTypeInfo(absence.type)
                    return (
                      <div key={absence.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={typeInfo.color}>
                            <typeInfo.icon className="w-3 h-3 mr-1" />
                            {typeInfo.label}
                          </Badge>
                          <div>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAbsence(absence.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
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
              <CardContent className="space-y-4">
                {/* Formulaire d'ajout */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Affecter à un projet</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom du projet</Label>
                      <Input
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="Ex: Projet Beta"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Allocation (%)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={newProject.allocation}
                        onChange={(e) => setNewProject({ ...newProject, allocation: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Input
                        type="date"
                        value={newProject.startDate}
                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <Input
                        type="date"
                        value={newProject.endDate}
                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={addProject} className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Affecter au projet
                  </Button>
                </div>

                {/* Liste des projets */}
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={project.color}>{project.allocation}%</Badge>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(project.startDate).toLocaleDateString("fr-FR")} -{" "}
                            {new Date(project.endDate).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Résumé allocation */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Allocation totale:</span>
                    <Badge
                      variant={projects.reduce((sum, p) => sum + p.allocation, 0) > 100 ? "destructive" : "secondary"}
                    >
                      {projects.reduce((sum, p) => sum + p.allocation, 0)}%
                    </Badge>
                  </div>
                  {projects.reduce((sum, p) => sum + p.allocation, 0) > 100 && (
                    <p className="text-sm text-red-600 mt-1">⚠️ L'allocation dépasse 100%</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Sauvegarder le Planning</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
