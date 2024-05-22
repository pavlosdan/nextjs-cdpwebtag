import bcrypt from 'bcryptjs';

export const fetchAccessToken = async (): Promise<string> => {
  const response = await fetch('https://auth.agilone.com/token?scheme=a1webtag', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${btoa(`${process.env.NEXT_PUBLIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_AUTH_PASSWORD}`)}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  const data = await response.json();
  return data.access_token;
};

export const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // Format yyyy-mm-dd
};

export const hashTokenWithDate = async (token: string, date: string): Promise<string> => {
  const concatenatedValue = `${token}${date}`;
  const saltRounds = 10;
  const hash = await bcrypt.hash(concatenatedValue, saltRounds);
  if (!hash.startsWith('$2a$')) {
    throw new Error('Hash does not start with the required prefix');
  }
  return hash;
};
