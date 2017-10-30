export class Operator {
  id  = 0;
  name = '';
  surname = '';

  constructor() {}

  public fullName() {
    return `${this.name} ${this.surname}`;
  }
}
