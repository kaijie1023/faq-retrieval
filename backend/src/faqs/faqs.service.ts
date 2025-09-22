import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faqs.entity';
import { checkAmbiguity, rankFaqs } from './scoring.util';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AskFaqDto } from './dto/ask-faq.dto';

@Injectable()
export class FaqsService {
  constructor(@InjectRepository(Faq) private repo: Repository<Faq>) {}

  create(dto: CreateFaqDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateFaqDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async ask(query: string, lang = 'en') {
    const faqs = await this.repo.find({ where: { lang } });

    const faqsWithScores = rankFaqs(query, faqs);

    const ambiguity = checkAmbiguity(faqsWithScores);

    return new AskFaqDto({
      faqs: faqsWithScores.length > 0 ? faqsWithScores : undefined,
      ambiguous: ambiguity || undefined,
      message:
        faqsWithScores.length > 0
          ? undefined
          : 'Not sure, please contact staff.',
    });
  }
}
