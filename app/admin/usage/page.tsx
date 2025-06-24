"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Filter, TrendingUp, TrendingDown, Activity } from "lucide-react"

const features = [
  {
    id: 1,
    name: "Email Rewriting",
    usageCount: 45678,
    lastUsed: "2024-01-20 14:30",
    trend: "up",
    change: "+23%",
    category: "Core",
  },
  {
    id: 2,
    name: "Template Creation",
    usageCount: 12456,
    lastUsed: "2024-01-20 13:45",
    trend: "up",
    change: "+15%",
    category: "Core",
  },
  {
    id: 3,
    name: "Persona Management",
    usageCount: 8934,
    lastUsed: "2024-01-20 12:20",
    trend: "up",
    change: "+8%",
    category: "Core",
  },
  {
    id: 4,
    name: "Bulk Personalization",
    usageCount: 3456,
    lastUsed: "2024-01-20 11:15",
    trend: "up",
    change: "+45%",
    category: "Advanced",
  },
  {
    id: 5,
    name: "Email Analyzer",
    usageCount: 2789,
    lastUsed: "2024-01-20 10:30",
    trend: "up",
    change: "+67%",
    category: "Advanced",
  },
  {
    id: 6,
    name: "Team Workspace",
    usageCount: 1234,
    lastUsed: "2024-01-19 16:45",
    trend: "down",
    change: "-5%",
    category: "Collaboration",
  },
  {
    id: 7,
    name: "API Access",
    usageCount: 567,
    lastUsed: "2024-01-18 09:20",
    trend: "up",
    change: "+12%",
    category: "Integration",
  },
  {
    id: 8,
    name: "Advanced Analytics",
    usageCount: 234,
    lastUsed: "2024-01-17 14:10",
    trend: "down",
    change: "-15%",
    category: "Analytics",
  },
]

const dailyUsage = [
  { date: "2024-01-14", usage: 8500 },
  { date: "2024-01-15", usage: 9200 },
  { date: "2024-01-16", usage: 7800 },
  { date: "2024-01-17", usage: 10500 },
  { date: "2024-01-18", usage: 11200 },
  { date: "2024-01-19", usage: 9800 },
  { date: "2024-01-20", usage: 12400 },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Core":
      return "bg-purple-100 text-purple-800"
    case "Advanced":
      return "bg-blue-100 text-blue-800"
    case "Collaboration":
      return "bg-green-100 text-green-800"
    case "Integration":
      return "bg-orange-100 text-orange-800"
    case "Analytics":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function FeatureUsagePage() {
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [dateFilter, setDateFilter] = useState("Last 7 days")

  const filteredFeatures = features.filter((feature) => categoryFilter === "All" || feature.category === categoryFilter)

  const totalUsage = features.reduce((sum, feature) => sum + feature.usageCount, 0)
  const mostUsedFeature = features.reduce((prev, current) => (prev.usageCount > current.usageCount ? prev : current))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feature Usage</h1>
        <p className="text-gray-600 mt-2">Monitor feature adoption and usage patterns</p>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalUsage.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-sm text-gray-600">Active Features</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-gray-900">{mostUsedFeature.name}</div>
            <p className="text-sm text-gray-600">Most Popular</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">+18%</div>
            <p className="text-sm text-gray-600">Growth This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Usage Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trend</CardTitle>
          <CardDescription>Feature usage over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyUsage.map((day, index) => (
              <div key={day.date} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-600">
                  {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Usage: {day.usage.toLocaleString()}</span>
                    <span className="text-gray-500">
                      {index > 0 && (
                        <>
                          {day.usage > dailyUsage[index - 1].usage ? (
                            <span className="text-green-600">
                              +
                              {Math.round(
                                ((day.usage - dailyUsage[index - 1].usage) / dailyUsage[index - 1].usage) * 100,
                              )}
                              %
                            </span>
                          ) : (
                            <span className="text-red-600">
                              {Math.round(
                                ((day.usage - dailyUsage[index - 1].usage) / dailyUsage[index - 1].usage) * 100,
                              )}
                              %
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.usage / 12400) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Usage Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Feature Usage Details</CardTitle>
              <CardDescription>Detailed breakdown of feature usage and trends</CardDescription>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Category: {categoryFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter("All")}>All Categories</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Core")}>Core</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Advanced")}>Advanced</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Collaboration")}>Collaboration</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Integration")}>Integration</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("Analytics")}>Analytics</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {dateFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateFilter("Last 7 days")}>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("Last 30 days")}>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateFilter("Last 90 days")}>Last 90 days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Usage Count</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Last Used</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(feature.category)}>{feature.category}</Badge>
                    </TableCell>
                    <TableCell>{feature.usageCount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {feature.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={feature.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {feature.change}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{feature.lastUsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
