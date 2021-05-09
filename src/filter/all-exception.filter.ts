import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HealthException } from 'src/module/health/exception/health.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		this.logger.error(exception);

		const context = host.switchToHttp();
		const response = context.getResponse();
		const request = context.getRequest();

		if (exception instanceof HealthException) {
			this.healthCheck(exception, response);
		} else {
			this.unknownException(exception, request, response);
		}
	}

	private healthCheck(exception: HealthException, response: any) {
		response.status(HttpStatus.OK).json(exception.error.response);
	}

	private unknownException(exception: any, request: any, response: any) {
		const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
		const message = `Unknown error ${exception.message}`;
		response.status(statusCode).json({
			statusCode: statusCode,
			errors: [{
				message: message,
			}],
		});
	}

}