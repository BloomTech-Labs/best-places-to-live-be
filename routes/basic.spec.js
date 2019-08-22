require('dotenv').config();
const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb+srv://${process.env.TESTING_MONGO_USERNAME}:${
        process.env.TESTING_MONGO_PASSWORD
      }@${process.env.TESTING_MONGO_HOSTNAME}/${
        process.env.TESTING_MONGO_DB
      }?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      },
    );
    db = await connection.db(`${process.env.TESTING_MONGO_DB}`);
  });

  afterAll(async () => {
    await db.collection('user').drop();
    await connection.close();
    await db.close();
  });

  it('should insert a user into collection', async () => {
    const users = db.collection('user');

    const mockUser = {
      _id: 'some-user-id',
      name: 'John',
      email: 'test@test.com',
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
