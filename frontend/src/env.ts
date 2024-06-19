import * as z from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z.string(),
  VITE_API_BASE_URL: z.string(),
  VITE_BASE_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);

// interface Environment {
//   VITE_NODE_ENV: 'development' | 'production' | 'test';
//   VITE_API_BASE_URL: string;
//   VITE_BASE_URL: string;
// }

// export const env: Environment = {
//   VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
//   VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
//   VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
// };
