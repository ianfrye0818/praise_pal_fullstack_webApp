export const ApiRoutes = {
  login: '/login',
  regsiter: '/regiter',
  logout: '/logout',
  refresh: '/refresh',
  kudos: {
    base: '/kudos',
    company: (companyId: string) => `/kudos/${companyId}`,
    single: (companyId: string, kudoId: string) => `/kudos/${companyId}/${kudoId}`,
    sent: (companyId: string, userId: string) => `/kudos/${companyId}/sender/${userId}`,
    received: (companyId: string, userId: string) => `/kudos/${companyId}/recipient/${userId}`,
    create: (companyId: string) => `/kudos/${companyId}`,
    update: (companyId: string, kudoId: string) => `/kudos/${companyId}/${kudoId}`,
    delete: (companyId: string, kudoId: string) => `/kudos/${companyId}/${kudoId}`,
  },
  company: {
    base: '/company',
    single: (companyId: string) => `/company/${companyId}`,
    update: (companyId: string) => `/company/${companyId}`,
  },
  userLikes: {
    base: '/likes',
    add: (kudoId: string) => `/likes/${kudoId}`,
    remove: (kudoId: string) => `/likes/${kudoId}`,
  },
  users: {
    base: '/users',
    company: (companyId: string) => `/users/company/${companyId}`,
    single: (companyId: string, userId: string) => `/users/${companyId}/${userId}`,
    update: (companyId: string, userId: string) => `/users/${companyId}/${userId}`,
    delete: (companyId: string, userId: string) => `/users/${companyId}/${userId}`,
  },
};
