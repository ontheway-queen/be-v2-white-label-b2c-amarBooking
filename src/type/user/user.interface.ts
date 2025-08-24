export interface IUserCreatedResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    name: string;
    id: number;
    username: string;
    gender: string;
  };
  token: string;
}
