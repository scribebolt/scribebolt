"use client"

import { useState } from "react"
import { joinWaitlist } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, Users, Zap } from "lucide-react"

export default function WaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    // Add the selected role to formData
    formData.set("role", selectedRole)

    const result = await joinWaitlist(formData)

    if (result.success) {
      setIsSubmitted(true)
    } else {
      setError(result.error || "Something went wrong")
    }

    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                ScribeBolt
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">You're on the list!</h1>

              <p className="text-lg text-gray-600 mb-8">We'll be in touch soon with early access to ScribeBolt.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Early access invite</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Exclusive updates</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Special launch pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              ScribeBolt
            </div>

            {/* Hero Section with Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Column - Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Cold Emails That{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Actually Work
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join the waitlist for early access to AI-powered cold outreach that gets replies.
                </p>

                {/* Feature highlights */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">AI-powered personalization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">3x higher reply rates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Scale outreach effortlessly</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <Card className="border-0 shadow-2xl bg-white">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
                      <p className="text-gray-600">Be the first to experience the future of cold email</p>
                    </div>

                    <form action={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="mt-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="mt-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                          What's your role?
                        </Label>
                        <Select value={selectedRole} onValueChange={setSelectedRole} required>
                          <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agency-owner">Agency Owner</SelectItem>
                            <SelectItem value="recruiter">Recruiter</SelectItem>
                            <SelectItem value="saas-founder">SaaS Founder</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

                      <Button
                        type="submit"
                        disabled={isLoading || !selectedRole}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Joining...
                          </div>
                        ) : (
                          "Join Waitlist"
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      We'll never spam you. Unsubscribe at any time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Advanced AI personalizes every email for maximum impact</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Higher Reply Rates</h3>
                <p className="text-sm text-gray-600">Get 3x more replies with personalized outreach</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Scale Outreach</h3>
                <p className="text-sm text-gray-600">Send hundreds of personalized emails in minutes</p>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="text-center mt-16">
            <p className="text-sm text-gray-500 mb-4">Trusted by professionals at</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-gray-400">Google</div>
              <div className="text-lg font-semibold text-gray-400">Microsoft</div>
              <div className="text-lg font-semibold text-gray-400">Salesforce</div>
              <div className="text-lg font-semibold text-gray-400">HubSpot</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
