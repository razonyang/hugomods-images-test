import { shopSdk } from "../graphql/shopClient";

export async function getLoggedInUser() {
  const current = await shopSdk.CurrentCustomer();

  if (current?.activeCustomer?.emailAddress) {
    return current.activeCustomer;
  }
}

export async function logIn(email: string, password: string) {
  try {
    const result = await shopSdk.login({ email, password });
  } catch (err) {
    console.error("Could not log in: ", err);
    throw err;
  }
}
