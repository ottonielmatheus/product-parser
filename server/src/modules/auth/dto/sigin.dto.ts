import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Credential } from './../../credentials/credential.schema';

export class SigInDto extends PartialType(Credential) {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
