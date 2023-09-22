export interface IPayload {
  email: string;
  roleId: number;
}

export interface IAuthRequest {
  user?: IPayload;
}
