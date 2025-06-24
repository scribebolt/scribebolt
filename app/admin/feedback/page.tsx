"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MessageSquare, Star, CheckCircle, Clock } from "lucide-react"

const feedback = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    subject: "Feature Request: Bulk Export",
    message:
      "Would love to see a bulk export feature for all my templates. This would save me a lot of time when backing up my work.",
    date: "2024-01-20",
    status: "New",
    rating: 4,
    category: "Feature Request",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@startup.io",
    subject: "Bug Report: Template Not Saving",
    message:
      "I've been experiencing issues with templates not saving properly. Sometimes I lose my work after spending time customizing them.",
    date: "2024-01-19",
    status: "In Progress",
    rating: 2,
    category: "Bug Report",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@tech.com",
    subject: "Great Product!",
    message:
      "ScribeBolt has transformed how I handle email communication. The AI suggestions are spot-on and save me hours every week.",
    date: "2024-01-18",
    status: "Reviewed",
    rating: 5,
    category: "General Feedback",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@agency.com",
    subject: "Integration Request",
    message:
      "Could you add integration with Salesforce? This would make ScribeBolt perfect for our sales team workflow.",
    date: "2024-01-17",
    status: "Responded",
    rating: 4,
    category: "Integration",
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    email: "alex.r@marketing.co",
    subject: "UI Improvement Suggestion",
    message:
      "The dashboard could benefit from a dark mode option. Also, the mobile experience could be improved for on-the-go editing.",
    date: "2024-01-16",
    status: "New",
    rating: 3,
    category: "UI/UX",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800"
    case "Reviewed":
      return "bg-purple-100 text-purple-800"
    case "Responded":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Feature Request":
      return "bg-orange-100 text-orange-800"
    case "Bug Report":
      return "bg-red-100 text-red-800"
    case "General Feedback":
      return "bg-green-100 text-green-800"
    case "Integration":
      return "bg-purple-100 text-purple-800"
    case "UI/UX":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ))
}

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: feedback.length,
    new: feedback.filter((f) => f.status === "New").length,
    inProgress: feedback.filter((f) => f.status === "In Progress").length,
    avgRating: (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback & Support</h1>
        <p className="text-gray-600 mt-2">Manage user feedback and support requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <p className="text-sm text-gray-600">Total Feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.new}</div>
                <p className="text-sm text-gray-600">New Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
          <CardDescription>Review and manage user feedback and support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("New")}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("In Progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Reviewed")}>Reviewed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Responded")}>Responded</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Category: {categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Feature Request")}>
                  Feature Request
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Bug Report")}>Bug Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("General Feedback")}>
                  General Feedback
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Integration")}>Integration</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("UI/UX")}>UI/UX</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedback.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-sm text-gray-600 max-w-xs truncate">{item.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">{renderStars(item.rating)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {item.status === "New" && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Mark Reviewed
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
