"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, Calendar } from "lucide-react"
import { SchedulingModal } from "@/components/scheduling-modal"
import { Badge } from "@/components/ui/badge"

interface ResourceSkill {
  id: string
  type: string
  skill: string
  level: number
  certified: boolean
  certificationFile?: File | null
}

interface ResourceFormProps {
  editingResource?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ResourceForm({ editingResource, onSubmit, onCancel }: ResourceFormProps) {
  const [formData, setFormData] = useState({
    name: editingResource?.name || "",
    email: editingResource?.email || "",
    phone: editingResource?.phone || "",
    department: editingResource?.department || "",
    position: editingResource?.position || "",
    location: editingResource?.location || "",
  })

  const [resourceSkills, setResourceSkills] = useState<ResourceSkill[]>(
    editingResource?.skills?.map((skill: any, index: number) => ({
      id: `skill-${index}`,
      type: skill.type || "",
      skill: skill.name || "",
      level: skill.level || 1,
      certified: skill.certified || false,
      certificationFile: null,
    })) || [],
  )

  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)
  const [resourceSchedule, setResourceSchedule] = useState(null)

  const departments = ["IT", "Management", "Design", "Marketing", "RH", "Finance"]
  const locations = ["Paris", "Lyon", "Marseille", "Toulouse", "Nantes", "Bordeaux"]

  const skillTypes = ["Développement", "Langues", "Gestion", "Techniques", "Design"]
  const skillsByType = {
    Développement: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "Vue.js", "Angular"],
    Langues: ["Anglais", "Français", "Espagnol", "Allemand", "Italien"],
    Gestion: ["PMP", "Agile", "Scrum", "Leadership", "Management"],
    Techniques: ["Docker", "AWS", "Azure", "Kubernetes", "Linux"],
    Design: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch"],
  }

  const addSkill = () => {
    const newSkill: ResourceSkill = {
      id: `skill-${Date.now()}`,
      type: "",
      skill: "",
      level: 1,
      certified: false,
      certificationFile: null,
    }
    setResourceSkills([...resourceSkills, newSkill])
  }

  const removeSkill = (id: string) => {
    setResourceSkills(resourceSkills.filter((skill) => skill.id !== id))
  }

  const updateSkill = (id: string, field: keyof ResourceSkill, value: any) => {
    setResourceSkills(resourceSkills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const handleScheduleSave = (schedule: any) => {
    setResourceSchedule(schedule)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resourceData = {
      ...formData,
      skills: resourceSkills.map((skill) => ({
        name: skill.skill,
        type: skill.type,
        level: skill.level,
        certified: skill.certified,
        certificationFile: skill.certificationFile?.name || null,
      })),
      schedule: resourceSchedule,
    }
    onSubmit(resourceData)
  }

  const handleFileChange = (skillId: string, file: File | null) => {
    updateSkill(skillId, "certificationFile", file)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations de base */}
      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Prénom Nom"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+33 1 23 45 67 89"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Service</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un service" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Intitulé du poste"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une ville" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Section Compétences */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Compétences de la Ressource</CardTitle>
            <Button type="button" onClick={addSkill} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une compétence
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resourceSkills.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Aucune compétence ajoutée</p>
              <p className="text-sm">Cliquez sur "Ajouter une compétence" pour commencer</p>
            </div>
          ) : (
            resourceSkills.map((skill, index) => (
              <Card key={skill.id} className="border-2 border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Compétence #{index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeSkill(skill.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Type de compétence */}
                    <div className="space-y-2">
                      <Label>Type de compétence</Label>
                      <Select
                        value={skill.type}
                        onValueChange={(value) => {
                          updateSkill(skill.id, "type", value)
                          updateSkill(skill.id, "skill", "") // Reset skill when type changes
                        }}
                      >
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

                    {/* Compétence spécifique */}
                    <div className="space-y-2">
                      <Label>Compétence</Label>
                      <Select
                        value={skill.skill}
                        onValueChange={(value) => updateSkill(skill.id, "skill", value)}
                        disabled={!skill.type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une compétence" />
                        </SelectTrigger>
                        <SelectContent>
                          {skill.type &&
                            skillsByType[skill.type]?.map((skillName) => (
                              <SelectItem key={skillName} value={skillName}>
                                {skillName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Niveau de maîtrise */}
                    <div className="space-y-2">
                      <Label>Niveau de maîtrise</Label>
                      <div className="px-2">
                        <Slider
                          value={[skill.level]}
                          onValueChange={(value) => updateSkill(skill.id, "level", value[0])}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1</span>
                          <span>10</span>
                        </div>
                        <div className="text-center text-sm font-medium mt-2">Niveau {skill.level}/10</div>
                      </div>
                    </div>

                    {/* Certification */}
                    <div className="space-y-2">
                      <Label>Certification</Label>
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id={`cert-${skill.id}`}
                          checked={skill.certified}
                          onCheckedChange={(checked) => updateSkill(skill.id, "certified", checked)}
                        />
                        <Label htmlFor={`cert-${skill.id}`} className="text-sm">
                          Détient une certification
                        </Label>
                      </div>
                    </div>

                    {/* Justificatif (si certifié) */}
                    {skill.certified && (
                      <div className="col-span-2 space-y-2">
                        <Label>Justificatif de certification</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(skill.id, e.target.files?.[0] || null)}
                            className="flex-1"
                          />
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                        {skill.certificationFile && (
                          <p className="text-xs text-muted-foreground">
                            Fichier sélectionné: {skill.certificationFile.name}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Planning Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Planning & Disponibilité</CardTitle>
            <Button type="button" onClick={() => setIsSchedulingOpen(true)} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Gérer le Planning
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {resourceSchedule ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Planning configuré</Badge>
                <span className="text-sm text-muted-foreground">
                  {resourceSchedule.projects?.length || 0} projet(s), {resourceSchedule.absences?.length || 0}{" "}
                  absence(s)
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cliquez sur "Gérer le Planning" pour modifier les horaires, absences et affectations.
              </p>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Aucun planning configuré</p>
              <p className="text-sm">Cliquez sur "Gérer le Planning" pour définir la disponibilité</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isSchedulingOpen}
        onClose={() => setIsSchedulingOpen(false)}
        resourceName={formData.name}
        existingSchedule={resourceSchedule}
        onSave={handleScheduleSave}
      />

      {/* Boutons d'action */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">{editingResource ? "Modifier" : "Créer"}</Button>
      </div>
    </form>
  )
}
