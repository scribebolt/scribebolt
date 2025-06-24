"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, DollarSign, Users, CreditCard, TrendingUp } from "lucide-react"

const plans = [
  {
    id: 1,
    name: "Free",
    monthlyPrice: 0,
    userCount: 1456,
    revenue: 0,
    features: ["5 emails/month", "Basic templates"],
    status: "Active",
  },
  {
    id: 2,
    name: "Pro",
    monthlyPrice: 29,
    userCount: 987,
    revenue: 28623,
    features: ["Unlimited emails", "Custom templates", "Analytics"],
    status: "Active",
  },
  {
    id: 3,
    name: "Enterprise",
    monthlyPrice: 99,
    userCount: 234,
    revenue: 23166,
    features: ["Everything in Pro", "Team collaboration", "Priority support"],
    status: "Active",
  },
  {
    id: 4,
    name: "Legacy Pro",
    monthlyPrice: 19,
    userCount: 170,
    revenue: 3230,
    features: ["Old Pro features"],
    status: "Deprecated",
  },
]

const recentTransactions = [
  {
    id: 1,
    user: "John Smith",
    email: "john.smith@company.com",
    plan: "Pro",
    amount: 29,
    status: "Paid",
    date: "2024-01-20",
    method: "Credit Card",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    email: "sarah.j@startup.io",
    plan: "Enterprise",
    amount: 99,
    status: "Paid",
    date: "2024-01-19",
    method: "Bank Transfer",
  },
  {
    id: 3,
    user: "Mike Chen",
    email: "mike.chen@tech.com",
    plan: "Pro",
    amount: 29,
    status: "Failed",
    date: "2024-01-18",
    method: "Credit Card",
  },
  {
    id: 4,
    user: "Emily Davis",
    email: "emily.davis@agency.com",
    plan: "Pro",
    amount: 29,
    status: "Pending",
    date: "2024-01-17",
    method: "PayPal",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Failed":
      return "bg-red-100 text-red-800"
    case "Active":
      return "bg-green-100 text-green-800"
    case "Deprecated":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BillingPage() {
  const [planFilter, setPlanFilter] = useState("All")

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0)
  const totalUsers = plans.reduce((sum, plan) => sum + plan.userCount, 0)

  const filteredTransactions = recentTransactions.filter(
    (transaction) => planFilter === "All" || transaction.plan === planFilter,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Plans & Billing</h1>
        <p className="text-gray-600 mt-2">Monitor subscription plans and billing status</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">1,221</div>
                <p className="text-sm text-gray-600">Paid Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">12.5%</div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Overview of all available plans and their metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>${plan.monthlyPrice}</TableCell>
                    <TableCell>{plan.userCount.toLocaleString()}</TableCell>
                    <TableCell>${plan.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plan.status)}>{plan.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {plan.features.slice(0, 2).join(", ")}
                        {plan.features.length > 2 && "..."}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest billing transactions and payment status</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Plan: {planFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPlanFilter("All")}>All Plans</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter("Pro")}>Pro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlanFilter("Enterprise")}>Enterprise</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.user}</div>
                        <div className="text-sm text-gray-600">{transaction.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.plan}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
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
