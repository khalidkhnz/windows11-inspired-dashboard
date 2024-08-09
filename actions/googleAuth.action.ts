"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const googleAuthAction = async (formData: FormData) => {
  try {
    await signIn("google", {
      redirectTo: "/desktop",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/?error=${error.type}`);
    }
    throw error;
  }
};

export async function signoutAction() {
  await signOut({ redirect: true, redirectTo: "/" });
}
