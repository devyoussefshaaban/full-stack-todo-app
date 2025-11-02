interface IUser {
  _id: string;
  name: string;
  email: string;
  token: string;
  password?: string;
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface GetMeBody {
  user: IUser;
}
