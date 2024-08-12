
export type NotNull<T> = T extends null | undefined ? never : T;
