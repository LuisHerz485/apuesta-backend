import { HttpStatus } from '@nestjs/common';

export class PaginatedResponse<T> {
    constructor(
        public readonly data: T[],
        public readonly totalRecords: number,
        public readonly success: boolean = true,
        public readonly message: string | null = null,
        public readonly statusCode: HttpStatus = HttpStatus.OK,
    ) {}

    static fromException<T>(
        ex: Error,
        errorMessage: string | null = null,
    ): PaginatedResponse<T> {
        return new PaginatedResponse<T>(
            [],
            0,
            false,
            errorMessage ?? ex.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
