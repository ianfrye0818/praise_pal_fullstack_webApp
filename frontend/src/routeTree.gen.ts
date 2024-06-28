/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RootLayoutImport } from './routes/_rootLayout'
import { Route as AuthLayoutImport } from './routes/_authLayout'
import { Route as AuthLayoutSignUpImport } from './routes/_authLayout/sign-up'
import { Route as AuthLayoutSignInImport } from './routes/_authLayout/sign-in'
import { Route as RootLayoutKudosKudosIdImport } from './routes/_rootLayout/kudos/$kudosId'
import { Route as RootLayoutAdminUsersImport } from './routes/_rootLayout/admin/users'
import { Route as RootLayoutAdminKudosImport } from './routes/_rootLayout/admin/kudos'
import { Route as RootLayoutAdminDashboardImport } from './routes/_rootLayout/admin/dashboard'
import { Route as RootLayoutAdminCompanyImport } from './routes/_rootLayout/admin/company'

// Create Virtual Routes

const RootLayoutIndexLazyImport = createFileRoute('/_rootLayout/')()
const RootLayoutKudosSentLazyImport = createFileRoute(
  '/_rootLayout/kudos/sent',
)()
const RootLayoutKudosReceivedLazyImport = createFileRoute(
  '/_rootLayout/kudos/received',
)()

// Create/Update Routes

const RootLayoutRoute = RootLayoutImport.update({
  id: '/_rootLayout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_authLayout',
  getParentRoute: () => rootRoute,
} as any)

const RootLayoutIndexLazyRoute = RootLayoutIndexLazyImport.update({
  path: '/',
  getParentRoute: () => RootLayoutRoute,
} as any).lazy(() =>
  import('./routes/_rootLayout/index.lazy').then((d) => d.Route),
)

const AuthLayoutSignUpRoute = AuthLayoutSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutSignInRoute = AuthLayoutSignInImport.update({
  path: '/sign-in',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const RootLayoutKudosSentLazyRoute = RootLayoutKudosSentLazyImport.update({
  path: '/kudos/sent',
  getParentRoute: () => RootLayoutRoute,
} as any).lazy(() =>
  import('./routes/_rootLayout/kudos/sent.lazy').then((d) => d.Route),
)

const RootLayoutKudosReceivedLazyRoute =
  RootLayoutKudosReceivedLazyImport.update({
    path: '/kudos/received',
    getParentRoute: () => RootLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_rootLayout/kudos/received.lazy').then((d) => d.Route),
  )

const RootLayoutKudosKudosIdRoute = RootLayoutKudosKudosIdImport.update({
  path: '/kudos/$kudosId',
  getParentRoute: () => RootLayoutRoute,
} as any)

const RootLayoutAdminUsersRoute = RootLayoutAdminUsersImport.update({
  path: '/admin/users',
  getParentRoute: () => RootLayoutRoute,
} as any)

const RootLayoutAdminKudosRoute = RootLayoutAdminKudosImport.update({
  path: '/admin/kudos',
  getParentRoute: () => RootLayoutRoute,
} as any)

const RootLayoutAdminDashboardRoute = RootLayoutAdminDashboardImport.update({
  path: '/admin/dashboard',
  getParentRoute: () => RootLayoutRoute,
} as any)

const RootLayoutAdminCompanyRoute = RootLayoutAdminCompanyImport.update({
  path: '/admin/company',
  getParentRoute: () => RootLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authLayout': {
      id: '/_authLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_rootLayout': {
      id: '/_rootLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof RootLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout/sign-in': {
      id: '/_authLayout/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthLayoutSignInImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/sign-up': {
      id: '/_authLayout/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthLayoutSignUpImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_rootLayout/': {
      id: '/_rootLayout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof RootLayoutIndexLazyImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/admin/company': {
      id: '/_rootLayout/admin/company'
      path: '/admin/company'
      fullPath: '/admin/company'
      preLoaderRoute: typeof RootLayoutAdminCompanyImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/admin/dashboard': {
      id: '/_rootLayout/admin/dashboard'
      path: '/admin/dashboard'
      fullPath: '/admin/dashboard'
      preLoaderRoute: typeof RootLayoutAdminDashboardImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/admin/kudos': {
      id: '/_rootLayout/admin/kudos'
      path: '/admin/kudos'
      fullPath: '/admin/kudos'
      preLoaderRoute: typeof RootLayoutAdminKudosImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/admin/users': {
      id: '/_rootLayout/admin/users'
      path: '/admin/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof RootLayoutAdminUsersImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/kudos/$kudosId': {
      id: '/_rootLayout/kudos/$kudosId'
      path: '/kudos/$kudosId'
      fullPath: '/kudos/$kudosId'
      preLoaderRoute: typeof RootLayoutKudosKudosIdImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/kudos/received': {
      id: '/_rootLayout/kudos/received'
      path: '/kudos/received'
      fullPath: '/kudos/received'
      preLoaderRoute: typeof RootLayoutKudosReceivedLazyImport
      parentRoute: typeof RootLayoutImport
    }
    '/_rootLayout/kudos/sent': {
      id: '/_rootLayout/kudos/sent'
      path: '/kudos/sent'
      fullPath: '/kudos/sent'
      preLoaderRoute: typeof RootLayoutKudosSentLazyImport
      parentRoute: typeof RootLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthLayoutRoute: AuthLayoutRoute.addChildren({
    AuthLayoutSignInRoute,
    AuthLayoutSignUpRoute,
  }),
  RootLayoutRoute: RootLayoutRoute.addChildren({
    RootLayoutIndexLazyRoute,
    RootLayoutAdminCompanyRoute,
    RootLayoutAdminDashboardRoute,
    RootLayoutAdminKudosRoute,
    RootLayoutAdminUsersRoute,
    RootLayoutKudosKudosIdRoute,
    RootLayoutKudosReceivedLazyRoute,
    RootLayoutKudosSentLazyRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authLayout",
        "/_rootLayout"
      ]
    },
    "/_authLayout": {
      "filePath": "_authLayout.tsx",
      "children": [
        "/_authLayout/sign-in",
        "/_authLayout/sign-up"
      ]
    },
    "/_rootLayout": {
      "filePath": "_rootLayout.tsx",
      "children": [
        "/_rootLayout/",
        "/_rootLayout/admin/company",
        "/_rootLayout/admin/dashboard",
        "/_rootLayout/admin/kudos",
        "/_rootLayout/admin/users",
        "/_rootLayout/kudos/$kudosId",
        "/_rootLayout/kudos/received",
        "/_rootLayout/kudos/sent"
      ]
    },
    "/_authLayout/sign-in": {
      "filePath": "_authLayout/sign-in.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/sign-up": {
      "filePath": "_authLayout/sign-up.tsx",
      "parent": "/_authLayout"
    },
    "/_rootLayout/": {
      "filePath": "_rootLayout/index.lazy.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/admin/company": {
      "filePath": "_rootLayout/admin/company.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/admin/dashboard": {
      "filePath": "_rootLayout/admin/dashboard.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/admin/kudos": {
      "filePath": "_rootLayout/admin/kudos.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/admin/users": {
      "filePath": "_rootLayout/admin/users.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/kudos/$kudosId": {
      "filePath": "_rootLayout/kudos/$kudosId.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/kudos/received": {
      "filePath": "_rootLayout/kudos/received.lazy.tsx",
      "parent": "/_rootLayout"
    },
    "/_rootLayout/kudos/sent": {
      "filePath": "_rootLayout/kudos/sent.lazy.tsx",
      "parent": "/_rootLayout"
    }
  }
}
ROUTE_MANIFEST_END */
