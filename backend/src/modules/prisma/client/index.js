
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions
} = require('./runtime/index')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.8.0
 * Query Engine version: 694eea289a8462c80264df36757e4fdc129b1b32
 */
Prisma.prismaVersion = {
  client: "4.8.0",
  engine: "694eea289a8462c80264df36757e4fdc129b1b32"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "src/modules/prisma/client",
    "modules/prisma/client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AddressScalarFieldEnum = makeEnum({
  id: 'id',
  city: 'city',
  country: 'country'
});

exports.Prisma.DriverScalarFieldEnum = makeEnum({
  id: 'id',
  telegramId: 'telegramId',
  name: 'name',
  phone: 'phone'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.RideCommentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  text: 'text',
  rideId: 'rideId',
  authorId: 'authorId'
});

exports.Prisma.RideScalarFieldEnum = makeEnum({
  id: 'id',
  departureTime: 'departureTime',
  destinationId: 'destinationId',
  driverId: 'driverId',
  fromId: 'fromId',
  status: 'status',
  vehicle: 'vehicle',
  volunteerId: 'volunteerId'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  password: 'password',
  name: 'name'
});
exports.RideStatus = makeEnum({
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
});

exports.Vehicle = makeEnum({
  CAR: 'CAR',
  VAN: 'VAN',
  TRUCK: 'TRUCK'
});

exports.Prisma.ModelName = makeEnum({
  Driver: 'Driver',
  Ride: 'Ride',
  Address: 'Address',
  RideComment: 'RideComment',
  User: 'User'
});

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"RideStatus\",\"values\":[{\"name\":\"PENDING\",\"dbName\":\"PENDING\"},{\"name\":\"ACTIVE\",\"dbName\":\"ACTIVE\"},{\"name\":\"FINISHED\",\"dbName\":\"FINISHED\"}],\"dbName\":null},{\"name\":\"Vehicle\",\"values\":[{\"name\":\"CAR\",\"dbName\":\"CAR\"},{\"name\":\"VAN\",\"dbName\":\"VAN\"},{\"name\":\"TRUCK\",\"dbName\":\"TRUCK\"}],\"dbName\":null}],\"models\":[{\"name\":\"Driver\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"telegramId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rides\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ride\",\"relationName\":\"DriverToRide\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Ride\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departureTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destination\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Address\",\"relationName\":\"rideDestination\",\"relationFromFields\":[\"destinationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"driver\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Driver\",\"relationName\":\"DriverToRide\",\"relationFromFields\":[\"driverId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"driverId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Address\",\"relationName\":\"rideAdress\",\"relationFromFields\":[\"fromId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RideStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vehicle\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Vehicle\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RideComment\",\"relationName\":\"RideToRideComment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volunteer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RideToUser\",\"relationFromFields\":[\"volunteerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volunteerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Address\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rideDestination\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ride\",\"relationName\":\"rideDestination\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rideAdress\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ride\",\"relationName\":\"rideAdress\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"RideComment\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ride\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ride\",\"relationName\":\"RideToRideComment\",\"relationFromFields\":[\"rideId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rideId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RideCommentToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"User\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rides\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ride\",\"relationName\":\"RideToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rideComments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RideComment\",\"relationName\":\"RideCommentToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"Driver\",\"plural\":\"drivers\",\"findUnique\":\"findUniqueDriver\",\"findUniqueOrThrow\":\"findUniqueDriverOrThrow\",\"findFirst\":\"findFirstDriver\",\"findFirstOrThrow\":\"findFirstDriverOrThrow\",\"findMany\":\"findManyDriver\",\"create\":\"createOneDriver\",\"createMany\":\"createManyDriver\",\"delete\":\"deleteOneDriver\",\"update\":\"updateOneDriver\",\"deleteMany\":\"deleteManyDriver\",\"updateMany\":\"updateManyDriver\",\"upsert\":\"upsertOneDriver\",\"aggregate\":\"aggregateDriver\",\"groupBy\":\"groupByDriver\"},{\"model\":\"Ride\",\"plural\":\"rides\",\"findUnique\":\"findUniqueRide\",\"findUniqueOrThrow\":\"findUniqueRideOrThrow\",\"findFirst\":\"findFirstRide\",\"findFirstOrThrow\":\"findFirstRideOrThrow\",\"findMany\":\"findManyRide\",\"create\":\"createOneRide\",\"createMany\":\"createManyRide\",\"delete\":\"deleteOneRide\",\"update\":\"updateOneRide\",\"deleteMany\":\"deleteManyRide\",\"updateMany\":\"updateManyRide\",\"upsert\":\"upsertOneRide\",\"aggregate\":\"aggregateRide\",\"groupBy\":\"groupByRide\"},{\"model\":\"Address\",\"plural\":\"addresses\",\"findUnique\":\"findUniqueAddress\",\"findUniqueOrThrow\":\"findUniqueAddressOrThrow\",\"findFirst\":\"findFirstAddress\",\"findFirstOrThrow\":\"findFirstAddressOrThrow\",\"findMany\":\"findManyAddress\",\"create\":\"createOneAddress\",\"createMany\":\"createManyAddress\",\"delete\":\"deleteOneAddress\",\"update\":\"updateOneAddress\",\"deleteMany\":\"deleteManyAddress\",\"updateMany\":\"updateManyAddress\",\"upsert\":\"upsertOneAddress\",\"aggregate\":\"aggregateAddress\",\"groupBy\":\"groupByAddress\"},{\"model\":\"RideComment\",\"plural\":\"rideComments\",\"findUnique\":\"findUniqueRideComment\",\"findUniqueOrThrow\":\"findUniqueRideCommentOrThrow\",\"findFirst\":\"findFirstRideComment\",\"findFirstOrThrow\":\"findFirstRideCommentOrThrow\",\"findMany\":\"findManyRideComment\",\"create\":\"createOneRideComment\",\"createMany\":\"createManyRideComment\",\"delete\":\"deleteOneRideComment\",\"update\":\"updateOneRideComment\",\"deleteMany\":\"deleteManyRideComment\",\"updateMany\":\"updateManyRideComment\",\"upsert\":\"upsertOneRideComment\",\"aggregate\":\"aggregateRideComment\",\"groupBy\":\"groupByRideComment\"},{\"model\":\"User\",\"plural\":\"users\",\"findUnique\":\"findUniqueUser\",\"findUniqueOrThrow\":\"findUniqueUserOrThrow\",\"findFirst\":\"findFirstUser\",\"findFirstOrThrow\":\"findFirstUserOrThrow\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"createMany\":\"createManyUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\",\"groupBy\":\"groupByUser\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/app/src/modules/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../../.env",
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "4.8.0",
  "engineVersion": "694eea289a8462c80264df36757e4fdc129b1b32",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-linux-arm64-openssl-1.1.x.so.node");
path.join(process.cwd(), "src/modules/prisma/client/libquery_engine-linux-arm64-openssl-1.1.x.so.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/modules/prisma/client/schema.prisma")
