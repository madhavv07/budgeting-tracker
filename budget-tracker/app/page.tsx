"use client"

import { useAuth } from "../contexts/AuthContext"
import { BudgetProvider } from "../contexts/BudgetContext"
import { Dashboard } from "../components/Dashboard"
import { TransactionForm } from "../components/TransactionForm"
import { TransactionList } from "../components/TransactionList"
import { LoginForm } from "../components/LoginForm"
import { SignupForm } from "../components/SignupForm"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(true)

  if (!user) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Budget Tracker</h1>
        {showLogin ? <LoginForm /> : <SignupForm />}
        <p className="text-center mt-4">
          {showLogin ? "Don't have an account? " : "Already have an account? "}
          <Button variant="link" onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Sign up" : "Log in"}
          </Button>
        </p>
      </main>
    )
  }

  return (
    <BudgetProvider>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Budgeting App</h1>
          <Button onClick={logout}>Logout</Button>
        </div>
        <div className="space-y-6">
          <Dashboard />
          <div className="grid gap-6 md:grid-cols-2">
            <TransactionForm />
            <TransactionList />
          </div>
        </div>
      </main>
    </BudgetProvider>
  )
}

