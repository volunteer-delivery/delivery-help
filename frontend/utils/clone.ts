export function clone<Object extends object>(obj: Object): Object {
    return JSON.parse(JSON.stringify(obj));
}
