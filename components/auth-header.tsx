import Link from "next/link"

export function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <Link href="/" className="inline-block">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2 hover:text-[#7B61FF] transition-colors cursor-pointer">
          ScribeBolt
        </h1>
      </Link>
      <p className="text-gray-600 text-sm">AI-powered cold email personalization</p>
    </div>
  )
}
