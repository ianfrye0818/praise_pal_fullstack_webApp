import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { Role, User } from '@/types';

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
};

// Define action types
enum ActionType {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE = 'LOGOUT_FAILURE',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  SET_ADMIN = 'SET_ADMIN',
  REFRESH_REQUEST = 'REFRESH_REQUEST',
  REFRESH_SUCCESS = 'REFRESH_SUCCESS',
  REFRESH_FAILURE = 'REFRESH_FAILURE',
}

//Action types
interface LoginRequestAction {
  type: ActionType.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: { user: User };
}

interface LoginFailureAction {
  type: ActionType.LOGIN_FAILURE;
}

interface LogoutRequestAction {
  type: ActionType.LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: ActionType.LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: ActionType.LOGOUT_FAILURE;
}

interface RegisterRequestAction {
  type: ActionType.REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: ActionType.REGISTER_SUCCESS;
  payload: { user: User };
}

interface RegisterFailureAction {
  type: ActionType.REGISTER_FAILURE;
}

interface RefreshRequestAction {
  type: ActionType.REFRESH_REQUEST;
}
interface RefreshSuccessAction {
  type: ActionType.REFRESH_SUCCESS;
}
interface RefreshFailureAction {
  type: ActionType.REFRESH_FAILURE;
}

// Define action creators
export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | RefreshRequestAction
  | RefreshSuccessAction
  | RefreshFailureAction;

// Create the reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
    case ActionType.REGISTER_REQUEST:
    case ActionType.LOGOUT_REQUEST:
    case ActionType.REFRESH_REQUEST:
      return { ...state, loading: true };
    case ActionType.LOGIN_SUCCESS:
    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAdmin:
          action.payload.user.role === Role.ADMIN || action.payload.user.role === Role.SUPER_ADMIN,
        loading: false,
      };
    case ActionType.LOGIN_FAILURE:
    case ActionType.REGISTER_FAILURE:
    case ActionType.REFRESH_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, user: null, isAdmin: false };
    case ActionType.LOGOUT_SUCCESS:
      return { ...state, user: null, isAuthenticated: false, isAdmin: false, loading: false };
    case ActionType.LOGOUT_FAILURE: {
      return { ...state, loading: false };
    }
    case ActionType.REFRESH_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<
  { state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);

  useEffect(() => {
    const storedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { user: storedUser } });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, ActionType };
