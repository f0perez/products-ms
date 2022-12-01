import { ApiTokenCheckMiddlewareMiddleware } from './api-token-check-middleware.middleware';

describe('ApiTokenCheckMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiTokenCheckMiddlewareMiddleware()).toBeDefined();
  });
});
