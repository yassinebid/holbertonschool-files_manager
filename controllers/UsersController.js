import sha1 from 'sha1';
import DBClient from '../utils/db';
const Bull = require('bull');


class UsersController {
  static async postNew(req, res) {
    const user = new Bull('userQueue');

    const email = req.body.email;
    if (!email) return res.status(400).send({ error: 'Missing email' });

    const password = req.body.password;
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const pass_old = await DBClient.db.collection('users').findOne({ email: email });
    if (pass_old) return res.status(400).send({ error: 'Already exist' });

    const pass_hash = sha1(password);
    const result = await DBClient.db.collection('users').insertOne({ email: email, password: pass_hash });

    user.add({ userId: result.insertedId, });
    return res.status(201).send({ id: result.insertedId, email: email });
  }
	static async getMe(req, res) {
    const token = req.header('X-Token') || null;
    if (!token) return res.status(401).send({ error: 'Unauthorized' });

    const redisToken = await RedisClient.get(`auth_${token}`);
    if (!redisToken) return res.status(401).send({ error: 'Unauthorized' });

    const user = await DBClient.db.collection('users').findOne({ _id: ObjectId(redisToken) });
    if (!user) return res.status(401).send({ error: 'Unauthorized' });
    delete user.password;

    return res.status(200).send({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;