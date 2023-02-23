const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbFile = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        this.db = false;
      } else {
        this.db = client.db(dbFile);
      }
    });
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    const users = await this.db.collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const files = await this.db.collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;