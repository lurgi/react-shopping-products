export const generateToken = (userId: string, userPassword: string) => `Basic ${btoa(`${userId}:${userPassword}`)}`;
