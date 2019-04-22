import { Model } from '@vuex-orm/core';

const token = localStorage.token || '';
export default class UserData extends Model {
  static entity = 'userData';

  static fields() {
    return {
      id: this.attr(null),
      token: this.string(token),
      countryCode: this.string(''),
      countryName: this.string(''),
      regionCode: this.string(''),
      regionName: this.string(''),
      city: this.string(''),
    }
  }
}
