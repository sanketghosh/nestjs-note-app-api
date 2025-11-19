import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

const PASSWORD_RULES = {
  minLength: 8,
  minLowercase: 2,
  minUppercase: 2,
  minNumbers: 2,
  minSymbols: 1,
};

export class RegisterDTO {
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a valid string." })
  name: string;

  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;

  @IsStrongPassword(PASSWORD_RULES, {
    message: `Password must be at least ${PASSWORD_RULES.minLength} characters long and include:
- ${PASSWORD_RULES.minLowercase} lowercase letters
- ${PASSWORD_RULES.minUppercase} uppercase letters
- ${PASSWORD_RULES.minNumbers} numbers
- ${PASSWORD_RULES.minSymbols} symbol`,
  })
  password: string;
}
