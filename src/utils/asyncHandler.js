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

      // 피드백 반영: P2003(외래 키 제약 위반) 추가
      // errorHandler.js 분리는 아직 깊게 배우지 않았으므로 현재는 asyncHandler에서 임시 처리)
      if (error?.code === 'P2003') {
        return res.status(400).json({
          success: false,
          message: '잘못된 참조입니다. 관련된 상위 데이터가 존재하지 않습니다.',
          code: 'FOREIGN_KEY_FAILED', // 일관성 위해 추가하였고 error meta는 포함안하였습니다.
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
