"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Transaction } from "../types/transaction"
import { useAuth } from "./AuthContext"

interface BudgetContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

export const useBudget = () => {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider")
  }
  return context
}

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const storedTransactions = localStorage.getItem(`transactions_${user.id}`)
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions))
      } else {
        setTransactions([])
      }
    } else {
      setTransactions([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(transactions))
    }
  }, [transactions, user])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions([...transactions, newTransaction])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  return (
    <BudgetContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </BudgetContext.Provider>
  )
}

