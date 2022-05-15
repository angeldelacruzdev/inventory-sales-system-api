export class CreatePersonDto {
  full_name: string;
  email: string;
  dni: string;
  company: string;
  address1: string;
  address2: string;
  phone1: string;
  phone2: string;
  image: string;
  kind: number;
  user: any;
  createdAt?: Date;
  updatedAt?: Date;
}
