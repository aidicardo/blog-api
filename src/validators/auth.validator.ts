import { z, ZodSchema } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = registerSchema;

export const refreshSchema = z.object({
  refreshToken: z.string(),
});

export const parseBody =
  <T>(schema: ZodSchema<T>) =>
  (data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw Object.assign(new Error(result.error.errors[0].message), { status: 400 });
  }
  return result.data;
  };
