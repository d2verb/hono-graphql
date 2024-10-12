declare const __newtype: unique symbol;

export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor;
};
