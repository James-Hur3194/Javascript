const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async comparePasswords(saved, supplied) {
    // Saved -> password saved in our databse. 'hased.salt'
    // Supplied -> password given to us by a user tyring sign in
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    console.log('hashed', hashed);
    console.log('suppliedBuf', hashedSuppliedBuf);

    return hashed === hashedSuppliedBuf.toString('hex');

  }

  async create(attrs) {
    // attrs ==={ email: '', password: '' }
    attrs.id = this.randomId();
    // generate salt
    const salt = crypto.randomBytes(8).toString('hex');
    // generate hash password
    const buf = await scrypt(attrs.password, salt, 64);
    
    const records = await this.getAll();
    const record = ({
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`
    });
    records.push(record);

    await this.writeAll(records);
    return attrs;
  }
}

// const test = async () => {
//   const repo = new UsersRepository('users.json');

//   //await repo.create({ email: 'test@test.com', password: 'password' });
//   // await repo.update('5c032e47', { email: 'test1@test.com', password: 'password' });
//   const user = await repo.getOneBy({email: 'test@test.com', password:'password'});
//   //const users = await repo.getAll();
//   // const user = await repo.getOne('2e8df25e');
//   //await repo.delete('8537bbab');
//   console.log(user);
// };

// test();

module.exports = new UsersRepository('users.json');