import Appointment from "@/utils/model/appointments";

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
	id: string;
	title: string;
	author: string;
	imageurl: string;
	description: string;
	available: boolean;
	availabledate: string;
}

export interface IFormik {
	title: string;
	author: string;
	imageurl: string;
	description: string;
	available: boolean;
	availabledate: string;
	quantity: number;
}

export interface IUserBooks {
	id: string;
	title: string;
	author: string;
	imageurl: string;
	description: string;
	available: boolean;
	availabledate: string;
	quantity: number;
}
export interface IUser {
	id: string;
	name: string;
	firstName: string;
	lastName: string;
	isadmin: boolean;
	email: string;
}

export interface IAdmin {
	id: string;
	name: string;
	firstName: string;
	lastName: string;
	isadmin: boolean;
}

export interface IPosts {
	id: string;
	post: string;
	enabled: boolean;
}

export interface PaginationOptions {
	page: number;
	pageSize: number;
}

export interface IAppointMents {
	id: string;
	email: string;
	phoneNumber: string;
	date: string;
	resolved: boolean;
	createdAt: string;
	updatedAt: string;
	User: IUser;
}

export interface IAnnouncements {
	id: string;
	title: string;
	description: string;
	category: string;
	date: string;
	updatedAt: string;
	createdAt: string;
}
