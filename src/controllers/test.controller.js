import focusSessionSchema from '../schemas/test.schema.js';
import asyncHandler from '../utils/asyncHandler.js';

const runZodTest = asyncHandler(async (req, res) => {
  const validatedData = focusSessionSchema.parse(req.body);

  res.status(200).json({
    success: true,
    message: '실제 DB 스키마 통과',
    data: validatedData,
  });
});

export default runZodTest;
