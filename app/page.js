import { createClient } from "next-sanity";
import Landing from "./Landing";
import { QUERY } from "./query";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: false,
});

export default async function Page() {
  let data = null;
  try {
    data = await client.fetch(QUERY);
  } catch {}
  return <Landing data={data} />;
}
