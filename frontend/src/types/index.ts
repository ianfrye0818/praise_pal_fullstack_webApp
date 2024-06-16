export interface SignInFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  companyCode: string;
}

export interface User {
  id?: string;
  email: string;
  userId: string;
  companyId: string;
  role: Role;
  displayName: string;
  firstName: string;
  lastName: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface SignInFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  companyCode: string;
  displayName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SidebarLink {
  label: string;
  route: string;
  icon: string;
}

export type TKudos = {
  id: string;
  senderId: string;
  recipientId?: string;
  companyId: string;
  message: string;
  title?: string;
  createdAt?: EpochTimeStamp;
  updatedAt?: EpochTimeStamp;
  deletedAt?: EpochTimeStamp | null;
  likes: number;
  isAnonymous: boolean;
  isHidden: boolean;
  sender: SenderReceiverUser;
  receiver?: SenderReceiverUser;
  User_Like: UserLike[];
};

export type SenderReceiverUser = Omit<User, 'accessToken' | 'refreshToken' | 'userId'> & {
  id: string;
};

export interface CreateKudoFormProps {
  senderId: string;
  recipientId?: string;
  companyId: string;
  message: string;
  title?: string;
  isAnonymous?: boolean;
}

export interface UserLike {
  id: string;
  kudoId: string;
  userId: string;
  createdAt?: EpochTimeStamp;
}
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (formData: SignInFormProps) => Promise<void>;
  logout: () => Promise<void>;
  register: (formData: SignUpFormProps) => Promise<void>;
  isAdmin: boolean;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  companyCode: string;
  users: User[];
  kudos: TKudos[];
  createdAt?: EpochTimeStamp;
  updatedAt?: EpochTimeStamp;
  deletedAt?: EpochTimeStamp | null;
}
