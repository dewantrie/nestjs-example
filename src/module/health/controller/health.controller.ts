import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { ConfigService} from '@nestjs/config';

@Controller('/health')
export class HealthController {
	constructor(private configService: ConfigService, private health: HealthCheckService) {}

	@Get()
	public async applicationHealthCheck() {
		return {
			serverTime: new Date().toString(),
			serviceName: this.configService.get<string>('API_NAME'),
			appVersion: this.configService.get<string>('npm_package_version')
		};
	}

}
