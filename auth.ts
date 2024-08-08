import { db } from "./lib/db";
import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { user } from "./schema/user";
import bcrypt from "bcrypt";


const providers: Provider[] = [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const userRes = await db.query.user.findFirst({
          where: eq(user.email, email),
        });
        if (!userRes) {
          throw new Error("User not found.");
        }
        if (!userRes.password) {
          throw new Error("Password not found.");
        }
        const valid = bcrypt.compareSync(password, userRes.password);
        if (!valid) {
          throw new Error("Invalid password.");
        }
        return userRes;
      },
    }),

]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers,
  pages: {
    signIn: "/signin",
  },
})