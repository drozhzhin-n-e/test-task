export interface User {
  id: number;
  name: string;
  surname?: string;
  gender?: 'мужской' | 'женский';
  personalNumber?: number;
  mobile?: number;
  legalAddress?: string;
  country?: string;
  city?: string;
  address?: string;
  photo?: string;

  completed?: boolean;
}