"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Building2,
  Briefcase,
  Mail,
  Target,
  Zap,
  CheckCircle,
  Sparkles,
} from "lucide-react"

interface OnboardingData {
  role: string
  company: string
  emailVolume: string
  useCase: string
  goals: string[]
  firstName: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    role: "",
    company: "",
    emailVolume: "",
    useCase: "",
    goals: [],
    firstName: "",
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1A1A1A] hover:text-[#7B61FF] transition-colors">ScribeBolt</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep === 1 && <WelcomeStep data={data} updateData={updateData} onNext={nextStep} />}
        {currentStep === 2 && <RoleStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <VolumeStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 4 && (
          <GoalsStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} toggleGoal={toggleGoal} />
        )}
        {currentStep === 5 && <CompletionStep data={data} />}
      </div>
    </div>
  )
}

function WelcomeStep({ data, updateData, onNext }: any) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-[#7B61FF]" />
        </div>
        <CardTitle className="text-3xl font-bold text-[#1A1A1A] mb-2">Welcome to ScribeBolt! 🎉</CardTitle>
        <CardDescription className="text-lg text-gray-600">Let's get you set up in just a few minutes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-[#1A1A1A]">
              What should we call you?
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={data.firstName}
              onChange={(e) => updateData("firstName", e.target.value)}
              className="h-11 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-[#1A1A1A]">
              Company name
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Enter your company name"
              value={data.company}
              onChange={(e) => updateData("company", e.target.value)}
              className="h-11 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
            />
          </div>
        </div>

        <div className="bg-[#7B61FF]/5 rounded-lg p-4">
          <h3 className="font-semibold text-[#1A1A1A] mb-2">What you'll get:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-[#7B61FF] mr-2" />
              AI-powered email personalization
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-[#7B61FF] mr-2" />
              Higher response rates
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-[#7B61FF] mr-2" />
              Time-saving automation
            </li>
          </ul>
        </div>

        <Button
          onClick={onNext}
          disabled={!data.firstName || !data.company}
          className="w-full h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

function RoleStep({ data, updateData, onNext, onPrev }: any) {
  const roles = [
    {
      id: "agency",
      title: "Agency Owner",
      description: "Managing client outreach campaigns",
      icon: Building2,
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Sourcing and engaging candidates",
      icon: Users,
    },
    {
      id: "saas",
      title: "SaaS Founder",
      description: "Growing user base and partnerships",
      icon: Briefcase,
    },
  ]

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">What best describes your role?</CardTitle>
        <CardDescription className="text-gray-600">
          This helps us customize ScribeBolt for your specific needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={data.role} onValueChange={(value) => updateData("role", value)}>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center space-x-3">
                <RadioGroupItem value={role.id} id={role.id} />
                <Label
                  htmlFor={role.id}
                  className="flex items-center space-x-3 cursor-pointer flex-1 p-4 rounded-lg border border-gray-200 hover:border-[#7B61FF]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#7B61FF]/10 rounded-full flex items-center justify-center">
                    <role.icon className="h-5 w-5 text-[#7B61FF]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#1A1A1A]">{role.title}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1 h-11 border-gray-300 hover:bg-gray-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!data.role}
            className="flex-1 h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function VolumeStep({ data, updateData, onNext, onPrev }: any) {
  const volumes = [
    { id: "low", title: "1-100 emails/month", description: "Just getting started" },
    { id: "medium", title: "100-1,000 emails/month", description: "Growing outreach" },
    { id: "high", title: "1,000+ emails/month", description: "High-volume campaigns" },
  ]

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <div className="w-12 h-12 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-[#7B61FF]" />
        </div>
        <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">How many emails do you send?</CardTitle>
        <CardDescription className="text-gray-600">This helps us recommend the right plan for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={data.emailVolume} onValueChange={(value) => updateData("emailVolume", value)}>
          <div className="space-y-3">
            {volumes.map((volume) => (
              <div key={volume.id} className="flex items-center space-x-3">
                <RadioGroupItem value={volume.id} id={volume.id} />
                <Label
                  htmlFor={volume.id}
                  className="flex items-center justify-between cursor-pointer flex-1 p-4 rounded-lg border border-gray-200 hover:border-[#7B61FF]/30 transition-colors"
                >
                  <div>
                    <div className="font-medium text-[#1A1A1A]">{volume.title}</div>
                    <div className="text-sm text-gray-600">{volume.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="useCase" className="text-sm font-medium text-[#1A1A1A]">
            Tell us more about your use case (optional)
          </Label>
          <Textarea
            id="useCase"
            placeholder="e.g., I'm reaching out to potential clients for my marketing agency..."
            value={data.useCase}
            onChange={(e) => updateData("useCase", e.target.value)}
            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
            rows={3}
          />
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1 h-11 border-gray-300 hover:bg-gray-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!data.emailVolume}
            className="flex-1 h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GoalsStep({ data, updateData, onNext, onPrev, toggleGoal }: any) {
  const goals = [
    { id: "response-rate", title: "Increase response rates", icon: Target },
    { id: "save-time", title: "Save time on email writing", icon: Zap },
    { id: "scale-outreach", title: "Scale outreach efforts", icon: ArrowRight },
    { id: "improve-personalization", title: "Improve personalization", icon: Users },
    { id: "track-performance", title: "Track email performance", icon: CheckCircle },
    { id: "integrate-tools", title: "Integrate with existing tools", icon: Building2 },
  ]

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-2">What are your main goals?</CardTitle>
        <CardDescription className="text-gray-600">Select all that apply - we'll help you achieve them</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                data.goals.includes(goal.id)
                  ? "border-[#7B61FF] bg-[#7B61FF]/5"
                  : "border-gray-200 hover:border-[#7B61FF]/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.goals.includes(goal.id) ? "bg-[#7B61FF]" : "bg-gray-100"
                  }`}
                >
                  <goal.icon className={`h-4 w-4 ${data.goals.includes(goal.id) ? "text-white" : "text-gray-600"}`} />
                </div>
                <span className={`font-medium ${data.goals.includes(goal.id) ? "text-[#7B61FF]" : "text-[#1A1A1A]"}`}>
                  {goal.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1 h-11 border-gray-300 hover:bg-gray-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={data.goals.length === 0}
            className="flex-1 h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium"
          >
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CompletionStep({ data }: any) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-3xl font-bold text-[#1A1A1A] mb-2">You're all set, {data.firstName}! 🚀</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Welcome to ScribeBolt. Let's start transforming your cold emails.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-[#7B61FF]/5 rounded-lg p-6">
          <h3 className="font-semibold text-[#1A1A1A] mb-4">Your personalized setup:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <Badge variant="secondary" className="bg-[#7B61FF]/10 text-[#7B61FF]">
                {data.role === "agency" ? "Agency Owner" : data.role === "recruiter" ? "Recruiter" : "SaaS Founder"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email Volume:</span>
              <span className="font-medium text-[#1A1A1A]">
                {data.emailVolume === "low"
                  ? "1-100/month"
                  : data.emailVolume === "medium"
                    ? "100-1,000/month"
                    : "1,000+/month"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Goals:</span>
              <span className="font-medium text-[#1A1A1A]">{data.goals.length} selected</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-[#1A1A1A]">Next steps:</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#7B61FF] text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <div className="font-medium text-[#1A1A1A]">Upload your contact list</div>
                <div className="text-sm text-gray-600">Import your prospects to get started</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#7B61FF] text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <div className="font-medium text-[#1A1A1A]">Create your first campaign</div>
                <div className="text-sm text-gray-600">Let AI personalize your emails</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#7B61FF] text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <div className="font-medium text-[#1A1A1A]">Watch your response rates soar</div>
                <div className="text-sm text-gray-600">Track performance and optimize</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full h-11 border-gray-300 hover:bg-gray-50">
            Take a Quick Tour
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Need help getting started?{" "}
          <a href="#" className="text-[#7B61FF] hover:text-[#6B51E5] font-medium">
            Contact our support team
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
