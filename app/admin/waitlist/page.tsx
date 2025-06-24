"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Download, MoreHorizontal, Trash2, Mail, Users, Calendar } from "lucide-react"
import { getWaitlistSubscribers, exportWaitlistData, deleteWaitlistEntry } from "./actions"

interface WaitlistEntry {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

export default function AdminWaitlistPage() {
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([])
  const [filteredData, setFilteredData] = useState<WaitlistEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchWaitlistData()
  }, [])

  useEffect(() => {
    filterData()
  }, [searchTerm, selectedRole, waitlistData])

  const fetchWaitlistData = async () => {
    setLoading(true)
    const result = await getWaitlistSubscribers()
    if (result.success) {
      setWaitlistData(result.data)
    }
    setLoading(false)
  }

  const filterData = () => {
    let filtered = waitlistData

    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((entry) => entry.role === selectedRole)
    }

    setFilteredData(filtered)
  }

  const handleExport = async () => {
    setExporting(true)
    const result = await exportWaitlistData()
    if (result.success) {
      const csvContent = [
        ["Name", "Email", "Role", "Signup Date"],
        ...result.data.map((entry) => [
          entry.name,
          entry.email,
          entry.role,
          new Date(entry.created_at).toLocaleDateString(),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `scribebolt-waitlist-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
    setExporting(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this waitlist entry?")) {
      const result = await deleteWaitlistEntry(id)
      if (result.success) {
        fetchWaitlistData()
      }
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Agency Owner":
        return "bg-purple-100 text-purple-800"
      case "Recruiter":
        return "bg-blue-100 text-blue-800"
      case "SaaS Founder":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const uniqueRoles = Array.from(new Set(waitlistData.map((entry) => entry.role)))
  const topRole =
    uniqueRoles.length > 0
      ? uniqueRoles.reduce((a, b) =>
          waitlistData.filter((entry) => entry.role === a).length >
          waitlistData.filter((entry) => entry.role === b).length
            ? a
            : b,
        )
      : "N/A"

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Waitlist Subscribers</h1>
          <p className="text-gray-600 mt-1">Manage and view all waitlist signups</p>
        </div>
        <Button onClick={handleExport} disabled={exporting} className="bg-purple-600 hover:bg-purple-700">
          <Download className="mr-2 h-4 w-4" />
          {exporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitlistData.length}</div>
            <p className="text-xs text-muted-foreground">All time signups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                waitlistData.filter(
                  (entry) => new Date(entry.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">New signups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Role</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topRole}</div>
            <p className="text-xs text-muted-foreground">Most common role</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>View and manage all waitlist subscribers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No subscribers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(entry.role)}>{entry.role}</Badge>
                      </TableCell>
                      <TableCell>{new Date(entry.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDelete(entry.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
