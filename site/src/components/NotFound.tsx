import { Link } from "react-router-dom"

interface NotFoundProps {
  what: string
}

export function NotFound({ what }: NotFoundProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="font-mono text-[13.5px] text-ink-muted">Not found: {what}.</p>
      <Link to="/" className="text-[13.5px] no-underline">
        ← All templates
      </Link>
    </div>
  )
}
