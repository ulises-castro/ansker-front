import axios from 'axios';

class User {
  constructor() {

  }

  signInOrRegister(params) {
    return axios.post('/login', params);
  }

  async signInOrRegisterAwait function(params) => {
    return await signInOrRegister(params);
  }
}

export default User;
