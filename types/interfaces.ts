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
	isadmin: boolean;
}

export interface ILoginAdmin {
	username: string;
	password: string;
}

export interface IBooks {
	title: string;
	author: string;
	imageurl: any;
	description: string;
	available: boolean;
	availabledate: string;
}

export interface IUserBooks {
	id: string;
	title: string;
	author: string;
	imageurl: string;
	description: string;
	available: boolean;
	availabledate: string;
}
export interface IUser {
	id: string;
	name: string;
	firstName: string;
	lastName: string;
	isadmin: boolean;
}

export interface IAdmin {
	id: string;
	name: string;
	firstName: string;
	lastName: string;
	isadmin: boolean;
}
