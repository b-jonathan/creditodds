import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCard, getCardGraphs, getAllCards, GraphData } from "@/lib/api";
import CardClient from "./CardClient";

// Force dynamic rendering to ensure fresh graph data on each request
export const dynamic = 'force-dynamic';

interface CardPageProps {
  params: Promise<{ name: string }>;
}

// Generate static pages for all cards at build time
export async function generateStaticParams() {
  try {
    const cards = await getAllCards();
    return cards.map((card) => ({
      name: card.card_name,
    }));
  } catch {
    return [];
  }
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  try {
    const { name } = await params;
    const cardName = decodeURIComponent(name);
    const card = await getCard(cardName);

    const description = card.approved_median_credit_score
      ? `Credit card approval odds for ${card.card_name}. Median approved credit score: ${card.approved_median_credit_score}, income: $${card.approved_median_income?.toLocaleString()}`
      : `See approval odds and data points for the ${card.card_name} from ${card.bank}.`;

    return {
      title: card.card_name,
      description,
      openGraph: {
        title: `${card.card_name} | CreditOdds`,
        description: `See approval odds for ${card.card_name}${card.approved_median_credit_score ? `. Average approved credit score: ${card.approved_median_credit_score}` : ''}`,
        siteName: 'CreditOdds',
        type: 'website',
        url: `https://creditodds.com/card/${encodeURIComponent(card.card_name)}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${card.card_name} | CreditOdds`,
        description: `See approval odds for ${card.card_name}`,
      },
      alternates: {
        canonical: `https://creditodds.com/card/${encodeURIComponent(card.card_name)}`,
      },
    };
  } catch {
    return { title: 'Card Not Found' };
  }
}

export default async function CardPage({ params }: CardPageProps) {
  const { name } = await params;
  const cardName = decodeURIComponent(name);

  try {
    // Fetch card and graph data in parallel for faster loading
    const [card, graphData] = await Promise.all([
      getCard(cardName),
      getCardGraphs(cardName).catch(() => [] as GraphData[]), // Empty array for new cards with no data
    ]);

    return <CardClient card={card} graphData={graphData} />;
  } catch {
    notFound();
  }
}
