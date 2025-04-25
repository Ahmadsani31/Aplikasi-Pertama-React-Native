export interface AuthUser {
    email: string;
    name: string;
    token: string;
  }
  
  export interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    login: (LoginData) => Promise<void>;
    register: (name: string, email: string, username: string,  password: string,password_confirmation:string) => Promise<void>;
    logout: () => void;
  }

  export type RootTabParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
    Todo: undefined;
    // Tambahkan screen lain jika diperlukan
  };

  export interface LoginData {
    username: string;
    password: string;
  }

  export interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
  };
  
  export interface AuthResponse {
    status: boolean;
    token: string;
    user: User;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }