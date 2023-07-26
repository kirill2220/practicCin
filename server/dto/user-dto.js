module.exports = class UserDto {
  email;
  id;
  name;
  login;
  status;
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.login = model.login;
     this.status = model.status;
  }
};
