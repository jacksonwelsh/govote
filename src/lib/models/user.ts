import type { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export default class User {
  constructor(
    public username: string,
    private _password: string,
    public college: string,
    public id?: ObjectId
  ) {}

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this._password);
  }

  set password(newPassword: string) {
    this._password = bcrypt.hashSync(newPassword, 10);
  }
}
