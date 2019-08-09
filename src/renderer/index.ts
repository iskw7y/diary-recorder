import path from 'path';
import Vue from 'vue';
import sqlite from 'sqlite';
import Home from './pages/home.vue';

async function main(dir: string) {
  const filename = path.join(dir, 'diary-recorder.db');
  const db = await sqlite.open(filename);
  if ((await db.get(`SELECT name FROM sqlite_master WHERE name='counter'`)) == null) {
    await db.run(`CREATE TABLE counter (id TEXT, value INTEGER)`);
    await db.run(`INSERT INTO counter (id, value) VALUES ('dummy', 0)`);
  }
  await db.run(`UPDATE counter SET value=value+1 WHERE id='dummy'`);
  console.log(await db.get(`SELECT * FROM counter WHERE id='dummy'`));
}

main(process.env.PORTABLE_EXECUTABLE_DIR || '.');

new Vue({
  el: '#app',
  render: (h) => h(Home),
});
