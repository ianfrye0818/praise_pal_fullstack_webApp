import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/admin/kudos')({
  component: () => <div>Hello /_rootLayout/admin/kudos!</div>
})