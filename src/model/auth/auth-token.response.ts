export interface AuthTokenResponse {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  user: UserDecodedDto;
}

export interface UserDecodedDto {
  id: string;
}
