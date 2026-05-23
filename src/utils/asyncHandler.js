export const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error?.isOperational) {
        return res.status(error.status).json({
          success: false,
          message: error.message,
          code: error.code,
        });
      }

      if (error?.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '해당 데이터를 찾을 수 없습니다.',
          code: 'NOT_FOUND',
        });
      }

      if (error?.code === 'P2002') {
        return res.status(409).json({
          success: false,
          message: '이미 존재하는 값입니다.',
          code: 'CONFLICT',
        });
      }

      console.error('Unexpected Error:', error);
      return res.status(500).json({
        success: false,
        message: '서버 에러가 발생했습니다.',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  };
};

export default asyncHandler;
