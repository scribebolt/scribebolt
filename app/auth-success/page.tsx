import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#7B61FF]/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#7B61FF]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#7B61FF]/8 rounded-full"></div>
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
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center text-[#1A1A1A]">Check your email</CardTitle>
            <CardDescription className="text-center text-gray-600">
              We sent a password reset link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder or</p>
              <Button
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50 text-[#1A1A1A] font-medium transition-colors"
              >
                Resend email
              </Button>
            </div>

            <div className="text-center">
              <Link href="/login" className="text-sm text-[#7B61FF] hover:text-[#6B51E5] font-medium transition-colors">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
