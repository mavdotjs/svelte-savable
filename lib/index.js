"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savable = exports.attach = void 0;
var store_1 = require("svelte/store");
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
var attach = function (thiswritable, key) {
    if (key === void 0) { key = 'store'; }
    var json = localStorage.getItem(key);
    if (json) {
        thiswritable.set(JSON.parse(json));
    }
    thiswritable.subscribe(function (current) {
        localStorage.setItem(key, JSON.stringify(current));
    });
};
exports.attach = attach;
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
function savable(key, value, start) {
    var base = (0, store_1.writable)(value, start);
    return __assign(__assign({}, base), { mount: function (localstore) {
            if (this.mounted)
                throw new Error('Already mounted');
            this.mounted = true;
            var json = localstore.getItem(key);
            if (json) {
                base.set(JSON.parse(json));
            }
            this.unsub = base.subscribe(function (current) {
                localStorage.setItem(key, JSON.stringify(current));
            });
        }, dismount: function (localstore) {
            if (!this.mounted)
                throw new Error('Not mounted');
            var json = JSON.parse(localstore.getItem(key) || '{}');
            this.unsub();
            localstore.removeItem(key);
            return json;
        }, unsub: function () {
            throw new Error('Cannot unsubscribe when not subscribed');
        } });
}
exports.savable = savable;
exports.default = savable;
