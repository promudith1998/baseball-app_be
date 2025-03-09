// import { Injectable } from '@nestjs/common';

// export type User = any;

// @Injectable()
// export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     console.log(username);

//     return this.users.find((user) => user.username === username);
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findOne(username: string): Promise<any | undefined> {
    const result = await this.dataSource.query(
      'SELECT AutoID userId,username ,"Password1" FROM "User" WHERE username = $1 LIMIT 1',
      [username],
    );

    return result.length > 0 ? result[0] : undefined;
  }
}
