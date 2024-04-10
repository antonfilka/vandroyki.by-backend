import { ApiProperty } from '@nestjs/swagger';

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  picture: string;
}

export class GetGoogleUser {
  @ApiProperty()
  declare user: GoogleUser;
}
