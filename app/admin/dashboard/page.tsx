"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Mail, UserPlus, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Total registered users",
  },
  {
    title: "Active Users Today",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: UserCheck,
    description: "Users active in last 24h",
  },
  {
    title: "Emails Rewritten Today",
    value: "5,678",
    change: "+23%",
    trend: "up",
    icon: Mail,
    description: "Emails processed today",
  },
  {
    title: "New Signups This Week",
    value: "89",
    change: "-5%",
    trend: "down",
    icon: UserPlus,
    description: "New registrations this week",
  },
]

const dailyActivity = [
  { day: "Mon", users: 1200, emails: 4500 },
  { day: "Tue", users: 1350, emails: 5200 },
  { day: "Wed", users: 1100, emails: 3800 },
  { day: "Thu", users: 1450, emails: 6100 },
  { day: "Fri", users: 1600, emails: 7200 },
  { day: "Sat", users: 900, emails: 2800 },
  { day: "Sun", users: 800, emails: 2400 },
]

const featureUsage = [
  { feature: "Email Rewriting", usage: 85 },
  { feature: "Template Creation", usage: 72 },
  { feature: "Persona Management", usage: 68 },
  { feature: "Bulk Processing", usage: 45 },
  { feature: "Email Analysis", usage: 38 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of ScribeBolt platform metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                <span className="ml-1">from last week</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>Active users and emails processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyActivity.map((day) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Users: {day.users}</span>
                      <span>Emails: {day.emails}</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(day.users / 1600) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(day.emails / 7200) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Trends</CardTitle>
            <CardDescription>Most popular features by usage percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureUsage.map((feature) => (
                <div key={feature.feature} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{feature.feature}</span>
                    <span className="text-gray-500">{feature.usage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${feature.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
