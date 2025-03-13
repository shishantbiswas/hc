"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { faker } from '@faker-js/faker';

export async function AddLinkToDB(formData: FormData) {
  let name = formData.get("name") as string | null;
  let url = formData.get("url") as string;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { message: "unauthorized!", type: "error" };
  }

  if (!url) {
    return { message: "url is required!", type: "error" };
  }

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const existing = await db.link.findFirst({
    where: {
      href: url,
    },
  });

  if (existing) {
    return { message: "link already exists", type: "warning" };
  }

  if (isLocalhost(url)) {
    return { message: "Invalid URL!", type: "warning" };
  }
  const faviconUrl = await testLinkStatus(url);

  if (faviconUrl.result == "error") {
    return { message: "provided url couldn't be reached!", type: "warning" };
  }

  if (!name) {
    name = generateName();
  }

  await db.link.create({
    data: {
      href: url,
      name,
      favicon: faviconUrl.result,
      userId: session.user.id
    },
  });

  revalidatePath("/", "layout");
  return { message: "link added successfully", type: "success" };
}

function isLocalhost(url: string): Boolean {
  const regex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/;
  return regex.test(url);
}

async function testLinkStatus(url: string): Promise<{
  result: string | null;
}> {
  let faviconUrl: string | null = null;

  const response = await fetch(url, { cache: "no-store" }).catch(() => {
    null;
  });
  if (!response || !response.ok) {
    return { result: "error" };
  }

  const html = await response.text();
  const regex =
    /<head[^>]*>[\s\S]*?<link\b[^>]*\b(?:rel=["']icon["']|as=["']image["'])[^>]*\bhref=["'](.*?)["'][^>]*>[\s\S]*?<\/head>/i;
  const match = html.match(regex);

  if (match && match[1]) {
    faviconUrl = match[1];
    if (faviconUrl && !faviconUrl.startsWith("http")) {
      const urlObj = new URL(faviconUrl, url);
      faviconUrl = urlObj.href;
    }
  }

  return { result: faviconUrl };
}





const adjectives = [
  "admiring", "adoring", "affectionate", "agitated", "amazing",
  "angry", "awesome", "blissful", "bold", "boring",
  "brave", "charming", "clever", "cool", "compassionate",
  "competent", "confident", "crazy", "dazzling", "determined",
  "distracted", "dreamy", "eager", "ecstatic", "elastic",
  "elated", "elegant", "eloquent", "epic", "fervent",
  "festive", "flamboyant", "focused", "friendly", "frosty",
  "gallant", "gifted", "goofy", "gracious", "hardcore",
  "heuristic", "hopeful", "hungry", "infallible", "inspiring",
  "intelligent", "jolly", "jovial", "keen", "kind",
  "laughing", "loving", "lucid", "magical", "mystifying",
  "modest", "naughty", "nervous", "nifty", "nostalgic",
  "objective", "optimistic", "peaceful", "pedantic", "pensive",
  "practical", "priceless", "quirky", "quizzical", "recursing",
  "relaxed", "reverent", "romantic", "sad", "serene",
  "sharp", "silly", "sleepy", "stoic", "stupefied",
  "suspicious", "sweet", "tender", "thirsty", "trusting",
  "unruffled", "upbeat", "vibrant", "vigilant", "vigorous",
  "wizardly", "wonderful", "xenodochial", "youthful", "zealous", "zen"
];

function generateName() {
  const adjective = faker.helpers.arrayElement(adjectives);
  const lastName = faker.person.lastName();
  return `${adjective} ${lastName.toLowerCase()}`;
}
