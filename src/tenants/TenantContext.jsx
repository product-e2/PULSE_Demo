import { createContext, useContext, useState, useEffect } from 'react'
import { getTenantByHash } from './tenants'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(() => getTenantByHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setTenant(getTenantByHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (tenant.fontFamily) {
      document.documentElement.style.fontFamily = tenant.fontFamily
    }
  }, [tenant])

  return <TenantContext.Provider value={{ tenant }}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used within TenantProvider')
  return ctx
}
