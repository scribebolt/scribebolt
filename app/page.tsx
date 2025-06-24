"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Target, Download, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">ScribeBolt</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">Start Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-20 w-24 h-24 bg-[#7B61FF]/5 rounded-full animate-float-slow"></div>
          <div className="absolute top-20 right-32 w-16 h-16 bg-[#7B61FF]/10 rounded-full animate-float-medium"></div>
          <div className="absolute top-60 left-1/3 w-12 h-12 bg-[#7B61FF]/15 rounded-full animate-float-fast"></div>
          <div className="absolute top-80 right-20 w-20 h-20 bg-[#7B61FF]/8 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 left-1/2 w-8 h-8 bg-[#7B61FF]/20 rounded-full animate-float-medium"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-[#7B61FF]/10 text-[#7B61FF] border-[#7B61FF]/20 hover:bg-[#7B61FF]/20 animate-pulse">
              ✨ AI-Powered Email Rewriting
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] dark:text-white mb-6 leading-tight">
              Transform Cold Emails
              <br />
              <span className="text-[#7B61FF]">Into Warm Responses</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              ScribeBolt uses advanced AI to rewrite and personalize your cold emails at scale. Perfect for agency
              owners, recruiters, and SaaS founders who want higher response rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#1A1A1A] border-gray-300 hover:bg-gray-50 px-8 py-4 text-lg hover:scale-105 transition-transform"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • 7-day free trial</p>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mb-4">See ScribeBolt in Action</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Watch how AI transforms your cold emails in seconds
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="aspect-video bg-gradient-to-br from-[#7B61FF]/10 to-[#7B61FF]/5 rounded-xl flex items-center justify-center border-2 border-dashed border-[#7B61FF]/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-10 w-10 text-[#7B61FF]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Interactive Demo</h3>
                <p className="text-gray-600">Screenshot of ScribeBolt's email rewriting interface</p>
                <p className="text-sm text-gray-500 mt-2">1920 x 1080 demo preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A] dark:text-white mb-4">Why Choose ScribeBolt?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful AI features designed to maximize your email outreach success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:border-[#7B61FF]/30 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-[#7B61FF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4">Personalized at Scale</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Generate hundreds of personalized emails in minutes. Our AI analyzes recipient data to create unique,
                  relevant messages that feel hand-written.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:border-[#7B61FF]/30 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-[#7B61FF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4">Powered by AI</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Advanced language models trained on high-converting email patterns. Continuously learning to improve
                  response rates and engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:border-[#7B61FF]/30 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8 text-[#7B61FF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4">Export Anywhere</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Seamlessly integrate with your existing tools. Export to CSV, connect with popular CRMs, or use our
                  API for custom workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] relative overflow-hidden">
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#7B61FF]/10 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-[#7B61FF]/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#7B61FF]/15 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-40 right-10 w-8 h-8 bg-[#7B61FF]/25 rounded-full animate-float-slow"></div>
        </div>

        <TestimonialSlider />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A1A] dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Choose the plan that scales with your business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">Basic</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#1A1A1A] dark:text-white">$29</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">Perfect for getting started</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">500 emails/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Basic personalization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">CSV export</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Email support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-white text-[#7B61FF] border-2 border-[#7B61FF] hover:bg-[#7B61FF] hover:text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-[#7B61FF] shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#7B61FF] text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#1A1A1A] dark:text-white">$79</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">For growing businesses</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">2,500 emails/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Advanced AI personalization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">CRM integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Analytics dashboard</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-[#7B61FF] hover:bg-[#6B51E5] text-white">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Agency Plan */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">Agency</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#1A1A1A] dark:text-white">$199</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">For agencies and teams</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">10,000 emails/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-[#7B61FF] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Team collaboration</span>
                  </li>
                </ul>
                <Button className="w-full bg-white text-[#7B61FF] border-2 border-[#7B61FF] hover:bg-[#7B61FF] hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1A1A1A] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">ScribeBolt</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Transform your cold email outreach with AI-powered personalization. Built for agencies, recruiters, and
                SaaS founders.
              </p>
              <div className="flex space-x-4">
                <Link href="/signup">
                  <Button size="sm" className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 ScribeBolt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "ScribeBolt increased our email response rate by 340% in just two weeks. The AI personalization is incredible – it's like having a team of copywriters working 24/7.",
      name: "Sarah Mitchell",
      title: "Founder, GrowthLab Agency",
      initials: "SM",
    },
    {
      quote:
        "As a recruiter, I was spending hours personalizing emails. ScribeBolt cut that time by 90% while actually improving my response rates. It's a game-changer.",
      name: "Marcus Chen",
      title: "Senior Recruiter, TechTalent Pro",
      initials: "MC",
    },
    {
      quote:
        "We've tried every email tool out there. ScribeBolt's AI is on another level – it understands context and writes emails that actually sound human.",
      name: "Jessica Rodriguez",
      title: "Head of Sales, CloudScale SaaS",
      initials: "JR",
    },
    {
      quote:
        "The ROI is insane. We're closing 3x more deals from cold outreach since switching to ScribeBolt. Our clients are asking how we got so good at email.",
      name: "David Park",
      title: "CEO, Digital Growth Partners",
      initials: "DP",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="max-w-4xl mx-auto text-center relative">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="relative min-h-[200px] flex items-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed transition-opacity duration-500">
            {testimonials[currentIndex].quote}
          </blockquote>
        </div>
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-[#7B61FF] rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">{testimonials[currentIndex].initials}</span>
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">{testimonials[currentIndex].name}</p>
            <p className="text-gray-400">{testimonials[currentIndex].title}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="sm" onClick={prevTestimonial} className="text-white hover:bg-white/10 p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#7B61FF]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button variant="ghost" size="sm" onClick={nextTestimonial} className="text-white hover:bg-white/10 p-2">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
