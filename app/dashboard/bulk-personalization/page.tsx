"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
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
  Upload,
  Download,
  Sparkles,
  User,
  Moon,
  Sun,
  Zap,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

interface CsvRow {
  id: number
  firstName: string
  lastName: string
  email: string
  company: string
  linkedinUrl: string
  status: "pending" | "processing" | "completed" | "error"
}

export default function BulkPersonalizationPage() {
  const { isDark } = useTheme()
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<CsvRow[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setCsvFile(file)
    setIsUploading(true)

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch("/api/bulk-personalization/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCsvData(data.rows);
        } else {
          setError(data.error || "Failed to upload file");
        }
      } else {
        setError("Failed to upload file");
      }
    } catch (err) {
      setError("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  }

  const handleGenerateAll = async () => {
    setIsGenerating(true)
    setGeneratedCount(0)

    try {
      const response = await fetch("/api/bulk-personalization/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rows: csvData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCsvData(data.processedRows);
          setGeneratedCount(data.processedRows.length);
        } else {
          setError(data.error || "Failed to generate personalized emails");
        }
      } else {
        setError("Failed to generate personalized emails");
      }
    } catch (err) {
      setError("Failed to generate personalized emails");
    } finally {
      setIsGenerating(false);
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/bulk-personalization/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rows: csvData,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "personalized_emails.csv";
        a.click();
      } else {
        setError("Failed to download results");
      }
    } catch (err) {
      setError("Failed to download results");
    }
  }

  const getStatusBadge = (status: CsvRow["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Processing</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
    }
  }

  return (
    <div className={`${isDark ? "dark" : ""} theme-transition`}>
      <SidebarProvider>
        <div className={`flex h-screen transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <DashboardSidebar />
          <SidebarInset className="flex-1">
            <main className="flex-1 overflow-auto">
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <h1
                    className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                  >
                    Bulk Personalization
                  </h1>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Upload a CSV file and generate personalized emails for multiple prospects at once
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Upload Section */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Upload className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Upload CSV
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="csv-upload" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Select CSV File
                          </Label>
                          <Input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Required columns: firstName, lastName, email, company, linkedinUrl
                          </p>
                        </div>

                        {isUploading && (
                          <div className="flex items-center space-x-2 text-[#7B61FF]">
                            <Zap className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Processing file...</span>
                          </div>
                        )}

                        {csvFile && !isUploading && (
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-500/30">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-800 dark:text-green-400">
                                {csvFile.name} uploaded successfully
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Stats */}
                    {csvData.length > 0 && (
                      <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                            <FileSpreadsheet className="h-5 w-5 mr-2 text-[#7B61FF]" />
                            Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white">{csvData.length}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rows</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-600">{generatedCount}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Progress</span>
                              <span className="font-medium text-[#1A1A1A] dark:text-white">
                                {Math.round((generatedCount / csvData.length) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-[#7B61FF] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(generatedCount / csvData.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button
                              onClick={handleGenerateAll}
                              disabled={isGenerating || generatedCount === csvData.length}
                              className="w-full bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                            >
                              {isGenerating ? (
                                <>
                                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                                  Generating... ({generatedCount}/{csvData.length})
                                </>
                              ) : (
                                <>
                                  <Sparkles className="h-4 w-4 mr-2" />
                                  Generate All Emails
                                </>
                              )}
                            </Button>

                            {generatedCount > 0 && (
                              <Button
                                onClick={handleDownload}
                                variant="outline"
                                className="w-full border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/5"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Results
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Preview Section */}
                  <div className="lg:col-span-2">
                    {csvData.length > 0 ? (
                      <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                            <FileSpreadsheet className="h-5 w-5 mr-2 text-[#7B61FF]" />
                            Data Preview
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-[#1A1A1A] dark:text-white">Name</TableHead>
                                  <TableHead className="text-[#1A1A1A] dark:text-white">Email</TableHead>
                                  <TableHead className="text-[#1A1A1A] dark:text-white">Company</TableHead>
                                  <TableHead className="text-[#1A1A1A] dark:text-white">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {csvData.map((row) => (
                                  <TableRow key={row.id}>
                                    <TableCell className="font-medium text-[#1A1A1A] dark:text-white">
                                      {row.firstName} {row.lastName}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-300">{row.email}</TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-300">{row.company}</TableCell>
                                    <TableCell>{getStatusBadge(row.status)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-[#7B61FF]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
                            Upload CSV to Get Started
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 max-w-md">
                            Upload a CSV file with prospect information to generate personalized emails in bulk. Your
                            data preview will appear here.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

function DashboardSidebar() {
  const { isDark, toggleTheme } = useTheme()

  const menuItems = [
    { title: "Rewrite", icon: Edit3, href: "/dashboard" },
    { title: "Templates", icon: FileText, href: "/dashboard/templates" },
    { title: "Personas", icon: Users, href: "/dashboard/personas" },
    { title: "Bulk Personalization", icon: Upload, href: "/dashboard/bulk-personalization", active: true },
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
        className={`border-b transition-all duration-300 p-6 ${isDark ? "border-purple-500/30" : "border-gray-200"}`}
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
