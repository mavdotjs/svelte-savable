import type { Writable, StartStopNotifier, Unsubscriber } from 'svelte/types/runtime/store';
/**
 * @author maverick-dev-55
 * @description attach a writable to localstorage
 * @example <caption>Intended and working usage</caption>
 * import { onMount } from 'svelte';
 * import { writable } from 'svelte/store';
 * const store = writable(); // or import your writable
 * import savewritable from '$lib/savewritable';
 * onMount(()=>{
 *      savewritable(store)
 * }
 * @param writable The writable you want to save
 * @param key The localstorage key you want to save the writable as. default is 'store'
 */
declare const attach: (thiswritable: Writable<unknown>, key?: string) => void;
interface TSavable<T> extends Writable<T> {
    mount(localstore: Storage): void;
    dismount(localstore: Storage): JSON;
    unsub: Unsubscriber;
    mounted?: boolean;
}
/**
 * @author maverick-dev-55
 * @description create a savable, a writable with a built in mount function, similar to attach
 * @example <caption>Intended and working usage</caption>
 * import { onMount } from 'svelte';
 * import savable from 'svelte/store';
 * const store = savable('todos', {});
 * import savewritable from '$lib/savewritable';
 * onMount(()=>{
 *      store.mount()
 *      //after already mounted you can dismount
 *      store.dismount()
 * }
 * @param key Local Storage key
 * @param value value? in writable
 * @param start start? in writable
 * @returns {TSavable<T>}
 */
declare function savable<T>(key: string, value?: T, start?: StartStopNotifier<T>): TSavable<T>;
export { attach, savable };
export default savable;
