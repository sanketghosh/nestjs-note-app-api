import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @IsNotEmpty({ message: "Password must be provided." })
  password: string;
}
