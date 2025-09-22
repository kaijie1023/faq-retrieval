export class CreateFaqDto {
  question: string;
  answer: string;
  tags?: string[];
  lang?: string;
}
