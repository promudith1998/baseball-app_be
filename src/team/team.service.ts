import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async createOrUpdateTeam(
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
