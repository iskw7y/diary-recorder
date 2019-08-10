import Vue from 'vue';
import { openDB, DBSchema } from 'idb';
import Home from './pages/home.vue';

interface DB extends DBSchema {
  counter: {
    key: string;
    value: number;
  };
}

async function main() {
  const db = await openDB<DB>('diary-recorder', 1, {
    upgrade(db) {
      db.createObjectStore('counter');
    },
  });
  const value = ((await db.get('counter', 'dummy')) || 0) + 1;
  await db.put('counter', value, 'dummy');
  console.log(value);
}

main();

new Vue({
  el: '#app',
  render: (h) => h(Home),
});
