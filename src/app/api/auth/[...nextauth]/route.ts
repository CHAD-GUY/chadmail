import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Find user
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if user exists
        if (!userFound) {
          throw new Error("User not found");
        }

        // Check if passwords match
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!passwordsMatch) {
          throw new Error("Invalid credentials");
        }

        // Return user
        return {
          id: userFound.id,
          email: userFound.email,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
