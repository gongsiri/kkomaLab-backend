import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/response/dashboard-response.dto';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/data')
  public async getDashboardData(): Promise<DashboardResponseDto> {
    const dashboard = await this.dashboardService.getDashboard();
    return new DashboardResponseDto(dashboard);
  }
}
