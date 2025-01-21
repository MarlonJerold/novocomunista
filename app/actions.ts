"use server";

import { connectToDatabase } from "@/app/lib/mongodb";

export interface VoteCount {
  _id?: string;
  "Bruno do Java": number;
  "Bruno do C#": number;
  "𝕹𝖆𝖑𝖚𝖍": number;
}

export async function getVotes(): Promise<VoteCount> {
  const client = await connectToDatabase();
  const collection = client.db("voting").collection<VoteCount>("votes");
  
  const votes = await collection.findOne({ _id: "vote_count" });
  
  return votes || { _id: "vote_count", "Bruno do Java": 0, "Bruno do C#": 0, "𝕹𝖆𝖑𝖚𝖍":0 };
}

export async function submitVote(candidate: keyof Omit<VoteCount, "_id">): Promise<VoteCount> {
  const client = await connectToDatabase();
  const collection = client.db("voting").collection<VoteCount>("votes");

  await collection.updateOne(
    { _id: "vote_count" },
    { $inc: { [candidate]: 1 } },
    { upsert: true }
  );

  return await getVotes();
}
