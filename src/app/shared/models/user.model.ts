export class User {
  constructor(public email: string, public userId: string, private _tokenId: string, private _tokenExpiryDate: Date) {}

  get tokenId() {
    if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
      return null;
    }

    return this._tokenId;
  }
}
