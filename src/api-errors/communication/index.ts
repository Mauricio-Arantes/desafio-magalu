import { HttpStatus } from '@nestjs/common';

export const CommunicationErrors = {
  NotFound: {
    statusCode: HttpStatus.NOT_FOUND,
    message: ['Communication not found', "Provided ID doesn't exists"],
    error: 'Not Found',
    apiErrorCode: '0001',
  },
};
