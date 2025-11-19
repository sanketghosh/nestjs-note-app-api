// packages
import { Body, Controller, Post } from "@nestjs/common";

// local modules
import { RegisterDTO } from "src/auth/dto/register.dto";
import { AuthService } from "src/auth/auth.service";
import { LoginDTO } from "src/auth/dto/login.dto";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post("login")
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
