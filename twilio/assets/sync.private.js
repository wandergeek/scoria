//all of these need error catching

module.exports = {

  async createSyncMap(client, SYNC_SVC_SID, name) {
      console.log(`creating sync map with name ${name}...`)
      await client.sync.services(SYNC_SVC_SID)
        .syncMaps
        .create({uniqueName: name})
        .then(syncMap => console.log(syncMap.sid));
  },

  async addKVtoSyncMap(client, SYNC_SVC_SID, syncMapID, key, value) {
    const data = { "data": value }
    await client.sync.services(SYNC_SVC_SID)
          .syncMaps(syncMapID)
          .syncMapItems
          .create({key: key, data: data})
          .then(sync_map_item => console.log(`Added kv "${key}":"${value}"`));
    },

    async getValFromSyncMap(client, SYNC_SVC_SID, syncMapID, key) {
      console.log(`retrieving ${key}...`)
      let val;

      await client.sync.services(SYNC_SVC_SID)
            .syncMaps(syncMapID)
            .syncMapItems(key)
            .fetch()
            .then(function(x) {
              val = x.data //this is probably incorrect
            });

          console.log(`got val ${val.data}`)

      return val.data
      }

}
