import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TeamService } from '../team/team.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private teamService: TeamService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userid, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async getAllAuth(): Promise<any[]> {
    return this.usersService.getAllAuth(); // call the method from UsersService
  }

  async getAllUsers(): Promise<any[]> {
    return this.usersService.getAllUsers(); // call the method from UsersService
  }

  async createOrUpdateUser(
    createdByUser: number,
    newUser: number,
    header: object,
    line: object,
  ): Promise<string> {
    await this.usersService.createOrUpdateUser(
      createdByUser,
      newUser,
      header,
      line,
    );
    return 'User created or updated successfully';
  }

  async createOrUpdateTeam(header: object, line: object): Promise<string> {
    await this.teamService.createOrUpdateTeam(header, line);
    return 'User created or updated successfully';
  }
}
