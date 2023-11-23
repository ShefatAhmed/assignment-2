export type User = {
  userId: string;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: string;
  email: string;
  isActive: string;
  hobbies: [string, string];
  address: {
    street: string;
    city: string;
    country: string;
  };
};