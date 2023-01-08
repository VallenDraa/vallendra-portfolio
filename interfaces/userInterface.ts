export interface IUser {
  _id: string;
  username: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
