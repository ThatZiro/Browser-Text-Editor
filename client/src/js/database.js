import { openDB } from 'idb';

const initdb = async () =>
  openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('textEditor database already exists');
        return;
      }
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textEditorDb = await openDB("textEditor", 1);
  const text = textEditorDb.transaction("textEditor", "readwrite");
  const store = text.objectStore("textEditor");
  const request = store.put({id: 1, textEditor: content});
  const result = await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textEditorDb = await openDB("textEditor", 1);
  const text = textEditorDb.transaction("textEditor", "readonly");
  const store = text.objectStore("textEditor");
  const request = store.get(1);
  const result = await request;
  return result?.textEditor;
};

initdb().then(r => console.log('textEditor database created'));
