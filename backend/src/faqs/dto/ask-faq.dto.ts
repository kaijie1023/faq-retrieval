import { Faq } from '../faqs.entity';

export type FaqWithScore = Faq & { score: number };

export class AskFaqDto {
  faqs?: FaqWithScore[];
  ambiguous?: boolean;
  message?: string;

  constructor(partial: Partial<AskFaqDto>) {
    Object.assign(this, partial);
  }
}
