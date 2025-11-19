// packages
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

// local modules
import { RegisterDTO } from "src/auth/dto/register.dto";
import { UserService } from "src/user/user.service";
import { SaltRounds } from "src/auth/constants";
import { LoginDTO } from "src/auth/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDTO: RegisterDTO): Promise<{ access_token: string }> {
    // check if user already exists
    const user = await this.userService.getUserByEmail(registerDTO.email);
    if (user) {
      throw new ConflictException("Email is already taken.");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(registerDTO.password, SaltRounds);

    // create the user
    const createdUser = await this.userService.createUser({
      ...registerDTO,
      password: hashedPassword,
    });

    const payload = {
      sub: createdUser?.id,
      email: createdUser?.email,
      name: createdUser?.name,
      createdAt: createdUser?.createdAt,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    // return createdUser;
  }

  async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(loginDTO.email);
    // if cannot fetch user
    if (!user) {
      throw new UnauthorizedException("Email or password is incorrect.");
    }

    const compare = await bcrypt.compare(
      loginDTO.password,
      user.hashedPassword
    );
    // if password does not match
    if (!compare) {
      throw new UnauthorizedException("Email or password is incorrect.");
    }

    // create jwt token
    const payload = {
      sub: user?.id,
      email: user?.email,
      name: user?.name,
      createdAt: user?.createdAt,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
