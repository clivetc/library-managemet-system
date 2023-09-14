export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginAdmin {
  username: string;
  password: string;
}

export interface IBooks {
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  available: boolean;
  availableDate: string;
}

export interface IUser {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
}

export interface IAdmin {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
}