import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/admin/users')({
  component: () => <div>Hello /_rootLayout/admin/users!</div>
})