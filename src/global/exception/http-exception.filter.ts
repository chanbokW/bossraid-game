import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

/**
 * @Catch(HttpException)
 * 해당 데코레이터는 필요한 메타 데이터를 ExceptionFilter에 바인딩하여,
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @description 예외 처리 함수
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description HttpException에서 전송한 데이터를 추출할 때 사용
     */
    const res: any = (exception as HttpException).getResponse();
    const log = {
      timestamp: new Date(),
      url: response.url,
      status,
      res,
    };

    console.log(log);
    https: response.status(status).json(log);
  }
}
