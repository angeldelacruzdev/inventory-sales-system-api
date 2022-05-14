export class CreateUserDto {
  full_name: string;
  email: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}
