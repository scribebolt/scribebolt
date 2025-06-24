import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-28 h-28 bg-[#7B61FF]/5 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-20 h-20 bg-[#7B61FF]/10 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-[#7B61FF]/8 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2 hover:text-[#7B61FF] transition-colors cursor-pointer">
              ScribeBolt
            </h1>
          </Link>
          <p className="text-gray-600 text-sm">AI-powered cold email personalization</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-[#7B61FF]/10 rounded-full mx-auto mb-4">
              <Mail className="h-6 w-6 text-[#7B61FF]" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center text-[#1A1A1A]">Forgot password?</CardTitle>
            <CardDescription className="text-center text-gray-600">
              No worries, we'll send you reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-[#7B61FF] hover:bg-[#6B51E5] text-white font-medium transition-colors"
              >
                Reset Password
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional help text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the email?</p>
          <button className="text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors">
            Click to resend
          </button>
        </div>
      </div>
    </div>
  )
}
