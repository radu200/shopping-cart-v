import { api } from "./Config";

export async function getProducts() {
  const url = "/fe-test.json";
  return await api.get(url);
}
