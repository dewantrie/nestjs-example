import { ServiceUnavailableException } from '@nestjs/common';

export class HealthException extends ServiceUnavailableException {
	public error;

	constructor(error: unknown) {
		super();
		this.error = error;
	}
}