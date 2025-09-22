import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Faq } from '../faqs/faqs.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const faqsRepo = dataSource.getRepository(Faq);

  const faqs = [
    {
      question: 'What are your opening hours?',
      answer: 'We are open Monday to Friday, 9am to 5pm.',
      tags: ['hours']
    },
    {
      question: 'How do I book an appointment and can I reschedule?',
      answer: 'You can book via our online portal or phone. To reschedule, log into your account or call us.',
      tags: ['booking']
    },
    {
      question: 'Where is the clinic and is there parking?',
      answer: 'We are at 123 Health St. Street parking available; a paid car park is 200m away.',
      tags: ['location']
    },
    {
      question: 'Do you provide vaccinations and which ones?',
      answer: 'We provide influenza, tetanus and routine childhood vaccinations. Please check availability.',
      tags: ['services', 'vaccination']
    },
    {
      question: 'How do I pay my bill?',
      answer: 'We accept credit card, debit card and online bank transfer. For questions contact billing.',
      tags: ['billing']
    },
    {
      question: 'When can I contact you on WhatsApp?',
      answer: 'WhatsApp support is available Mon-Fri 9am-6pm.',
      tags: ['support']
    }
  ];

  // Seed FAQs
  for (const faqData of faqs) {
    const faq = faqsRepo.create(faqData);
    await faqsRepo.save(faq);
  }

  await app.close();
}

bootstrap();
