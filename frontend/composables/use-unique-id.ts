interface IUniqueId {
    next(): string;
}

let counter = 0;

export function useUniqueId(scope: string): IUniqueId {
    return { next: () => [scope, ++counter].join('-') };
}
