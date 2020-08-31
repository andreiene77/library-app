/* eslint-disable no-unused-vars */
const { compare, hash } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const Repository = require('../../data/Repository');

class UsersService {
  /**
   *Creates an instance of UsersService.
   * @param {Repository} repo
   * @memberof UsersService
   */
  constructor(repo) {
    this.repo = repo;
  }

  /**
   * @param {String} username
   * @param {String} password
   * @memberof UsersService
   */
  async loginUser(username, password) {
    const user = await this.repo.getOne({ username });
    if (!user) return null;
    if (!(await compare(password, user.password))) return null;

    const refreshToken = sign({ username }, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    await this.repo.update({ _id: user._id }, { refreshTokens: [...user.refreshTokens, refreshToken] });
    return { user, refreshToken, accessToken };
  }

  /**
   * @param {{ username: String, password: String, email: String, firstName: String, lastName: String, phone: String }}
   * @memberof UsersService
   */
  async registerUser({ username, password, email, firstName, lastName, phone }) {
    const user = await this.repo.getOne({ username });
    if (user) return null;
    const hashedPassword = await hash(password, 10);
    const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    const refreshToken = sign({ username }, process.env.REFRESH_TOKEN_SECRET);
    const newUserData = {
      username,
      email,
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      isAdmin: false,
      refreshTokens: [refreshToken],
    };
    return { user: await this.repo.save(newUserData), refreshToken, accessToken };
  }

  /**
   * @param {String} token
   * @memberof UsersService
   */
  async refreshToken(token) {
    if (!token) return null;
    let accessToken = null;
    const tokenUser = verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await this.repo.getOne({ username: tokenUser.username });

    if (!user || !user.refreshTokens.includes(token)) return null;
    accessToken = sign({ username: tokenUser.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    return accessToken;
  }

  async logoutUser(username, refreshToken) {
    await this.repo.update({ username }, { $pullAll: { refreshTokens: [refreshToken] } });
  }

  async invalidateTokens(username) {
    const { nModified } = await this.repo.update({ username }, { refreshTokens: [] });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} users, because of multiple rows with same username`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async isAdmin(username) {
    const user = await this.repo.getOne({ username });
    return user.isAdmin;
  }

  getByWord(word) {
    return this.repo.getMany({
      $or: [
        {
          username: { $regex: `.*${word}.*`, $options: 'i' },
        },
        { email: { $regex: `.*${word}.*`, $options: 'i' } },
        { firstName: { $regex: `.*${word}.*`, $options: 'i' } },
        { lastName: { $regex: `.*${word}.*`, $options: 'i' } },
        { phone: { $regex: `.*${word}.*`, $options: 'i' } },
      ],
    });
  }

  getByUsername(username) {
    return this.repo.getOne({ username });
  }

  async saveUser({ username, password, email, firstName, lastName, phone }) {
    const user = await this.repo.getOne({ username });
    if (user) return null;
    const hashedPassword = await hash(password, 10);
    return this.repo.save({
      username,
      email,
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      isAdmin: false,
      refreshTokens: [],
    });
  }

  async blockUser(id) {
    console.log('blockUser -> id', id);
    const { nModified } = await this.repo.update({ _id: id }, { blocked: true });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} users, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async unblockUser(id) {
    const { nModified } = await this.repo.update({ _id: id }, { blocked: false });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} users, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async updateUser({ id, username, email, firstName, lastName, phone, isAdmin }) {
    const { nModified } = await this.repo.update({ _id: id }, { username, email, firstName, lastName, phone, isAdmin });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} users, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async updateSelfUser(username, { email, firstName, lastName, phone }) {
    const { nModified } = await this.repo.update({ username }, { email, firstName, lastName, phone });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} users, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async deleteUser(id) {
    const { deletedCount } = await this.repo.remove({ _id: id });
    if (parseInt(deletedCount, 10) !== 1)
      console.error(`Deleted ${deletedCount} users, because of multiple rows with same id`);
    if (parseInt(deletedCount, 10) === 0) throw new Error('Nothing deleted');
  }

  getAll() {
    return this.repo.getAll();
  }
}

module.exports = UsersService;
