
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Driver
 * 
 */
export type Driver = {
  id: string
  telegramId: string | null
  name: string
  phone: string
}

/**
 * Model Ride
 * 
 */
export type Ride = {
  id: string
  departureTime: Date
  destinationId: string
  driverId: string
  fromId: string
  status: RideStatus
  vehicle: Vehicle
  volunteerId: string | null
}

/**
 * Model Address
 * 
 */
export type Address = {
  id: string
  city: string | null
  country: string
}

/**
 * Model RideComment
 * 
 */
export type RideComment = {
  id: string
  createdAt: Date
  text: string
  rideId: string
  authorId: string
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  password: string
  name: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const RideStatus: {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus]


export const Vehicle: {
  CAR: 'CAR',
  VAN: 'VAN',
  TRUCK: 'TRUCK'
};

export type Vehicle = (typeof Vehicle)[keyof typeof Vehicle]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Drivers
 * const drivers = await prisma.driver.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Drivers
   * const drivers = await prisma.driver.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<GlobalReject>;

  /**
   * `prisma.ride`: Exposes CRUD operations for the **Ride** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rides
    * const rides = await prisma.ride.findMany()
    * ```
    */
  get ride(): Prisma.RideDelegate<GlobalReject>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<GlobalReject>;

  /**
   * `prisma.rideComment`: Exposes CRUD operations for the **RideComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RideComments
    * const rideComments = await prisma.rideComment.findMany()
    * ```
    */
  get rideComment(): Prisma.RideCommentDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.0
   * Query Engine version: 694eea289a8462c80264df36757e4fdc129b1b32
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Driver: 'Driver',
    Ride: 'Ride',
    Address: 'Address',
    RideComment: 'RideComment',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DriverCountOutputType
   */


  export type DriverCountOutputType = {
    rides: number
  }

  export type DriverCountOutputTypeSelect = {
    rides?: boolean
  }

  export type DriverCountOutputTypeGetPayload<S extends boolean | null | undefined | DriverCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? DriverCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (DriverCountOutputTypeArgs)
    ? DriverCountOutputType 
    : S extends { select: any } & (DriverCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof DriverCountOutputType ? DriverCountOutputType[P] : never
  } 
      : DriverCountOutputType




  // Custom InputTypes

  /**
   * DriverCountOutputType without action
   */
  export type DriverCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DriverCountOutputType
     * 
    **/
    select?: DriverCountOutputTypeSelect | null
  }



  /**
   * Count Type RideCountOutputType
   */


  export type RideCountOutputType = {
    comments: number
  }

  export type RideCountOutputTypeSelect = {
    comments?: boolean
  }

  export type RideCountOutputTypeGetPayload<S extends boolean | null | undefined | RideCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? RideCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (RideCountOutputTypeArgs)
    ? RideCountOutputType 
    : S extends { select: any } & (RideCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof RideCountOutputType ? RideCountOutputType[P] : never
  } 
      : RideCountOutputType




  // Custom InputTypes

  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the RideCountOutputType
     * 
    **/
    select?: RideCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    rides: number
    rideComments: number
  }

  export type UserCountOutputTypeSelect = {
    rides?: boolean
    rideComments?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Driver
   */


  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    name: string | null
    phone: string | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    name: string | null
    phone: string | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    telegramId: number
    name: number
    phone: number
    _all: number
  }


  export type DriverMinAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
    _all?: true
  }

  export type DriverAggregateArgs = {
    /**
     * Filter which Driver to aggregate.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs = {
    where?: DriverWhereInput
    orderBy?: Enumerable<DriverOrderByWithAggregationInput>
    by: Array<DriverScalarFieldEnum>
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }


  export type DriverGroupByOutputType = {
    id: string
    telegramId: string | null
    name: string
    phone: string
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect = {
    id?: boolean
    telegramId?: boolean
    name?: boolean
    phone?: boolean
    rides?: boolean | DriverRidesArgs
    _count?: boolean | DriverCountOutputTypeArgs
  }


  export type DriverInclude = {
    rides?: boolean | DriverRidesArgs
    _count?: boolean | DriverCountOutputTypeArgs
  } 

  export type DriverGetPayload<S extends boolean | null | undefined | DriverArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Driver :
    S extends undefined ? never :
    S extends { include: any } & (DriverArgs | DriverFindManyArgs)
    ? Driver  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'rides' ? Array < RideGetPayload<S['include'][P]>>  :
        P extends '_count' ? DriverCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (DriverArgs | DriverFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'rides' ? Array < RideGetPayload<S['select'][P]>>  :
        P extends '_count' ? DriverCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Driver ? Driver[P] : never
  } 
      : Driver


  type DriverCountArgs = Merge<
    Omit<DriverFindManyArgs, 'select' | 'include'> & {
      select?: DriverCountAggregateInputType | true
    }
  >

  export interface DriverDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DriverFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DriverFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Driver'> extends True ? Prisma__DriverClient<DriverGetPayload<T>> : Prisma__DriverClient<DriverGetPayload<T> | null, null>

    /**
     * Find one Driver that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DriverFindUniqueOrThrowArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DriverFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DriverFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Driver'> extends True ? Prisma__DriverClient<DriverGetPayload<T>> : Prisma__DriverClient<DriverGetPayload<T> | null, null>

    /**
     * Find the first Driver that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DriverFindFirstOrThrowArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DriverFindManyArgs>(
      args?: SelectSubset<T, DriverFindManyArgs>
    ): PrismaPromise<Array<DriverGetPayload<T>>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
    **/
    create<T extends DriverCreateArgs>(
      args: SelectSubset<T, DriverCreateArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Create many Drivers.
     *     @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     *     @example
     *     // Create many Drivers
     *     const driver = await prisma.driver.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DriverCreateManyArgs>(
      args?: SelectSubset<T, DriverCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
    **/
    delete<T extends DriverDeleteArgs>(
      args: SelectSubset<T, DriverDeleteArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DriverUpdateArgs>(
      args: SelectSubset<T, DriverUpdateArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DriverDeleteManyArgs>(
      args?: SelectSubset<T, DriverDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DriverUpdateManyArgs>(
      args: SelectSubset<T, DriverUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
    **/
    upsert<T extends DriverUpsertArgs>(
      args: SelectSubset<T, DriverUpsertArgs>
    ): Prisma__DriverClient<DriverGetPayload<T>>

    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DriverClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    rides<T extends DriverRidesArgs= {}>(args?: Subset<T, DriverRidesArgs>): PrismaPromise<Array<RideGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Driver base type for findUnique actions
   */
  export type DriverFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUnique
   */
  export interface DriverFindUniqueArgs extends DriverFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where: DriverWhereUniqueInput
  }


  /**
   * Driver base type for findFirst actions
   */
  export type DriverFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     * 
    **/
    distinct?: Enumerable<DriverScalarFieldEnum>
  }

  /**
   * Driver findFirst
   */
  export interface DriverFindFirstArgs extends DriverFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Driver to fetch.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     * 
    **/
    distinct?: Enumerable<DriverScalarFieldEnum>
  }


  /**
   * Driver findMany
   */
  export type DriverFindManyArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter, which Drivers to fetch.
     * 
    **/
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     * 
    **/
    orderBy?: Enumerable<DriverOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     * 
    **/
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DriverScalarFieldEnum>
  }


  /**
   * Driver create
   */
  export type DriverCreateArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The data needed to create a Driver.
     * 
    **/
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }


  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs = {
    /**
     * The data used to create many Drivers.
     * 
    **/
    data: Enumerable<DriverCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Driver update
   */
  export type DriverUpdateArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The data needed to update a Driver.
     * 
    **/
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     * 
    **/
    where: DriverWhereUniqueInput
  }


  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs = {
    /**
     * The data used to update Drivers.
     * 
    **/
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     * 
    **/
    where?: DriverWhereInput
  }


  /**
   * Driver upsert
   */
  export type DriverUpsertArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * The filter to search for the Driver to update in case it exists.
     * 
    **/
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     * 
    **/
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }


  /**
   * Driver delete
   */
  export type DriverDeleteArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
    /**
     * Filter which Driver to delete.
     * 
    **/
    where: DriverWhereUniqueInput
  }


  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs = {
    /**
     * Filter which Drivers to delete
     * 
    **/
    where?: DriverWhereInput
  }


  /**
   * Driver.rides
   */
  export type DriverRidesArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    where?: RideWhereInput
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RideScalarFieldEnum>
  }


  /**
   * Driver without action
   */
  export type DriverArgs = {
    /**
     * Select specific fields to fetch from the Driver
     * 
    **/
    select?: DriverSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DriverInclude | null
  }



  /**
   * Model Ride
   */


  export type AggregateRide = {
    _count: RideCountAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  export type RideMinAggregateOutputType = {
    id: string | null
    departureTime: Date | null
    destinationId: string | null
    driverId: string | null
    fromId: string | null
    status: RideStatus | null
    vehicle: Vehicle | null
    volunteerId: string | null
  }

  export type RideMaxAggregateOutputType = {
    id: string | null
    departureTime: Date | null
    destinationId: string | null
    driverId: string | null
    fromId: string | null
    status: RideStatus | null
    vehicle: Vehicle | null
    volunteerId: string | null
  }

  export type RideCountAggregateOutputType = {
    id: number
    departureTime: number
    destinationId: number
    driverId: number
    fromId: number
    status: number
    vehicle: number
    volunteerId: number
    _all: number
  }


  export type RideMinAggregateInputType = {
    id?: true
    departureTime?: true
    destinationId?: true
    driverId?: true
    fromId?: true
    status?: true
    vehicle?: true
    volunteerId?: true
  }

  export type RideMaxAggregateInputType = {
    id?: true
    departureTime?: true
    destinationId?: true
    driverId?: true
    fromId?: true
    status?: true
    vehicle?: true
    volunteerId?: true
  }

  export type RideCountAggregateInputType = {
    id?: true
    departureTime?: true
    destinationId?: true
    driverId?: true
    fromId?: true
    status?: true
    vehicle?: true
    volunteerId?: true
    _all?: true
  }

  export type RideAggregateArgs = {
    /**
     * Filter which Ride to aggregate.
     * 
    **/
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     * 
    **/
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rides
    **/
    _count?: true | RideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideMaxAggregateInputType
  }

  export type GetRideAggregateType<T extends RideAggregateArgs> = {
        [P in keyof T & keyof AggregateRide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRide[P]>
      : GetScalarType<T[P], AggregateRide[P]>
  }




  export type RideGroupByArgs = {
    where?: RideWhereInput
    orderBy?: Enumerable<RideOrderByWithAggregationInput>
    by: Array<RideScalarFieldEnum>
    having?: RideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideCountAggregateInputType | true
    _min?: RideMinAggregateInputType
    _max?: RideMaxAggregateInputType
  }


  export type RideGroupByOutputType = {
    id: string
    departureTime: Date
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    volunteerId: string | null
    _count: RideCountAggregateOutputType | null
    _min: RideMinAggregateOutputType | null
    _max: RideMaxAggregateOutputType | null
  }

  type GetRideGroupByPayload<T extends RideGroupByArgs> = PrismaPromise<
    Array<
      PickArray<RideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideGroupByOutputType[P]>
            : GetScalarType<T[P], RideGroupByOutputType[P]>
        }
      >
    >


  export type RideSelect = {
    id?: boolean
    departureTime?: boolean
    destination?: boolean | AddressArgs
    destinationId?: boolean
    driver?: boolean | DriverArgs
    driverId?: boolean
    from?: boolean | AddressArgs
    fromId?: boolean
    status?: boolean
    vehicle?: boolean
    comments?: boolean | RideCommentsArgs
    volunteer?: boolean | UserArgs
    volunteerId?: boolean
    _count?: boolean | RideCountOutputTypeArgs
  }


  export type RideInclude = {
    destination?: boolean | AddressArgs
    driver?: boolean | DriverArgs
    from?: boolean | AddressArgs
    comments?: boolean | RideCommentsArgs
    volunteer?: boolean | UserArgs
    _count?: boolean | RideCountOutputTypeArgs
  } 

  export type RideGetPayload<S extends boolean | null | undefined | RideArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Ride :
    S extends undefined ? never :
    S extends { include: any } & (RideArgs | RideFindManyArgs)
    ? Ride  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'destination' ? AddressGetPayload<S['include'][P]> :
        P extends 'driver' ? DriverGetPayload<S['include'][P]> :
        P extends 'from' ? AddressGetPayload<S['include'][P]> :
        P extends 'comments' ? Array < RideCommentGetPayload<S['include'][P]>>  :
        P extends 'volunteer' ? UserGetPayload<S['include'][P]> | null :
        P extends '_count' ? RideCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (RideArgs | RideFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'destination' ? AddressGetPayload<S['select'][P]> :
        P extends 'driver' ? DriverGetPayload<S['select'][P]> :
        P extends 'from' ? AddressGetPayload<S['select'][P]> :
        P extends 'comments' ? Array < RideCommentGetPayload<S['select'][P]>>  :
        P extends 'volunteer' ? UserGetPayload<S['select'][P]> | null :
        P extends '_count' ? RideCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Ride ? Ride[P] : never
  } 
      : Ride


  type RideCountArgs = Merge<
    Omit<RideFindManyArgs, 'select' | 'include'> & {
      select?: RideCountAggregateInputType | true
    }
  >

  export interface RideDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Ride that matches the filter.
     * @param {RideFindUniqueArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RideFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RideFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Ride'> extends True ? Prisma__RideClient<RideGetPayload<T>> : Prisma__RideClient<RideGetPayload<T> | null, null>

    /**
     * Find one Ride that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RideFindUniqueOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RideFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, RideFindUniqueOrThrowArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Find the first Ride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RideFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RideFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Ride'> extends True ? Prisma__RideClient<RideGetPayload<T>> : Prisma__RideClient<RideGetPayload<T> | null, null>

    /**
     * Find the first Ride that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RideFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RideFindFirstOrThrowArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Find zero or more Rides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rides
     * const rides = await prisma.ride.findMany()
     * 
     * // Get first 10 Rides
     * const rides = await prisma.ride.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideWithIdOnly = await prisma.ride.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RideFindManyArgs>(
      args?: SelectSubset<T, RideFindManyArgs>
    ): PrismaPromise<Array<RideGetPayload<T>>>

    /**
     * Create a Ride.
     * @param {RideCreateArgs} args - Arguments to create a Ride.
     * @example
     * // Create one Ride
     * const Ride = await prisma.ride.create({
     *   data: {
     *     // ... data to create a Ride
     *   }
     * })
     * 
    **/
    create<T extends RideCreateArgs>(
      args: SelectSubset<T, RideCreateArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Create many Rides.
     *     @param {RideCreateManyArgs} args - Arguments to create many Rides.
     *     @example
     *     // Create many Rides
     *     const ride = await prisma.ride.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RideCreateManyArgs>(
      args?: SelectSubset<T, RideCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Ride.
     * @param {RideDeleteArgs} args - Arguments to delete one Ride.
     * @example
     * // Delete one Ride
     * const Ride = await prisma.ride.delete({
     *   where: {
     *     // ... filter to delete one Ride
     *   }
     * })
     * 
    **/
    delete<T extends RideDeleteArgs>(
      args: SelectSubset<T, RideDeleteArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Update one Ride.
     * @param {RideUpdateArgs} args - Arguments to update one Ride.
     * @example
     * // Update one Ride
     * const ride = await prisma.ride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RideUpdateArgs>(
      args: SelectSubset<T, RideUpdateArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Delete zero or more Rides.
     * @param {RideDeleteManyArgs} args - Arguments to filter Rides to delete.
     * @example
     * // Delete a few Rides
     * const { count } = await prisma.ride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RideDeleteManyArgs>(
      args?: SelectSubset<T, RideDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RideUpdateManyArgs>(
      args: SelectSubset<T, RideUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Ride.
     * @param {RideUpsertArgs} args - Arguments to update or create a Ride.
     * @example
     * // Update or create a Ride
     * const ride = await prisma.ride.upsert({
     *   create: {
     *     // ... data to create a Ride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ride we want to update
     *   }
     * })
    **/
    upsert<T extends RideUpsertArgs>(
      args: SelectSubset<T, RideUpsertArgs>
    ): Prisma__RideClient<RideGetPayload<T>>

    /**
     * Count the number of Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCountArgs} args - Arguments to filter Rides to count.
     * @example
     * // Count the number of Rides
     * const count = await prisma.ride.count({
     *   where: {
     *     // ... the filter for the Rides we want to count
     *   }
     * })
    **/
    count<T extends RideCountArgs>(
      args?: Subset<T, RideCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideAggregateArgs>(args: Subset<T, RideAggregateArgs>): PrismaPromise<GetRideAggregateType<T>>

    /**
     * Group by Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideGroupByArgs['orderBy'] }
        : { orderBy?: RideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Ride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RideClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    destination<T extends AddressArgs= {}>(args?: Subset<T, AddressArgs>): Prisma__AddressClient<AddressGetPayload<T> | Null>;

    driver<T extends DriverArgs= {}>(args?: Subset<T, DriverArgs>): Prisma__DriverClient<DriverGetPayload<T> | Null>;

    from<T extends AddressArgs= {}>(args?: Subset<T, AddressArgs>): Prisma__AddressClient<AddressGetPayload<T> | Null>;

    comments<T extends RideCommentsArgs= {}>(args?: Subset<T, RideCommentsArgs>): PrismaPromise<Array<RideCommentGetPayload<T>>| Null>;

    volunteer<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Ride base type for findUnique actions
   */
  export type RideFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter, which Ride to fetch.
     * 
    **/
    where: RideWhereUniqueInput
  }

  /**
   * Ride findUnique
   */
  export interface RideFindUniqueArgs extends RideFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ride findUniqueOrThrow
   */
  export type RideFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter, which Ride to fetch.
     * 
    **/
    where: RideWhereUniqueInput
  }


  /**
   * Ride base type for findFirst actions
   */
  export type RideFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter, which Ride to fetch.
     * 
    **/
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     * 
    **/
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     * 
    **/
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     * 
    **/
    distinct?: Enumerable<RideScalarFieldEnum>
  }

  /**
   * Ride findFirst
   */
  export interface RideFindFirstArgs extends RideFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ride findFirstOrThrow
   */
  export type RideFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter, which Ride to fetch.
     * 
    **/
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     * 
    **/
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rides.
     * 
    **/
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rides.
     * 
    **/
    distinct?: Enumerable<RideScalarFieldEnum>
  }


  /**
   * Ride findMany
   */
  export type RideFindManyArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter, which Rides to fetch.
     * 
    **/
    where?: RideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rides to fetch.
     * 
    **/
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rides.
     * 
    **/
    cursor?: RideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rides from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rides.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RideScalarFieldEnum>
  }


  /**
   * Ride create
   */
  export type RideCreateArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * The data needed to create a Ride.
     * 
    **/
    data: XOR<RideCreateInput, RideUncheckedCreateInput>
  }


  /**
   * Ride createMany
   */
  export type RideCreateManyArgs = {
    /**
     * The data used to create many Rides.
     * 
    **/
    data: Enumerable<RideCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Ride update
   */
  export type RideUpdateArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * The data needed to update a Ride.
     * 
    **/
    data: XOR<RideUpdateInput, RideUncheckedUpdateInput>
    /**
     * Choose, which Ride to update.
     * 
    **/
    where: RideWhereUniqueInput
  }


  /**
   * Ride updateMany
   */
  export type RideUpdateManyArgs = {
    /**
     * The data used to update Rides.
     * 
    **/
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>
    /**
     * Filter which Rides to update
     * 
    **/
    where?: RideWhereInput
  }


  /**
   * Ride upsert
   */
  export type RideUpsertArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * The filter to search for the Ride to update in case it exists.
     * 
    **/
    where: RideWhereUniqueInput
    /**
     * In case the Ride found by the `where` argument doesn't exist, create a new Ride with this data.
     * 
    **/
    create: XOR<RideCreateInput, RideUncheckedCreateInput>
    /**
     * In case the Ride was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RideUpdateInput, RideUncheckedUpdateInput>
  }


  /**
   * Ride delete
   */
  export type RideDeleteArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    /**
     * Filter which Ride to delete.
     * 
    **/
    where: RideWhereUniqueInput
  }


  /**
   * Ride deleteMany
   */
  export type RideDeleteManyArgs = {
    /**
     * Filter which Rides to delete
     * 
    **/
    where?: RideWhereInput
  }


  /**
   * Ride.comments
   */
  export type RideCommentsArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    where?: RideCommentWhereInput
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    cursor?: RideCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RideCommentScalarFieldEnum>
  }


  /**
   * Ride without action
   */
  export type RideArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
  }



  /**
   * Model Address
   */


  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    city: string | null
    country: string | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    city: string | null
    country: string | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    city: number
    country: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    city?: true
    country?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    city?: true
    country?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    city?: true
    country?: true
    _all?: true
  }

  export type AddressAggregateArgs = {
    /**
     * Filter which Address to aggregate.
     * 
    **/
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<AddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs = {
    where?: AddressWhereInput
    orderBy?: Enumerable<AddressOrderByWithAggregationInput>
    by: Array<AddressScalarFieldEnum>
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }


  export type AddressGroupByOutputType = {
    id: string
    city: string | null
    country: string
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect = {
    id?: boolean
    city?: boolean
    country?: boolean
    rideDestination?: boolean | RideArgs
    rideAdress?: boolean | RideArgs
  }


  export type AddressInclude = {
    rideDestination?: boolean | RideArgs
    rideAdress?: boolean | RideArgs
  } 

  export type AddressGetPayload<S extends boolean | null | undefined | AddressArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Address :
    S extends undefined ? never :
    S extends { include: any } & (AddressArgs | AddressFindManyArgs)
    ? Address  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'rideDestination' ? RideGetPayload<S['include'][P]> | null :
        P extends 'rideAdress' ? RideGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (AddressArgs | AddressFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'rideDestination' ? RideGetPayload<S['select'][P]> | null :
        P extends 'rideAdress' ? RideGetPayload<S['select'][P]> | null :  P extends keyof Address ? Address[P] : never
  } 
      : Address


  type AddressCountArgs = Merge<
    Omit<AddressFindManyArgs, 'select' | 'include'> & {
      select?: AddressCountAggregateInputType | true
    }
  >

  export interface AddressDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AddressFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AddressFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Address'> extends True ? Prisma__AddressClient<AddressGetPayload<T>> : Prisma__AddressClient<AddressGetPayload<T> | null, null>

    /**
     * Find one Address that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AddressFindUniqueOrThrowArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AddressFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AddressFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Address'> extends True ? Prisma__AddressClient<AddressGetPayload<T>> : Prisma__AddressClient<AddressGetPayload<T> | null, null>

    /**
     * Find the first Address that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AddressFindFirstOrThrowArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AddressFindManyArgs>(
      args?: SelectSubset<T, AddressFindManyArgs>
    ): PrismaPromise<Array<AddressGetPayload<T>>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
    **/
    create<T extends AddressCreateArgs>(
      args: SelectSubset<T, AddressCreateArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Create many Addresses.
     *     @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     *     @example
     *     // Create many Addresses
     *     const address = await prisma.address.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AddressCreateManyArgs>(
      args?: SelectSubset<T, AddressCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
    **/
    delete<T extends AddressDeleteArgs>(
      args: SelectSubset<T, AddressDeleteArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AddressUpdateArgs>(
      args: SelectSubset<T, AddressUpdateArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AddressDeleteManyArgs>(
      args?: SelectSubset<T, AddressDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AddressUpdateManyArgs>(
      args: SelectSubset<T, AddressUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
    **/
    upsert<T extends AddressUpsertArgs>(
      args: SelectSubset<T, AddressUpsertArgs>
    ): Prisma__AddressClient<AddressGetPayload<T>>

    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AddressClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    rideDestination<T extends RideArgs= {}>(args?: Subset<T, RideArgs>): Prisma__RideClient<RideGetPayload<T> | Null>;

    rideAdress<T extends RideArgs= {}>(args?: Subset<T, RideArgs>): Prisma__RideClient<RideGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Address base type for findUnique actions
   */
  export type AddressFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter, which Address to fetch.
     * 
    **/
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUnique
   */
  export interface AddressFindUniqueArgs extends AddressFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter, which Address to fetch.
     * 
    **/
    where: AddressWhereUniqueInput
  }


  /**
   * Address base type for findFirst actions
   */
  export type AddressFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter, which Address to fetch.
     * 
    **/
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<AddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     * 
    **/
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     * 
    **/
    distinct?: Enumerable<AddressScalarFieldEnum>
  }

  /**
   * Address findFirst
   */
  export interface AddressFindFirstArgs extends AddressFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter, which Address to fetch.
     * 
    **/
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<AddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     * 
    **/
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     * 
    **/
    distinct?: Enumerable<AddressScalarFieldEnum>
  }


  /**
   * Address findMany
   */
  export type AddressFindManyArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter, which Addresses to fetch.
     * 
    **/
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     * 
    **/
    orderBy?: Enumerable<AddressOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     * 
    **/
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AddressScalarFieldEnum>
  }


  /**
   * Address create
   */
  export type AddressCreateArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * The data needed to create a Address.
     * 
    **/
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }


  /**
   * Address createMany
   */
  export type AddressCreateManyArgs = {
    /**
     * The data used to create many Addresses.
     * 
    **/
    data: Enumerable<AddressCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Address update
   */
  export type AddressUpdateArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * The data needed to update a Address.
     * 
    **/
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     * 
    **/
    where: AddressWhereUniqueInput
  }


  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs = {
    /**
     * The data used to update Addresses.
     * 
    **/
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     * 
    **/
    where?: AddressWhereInput
  }


  /**
   * Address upsert
   */
  export type AddressUpsertArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * The filter to search for the Address to update in case it exists.
     * 
    **/
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     * 
    **/
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }


  /**
   * Address delete
   */
  export type AddressDeleteArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
    /**
     * Filter which Address to delete.
     * 
    **/
    where: AddressWhereUniqueInput
  }


  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs = {
    /**
     * Filter which Addresses to delete
     * 
    **/
    where?: AddressWhereInput
  }


  /**
   * Address without action
   */
  export type AddressArgs = {
    /**
     * Select specific fields to fetch from the Address
     * 
    **/
    select?: AddressSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AddressInclude | null
  }



  /**
   * Model RideComment
   */


  export type AggregateRideComment = {
    _count: RideCommentCountAggregateOutputType | null
    _min: RideCommentMinAggregateOutputType | null
    _max: RideCommentMaxAggregateOutputType | null
  }

  export type RideCommentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    text: string | null
    rideId: string | null
    authorId: string | null
  }

  export type RideCommentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    text: string | null
    rideId: string | null
    authorId: string | null
  }

  export type RideCommentCountAggregateOutputType = {
    id: number
    createdAt: number
    text: number
    rideId: number
    authorId: number
    _all: number
  }


  export type RideCommentMinAggregateInputType = {
    id?: true
    createdAt?: true
    text?: true
    rideId?: true
    authorId?: true
  }

  export type RideCommentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    text?: true
    rideId?: true
    authorId?: true
  }

  export type RideCommentCountAggregateInputType = {
    id?: true
    createdAt?: true
    text?: true
    rideId?: true
    authorId?: true
    _all?: true
  }

  export type RideCommentAggregateArgs = {
    /**
     * Filter which RideComment to aggregate.
     * 
    **/
    where?: RideCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideComments to fetch.
     * 
    **/
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RideCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideComments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RideComments
    **/
    _count?: true | RideCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RideCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RideCommentMaxAggregateInputType
  }

  export type GetRideCommentAggregateType<T extends RideCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateRideComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRideComment[P]>
      : GetScalarType<T[P], AggregateRideComment[P]>
  }




  export type RideCommentGroupByArgs = {
    where?: RideCommentWhereInput
    orderBy?: Enumerable<RideCommentOrderByWithAggregationInput>
    by: Array<RideCommentScalarFieldEnum>
    having?: RideCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RideCommentCountAggregateInputType | true
    _min?: RideCommentMinAggregateInputType
    _max?: RideCommentMaxAggregateInputType
  }


  export type RideCommentGroupByOutputType = {
    id: string
    createdAt: Date
    text: string
    rideId: string
    authorId: string
    _count: RideCommentCountAggregateOutputType | null
    _min: RideCommentMinAggregateOutputType | null
    _max: RideCommentMaxAggregateOutputType | null
  }

  type GetRideCommentGroupByPayload<T extends RideCommentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<RideCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RideCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideCommentGroupByOutputType[P]>
            : GetScalarType<T[P], RideCommentGroupByOutputType[P]>
        }
      >
    >


  export type RideCommentSelect = {
    id?: boolean
    createdAt?: boolean
    text?: boolean
    ride?: boolean | RideArgs
    rideId?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
  }


  export type RideCommentInclude = {
    ride?: boolean | RideArgs
    author?: boolean | UserArgs
  } 

  export type RideCommentGetPayload<S extends boolean | null | undefined | RideCommentArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? RideComment :
    S extends undefined ? never :
    S extends { include: any } & (RideCommentArgs | RideCommentFindManyArgs)
    ? RideComment  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ride' ? RideGetPayload<S['include'][P]> :
        P extends 'author' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (RideCommentArgs | RideCommentFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ride' ? RideGetPayload<S['select'][P]> :
        P extends 'author' ? UserGetPayload<S['select'][P]> :  P extends keyof RideComment ? RideComment[P] : never
  } 
      : RideComment


  type RideCommentCountArgs = Merge<
    Omit<RideCommentFindManyArgs, 'select' | 'include'> & {
      select?: RideCommentCountAggregateInputType | true
    }
  >

  export interface RideCommentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one RideComment that matches the filter.
     * @param {RideCommentFindUniqueArgs} args - Arguments to find a RideComment
     * @example
     * // Get one RideComment
     * const rideComment = await prisma.rideComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RideCommentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RideCommentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'RideComment'> extends True ? Prisma__RideCommentClient<RideCommentGetPayload<T>> : Prisma__RideCommentClient<RideCommentGetPayload<T> | null, null>

    /**
     * Find one RideComment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RideCommentFindUniqueOrThrowArgs} args - Arguments to find a RideComment
     * @example
     * // Get one RideComment
     * const rideComment = await prisma.rideComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RideCommentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, RideCommentFindUniqueOrThrowArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Find the first RideComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentFindFirstArgs} args - Arguments to find a RideComment
     * @example
     * // Get one RideComment
     * const rideComment = await prisma.rideComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RideCommentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RideCommentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'RideComment'> extends True ? Prisma__RideCommentClient<RideCommentGetPayload<T>> : Prisma__RideCommentClient<RideCommentGetPayload<T> | null, null>

    /**
     * Find the first RideComment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentFindFirstOrThrowArgs} args - Arguments to find a RideComment
     * @example
     * // Get one RideComment
     * const rideComment = await prisma.rideComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RideCommentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RideCommentFindFirstOrThrowArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Find zero or more RideComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RideComments
     * const rideComments = await prisma.rideComment.findMany()
     * 
     * // Get first 10 RideComments
     * const rideComments = await prisma.rideComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rideCommentWithIdOnly = await prisma.rideComment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RideCommentFindManyArgs>(
      args?: SelectSubset<T, RideCommentFindManyArgs>
    ): PrismaPromise<Array<RideCommentGetPayload<T>>>

    /**
     * Create a RideComment.
     * @param {RideCommentCreateArgs} args - Arguments to create a RideComment.
     * @example
     * // Create one RideComment
     * const RideComment = await prisma.rideComment.create({
     *   data: {
     *     // ... data to create a RideComment
     *   }
     * })
     * 
    **/
    create<T extends RideCommentCreateArgs>(
      args: SelectSubset<T, RideCommentCreateArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Create many RideComments.
     *     @param {RideCommentCreateManyArgs} args - Arguments to create many RideComments.
     *     @example
     *     // Create many RideComments
     *     const rideComment = await prisma.rideComment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RideCommentCreateManyArgs>(
      args?: SelectSubset<T, RideCommentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a RideComment.
     * @param {RideCommentDeleteArgs} args - Arguments to delete one RideComment.
     * @example
     * // Delete one RideComment
     * const RideComment = await prisma.rideComment.delete({
     *   where: {
     *     // ... filter to delete one RideComment
     *   }
     * })
     * 
    **/
    delete<T extends RideCommentDeleteArgs>(
      args: SelectSubset<T, RideCommentDeleteArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Update one RideComment.
     * @param {RideCommentUpdateArgs} args - Arguments to update one RideComment.
     * @example
     * // Update one RideComment
     * const rideComment = await prisma.rideComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RideCommentUpdateArgs>(
      args: SelectSubset<T, RideCommentUpdateArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Delete zero or more RideComments.
     * @param {RideCommentDeleteManyArgs} args - Arguments to filter RideComments to delete.
     * @example
     * // Delete a few RideComments
     * const { count } = await prisma.rideComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RideCommentDeleteManyArgs>(
      args?: SelectSubset<T, RideCommentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more RideComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RideComments
     * const rideComment = await prisma.rideComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RideCommentUpdateManyArgs>(
      args: SelectSubset<T, RideCommentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one RideComment.
     * @param {RideCommentUpsertArgs} args - Arguments to update or create a RideComment.
     * @example
     * // Update or create a RideComment
     * const rideComment = await prisma.rideComment.upsert({
     *   create: {
     *     // ... data to create a RideComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RideComment we want to update
     *   }
     * })
    **/
    upsert<T extends RideCommentUpsertArgs>(
      args: SelectSubset<T, RideCommentUpsertArgs>
    ): Prisma__RideCommentClient<RideCommentGetPayload<T>>

    /**
     * Count the number of RideComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentCountArgs} args - Arguments to filter RideComments to count.
     * @example
     * // Count the number of RideComments
     * const count = await prisma.rideComment.count({
     *   where: {
     *     // ... the filter for the RideComments we want to count
     *   }
     * })
    **/
    count<T extends RideCommentCountArgs>(
      args?: Subset<T, RideCommentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RideCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RideComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideCommentAggregateArgs>(args: Subset<T, RideCommentAggregateArgs>): PrismaPromise<GetRideCommentAggregateType<T>>

    /**
     * Group by RideComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RideCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideCommentGroupByArgs['orderBy'] }
        : { orderBy?: RideCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RideCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideCommentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for RideComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RideCommentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ride<T extends RideArgs= {}>(args?: Subset<T, RideArgs>): Prisma__RideClient<RideGetPayload<T> | Null>;

    author<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * RideComment base type for findUnique actions
   */
  export type RideCommentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter, which RideComment to fetch.
     * 
    **/
    where: RideCommentWhereUniqueInput
  }

  /**
   * RideComment findUnique
   */
  export interface RideCommentFindUniqueArgs extends RideCommentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RideComment findUniqueOrThrow
   */
  export type RideCommentFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter, which RideComment to fetch.
     * 
    **/
    where: RideCommentWhereUniqueInput
  }


  /**
   * RideComment base type for findFirst actions
   */
  export type RideCommentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter, which RideComment to fetch.
     * 
    **/
    where?: RideCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideComments to fetch.
     * 
    **/
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideComments.
     * 
    **/
    cursor?: RideCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideComments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideComments.
     * 
    **/
    distinct?: Enumerable<RideCommentScalarFieldEnum>
  }

  /**
   * RideComment findFirst
   */
  export interface RideCommentFindFirstArgs extends RideCommentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * RideComment findFirstOrThrow
   */
  export type RideCommentFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter, which RideComment to fetch.
     * 
    **/
    where?: RideCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideComments to fetch.
     * 
    **/
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RideComments.
     * 
    **/
    cursor?: RideCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideComments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RideComments.
     * 
    **/
    distinct?: Enumerable<RideCommentScalarFieldEnum>
  }


  /**
   * RideComment findMany
   */
  export type RideCommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter, which RideComments to fetch.
     * 
    **/
    where?: RideCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RideComments to fetch.
     * 
    **/
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RideComments.
     * 
    **/
    cursor?: RideCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RideComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RideComments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RideCommentScalarFieldEnum>
  }


  /**
   * RideComment create
   */
  export type RideCommentCreateArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * The data needed to create a RideComment.
     * 
    **/
    data: XOR<RideCommentCreateInput, RideCommentUncheckedCreateInput>
  }


  /**
   * RideComment createMany
   */
  export type RideCommentCreateManyArgs = {
    /**
     * The data used to create many RideComments.
     * 
    **/
    data: Enumerable<RideCommentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * RideComment update
   */
  export type RideCommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * The data needed to update a RideComment.
     * 
    **/
    data: XOR<RideCommentUpdateInput, RideCommentUncheckedUpdateInput>
    /**
     * Choose, which RideComment to update.
     * 
    **/
    where: RideCommentWhereUniqueInput
  }


  /**
   * RideComment updateMany
   */
  export type RideCommentUpdateManyArgs = {
    /**
     * The data used to update RideComments.
     * 
    **/
    data: XOR<RideCommentUpdateManyMutationInput, RideCommentUncheckedUpdateManyInput>
    /**
     * Filter which RideComments to update
     * 
    **/
    where?: RideCommentWhereInput
  }


  /**
   * RideComment upsert
   */
  export type RideCommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * The filter to search for the RideComment to update in case it exists.
     * 
    **/
    where: RideCommentWhereUniqueInput
    /**
     * In case the RideComment found by the `where` argument doesn't exist, create a new RideComment with this data.
     * 
    **/
    create: XOR<RideCommentCreateInput, RideCommentUncheckedCreateInput>
    /**
     * In case the RideComment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RideCommentUpdateInput, RideCommentUncheckedUpdateInput>
  }


  /**
   * RideComment delete
   */
  export type RideCommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    /**
     * Filter which RideComment to delete.
     * 
    **/
    where: RideCommentWhereUniqueInput
  }


  /**
   * RideComment deleteMany
   */
  export type RideCommentDeleteManyArgs = {
    /**
     * Filter which RideComments to delete
     * 
    **/
    where?: RideCommentWhereInput
  }


  /**
   * RideComment without action
   */
  export type RideCommentArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    password: string | null
    name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    password: string | null
    name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    password: number
    name: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    password?: true
    name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    password?: true
    name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    password?: true
    name?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    password: string
    name: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    password?: boolean
    name?: boolean
    rides?: boolean | UserRidesArgs
    rideComments?: boolean | UserRideCommentsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    rides?: boolean | UserRidesArgs
    rideComments?: boolean | UserRideCommentsArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'rides' ? Array < RideGetPayload<S['include'][P]>>  :
        P extends 'rideComments' ? Array < RideCommentGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'rides' ? Array < RideGetPayload<S['select'][P]>>  :
        P extends 'rideComments' ? Array < RideCommentGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    rides<T extends UserRidesArgs= {}>(args?: Subset<T, UserRidesArgs>): PrismaPromise<Array<RideGetPayload<T>>| Null>;

    rideComments<T extends UserRideCommentsArgs= {}>(args?: Subset<T, UserRideCommentsArgs>): PrismaPromise<Array<RideCommentGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User.rides
   */
  export type UserRidesArgs = {
    /**
     * Select specific fields to fetch from the Ride
     * 
    **/
    select?: RideSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideInclude | null
    where?: RideWhereInput
    orderBy?: Enumerable<RideOrderByWithRelationInput>
    cursor?: RideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RideScalarFieldEnum>
  }


  /**
   * User.rideComments
   */
  export type UserRideCommentsArgs = {
    /**
     * Select specific fields to fetch from the RideComment
     * 
    **/
    select?: RideCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RideCommentInclude | null
    where?: RideCommentWhereInput
    orderBy?: Enumerable<RideCommentOrderByWithRelationInput>
    cursor?: RideCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RideCommentScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AddressScalarFieldEnum: {
    id: 'id',
    city: 'city',
    country: 'country'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const DriverScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    name: 'name',
    phone: 'phone'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const RideCommentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    text: 'text',
    rideId: 'rideId',
    authorId: 'authorId'
  };

  export type RideCommentScalarFieldEnum = (typeof RideCommentScalarFieldEnum)[keyof typeof RideCommentScalarFieldEnum]


  export const RideScalarFieldEnum: {
    id: 'id',
    departureTime: 'departureTime',
    destinationId: 'destinationId',
    driverId: 'driverId',
    fromId: 'fromId',
    status: 'status',
    vehicle: 'vehicle',
    volunteerId: 'volunteerId'
  };

  export type RideScalarFieldEnum = (typeof RideScalarFieldEnum)[keyof typeof RideScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    password: 'password',
    name: 'name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type DriverWhereInput = {
    AND?: Enumerable<DriverWhereInput>
    OR?: Enumerable<DriverWhereInput>
    NOT?: Enumerable<DriverWhereInput>
    id?: StringFilter | string
    telegramId?: StringNullableFilter | string | null
    name?: StringFilter | string
    phone?: StringFilter | string
    rides?: RideListRelationFilter
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    rides?: RideOrderByRelationAggregateInput
  }

  export type DriverWhereUniqueInput = {
    id?: string
    telegramId?: string
  }

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DriverScalarWhereWithAggregatesInput>
    OR?: Enumerable<DriverScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DriverScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    telegramId?: StringNullableWithAggregatesFilter | string | null
    name?: StringWithAggregatesFilter | string
    phone?: StringWithAggregatesFilter | string
  }

  export type RideWhereInput = {
    AND?: Enumerable<RideWhereInput>
    OR?: Enumerable<RideWhereInput>
    NOT?: Enumerable<RideWhereInput>
    id?: StringFilter | string
    departureTime?: DateTimeFilter | Date | string
    destination?: XOR<AddressRelationFilter, AddressWhereInput>
    destinationId?: StringFilter | string
    driver?: XOR<DriverRelationFilter, DriverWhereInput>
    driverId?: StringFilter | string
    from?: XOR<AddressRelationFilter, AddressWhereInput>
    fromId?: StringFilter | string
    status?: EnumRideStatusFilter | RideStatus
    vehicle?: EnumVehicleFilter | Vehicle
    comments?: RideCommentListRelationFilter
    volunteer?: XOR<UserRelationFilter, UserWhereInput> | null
    volunteerId?: StringNullableFilter | string | null
  }

  export type RideOrderByWithRelationInput = {
    id?: SortOrder
    departureTime?: SortOrder
    destination?: AddressOrderByWithRelationInput
    destinationId?: SortOrder
    driver?: DriverOrderByWithRelationInput
    driverId?: SortOrder
    from?: AddressOrderByWithRelationInput
    fromId?: SortOrder
    status?: SortOrder
    vehicle?: SortOrder
    comments?: RideCommentOrderByRelationAggregateInput
    volunteer?: UserOrderByWithRelationInput
    volunteerId?: SortOrder
  }

  export type RideWhereUniqueInput = {
    id?: string
    destinationId?: string
    fromId?: string
  }

  export type RideOrderByWithAggregationInput = {
    id?: SortOrder
    departureTime?: SortOrder
    destinationId?: SortOrder
    driverId?: SortOrder
    fromId?: SortOrder
    status?: SortOrder
    vehicle?: SortOrder
    volunteerId?: SortOrder
    _count?: RideCountOrderByAggregateInput
    _max?: RideMaxOrderByAggregateInput
    _min?: RideMinOrderByAggregateInput
  }

  export type RideScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RideScalarWhereWithAggregatesInput>
    OR?: Enumerable<RideScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RideScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    departureTime?: DateTimeWithAggregatesFilter | Date | string
    destinationId?: StringWithAggregatesFilter | string
    driverId?: StringWithAggregatesFilter | string
    fromId?: StringWithAggregatesFilter | string
    status?: EnumRideStatusWithAggregatesFilter | RideStatus
    vehicle?: EnumVehicleWithAggregatesFilter | Vehicle
    volunteerId?: StringNullableWithAggregatesFilter | string | null
  }

  export type AddressWhereInput = {
    AND?: Enumerable<AddressWhereInput>
    OR?: Enumerable<AddressWhereInput>
    NOT?: Enumerable<AddressWhereInput>
    id?: StringFilter | string
    city?: StringNullableFilter | string | null
    country?: StringFilter | string
    rideDestination?: XOR<RideRelationFilter, RideWhereInput> | null
    rideAdress?: XOR<RideRelationFilter, RideWhereInput> | null
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    city?: SortOrder
    country?: SortOrder
    rideDestination?: RideOrderByWithRelationInput
    rideAdress?: RideOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = {
    id?: string
  }

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    city?: SortOrder
    country?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AddressScalarWhereWithAggregatesInput>
    OR?: Enumerable<AddressScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AddressScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    city?: StringNullableWithAggregatesFilter | string | null
    country?: StringWithAggregatesFilter | string
  }

  export type RideCommentWhereInput = {
    AND?: Enumerable<RideCommentWhereInput>
    OR?: Enumerable<RideCommentWhereInput>
    NOT?: Enumerable<RideCommentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    text?: StringFilter | string
    ride?: XOR<RideRelationFilter, RideWhereInput>
    rideId?: StringFilter | string
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: StringFilter | string
  }

  export type RideCommentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    text?: SortOrder
    ride?: RideOrderByWithRelationInput
    rideId?: SortOrder
    author?: UserOrderByWithRelationInput
    authorId?: SortOrder
  }

  export type RideCommentWhereUniqueInput = {
    id?: string
  }

  export type RideCommentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    text?: SortOrder
    rideId?: SortOrder
    authorId?: SortOrder
    _count?: RideCommentCountOrderByAggregateInput
    _max?: RideCommentMaxOrderByAggregateInput
    _min?: RideCommentMinOrderByAggregateInput
  }

  export type RideCommentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RideCommentScalarWhereWithAggregatesInput>
    OR?: Enumerable<RideCommentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RideCommentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    text?: StringWithAggregatesFilter | string
    rideId?: StringWithAggregatesFilter | string
    authorId?: StringWithAggregatesFilter | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    password?: StringFilter | string
    name?: StringFilter | string
    rides?: RideListRelationFilter
    rideComments?: RideCommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    password?: SortOrder
    name?: SortOrder
    rides?: RideOrderByRelationAggregateInput
    rideComments?: RideCommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    password?: SortOrder
    name?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
  }

  export type DriverCreateInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone: string
    rides?: RideCreateNestedManyWithoutDriverInput
  }

  export type DriverUncheckedCreateInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone: string
    rides?: RideUncheckedCreateNestedManyWithoutDriverInput
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    rides?: RideUpdateManyWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    rides?: RideUncheckedUpdateManyWithoutDriverNestedInput
  }

  export type DriverCreateManyInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone: string
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type RideCreateInput = {
    id?: string
    departureTime: Date | string
    destination: AddressCreateNestedOneWithoutRideDestinationInput
    driver: DriverCreateNestedOneWithoutRidesInput
    from: AddressCreateNestedOneWithoutRideAdressInput
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentCreateNestedManyWithoutRideInput
    volunteer?: UserCreateNestedOneWithoutRidesInput
  }

  export type RideUncheckedCreateInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentUncheckedCreateNestedManyWithoutRideInput
    volunteerId?: string | null
  }

  export type RideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: AddressUpdateOneRequiredWithoutRideDestinationNestedInput
    driver?: DriverUpdateOneRequiredWithoutRidesNestedInput
    from?: AddressUpdateOneRequiredWithoutRideAdressNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUpdateManyWithoutRideNestedInput
    volunteer?: UserUpdateOneWithoutRidesNestedInput
  }

  export type RideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUncheckedUpdateManyWithoutRideNestedInput
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RideCreateManyInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    volunteerId?: string | null
  }

  export type RideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
  }

  export type RideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressCreateInput = {
    id?: string
    city?: string | null
    country: string
    rideDestination?: RideCreateNestedOneWithoutDestinationInput
    rideAdress?: RideCreateNestedOneWithoutFromInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    city?: string | null
    country: string
    rideDestination?: RideUncheckedCreateNestedOneWithoutDestinationInput
    rideAdress?: RideUncheckedCreateNestedOneWithoutFromInput
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideDestination?: RideUpdateOneWithoutDestinationNestedInput
    rideAdress?: RideUpdateOneWithoutFromNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideDestination?: RideUncheckedUpdateOneWithoutDestinationNestedInput
    rideAdress?: RideUncheckedUpdateOneWithoutFromNestedInput
  }

  export type AddressCreateManyInput = {
    id?: string
    city?: string | null
    country: string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
  }

  export type RideCommentCreateInput = {
    id?: string
    createdAt?: Date | string
    text: string
    ride: RideCreateNestedOneWithoutCommentsInput
    author: UserCreateNestedOneWithoutRideCommentsInput
  }

  export type RideCommentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    text: string
    rideId: string
    authorId: string
  }

  export type RideCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    ride?: RideUpdateOneRequiredWithoutCommentsNestedInput
    author?: UserUpdateOneRequiredWithoutRideCommentsNestedInput
  }

  export type RideCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type RideCommentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    text: string
    rideId: string
    authorId: string
  }

  export type RideCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type RideCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    password: string
    name: string
    rides?: RideCreateNestedManyWithoutVolunteerInput
    rideComments?: RideCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    password: string
    name: string
    rides?: RideUncheckedCreateNestedManyWithoutVolunteerInput
    rideComments?: RideCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rides?: RideUpdateManyWithoutVolunteerNestedInput
    rideComments?: RideCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rides?: RideUncheckedUpdateManyWithoutVolunteerNestedInput
    rideComments?: RideCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    password: string
    name: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type RideListRelationFilter = {
    every?: RideWhereInput
    some?: RideWhereInput
    none?: RideWhereInput
  }

  export type RideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type AddressRelationFilter = {
    is?: AddressWhereInput
    isNot?: AddressWhereInput
  }

  export type DriverRelationFilter = {
    is?: DriverWhereInput
    isNot?: DriverWhereInput
  }

  export type EnumRideStatusFilter = {
    equals?: RideStatus
    in?: Enumerable<RideStatus>
    notIn?: Enumerable<RideStatus>
    not?: NestedEnumRideStatusFilter | RideStatus
  }

  export type EnumVehicleFilter = {
    equals?: Vehicle
    in?: Enumerable<Vehicle>
    notIn?: Enumerable<Vehicle>
    not?: NestedEnumVehicleFilter | Vehicle
  }

  export type RideCommentListRelationFilter = {
    every?: RideCommentWhereInput
    some?: RideCommentWhereInput
    none?: RideCommentWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RideCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RideCountOrderByAggregateInput = {
    id?: SortOrder
    departureTime?: SortOrder
    destinationId?: SortOrder
    driverId?: SortOrder
    fromId?: SortOrder
    status?: SortOrder
    vehicle?: SortOrder
    volunteerId?: SortOrder
  }

  export type RideMaxOrderByAggregateInput = {
    id?: SortOrder
    departureTime?: SortOrder
    destinationId?: SortOrder
    driverId?: SortOrder
    fromId?: SortOrder
    status?: SortOrder
    vehicle?: SortOrder
    volunteerId?: SortOrder
  }

  export type RideMinOrderByAggregateInput = {
    id?: SortOrder
    departureTime?: SortOrder
    destinationId?: SortOrder
    driverId?: SortOrder
    fromId?: SortOrder
    status?: SortOrder
    vehicle?: SortOrder
    volunteerId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EnumRideStatusWithAggregatesFilter = {
    equals?: RideStatus
    in?: Enumerable<RideStatus>
    notIn?: Enumerable<RideStatus>
    not?: NestedEnumRideStatusWithAggregatesFilter | RideStatus
    _count?: NestedIntFilter
    _min?: NestedEnumRideStatusFilter
    _max?: NestedEnumRideStatusFilter
  }

  export type EnumVehicleWithAggregatesFilter = {
    equals?: Vehicle
    in?: Enumerable<Vehicle>
    notIn?: Enumerable<Vehicle>
    not?: NestedEnumVehicleWithAggregatesFilter | Vehicle
    _count?: NestedIntFilter
    _min?: NestedEnumVehicleFilter
    _max?: NestedEnumVehicleFilter
  }

  export type RideRelationFilter = {
    is?: RideWhereInput | null
    isNot?: RideWhereInput | null
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    country?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    country?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    city?: SortOrder
    country?: SortOrder
  }

  export type RideCommentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    text?: SortOrder
    rideId?: SortOrder
    authorId?: SortOrder
  }

  export type RideCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    text?: SortOrder
    rideId?: SortOrder
    authorId?: SortOrder
  }

  export type RideCommentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    text?: SortOrder
    rideId?: SortOrder
    authorId?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type RideCreateNestedManyWithoutDriverInput = {
    create?: XOR<Enumerable<RideCreateWithoutDriverInput>, Enumerable<RideUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutDriverInput>
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: Enumerable<RideWhereUniqueInput>
  }

  export type RideUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<Enumerable<RideCreateWithoutDriverInput>, Enumerable<RideUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutDriverInput>
    createMany?: RideCreateManyDriverInputEnvelope
    connect?: Enumerable<RideWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type RideUpdateManyWithoutDriverNestedInput = {
    create?: XOR<Enumerable<RideCreateWithoutDriverInput>, Enumerable<RideUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutDriverInput>
    upsert?: Enumerable<RideUpsertWithWhereUniqueWithoutDriverInput>
    createMany?: RideCreateManyDriverInputEnvelope
    set?: Enumerable<RideWhereUniqueInput>
    disconnect?: Enumerable<RideWhereUniqueInput>
    delete?: Enumerable<RideWhereUniqueInput>
    connect?: Enumerable<RideWhereUniqueInput>
    update?: Enumerable<RideUpdateWithWhereUniqueWithoutDriverInput>
    updateMany?: Enumerable<RideUpdateManyWithWhereWithoutDriverInput>
    deleteMany?: Enumerable<RideScalarWhereInput>
  }

  export type RideUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<Enumerable<RideCreateWithoutDriverInput>, Enumerable<RideUncheckedCreateWithoutDriverInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutDriverInput>
    upsert?: Enumerable<RideUpsertWithWhereUniqueWithoutDriverInput>
    createMany?: RideCreateManyDriverInputEnvelope
    set?: Enumerable<RideWhereUniqueInput>
    disconnect?: Enumerable<RideWhereUniqueInput>
    delete?: Enumerable<RideWhereUniqueInput>
    connect?: Enumerable<RideWhereUniqueInput>
    update?: Enumerable<RideUpdateWithWhereUniqueWithoutDriverInput>
    updateMany?: Enumerable<RideUpdateManyWithWhereWithoutDriverInput>
    deleteMany?: Enumerable<RideScalarWhereInput>
  }

  export type AddressCreateNestedOneWithoutRideDestinationInput = {
    create?: XOR<AddressCreateWithoutRideDestinationInput, AddressUncheckedCreateWithoutRideDestinationInput>
    connectOrCreate?: AddressCreateOrConnectWithoutRideDestinationInput
    connect?: AddressWhereUniqueInput
  }

  export type DriverCreateNestedOneWithoutRidesInput = {
    create?: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRidesInput
    connect?: DriverWhereUniqueInput
  }

  export type AddressCreateNestedOneWithoutRideAdressInput = {
    create?: XOR<AddressCreateWithoutRideAdressInput, AddressUncheckedCreateWithoutRideAdressInput>
    connectOrCreate?: AddressCreateOrConnectWithoutRideAdressInput
    connect?: AddressWhereUniqueInput
  }

  export type RideCommentCreateNestedManyWithoutRideInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutRideInput>, Enumerable<RideCommentUncheckedCreateWithoutRideInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutRideInput>
    createMany?: RideCommentCreateManyRideInputEnvelope
    connect?: Enumerable<RideCommentWhereUniqueInput>
  }

  export type UserCreateNestedOneWithoutRidesInput = {
    create?: XOR<UserCreateWithoutRidesInput, UserUncheckedCreateWithoutRidesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesInput
    connect?: UserWhereUniqueInput
  }

  export type RideCommentUncheckedCreateNestedManyWithoutRideInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutRideInput>, Enumerable<RideCommentUncheckedCreateWithoutRideInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutRideInput>
    createMany?: RideCommentCreateManyRideInputEnvelope
    connect?: Enumerable<RideCommentWhereUniqueInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AddressUpdateOneRequiredWithoutRideDestinationNestedInput = {
    create?: XOR<AddressCreateWithoutRideDestinationInput, AddressUncheckedCreateWithoutRideDestinationInput>
    connectOrCreate?: AddressCreateOrConnectWithoutRideDestinationInput
    upsert?: AddressUpsertWithoutRideDestinationInput
    connect?: AddressWhereUniqueInput
    update?: XOR<AddressUpdateWithoutRideDestinationInput, AddressUncheckedUpdateWithoutRideDestinationInput>
  }

  export type DriverUpdateOneRequiredWithoutRidesNestedInput = {
    create?: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
    connectOrCreate?: DriverCreateOrConnectWithoutRidesInput
    upsert?: DriverUpsertWithoutRidesInput
    connect?: DriverWhereUniqueInput
    update?: XOR<DriverUpdateWithoutRidesInput, DriverUncheckedUpdateWithoutRidesInput>
  }

  export type AddressUpdateOneRequiredWithoutRideAdressNestedInput = {
    create?: XOR<AddressCreateWithoutRideAdressInput, AddressUncheckedCreateWithoutRideAdressInput>
    connectOrCreate?: AddressCreateOrConnectWithoutRideAdressInput
    upsert?: AddressUpsertWithoutRideAdressInput
    connect?: AddressWhereUniqueInput
    update?: XOR<AddressUpdateWithoutRideAdressInput, AddressUncheckedUpdateWithoutRideAdressInput>
  }

  export type EnumRideStatusFieldUpdateOperationsInput = {
    set?: RideStatus
  }

  export type EnumVehicleFieldUpdateOperationsInput = {
    set?: Vehicle
  }

  export type RideCommentUpdateManyWithoutRideNestedInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutRideInput>, Enumerable<RideCommentUncheckedCreateWithoutRideInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutRideInput>
    upsert?: Enumerable<RideCommentUpsertWithWhereUniqueWithoutRideInput>
    createMany?: RideCommentCreateManyRideInputEnvelope
    set?: Enumerable<RideCommentWhereUniqueInput>
    disconnect?: Enumerable<RideCommentWhereUniqueInput>
    delete?: Enumerable<RideCommentWhereUniqueInput>
    connect?: Enumerable<RideCommentWhereUniqueInput>
    update?: Enumerable<RideCommentUpdateWithWhereUniqueWithoutRideInput>
    updateMany?: Enumerable<RideCommentUpdateManyWithWhereWithoutRideInput>
    deleteMany?: Enumerable<RideCommentScalarWhereInput>
  }

  export type UserUpdateOneWithoutRidesNestedInput = {
    create?: XOR<UserCreateWithoutRidesInput, UserUncheckedCreateWithoutRidesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRidesInput
    upsert?: UserUpsertWithoutRidesInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutRidesInput, UserUncheckedUpdateWithoutRidesInput>
  }

  export type RideCommentUncheckedUpdateManyWithoutRideNestedInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutRideInput>, Enumerable<RideCommentUncheckedCreateWithoutRideInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutRideInput>
    upsert?: Enumerable<RideCommentUpsertWithWhereUniqueWithoutRideInput>
    createMany?: RideCommentCreateManyRideInputEnvelope
    set?: Enumerable<RideCommentWhereUniqueInput>
    disconnect?: Enumerable<RideCommentWhereUniqueInput>
    delete?: Enumerable<RideCommentWhereUniqueInput>
    connect?: Enumerable<RideCommentWhereUniqueInput>
    update?: Enumerable<RideCommentUpdateWithWhereUniqueWithoutRideInput>
    updateMany?: Enumerable<RideCommentUpdateManyWithWhereWithoutRideInput>
    deleteMany?: Enumerable<RideCommentScalarWhereInput>
  }

  export type RideCreateNestedOneWithoutDestinationInput = {
    create?: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: RideCreateOrConnectWithoutDestinationInput
    connect?: RideWhereUniqueInput
  }

  export type RideCreateNestedOneWithoutFromInput = {
    create?: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
    connectOrCreate?: RideCreateOrConnectWithoutFromInput
    connect?: RideWhereUniqueInput
  }

  export type RideUncheckedCreateNestedOneWithoutDestinationInput = {
    create?: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: RideCreateOrConnectWithoutDestinationInput
    connect?: RideWhereUniqueInput
  }

  export type RideUncheckedCreateNestedOneWithoutFromInput = {
    create?: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
    connectOrCreate?: RideCreateOrConnectWithoutFromInput
    connect?: RideWhereUniqueInput
  }

  export type RideUpdateOneWithoutDestinationNestedInput = {
    create?: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: RideCreateOrConnectWithoutDestinationInput
    upsert?: RideUpsertWithoutDestinationInput
    disconnect?: boolean
    delete?: boolean
    connect?: RideWhereUniqueInput
    update?: XOR<RideUpdateWithoutDestinationInput, RideUncheckedUpdateWithoutDestinationInput>
  }

  export type RideUpdateOneWithoutFromNestedInput = {
    create?: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
    connectOrCreate?: RideCreateOrConnectWithoutFromInput
    upsert?: RideUpsertWithoutFromInput
    disconnect?: boolean
    delete?: boolean
    connect?: RideWhereUniqueInput
    update?: XOR<RideUpdateWithoutFromInput, RideUncheckedUpdateWithoutFromInput>
  }

  export type RideUncheckedUpdateOneWithoutDestinationNestedInput = {
    create?: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: RideCreateOrConnectWithoutDestinationInput
    upsert?: RideUpsertWithoutDestinationInput
    disconnect?: boolean
    delete?: boolean
    connect?: RideWhereUniqueInput
    update?: XOR<RideUpdateWithoutDestinationInput, RideUncheckedUpdateWithoutDestinationInput>
  }

  export type RideUncheckedUpdateOneWithoutFromNestedInput = {
    create?: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
    connectOrCreate?: RideCreateOrConnectWithoutFromInput
    upsert?: RideUpsertWithoutFromInput
    disconnect?: boolean
    delete?: boolean
    connect?: RideWhereUniqueInput
    update?: XOR<RideUpdateWithoutFromInput, RideUncheckedUpdateWithoutFromInput>
  }

  export type RideCreateNestedOneWithoutCommentsInput = {
    create?: XOR<RideCreateWithoutCommentsInput, RideUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: RideCreateOrConnectWithoutCommentsInput
    connect?: RideWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRideCommentsInput = {
    create?: XOR<UserCreateWithoutRideCommentsInput, UserUncheckedCreateWithoutRideCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRideCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type RideUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<RideCreateWithoutCommentsInput, RideUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: RideCreateOrConnectWithoutCommentsInput
    upsert?: RideUpsertWithoutCommentsInput
    connect?: RideWhereUniqueInput
    update?: XOR<RideUpdateWithoutCommentsInput, RideUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutRideCommentsNestedInput = {
    create?: XOR<UserCreateWithoutRideCommentsInput, UserUncheckedCreateWithoutRideCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRideCommentsInput
    upsert?: UserUpsertWithoutRideCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutRideCommentsInput, UserUncheckedUpdateWithoutRideCommentsInput>
  }

  export type RideCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<Enumerable<RideCreateWithoutVolunteerInput>, Enumerable<RideUncheckedCreateWithoutVolunteerInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutVolunteerInput>
    createMany?: RideCreateManyVolunteerInputEnvelope
    connect?: Enumerable<RideWhereUniqueInput>
  }

  export type RideCommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutAuthorInput>, Enumerable<RideCommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutAuthorInput>
    createMany?: RideCommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<RideCommentWhereUniqueInput>
  }

  export type RideUncheckedCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<Enumerable<RideCreateWithoutVolunteerInput>, Enumerable<RideUncheckedCreateWithoutVolunteerInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutVolunteerInput>
    createMany?: RideCreateManyVolunteerInputEnvelope
    connect?: Enumerable<RideWhereUniqueInput>
  }

  export type RideCommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutAuthorInput>, Enumerable<RideCommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutAuthorInput>
    createMany?: RideCommentCreateManyAuthorInputEnvelope
    connect?: Enumerable<RideCommentWhereUniqueInput>
  }

  export type RideUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<Enumerable<RideCreateWithoutVolunteerInput>, Enumerable<RideUncheckedCreateWithoutVolunteerInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutVolunteerInput>
    upsert?: Enumerable<RideUpsertWithWhereUniqueWithoutVolunteerInput>
    createMany?: RideCreateManyVolunteerInputEnvelope
    set?: Enumerable<RideWhereUniqueInput>
    disconnect?: Enumerable<RideWhereUniqueInput>
    delete?: Enumerable<RideWhereUniqueInput>
    connect?: Enumerable<RideWhereUniqueInput>
    update?: Enumerable<RideUpdateWithWhereUniqueWithoutVolunteerInput>
    updateMany?: Enumerable<RideUpdateManyWithWhereWithoutVolunteerInput>
    deleteMany?: Enumerable<RideScalarWhereInput>
  }

  export type RideCommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutAuthorInput>, Enumerable<RideCommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<RideCommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: RideCommentCreateManyAuthorInputEnvelope
    set?: Enumerable<RideCommentWhereUniqueInput>
    disconnect?: Enumerable<RideCommentWhereUniqueInput>
    delete?: Enumerable<RideCommentWhereUniqueInput>
    connect?: Enumerable<RideCommentWhereUniqueInput>
    update?: Enumerable<RideCommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<RideCommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<RideCommentScalarWhereInput>
  }

  export type RideUncheckedUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<Enumerable<RideCreateWithoutVolunteerInput>, Enumerable<RideUncheckedCreateWithoutVolunteerInput>>
    connectOrCreate?: Enumerable<RideCreateOrConnectWithoutVolunteerInput>
    upsert?: Enumerable<RideUpsertWithWhereUniqueWithoutVolunteerInput>
    createMany?: RideCreateManyVolunteerInputEnvelope
    set?: Enumerable<RideWhereUniqueInput>
    disconnect?: Enumerable<RideWhereUniqueInput>
    delete?: Enumerable<RideWhereUniqueInput>
    connect?: Enumerable<RideWhereUniqueInput>
    update?: Enumerable<RideUpdateWithWhereUniqueWithoutVolunteerInput>
    updateMany?: Enumerable<RideUpdateManyWithWhereWithoutVolunteerInput>
    deleteMany?: Enumerable<RideScalarWhereInput>
  }

  export type RideCommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<RideCommentCreateWithoutAuthorInput>, Enumerable<RideCommentUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<RideCommentCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<RideCommentUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: RideCommentCreateManyAuthorInputEnvelope
    set?: Enumerable<RideCommentWhereUniqueInput>
    disconnect?: Enumerable<RideCommentWhereUniqueInput>
    delete?: Enumerable<RideCommentWhereUniqueInput>
    connect?: Enumerable<RideCommentWhereUniqueInput>
    update?: Enumerable<RideCommentUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<RideCommentUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<RideCommentScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedEnumRideStatusFilter = {
    equals?: RideStatus
    in?: Enumerable<RideStatus>
    notIn?: Enumerable<RideStatus>
    not?: NestedEnumRideStatusFilter | RideStatus
  }

  export type NestedEnumVehicleFilter = {
    equals?: Vehicle
    in?: Enumerable<Vehicle>
    notIn?: Enumerable<Vehicle>
    not?: NestedEnumVehicleFilter | Vehicle
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumRideStatusWithAggregatesFilter = {
    equals?: RideStatus
    in?: Enumerable<RideStatus>
    notIn?: Enumerable<RideStatus>
    not?: NestedEnumRideStatusWithAggregatesFilter | RideStatus
    _count?: NestedIntFilter
    _min?: NestedEnumRideStatusFilter
    _max?: NestedEnumRideStatusFilter
  }

  export type NestedEnumVehicleWithAggregatesFilter = {
    equals?: Vehicle
    in?: Enumerable<Vehicle>
    notIn?: Enumerable<Vehicle>
    not?: NestedEnumVehicleWithAggregatesFilter | Vehicle
    _count?: NestedIntFilter
    _min?: NestedEnumVehicleFilter
    _max?: NestedEnumVehicleFilter
  }

  export type RideCreateWithoutDriverInput = {
    id?: string
    departureTime: Date | string
    destination: AddressCreateNestedOneWithoutRideDestinationInput
    from: AddressCreateNestedOneWithoutRideAdressInput
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentCreateNestedManyWithoutRideInput
    volunteer?: UserCreateNestedOneWithoutRidesInput
  }

  export type RideUncheckedCreateWithoutDriverInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentUncheckedCreateNestedManyWithoutRideInput
    volunteerId?: string | null
  }

  export type RideCreateOrConnectWithoutDriverInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideCreateManyDriverInputEnvelope = {
    data: Enumerable<RideCreateManyDriverInput>
    skipDuplicates?: boolean
  }

  export type RideUpsertWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
    create: XOR<RideCreateWithoutDriverInput, RideUncheckedCreateWithoutDriverInput>
  }

  export type RideUpdateWithWhereUniqueWithoutDriverInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutDriverInput, RideUncheckedUpdateWithoutDriverInput>
  }

  export type RideUpdateManyWithWhereWithoutDriverInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutRidesInput>
  }

  export type RideScalarWhereInput = {
    AND?: Enumerable<RideScalarWhereInput>
    OR?: Enumerable<RideScalarWhereInput>
    NOT?: Enumerable<RideScalarWhereInput>
    id?: StringFilter | string
    departureTime?: DateTimeFilter | Date | string
    destinationId?: StringFilter | string
    driverId?: StringFilter | string
    fromId?: StringFilter | string
    status?: EnumRideStatusFilter | RideStatus
    vehicle?: EnumVehicleFilter | Vehicle
    volunteerId?: StringNullableFilter | string | null
  }

  export type AddressCreateWithoutRideDestinationInput = {
    id?: string
    city?: string | null
    country: string
    rideAdress?: RideCreateNestedOneWithoutFromInput
  }

  export type AddressUncheckedCreateWithoutRideDestinationInput = {
    id?: string
    city?: string | null
    country: string
    rideAdress?: RideUncheckedCreateNestedOneWithoutFromInput
  }

  export type AddressCreateOrConnectWithoutRideDestinationInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutRideDestinationInput, AddressUncheckedCreateWithoutRideDestinationInput>
  }

  export type DriverCreateWithoutRidesInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone: string
  }

  export type DriverUncheckedCreateWithoutRidesInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone: string
  }

  export type DriverCreateOrConnectWithoutRidesInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
  }

  export type AddressCreateWithoutRideAdressInput = {
    id?: string
    city?: string | null
    country: string
    rideDestination?: RideCreateNestedOneWithoutDestinationInput
  }

  export type AddressUncheckedCreateWithoutRideAdressInput = {
    id?: string
    city?: string | null
    country: string
    rideDestination?: RideUncheckedCreateNestedOneWithoutDestinationInput
  }

  export type AddressCreateOrConnectWithoutRideAdressInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutRideAdressInput, AddressUncheckedCreateWithoutRideAdressInput>
  }

  export type RideCommentCreateWithoutRideInput = {
    id?: string
    createdAt?: Date | string
    text: string
    author: UserCreateNestedOneWithoutRideCommentsInput
  }

  export type RideCommentUncheckedCreateWithoutRideInput = {
    id?: string
    createdAt?: Date | string
    text: string
    authorId: string
  }

  export type RideCommentCreateOrConnectWithoutRideInput = {
    where: RideCommentWhereUniqueInput
    create: XOR<RideCommentCreateWithoutRideInput, RideCommentUncheckedCreateWithoutRideInput>
  }

  export type RideCommentCreateManyRideInputEnvelope = {
    data: Enumerable<RideCommentCreateManyRideInput>
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutRidesInput = {
    id?: string
    password: string
    name: string
    rideComments?: RideCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRidesInput = {
    id?: string
    password: string
    name: string
    rideComments?: RideCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRidesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRidesInput, UserUncheckedCreateWithoutRidesInput>
  }

  export type AddressUpsertWithoutRideDestinationInput = {
    update: XOR<AddressUpdateWithoutRideDestinationInput, AddressUncheckedUpdateWithoutRideDestinationInput>
    create: XOR<AddressCreateWithoutRideDestinationInput, AddressUncheckedCreateWithoutRideDestinationInput>
  }

  export type AddressUpdateWithoutRideDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideAdress?: RideUpdateOneWithoutFromNestedInput
  }

  export type AddressUncheckedUpdateWithoutRideDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideAdress?: RideUncheckedUpdateOneWithoutFromNestedInput
  }

  export type DriverUpsertWithoutRidesInput = {
    update: XOR<DriverUpdateWithoutRidesInput, DriverUncheckedUpdateWithoutRidesInput>
    create: XOR<DriverCreateWithoutRidesInput, DriverUncheckedCreateWithoutRidesInput>
  }

  export type DriverUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type DriverUncheckedUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUpsertWithoutRideAdressInput = {
    update: XOR<AddressUpdateWithoutRideAdressInput, AddressUncheckedUpdateWithoutRideAdressInput>
    create: XOR<AddressCreateWithoutRideAdressInput, AddressUncheckedCreateWithoutRideAdressInput>
  }

  export type AddressUpdateWithoutRideAdressInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideDestination?: RideUpdateOneWithoutDestinationNestedInput
  }

  export type AddressUncheckedUpdateWithoutRideAdressInput = {
    id?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    rideDestination?: RideUncheckedUpdateOneWithoutDestinationNestedInput
  }

  export type RideCommentUpsertWithWhereUniqueWithoutRideInput = {
    where: RideCommentWhereUniqueInput
    update: XOR<RideCommentUpdateWithoutRideInput, RideCommentUncheckedUpdateWithoutRideInput>
    create: XOR<RideCommentCreateWithoutRideInput, RideCommentUncheckedCreateWithoutRideInput>
  }

  export type RideCommentUpdateWithWhereUniqueWithoutRideInput = {
    where: RideCommentWhereUniqueInput
    data: XOR<RideCommentUpdateWithoutRideInput, RideCommentUncheckedUpdateWithoutRideInput>
  }

  export type RideCommentUpdateManyWithWhereWithoutRideInput = {
    where: RideCommentScalarWhereInput
    data: XOR<RideCommentUpdateManyMutationInput, RideCommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type RideCommentScalarWhereInput = {
    AND?: Enumerable<RideCommentScalarWhereInput>
    OR?: Enumerable<RideCommentScalarWhereInput>
    NOT?: Enumerable<RideCommentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    text?: StringFilter | string
    rideId?: StringFilter | string
    authorId?: StringFilter | string
  }

  export type UserUpsertWithoutRidesInput = {
    update: XOR<UserUpdateWithoutRidesInput, UserUncheckedUpdateWithoutRidesInput>
    create: XOR<UserCreateWithoutRidesInput, UserUncheckedCreateWithoutRidesInput>
  }

  export type UserUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rideComments?: RideCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rideComments?: RideCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type RideCreateWithoutDestinationInput = {
    id?: string
    departureTime: Date | string
    driver: DriverCreateNestedOneWithoutRidesInput
    from: AddressCreateNestedOneWithoutRideAdressInput
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentCreateNestedManyWithoutRideInput
    volunteer?: UserCreateNestedOneWithoutRidesInput
  }

  export type RideUncheckedCreateWithoutDestinationInput = {
    id?: string
    departureTime: Date | string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentUncheckedCreateNestedManyWithoutRideInput
    volunteerId?: string | null
  }

  export type RideCreateOrConnectWithoutDestinationInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
  }

  export type RideCreateWithoutFromInput = {
    id?: string
    departureTime: Date | string
    destination: AddressCreateNestedOneWithoutRideDestinationInput
    driver: DriverCreateNestedOneWithoutRidesInput
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentCreateNestedManyWithoutRideInput
    volunteer?: UserCreateNestedOneWithoutRidesInput
  }

  export type RideUncheckedCreateWithoutFromInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentUncheckedCreateNestedManyWithoutRideInput
    volunteerId?: string | null
  }

  export type RideCreateOrConnectWithoutFromInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
  }

  export type RideUpsertWithoutDestinationInput = {
    update: XOR<RideUpdateWithoutDestinationInput, RideUncheckedUpdateWithoutDestinationInput>
    create: XOR<RideCreateWithoutDestinationInput, RideUncheckedCreateWithoutDestinationInput>
  }

  export type RideUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneRequiredWithoutRidesNestedInput
    from?: AddressUpdateOneRequiredWithoutRideAdressNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUpdateManyWithoutRideNestedInput
    volunteer?: UserUpdateOneWithoutRidesNestedInput
  }

  export type RideUncheckedUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    driverId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUncheckedUpdateManyWithoutRideNestedInput
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RideUpsertWithoutFromInput = {
    update: XOR<RideUpdateWithoutFromInput, RideUncheckedUpdateWithoutFromInput>
    create: XOR<RideCreateWithoutFromInput, RideUncheckedCreateWithoutFromInput>
  }

  export type RideUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: AddressUpdateOneRequiredWithoutRideDestinationNestedInput
    driver?: DriverUpdateOneRequiredWithoutRidesNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUpdateManyWithoutRideNestedInput
    volunteer?: UserUpdateOneWithoutRidesNestedInput
  }

  export type RideUncheckedUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUncheckedUpdateManyWithoutRideNestedInput
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RideCreateWithoutCommentsInput = {
    id?: string
    departureTime: Date | string
    destination: AddressCreateNestedOneWithoutRideDestinationInput
    driver: DriverCreateNestedOneWithoutRidesInput
    from: AddressCreateNestedOneWithoutRideAdressInput
    status: RideStatus
    vehicle: Vehicle
    volunteer?: UserCreateNestedOneWithoutRidesInput
  }

  export type RideUncheckedCreateWithoutCommentsInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    volunteerId?: string | null
  }

  export type RideCreateOrConnectWithoutCommentsInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutCommentsInput, RideUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutRideCommentsInput = {
    id?: string
    password: string
    name: string
    rides?: RideCreateNestedManyWithoutVolunteerInput
  }

  export type UserUncheckedCreateWithoutRideCommentsInput = {
    id?: string
    password: string
    name: string
    rides?: RideUncheckedCreateNestedManyWithoutVolunteerInput
  }

  export type UserCreateOrConnectWithoutRideCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRideCommentsInput, UserUncheckedCreateWithoutRideCommentsInput>
  }

  export type RideUpsertWithoutCommentsInput = {
    update: XOR<RideUpdateWithoutCommentsInput, RideUncheckedUpdateWithoutCommentsInput>
    create: XOR<RideCreateWithoutCommentsInput, RideUncheckedCreateWithoutCommentsInput>
  }

  export type RideUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: AddressUpdateOneRequiredWithoutRideDestinationNestedInput
    driver?: DriverUpdateOneRequiredWithoutRidesNestedInput
    from?: AddressUpdateOneRequiredWithoutRideAdressNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    volunteer?: UserUpdateOneWithoutRidesNestedInput
  }

  export type RideUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutRideCommentsInput = {
    update: XOR<UserUpdateWithoutRideCommentsInput, UserUncheckedUpdateWithoutRideCommentsInput>
    create: XOR<UserCreateWithoutRideCommentsInput, UserUncheckedCreateWithoutRideCommentsInput>
  }

  export type UserUpdateWithoutRideCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rides?: RideUpdateManyWithoutVolunteerNestedInput
  }

  export type UserUncheckedUpdateWithoutRideCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rides?: RideUncheckedUpdateManyWithoutVolunteerNestedInput
  }

  export type RideCreateWithoutVolunteerInput = {
    id?: string
    departureTime: Date | string
    destination: AddressCreateNestedOneWithoutRideDestinationInput
    driver: DriverCreateNestedOneWithoutRidesInput
    from: AddressCreateNestedOneWithoutRideAdressInput
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentCreateNestedManyWithoutRideInput
  }

  export type RideUncheckedCreateWithoutVolunteerInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    comments?: RideCommentUncheckedCreateNestedManyWithoutRideInput
  }

  export type RideCreateOrConnectWithoutVolunteerInput = {
    where: RideWhereUniqueInput
    create: XOR<RideCreateWithoutVolunteerInput, RideUncheckedCreateWithoutVolunteerInput>
  }

  export type RideCreateManyVolunteerInputEnvelope = {
    data: Enumerable<RideCreateManyVolunteerInput>
    skipDuplicates?: boolean
  }

  export type RideCommentCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    text: string
    ride: RideCreateNestedOneWithoutCommentsInput
  }

  export type RideCommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    text: string
    rideId: string
  }

  export type RideCommentCreateOrConnectWithoutAuthorInput = {
    where: RideCommentWhereUniqueInput
    create: XOR<RideCommentCreateWithoutAuthorInput, RideCommentUncheckedCreateWithoutAuthorInput>
  }

  export type RideCommentCreateManyAuthorInputEnvelope = {
    data: Enumerable<RideCommentCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type RideUpsertWithWhereUniqueWithoutVolunteerInput = {
    where: RideWhereUniqueInput
    update: XOR<RideUpdateWithoutVolunteerInput, RideUncheckedUpdateWithoutVolunteerInput>
    create: XOR<RideCreateWithoutVolunteerInput, RideUncheckedCreateWithoutVolunteerInput>
  }

  export type RideUpdateWithWhereUniqueWithoutVolunteerInput = {
    where: RideWhereUniqueInput
    data: XOR<RideUpdateWithoutVolunteerInput, RideUncheckedUpdateWithoutVolunteerInput>
  }

  export type RideUpdateManyWithWhereWithoutVolunteerInput = {
    where: RideScalarWhereInput
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyWithoutRidesInput>
  }

  export type RideCommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RideCommentWhereUniqueInput
    update: XOR<RideCommentUpdateWithoutAuthorInput, RideCommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<RideCommentCreateWithoutAuthorInput, RideCommentUncheckedCreateWithoutAuthorInput>
  }

  export type RideCommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RideCommentWhereUniqueInput
    data: XOR<RideCommentUpdateWithoutAuthorInput, RideCommentUncheckedUpdateWithoutAuthorInput>
  }

  export type RideCommentUpdateManyWithWhereWithoutAuthorInput = {
    where: RideCommentScalarWhereInput
    data: XOR<RideCommentUpdateManyMutationInput, RideCommentUncheckedUpdateManyWithoutRideCommentsInput>
  }

  export type RideCreateManyDriverInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
    volunteerId?: string | null
  }

  export type RideUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: AddressUpdateOneRequiredWithoutRideDestinationNestedInput
    from?: AddressUpdateOneRequiredWithoutRideAdressNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUpdateManyWithoutRideNestedInput
    volunteer?: UserUpdateOneWithoutRidesNestedInput
  }

  export type RideUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUncheckedUpdateManyWithoutRideNestedInput
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RideUncheckedUpdateManyWithoutRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    volunteerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RideCommentCreateManyRideInput = {
    id?: string
    createdAt?: Date | string
    text: string
    authorId: string
  }

  export type RideCommentUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutRideCommentsNestedInput
  }

  export type RideCommentUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type RideCommentUncheckedUpdateManyWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type RideCreateManyVolunteerInput = {
    id?: string
    departureTime: Date | string
    destinationId: string
    driverId: string
    fromId: string
    status: RideStatus
    vehicle: Vehicle
  }

  export type RideCommentCreateManyAuthorInput = {
    id?: string
    createdAt?: Date | string
    text: string
    rideId: string
  }

  export type RideUpdateWithoutVolunteerInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destination?: AddressUpdateOneRequiredWithoutRideDestinationNestedInput
    driver?: DriverUpdateOneRequiredWithoutRidesNestedInput
    from?: AddressUpdateOneRequiredWithoutRideAdressNestedInput
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUpdateManyWithoutRideNestedInput
  }

  export type RideUncheckedUpdateWithoutVolunteerInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    destinationId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    fromId?: StringFieldUpdateOperationsInput | string
    status?: EnumRideStatusFieldUpdateOperationsInput | RideStatus
    vehicle?: EnumVehicleFieldUpdateOperationsInput | Vehicle
    comments?: RideCommentUncheckedUpdateManyWithoutRideNestedInput
  }

  export type RideCommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    ride?: RideUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type RideCommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
  }

  export type RideCommentUncheckedUpdateManyWithoutRideCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    rideId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}