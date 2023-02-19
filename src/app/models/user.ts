// Here 'User' model represents the type of the API response and the type of our 'Store'
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: {
      street?: string;
      suite?: string;
      city: string;
      zipcode: string;
      geo?: {};
    };
    phone: string;
    website?: string;
    company?: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
  }
  
  // https://jsonplaceholder.typicode.com/users
  