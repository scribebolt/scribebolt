"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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
  Copy,
  Save,
  Sparkles,
  User,
  Zap,
  Moon,
  Sun,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

// Declare EmailVariation type
type EmailVariation = {
  id: number
  subject: string
  content: string
  tone: string
}

export default function DashboardPage() {
  const { isDark, toggleTheme } = useTheme()
  const [baseEmail, setBaseEmail] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [persona, setPersona] = useState("")
  const [tone, setTone] = useState("")
  const [generateFromScratch, setGenerateFromScratch] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [emailVariations, setEmailVariations] = useState<EmailVariation[]>([])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const variations: EmailVariation[] = [
      {
        id: 1,
        subject: "Quick question about [Company Name]'s growth strategy",
        content: `Hi [First Name],

I noticed [Company Name] recently expanded into the European market - congratulations on that milestone! 

I'm reaching out because I help companies like yours streamline their customer acquisition process through AI-powered email personalization. We've helped similar SaaS companies increase their response rates by 340%.

Would you be open to a brief 15-minute call this week to discuss how we could help [Company Name] scale your outreach efforts?

Best regards,
[Your Name]`,
        tone: tone || "Professional",
      },
      {
        id: 2,
        subject: "Love what [Company Name] is doing in [Industry]",
        content: `Hey [First Name],

Just came across [Company Name] and I'm genuinely impressed by your approach to [specific company focus]. The recent [specific achievement/news] caught my attention.

I work with fast-growing companies to optimize their cold outreach using AI. We've helped teams like yours save 10+ hours per week while improving response rates significantly.

Mind if I share a quick case study that might be relevant to [Company Name]'s growth goals?

Cheers,
[Your Name]`,
        tone: tone || "Friendly",
      },
      {
        id: 3,
        subject: "Partnership opportunity for [Company Name]",
        content: `Hello [First Name],

I've been following [Company Name]'s journey and your recent [specific milestone] is impressive. Your focus on [company value/mission] aligns perfectly with what we're building.

We help companies like yours automate and personalize their outreach at scale. Our AI has generated over $2M in pipeline for our clients this quarter alone.

Are you available for a quick call to explore how we might collaborate?

Best,
[Your Name]`,
        tone: tone || "Direct",
      },
    ]

    setEmailVariations(variations)
    setIsGenerating(false)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
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
                    AI Cold Email Personalizer
                  </h1>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Transform your cold outreach with AI-powered personalization that gets responses
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Edit3 className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Email Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Generate from scratch toggle */}
                        <div className="flex items-center justify-between p-4 bg-[#7B61FF]/5 rounded-lg">
                          <div>
                            <Label
                              htmlFor="generate-scratch"
                              className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                            >
                              Generate from scratch
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">
                              Create completely new emails instead of rewriting existing ones
                            </p>
                          </div>
                          <Switch
                            id="generate-scratch"
                            checked={generateFromScratch}
                            onCheckedChange={setGenerateFromScratch}
                          />
                        </div>

                        {/* Base Email - hidden when generating from scratch */}
                        {!generateFromScratch && (
                          <div className="space-y-2">
                            <Label htmlFor="base-email" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                              Base Email (Optional)
                            </Label>
                            <Textarea
                              id="base-email"
                              placeholder="Paste your existing email template here, or leave blank to generate from scratch..."
                              value={baseEmail}
                              onChange={(e) => setBaseEmail(e.target.value)}
                              className="min-h-[120px] border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                            />
                          </div>
                        )}

                        {/* LinkedIn Profile URL */}
                        <div className="space-y-2">
                          <Label htmlFor="linkedin-url" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            LinkedIn Profile URL
                          </Label>
                          <Input
                            id="linkedin-url"
                            type="url"
                            placeholder="https://linkedin.com/in/prospect-name"
                            value={linkedinUrl}
                            onChange={(e) => setLinkedinUrl(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                        </div>

                        {/* Persona */}
                        <div className="space-y-2">
                          <Label htmlFor="persona" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Target Persona
                          </Label>
                          <Input
                            id="persona"
                            placeholder="e.g., SaaS Founder, Marketing Director, HR Manager"
                            value={persona}
                            onChange={(e) => setPersona(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                        </div>

                        {/* Tone Selector */}
                        <div className="space-y-2">
                          <Label htmlFor="tone" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Email Tone
                          </Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="direct">Direct</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="funny">Funny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Generate Button */}
                        <Button
                          onClick={handleGenerate}
                          disabled={isGenerating || !linkedinUrl || !persona || !tone}
                          className="w-full h-12 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium text-lg"
                        >
                          {isGenerating ? (
                            <>
                              <Zap className="h-5 w-5 mr-2 animate-spin" />
                              Generating Emails...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-5 w-5 mr-2" />
                              Generate Emails
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Output Section */}
                  <div className="space-y-6">
                    {emailVariations.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-white">Generated Variations</h2>
                          <Badge className="bg-[#7B61FF]/10 text-[#7B61FF] border-[#7B61FF]/20">
                            {emailVariations.length} variations
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          {emailVariations.map((variation) => (
                            <Card
                              key={variation.id}
                              className="shadow-sm border-gray-200 hover:shadow-md transition-shadow dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300"
                            >
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg text-[#1A1A1A] dark:text-white">
                                    Variation {variation.id}
                                  </CardTitle>
                                  <Badge variant="outline" className="text-xs">
                                    {variation.tone}
                                  </Badge>
                                </div>
                                <div className="text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-md">
                                  <strong>Subject:</strong> {variation.subject}
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="text-sm text-gray-700 whitespace-pre-line bg-white border border-gray-200 p-4 rounded-md">
                                  {variation.content}
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(variation.content)}
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
                                    <Save className="h-4 w-4 mr-2" />
                                    Save to Templates
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mb-4">
                            <Sparkles className="h-8 w-8 text-[#7B61FF]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">
                            Ready to Generate
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 max-w-md">
                            Fill in the details on the left and click "Generate Emails" to create personalized email
                            variations powered by AI.
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
    { title: "Rewrite", icon: Edit3, href: "/dashboard", active: true },
    { title: "Templates", icon: FileText, href: "/dashboard/templates" },
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
