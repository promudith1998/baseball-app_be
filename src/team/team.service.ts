import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createOrUpdateTeam(header: object, line: object): Promise<void> {
    const query = `
      CALL public."CreateTeamMSP"($1::jsonb, $2::jsonb)
    `;
    await this.dataSource.query(query, [
      JSON.stringify(header),
      JSON.stringify(line),
    ]);
  }
}
