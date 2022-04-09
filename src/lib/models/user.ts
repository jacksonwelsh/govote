import type { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export default class User {
  constructor(
    public username: string,
    private _password: string,
    public college: string,
    public name: string,
    private _new = true,
    public _id?: ObjectId
  ) {
    if (_new) this._password = bcrypt.hashSync(_password, 10);
    this._new = undefined;
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this._password);
  }

  set password(newPassword: string) {
    this._password = bcrypt.hashSync(newPassword, 10);
  }
}
