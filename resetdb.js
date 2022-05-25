import Realm from 'realm'

(async () => {
  const realm = await Realm.open({
    path: 'teste.realm'
  });

  realm.write(() => {
    const cats = realm.objects('Cat')
    const dogs = realm.objects('Dog')
    realm.delete(cats)
    realm.delete(dogs)
  })

  realm.close();
})()