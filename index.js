import moment from 'moment';
import Realm from 'realm';

const Cat = {
  name: "Cat",
  properties: {
    _id: { type: 'objectId', default: Realm.BSON.ObjectId() },
    today: { type: 'date', default: moment().utc().toDate() },
    name: 'string',
    age: 'int',
    type: 'string',
  },
  primaryKey: '_id',
};

const Dog = {
  name: 'Dog',
  properties: {
    _id: { type: 'objectId', default: Realm.BSON.ObjectId() },
    name: 'string',
    age: 'int',
    type: 'string'
  },
  primaryKey: '_id'
}

async function init() {
  try {
    const realm = await Realm.open({
      path: "teste.realm",
      schema: [Cat, Dog],
      schemaVersion: 2,
    })

    let dog;
    let cat;

    realm.write(() => {
      dog = realm.create("Dog", { name: 'Sumar', age: 12, type: 'Dalmata' })
      cat = realm.create("Cat", { name: 'Catilson', age: 5, type: 'Siames' })
    })

    const result = realm.objects('Cat').toJSON()
    console.log('results', result)

    realm.close()
  } catch (err) {
    console.error('Realm open error', err)
  }
}

(async function () {
  await init()
})()