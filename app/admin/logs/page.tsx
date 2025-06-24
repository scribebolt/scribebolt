"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

const logs = [
  {
    id: 1,
    event: "User Login",
    user: "john.smith@company.com",
    timestamp: "2024-01-20 14:30:25",
    ip: "192.168.1.100",
    actionType: "Authentication",
    status: "Success",
    details: "Successful login from Chrome browser",
  },
  {
    id: 2,
    event: "Template Created",
    user: "sarah.j@startup.io",
    timestamp: "2024-01-20 14:25:10",
    ip: "10.0.0.45",
    actionType: "Content",
    status: "Success",
    details: 'New email template "Sales Follow-up" created',
  },
  {
    id: 3,
    event: "Failed Login Attempt",
    user: "unknown@suspicious.com",
    timestamp: "2024-01-20 14:20:15",
    ip: "203.0.113.42",
    actionType: "Security",
    status: "Failed",
    details: "Multiple failed login attempts detected",
  },
  {
    id: 4,
    event: "Bulk Email Processing",
    user: "mike.chen@tech.com",
    timestamp: "2024-01-20 14:15:30",
    ip: "172.16.0.23",
    actionType: "Processing",
    status: "Success",
    details: "Processed 150 emails in bulk operation",
  },
  {
    id: 5,
    event: "API Rate Limit Exceeded",
    user: "api-user@external.com",
    timestamp: "2024-01-20 14:10:45",
    ip: "198.51.100.15",
    actionType: "API",
    status: "Warning",
    details: "Rate limit exceeded for API endpoint /v1/rewrite",
  },
  {
    id: 6,
    event: "User Registration",
    user: "newuser@example.com",
    timestamp: "2024-01-20 14:05:20",
    ip: "192.0.2.100",
    actionType: "Authentication",
    status: "Success",
    details: "New user account created with Pro plan",
  },
  {
    id: 7,
    event: "Database Connection Error",
    user: "system",
    timestamp: "2024-01-20 14:00:10",
    ip: "localhost",
    actionType: "System",
    status: "Error",
    details: "Temporary database connection timeout resolved",
  },
  {
    id: 8,
    event: "Payment Processed",
    user: "emily.davis@agency.com",
    timestamp: "2024-01-20 13:55:35",
    ip: "203.0.113.25",
    actionType: "Billing",
    status: "Success",
    details: "Monthly subscription payment of $29 processed",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success":
      return "bg-green-100 text-green-800"
    case "Warning":
      return "bg-yellow-100 text-yellow-800"
    case "Error":
      return "bg-red-100 text-red-800"
    case "Failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getActionTypeColor = (actionType: string) => {
  switch (actionType) {
    case "Authentication":
      return "bg-blue-100 text-blue-800"
    case "Content":
      return "bg-purple-100 text-purple-800"
    case "Security":
      return "bg-red-100 text-red-800"
    case "Processing":
      return "bg-green-100 text-green-800"
    case "API":
      return "bg-orange-100 text-orange-800"
    case "System":
      return "bg-gray-100 text-gray-800"
    case "Billing":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "Warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "Error":
    case "Failed":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <Info className="h-4 w-4 text-gray-600" />
  }
}

export default function SystemLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionTypeFilter, setActionTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesActionType = actionTypeFilter === "All" || log.actionType === actionTypeFilter
    const matchesStatus = statusFilter === "All" || log.status === statusFilter
    return matchesSearch && matchesActionType && matchesStatus
  })

  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.status === "Success").length,
    warnings: logs.filter((l) => l.status === "Warning").length,
    errors: logs.filter((l) => l.status === "Error" || l.status === "Failed").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
        <p className="text-gray-600 mt-2">Monitor system events and user activities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Info className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <p className="text-sm text-gray-600">Total Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.success}</div>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.warnings}</div>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.errors}</div>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>System Activity Logs</CardTitle>
              <CardDescription>Real-time system events and user activities</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Type: {actionTypeFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActionTypeFilter("All")}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("Authentication")}>
                  Authentication
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("Content")}>Content</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("Security")}>Security</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("Processing")}>Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("API")}>API</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("System")}>System</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActionTypeFilter("Billing")}>Billing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Success")}>Success</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Warning")}>Warning</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Error")}>Error</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Failed")}>Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.event}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    <TableCell>
                      <Badge className={getActionTypeColor(log.actionType)}>{log.actionType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{log.details}</TableCell>
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
