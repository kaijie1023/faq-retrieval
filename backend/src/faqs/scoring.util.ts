import { AskFaqDto, FaqWithScore } from './dto/ask-faq.dto';
import { Faq } from './faqs.entity';

const STOPWORDS = new Set([
  'the',
  'a',
  'an',
  'of',
  'to',
  'in',
  'on',
  'for',
  'and',
  'is',
  'are',
  'with',
  'my',
  'i',
  'it',
  'at',
  'by',
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\W_]+/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t && !STOPWORDS.has(t));
}

function scoreFaq(queryTokens: string[], faq: Faq): number {
  const questionTokens = tokenize(faq.question);
  const answerTokens = tokenize(faq.answer);

  const querySet = new Set(queryTokens);
  const questionSet = new Set(questionTokens);
  const answerSet = new Set(answerTokens);

  const questionOverlap =
    queryTokens.filter((token) => questionSet.has(token)).length /
    questionTokens.length;
  const answerOverlap =
    queryTokens.filter((token) => answerSet.has(token)).length /
    answerTokens.length;

  let tag_boost = 0;
  for (const tag of faq.tags) {
    if (!tag) {
      break;
    }
    const t = tag.toLowerCase();
    if (querySet.has(t)) {
      tag_boost = 0.2;
      break;
    }
  }

  const score = 0.65 * questionOverlap + 0.15 * answerOverlap + tag_boost;
  return Math.min(1, score);
}

export function rankFaqs(query: string, faqs: Faq[]) {
  const queryTokens = tokenize(query);

  const scoredRanks = faqs
    .map((faq) => ({
      ...faq,
      score: scoreFaq(queryTokens, faq),
    }))
    .filter((item) => item.score > 0);

  const sorted = scoredRanks.sort((a, b) => b.score - a.score);
  const topFaqs = sorted.slice(0, 3);
  const threshold = 0.35;

  return topFaqs.filter((item) => item.score >= threshold);
}

export function checkAmbiguity(faqs: FaqWithScore[]): boolean {
  if (faqs.length < 2) {
    return false;
  }

  const firstFaqTags = new Set(faqs[0].tags.map((tag) => tag.toLowerCase()));

  for (const faq of faqs.slice(1)) {
    const currentFaqTags = new Set(faq.tags.map((tag) => tag.toLowerCase()));

    const noOverlap = Array.from(firstFaqTags).some(
      (tag) => !currentFaqTags.has(tag),
    );

    if (noOverlap) {
      return true;
    }
  }

  return false;
}
