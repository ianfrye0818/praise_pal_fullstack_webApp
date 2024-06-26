import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rootLayout/admin/company')({
  component: () => <div>Hello /_rootLayout/admin/company!</div>
})