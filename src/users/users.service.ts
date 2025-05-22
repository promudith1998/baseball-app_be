import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findOne(username: string): Promise<any | undefined> {
    console.log("asfa");
    
    const result = await this.dataSource.query(
      'SELECT "AutoID" userId,username ,"Password1" FROM "User" WHERE username = $1 LIMIT 1',
      [username],
    );

    return result.length > 0 ? result[0] : undefined;
  }

  async getAllAuth(): Promise<any[]> {
    const result = await this.dataSource.query(
      'SELECT * FROM "UserAuthorizationTree"',
    );
    return result;
  }

  async getAllUsers(): Promise<any[]> {
    const result = await this.dataSource.query('SELECT * FROM public."User"');
    return result;
  }

  async createOrUpdateUser(
    createdByUser: number,
    newUser: number,
    header: object,
    line: object,
  ): Promise<void> {
    console.log('ada', createdByUser, newUser, header, line);

    const query = `
      CALL public."UserMSP"($1, $2, $3::jsonb, $4::jsonb)
    `;
    await this.dataSource.query(query, [
      createdByUser,
      newUser,
      JSON.stringify(header),
      JSON.stringify(line),
    ]);
  }
}
