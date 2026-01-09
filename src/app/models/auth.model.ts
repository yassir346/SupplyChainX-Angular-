export interface UserRequest{
  firstName: String;
  lastName: String;
  email: string;
  password: string;
  role: string;
}

export interface AuthRequest{
  email: string;
  password: string;
}


export interface AuthResponse{
  accessToken: string;
  expiresIn: number;
}
