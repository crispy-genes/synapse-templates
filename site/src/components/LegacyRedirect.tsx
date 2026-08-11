import { Navigate, useParams } from "react-router-dom"

interface LegacyRedirectProps {
  segment: string
}

export function LegacyRedirect({ segment }: LegacyRedirectProps) {
  const { name } = useParams()
  return <Navigate to={`/${segment}/${name}`} replace />
}
