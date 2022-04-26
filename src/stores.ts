import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

class UserStore {
  constructor(
    public id: Writable<string> = writable(''),
    public username: Writable<string> = writable(''),
    public college: Writable<string> = writable(''),
    public name: Writable<string> = writable(''),
    public token: Writable<string> = writable('')
  ) {}
}

export const userStore = new UserStore();

export default userStore;
