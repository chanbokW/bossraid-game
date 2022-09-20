import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status: HttpStatus;
  data?: T;

  private constructor(status: HttpStatus, data?: T) {
    this.status = status;
    this.data = data;
  }

  static ok<T>(status: HttpStatus, data?: T) {
    return new ApiResponse<T>(status, data);
  }
}
