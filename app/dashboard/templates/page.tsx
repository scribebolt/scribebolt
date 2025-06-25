"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Edit3,
  FileText,
  Users,
  Settings,
  LogOut,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Sparkles,
  User,
  Star,
  StarOff,
  Calendar,
  Tag,
  Moon,
  Sun,
  Upload,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"
import type { EmailTemplate } from "@/types/email-template" // Declare EmailTemplate type

export default function TemplatesPage() {
  const { isDark, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTone, setSelectedTone] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const user_id = "REPLACE_WITH_USER_ID" // TODO: get from session

  useEffect(() => {
    async function fetchTemplates() {
      const res = await fetch(`/api/templates?user_id=${user_id}`)
      const data = await res.json()
      if (data.success) setTemplates(data.templates)
    }
    fetchTemplates()
  }, [user_id])

  const handleCreateTemplate = async (template: EmailTemplate) => {
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, name: template.title, content: template.content }),
    })
    const data = await res.json()
    if (data.success) setTemplates([data.template, ...templates])
  }

  const handleUpdateTemplate = async (template: EmailTemplate) => {
    const res = await fetch("/api/templates", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: template.id, user_id, name: template.title, content: template.content }),
    })
    const data = await res.json()
    if (data.success) setTemplates(templates.map(t => t.id === template.id ? data.template : t))
  }

  const handleDeleteTemplate = async (templateId: string) => {
    const res = await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: templateId, user_id }),
    })
    const data = await res.json()
    if (data.success) setTemplates(templates.filter(t => t.id !== templateId))
  }

  const categories = ["all", "Sales", "Recruiting", "Partnerships", "Agency", "Follow-up"]
  const tones = ["all", "Friendly", "Direct", "Professional", "Funny"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesTone = selectedTone === "all" || template.tone === selectedTone

    return matchesSearch && matchesCategory && matchesTone
  })

  const toggleFavorite = (templateId: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === templateId ? { ...template, isFavorite: !template.isFavorite } : template,
      ),
    )
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const duplicateTemplate = (template: EmailTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      title: `${template.title} (Copy)`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "",
      usageCount: 0,
      isFavorite: false,
    }
    setTemplates([newTemplate, ...templates])
  }

  return (
    <div className={`${isDark ? "dark" : ""} theme-transition`}>
      <SidebarProvider>
        <div className={`flex h-screen transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <DashboardSidebar />
          <SidebarInset className="flex-1 w-full">
            <main className="flex-1 w-full overflow-auto">
              <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      Email Templates
                    </h1>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      Manage and organize your saved email templates for quick reuse
                    </p>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Template
                      </Button>
                    </DialogTrigger>
                    <CreateTemplateDialog
                      isOpen={isCreateDialogOpen}
                      onClose={() => setIsCreateDialogOpen(false)}
                      onSave={(template) => {
                        handleCreateTemplate(template)
                        setIsCreateDialogOpen(false)
                      }}
                    />
                  </Dialog>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search templates, subjects, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]">
                      <SelectValue placeholder="Tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone} value={tone}>
                          {tone === "all" ? "All Tones" : tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Total Templates
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {templates.length}
                          </p>
                        </div>
                        <FileText className="h-8 w-8 text-[#7B61FF]" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Favorites
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {templates.filter((t) => t.isFavorite).length}
                          </p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Total Usage
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                          </p>
                        </div>
                        <Copy className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Categories
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {new Set(templates.map((t) => t.category)).size}
                          </p>
                        </div>
                        <Tag className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Templates Grid */}
                {filteredTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onToggleFavorite={toggleFavorite}
                        onDelete={handleDeleteTemplate}
                        onCopy={copyToClipboard}
                        onDuplicate={duplicateTemplate}
                        onEdit={setEditingTemplate}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="shadow-sm border-gray-200">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">No templates found</h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-4">
                        {searchQuery || selectedCategory !== "all" || selectedTone !== "all"
                          ? "Try adjusting your search or filters to find templates."
                          : "Create your first email template to get started with organized outreach."}
                      </p>
                      {!searchQuery && selectedCategory === "all" && selectedTone === "all" && (
                        <Button
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Template
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Edit Template Dialog */}
                {editingTemplate && (
                  <EditTemplateDialog
                    template={editingTemplate}
                    isOpen={!!editingTemplate}
                    onClose={() => setEditingTemplate(null)}
                    onSave={(updatedTemplate) => {
                      handleUpdateTemplate(updatedTemplate)
                      setEditingTemplate(null)
                    }}
                  />
                )}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

function TemplateCard({
  template,
  onToggleFavorite,
  onDelete,
  onCopy,
  onDuplicate,
  onEdit,
}: {
  template: EmailTemplate
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onCopy: (content: string) => void
  onDuplicate: (template: EmailTemplate) => void
  onEdit: (template: EmailTemplate) => void
}) {
  return (
    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-[#1A1A1A] dark:text-white truncate">{template.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {template.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.tone}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(template.id)} className="p-1 h-8 w-8">
              {template.isFavorite ? (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              ) : (
                <StarOff className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(template)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(template)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(template.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject:</p>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border truncate">{template.subject}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{template.content}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(template.createdAt).toLocaleDateString()}
            </span>
            <span>Used {template.usageCount} times</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-[#7B61FF]/10 text-[#7B61FF]">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(template.content)}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/5"
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateTemplateDialog({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (template: EmailTemplate) => void
}) {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tone, setTone] = useState("")
  const [tags, setTags] = useState("")

  const handleSave = () => {
    if (!title || !subject || !content || !category || !tone) return

    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      title,
      subject,
      content,
      category,
      tone,
      isFavorite: false,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "",
      usageCount: 0,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    onSave(newTemplate)

    // Reset form
    setTitle("")
    setSubject("")
    setContent("")
    setCategory("")
    setTone("")
    setTags("")
  }

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Template</DialogTitle>
        <DialogDescription>Create a reusable email template for your outreach campaigns.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
            Template Title
          </Label>
          <Input
            id="title"
            placeholder="e.g., SaaS Founder Outreach"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Recruiting">Recruiting</SelectItem>
                <SelectItem value="Partnerships">Partnerships</SelectItem>
                <SelectItem value="Agency">Agency</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Tone
            </Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Direct">Direct</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Funny">Funny</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
            Email Subject
          </Label>
          <Input
            id="subject"
            placeholder="e.g., Quick question about [Company Name]'s growth strategy"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
            Email Content
          </Label>
          <Textarea
            id="content"
            placeholder="Write your email template here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
            Tags (comma-separated)
          </Label>
          <Input
            id="tags"
            placeholder="e.g., saas, growth, outreach"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title || !subject || !content || !category || !tone}
            className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
          >
            Save Template
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

function EditTemplateDialog({
  template,
  isOpen,
  onClose,
  onSave,
}: {
  template: EmailTemplate
  isOpen: boolean
  onClose: () => void
  onSave: (template: EmailTemplate) => void
}) {
  const [title, setTitle] = useState(template.title)
  const [subject, setSubject] = useState(template.subject)
  const [content, setContent] = useState(template.content)
  const [category, setCategory] = useState(template.category)
  const [tone, setTone] = useState(template.tone)
  const [tags, setTags] = useState(template.tags.join(", "))

  const handleSave = () => {
    if (!title || !subject || !content || !category || !tone) return

    const updatedTemplate: EmailTemplate = {
      ...template,
      title,
      subject,
      content,
      category,
      tone,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    onSave(updatedTemplate)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
          <DialogDescription>Update your email template details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Template Title
            </Label>
            <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Recruiting">Recruiting</SelectItem>
                  <SelectItem value="Partnerships">Partnerships</SelectItem>
                  <SelectItem value="Agency">Agency</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tone" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Funny">Funny</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-subject" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Email Subject
            </Label>
            <Input id="edit-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-content" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Email Content
            </Label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-tags" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
              Tags (comma-separated)
            </Label>
            <Input id="edit-tags" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title || !subject || !content || !category || !tone}
              className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DashboardSidebar() {
  const { isDark, toggleTheme } = useTheme()

  const menuItems = [
    { title: "Rewrite", icon: Edit3, href: "/dashboard" },
    { title: "Templates", icon: FileText, href: "/dashboard/templates", active: true },
    { title: "Personas", icon: Users, href: "/dashboard/personas" },
    { title: "Bulk Personalization", icon: Upload, href: "/dashboard/bulk-personalization" },
    { title: "Email Analyzer", icon: Zap, href: "/dashboard/email-analyzer" },
    { title: "Team Workspace", icon: Users, href: "/dashboard/team-workspace" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  return (
    <Sidebar
      className={`border-r transition-all duration-300 ${
        isDark ? "border-purple-500/30 bg-gray-900" : "border-gray-200 bg-white"
      }`}
      variant="sidebar"
    >
      <SidebarHeader
        className={`border-t transition-all duration-300 p-4 ${isDark ? "border-purple-500/30" : "border-gray-200"}`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#7B61FF] rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xl font-bold transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}>
            ScribeBolt
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-xs uppercase tracking-wider mb-2 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className={`w-full justify-start transition-all duration-300 ${
                      isDark
                        ? "text-white hover:text-white hover:bg-purple-500/20 data-[active=true]:bg-[#7B61FF] data-[active=true]:text-white"
                        : "text-black hover:text-black hover:bg-gray-100 data-[active=true]:bg-[#7B61FF] data-[active=true]:text-white"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-md">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme Toggle */}
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className={`w-full justify-start transition-all duration-300 ${
                    isDark
                      ? "text-white hover:text-white hover:bg-purple-500/20"
                      : "text-black hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {isDark ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={`border-t transition-all duration-300 p-4 ${isDark ? "border-purple-500/30" : "border-gray-200"}`}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              <div className="w-8 h-8 bg-[#7B61FF] rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate transition-colors duration-300 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  John Doe
                </p>
                <p
                  className={`text-xs truncate transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  john@company.com
                </p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`w-full justify-start transition-all duration-300 ${
                isDark
                  ? "text-white hover:text-white hover:bg-purple-500/20"
                  : "text-black hover:text-black hover:bg-gray-100"
              }`}
            >
              <Link href="/login" className="flex items-center space-x-3 px-3 py-2 rounded-md">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
