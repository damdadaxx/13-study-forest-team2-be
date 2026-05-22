export class AppError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = true;
  }
}

export class ValidationError extends AppError {
  constructor(message = '잘못된 요청입니다.') {
    super(message, 400, 'BAD_REQUEST'); // badRequest → BAD_REQUEST
  }
}

export class Unauthorized extends AppError {
  constructor(message = '비밀번호가 일치하지 않습니다.') {
    super(message, 401, 'UNAUTHORIZED'); //
  }
}

export class NotFoundError extends AppError {
  constructor(message = '해당 데이터를 찾을 수 없습니다.') {
    super(message, 404, 'NOT_FOUND'); // notFound → NOT_FOUND
  }
}

export class ConflictError extends AppError {
  constructor(message = '이미 존재하는 값입니다.') {
    super(message, 409, 'CONFLICT'); // conflict → CONFLICT
  }
}

export class InternalServerError extends AppError {
  constructor(message = '서버 에러가 발생했습니다.') {
    super(message, 500, 'INTERNAL_SERVER_ERROR'); // internalServerError → INTERNAL_SERVER_ERROR
  }
}
