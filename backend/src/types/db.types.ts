import type { Prisma } from "@prisma/client";

type DbModels = keyof Prisma.TypeMap["model"];

type DyanmicClause<T> = {};
