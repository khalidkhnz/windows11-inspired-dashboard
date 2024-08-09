interface IUser {
  name: string;
  email: string;
  image: string;
}

export interface ISession {
  user: IUser;
  expires: string;
}
