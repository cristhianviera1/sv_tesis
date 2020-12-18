import generator from 'generate-password';

export const generateRandomPassword = (): string => generator.generate({ length: 8, numbers: true });
