interface WeakState<K, V> {
    get(key: K): V | null;
    set(key: K, value: Partial<V>): void;
    delete(key: K): void
}

export function useWeakState<K extends object, V extends object>(): WeakState<K, V> {
    const map = new WeakMap<K, V>();
    const get = (key: K): V | null => map.get(key) || null;
    const deleteKey = (key: K) => map.delete(key);

    const set = (key: K, value: Partial<V>) => map.set(key, {
        ...(get(key) || {}),
        ...value as V
    });

    return { get, set, delete: deleteKey };
}
