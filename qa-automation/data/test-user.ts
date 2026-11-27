import type { TestUser } from '../types/fixtures';

export const DEFAULT_USER: TestUser = {
  email: process.env.TEST_EMAIL ?? '',
  password: process.env.TEST_PASSWORD ?? '',
};