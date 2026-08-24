
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Conference
 * 
 */
export type Conference = $Result.DefaultSelection<Prisma.$ConferencePayload>
/**
 * Model TimelineEvent
 * 
 */
export type TimelineEvent = $Result.DefaultSelection<Prisma.$TimelineEventPayload>
/**
 * Model PeopleGroup
 * 
 */
export type PeopleGroup = $Result.DefaultSelection<Prisma.$PeopleGroupPayload>
/**
 * Model TimelineMeta
 * 
 */
export type TimelineMeta = $Result.DefaultSelection<Prisma.$TimelineMetaPayload>
/**
 * Model PeoplesMeta
 * 
 */
export type PeoplesMeta = $Result.DefaultSelection<Prisma.$PeoplesMetaPayload>
/**
 * Model UserWatchedConference
 * 
 */
export type UserWatchedConference = $Result.DefaultSelection<Prisma.$UserWatchedConferencePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conference`: Exposes CRUD operations for the **Conference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conferences
    * const conferences = await prisma.conference.findMany()
    * ```
    */
  get conference(): Prisma.ConferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timelineEvent`: Exposes CRUD operations for the **TimelineEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineEvents
    * const timelineEvents = await prisma.timelineEvent.findMany()
    * ```
    */
  get timelineEvent(): Prisma.TimelineEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.peopleGroup`: Exposes CRUD operations for the **PeopleGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PeopleGroups
    * const peopleGroups = await prisma.peopleGroup.findMany()
    * ```
    */
  get peopleGroup(): Prisma.PeopleGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timelineMeta`: Exposes CRUD operations for the **TimelineMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineMetas
    * const timelineMetas = await prisma.timelineMeta.findMany()
    * ```
    */
  get timelineMeta(): Prisma.TimelineMetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.peoplesMeta`: Exposes CRUD operations for the **PeoplesMeta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PeoplesMetas
    * const peoplesMetas = await prisma.peoplesMeta.findMany()
    * ```
    */
  get peoplesMeta(): Prisma.PeoplesMetaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userWatchedConference`: Exposes CRUD operations for the **UserWatchedConference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWatchedConferences
    * const userWatchedConferences = await prisma.userWatchedConference.findMany()
    * ```
    */
  get userWatchedConference(): Prisma.UserWatchedConferenceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken',
    Conference: 'Conference',
    TimelineEvent: 'TimelineEvent',
    PeopleGroup: 'PeopleGroup',
    TimelineMeta: 'TimelineMeta',
    PeoplesMeta: 'PeoplesMeta',
    UserWatchedConference: 'UserWatchedConference'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "session" | "user" | "verificationToken" | "conference" | "timelineEvent" | "peopleGroup" | "timelineMeta" | "peoplesMeta" | "userWatchedConference"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Conference: {
        payload: Prisma.$ConferencePayload<ExtArgs>
        fields: Prisma.ConferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          findFirst: {
            args: Prisma.ConferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          findMany: {
            args: Prisma.ConferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>[]
          }
          create: {
            args: Prisma.ConferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          createMany: {
            args: Prisma.ConferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>[]
          }
          delete: {
            args: Prisma.ConferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          update: {
            args: Prisma.ConferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          deleteMany: {
            args: Prisma.ConferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>[]
          }
          upsert: {
            args: Prisma.ConferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConferencePayload>
          }
          aggregate: {
            args: Prisma.ConferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConference>
          }
          groupBy: {
            args: Prisma.ConferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConferenceCountArgs<ExtArgs>
            result: $Utils.Optional<ConferenceCountAggregateOutputType> | number
          }
        }
      }
      TimelineEvent: {
        payload: Prisma.$TimelineEventPayload<ExtArgs>
        fields: Prisma.TimelineEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          findFirst: {
            args: Prisma.TimelineEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          findMany: {
            args: Prisma.TimelineEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>[]
          }
          create: {
            args: Prisma.TimelineEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          createMany: {
            args: Prisma.TimelineEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>[]
          }
          delete: {
            args: Prisma.TimelineEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          update: {
            args: Prisma.TimelineEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          deleteMany: {
            args: Prisma.TimelineEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimelineEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>[]
          }
          upsert: {
            args: Prisma.TimelineEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEventPayload>
          }
          aggregate: {
            args: Prisma.TimelineEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineEvent>
          }
          groupBy: {
            args: Prisma.TimelineEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineEventCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineEventCountAggregateOutputType> | number
          }
        }
      }
      PeopleGroup: {
        payload: Prisma.$PeopleGroupPayload<ExtArgs>
        fields: Prisma.PeopleGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeopleGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeopleGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          findFirst: {
            args: Prisma.PeopleGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeopleGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          findMany: {
            args: Prisma.PeopleGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>[]
          }
          create: {
            args: Prisma.PeopleGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          createMany: {
            args: Prisma.PeopleGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeopleGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>[]
          }
          delete: {
            args: Prisma.PeopleGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          update: {
            args: Prisma.PeopleGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          deleteMany: {
            args: Prisma.PeopleGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeopleGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeopleGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>[]
          }
          upsert: {
            args: Prisma.PeopleGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeopleGroupPayload>
          }
          aggregate: {
            args: Prisma.PeopleGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeopleGroup>
          }
          groupBy: {
            args: Prisma.PeopleGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeopleGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeopleGroupCountArgs<ExtArgs>
            result: $Utils.Optional<PeopleGroupCountAggregateOutputType> | number
          }
        }
      }
      TimelineMeta: {
        payload: Prisma.$TimelineMetaPayload<ExtArgs>
        fields: Prisma.TimelineMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          findFirst: {
            args: Prisma.TimelineMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          findMany: {
            args: Prisma.TimelineMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>[]
          }
          create: {
            args: Prisma.TimelineMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          createMany: {
            args: Prisma.TimelineMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>[]
          }
          delete: {
            args: Prisma.TimelineMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          update: {
            args: Prisma.TimelineMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          deleteMany: {
            args: Prisma.TimelineMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimelineMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>[]
          }
          upsert: {
            args: Prisma.TimelineMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineMetaPayload>
          }
          aggregate: {
            args: Prisma.TimelineMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineMeta>
          }
          groupBy: {
            args: Prisma.TimelineMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineMetaCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineMetaCountAggregateOutputType> | number
          }
        }
      }
      PeoplesMeta: {
        payload: Prisma.$PeoplesMetaPayload<ExtArgs>
        fields: Prisma.PeoplesMetaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeoplesMetaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeoplesMetaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          findFirst: {
            args: Prisma.PeoplesMetaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeoplesMetaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          findMany: {
            args: Prisma.PeoplesMetaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>[]
          }
          create: {
            args: Prisma.PeoplesMetaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          createMany: {
            args: Prisma.PeoplesMetaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeoplesMetaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>[]
          }
          delete: {
            args: Prisma.PeoplesMetaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          update: {
            args: Prisma.PeoplesMetaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          deleteMany: {
            args: Prisma.PeoplesMetaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeoplesMetaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeoplesMetaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>[]
          }
          upsert: {
            args: Prisma.PeoplesMetaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeoplesMetaPayload>
          }
          aggregate: {
            args: Prisma.PeoplesMetaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeoplesMeta>
          }
          groupBy: {
            args: Prisma.PeoplesMetaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeoplesMetaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeoplesMetaCountArgs<ExtArgs>
            result: $Utils.Optional<PeoplesMetaCountAggregateOutputType> | number
          }
        }
      }
      UserWatchedConference: {
        payload: Prisma.$UserWatchedConferencePayload<ExtArgs>
        fields: Prisma.UserWatchedConferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWatchedConferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWatchedConferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          findFirst: {
            args: Prisma.UserWatchedConferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWatchedConferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          findMany: {
            args: Prisma.UserWatchedConferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>[]
          }
          create: {
            args: Prisma.UserWatchedConferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          createMany: {
            args: Prisma.UserWatchedConferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWatchedConferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>[]
          }
          delete: {
            args: Prisma.UserWatchedConferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          update: {
            args: Prisma.UserWatchedConferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          deleteMany: {
            args: Prisma.UserWatchedConferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWatchedConferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserWatchedConferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>[]
          }
          upsert: {
            args: Prisma.UserWatchedConferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWatchedConferencePayload>
          }
          aggregate: {
            args: Prisma.UserWatchedConferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWatchedConference>
          }
          groupBy: {
            args: Prisma.UserWatchedConferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWatchedConferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWatchedConferenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserWatchedConferenceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    session?: SessionOmit
    user?: UserOmit
    verificationToken?: VerificationTokenOmit
    conference?: ConferenceOmit
    timelineEvent?: TimelineEventOmit
    peopleGroup?: PeopleGroupOmit
    timelineMeta?: TimelineMetaOmit
    peoplesMeta?: PeoplesMetaOmit
    userWatchedConference?: UserWatchedConferenceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    watched: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    watched?: boolean | UserCountOutputTypeCountWatchedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWatchedConferenceWhereInput
  }


  /**
   * Count Type ConferenceCountOutputType
   */

  export type ConferenceCountOutputType = {
    watchedBy: number
  }

  export type ConferenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchedBy?: boolean | ConferenceCountOutputTypeCountWatchedByArgs
  }

  // Custom InputTypes
  /**
   * ConferenceCountOutputType without action
   */
  export type ConferenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConferenceCountOutputType
     */
    select?: ConferenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConferenceCountOutputType without action
   */
  export type ConferenceCountOutputTypeCountWatchedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWatchedConferenceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
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
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role
    password: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    watched?: boolean | User$watchedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    watched?: boolean | User$watchedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      watched: Prisma.$UserWatchedConferencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
      role: $Enums.Role
      password: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watched<T extends User$watchedArgs<ExtArgs> = {}>(args?: Subset<T, User$watchedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.watched
   */
  export type User$watchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    where?: UserWatchedConferenceWhereInput
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    cursor?: UserWatchedConferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWatchedConferenceScalarFieldEnum | UserWatchedConferenceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Conference
   */

  export type AggregateConference = {
    _count: ConferenceCountAggregateOutputType | null
    _avg: ConferenceAvgAggregateOutputType | null
    _sum: ConferenceSumAggregateOutputType | null
    _min: ConferenceMinAggregateOutputType | null
    _max: ConferenceMaxAggregateOutputType | null
  }

  export type ConferenceAvgAggregateOutputType = {
    year: number | null
  }

  export type ConferenceSumAggregateOutputType = {
    year: number | null
  }

  export type ConferenceMinAggregateOutputType = {
    id: string | null
    title: string | null
    type: string | null
    date: string | null
    year: number | null
    organization: string | null
    url: string | null
    youtubeUrl: string | null
    infoAdicional: string | null
    description: string | null
    summary: string | null
    duration: string | null
    language: string | null
    source: string | null
    mediaType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConferenceMaxAggregateOutputType = {
    id: string | null
    title: string | null
    type: string | null
    date: string | null
    year: number | null
    organization: string | null
    url: string | null
    youtubeUrl: string | null
    infoAdicional: string | null
    description: string | null
    summary: string | null
    duration: string | null
    language: string | null
    source: string | null
    mediaType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConferenceCountAggregateOutputType = {
    id: number
    title: number
    type: number
    date: number
    year: number
    organization: number
    url: number
    youtubeUrl: number
    infoAdicional: number
    description: number
    summary: number
    topics: number
    characters: number
    civilizations: number
    duration: number
    language: number
    source: number
    mediaType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConferenceAvgAggregateInputType = {
    year?: true
  }

  export type ConferenceSumAggregateInputType = {
    year?: true
  }

  export type ConferenceMinAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    year?: true
    organization?: true
    url?: true
    youtubeUrl?: true
    infoAdicional?: true
    description?: true
    summary?: true
    duration?: true
    language?: true
    source?: true
    mediaType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConferenceMaxAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    year?: true
    organization?: true
    url?: true
    youtubeUrl?: true
    infoAdicional?: true
    description?: true
    summary?: true
    duration?: true
    language?: true
    source?: true
    mediaType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConferenceCountAggregateInputType = {
    id?: true
    title?: true
    type?: true
    date?: true
    year?: true
    organization?: true
    url?: true
    youtubeUrl?: true
    infoAdicional?: true
    description?: true
    summary?: true
    topics?: true
    characters?: true
    civilizations?: true
    duration?: true
    language?: true
    source?: true
    mediaType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conference to aggregate.
     */
    where?: ConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conferences to fetch.
     */
    orderBy?: ConferenceOrderByWithRelationInput | ConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conferences
    **/
    _count?: true | ConferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConferenceMaxAggregateInputType
  }

  export type GetConferenceAggregateType<T extends ConferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateConference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConference[P]>
      : GetScalarType<T[P], AggregateConference[P]>
  }




  export type ConferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConferenceWhereInput
    orderBy?: ConferenceOrderByWithAggregationInput | ConferenceOrderByWithAggregationInput[]
    by: ConferenceScalarFieldEnum[] | ConferenceScalarFieldEnum
    having?: ConferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConferenceCountAggregateInputType | true
    _avg?: ConferenceAvgAggregateInputType
    _sum?: ConferenceSumAggregateInputType
    _min?: ConferenceMinAggregateInputType
    _max?: ConferenceMaxAggregateInputType
  }

  export type ConferenceGroupByOutputType = {
    id: string
    title: string
    type: string
    date: string | null
    year: number | null
    organization: string
    url: string | null
    youtubeUrl: string | null
    infoAdicional: string | null
    description: string
    summary: string
    topics: string[]
    characters: string[]
    civilizations: string[]
    duration: string | null
    language: string
    source: string
    mediaType: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConferenceCountAggregateOutputType | null
    _avg: ConferenceAvgAggregateOutputType | null
    _sum: ConferenceSumAggregateOutputType | null
    _min: ConferenceMinAggregateOutputType | null
    _max: ConferenceMaxAggregateOutputType | null
  }

  type GetConferenceGroupByPayload<T extends ConferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConferenceGroupByOutputType[P]>
            : GetScalarType<T[P], ConferenceGroupByOutputType[P]>
        }
      >
    >


  export type ConferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    year?: boolean
    organization?: boolean
    url?: boolean
    youtubeUrl?: boolean
    infoAdicional?: boolean
    description?: boolean
    summary?: boolean
    topics?: boolean
    characters?: boolean
    civilizations?: boolean
    duration?: boolean
    language?: boolean
    source?: boolean
    mediaType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    watchedBy?: boolean | Conference$watchedByArgs<ExtArgs>
    _count?: boolean | ConferenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conference"]>

  export type ConferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    year?: boolean
    organization?: boolean
    url?: boolean
    youtubeUrl?: boolean
    infoAdicional?: boolean
    description?: boolean
    summary?: boolean
    topics?: boolean
    characters?: boolean
    civilizations?: boolean
    duration?: boolean
    language?: boolean
    source?: boolean
    mediaType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conference"]>

  export type ConferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    year?: boolean
    organization?: boolean
    url?: boolean
    youtubeUrl?: boolean
    infoAdicional?: boolean
    description?: boolean
    summary?: boolean
    topics?: boolean
    characters?: boolean
    civilizations?: boolean
    duration?: boolean
    language?: boolean
    source?: boolean
    mediaType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["conference"]>

  export type ConferenceSelectScalar = {
    id?: boolean
    title?: boolean
    type?: boolean
    date?: boolean
    year?: boolean
    organization?: boolean
    url?: boolean
    youtubeUrl?: boolean
    infoAdicional?: boolean
    description?: boolean
    summary?: boolean
    topics?: boolean
    characters?: boolean
    civilizations?: boolean
    duration?: boolean
    language?: boolean
    source?: boolean
    mediaType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "type" | "date" | "year" | "organization" | "url" | "youtubeUrl" | "infoAdicional" | "description" | "summary" | "topics" | "characters" | "civilizations" | "duration" | "language" | "source" | "mediaType" | "createdAt" | "updatedAt", ExtArgs["result"]["conference"]>
  export type ConferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchedBy?: boolean | Conference$watchedByArgs<ExtArgs>
    _count?: boolean | ConferenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conference"
    objects: {
      watchedBy: Prisma.$UserWatchedConferencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      type: string
      date: string | null
      year: number | null
      organization: string
      url: string | null
      youtubeUrl: string | null
      infoAdicional: string | null
      description: string
      summary: string
      topics: string[]
      characters: string[]
      civilizations: string[]
      duration: string | null
      language: string
      source: string
      mediaType: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conference"]>
    composites: {}
  }

  type ConferenceGetPayload<S extends boolean | null | undefined | ConferenceDefaultArgs> = $Result.GetResult<Prisma.$ConferencePayload, S>

  type ConferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConferenceCountAggregateInputType | true
    }

  export interface ConferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conference'], meta: { name: 'Conference' } }
    /**
     * Find zero or one Conference that matches the filter.
     * @param {ConferenceFindUniqueArgs} args - Arguments to find a Conference
     * @example
     * // Get one Conference
     * const conference = await prisma.conference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConferenceFindUniqueArgs>(args: SelectSubset<T, ConferenceFindUniqueArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConferenceFindUniqueOrThrowArgs} args - Arguments to find a Conference
     * @example
     * // Get one Conference
     * const conference = await prisma.conference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, ConferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceFindFirstArgs} args - Arguments to find a Conference
     * @example
     * // Get one Conference
     * const conference = await prisma.conference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConferenceFindFirstArgs>(args?: SelectSubset<T, ConferenceFindFirstArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceFindFirstOrThrowArgs} args - Arguments to find a Conference
     * @example
     * // Get one Conference
     * const conference = await prisma.conference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, ConferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conferences
     * const conferences = await prisma.conference.findMany()
     * 
     * // Get first 10 Conferences
     * const conferences = await prisma.conference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conferenceWithIdOnly = await prisma.conference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConferenceFindManyArgs>(args?: SelectSubset<T, ConferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conference.
     * @param {ConferenceCreateArgs} args - Arguments to create a Conference.
     * @example
     * // Create one Conference
     * const Conference = await prisma.conference.create({
     *   data: {
     *     // ... data to create a Conference
     *   }
     * })
     * 
     */
    create<T extends ConferenceCreateArgs>(args: SelectSubset<T, ConferenceCreateArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conferences.
     * @param {ConferenceCreateManyArgs} args - Arguments to create many Conferences.
     * @example
     * // Create many Conferences
     * const conference = await prisma.conference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConferenceCreateManyArgs>(args?: SelectSubset<T, ConferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conferences and returns the data saved in the database.
     * @param {ConferenceCreateManyAndReturnArgs} args - Arguments to create many Conferences.
     * @example
     * // Create many Conferences
     * const conference = await prisma.conference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conferences and only return the `id`
     * const conferenceWithIdOnly = await prisma.conference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, ConferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conference.
     * @param {ConferenceDeleteArgs} args - Arguments to delete one Conference.
     * @example
     * // Delete one Conference
     * const Conference = await prisma.conference.delete({
     *   where: {
     *     // ... filter to delete one Conference
     *   }
     * })
     * 
     */
    delete<T extends ConferenceDeleteArgs>(args: SelectSubset<T, ConferenceDeleteArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conference.
     * @param {ConferenceUpdateArgs} args - Arguments to update one Conference.
     * @example
     * // Update one Conference
     * const conference = await prisma.conference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConferenceUpdateArgs>(args: SelectSubset<T, ConferenceUpdateArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conferences.
     * @param {ConferenceDeleteManyArgs} args - Arguments to filter Conferences to delete.
     * @example
     * // Delete a few Conferences
     * const { count } = await prisma.conference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConferenceDeleteManyArgs>(args?: SelectSubset<T, ConferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conferences
     * const conference = await prisma.conference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConferenceUpdateManyArgs>(args: SelectSubset<T, ConferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conferences and returns the data updated in the database.
     * @param {ConferenceUpdateManyAndReturnArgs} args - Arguments to update many Conferences.
     * @example
     * // Update many Conferences
     * const conference = await prisma.conference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conferences and only return the `id`
     * const conferenceWithIdOnly = await prisma.conference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, ConferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conference.
     * @param {ConferenceUpsertArgs} args - Arguments to update or create a Conference.
     * @example
     * // Update or create a Conference
     * const conference = await prisma.conference.upsert({
     *   create: {
     *     // ... data to create a Conference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conference we want to update
     *   }
     * })
     */
    upsert<T extends ConferenceUpsertArgs>(args: SelectSubset<T, ConferenceUpsertArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceCountArgs} args - Arguments to filter Conferences to count.
     * @example
     * // Count the number of Conferences
     * const count = await prisma.conference.count({
     *   where: {
     *     // ... the filter for the Conferences we want to count
     *   }
     * })
    **/
    count<T extends ConferenceCountArgs>(
      args?: Subset<T, ConferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConferenceAggregateArgs>(args: Subset<T, ConferenceAggregateArgs>): Prisma.PrismaPromise<GetConferenceAggregateType<T>>

    /**
     * Group by Conference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConferenceGroupByArgs} args - Group by arguments.
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
      T extends ConferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConferenceGroupByArgs['orderBy'] }
        : { orderBy?: ConferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ConferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conference model
   */
  readonly fields: ConferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watchedBy<T extends Conference$watchedByArgs<ExtArgs> = {}>(args?: Subset<T, Conference$watchedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conference model
   */
  interface ConferenceFieldRefs {
    readonly id: FieldRef<"Conference", 'String'>
    readonly title: FieldRef<"Conference", 'String'>
    readonly type: FieldRef<"Conference", 'String'>
    readonly date: FieldRef<"Conference", 'String'>
    readonly year: FieldRef<"Conference", 'Int'>
    readonly organization: FieldRef<"Conference", 'String'>
    readonly url: FieldRef<"Conference", 'String'>
    readonly youtubeUrl: FieldRef<"Conference", 'String'>
    readonly infoAdicional: FieldRef<"Conference", 'String'>
    readonly description: FieldRef<"Conference", 'String'>
    readonly summary: FieldRef<"Conference", 'String'>
    readonly topics: FieldRef<"Conference", 'String[]'>
    readonly characters: FieldRef<"Conference", 'String[]'>
    readonly civilizations: FieldRef<"Conference", 'String[]'>
    readonly duration: FieldRef<"Conference", 'String'>
    readonly language: FieldRef<"Conference", 'String'>
    readonly source: FieldRef<"Conference", 'String'>
    readonly mediaType: FieldRef<"Conference", 'String'>
    readonly createdAt: FieldRef<"Conference", 'DateTime'>
    readonly updatedAt: FieldRef<"Conference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conference findUnique
   */
  export type ConferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter, which Conference to fetch.
     */
    where: ConferenceWhereUniqueInput
  }

  /**
   * Conference findUniqueOrThrow
   */
  export type ConferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter, which Conference to fetch.
     */
    where: ConferenceWhereUniqueInput
  }

  /**
   * Conference findFirst
   */
  export type ConferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter, which Conference to fetch.
     */
    where?: ConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conferences to fetch.
     */
    orderBy?: ConferenceOrderByWithRelationInput | ConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conferences.
     */
    cursor?: ConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conferences.
     */
    distinct?: ConferenceScalarFieldEnum | ConferenceScalarFieldEnum[]
  }

  /**
   * Conference findFirstOrThrow
   */
  export type ConferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter, which Conference to fetch.
     */
    where?: ConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conferences to fetch.
     */
    orderBy?: ConferenceOrderByWithRelationInput | ConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conferences.
     */
    cursor?: ConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conferences.
     */
    distinct?: ConferenceScalarFieldEnum | ConferenceScalarFieldEnum[]
  }

  /**
   * Conference findMany
   */
  export type ConferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter, which Conferences to fetch.
     */
    where?: ConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conferences to fetch.
     */
    orderBy?: ConferenceOrderByWithRelationInput | ConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conferences.
     */
    cursor?: ConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conferences.
     */
    distinct?: ConferenceScalarFieldEnum | ConferenceScalarFieldEnum[]
  }

  /**
   * Conference create
   */
  export type ConferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Conference.
     */
    data: XOR<ConferenceCreateInput, ConferenceUncheckedCreateInput>
  }

  /**
   * Conference createMany
   */
  export type ConferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conferences.
     */
    data: ConferenceCreateManyInput | ConferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conference createManyAndReturn
   */
  export type ConferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * The data used to create many Conferences.
     */
    data: ConferenceCreateManyInput | ConferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conference update
   */
  export type ConferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Conference.
     */
    data: XOR<ConferenceUpdateInput, ConferenceUncheckedUpdateInput>
    /**
     * Choose, which Conference to update.
     */
    where: ConferenceWhereUniqueInput
  }

  /**
   * Conference updateMany
   */
  export type ConferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conferences.
     */
    data: XOR<ConferenceUpdateManyMutationInput, ConferenceUncheckedUpdateManyInput>
    /**
     * Filter which Conferences to update
     */
    where?: ConferenceWhereInput
    /**
     * Limit how many Conferences to update.
     */
    limit?: number
  }

  /**
   * Conference updateManyAndReturn
   */
  export type ConferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * The data used to update Conferences.
     */
    data: XOR<ConferenceUpdateManyMutationInput, ConferenceUncheckedUpdateManyInput>
    /**
     * Filter which Conferences to update
     */
    where?: ConferenceWhereInput
    /**
     * Limit how many Conferences to update.
     */
    limit?: number
  }

  /**
   * Conference upsert
   */
  export type ConferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Conference to update in case it exists.
     */
    where: ConferenceWhereUniqueInput
    /**
     * In case the Conference found by the `where` argument doesn't exist, create a new Conference with this data.
     */
    create: XOR<ConferenceCreateInput, ConferenceUncheckedCreateInput>
    /**
     * In case the Conference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConferenceUpdateInput, ConferenceUncheckedUpdateInput>
  }

  /**
   * Conference delete
   */
  export type ConferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
    /**
     * Filter which Conference to delete.
     */
    where: ConferenceWhereUniqueInput
  }

  /**
   * Conference deleteMany
   */
  export type ConferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conferences to delete
     */
    where?: ConferenceWhereInput
    /**
     * Limit how many Conferences to delete.
     */
    limit?: number
  }

  /**
   * Conference.watchedBy
   */
  export type Conference$watchedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    where?: UserWatchedConferenceWhereInput
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    cursor?: UserWatchedConferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWatchedConferenceScalarFieldEnum | UserWatchedConferenceScalarFieldEnum[]
  }

  /**
   * Conference without action
   */
  export type ConferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conference
     */
    select?: ConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conference
     */
    omit?: ConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConferenceInclude<ExtArgs> | null
  }


  /**
   * Model TimelineEvent
   */

  export type AggregateTimelineEvent = {
    _count: TimelineEventCountAggregateOutputType | null
    _avg: TimelineEventAvgAggregateOutputType | null
    _sum: TimelineEventSumAggregateOutputType | null
    _min: TimelineEventMinAggregateOutputType | null
    _max: TimelineEventMaxAggregateOutputType | null
  }

  export type TimelineEventAvgAggregateOutputType = {
    startYear: number | null
    endYear: number | null
  }

  export type TimelineEventSumAggregateOutputType = {
    startYear: number | null
    endYear: number | null
  }

  export type TimelineEventMinAggregateOutputType = {
    id: string | null
    title: string | null
    dateLabel: string | null
    startYear: number | null
    endYear: number | null
    period: string | null
    location: string | null
    description: string | null
    summary: string | null
  }

  export type TimelineEventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    dateLabel: string | null
    startYear: number | null
    endYear: number | null
    period: string | null
    location: string | null
    description: string | null
    summary: string | null
  }

  export type TimelineEventCountAggregateOutputType = {
    id: number
    title: number
    dateLabel: number
    startYear: number
    endYear: number
    period: number
    location: number
    description: number
    summary: number
    consequences: number
    characters: number
    civilizations: number
    topics: number
    sourceConference: number
    relatedConferences: number
    _all: number
  }


  export type TimelineEventAvgAggregateInputType = {
    startYear?: true
    endYear?: true
  }

  export type TimelineEventSumAggregateInputType = {
    startYear?: true
    endYear?: true
  }

  export type TimelineEventMinAggregateInputType = {
    id?: true
    title?: true
    dateLabel?: true
    startYear?: true
    endYear?: true
    period?: true
    location?: true
    description?: true
    summary?: true
  }

  export type TimelineEventMaxAggregateInputType = {
    id?: true
    title?: true
    dateLabel?: true
    startYear?: true
    endYear?: true
    period?: true
    location?: true
    description?: true
    summary?: true
  }

  export type TimelineEventCountAggregateInputType = {
    id?: true
    title?: true
    dateLabel?: true
    startYear?: true
    endYear?: true
    period?: true
    location?: true
    description?: true
    summary?: true
    consequences?: true
    characters?: true
    civilizations?: true
    topics?: true
    sourceConference?: true
    relatedConferences?: true
    _all?: true
  }

  export type TimelineEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEvent to aggregate.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineEvents
    **/
    _count?: true | TimelineEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimelineEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimelineEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineEventMaxAggregateInputType
  }

  export type GetTimelineEventAggregateType<T extends TimelineEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineEvent[P]>
      : GetScalarType<T[P], AggregateTimelineEvent[P]>
  }




  export type TimelineEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineEventWhereInput
    orderBy?: TimelineEventOrderByWithAggregationInput | TimelineEventOrderByWithAggregationInput[]
    by: TimelineEventScalarFieldEnum[] | TimelineEventScalarFieldEnum
    having?: TimelineEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineEventCountAggregateInputType | true
    _avg?: TimelineEventAvgAggregateInputType
    _sum?: TimelineEventSumAggregateInputType
    _min?: TimelineEventMinAggregateInputType
    _max?: TimelineEventMaxAggregateInputType
  }

  export type TimelineEventGroupByOutputType = {
    id: string
    title: string
    dateLabel: string
    startYear: number
    endYear: number
    period: string
    location: string
    description: string
    summary: string
    consequences: string[]
    characters: string[]
    civilizations: string[]
    topics: string[]
    sourceConference: JsonValue | null
    relatedConferences: string[]
    _count: TimelineEventCountAggregateOutputType | null
    _avg: TimelineEventAvgAggregateOutputType | null
    _sum: TimelineEventSumAggregateOutputType | null
    _min: TimelineEventMinAggregateOutputType | null
    _max: TimelineEventMaxAggregateOutputType | null
  }

  type GetTimelineEventGroupByPayload<T extends TimelineEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineEventGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineEventGroupByOutputType[P]>
        }
      >
    >


  export type TimelineEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dateLabel?: boolean
    startYear?: boolean
    endYear?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    summary?: boolean
    consequences?: boolean
    characters?: boolean
    civilizations?: boolean
    topics?: boolean
    sourceConference?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["timelineEvent"]>

  export type TimelineEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dateLabel?: boolean
    startYear?: boolean
    endYear?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    summary?: boolean
    consequences?: boolean
    characters?: boolean
    civilizations?: boolean
    topics?: boolean
    sourceConference?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["timelineEvent"]>

  export type TimelineEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    dateLabel?: boolean
    startYear?: boolean
    endYear?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    summary?: boolean
    consequences?: boolean
    characters?: boolean
    civilizations?: boolean
    topics?: boolean
    sourceConference?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["timelineEvent"]>

  export type TimelineEventSelectScalar = {
    id?: boolean
    title?: boolean
    dateLabel?: boolean
    startYear?: boolean
    endYear?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    summary?: boolean
    consequences?: boolean
    characters?: boolean
    civilizations?: boolean
    topics?: boolean
    sourceConference?: boolean
    relatedConferences?: boolean
  }

  export type TimelineEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "dateLabel" | "startYear" | "endYear" | "period" | "location" | "description" | "summary" | "consequences" | "characters" | "civilizations" | "topics" | "sourceConference" | "relatedConferences", ExtArgs["result"]["timelineEvent"]>

  export type $TimelineEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      dateLabel: string
      startYear: number
      endYear: number
      period: string
      location: string
      description: string
      summary: string
      consequences: string[]
      characters: string[]
      civilizations: string[]
      topics: string[]
      sourceConference: Prisma.JsonValue | null
      relatedConferences: string[]
    }, ExtArgs["result"]["timelineEvent"]>
    composites: {}
  }

  type TimelineEventGetPayload<S extends boolean | null | undefined | TimelineEventDefaultArgs> = $Result.GetResult<Prisma.$TimelineEventPayload, S>

  type TimelineEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimelineEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimelineEventCountAggregateInputType | true
    }

  export interface TimelineEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineEvent'], meta: { name: 'TimelineEvent' } }
    /**
     * Find zero or one TimelineEvent that matches the filter.
     * @param {TimelineEventFindUniqueArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineEventFindUniqueArgs>(args: SelectSubset<T, TimelineEventFindUniqueArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimelineEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimelineEventFindUniqueOrThrowArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindFirstArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineEventFindFirstArgs>(args?: SelectSubset<T, TimelineEventFindFirstArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindFirstOrThrowArgs} args - Arguments to find a TimelineEvent
     * @example
     * // Get one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimelineEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineEvents
     * const timelineEvents = await prisma.timelineEvent.findMany()
     * 
     * // Get first 10 TimelineEvents
     * const timelineEvents = await prisma.timelineEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineEventWithIdOnly = await prisma.timelineEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineEventFindManyArgs>(args?: SelectSubset<T, TimelineEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimelineEvent.
     * @param {TimelineEventCreateArgs} args - Arguments to create a TimelineEvent.
     * @example
     * // Create one TimelineEvent
     * const TimelineEvent = await prisma.timelineEvent.create({
     *   data: {
     *     // ... data to create a TimelineEvent
     *   }
     * })
     * 
     */
    create<T extends TimelineEventCreateArgs>(args: SelectSubset<T, TimelineEventCreateArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimelineEvents.
     * @param {TimelineEventCreateManyArgs} args - Arguments to create many TimelineEvents.
     * @example
     * // Create many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineEventCreateManyArgs>(args?: SelectSubset<T, TimelineEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineEvents and returns the data saved in the database.
     * @param {TimelineEventCreateManyAndReturnArgs} args - Arguments to create many TimelineEvents.
     * @example
     * // Create many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineEvents and only return the `id`
     * const timelineEventWithIdOnly = await prisma.timelineEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineEventCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimelineEvent.
     * @param {TimelineEventDeleteArgs} args - Arguments to delete one TimelineEvent.
     * @example
     * // Delete one TimelineEvent
     * const TimelineEvent = await prisma.timelineEvent.delete({
     *   where: {
     *     // ... filter to delete one TimelineEvent
     *   }
     * })
     * 
     */
    delete<T extends TimelineEventDeleteArgs>(args: SelectSubset<T, TimelineEventDeleteArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimelineEvent.
     * @param {TimelineEventUpdateArgs} args - Arguments to update one TimelineEvent.
     * @example
     * // Update one TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineEventUpdateArgs>(args: SelectSubset<T, TimelineEventUpdateArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimelineEvents.
     * @param {TimelineEventDeleteManyArgs} args - Arguments to filter TimelineEvents to delete.
     * @example
     * // Delete a few TimelineEvents
     * const { count } = await prisma.timelineEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineEventDeleteManyArgs>(args?: SelectSubset<T, TimelineEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineEventUpdateManyArgs>(args: SelectSubset<T, TimelineEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineEvents and returns the data updated in the database.
     * @param {TimelineEventUpdateManyAndReturnArgs} args - Arguments to update many TimelineEvents.
     * @example
     * // Update many TimelineEvents
     * const timelineEvent = await prisma.timelineEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimelineEvents and only return the `id`
     * const timelineEventWithIdOnly = await prisma.timelineEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimelineEventUpdateManyAndReturnArgs>(args: SelectSubset<T, TimelineEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimelineEvent.
     * @param {TimelineEventUpsertArgs} args - Arguments to update or create a TimelineEvent.
     * @example
     * // Update or create a TimelineEvent
     * const timelineEvent = await prisma.timelineEvent.upsert({
     *   create: {
     *     // ... data to create a TimelineEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineEvent we want to update
     *   }
     * })
     */
    upsert<T extends TimelineEventUpsertArgs>(args: SelectSubset<T, TimelineEventUpsertArgs<ExtArgs>>): Prisma__TimelineEventClient<$Result.GetResult<Prisma.$TimelineEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimelineEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventCountArgs} args - Arguments to filter TimelineEvents to count.
     * @example
     * // Count the number of TimelineEvents
     * const count = await prisma.timelineEvent.count({
     *   where: {
     *     // ... the filter for the TimelineEvents we want to count
     *   }
     * })
    **/
    count<T extends TimelineEventCountArgs>(
      args?: Subset<T, TimelineEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimelineEventAggregateArgs>(args: Subset<T, TimelineEventAggregateArgs>): Prisma.PrismaPromise<GetTimelineEventAggregateType<T>>

    /**
     * Group by TimelineEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEventGroupByArgs} args - Group by arguments.
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
      T extends TimelineEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineEventGroupByArgs['orderBy'] }
        : { orderBy?: TimelineEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, TimelineEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineEvent model
   */
  readonly fields: TimelineEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimelineEvent model
   */
  interface TimelineEventFieldRefs {
    readonly id: FieldRef<"TimelineEvent", 'String'>
    readonly title: FieldRef<"TimelineEvent", 'String'>
    readonly dateLabel: FieldRef<"TimelineEvent", 'String'>
    readonly startYear: FieldRef<"TimelineEvent", 'Int'>
    readonly endYear: FieldRef<"TimelineEvent", 'Int'>
    readonly period: FieldRef<"TimelineEvent", 'String'>
    readonly location: FieldRef<"TimelineEvent", 'String'>
    readonly description: FieldRef<"TimelineEvent", 'String'>
    readonly summary: FieldRef<"TimelineEvent", 'String'>
    readonly consequences: FieldRef<"TimelineEvent", 'String[]'>
    readonly characters: FieldRef<"TimelineEvent", 'String[]'>
    readonly civilizations: FieldRef<"TimelineEvent", 'String[]'>
    readonly topics: FieldRef<"TimelineEvent", 'String[]'>
    readonly sourceConference: FieldRef<"TimelineEvent", 'Json'>
    readonly relatedConferences: FieldRef<"TimelineEvent", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * TimelineEvent findUnique
   */
  export type TimelineEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent findUniqueOrThrow
   */
  export type TimelineEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent findFirst
   */
  export type TimelineEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEvents.
     */
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent findFirstOrThrow
   */
  export type TimelineEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter, which TimelineEvent to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEvents.
     */
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent findMany
   */
  export type TimelineEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter, which TimelineEvents to fetch.
     */
    where?: TimelineEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEvents to fetch.
     */
    orderBy?: TimelineEventOrderByWithRelationInput | TimelineEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineEvents.
     */
    cursor?: TimelineEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEvents.
     */
    distinct?: TimelineEventScalarFieldEnum | TimelineEventScalarFieldEnum[]
  }

  /**
   * TimelineEvent create
   */
  export type TimelineEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * The data needed to create a TimelineEvent.
     */
    data: XOR<TimelineEventCreateInput, TimelineEventUncheckedCreateInput>
  }

  /**
   * TimelineEvent createMany
   */
  export type TimelineEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineEvents.
     */
    data: TimelineEventCreateManyInput | TimelineEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineEvent createManyAndReturn
   */
  export type TimelineEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * The data used to create many TimelineEvents.
     */
    data: TimelineEventCreateManyInput | TimelineEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineEvent update
   */
  export type TimelineEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * The data needed to update a TimelineEvent.
     */
    data: XOR<TimelineEventUpdateInput, TimelineEventUncheckedUpdateInput>
    /**
     * Choose, which TimelineEvent to update.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent updateMany
   */
  export type TimelineEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineEvents.
     */
    data: XOR<TimelineEventUpdateManyMutationInput, TimelineEventUncheckedUpdateManyInput>
    /**
     * Filter which TimelineEvents to update
     */
    where?: TimelineEventWhereInput
    /**
     * Limit how many TimelineEvents to update.
     */
    limit?: number
  }

  /**
   * TimelineEvent updateManyAndReturn
   */
  export type TimelineEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * The data used to update TimelineEvents.
     */
    data: XOR<TimelineEventUpdateManyMutationInput, TimelineEventUncheckedUpdateManyInput>
    /**
     * Filter which TimelineEvents to update
     */
    where?: TimelineEventWhereInput
    /**
     * Limit how many TimelineEvents to update.
     */
    limit?: number
  }

  /**
   * TimelineEvent upsert
   */
  export type TimelineEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * The filter to search for the TimelineEvent to update in case it exists.
     */
    where: TimelineEventWhereUniqueInput
    /**
     * In case the TimelineEvent found by the `where` argument doesn't exist, create a new TimelineEvent with this data.
     */
    create: XOR<TimelineEventCreateInput, TimelineEventUncheckedCreateInput>
    /**
     * In case the TimelineEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineEventUpdateInput, TimelineEventUncheckedUpdateInput>
  }

  /**
   * TimelineEvent delete
   */
  export type TimelineEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
    /**
     * Filter which TimelineEvent to delete.
     */
    where: TimelineEventWhereUniqueInput
  }

  /**
   * TimelineEvent deleteMany
   */
  export type TimelineEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEvents to delete
     */
    where?: TimelineEventWhereInput
    /**
     * Limit how many TimelineEvents to delete.
     */
    limit?: number
  }

  /**
   * TimelineEvent without action
   */
  export type TimelineEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEvent
     */
    select?: TimelineEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEvent
     */
    omit?: TimelineEventOmit<ExtArgs> | null
  }


  /**
   * Model PeopleGroup
   */

  export type AggregatePeopleGroup = {
    _count: PeopleGroupCountAggregateOutputType | null
    _avg: PeopleGroupAvgAggregateOutputType | null
    _sum: PeopleGroupSumAggregateOutputType | null
    _min: PeopleGroupMinAggregateOutputType | null
    _max: PeopleGroupMaxAggregateOutputType | null
  }

  export type PeopleGroupAvgAggregateOutputType = {
    startYear: number | null
    endYear: number | null
    peakYear: number | null
    peakPopulation: number | null
  }

  export type PeopleGroupSumAggregateOutputType = {
    startYear: number | null
    endYear: number | null
    peakYear: number | null
    peakPopulation: number | null
  }

  export type PeopleGroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    startYear: number | null
    endYear: number | null
    peakYear: number | null
    peakPopulation: number | null
    color: string | null
    region: string | null
    description: string | null
  }

  export type PeopleGroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    startYear: number | null
    endYear: number | null
    peakYear: number | null
    peakPopulation: number | null
    color: string | null
    region: string | null
    description: string | null
  }

  export type PeopleGroupCountAggregateOutputType = {
    id: number
    name: number
    startYear: number
    endYear: number
    peakYear: number
    peakPopulation: number
    color: number
    region: number
    description: number
    civilizations: number
    relatedConferences: number
    _all: number
  }


  export type PeopleGroupAvgAggregateInputType = {
    startYear?: true
    endYear?: true
    peakYear?: true
    peakPopulation?: true
  }

  export type PeopleGroupSumAggregateInputType = {
    startYear?: true
    endYear?: true
    peakYear?: true
    peakPopulation?: true
  }

  export type PeopleGroupMinAggregateInputType = {
    id?: true
    name?: true
    startYear?: true
    endYear?: true
    peakYear?: true
    peakPopulation?: true
    color?: true
    region?: true
    description?: true
  }

  export type PeopleGroupMaxAggregateInputType = {
    id?: true
    name?: true
    startYear?: true
    endYear?: true
    peakYear?: true
    peakPopulation?: true
    color?: true
    region?: true
    description?: true
  }

  export type PeopleGroupCountAggregateInputType = {
    id?: true
    name?: true
    startYear?: true
    endYear?: true
    peakYear?: true
    peakPopulation?: true
    color?: true
    region?: true
    description?: true
    civilizations?: true
    relatedConferences?: true
    _all?: true
  }

  export type PeopleGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeopleGroup to aggregate.
     */
    where?: PeopleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeopleGroups to fetch.
     */
    orderBy?: PeopleGroupOrderByWithRelationInput | PeopleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeopleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeopleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeopleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PeopleGroups
    **/
    _count?: true | PeopleGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PeopleGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PeopleGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeopleGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeopleGroupMaxAggregateInputType
  }

  export type GetPeopleGroupAggregateType<T extends PeopleGroupAggregateArgs> = {
        [P in keyof T & keyof AggregatePeopleGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeopleGroup[P]>
      : GetScalarType<T[P], AggregatePeopleGroup[P]>
  }




  export type PeopleGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeopleGroupWhereInput
    orderBy?: PeopleGroupOrderByWithAggregationInput | PeopleGroupOrderByWithAggregationInput[]
    by: PeopleGroupScalarFieldEnum[] | PeopleGroupScalarFieldEnum
    having?: PeopleGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeopleGroupCountAggregateInputType | true
    _avg?: PeopleGroupAvgAggregateInputType
    _sum?: PeopleGroupSumAggregateInputType
    _min?: PeopleGroupMinAggregateInputType
    _max?: PeopleGroupMaxAggregateInputType
  }

  export type PeopleGroupGroupByOutputType = {
    id: string
    name: string
    startYear: number
    endYear: number
    peakYear: number
    peakPopulation: number
    color: string
    region: string
    description: string
    civilizations: string[]
    relatedConferences: string[]
    _count: PeopleGroupCountAggregateOutputType | null
    _avg: PeopleGroupAvgAggregateOutputType | null
    _sum: PeopleGroupSumAggregateOutputType | null
    _min: PeopleGroupMinAggregateOutputType | null
    _max: PeopleGroupMaxAggregateOutputType | null
  }

  type GetPeopleGroupGroupByPayload<T extends PeopleGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeopleGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeopleGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeopleGroupGroupByOutputType[P]>
            : GetScalarType<T[P], PeopleGroupGroupByOutputType[P]>
        }
      >
    >


  export type PeopleGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    startYear?: boolean
    endYear?: boolean
    peakYear?: boolean
    peakPopulation?: boolean
    color?: boolean
    region?: boolean
    description?: boolean
    civilizations?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["peopleGroup"]>

  export type PeopleGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    startYear?: boolean
    endYear?: boolean
    peakYear?: boolean
    peakPopulation?: boolean
    color?: boolean
    region?: boolean
    description?: boolean
    civilizations?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["peopleGroup"]>

  export type PeopleGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    startYear?: boolean
    endYear?: boolean
    peakYear?: boolean
    peakPopulation?: boolean
    color?: boolean
    region?: boolean
    description?: boolean
    civilizations?: boolean
    relatedConferences?: boolean
  }, ExtArgs["result"]["peopleGroup"]>

  export type PeopleGroupSelectScalar = {
    id?: boolean
    name?: boolean
    startYear?: boolean
    endYear?: boolean
    peakYear?: boolean
    peakPopulation?: boolean
    color?: boolean
    region?: boolean
    description?: boolean
    civilizations?: boolean
    relatedConferences?: boolean
  }

  export type PeopleGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "startYear" | "endYear" | "peakYear" | "peakPopulation" | "color" | "region" | "description" | "civilizations" | "relatedConferences", ExtArgs["result"]["peopleGroup"]>

  export type $PeopleGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PeopleGroup"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      startYear: number
      endYear: number
      peakYear: number
      peakPopulation: number
      color: string
      region: string
      description: string
      civilizations: string[]
      relatedConferences: string[]
    }, ExtArgs["result"]["peopleGroup"]>
    composites: {}
  }

  type PeopleGroupGetPayload<S extends boolean | null | undefined | PeopleGroupDefaultArgs> = $Result.GetResult<Prisma.$PeopleGroupPayload, S>

  type PeopleGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeopleGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeopleGroupCountAggregateInputType | true
    }

  export interface PeopleGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PeopleGroup'], meta: { name: 'PeopleGroup' } }
    /**
     * Find zero or one PeopleGroup that matches the filter.
     * @param {PeopleGroupFindUniqueArgs} args - Arguments to find a PeopleGroup
     * @example
     * // Get one PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeopleGroupFindUniqueArgs>(args: SelectSubset<T, PeopleGroupFindUniqueArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PeopleGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeopleGroupFindUniqueOrThrowArgs} args - Arguments to find a PeopleGroup
     * @example
     * // Get one PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeopleGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, PeopleGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PeopleGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupFindFirstArgs} args - Arguments to find a PeopleGroup
     * @example
     * // Get one PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeopleGroupFindFirstArgs>(args?: SelectSubset<T, PeopleGroupFindFirstArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PeopleGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupFindFirstOrThrowArgs} args - Arguments to find a PeopleGroup
     * @example
     * // Get one PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeopleGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, PeopleGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PeopleGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PeopleGroups
     * const peopleGroups = await prisma.peopleGroup.findMany()
     * 
     * // Get first 10 PeopleGroups
     * const peopleGroups = await prisma.peopleGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peopleGroupWithIdOnly = await prisma.peopleGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeopleGroupFindManyArgs>(args?: SelectSubset<T, PeopleGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PeopleGroup.
     * @param {PeopleGroupCreateArgs} args - Arguments to create a PeopleGroup.
     * @example
     * // Create one PeopleGroup
     * const PeopleGroup = await prisma.peopleGroup.create({
     *   data: {
     *     // ... data to create a PeopleGroup
     *   }
     * })
     * 
     */
    create<T extends PeopleGroupCreateArgs>(args: SelectSubset<T, PeopleGroupCreateArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PeopleGroups.
     * @param {PeopleGroupCreateManyArgs} args - Arguments to create many PeopleGroups.
     * @example
     * // Create many PeopleGroups
     * const peopleGroup = await prisma.peopleGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeopleGroupCreateManyArgs>(args?: SelectSubset<T, PeopleGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PeopleGroups and returns the data saved in the database.
     * @param {PeopleGroupCreateManyAndReturnArgs} args - Arguments to create many PeopleGroups.
     * @example
     * // Create many PeopleGroups
     * const peopleGroup = await prisma.peopleGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PeopleGroups and only return the `id`
     * const peopleGroupWithIdOnly = await prisma.peopleGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeopleGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, PeopleGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PeopleGroup.
     * @param {PeopleGroupDeleteArgs} args - Arguments to delete one PeopleGroup.
     * @example
     * // Delete one PeopleGroup
     * const PeopleGroup = await prisma.peopleGroup.delete({
     *   where: {
     *     // ... filter to delete one PeopleGroup
     *   }
     * })
     * 
     */
    delete<T extends PeopleGroupDeleteArgs>(args: SelectSubset<T, PeopleGroupDeleteArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PeopleGroup.
     * @param {PeopleGroupUpdateArgs} args - Arguments to update one PeopleGroup.
     * @example
     * // Update one PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeopleGroupUpdateArgs>(args: SelectSubset<T, PeopleGroupUpdateArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PeopleGroups.
     * @param {PeopleGroupDeleteManyArgs} args - Arguments to filter PeopleGroups to delete.
     * @example
     * // Delete a few PeopleGroups
     * const { count } = await prisma.peopleGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeopleGroupDeleteManyArgs>(args?: SelectSubset<T, PeopleGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PeopleGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PeopleGroups
     * const peopleGroup = await prisma.peopleGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeopleGroupUpdateManyArgs>(args: SelectSubset<T, PeopleGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PeopleGroups and returns the data updated in the database.
     * @param {PeopleGroupUpdateManyAndReturnArgs} args - Arguments to update many PeopleGroups.
     * @example
     * // Update many PeopleGroups
     * const peopleGroup = await prisma.peopleGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PeopleGroups and only return the `id`
     * const peopleGroupWithIdOnly = await prisma.peopleGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PeopleGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, PeopleGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PeopleGroup.
     * @param {PeopleGroupUpsertArgs} args - Arguments to update or create a PeopleGroup.
     * @example
     * // Update or create a PeopleGroup
     * const peopleGroup = await prisma.peopleGroup.upsert({
     *   create: {
     *     // ... data to create a PeopleGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PeopleGroup we want to update
     *   }
     * })
     */
    upsert<T extends PeopleGroupUpsertArgs>(args: SelectSubset<T, PeopleGroupUpsertArgs<ExtArgs>>): Prisma__PeopleGroupClient<$Result.GetResult<Prisma.$PeopleGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PeopleGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupCountArgs} args - Arguments to filter PeopleGroups to count.
     * @example
     * // Count the number of PeopleGroups
     * const count = await prisma.peopleGroup.count({
     *   where: {
     *     // ... the filter for the PeopleGroups we want to count
     *   }
     * })
    **/
    count<T extends PeopleGroupCountArgs>(
      args?: Subset<T, PeopleGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeopleGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PeopleGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PeopleGroupAggregateArgs>(args: Subset<T, PeopleGroupAggregateArgs>): Prisma.PrismaPromise<GetPeopleGroupAggregateType<T>>

    /**
     * Group by PeopleGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeopleGroupGroupByArgs} args - Group by arguments.
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
      T extends PeopleGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeopleGroupGroupByArgs['orderBy'] }
        : { orderBy?: PeopleGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PeopleGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeopleGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PeopleGroup model
   */
  readonly fields: PeopleGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PeopleGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeopleGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PeopleGroup model
   */
  interface PeopleGroupFieldRefs {
    readonly id: FieldRef<"PeopleGroup", 'String'>
    readonly name: FieldRef<"PeopleGroup", 'String'>
    readonly startYear: FieldRef<"PeopleGroup", 'Int'>
    readonly endYear: FieldRef<"PeopleGroup", 'Int'>
    readonly peakYear: FieldRef<"PeopleGroup", 'Int'>
    readonly peakPopulation: FieldRef<"PeopleGroup", 'Int'>
    readonly color: FieldRef<"PeopleGroup", 'String'>
    readonly region: FieldRef<"PeopleGroup", 'String'>
    readonly description: FieldRef<"PeopleGroup", 'String'>
    readonly civilizations: FieldRef<"PeopleGroup", 'String[]'>
    readonly relatedConferences: FieldRef<"PeopleGroup", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * PeopleGroup findUnique
   */
  export type PeopleGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter, which PeopleGroup to fetch.
     */
    where: PeopleGroupWhereUniqueInput
  }

  /**
   * PeopleGroup findUniqueOrThrow
   */
  export type PeopleGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter, which PeopleGroup to fetch.
     */
    where: PeopleGroupWhereUniqueInput
  }

  /**
   * PeopleGroup findFirst
   */
  export type PeopleGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter, which PeopleGroup to fetch.
     */
    where?: PeopleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeopleGroups to fetch.
     */
    orderBy?: PeopleGroupOrderByWithRelationInput | PeopleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeopleGroups.
     */
    cursor?: PeopleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeopleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeopleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeopleGroups.
     */
    distinct?: PeopleGroupScalarFieldEnum | PeopleGroupScalarFieldEnum[]
  }

  /**
   * PeopleGroup findFirstOrThrow
   */
  export type PeopleGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter, which PeopleGroup to fetch.
     */
    where?: PeopleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeopleGroups to fetch.
     */
    orderBy?: PeopleGroupOrderByWithRelationInput | PeopleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeopleGroups.
     */
    cursor?: PeopleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeopleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeopleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeopleGroups.
     */
    distinct?: PeopleGroupScalarFieldEnum | PeopleGroupScalarFieldEnum[]
  }

  /**
   * PeopleGroup findMany
   */
  export type PeopleGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter, which PeopleGroups to fetch.
     */
    where?: PeopleGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeopleGroups to fetch.
     */
    orderBy?: PeopleGroupOrderByWithRelationInput | PeopleGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PeopleGroups.
     */
    cursor?: PeopleGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeopleGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeopleGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeopleGroups.
     */
    distinct?: PeopleGroupScalarFieldEnum | PeopleGroupScalarFieldEnum[]
  }

  /**
   * PeopleGroup create
   */
  export type PeopleGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * The data needed to create a PeopleGroup.
     */
    data: XOR<PeopleGroupCreateInput, PeopleGroupUncheckedCreateInput>
  }

  /**
   * PeopleGroup createMany
   */
  export type PeopleGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PeopleGroups.
     */
    data: PeopleGroupCreateManyInput | PeopleGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PeopleGroup createManyAndReturn
   */
  export type PeopleGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * The data used to create many PeopleGroups.
     */
    data: PeopleGroupCreateManyInput | PeopleGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PeopleGroup update
   */
  export type PeopleGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * The data needed to update a PeopleGroup.
     */
    data: XOR<PeopleGroupUpdateInput, PeopleGroupUncheckedUpdateInput>
    /**
     * Choose, which PeopleGroup to update.
     */
    where: PeopleGroupWhereUniqueInput
  }

  /**
   * PeopleGroup updateMany
   */
  export type PeopleGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PeopleGroups.
     */
    data: XOR<PeopleGroupUpdateManyMutationInput, PeopleGroupUncheckedUpdateManyInput>
    /**
     * Filter which PeopleGroups to update
     */
    where?: PeopleGroupWhereInput
    /**
     * Limit how many PeopleGroups to update.
     */
    limit?: number
  }

  /**
   * PeopleGroup updateManyAndReturn
   */
  export type PeopleGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * The data used to update PeopleGroups.
     */
    data: XOR<PeopleGroupUpdateManyMutationInput, PeopleGroupUncheckedUpdateManyInput>
    /**
     * Filter which PeopleGroups to update
     */
    where?: PeopleGroupWhereInput
    /**
     * Limit how many PeopleGroups to update.
     */
    limit?: number
  }

  /**
   * PeopleGroup upsert
   */
  export type PeopleGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * The filter to search for the PeopleGroup to update in case it exists.
     */
    where: PeopleGroupWhereUniqueInput
    /**
     * In case the PeopleGroup found by the `where` argument doesn't exist, create a new PeopleGroup with this data.
     */
    create: XOR<PeopleGroupCreateInput, PeopleGroupUncheckedCreateInput>
    /**
     * In case the PeopleGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeopleGroupUpdateInput, PeopleGroupUncheckedUpdateInput>
  }

  /**
   * PeopleGroup delete
   */
  export type PeopleGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
    /**
     * Filter which PeopleGroup to delete.
     */
    where: PeopleGroupWhereUniqueInput
  }

  /**
   * PeopleGroup deleteMany
   */
  export type PeopleGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeopleGroups to delete
     */
    where?: PeopleGroupWhereInput
    /**
     * Limit how many PeopleGroups to delete.
     */
    limit?: number
  }

  /**
   * PeopleGroup without action
   */
  export type PeopleGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeopleGroup
     */
    select?: PeopleGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeopleGroup
     */
    omit?: PeopleGroupOmit<ExtArgs> | null
  }


  /**
   * Model TimelineMeta
   */

  export type AggregateTimelineMeta = {
    _count: TimelineMetaCountAggregateOutputType | null
    _avg: TimelineMetaAvgAggregateOutputType | null
    _sum: TimelineMetaSumAggregateOutputType | null
    _min: TimelineMetaMinAggregateOutputType | null
    _max: TimelineMetaMaxAggregateOutputType | null
  }

  export type TimelineMetaAvgAggregateOutputType = {
    totalEventos: number | null
  }

  export type TimelineMetaSumAggregateOutputType = {
    totalEventos: number | null
  }

  export type TimelineMetaMinAggregateOutputType = {
    id: string | null
    autorContenido: string | null
    enfoque: string | null
    coberturaCronologica: string | null
    totalEventos: number | null
    ultimaActualizacion: string | null
  }

  export type TimelineMetaMaxAggregateOutputType = {
    id: string | null
    autorContenido: string | null
    enfoque: string | null
    coberturaCronologica: string | null
    totalEventos: number | null
    ultimaActualizacion: string | null
  }

  export type TimelineMetaCountAggregateOutputType = {
    id: number
    autorContenido: number
    enfoque: number
    coberturaCronologica: number
    totalEventos: number
    fuentesPrincipales: number
    ultimaActualizacion: number
    _all: number
  }


  export type TimelineMetaAvgAggregateInputType = {
    totalEventos?: true
  }

  export type TimelineMetaSumAggregateInputType = {
    totalEventos?: true
  }

  export type TimelineMetaMinAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalEventos?: true
    ultimaActualizacion?: true
  }

  export type TimelineMetaMaxAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalEventos?: true
    ultimaActualizacion?: true
  }

  export type TimelineMetaCountAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalEventos?: true
    fuentesPrincipales?: true
    ultimaActualizacion?: true
    _all?: true
  }

  export type TimelineMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineMeta to aggregate.
     */
    where?: TimelineMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineMetas to fetch.
     */
    orderBy?: TimelineMetaOrderByWithRelationInput | TimelineMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineMetas
    **/
    _count?: true | TimelineMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimelineMetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimelineMetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineMetaMaxAggregateInputType
  }

  export type GetTimelineMetaAggregateType<T extends TimelineMetaAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineMeta[P]>
      : GetScalarType<T[P], AggregateTimelineMeta[P]>
  }




  export type TimelineMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineMetaWhereInput
    orderBy?: TimelineMetaOrderByWithAggregationInput | TimelineMetaOrderByWithAggregationInput[]
    by: TimelineMetaScalarFieldEnum[] | TimelineMetaScalarFieldEnum
    having?: TimelineMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineMetaCountAggregateInputType | true
    _avg?: TimelineMetaAvgAggregateInputType
    _sum?: TimelineMetaSumAggregateInputType
    _min?: TimelineMetaMinAggregateInputType
    _max?: TimelineMetaMaxAggregateInputType
  }

  export type TimelineMetaGroupByOutputType = {
    id: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalEventos: number
    fuentesPrincipales: string[]
    ultimaActualizacion: string
    _count: TimelineMetaCountAggregateOutputType | null
    _avg: TimelineMetaAvgAggregateOutputType | null
    _sum: TimelineMetaSumAggregateOutputType | null
    _min: TimelineMetaMinAggregateOutputType | null
    _max: TimelineMetaMaxAggregateOutputType | null
  }

  type GetTimelineMetaGroupByPayload<T extends TimelineMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineMetaGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineMetaGroupByOutputType[P]>
        }
      >
    >


  export type TimelineMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalEventos?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["timelineMeta"]>

  export type TimelineMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalEventos?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["timelineMeta"]>

  export type TimelineMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalEventos?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["timelineMeta"]>

  export type TimelineMetaSelectScalar = {
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalEventos?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }

  export type TimelineMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "autorContenido" | "enfoque" | "coberturaCronologica" | "totalEventos" | "fuentesPrincipales" | "ultimaActualizacion", ExtArgs["result"]["timelineMeta"]>

  export type $TimelineMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineMeta"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      autorContenido: string
      enfoque: string
      coberturaCronologica: string
      totalEventos: number
      fuentesPrincipales: string[]
      ultimaActualizacion: string
    }, ExtArgs["result"]["timelineMeta"]>
    composites: {}
  }

  type TimelineMetaGetPayload<S extends boolean | null | undefined | TimelineMetaDefaultArgs> = $Result.GetResult<Prisma.$TimelineMetaPayload, S>

  type TimelineMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimelineMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimelineMetaCountAggregateInputType | true
    }

  export interface TimelineMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineMeta'], meta: { name: 'TimelineMeta' } }
    /**
     * Find zero or one TimelineMeta that matches the filter.
     * @param {TimelineMetaFindUniqueArgs} args - Arguments to find a TimelineMeta
     * @example
     * // Get one TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineMetaFindUniqueArgs>(args: SelectSubset<T, TimelineMetaFindUniqueArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimelineMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimelineMetaFindUniqueOrThrowArgs} args - Arguments to find a TimelineMeta
     * @example
     * // Get one TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaFindFirstArgs} args - Arguments to find a TimelineMeta
     * @example
     * // Get one TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineMetaFindFirstArgs>(args?: SelectSubset<T, TimelineMetaFindFirstArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaFindFirstOrThrowArgs} args - Arguments to find a TimelineMeta
     * @example
     * // Get one TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimelineMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineMetas
     * const timelineMetas = await prisma.timelineMeta.findMany()
     * 
     * // Get first 10 TimelineMetas
     * const timelineMetas = await prisma.timelineMeta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineMetaWithIdOnly = await prisma.timelineMeta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineMetaFindManyArgs>(args?: SelectSubset<T, TimelineMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimelineMeta.
     * @param {TimelineMetaCreateArgs} args - Arguments to create a TimelineMeta.
     * @example
     * // Create one TimelineMeta
     * const TimelineMeta = await prisma.timelineMeta.create({
     *   data: {
     *     // ... data to create a TimelineMeta
     *   }
     * })
     * 
     */
    create<T extends TimelineMetaCreateArgs>(args: SelectSubset<T, TimelineMetaCreateArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimelineMetas.
     * @param {TimelineMetaCreateManyArgs} args - Arguments to create many TimelineMetas.
     * @example
     * // Create many TimelineMetas
     * const timelineMeta = await prisma.timelineMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineMetaCreateManyArgs>(args?: SelectSubset<T, TimelineMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineMetas and returns the data saved in the database.
     * @param {TimelineMetaCreateManyAndReturnArgs} args - Arguments to create many TimelineMetas.
     * @example
     * // Create many TimelineMetas
     * const timelineMeta = await prisma.timelineMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineMetas and only return the `id`
     * const timelineMetaWithIdOnly = await prisma.timelineMeta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimelineMeta.
     * @param {TimelineMetaDeleteArgs} args - Arguments to delete one TimelineMeta.
     * @example
     * // Delete one TimelineMeta
     * const TimelineMeta = await prisma.timelineMeta.delete({
     *   where: {
     *     // ... filter to delete one TimelineMeta
     *   }
     * })
     * 
     */
    delete<T extends TimelineMetaDeleteArgs>(args: SelectSubset<T, TimelineMetaDeleteArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimelineMeta.
     * @param {TimelineMetaUpdateArgs} args - Arguments to update one TimelineMeta.
     * @example
     * // Update one TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineMetaUpdateArgs>(args: SelectSubset<T, TimelineMetaUpdateArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimelineMetas.
     * @param {TimelineMetaDeleteManyArgs} args - Arguments to filter TimelineMetas to delete.
     * @example
     * // Delete a few TimelineMetas
     * const { count } = await prisma.timelineMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineMetaDeleteManyArgs>(args?: SelectSubset<T, TimelineMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineMetas
     * const timelineMeta = await prisma.timelineMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineMetaUpdateManyArgs>(args: SelectSubset<T, TimelineMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineMetas and returns the data updated in the database.
     * @param {TimelineMetaUpdateManyAndReturnArgs} args - Arguments to update many TimelineMetas.
     * @example
     * // Update many TimelineMetas
     * const timelineMeta = await prisma.timelineMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimelineMetas and only return the `id`
     * const timelineMetaWithIdOnly = await prisma.timelineMeta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimelineMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, TimelineMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimelineMeta.
     * @param {TimelineMetaUpsertArgs} args - Arguments to update or create a TimelineMeta.
     * @example
     * // Update or create a TimelineMeta
     * const timelineMeta = await prisma.timelineMeta.upsert({
     *   create: {
     *     // ... data to create a TimelineMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineMeta we want to update
     *   }
     * })
     */
    upsert<T extends TimelineMetaUpsertArgs>(args: SelectSubset<T, TimelineMetaUpsertArgs<ExtArgs>>): Prisma__TimelineMetaClient<$Result.GetResult<Prisma.$TimelineMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimelineMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaCountArgs} args - Arguments to filter TimelineMetas to count.
     * @example
     * // Count the number of TimelineMetas
     * const count = await prisma.timelineMeta.count({
     *   where: {
     *     // ... the filter for the TimelineMetas we want to count
     *   }
     * })
    **/
    count<T extends TimelineMetaCountArgs>(
      args?: Subset<T, TimelineMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimelineMetaAggregateArgs>(args: Subset<T, TimelineMetaAggregateArgs>): Prisma.PrismaPromise<GetTimelineMetaAggregateType<T>>

    /**
     * Group by TimelineMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineMetaGroupByArgs} args - Group by arguments.
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
      T extends TimelineMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineMetaGroupByArgs['orderBy'] }
        : { orderBy?: TimelineMetaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, TimelineMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineMeta model
   */
  readonly fields: TimelineMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimelineMeta model
   */
  interface TimelineMetaFieldRefs {
    readonly id: FieldRef<"TimelineMeta", 'String'>
    readonly autorContenido: FieldRef<"TimelineMeta", 'String'>
    readonly enfoque: FieldRef<"TimelineMeta", 'String'>
    readonly coberturaCronologica: FieldRef<"TimelineMeta", 'String'>
    readonly totalEventos: FieldRef<"TimelineMeta", 'Int'>
    readonly fuentesPrincipales: FieldRef<"TimelineMeta", 'String[]'>
    readonly ultimaActualizacion: FieldRef<"TimelineMeta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TimelineMeta findUnique
   */
  export type TimelineMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter, which TimelineMeta to fetch.
     */
    where: TimelineMetaWhereUniqueInput
  }

  /**
   * TimelineMeta findUniqueOrThrow
   */
  export type TimelineMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter, which TimelineMeta to fetch.
     */
    where: TimelineMetaWhereUniqueInput
  }

  /**
   * TimelineMeta findFirst
   */
  export type TimelineMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter, which TimelineMeta to fetch.
     */
    where?: TimelineMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineMetas to fetch.
     */
    orderBy?: TimelineMetaOrderByWithRelationInput | TimelineMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineMetas.
     */
    cursor?: TimelineMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineMetas.
     */
    distinct?: TimelineMetaScalarFieldEnum | TimelineMetaScalarFieldEnum[]
  }

  /**
   * TimelineMeta findFirstOrThrow
   */
  export type TimelineMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter, which TimelineMeta to fetch.
     */
    where?: TimelineMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineMetas to fetch.
     */
    orderBy?: TimelineMetaOrderByWithRelationInput | TimelineMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineMetas.
     */
    cursor?: TimelineMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineMetas.
     */
    distinct?: TimelineMetaScalarFieldEnum | TimelineMetaScalarFieldEnum[]
  }

  /**
   * TimelineMeta findMany
   */
  export type TimelineMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter, which TimelineMetas to fetch.
     */
    where?: TimelineMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineMetas to fetch.
     */
    orderBy?: TimelineMetaOrderByWithRelationInput | TimelineMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineMetas.
     */
    cursor?: TimelineMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineMetas.
     */
    distinct?: TimelineMetaScalarFieldEnum | TimelineMetaScalarFieldEnum[]
  }

  /**
   * TimelineMeta create
   */
  export type TimelineMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * The data needed to create a TimelineMeta.
     */
    data: XOR<TimelineMetaCreateInput, TimelineMetaUncheckedCreateInput>
  }

  /**
   * TimelineMeta createMany
   */
  export type TimelineMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineMetas.
     */
    data: TimelineMetaCreateManyInput | TimelineMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineMeta createManyAndReturn
   */
  export type TimelineMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * The data used to create many TimelineMetas.
     */
    data: TimelineMetaCreateManyInput | TimelineMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineMeta update
   */
  export type TimelineMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * The data needed to update a TimelineMeta.
     */
    data: XOR<TimelineMetaUpdateInput, TimelineMetaUncheckedUpdateInput>
    /**
     * Choose, which TimelineMeta to update.
     */
    where: TimelineMetaWhereUniqueInput
  }

  /**
   * TimelineMeta updateMany
   */
  export type TimelineMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineMetas.
     */
    data: XOR<TimelineMetaUpdateManyMutationInput, TimelineMetaUncheckedUpdateManyInput>
    /**
     * Filter which TimelineMetas to update
     */
    where?: TimelineMetaWhereInput
    /**
     * Limit how many TimelineMetas to update.
     */
    limit?: number
  }

  /**
   * TimelineMeta updateManyAndReturn
   */
  export type TimelineMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * The data used to update TimelineMetas.
     */
    data: XOR<TimelineMetaUpdateManyMutationInput, TimelineMetaUncheckedUpdateManyInput>
    /**
     * Filter which TimelineMetas to update
     */
    where?: TimelineMetaWhereInput
    /**
     * Limit how many TimelineMetas to update.
     */
    limit?: number
  }

  /**
   * TimelineMeta upsert
   */
  export type TimelineMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * The filter to search for the TimelineMeta to update in case it exists.
     */
    where: TimelineMetaWhereUniqueInput
    /**
     * In case the TimelineMeta found by the `where` argument doesn't exist, create a new TimelineMeta with this data.
     */
    create: XOR<TimelineMetaCreateInput, TimelineMetaUncheckedCreateInput>
    /**
     * In case the TimelineMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineMetaUpdateInput, TimelineMetaUncheckedUpdateInput>
  }

  /**
   * TimelineMeta delete
   */
  export type TimelineMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
    /**
     * Filter which TimelineMeta to delete.
     */
    where: TimelineMetaWhereUniqueInput
  }

  /**
   * TimelineMeta deleteMany
   */
  export type TimelineMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineMetas to delete
     */
    where?: TimelineMetaWhereInput
    /**
     * Limit how many TimelineMetas to delete.
     */
    limit?: number
  }

  /**
   * TimelineMeta without action
   */
  export type TimelineMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineMeta
     */
    select?: TimelineMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineMeta
     */
    omit?: TimelineMetaOmit<ExtArgs> | null
  }


  /**
   * Model PeoplesMeta
   */

  export type AggregatePeoplesMeta = {
    _count: PeoplesMetaCountAggregateOutputType | null
    _avg: PeoplesMetaAvgAggregateOutputType | null
    _sum: PeoplesMetaSumAggregateOutputType | null
    _min: PeoplesMetaMinAggregateOutputType | null
    _max: PeoplesMetaMaxAggregateOutputType | null
  }

  export type PeoplesMetaAvgAggregateOutputType = {
    totalPueblos: number | null
  }

  export type PeoplesMetaSumAggregateOutputType = {
    totalPueblos: number | null
  }

  export type PeoplesMetaMinAggregateOutputType = {
    id: string | null
    autorContenido: string | null
    enfoque: string | null
    coberturaCronologica: string | null
    totalPueblos: number | null
    unidadPoblacion: string | null
    ultimaActualizacion: string | null
  }

  export type PeoplesMetaMaxAggregateOutputType = {
    id: string | null
    autorContenido: string | null
    enfoque: string | null
    coberturaCronologica: string | null
    totalPueblos: number | null
    unidadPoblacion: string | null
    ultimaActualizacion: string | null
  }

  export type PeoplesMetaCountAggregateOutputType = {
    id: number
    autorContenido: number
    enfoque: number
    coberturaCronologica: number
    totalPueblos: number
    unidadPoblacion: number
    fuentesPrincipales: number
    ultimaActualizacion: number
    _all: number
  }


  export type PeoplesMetaAvgAggregateInputType = {
    totalPueblos?: true
  }

  export type PeoplesMetaSumAggregateInputType = {
    totalPueblos?: true
  }

  export type PeoplesMetaMinAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalPueblos?: true
    unidadPoblacion?: true
    ultimaActualizacion?: true
  }

  export type PeoplesMetaMaxAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalPueblos?: true
    unidadPoblacion?: true
    ultimaActualizacion?: true
  }

  export type PeoplesMetaCountAggregateInputType = {
    id?: true
    autorContenido?: true
    enfoque?: true
    coberturaCronologica?: true
    totalPueblos?: true
    unidadPoblacion?: true
    fuentesPrincipales?: true
    ultimaActualizacion?: true
    _all?: true
  }

  export type PeoplesMetaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeoplesMeta to aggregate.
     */
    where?: PeoplesMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeoplesMetas to fetch.
     */
    orderBy?: PeoplesMetaOrderByWithRelationInput | PeoplesMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeoplesMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeoplesMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeoplesMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PeoplesMetas
    **/
    _count?: true | PeoplesMetaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PeoplesMetaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PeoplesMetaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeoplesMetaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeoplesMetaMaxAggregateInputType
  }

  export type GetPeoplesMetaAggregateType<T extends PeoplesMetaAggregateArgs> = {
        [P in keyof T & keyof AggregatePeoplesMeta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeoplesMeta[P]>
      : GetScalarType<T[P], AggregatePeoplesMeta[P]>
  }




  export type PeoplesMetaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeoplesMetaWhereInput
    orderBy?: PeoplesMetaOrderByWithAggregationInput | PeoplesMetaOrderByWithAggregationInput[]
    by: PeoplesMetaScalarFieldEnum[] | PeoplesMetaScalarFieldEnum
    having?: PeoplesMetaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeoplesMetaCountAggregateInputType | true
    _avg?: PeoplesMetaAvgAggregateInputType
    _sum?: PeoplesMetaSumAggregateInputType
    _min?: PeoplesMetaMinAggregateInputType
    _max?: PeoplesMetaMaxAggregateInputType
  }

  export type PeoplesMetaGroupByOutputType = {
    id: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalPueblos: number
    unidadPoblacion: string
    fuentesPrincipales: string[]
    ultimaActualizacion: string
    _count: PeoplesMetaCountAggregateOutputType | null
    _avg: PeoplesMetaAvgAggregateOutputType | null
    _sum: PeoplesMetaSumAggregateOutputType | null
    _min: PeoplesMetaMinAggregateOutputType | null
    _max: PeoplesMetaMaxAggregateOutputType | null
  }

  type GetPeoplesMetaGroupByPayload<T extends PeoplesMetaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeoplesMetaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeoplesMetaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeoplesMetaGroupByOutputType[P]>
            : GetScalarType<T[P], PeoplesMetaGroupByOutputType[P]>
        }
      >
    >


  export type PeoplesMetaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalPueblos?: boolean
    unidadPoblacion?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["peoplesMeta"]>

  export type PeoplesMetaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalPueblos?: boolean
    unidadPoblacion?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["peoplesMeta"]>

  export type PeoplesMetaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalPueblos?: boolean
    unidadPoblacion?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }, ExtArgs["result"]["peoplesMeta"]>

  export type PeoplesMetaSelectScalar = {
    id?: boolean
    autorContenido?: boolean
    enfoque?: boolean
    coberturaCronologica?: boolean
    totalPueblos?: boolean
    unidadPoblacion?: boolean
    fuentesPrincipales?: boolean
    ultimaActualizacion?: boolean
  }

  export type PeoplesMetaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "autorContenido" | "enfoque" | "coberturaCronologica" | "totalPueblos" | "unidadPoblacion" | "fuentesPrincipales" | "ultimaActualizacion", ExtArgs["result"]["peoplesMeta"]>

  export type $PeoplesMetaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PeoplesMeta"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      autorContenido: string
      enfoque: string
      coberturaCronologica: string
      totalPueblos: number
      unidadPoblacion: string
      fuentesPrincipales: string[]
      ultimaActualizacion: string
    }, ExtArgs["result"]["peoplesMeta"]>
    composites: {}
  }

  type PeoplesMetaGetPayload<S extends boolean | null | undefined | PeoplesMetaDefaultArgs> = $Result.GetResult<Prisma.$PeoplesMetaPayload, S>

  type PeoplesMetaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeoplesMetaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeoplesMetaCountAggregateInputType | true
    }

  export interface PeoplesMetaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PeoplesMeta'], meta: { name: 'PeoplesMeta' } }
    /**
     * Find zero or one PeoplesMeta that matches the filter.
     * @param {PeoplesMetaFindUniqueArgs} args - Arguments to find a PeoplesMeta
     * @example
     * // Get one PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeoplesMetaFindUniqueArgs>(args: SelectSubset<T, PeoplesMetaFindUniqueArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PeoplesMeta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeoplesMetaFindUniqueOrThrowArgs} args - Arguments to find a PeoplesMeta
     * @example
     * // Get one PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeoplesMetaFindUniqueOrThrowArgs>(args: SelectSubset<T, PeoplesMetaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PeoplesMeta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaFindFirstArgs} args - Arguments to find a PeoplesMeta
     * @example
     * // Get one PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeoplesMetaFindFirstArgs>(args?: SelectSubset<T, PeoplesMetaFindFirstArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PeoplesMeta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaFindFirstOrThrowArgs} args - Arguments to find a PeoplesMeta
     * @example
     * // Get one PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeoplesMetaFindFirstOrThrowArgs>(args?: SelectSubset<T, PeoplesMetaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PeoplesMetas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PeoplesMetas
     * const peoplesMetas = await prisma.peoplesMeta.findMany()
     * 
     * // Get first 10 PeoplesMetas
     * const peoplesMetas = await prisma.peoplesMeta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peoplesMetaWithIdOnly = await prisma.peoplesMeta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeoplesMetaFindManyArgs>(args?: SelectSubset<T, PeoplesMetaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PeoplesMeta.
     * @param {PeoplesMetaCreateArgs} args - Arguments to create a PeoplesMeta.
     * @example
     * // Create one PeoplesMeta
     * const PeoplesMeta = await prisma.peoplesMeta.create({
     *   data: {
     *     // ... data to create a PeoplesMeta
     *   }
     * })
     * 
     */
    create<T extends PeoplesMetaCreateArgs>(args: SelectSubset<T, PeoplesMetaCreateArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PeoplesMetas.
     * @param {PeoplesMetaCreateManyArgs} args - Arguments to create many PeoplesMetas.
     * @example
     * // Create many PeoplesMetas
     * const peoplesMeta = await prisma.peoplesMeta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeoplesMetaCreateManyArgs>(args?: SelectSubset<T, PeoplesMetaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PeoplesMetas and returns the data saved in the database.
     * @param {PeoplesMetaCreateManyAndReturnArgs} args - Arguments to create many PeoplesMetas.
     * @example
     * // Create many PeoplesMetas
     * const peoplesMeta = await prisma.peoplesMeta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PeoplesMetas and only return the `id`
     * const peoplesMetaWithIdOnly = await prisma.peoplesMeta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeoplesMetaCreateManyAndReturnArgs>(args?: SelectSubset<T, PeoplesMetaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PeoplesMeta.
     * @param {PeoplesMetaDeleteArgs} args - Arguments to delete one PeoplesMeta.
     * @example
     * // Delete one PeoplesMeta
     * const PeoplesMeta = await prisma.peoplesMeta.delete({
     *   where: {
     *     // ... filter to delete one PeoplesMeta
     *   }
     * })
     * 
     */
    delete<T extends PeoplesMetaDeleteArgs>(args: SelectSubset<T, PeoplesMetaDeleteArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PeoplesMeta.
     * @param {PeoplesMetaUpdateArgs} args - Arguments to update one PeoplesMeta.
     * @example
     * // Update one PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeoplesMetaUpdateArgs>(args: SelectSubset<T, PeoplesMetaUpdateArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PeoplesMetas.
     * @param {PeoplesMetaDeleteManyArgs} args - Arguments to filter PeoplesMetas to delete.
     * @example
     * // Delete a few PeoplesMetas
     * const { count } = await prisma.peoplesMeta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeoplesMetaDeleteManyArgs>(args?: SelectSubset<T, PeoplesMetaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PeoplesMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PeoplesMetas
     * const peoplesMeta = await prisma.peoplesMeta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeoplesMetaUpdateManyArgs>(args: SelectSubset<T, PeoplesMetaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PeoplesMetas and returns the data updated in the database.
     * @param {PeoplesMetaUpdateManyAndReturnArgs} args - Arguments to update many PeoplesMetas.
     * @example
     * // Update many PeoplesMetas
     * const peoplesMeta = await prisma.peoplesMeta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PeoplesMetas and only return the `id`
     * const peoplesMetaWithIdOnly = await prisma.peoplesMeta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PeoplesMetaUpdateManyAndReturnArgs>(args: SelectSubset<T, PeoplesMetaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PeoplesMeta.
     * @param {PeoplesMetaUpsertArgs} args - Arguments to update or create a PeoplesMeta.
     * @example
     * // Update or create a PeoplesMeta
     * const peoplesMeta = await prisma.peoplesMeta.upsert({
     *   create: {
     *     // ... data to create a PeoplesMeta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PeoplesMeta we want to update
     *   }
     * })
     */
    upsert<T extends PeoplesMetaUpsertArgs>(args: SelectSubset<T, PeoplesMetaUpsertArgs<ExtArgs>>): Prisma__PeoplesMetaClient<$Result.GetResult<Prisma.$PeoplesMetaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PeoplesMetas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaCountArgs} args - Arguments to filter PeoplesMetas to count.
     * @example
     * // Count the number of PeoplesMetas
     * const count = await prisma.peoplesMeta.count({
     *   where: {
     *     // ... the filter for the PeoplesMetas we want to count
     *   }
     * })
    **/
    count<T extends PeoplesMetaCountArgs>(
      args?: Subset<T, PeoplesMetaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeoplesMetaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PeoplesMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PeoplesMetaAggregateArgs>(args: Subset<T, PeoplesMetaAggregateArgs>): Prisma.PrismaPromise<GetPeoplesMetaAggregateType<T>>

    /**
     * Group by PeoplesMeta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeoplesMetaGroupByArgs} args - Group by arguments.
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
      T extends PeoplesMetaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeoplesMetaGroupByArgs['orderBy'] }
        : { orderBy?: PeoplesMetaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PeoplesMetaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeoplesMetaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PeoplesMeta model
   */
  readonly fields: PeoplesMetaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PeoplesMeta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeoplesMetaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PeoplesMeta model
   */
  interface PeoplesMetaFieldRefs {
    readonly id: FieldRef<"PeoplesMeta", 'String'>
    readonly autorContenido: FieldRef<"PeoplesMeta", 'String'>
    readonly enfoque: FieldRef<"PeoplesMeta", 'String'>
    readonly coberturaCronologica: FieldRef<"PeoplesMeta", 'String'>
    readonly totalPueblos: FieldRef<"PeoplesMeta", 'Int'>
    readonly unidadPoblacion: FieldRef<"PeoplesMeta", 'String'>
    readonly fuentesPrincipales: FieldRef<"PeoplesMeta", 'String[]'>
    readonly ultimaActualizacion: FieldRef<"PeoplesMeta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PeoplesMeta findUnique
   */
  export type PeoplesMetaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter, which PeoplesMeta to fetch.
     */
    where: PeoplesMetaWhereUniqueInput
  }

  /**
   * PeoplesMeta findUniqueOrThrow
   */
  export type PeoplesMetaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter, which PeoplesMeta to fetch.
     */
    where: PeoplesMetaWhereUniqueInput
  }

  /**
   * PeoplesMeta findFirst
   */
  export type PeoplesMetaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter, which PeoplesMeta to fetch.
     */
    where?: PeoplesMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeoplesMetas to fetch.
     */
    orderBy?: PeoplesMetaOrderByWithRelationInput | PeoplesMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeoplesMetas.
     */
    cursor?: PeoplesMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeoplesMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeoplesMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeoplesMetas.
     */
    distinct?: PeoplesMetaScalarFieldEnum | PeoplesMetaScalarFieldEnum[]
  }

  /**
   * PeoplesMeta findFirstOrThrow
   */
  export type PeoplesMetaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter, which PeoplesMeta to fetch.
     */
    where?: PeoplesMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeoplesMetas to fetch.
     */
    orderBy?: PeoplesMetaOrderByWithRelationInput | PeoplesMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PeoplesMetas.
     */
    cursor?: PeoplesMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeoplesMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeoplesMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeoplesMetas.
     */
    distinct?: PeoplesMetaScalarFieldEnum | PeoplesMetaScalarFieldEnum[]
  }

  /**
   * PeoplesMeta findMany
   */
  export type PeoplesMetaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter, which PeoplesMetas to fetch.
     */
    where?: PeoplesMetaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PeoplesMetas to fetch.
     */
    orderBy?: PeoplesMetaOrderByWithRelationInput | PeoplesMetaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PeoplesMetas.
     */
    cursor?: PeoplesMetaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PeoplesMetas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PeoplesMetas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PeoplesMetas.
     */
    distinct?: PeoplesMetaScalarFieldEnum | PeoplesMetaScalarFieldEnum[]
  }

  /**
   * PeoplesMeta create
   */
  export type PeoplesMetaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * The data needed to create a PeoplesMeta.
     */
    data: XOR<PeoplesMetaCreateInput, PeoplesMetaUncheckedCreateInput>
  }

  /**
   * PeoplesMeta createMany
   */
  export type PeoplesMetaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PeoplesMetas.
     */
    data: PeoplesMetaCreateManyInput | PeoplesMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PeoplesMeta createManyAndReturn
   */
  export type PeoplesMetaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * The data used to create many PeoplesMetas.
     */
    data: PeoplesMetaCreateManyInput | PeoplesMetaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PeoplesMeta update
   */
  export type PeoplesMetaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * The data needed to update a PeoplesMeta.
     */
    data: XOR<PeoplesMetaUpdateInput, PeoplesMetaUncheckedUpdateInput>
    /**
     * Choose, which PeoplesMeta to update.
     */
    where: PeoplesMetaWhereUniqueInput
  }

  /**
   * PeoplesMeta updateMany
   */
  export type PeoplesMetaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PeoplesMetas.
     */
    data: XOR<PeoplesMetaUpdateManyMutationInput, PeoplesMetaUncheckedUpdateManyInput>
    /**
     * Filter which PeoplesMetas to update
     */
    where?: PeoplesMetaWhereInput
    /**
     * Limit how many PeoplesMetas to update.
     */
    limit?: number
  }

  /**
   * PeoplesMeta updateManyAndReturn
   */
  export type PeoplesMetaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * The data used to update PeoplesMetas.
     */
    data: XOR<PeoplesMetaUpdateManyMutationInput, PeoplesMetaUncheckedUpdateManyInput>
    /**
     * Filter which PeoplesMetas to update
     */
    where?: PeoplesMetaWhereInput
    /**
     * Limit how many PeoplesMetas to update.
     */
    limit?: number
  }

  /**
   * PeoplesMeta upsert
   */
  export type PeoplesMetaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * The filter to search for the PeoplesMeta to update in case it exists.
     */
    where: PeoplesMetaWhereUniqueInput
    /**
     * In case the PeoplesMeta found by the `where` argument doesn't exist, create a new PeoplesMeta with this data.
     */
    create: XOR<PeoplesMetaCreateInput, PeoplesMetaUncheckedCreateInput>
    /**
     * In case the PeoplesMeta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeoplesMetaUpdateInput, PeoplesMetaUncheckedUpdateInput>
  }

  /**
   * PeoplesMeta delete
   */
  export type PeoplesMetaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
    /**
     * Filter which PeoplesMeta to delete.
     */
    where: PeoplesMetaWhereUniqueInput
  }

  /**
   * PeoplesMeta deleteMany
   */
  export type PeoplesMetaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PeoplesMetas to delete
     */
    where?: PeoplesMetaWhereInput
    /**
     * Limit how many PeoplesMetas to delete.
     */
    limit?: number
  }

  /**
   * PeoplesMeta without action
   */
  export type PeoplesMetaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeoplesMeta
     */
    select?: PeoplesMetaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PeoplesMeta
     */
    omit?: PeoplesMetaOmit<ExtArgs> | null
  }


  /**
   * Model UserWatchedConference
   */

  export type AggregateUserWatchedConference = {
    _count: UserWatchedConferenceCountAggregateOutputType | null
    _min: UserWatchedConferenceMinAggregateOutputType | null
    _max: UserWatchedConferenceMaxAggregateOutputType | null
  }

  export type UserWatchedConferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    conferenceId: string | null
    watchedAt: Date | null
  }

  export type UserWatchedConferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    conferenceId: string | null
    watchedAt: Date | null
  }

  export type UserWatchedConferenceCountAggregateOutputType = {
    id: number
    userId: number
    conferenceId: number
    watchedAt: number
    _all: number
  }


  export type UserWatchedConferenceMinAggregateInputType = {
    id?: true
    userId?: true
    conferenceId?: true
    watchedAt?: true
  }

  export type UserWatchedConferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    conferenceId?: true
    watchedAt?: true
  }

  export type UserWatchedConferenceCountAggregateInputType = {
    id?: true
    userId?: true
    conferenceId?: true
    watchedAt?: true
    _all?: true
  }

  export type UserWatchedConferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWatchedConference to aggregate.
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWatchedConferences to fetch.
     */
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWatchedConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWatchedConferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWatchedConferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWatchedConferences
    **/
    _count?: true | UserWatchedConferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWatchedConferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWatchedConferenceMaxAggregateInputType
  }

  export type GetUserWatchedConferenceAggregateType<T extends UserWatchedConferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWatchedConference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWatchedConference[P]>
      : GetScalarType<T[P], AggregateUserWatchedConference[P]>
  }




  export type UserWatchedConferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWatchedConferenceWhereInput
    orderBy?: UserWatchedConferenceOrderByWithAggregationInput | UserWatchedConferenceOrderByWithAggregationInput[]
    by: UserWatchedConferenceScalarFieldEnum[] | UserWatchedConferenceScalarFieldEnum
    having?: UserWatchedConferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWatchedConferenceCountAggregateInputType | true
    _min?: UserWatchedConferenceMinAggregateInputType
    _max?: UserWatchedConferenceMaxAggregateInputType
  }

  export type UserWatchedConferenceGroupByOutputType = {
    id: string
    userId: string
    conferenceId: string
    watchedAt: Date
    _count: UserWatchedConferenceCountAggregateOutputType | null
    _min: UserWatchedConferenceMinAggregateOutputType | null
    _max: UserWatchedConferenceMaxAggregateOutputType | null
  }

  type GetUserWatchedConferenceGroupByPayload<T extends UserWatchedConferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWatchedConferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWatchedConferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWatchedConferenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserWatchedConferenceGroupByOutputType[P]>
        }
      >
    >


  export type UserWatchedConferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conferenceId?: boolean
    watchedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWatchedConference"]>

  export type UserWatchedConferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conferenceId?: boolean
    watchedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWatchedConference"]>

  export type UserWatchedConferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    conferenceId?: boolean
    watchedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWatchedConference"]>

  export type UserWatchedConferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    conferenceId?: boolean
    watchedAt?: boolean
  }

  export type UserWatchedConferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "conferenceId" | "watchedAt", ExtArgs["result"]["userWatchedConference"]>
  export type UserWatchedConferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }
  export type UserWatchedConferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }
  export type UserWatchedConferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conference?: boolean | ConferenceDefaultArgs<ExtArgs>
  }

  export type $UserWatchedConferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWatchedConference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      conference: Prisma.$ConferencePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      conferenceId: string
      watchedAt: Date
    }, ExtArgs["result"]["userWatchedConference"]>
    composites: {}
  }

  type UserWatchedConferenceGetPayload<S extends boolean | null | undefined | UserWatchedConferenceDefaultArgs> = $Result.GetResult<Prisma.$UserWatchedConferencePayload, S>

  type UserWatchedConferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserWatchedConferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserWatchedConferenceCountAggregateInputType | true
    }

  export interface UserWatchedConferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWatchedConference'], meta: { name: 'UserWatchedConference' } }
    /**
     * Find zero or one UserWatchedConference that matches the filter.
     * @param {UserWatchedConferenceFindUniqueArgs} args - Arguments to find a UserWatchedConference
     * @example
     * // Get one UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWatchedConferenceFindUniqueArgs>(args: SelectSubset<T, UserWatchedConferenceFindUniqueArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserWatchedConference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserWatchedConferenceFindUniqueOrThrowArgs} args - Arguments to find a UserWatchedConference
     * @example
     * // Get one UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWatchedConferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWatchedConferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWatchedConference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceFindFirstArgs} args - Arguments to find a UserWatchedConference
     * @example
     * // Get one UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWatchedConferenceFindFirstArgs>(args?: SelectSubset<T, UserWatchedConferenceFindFirstArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWatchedConference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceFindFirstOrThrowArgs} args - Arguments to find a UserWatchedConference
     * @example
     * // Get one UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWatchedConferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWatchedConferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserWatchedConferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWatchedConferences
     * const userWatchedConferences = await prisma.userWatchedConference.findMany()
     * 
     * // Get first 10 UserWatchedConferences
     * const userWatchedConferences = await prisma.userWatchedConference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWatchedConferenceWithIdOnly = await prisma.userWatchedConference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserWatchedConferenceFindManyArgs>(args?: SelectSubset<T, UserWatchedConferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserWatchedConference.
     * @param {UserWatchedConferenceCreateArgs} args - Arguments to create a UserWatchedConference.
     * @example
     * // Create one UserWatchedConference
     * const UserWatchedConference = await prisma.userWatchedConference.create({
     *   data: {
     *     // ... data to create a UserWatchedConference
     *   }
     * })
     * 
     */
    create<T extends UserWatchedConferenceCreateArgs>(args: SelectSubset<T, UserWatchedConferenceCreateArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserWatchedConferences.
     * @param {UserWatchedConferenceCreateManyArgs} args - Arguments to create many UserWatchedConferences.
     * @example
     * // Create many UserWatchedConferences
     * const userWatchedConference = await prisma.userWatchedConference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWatchedConferenceCreateManyArgs>(args?: SelectSubset<T, UserWatchedConferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWatchedConferences and returns the data saved in the database.
     * @param {UserWatchedConferenceCreateManyAndReturnArgs} args - Arguments to create many UserWatchedConferences.
     * @example
     * // Create many UserWatchedConferences
     * const userWatchedConference = await prisma.userWatchedConference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWatchedConferences and only return the `id`
     * const userWatchedConferenceWithIdOnly = await prisma.userWatchedConference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWatchedConferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWatchedConferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserWatchedConference.
     * @param {UserWatchedConferenceDeleteArgs} args - Arguments to delete one UserWatchedConference.
     * @example
     * // Delete one UserWatchedConference
     * const UserWatchedConference = await prisma.userWatchedConference.delete({
     *   where: {
     *     // ... filter to delete one UserWatchedConference
     *   }
     * })
     * 
     */
    delete<T extends UserWatchedConferenceDeleteArgs>(args: SelectSubset<T, UserWatchedConferenceDeleteArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserWatchedConference.
     * @param {UserWatchedConferenceUpdateArgs} args - Arguments to update one UserWatchedConference.
     * @example
     * // Update one UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWatchedConferenceUpdateArgs>(args: SelectSubset<T, UserWatchedConferenceUpdateArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserWatchedConferences.
     * @param {UserWatchedConferenceDeleteManyArgs} args - Arguments to filter UserWatchedConferences to delete.
     * @example
     * // Delete a few UserWatchedConferences
     * const { count } = await prisma.userWatchedConference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWatchedConferenceDeleteManyArgs>(args?: SelectSubset<T, UserWatchedConferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWatchedConferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWatchedConferences
     * const userWatchedConference = await prisma.userWatchedConference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWatchedConferenceUpdateManyArgs>(args: SelectSubset<T, UserWatchedConferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWatchedConferences and returns the data updated in the database.
     * @param {UserWatchedConferenceUpdateManyAndReturnArgs} args - Arguments to update many UserWatchedConferences.
     * @example
     * // Update many UserWatchedConferences
     * const userWatchedConference = await prisma.userWatchedConference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserWatchedConferences and only return the `id`
     * const userWatchedConferenceWithIdOnly = await prisma.userWatchedConference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserWatchedConferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserWatchedConferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserWatchedConference.
     * @param {UserWatchedConferenceUpsertArgs} args - Arguments to update or create a UserWatchedConference.
     * @example
     * // Update or create a UserWatchedConference
     * const userWatchedConference = await prisma.userWatchedConference.upsert({
     *   create: {
     *     // ... data to create a UserWatchedConference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWatchedConference we want to update
     *   }
     * })
     */
    upsert<T extends UserWatchedConferenceUpsertArgs>(args: SelectSubset<T, UserWatchedConferenceUpsertArgs<ExtArgs>>): Prisma__UserWatchedConferenceClient<$Result.GetResult<Prisma.$UserWatchedConferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserWatchedConferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceCountArgs} args - Arguments to filter UserWatchedConferences to count.
     * @example
     * // Count the number of UserWatchedConferences
     * const count = await prisma.userWatchedConference.count({
     *   where: {
     *     // ... the filter for the UserWatchedConferences we want to count
     *   }
     * })
    **/
    count<T extends UserWatchedConferenceCountArgs>(
      args?: Subset<T, UserWatchedConferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWatchedConferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWatchedConference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserWatchedConferenceAggregateArgs>(args: Subset<T, UserWatchedConferenceAggregateArgs>): Prisma.PrismaPromise<GetUserWatchedConferenceAggregateType<T>>

    /**
     * Group by UserWatchedConference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWatchedConferenceGroupByArgs} args - Group by arguments.
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
      T extends UserWatchedConferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWatchedConferenceGroupByArgs['orderBy'] }
        : { orderBy?: UserWatchedConferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserWatchedConferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWatchedConferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWatchedConference model
   */
  readonly fields: UserWatchedConferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWatchedConference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWatchedConferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conference<T extends ConferenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConferenceDefaultArgs<ExtArgs>>): Prisma__ConferenceClient<$Result.GetResult<Prisma.$ConferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserWatchedConference model
   */
  interface UserWatchedConferenceFieldRefs {
    readonly id: FieldRef<"UserWatchedConference", 'String'>
    readonly userId: FieldRef<"UserWatchedConference", 'String'>
    readonly conferenceId: FieldRef<"UserWatchedConference", 'String'>
    readonly watchedAt: FieldRef<"UserWatchedConference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserWatchedConference findUnique
   */
  export type UserWatchedConferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserWatchedConference to fetch.
     */
    where: UserWatchedConferenceWhereUniqueInput
  }

  /**
   * UserWatchedConference findUniqueOrThrow
   */
  export type UserWatchedConferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserWatchedConference to fetch.
     */
    where: UserWatchedConferenceWhereUniqueInput
  }

  /**
   * UserWatchedConference findFirst
   */
  export type UserWatchedConferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserWatchedConference to fetch.
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWatchedConferences to fetch.
     */
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWatchedConferences.
     */
    cursor?: UserWatchedConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWatchedConferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWatchedConferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWatchedConferences.
     */
    distinct?: UserWatchedConferenceScalarFieldEnum | UserWatchedConferenceScalarFieldEnum[]
  }

  /**
   * UserWatchedConference findFirstOrThrow
   */
  export type UserWatchedConferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserWatchedConference to fetch.
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWatchedConferences to fetch.
     */
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWatchedConferences.
     */
    cursor?: UserWatchedConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWatchedConferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWatchedConferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWatchedConferences.
     */
    distinct?: UserWatchedConferenceScalarFieldEnum | UserWatchedConferenceScalarFieldEnum[]
  }

  /**
   * UserWatchedConference findMany
   */
  export type UserWatchedConferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserWatchedConferences to fetch.
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWatchedConferences to fetch.
     */
    orderBy?: UserWatchedConferenceOrderByWithRelationInput | UserWatchedConferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWatchedConferences.
     */
    cursor?: UserWatchedConferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWatchedConferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWatchedConferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWatchedConferences.
     */
    distinct?: UserWatchedConferenceScalarFieldEnum | UserWatchedConferenceScalarFieldEnum[]
  }

  /**
   * UserWatchedConference create
   */
  export type UserWatchedConferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWatchedConference.
     */
    data: XOR<UserWatchedConferenceCreateInput, UserWatchedConferenceUncheckedCreateInput>
  }

  /**
   * UserWatchedConference createMany
   */
  export type UserWatchedConferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWatchedConferences.
     */
    data: UserWatchedConferenceCreateManyInput | UserWatchedConferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserWatchedConference createManyAndReturn
   */
  export type UserWatchedConferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * The data used to create many UserWatchedConferences.
     */
    data: UserWatchedConferenceCreateManyInput | UserWatchedConferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWatchedConference update
   */
  export type UserWatchedConferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWatchedConference.
     */
    data: XOR<UserWatchedConferenceUpdateInput, UserWatchedConferenceUncheckedUpdateInput>
    /**
     * Choose, which UserWatchedConference to update.
     */
    where: UserWatchedConferenceWhereUniqueInput
  }

  /**
   * UserWatchedConference updateMany
   */
  export type UserWatchedConferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWatchedConferences.
     */
    data: XOR<UserWatchedConferenceUpdateManyMutationInput, UserWatchedConferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserWatchedConferences to update
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * Limit how many UserWatchedConferences to update.
     */
    limit?: number
  }

  /**
   * UserWatchedConference updateManyAndReturn
   */
  export type UserWatchedConferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * The data used to update UserWatchedConferences.
     */
    data: XOR<UserWatchedConferenceUpdateManyMutationInput, UserWatchedConferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserWatchedConferences to update
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * Limit how many UserWatchedConferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWatchedConference upsert
   */
  export type UserWatchedConferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWatchedConference to update in case it exists.
     */
    where: UserWatchedConferenceWhereUniqueInput
    /**
     * In case the UserWatchedConference found by the `where` argument doesn't exist, create a new UserWatchedConference with this data.
     */
    create: XOR<UserWatchedConferenceCreateInput, UserWatchedConferenceUncheckedCreateInput>
    /**
     * In case the UserWatchedConference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWatchedConferenceUpdateInput, UserWatchedConferenceUncheckedUpdateInput>
  }

  /**
   * UserWatchedConference delete
   */
  export type UserWatchedConferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
    /**
     * Filter which UserWatchedConference to delete.
     */
    where: UserWatchedConferenceWhereUniqueInput
  }

  /**
   * UserWatchedConference deleteMany
   */
  export type UserWatchedConferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWatchedConferences to delete
     */
    where?: UserWatchedConferenceWhereInput
    /**
     * Limit how many UserWatchedConferences to delete.
     */
    limit?: number
  }

  /**
   * UserWatchedConference without action
   */
  export type UserWatchedConferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWatchedConference
     */
    select?: UserWatchedConferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWatchedConference
     */
    omit?: UserWatchedConferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWatchedConferenceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const ConferenceScalarFieldEnum: {
    id: 'id',
    title: 'title',
    type: 'type',
    date: 'date',
    year: 'year',
    organization: 'organization',
    url: 'url',
    youtubeUrl: 'youtubeUrl',
    infoAdicional: 'infoAdicional',
    description: 'description',
    summary: 'summary',
    topics: 'topics',
    characters: 'characters',
    civilizations: 'civilizations',
    duration: 'duration',
    language: 'language',
    source: 'source',
    mediaType: 'mediaType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConferenceScalarFieldEnum = (typeof ConferenceScalarFieldEnum)[keyof typeof ConferenceScalarFieldEnum]


  export const TimelineEventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    dateLabel: 'dateLabel',
    startYear: 'startYear',
    endYear: 'endYear',
    period: 'period',
    location: 'location',
    description: 'description',
    summary: 'summary',
    consequences: 'consequences',
    characters: 'characters',
    civilizations: 'civilizations',
    topics: 'topics',
    sourceConference: 'sourceConference',
    relatedConferences: 'relatedConferences'
  };

  export type TimelineEventScalarFieldEnum = (typeof TimelineEventScalarFieldEnum)[keyof typeof TimelineEventScalarFieldEnum]


  export const PeopleGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    startYear: 'startYear',
    endYear: 'endYear',
    peakYear: 'peakYear',
    peakPopulation: 'peakPopulation',
    color: 'color',
    region: 'region',
    description: 'description',
    civilizations: 'civilizations',
    relatedConferences: 'relatedConferences'
  };

  export type PeopleGroupScalarFieldEnum = (typeof PeopleGroupScalarFieldEnum)[keyof typeof PeopleGroupScalarFieldEnum]


  export const TimelineMetaScalarFieldEnum: {
    id: 'id',
    autorContenido: 'autorContenido',
    enfoque: 'enfoque',
    coberturaCronologica: 'coberturaCronologica',
    totalEventos: 'totalEventos',
    fuentesPrincipales: 'fuentesPrincipales',
    ultimaActualizacion: 'ultimaActualizacion'
  };

  export type TimelineMetaScalarFieldEnum = (typeof TimelineMetaScalarFieldEnum)[keyof typeof TimelineMetaScalarFieldEnum]


  export const PeoplesMetaScalarFieldEnum: {
    id: 'id',
    autorContenido: 'autorContenido',
    enfoque: 'enfoque',
    coberturaCronologica: 'coberturaCronologica',
    totalPueblos: 'totalPueblos',
    unidadPoblacion: 'unidadPoblacion',
    fuentesPrincipales: 'fuentesPrincipales',
    ultimaActualizacion: 'ultimaActualizacion'
  };

  export type PeoplesMetaScalarFieldEnum = (typeof PeoplesMetaScalarFieldEnum)[keyof typeof PeoplesMetaScalarFieldEnum]


  export const UserWatchedConferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    conferenceId: 'conferenceId',
    watchedAt: 'watchedAt'
  };

  export type UserWatchedConferenceScalarFieldEnum = (typeof UserWatchedConferenceScalarFieldEnum)[keyof typeof UserWatchedConferenceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    watched?: UserWatchedConferenceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    password?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    watched?: UserWatchedConferenceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    watched?: UserWatchedConferenceListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    password?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type ConferenceWhereInput = {
    AND?: ConferenceWhereInput | ConferenceWhereInput[]
    OR?: ConferenceWhereInput[]
    NOT?: ConferenceWhereInput | ConferenceWhereInput[]
    id?: StringFilter<"Conference"> | string
    title?: StringFilter<"Conference"> | string
    type?: StringFilter<"Conference"> | string
    date?: StringNullableFilter<"Conference"> | string | null
    year?: IntNullableFilter<"Conference"> | number | null
    organization?: StringFilter<"Conference"> | string
    url?: StringNullableFilter<"Conference"> | string | null
    youtubeUrl?: StringNullableFilter<"Conference"> | string | null
    infoAdicional?: StringNullableFilter<"Conference"> | string | null
    description?: StringFilter<"Conference"> | string
    summary?: StringFilter<"Conference"> | string
    topics?: StringNullableListFilter<"Conference">
    characters?: StringNullableListFilter<"Conference">
    civilizations?: StringNullableListFilter<"Conference">
    duration?: StringNullableFilter<"Conference"> | string | null
    language?: StringFilter<"Conference"> | string
    source?: StringFilter<"Conference"> | string
    mediaType?: StringNullableFilter<"Conference"> | string | null
    createdAt?: DateTimeFilter<"Conference"> | Date | string
    updatedAt?: DateTimeFilter<"Conference"> | Date | string
    watchedBy?: UserWatchedConferenceListRelationFilter
  }

  export type ConferenceOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    organization?: SortOrder
    url?: SortOrderInput | SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    infoAdicional?: SortOrderInput | SortOrder
    description?: SortOrder
    summary?: SortOrder
    topics?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    duration?: SortOrderInput | SortOrder
    language?: SortOrder
    source?: SortOrder
    mediaType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    watchedBy?: UserWatchedConferenceOrderByRelationAggregateInput
  }

  export type ConferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConferenceWhereInput | ConferenceWhereInput[]
    OR?: ConferenceWhereInput[]
    NOT?: ConferenceWhereInput | ConferenceWhereInput[]
    title?: StringFilter<"Conference"> | string
    type?: StringFilter<"Conference"> | string
    date?: StringNullableFilter<"Conference"> | string | null
    year?: IntNullableFilter<"Conference"> | number | null
    organization?: StringFilter<"Conference"> | string
    url?: StringNullableFilter<"Conference"> | string | null
    youtubeUrl?: StringNullableFilter<"Conference"> | string | null
    infoAdicional?: StringNullableFilter<"Conference"> | string | null
    description?: StringFilter<"Conference"> | string
    summary?: StringFilter<"Conference"> | string
    topics?: StringNullableListFilter<"Conference">
    characters?: StringNullableListFilter<"Conference">
    civilizations?: StringNullableListFilter<"Conference">
    duration?: StringNullableFilter<"Conference"> | string | null
    language?: StringFilter<"Conference"> | string
    source?: StringFilter<"Conference"> | string
    mediaType?: StringNullableFilter<"Conference"> | string | null
    createdAt?: DateTimeFilter<"Conference"> | Date | string
    updatedAt?: DateTimeFilter<"Conference"> | Date | string
    watchedBy?: UserWatchedConferenceListRelationFilter
  }, "id">

  export type ConferenceOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    organization?: SortOrder
    url?: SortOrderInput | SortOrder
    youtubeUrl?: SortOrderInput | SortOrder
    infoAdicional?: SortOrderInput | SortOrder
    description?: SortOrder
    summary?: SortOrder
    topics?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    duration?: SortOrderInput | SortOrder
    language?: SortOrder
    source?: SortOrder
    mediaType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConferenceCountOrderByAggregateInput
    _avg?: ConferenceAvgOrderByAggregateInput
    _max?: ConferenceMaxOrderByAggregateInput
    _min?: ConferenceMinOrderByAggregateInput
    _sum?: ConferenceSumOrderByAggregateInput
  }

  export type ConferenceScalarWhereWithAggregatesInput = {
    AND?: ConferenceScalarWhereWithAggregatesInput | ConferenceScalarWhereWithAggregatesInput[]
    OR?: ConferenceScalarWhereWithAggregatesInput[]
    NOT?: ConferenceScalarWhereWithAggregatesInput | ConferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conference"> | string
    title?: StringWithAggregatesFilter<"Conference"> | string
    type?: StringWithAggregatesFilter<"Conference"> | string
    date?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    year?: IntNullableWithAggregatesFilter<"Conference"> | number | null
    organization?: StringWithAggregatesFilter<"Conference"> | string
    url?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    youtubeUrl?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    infoAdicional?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    description?: StringWithAggregatesFilter<"Conference"> | string
    summary?: StringWithAggregatesFilter<"Conference"> | string
    topics?: StringNullableListFilter<"Conference">
    characters?: StringNullableListFilter<"Conference">
    civilizations?: StringNullableListFilter<"Conference">
    duration?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    language?: StringWithAggregatesFilter<"Conference"> | string
    source?: StringWithAggregatesFilter<"Conference"> | string
    mediaType?: StringNullableWithAggregatesFilter<"Conference"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conference"> | Date | string
  }

  export type TimelineEventWhereInput = {
    AND?: TimelineEventWhereInput | TimelineEventWhereInput[]
    OR?: TimelineEventWhereInput[]
    NOT?: TimelineEventWhereInput | TimelineEventWhereInput[]
    id?: StringFilter<"TimelineEvent"> | string
    title?: StringFilter<"TimelineEvent"> | string
    dateLabel?: StringFilter<"TimelineEvent"> | string
    startYear?: IntFilter<"TimelineEvent"> | number
    endYear?: IntFilter<"TimelineEvent"> | number
    period?: StringFilter<"TimelineEvent"> | string
    location?: StringFilter<"TimelineEvent"> | string
    description?: StringFilter<"TimelineEvent"> | string
    summary?: StringFilter<"TimelineEvent"> | string
    consequences?: StringNullableListFilter<"TimelineEvent">
    characters?: StringNullableListFilter<"TimelineEvent">
    civilizations?: StringNullableListFilter<"TimelineEvent">
    topics?: StringNullableListFilter<"TimelineEvent">
    sourceConference?: JsonNullableFilter<"TimelineEvent">
    relatedConferences?: StringNullableListFilter<"TimelineEvent">
  }

  export type TimelineEventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    dateLabel?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    consequences?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    topics?: SortOrder
    sourceConference?: SortOrderInput | SortOrder
    relatedConferences?: SortOrder
  }

  export type TimelineEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimelineEventWhereInput | TimelineEventWhereInput[]
    OR?: TimelineEventWhereInput[]
    NOT?: TimelineEventWhereInput | TimelineEventWhereInput[]
    title?: StringFilter<"TimelineEvent"> | string
    dateLabel?: StringFilter<"TimelineEvent"> | string
    startYear?: IntFilter<"TimelineEvent"> | number
    endYear?: IntFilter<"TimelineEvent"> | number
    period?: StringFilter<"TimelineEvent"> | string
    location?: StringFilter<"TimelineEvent"> | string
    description?: StringFilter<"TimelineEvent"> | string
    summary?: StringFilter<"TimelineEvent"> | string
    consequences?: StringNullableListFilter<"TimelineEvent">
    characters?: StringNullableListFilter<"TimelineEvent">
    civilizations?: StringNullableListFilter<"TimelineEvent">
    topics?: StringNullableListFilter<"TimelineEvent">
    sourceConference?: JsonNullableFilter<"TimelineEvent">
    relatedConferences?: StringNullableListFilter<"TimelineEvent">
  }, "id">

  export type TimelineEventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    dateLabel?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    consequences?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    topics?: SortOrder
    sourceConference?: SortOrderInput | SortOrder
    relatedConferences?: SortOrder
    _count?: TimelineEventCountOrderByAggregateInput
    _avg?: TimelineEventAvgOrderByAggregateInput
    _max?: TimelineEventMaxOrderByAggregateInput
    _min?: TimelineEventMinOrderByAggregateInput
    _sum?: TimelineEventSumOrderByAggregateInput
  }

  export type TimelineEventScalarWhereWithAggregatesInput = {
    AND?: TimelineEventScalarWhereWithAggregatesInput | TimelineEventScalarWhereWithAggregatesInput[]
    OR?: TimelineEventScalarWhereWithAggregatesInput[]
    NOT?: TimelineEventScalarWhereWithAggregatesInput | TimelineEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimelineEvent"> | string
    title?: StringWithAggregatesFilter<"TimelineEvent"> | string
    dateLabel?: StringWithAggregatesFilter<"TimelineEvent"> | string
    startYear?: IntWithAggregatesFilter<"TimelineEvent"> | number
    endYear?: IntWithAggregatesFilter<"TimelineEvent"> | number
    period?: StringWithAggregatesFilter<"TimelineEvent"> | string
    location?: StringWithAggregatesFilter<"TimelineEvent"> | string
    description?: StringWithAggregatesFilter<"TimelineEvent"> | string
    summary?: StringWithAggregatesFilter<"TimelineEvent"> | string
    consequences?: StringNullableListFilter<"TimelineEvent">
    characters?: StringNullableListFilter<"TimelineEvent">
    civilizations?: StringNullableListFilter<"TimelineEvent">
    topics?: StringNullableListFilter<"TimelineEvent">
    sourceConference?: JsonNullableWithAggregatesFilter<"TimelineEvent">
    relatedConferences?: StringNullableListFilter<"TimelineEvent">
  }

  export type PeopleGroupWhereInput = {
    AND?: PeopleGroupWhereInput | PeopleGroupWhereInput[]
    OR?: PeopleGroupWhereInput[]
    NOT?: PeopleGroupWhereInput | PeopleGroupWhereInput[]
    id?: StringFilter<"PeopleGroup"> | string
    name?: StringFilter<"PeopleGroup"> | string
    startYear?: IntFilter<"PeopleGroup"> | number
    endYear?: IntFilter<"PeopleGroup"> | number
    peakYear?: IntFilter<"PeopleGroup"> | number
    peakPopulation?: IntFilter<"PeopleGroup"> | number
    color?: StringFilter<"PeopleGroup"> | string
    region?: StringFilter<"PeopleGroup"> | string
    description?: StringFilter<"PeopleGroup"> | string
    civilizations?: StringNullableListFilter<"PeopleGroup">
    relatedConferences?: StringNullableListFilter<"PeopleGroup">
  }

  export type PeopleGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
    color?: SortOrder
    region?: SortOrder
    description?: SortOrder
    civilizations?: SortOrder
    relatedConferences?: SortOrder
  }

  export type PeopleGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeopleGroupWhereInput | PeopleGroupWhereInput[]
    OR?: PeopleGroupWhereInput[]
    NOT?: PeopleGroupWhereInput | PeopleGroupWhereInput[]
    name?: StringFilter<"PeopleGroup"> | string
    startYear?: IntFilter<"PeopleGroup"> | number
    endYear?: IntFilter<"PeopleGroup"> | number
    peakYear?: IntFilter<"PeopleGroup"> | number
    peakPopulation?: IntFilter<"PeopleGroup"> | number
    color?: StringFilter<"PeopleGroup"> | string
    region?: StringFilter<"PeopleGroup"> | string
    description?: StringFilter<"PeopleGroup"> | string
    civilizations?: StringNullableListFilter<"PeopleGroup">
    relatedConferences?: StringNullableListFilter<"PeopleGroup">
  }, "id">

  export type PeopleGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
    color?: SortOrder
    region?: SortOrder
    description?: SortOrder
    civilizations?: SortOrder
    relatedConferences?: SortOrder
    _count?: PeopleGroupCountOrderByAggregateInput
    _avg?: PeopleGroupAvgOrderByAggregateInput
    _max?: PeopleGroupMaxOrderByAggregateInput
    _min?: PeopleGroupMinOrderByAggregateInput
    _sum?: PeopleGroupSumOrderByAggregateInput
  }

  export type PeopleGroupScalarWhereWithAggregatesInput = {
    AND?: PeopleGroupScalarWhereWithAggregatesInput | PeopleGroupScalarWhereWithAggregatesInput[]
    OR?: PeopleGroupScalarWhereWithAggregatesInput[]
    NOT?: PeopleGroupScalarWhereWithAggregatesInput | PeopleGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PeopleGroup"> | string
    name?: StringWithAggregatesFilter<"PeopleGroup"> | string
    startYear?: IntWithAggregatesFilter<"PeopleGroup"> | number
    endYear?: IntWithAggregatesFilter<"PeopleGroup"> | number
    peakYear?: IntWithAggregatesFilter<"PeopleGroup"> | number
    peakPopulation?: IntWithAggregatesFilter<"PeopleGroup"> | number
    color?: StringWithAggregatesFilter<"PeopleGroup"> | string
    region?: StringWithAggregatesFilter<"PeopleGroup"> | string
    description?: StringWithAggregatesFilter<"PeopleGroup"> | string
    civilizations?: StringNullableListFilter<"PeopleGroup">
    relatedConferences?: StringNullableListFilter<"PeopleGroup">
  }

  export type TimelineMetaWhereInput = {
    AND?: TimelineMetaWhereInput | TimelineMetaWhereInput[]
    OR?: TimelineMetaWhereInput[]
    NOT?: TimelineMetaWhereInput | TimelineMetaWhereInput[]
    id?: StringFilter<"TimelineMeta"> | string
    autorContenido?: StringFilter<"TimelineMeta"> | string
    enfoque?: StringFilter<"TimelineMeta"> | string
    coberturaCronologica?: StringFilter<"TimelineMeta"> | string
    totalEventos?: IntFilter<"TimelineMeta"> | number
    fuentesPrincipales?: StringNullableListFilter<"TimelineMeta">
    ultimaActualizacion?: StringFilter<"TimelineMeta"> | string
  }

  export type TimelineMetaOrderByWithRelationInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalEventos?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type TimelineMetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimelineMetaWhereInput | TimelineMetaWhereInput[]
    OR?: TimelineMetaWhereInput[]
    NOT?: TimelineMetaWhereInput | TimelineMetaWhereInput[]
    autorContenido?: StringFilter<"TimelineMeta"> | string
    enfoque?: StringFilter<"TimelineMeta"> | string
    coberturaCronologica?: StringFilter<"TimelineMeta"> | string
    totalEventos?: IntFilter<"TimelineMeta"> | number
    fuentesPrincipales?: StringNullableListFilter<"TimelineMeta">
    ultimaActualizacion?: StringFilter<"TimelineMeta"> | string
  }, "id">

  export type TimelineMetaOrderByWithAggregationInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalEventos?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
    _count?: TimelineMetaCountOrderByAggregateInput
    _avg?: TimelineMetaAvgOrderByAggregateInput
    _max?: TimelineMetaMaxOrderByAggregateInput
    _min?: TimelineMetaMinOrderByAggregateInput
    _sum?: TimelineMetaSumOrderByAggregateInput
  }

  export type TimelineMetaScalarWhereWithAggregatesInput = {
    AND?: TimelineMetaScalarWhereWithAggregatesInput | TimelineMetaScalarWhereWithAggregatesInput[]
    OR?: TimelineMetaScalarWhereWithAggregatesInput[]
    NOT?: TimelineMetaScalarWhereWithAggregatesInput | TimelineMetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimelineMeta"> | string
    autorContenido?: StringWithAggregatesFilter<"TimelineMeta"> | string
    enfoque?: StringWithAggregatesFilter<"TimelineMeta"> | string
    coberturaCronologica?: StringWithAggregatesFilter<"TimelineMeta"> | string
    totalEventos?: IntWithAggregatesFilter<"TimelineMeta"> | number
    fuentesPrincipales?: StringNullableListFilter<"TimelineMeta">
    ultimaActualizacion?: StringWithAggregatesFilter<"TimelineMeta"> | string
  }

  export type PeoplesMetaWhereInput = {
    AND?: PeoplesMetaWhereInput | PeoplesMetaWhereInput[]
    OR?: PeoplesMetaWhereInput[]
    NOT?: PeoplesMetaWhereInput | PeoplesMetaWhereInput[]
    id?: StringFilter<"PeoplesMeta"> | string
    autorContenido?: StringFilter<"PeoplesMeta"> | string
    enfoque?: StringFilter<"PeoplesMeta"> | string
    coberturaCronologica?: StringFilter<"PeoplesMeta"> | string
    totalPueblos?: IntFilter<"PeoplesMeta"> | number
    unidadPoblacion?: StringFilter<"PeoplesMeta"> | string
    fuentesPrincipales?: StringNullableListFilter<"PeoplesMeta">
    ultimaActualizacion?: StringFilter<"PeoplesMeta"> | string
  }

  export type PeoplesMetaOrderByWithRelationInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalPueblos?: SortOrder
    unidadPoblacion?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type PeoplesMetaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeoplesMetaWhereInput | PeoplesMetaWhereInput[]
    OR?: PeoplesMetaWhereInput[]
    NOT?: PeoplesMetaWhereInput | PeoplesMetaWhereInput[]
    autorContenido?: StringFilter<"PeoplesMeta"> | string
    enfoque?: StringFilter<"PeoplesMeta"> | string
    coberturaCronologica?: StringFilter<"PeoplesMeta"> | string
    totalPueblos?: IntFilter<"PeoplesMeta"> | number
    unidadPoblacion?: StringFilter<"PeoplesMeta"> | string
    fuentesPrincipales?: StringNullableListFilter<"PeoplesMeta">
    ultimaActualizacion?: StringFilter<"PeoplesMeta"> | string
  }, "id">

  export type PeoplesMetaOrderByWithAggregationInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalPueblos?: SortOrder
    unidadPoblacion?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
    _count?: PeoplesMetaCountOrderByAggregateInput
    _avg?: PeoplesMetaAvgOrderByAggregateInput
    _max?: PeoplesMetaMaxOrderByAggregateInput
    _min?: PeoplesMetaMinOrderByAggregateInput
    _sum?: PeoplesMetaSumOrderByAggregateInput
  }

  export type PeoplesMetaScalarWhereWithAggregatesInput = {
    AND?: PeoplesMetaScalarWhereWithAggregatesInput | PeoplesMetaScalarWhereWithAggregatesInput[]
    OR?: PeoplesMetaScalarWhereWithAggregatesInput[]
    NOT?: PeoplesMetaScalarWhereWithAggregatesInput | PeoplesMetaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PeoplesMeta"> | string
    autorContenido?: StringWithAggregatesFilter<"PeoplesMeta"> | string
    enfoque?: StringWithAggregatesFilter<"PeoplesMeta"> | string
    coberturaCronologica?: StringWithAggregatesFilter<"PeoplesMeta"> | string
    totalPueblos?: IntWithAggregatesFilter<"PeoplesMeta"> | number
    unidadPoblacion?: StringWithAggregatesFilter<"PeoplesMeta"> | string
    fuentesPrincipales?: StringNullableListFilter<"PeoplesMeta">
    ultimaActualizacion?: StringWithAggregatesFilter<"PeoplesMeta"> | string
  }

  export type UserWatchedConferenceWhereInput = {
    AND?: UserWatchedConferenceWhereInput | UserWatchedConferenceWhereInput[]
    OR?: UserWatchedConferenceWhereInput[]
    NOT?: UserWatchedConferenceWhereInput | UserWatchedConferenceWhereInput[]
    id?: StringFilter<"UserWatchedConference"> | string
    userId?: StringFilter<"UserWatchedConference"> | string
    conferenceId?: StringFilter<"UserWatchedConference"> | string
    watchedAt?: DateTimeFilter<"UserWatchedConference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conference?: XOR<ConferenceScalarRelationFilter, ConferenceWhereInput>
  }

  export type UserWatchedConferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    conferenceId?: SortOrder
    watchedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    conference?: ConferenceOrderByWithRelationInput
  }

  export type UserWatchedConferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_conferenceId?: UserWatchedConferenceUserIdConferenceIdCompoundUniqueInput
    AND?: UserWatchedConferenceWhereInput | UserWatchedConferenceWhereInput[]
    OR?: UserWatchedConferenceWhereInput[]
    NOT?: UserWatchedConferenceWhereInput | UserWatchedConferenceWhereInput[]
    userId?: StringFilter<"UserWatchedConference"> | string
    conferenceId?: StringFilter<"UserWatchedConference"> | string
    watchedAt?: DateTimeFilter<"UserWatchedConference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conference?: XOR<ConferenceScalarRelationFilter, ConferenceWhereInput>
  }, "id" | "userId_conferenceId">

  export type UserWatchedConferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    conferenceId?: SortOrder
    watchedAt?: SortOrder
    _count?: UserWatchedConferenceCountOrderByAggregateInput
    _max?: UserWatchedConferenceMaxOrderByAggregateInput
    _min?: UserWatchedConferenceMinOrderByAggregateInput
  }

  export type UserWatchedConferenceScalarWhereWithAggregatesInput = {
    AND?: UserWatchedConferenceScalarWhereWithAggregatesInput | UserWatchedConferenceScalarWhereWithAggregatesInput[]
    OR?: UserWatchedConferenceScalarWhereWithAggregatesInput[]
    NOT?: UserWatchedConferenceScalarWhereWithAggregatesInput | UserWatchedConferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserWatchedConference"> | string
    userId?: StringWithAggregatesFilter<"UserWatchedConference"> | string
    conferenceId?: StringWithAggregatesFilter<"UserWatchedConference"> | string
    watchedAt?: DateTimeWithAggregatesFilter<"UserWatchedConference"> | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConferenceCreateInput = {
    id: string
    title: string
    type: string
    date?: string | null
    year?: number | null
    organization: string
    url?: string | null
    youtubeUrl?: string | null
    infoAdicional?: string | null
    description: string
    summary: string
    topics?: ConferenceCreatetopicsInput | string[]
    characters?: ConferenceCreatecharactersInput | string[]
    civilizations?: ConferenceCreatecivilizationsInput | string[]
    duration?: string | null
    language: string
    source: string
    mediaType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchedBy?: UserWatchedConferenceCreateNestedManyWithoutConferenceInput
  }

  export type ConferenceUncheckedCreateInput = {
    id: string
    title: string
    type: string
    date?: string | null
    year?: number | null
    organization: string
    url?: string | null
    youtubeUrl?: string | null
    infoAdicional?: string | null
    description: string
    summary: string
    topics?: ConferenceCreatetopicsInput | string[]
    characters?: ConferenceCreatecharactersInput | string[]
    civilizations?: ConferenceCreatecivilizationsInput | string[]
    duration?: string | null
    language: string
    source: string
    mediaType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchedBy?: UserWatchedConferenceUncheckedCreateNestedManyWithoutConferenceInput
  }

  export type ConferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedBy?: UserWatchedConferenceUpdateManyWithoutConferenceNestedInput
  }

  export type ConferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedBy?: UserWatchedConferenceUncheckedUpdateManyWithoutConferenceNestedInput
  }

  export type ConferenceCreateManyInput = {
    id: string
    title: string
    type: string
    date?: string | null
    year?: number | null
    organization: string
    url?: string | null
    youtubeUrl?: string | null
    infoAdicional?: string | null
    description: string
    summary: string
    topics?: ConferenceCreatetopicsInput | string[]
    characters?: ConferenceCreatecharactersInput | string[]
    civilizations?: ConferenceCreatecivilizationsInput | string[]
    duration?: string | null
    language: string
    source: string
    mediaType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEventCreateInput = {
    id: string
    title: string
    dateLabel: string
    startYear: number
    endYear: number
    period: string
    location: string
    description: string
    summary: string
    consequences?: TimelineEventCreateconsequencesInput | string[]
    characters?: TimelineEventCreatecharactersInput | string[]
    civilizations?: TimelineEventCreatecivilizationsInput | string[]
    topics?: TimelineEventCreatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventCreaterelatedConferencesInput | string[]
  }

  export type TimelineEventUncheckedCreateInput = {
    id: string
    title: string
    dateLabel: string
    startYear: number
    endYear: number
    period: string
    location: string
    description: string
    summary: string
    consequences?: TimelineEventCreateconsequencesInput | string[]
    characters?: TimelineEventCreatecharactersInput | string[]
    civilizations?: TimelineEventCreatecivilizationsInput | string[]
    topics?: TimelineEventCreatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventCreaterelatedConferencesInput | string[]
  }

  export type TimelineEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dateLabel?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    consequences?: TimelineEventUpdateconsequencesInput | string[]
    characters?: TimelineEventUpdatecharactersInput | string[]
    civilizations?: TimelineEventUpdatecivilizationsInput | string[]
    topics?: TimelineEventUpdatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventUpdaterelatedConferencesInput | string[]
  }

  export type TimelineEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dateLabel?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    consequences?: TimelineEventUpdateconsequencesInput | string[]
    characters?: TimelineEventUpdatecharactersInput | string[]
    civilizations?: TimelineEventUpdatecivilizationsInput | string[]
    topics?: TimelineEventUpdatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventUpdaterelatedConferencesInput | string[]
  }

  export type TimelineEventCreateManyInput = {
    id: string
    title: string
    dateLabel: string
    startYear: number
    endYear: number
    period: string
    location: string
    description: string
    summary: string
    consequences?: TimelineEventCreateconsequencesInput | string[]
    characters?: TimelineEventCreatecharactersInput | string[]
    civilizations?: TimelineEventCreatecivilizationsInput | string[]
    topics?: TimelineEventCreatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventCreaterelatedConferencesInput | string[]
  }

  export type TimelineEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dateLabel?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    consequences?: TimelineEventUpdateconsequencesInput | string[]
    characters?: TimelineEventUpdatecharactersInput | string[]
    civilizations?: TimelineEventUpdatecivilizationsInput | string[]
    topics?: TimelineEventUpdatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventUpdaterelatedConferencesInput | string[]
  }

  export type TimelineEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dateLabel?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    consequences?: TimelineEventUpdateconsequencesInput | string[]
    characters?: TimelineEventUpdatecharactersInput | string[]
    civilizations?: TimelineEventUpdatecivilizationsInput | string[]
    topics?: TimelineEventUpdatetopicsInput | string[]
    sourceConference?: NullableJsonNullValueInput | InputJsonValue
    relatedConferences?: TimelineEventUpdaterelatedConferencesInput | string[]
  }

  export type PeopleGroupCreateInput = {
    id: string
    name: string
    startYear: number
    endYear: number
    peakYear: number
    peakPopulation: number
    color: string
    region: string
    description: string
    civilizations?: PeopleGroupCreatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupCreaterelatedConferencesInput | string[]
  }

  export type PeopleGroupUncheckedCreateInput = {
    id: string
    name: string
    startYear: number
    endYear: number
    peakYear: number
    peakPopulation: number
    color: string
    region: string
    description: string
    civilizations?: PeopleGroupCreatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupCreaterelatedConferencesInput | string[]
  }

  export type PeopleGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    peakYear?: IntFieldUpdateOperationsInput | number
    peakPopulation?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    civilizations?: PeopleGroupUpdatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupUpdaterelatedConferencesInput | string[]
  }

  export type PeopleGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    peakYear?: IntFieldUpdateOperationsInput | number
    peakPopulation?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    civilizations?: PeopleGroupUpdatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupUpdaterelatedConferencesInput | string[]
  }

  export type PeopleGroupCreateManyInput = {
    id: string
    name: string
    startYear: number
    endYear: number
    peakYear: number
    peakPopulation: number
    color: string
    region: string
    description: string
    civilizations?: PeopleGroupCreatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupCreaterelatedConferencesInput | string[]
  }

  export type PeopleGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    peakYear?: IntFieldUpdateOperationsInput | number
    peakPopulation?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    civilizations?: PeopleGroupUpdatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupUpdaterelatedConferencesInput | string[]
  }

  export type PeopleGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startYear?: IntFieldUpdateOperationsInput | number
    endYear?: IntFieldUpdateOperationsInput | number
    peakYear?: IntFieldUpdateOperationsInput | number
    peakPopulation?: IntFieldUpdateOperationsInput | number
    color?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    civilizations?: PeopleGroupUpdatecivilizationsInput | string[]
    relatedConferences?: PeopleGroupUpdaterelatedConferencesInput | string[]
  }

  export type TimelineMetaCreateInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalEventos: number
    fuentesPrincipales?: TimelineMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type TimelineMetaUncheckedCreateInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalEventos: number
    fuentesPrincipales?: TimelineMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type TimelineMetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalEventos?: IntFieldUpdateOperationsInput | number
    fuentesPrincipales?: TimelineMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type TimelineMetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalEventos?: IntFieldUpdateOperationsInput | number
    fuentesPrincipales?: TimelineMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type TimelineMetaCreateManyInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalEventos: number
    fuentesPrincipales?: TimelineMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type TimelineMetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalEventos?: IntFieldUpdateOperationsInput | number
    fuentesPrincipales?: TimelineMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type TimelineMetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalEventos?: IntFieldUpdateOperationsInput | number
    fuentesPrincipales?: TimelineMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type PeoplesMetaCreateInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalPueblos: number
    unidadPoblacion: string
    fuentesPrincipales?: PeoplesMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type PeoplesMetaUncheckedCreateInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalPueblos: number
    unidadPoblacion: string
    fuentesPrincipales?: PeoplesMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type PeoplesMetaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalPueblos?: IntFieldUpdateOperationsInput | number
    unidadPoblacion?: StringFieldUpdateOperationsInput | string
    fuentesPrincipales?: PeoplesMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type PeoplesMetaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalPueblos?: IntFieldUpdateOperationsInput | number
    unidadPoblacion?: StringFieldUpdateOperationsInput | string
    fuentesPrincipales?: PeoplesMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type PeoplesMetaCreateManyInput = {
    id?: string
    autorContenido: string
    enfoque: string
    coberturaCronologica: string
    totalPueblos: number
    unidadPoblacion: string
    fuentesPrincipales?: PeoplesMetaCreatefuentesPrincipalesInput | string[]
    ultimaActualizacion: string
  }

  export type PeoplesMetaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalPueblos?: IntFieldUpdateOperationsInput | number
    unidadPoblacion?: StringFieldUpdateOperationsInput | string
    fuentesPrincipales?: PeoplesMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type PeoplesMetaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    autorContenido?: StringFieldUpdateOperationsInput | string
    enfoque?: StringFieldUpdateOperationsInput | string
    coberturaCronologica?: StringFieldUpdateOperationsInput | string
    totalPueblos?: IntFieldUpdateOperationsInput | number
    unidadPoblacion?: StringFieldUpdateOperationsInput | string
    fuentesPrincipales?: PeoplesMetaUpdatefuentesPrincipalesInput | string[]
    ultimaActualizacion?: StringFieldUpdateOperationsInput | string
  }

  export type UserWatchedConferenceCreateInput = {
    id?: string
    watchedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchedInput
    conference: ConferenceCreateNestedOneWithoutWatchedByInput
  }

  export type UserWatchedConferenceUncheckedCreateInput = {
    id?: string
    userId: string
    conferenceId: string
    watchedAt?: Date | string
  }

  export type UserWatchedConferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchedNestedInput
    conference?: ConferenceUpdateOneRequiredWithoutWatchedByNestedInput
  }

  export type UserWatchedConferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conferenceId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceCreateManyInput = {
    id?: string
    userId: string
    conferenceId: string
    watchedAt?: Date | string
  }

  export type UserWatchedConferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conferenceId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type UserWatchedConferenceListRelationFilter = {
    every?: UserWatchedConferenceWhereInput
    some?: UserWatchedConferenceWhereInput
    none?: UserWatchedConferenceWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserWatchedConferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    password?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ConferenceCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    year?: SortOrder
    organization?: SortOrder
    url?: SortOrder
    youtubeUrl?: SortOrder
    infoAdicional?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    topics?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    duration?: SortOrder
    language?: SortOrder
    source?: SortOrder
    mediaType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConferenceAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type ConferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    year?: SortOrder
    organization?: SortOrder
    url?: SortOrder
    youtubeUrl?: SortOrder
    infoAdicional?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    duration?: SortOrder
    language?: SortOrder
    source?: SortOrder
    mediaType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConferenceMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    type?: SortOrder
    date?: SortOrder
    year?: SortOrder
    organization?: SortOrder
    url?: SortOrder
    youtubeUrl?: SortOrder
    infoAdicional?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    duration?: SortOrder
    language?: SortOrder
    source?: SortOrder
    mediaType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConferenceSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TimelineEventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dateLabel?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    consequences?: SortOrder
    characters?: SortOrder
    civilizations?: SortOrder
    topics?: SortOrder
    sourceConference?: SortOrder
    relatedConferences?: SortOrder
  }

  export type TimelineEventAvgOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
  }

  export type TimelineEventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dateLabel?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    summary?: SortOrder
  }

  export type TimelineEventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    dateLabel?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    summary?: SortOrder
  }

  export type TimelineEventSumOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PeopleGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
    color?: SortOrder
    region?: SortOrder
    description?: SortOrder
    civilizations?: SortOrder
    relatedConferences?: SortOrder
  }

  export type PeopleGroupAvgOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
  }

  export type PeopleGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
    color?: SortOrder
    region?: SortOrder
    description?: SortOrder
  }

  export type PeopleGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
    color?: SortOrder
    region?: SortOrder
    description?: SortOrder
  }

  export type PeopleGroupSumOrderByAggregateInput = {
    startYear?: SortOrder
    endYear?: SortOrder
    peakYear?: SortOrder
    peakPopulation?: SortOrder
  }

  export type TimelineMetaCountOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalEventos?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type TimelineMetaAvgOrderByAggregateInput = {
    totalEventos?: SortOrder
  }

  export type TimelineMetaMaxOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalEventos?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type TimelineMetaMinOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalEventos?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type TimelineMetaSumOrderByAggregateInput = {
    totalEventos?: SortOrder
  }

  export type PeoplesMetaCountOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalPueblos?: SortOrder
    unidadPoblacion?: SortOrder
    fuentesPrincipales?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type PeoplesMetaAvgOrderByAggregateInput = {
    totalPueblos?: SortOrder
  }

  export type PeoplesMetaMaxOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalPueblos?: SortOrder
    unidadPoblacion?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type PeoplesMetaMinOrderByAggregateInput = {
    id?: SortOrder
    autorContenido?: SortOrder
    enfoque?: SortOrder
    coberturaCronologica?: SortOrder
    totalPueblos?: SortOrder
    unidadPoblacion?: SortOrder
    ultimaActualizacion?: SortOrder
  }

  export type PeoplesMetaSumOrderByAggregateInput = {
    totalPueblos?: SortOrder
  }

  export type ConferenceScalarRelationFilter = {
    is?: ConferenceWhereInput
    isNot?: ConferenceWhereInput
  }

  export type UserWatchedConferenceUserIdConferenceIdCompoundUniqueInput = {
    userId: string
    conferenceId: string
  }

  export type UserWatchedConferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conferenceId?: SortOrder
    watchedAt?: SortOrder
  }

  export type UserWatchedConferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conferenceId?: SortOrder
    watchedAt?: SortOrder
  }

  export type UserWatchedConferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    conferenceId?: SortOrder
    watchedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserWatchedConferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput> | UserWatchedConferenceCreateWithoutUserInput[] | UserWatchedConferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutUserInput | UserWatchedConferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserWatchedConferenceCreateManyUserInputEnvelope
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserWatchedConferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput> | UserWatchedConferenceCreateWithoutUserInput[] | UserWatchedConferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutUserInput | UserWatchedConferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserWatchedConferenceCreateManyUserInputEnvelope
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserWatchedConferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput> | UserWatchedConferenceCreateWithoutUserInput[] | UserWatchedConferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutUserInput | UserWatchedConferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserWatchedConferenceUpsertWithWhereUniqueWithoutUserInput | UserWatchedConferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWatchedConferenceCreateManyUserInputEnvelope
    set?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    disconnect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    delete?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    update?: UserWatchedConferenceUpdateWithWhereUniqueWithoutUserInput | UserWatchedConferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWatchedConferenceUpdateManyWithWhereWithoutUserInput | UserWatchedConferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserWatchedConferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput> | UserWatchedConferenceCreateWithoutUserInput[] | UserWatchedConferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutUserInput | UserWatchedConferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserWatchedConferenceUpsertWithWhereUniqueWithoutUserInput | UserWatchedConferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWatchedConferenceCreateManyUserInputEnvelope
    set?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    disconnect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    delete?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    update?: UserWatchedConferenceUpdateWithWhereUniqueWithoutUserInput | UserWatchedConferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWatchedConferenceUpdateManyWithWhereWithoutUserInput | UserWatchedConferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
  }

  export type ConferenceCreatetopicsInput = {
    set: string[]
  }

  export type ConferenceCreatecharactersInput = {
    set: string[]
  }

  export type ConferenceCreatecivilizationsInput = {
    set: string[]
  }

  export type UserWatchedConferenceCreateNestedManyWithoutConferenceInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput> | UserWatchedConferenceCreateWithoutConferenceInput[] | UserWatchedConferenceUncheckedCreateWithoutConferenceInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutConferenceInput | UserWatchedConferenceCreateOrConnectWithoutConferenceInput[]
    createMany?: UserWatchedConferenceCreateManyConferenceInputEnvelope
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
  }

  export type UserWatchedConferenceUncheckedCreateNestedManyWithoutConferenceInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput> | UserWatchedConferenceCreateWithoutConferenceInput[] | UserWatchedConferenceUncheckedCreateWithoutConferenceInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutConferenceInput | UserWatchedConferenceCreateOrConnectWithoutConferenceInput[]
    createMany?: UserWatchedConferenceCreateManyConferenceInputEnvelope
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
  }

  export type ConferenceUpdatetopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConferenceUpdatecharactersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConferenceUpdatecivilizationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserWatchedConferenceUpdateManyWithoutConferenceNestedInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput> | UserWatchedConferenceCreateWithoutConferenceInput[] | UserWatchedConferenceUncheckedCreateWithoutConferenceInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutConferenceInput | UserWatchedConferenceCreateOrConnectWithoutConferenceInput[]
    upsert?: UserWatchedConferenceUpsertWithWhereUniqueWithoutConferenceInput | UserWatchedConferenceUpsertWithWhereUniqueWithoutConferenceInput[]
    createMany?: UserWatchedConferenceCreateManyConferenceInputEnvelope
    set?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    disconnect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    delete?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    update?: UserWatchedConferenceUpdateWithWhereUniqueWithoutConferenceInput | UserWatchedConferenceUpdateWithWhereUniqueWithoutConferenceInput[]
    updateMany?: UserWatchedConferenceUpdateManyWithWhereWithoutConferenceInput | UserWatchedConferenceUpdateManyWithWhereWithoutConferenceInput[]
    deleteMany?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
  }

  export type UserWatchedConferenceUncheckedUpdateManyWithoutConferenceNestedInput = {
    create?: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput> | UserWatchedConferenceCreateWithoutConferenceInput[] | UserWatchedConferenceUncheckedCreateWithoutConferenceInput[]
    connectOrCreate?: UserWatchedConferenceCreateOrConnectWithoutConferenceInput | UserWatchedConferenceCreateOrConnectWithoutConferenceInput[]
    upsert?: UserWatchedConferenceUpsertWithWhereUniqueWithoutConferenceInput | UserWatchedConferenceUpsertWithWhereUniqueWithoutConferenceInput[]
    createMany?: UserWatchedConferenceCreateManyConferenceInputEnvelope
    set?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    disconnect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    delete?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    connect?: UserWatchedConferenceWhereUniqueInput | UserWatchedConferenceWhereUniqueInput[]
    update?: UserWatchedConferenceUpdateWithWhereUniqueWithoutConferenceInput | UserWatchedConferenceUpdateWithWhereUniqueWithoutConferenceInput[]
    updateMany?: UserWatchedConferenceUpdateManyWithWhereWithoutConferenceInput | UserWatchedConferenceUpdateManyWithWhereWithoutConferenceInput[]
    deleteMany?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
  }

  export type TimelineEventCreateconsequencesInput = {
    set: string[]
  }

  export type TimelineEventCreatecharactersInput = {
    set: string[]
  }

  export type TimelineEventCreatecivilizationsInput = {
    set: string[]
  }

  export type TimelineEventCreatetopicsInput = {
    set: string[]
  }

  export type TimelineEventCreaterelatedConferencesInput = {
    set: string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TimelineEventUpdateconsequencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineEventUpdatecharactersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineEventUpdatecivilizationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineEventUpdatetopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineEventUpdaterelatedConferencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PeopleGroupCreatecivilizationsInput = {
    set: string[]
  }

  export type PeopleGroupCreaterelatedConferencesInput = {
    set: string[]
  }

  export type PeopleGroupUpdatecivilizationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PeopleGroupUpdaterelatedConferencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimelineMetaCreatefuentesPrincipalesInput = {
    set: string[]
  }

  export type TimelineMetaUpdatefuentesPrincipalesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PeoplesMetaCreatefuentesPrincipalesInput = {
    set: string[]
  }

  export type PeoplesMetaUpdatefuentesPrincipalesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserCreateNestedOneWithoutWatchedInput = {
    create?: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchedInput
    connect?: UserWhereUniqueInput
  }

  export type ConferenceCreateNestedOneWithoutWatchedByInput = {
    create?: XOR<ConferenceCreateWithoutWatchedByInput, ConferenceUncheckedCreateWithoutWatchedByInput>
    connectOrCreate?: ConferenceCreateOrConnectWithoutWatchedByInput
    connect?: ConferenceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWatchedNestedInput = {
    create?: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchedInput
    upsert?: UserUpsertWithoutWatchedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchedInput, UserUpdateWithoutWatchedInput>, UserUncheckedUpdateWithoutWatchedInput>
  }

  export type ConferenceUpdateOneRequiredWithoutWatchedByNestedInput = {
    create?: XOR<ConferenceCreateWithoutWatchedByInput, ConferenceUncheckedCreateWithoutWatchedByInput>
    connectOrCreate?: ConferenceCreateOrConnectWithoutWatchedByInput
    upsert?: ConferenceUpsertWithoutWatchedByInput
    connect?: ConferenceWhereUniqueInput
    update?: XOR<XOR<ConferenceUpdateToOneWithWhereWithoutWatchedByInput, ConferenceUpdateWithoutWatchedByInput>, ConferenceUncheckedUpdateWithoutWatchedByInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    watched?: UserWatchedConferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    watched?: UserWatchedConferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserWatchedConferenceCreateWithoutUserInput = {
    id?: string
    watchedAt?: Date | string
    conference: ConferenceCreateNestedOneWithoutWatchedByInput
  }

  export type UserWatchedConferenceUncheckedCreateWithoutUserInput = {
    id?: string
    conferenceId: string
    watchedAt?: Date | string
  }

  export type UserWatchedConferenceCreateOrConnectWithoutUserInput = {
    where: UserWatchedConferenceWhereUniqueInput
    create: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput>
  }

  export type UserWatchedConferenceCreateManyUserInputEnvelope = {
    data: UserWatchedConferenceCreateManyUserInput | UserWatchedConferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserWatchedConferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserWatchedConferenceWhereUniqueInput
    update: XOR<UserWatchedConferenceUpdateWithoutUserInput, UserWatchedConferenceUncheckedUpdateWithoutUserInput>
    create: XOR<UserWatchedConferenceCreateWithoutUserInput, UserWatchedConferenceUncheckedCreateWithoutUserInput>
  }

  export type UserWatchedConferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserWatchedConferenceWhereUniqueInput
    data: XOR<UserWatchedConferenceUpdateWithoutUserInput, UserWatchedConferenceUncheckedUpdateWithoutUserInput>
  }

  export type UserWatchedConferenceUpdateManyWithWhereWithoutUserInput = {
    where: UserWatchedConferenceScalarWhereInput
    data: XOR<UserWatchedConferenceUpdateManyMutationInput, UserWatchedConferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type UserWatchedConferenceScalarWhereInput = {
    AND?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
    OR?: UserWatchedConferenceScalarWhereInput[]
    NOT?: UserWatchedConferenceScalarWhereInput | UserWatchedConferenceScalarWhereInput[]
    id?: StringFilter<"UserWatchedConference"> | string
    userId?: StringFilter<"UserWatchedConference"> | string
    conferenceId?: StringFilter<"UserWatchedConference"> | string
    watchedAt?: DateTimeFilter<"UserWatchedConference"> | Date | string
  }

  export type UserWatchedConferenceCreateWithoutConferenceInput = {
    id?: string
    watchedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchedInput
  }

  export type UserWatchedConferenceUncheckedCreateWithoutConferenceInput = {
    id?: string
    userId: string
    watchedAt?: Date | string
  }

  export type UserWatchedConferenceCreateOrConnectWithoutConferenceInput = {
    where: UserWatchedConferenceWhereUniqueInput
    create: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput>
  }

  export type UserWatchedConferenceCreateManyConferenceInputEnvelope = {
    data: UserWatchedConferenceCreateManyConferenceInput | UserWatchedConferenceCreateManyConferenceInput[]
    skipDuplicates?: boolean
  }

  export type UserWatchedConferenceUpsertWithWhereUniqueWithoutConferenceInput = {
    where: UserWatchedConferenceWhereUniqueInput
    update: XOR<UserWatchedConferenceUpdateWithoutConferenceInput, UserWatchedConferenceUncheckedUpdateWithoutConferenceInput>
    create: XOR<UserWatchedConferenceCreateWithoutConferenceInput, UserWatchedConferenceUncheckedCreateWithoutConferenceInput>
  }

  export type UserWatchedConferenceUpdateWithWhereUniqueWithoutConferenceInput = {
    where: UserWatchedConferenceWhereUniqueInput
    data: XOR<UserWatchedConferenceUpdateWithoutConferenceInput, UserWatchedConferenceUncheckedUpdateWithoutConferenceInput>
  }

  export type UserWatchedConferenceUpdateManyWithWhereWithoutConferenceInput = {
    where: UserWatchedConferenceScalarWhereInput
    data: XOR<UserWatchedConferenceUpdateManyMutationInput, UserWatchedConferenceUncheckedUpdateManyWithoutConferenceInput>
  }

  export type UserCreateWithoutWatchedInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchedInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    password?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
  }

  export type ConferenceCreateWithoutWatchedByInput = {
    id: string
    title: string
    type: string
    date?: string | null
    year?: number | null
    organization: string
    url?: string | null
    youtubeUrl?: string | null
    infoAdicional?: string | null
    description: string
    summary: string
    topics?: ConferenceCreatetopicsInput | string[]
    characters?: ConferenceCreatecharactersInput | string[]
    civilizations?: ConferenceCreatecivilizationsInput | string[]
    duration?: string | null
    language: string
    source: string
    mediaType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConferenceUncheckedCreateWithoutWatchedByInput = {
    id: string
    title: string
    type: string
    date?: string | null
    year?: number | null
    organization: string
    url?: string | null
    youtubeUrl?: string | null
    infoAdicional?: string | null
    description: string
    summary: string
    topics?: ConferenceCreatetopicsInput | string[]
    characters?: ConferenceCreatecharactersInput | string[]
    civilizations?: ConferenceCreatecivilizationsInput | string[]
    duration?: string | null
    language: string
    source: string
    mediaType?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConferenceCreateOrConnectWithoutWatchedByInput = {
    where: ConferenceWhereUniqueInput
    create: XOR<ConferenceCreateWithoutWatchedByInput, ConferenceUncheckedCreateWithoutWatchedByInput>
  }

  export type UserUpsertWithoutWatchedInput = {
    update: XOR<UserUpdateWithoutWatchedInput, UserUncheckedUpdateWithoutWatchedInput>
    create: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchedInput, UserUncheckedUpdateWithoutWatchedInput>
  }

  export type UserUpdateWithoutWatchedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConferenceUpsertWithoutWatchedByInput = {
    update: XOR<ConferenceUpdateWithoutWatchedByInput, ConferenceUncheckedUpdateWithoutWatchedByInput>
    create: XOR<ConferenceCreateWithoutWatchedByInput, ConferenceUncheckedCreateWithoutWatchedByInput>
    where?: ConferenceWhereInput
  }

  export type ConferenceUpdateToOneWithWhereWithoutWatchedByInput = {
    where?: ConferenceWhereInput
    data: XOR<ConferenceUpdateWithoutWatchedByInput, ConferenceUncheckedUpdateWithoutWatchedByInput>
  }

  export type ConferenceUpdateWithoutWatchedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConferenceUncheckedUpdateWithoutWatchedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    date?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    organization?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    infoAdicional?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    topics?: ConferenceUpdatetopicsInput | string[]
    characters?: ConferenceUpdatecharactersInput | string[]
    civilizations?: ConferenceUpdatecivilizationsInput | string[]
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    mediaType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type UserWatchedConferenceCreateManyUserInput = {
    id?: string
    conferenceId: string
    watchedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conference?: ConferenceUpdateOneRequiredWithoutWatchedByNestedInput
  }

  export type UserWatchedConferenceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conferenceId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conferenceId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceCreateManyConferenceInput = {
    id?: string
    userId: string
    watchedAt?: Date | string
  }

  export type UserWatchedConferenceUpdateWithoutConferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchedNestedInput
  }

  export type UserWatchedConferenceUncheckedUpdateWithoutConferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWatchedConferenceUncheckedUpdateManyWithoutConferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    watchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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