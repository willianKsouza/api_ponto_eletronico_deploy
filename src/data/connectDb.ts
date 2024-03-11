import { PrismaClient } from "@prisma/client";

class PrismaClientDB {
  private static instance: PrismaClient;
  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaClientDB.instance) {
        PrismaClientDB.instance = new PrismaClient({
          log: ["query", "info", "warn", "error"],
        });
    }
    return PrismaClientDB.instance;
  }
}


export const prisma = PrismaClientDB.getInstance




