import Dexie from 'dexie';

export default class DexieService extends Dexie {
    constructor() {
        super('day-3-app');
        this.version(1).stores({ characters: '++id' });
    }
    listCharacters = () => this.characters.toArray();
    put = (character) => this.characters.put(character);
    delete = (id) => this.characters.delete(id);
}