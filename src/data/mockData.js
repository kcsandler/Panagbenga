import { subDays } from "date-fns";

const today = new Date();

// Generate 30 days of daily sentiment data
const dailySentiment = Array.from({ length: 30 }).map((_, index) => {
  const date = subDays(today, 29 - index);
  const baseTotal = 140 + Math.floor(Math.random() * 30); // ~150 posts/day

  const positiveShare = 0.55 + (Math.random() - 0.5) * 0.1;
  const neutralShare = 0.25 + (Math.random() - 0.5) * 0.08;
  let negativeShare = 1 - positiveShare - neutralShare;
  if (negativeShare < 0.05) negativeShare = 0.05;

  const positive = Math.round(baseTotal * positiveShare);
  const neutral = Math.round(baseTotal * neutralShare);
  const negative = Math.max(0, baseTotal - positive - neutral);

  return {
    date: date.toISOString().slice(0, 10),
    positive,
    neutral,
    negative,
  };
});

// Helper to generate daily counts for a topic with some variation
function generateTopicDailyCounts(multiplier = 1) {
  return Array.from({ length: 30 }).map((_, index) => {
    const date = subDays(today, 29 - index);
    const base = 8 + Math.floor(Math.random() * 6);
    const weekendBoost =
      date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1; // more posts on weekends
    const trendBoost = 0.8 + Math.random() * 0.6;

    const count = Math.round(base * weekendBoost * trendBoost * multiplier);

    return {
      date: date.toISOString().slice(0, 10),
      count,
    };
  });
}

function summarizeSentiment(dailyCounts, bias = { positive: 0.6, neutral: 0.25 }) {
  const total = dailyCounts.reduce((sum, d) => sum + d.count, 0);
  const positive = Math.round(total * bias.positive);
  const neutral = Math.round(total * bias.neutral);
  const negative = Math.max(0, total - positive - neutral);
  return { positive, neutral, negative };
}

const topics = [
  {
    id: "float-parade",
    name: "Float Parade",
    keywords: [
      "grand float",
      "Burnham Park",
      "panagbenga floats",
      "flower blooms",
      "parade route",
    ],
    multiplier: 1.4,
    sentimentBias: { positive: 0.7, neutral: 0.2 },
    growthRate: 18.5,
  },
  {
    id: "street-dancing",
    name: "Street Dancing",
    keywords: [
      "session road dance",
      "costumes",
      "street performers",
      "festival beat",
      "cheerdance",
    ],
    multiplier: 1.3,
    sentimentBias: { positive: 0.68, neutral: 0.22 },
    growthRate: 15.2,
  },
  {
    id: "flower-vendors",
    name: "Flower Vendors",
    keywords: [
      "flower stalls",
      "Irisan farmers",
      "local blooms",
      "Burnham vendors",
      "bouquets",
    ],
    multiplier: 1.0,
    sentimentBias: { positive: 0.62, neutral: 0.26 },
    growthRate: 9.3,
  },
  {
    id: "festival-food",
    name: "Festival Food",
    keywords: [
      "Baguio street food",
      "ukay food stalls",
      "strawberry taho",
      "Good Taste",
      "night market eats",
    ],
    multiplier: 1.15,
    sentimentBias: { positive: 0.66, neutral: 0.24 },
    growthRate: 12.7,
  },
  {
    id: "traffic-crowds",
    name: "Traffic & Crowds",
    keywords: [
      "Session Road traffic",
      "parking Baguio",
      "crowded Burnham",
      "jeepney lines",
      "tourist rush",
    ],
    multiplier: 1.1,
    sentimentBias: { positive: 0.35, neutral: 0.35 },
    growthRate: 21.4,
  },
  {
    id: "hotel-tourism",
    name: "Hotel & Tourism",
    keywords: [
      "hotel booking",
      "transient Baguio",
      "camp john hay stay",
      "Airbnb Baguio",
      "tour packages",
    ],
    multiplier: 1.05,
    sentimentBias: { positive: 0.58, neutral: 0.27 },
    growthRate: 11.1,
  },
].map((topic) => {
  const dailyCounts = generateTopicDailyCounts(topic.multiplier);
  const sentiment = summarizeSentiment(dailyCounts, topic.sentimentBias);
  return {
    id: topic.id,
    name: topic.name,
    keywords: topic.keywords,
    sentiment,
    dailyCounts,
    growthRate: topic.growthRate,
  };
});

const totalPosts = 4500;
const lastUpdated = new Date().toISOString();

// Topic modelling output (e.g. LDA/NMF): topics with term weights and metrics
const topicModelResults = [
  {
    id: "tm-parade-events",
    label: "Parade & float events",
    coherence: 0.52,
    docCount: 892,
    termWeights: [
      { term: "float", weight: 0.18 },
      { term: "parade", weight: 0.16 },
      { term: "Burnham", weight: 0.12 },
      { term: "grand", weight: 0.09 },
      { term: "route", weight: 0.08 },
      { term: "flowers", weight: 0.07 },
      { term: "blooms", weight: 0.06 },
    ],
  },
  {
    id: "tm-dancing-performance",
    label: "Street dancing & performance",
    coherence: 0.48,
    docCount: 734,
    termWeights: [
      { term: "dance", weight: 0.19 },
      { term: "Session Road", weight: 0.14 },
      { term: "costumes", weight: 0.11 },
      { term: "cheerdance", weight: 0.10 },
      { term: "performers", weight: 0.09 },
      { term: "festival", weight: 0.08 },
    ],
  },
  {
    id: "tm-food-vendors",
    label: "Food & local vendors",
    coherence: 0.51,
    docCount: 621,
    termWeights: [
      { term: "food", weight: 0.17 },
      { term: "strawberry", weight: 0.13 },
      { term: "taho", weight: 0.11 },
      { term: "street food", weight: 0.10 },
      { term: "vendors", weight: 0.09 },
      { term: "ukay", weight: 0.08 },
      { term: "Good Taste", weight: 0.07 },
    ],
  },
  {
    id: "tm-traffic-tourism",
    label: "Traffic, crowds & tourism",
    coherence: 0.44,
    docCount: 558,
    termWeights: [
      { term: "traffic", weight: 0.20 },
      { term: "crowded", weight: 0.14 },
      { term: "parking", weight: 0.12 },
      { term: "tourists", weight: 0.11 },
      { term: "hotel", weight: 0.09 },
      { term: "Baguio", weight: 0.08 },
    ],
  },
  {
    id: "tm-flowers-nature",
    label: "Flowers & nature",
    coherence: 0.56,
    docCount: 445,
    termWeights: [
      { term: "flowers", weight: 0.22 },
      { term: "Irisan", weight: 0.14 },
      { term: "blooms", weight: 0.12 },
      { term: "stalls", weight: 0.09 },
      { term: "bouquets", weight: 0.08 },
      { term: "local", weight: 0.07 },
    ],
  },
  {
    id: "tm-accommodation",
    label: "Accommodation & stay",
    coherence: 0.47,
    docCount: 312,
    termWeights: [
      { term: "hotel", weight: 0.21 },
      { term: "transient", weight: 0.16 },
      { term: "Camp John Hay", weight: 0.12 },
      { term: "Airbnb", weight: 0.11 },
      { term: "booking", weight: 0.09 },
    ],
  },
];

export { dailySentiment, topics, totalPosts, lastUpdated, topicModelResults };
