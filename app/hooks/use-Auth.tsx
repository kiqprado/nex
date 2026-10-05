import { useContext } from "react"

import { AuthContext } from "../context/auth-context"

export function UseAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error("UseAuth must be used within AuthProvider")
  }

  return context
}