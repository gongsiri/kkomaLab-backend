import { DashboardEntity } from 'src/dashboard/entity/dashboard.entity';

export class DashboardResponseDto {
  public readonly data: DashboardEntity;

  constructor(data: DashboardEntity) {
    this.data = data;
  }
}
