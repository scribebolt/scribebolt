"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Sparkles,
  User,
  Moon,
  Sun,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

interface AnalysisResult {
  personalizationScore: number
  toneAnalysis: {
    detected: string
    confidence: number
    suggestions: string[]
  }
  spamPhrases: string[]
  readabilityScore: number
  sentimentScore: number
  improvements: string[]
}

export default function EmailAnalyzerPage() {
  const { isDark } = useTheme()
  const [emailContent, setEmailContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const user_id = "REPLACE_WITH_USER_ID"; // TODO: get from session

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return

    setIsAnalyzing(true)
    const res = await fetch("/api/email-analyzer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailContent, user_id }),
    })
    const data = await res.json()
    if (data.success) {
      // You may need to parse data.feedback into AnalysisResult format
      setAnalysisResult({
        personalizationScore: 75, // TODO: parse from data.feedback
        toneAnalysis: {
          detected: "Professional", // TODO: parse from data.feedback
          confidence: 85, // TODO: parse from data.feedback
          suggestions: ["Consider adding more personal touches"], // TODO: parse from data.feedback
        },
        spamPhrases: [], // TODO: parse from data.feedback
        readabilityScore: 82, // TODO: parse from data.feedback
        sentimentScore: 68, // TODO: parse from data.feedback
        improvements: ["Add more specific details about the recipient's company"], // TODO: parse from data.feedback
      })
    }
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
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
                    Email Analyzer
                  </h1>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Analyze your emails for personalization, tone, spam risk, and overall effectiveness
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <MessageSquare className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Email Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-content" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Paste your email here
                          </Label>
                          <Textarea
                            id="email-content"
                            placeholder="Hi [First Name],

I noticed [Company Name] recently expanded into the European market - congratulations on that milestone!

I'm reaching out because I help companies like yours streamline their customer acquisition process through AI-powered email personalization. We've helped similar SaaS companies increase their response rates by 340%.

Would you be open to a brief 15-minute call this week to discuss how we could help [Company Name] scale your outreach efforts?

Best regards,
[Your Name]"
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            className="min-h-[300px] border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                        </div>

                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing || !emailContent.trim()}
                          className="w-full bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                        >
                          {isAnalyzing ? (
                            <>
                              <Zap className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing Email...
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Analyze Email
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    {analysisResult ? (
                      <>
                        {/* Score Overview */}
                        <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                              <TrendingUp className="h-5 w-5 mr-2 text-[#7B61FF]" />
                              Overall Score
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <p
                                  className={`text-3xl font-bold ${getScoreColor(analysisResult.personalizationScore)}`}
                                >
                                  {analysisResult.personalizationScore}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Personalization</p>
                                <Progress value={analysisResult.personalizationScore} className="mt-2 h-2" />
                              </div>
                              <div className="text-center">
                                <p className={`text-3xl font-bold ${getScoreColor(analysisResult.readabilityScore)}`}>
                                  {analysisResult.readabilityScore}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Readability</p>
                                <Progress value={analysisResult.readabilityScore} className="mt-2 h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Tone Analysis */}
                        <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                              <MessageSquare className="h-5 w-5 mr-2 text-[#7B61FF]" />
                              Tone Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-[#1A1A1A] dark:text-white">Detected Tone:</span>
                              <Badge className={getScoreBadge(analysisResult.toneAnalysis.confidence)}>
                                {analysisResult.toneAnalysis.detected} ({analysisResult.toneAnalysis.confidence}%)
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Suggestions:</p>
                              <ul className="space-y-1">
                                {analysisResult.toneAnalysis.suggestions.map((suggestion, index) => (
                                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                    <span className="text-[#7B61FF] mr-2">•</span>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Spam Risk */}
                        <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                              <AlertTriangle className="h-5 w-5 mr-2 text-[#7B61FF]" />
                              Spam Risk Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {analysisResult.spamPhrases.length > 0 ? (
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-sm font-medium text-red-600">
                                    {analysisResult.spamPhrases.length} potential spam phrases detected
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {analysisResult.spamPhrases.map((phrase, index) => (
                                    <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                                      {phrase}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-medium text-green-600">No spam phrases detected</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Improvements */}
                        <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                              <Sparkles className="h-5 w-5 mr-2 text-[#7B61FF]" />
                              Improvement Suggestions
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {analysisResult.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-[#7B61FF]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-medium text-[#7B61FF]">{index + 1}</span>
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{improvement}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mb-4">
                            <TrendingUp className="h-8 w-8 text-[#7B61FF]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
                            Ready to Analyze
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 max-w-md">
                            Paste your email content and click "Analyze Email" to get detailed insights about
                            personalization, tone, spam risk, and improvement suggestions.
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
    { title: "Bulk Personalization", icon: Upload, href: "/dashboard/bulk-personalization" },
    { title: "Email Analyzer", icon: Zap, href: "/dashboard/email-analyzer", active: true },
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
