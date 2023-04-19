import { User, Post } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafePost = Omit<Post, "createdAt" | "updatedAt" | "owner"> & {
  owner: SafeUser;
  createdAt: string;
  updatedAt: string;
};
