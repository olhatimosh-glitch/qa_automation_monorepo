import type { GeneratedTestUser } from '../types/fixtures';

interface GenerateTestUserOptions {
  readonly prefix?: string;
  readonly domain?: string;
}

export function generateTestUser(
  { prefix = 'user', domain = 'test.com' }: GenerateTestUserOptions = {}
): GeneratedTestUser {
  const random = Math.floor(Math.random() * 10000);
  const username = `${prefix}_${random}`;

  return {
    username,
    email: `${username}@${domain}`,
    password: 'Test1234!',
  };
}