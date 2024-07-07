import { HttpStatus } from '@nestjs/common';

/**
 * @returns {Result<T>} - Clase de resultado con estado y data
 */
export class Result<T> {
    constructor(
        public readonly status: HttpStatus,
        public readonly data?: T,
        public readonly message?: string,
    ) {}
}
