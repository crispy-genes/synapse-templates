import { Link } from "react-router-dom"

interface NotFoundProps {
  what: string
}

export function NotFound({ what }: NotFoundProps) {
  return (
    <div>
      <p className="text-red-600 dark:text-red-400">Not found: {what}.</p>
      <Link to="/" className="text-brand-600 hover:underline dark:text-brand-400">
        ← back to catalog
      </Link>
    </div>
  )
}
