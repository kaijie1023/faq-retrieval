import { rankFaqs, checkAmbiguity } from './scoring.util';
import { Faq } from './faqs.entity';
import { FaqWithScore } from './dto/ask-faq.dto';

describe('rankFaqs', () => {
  const mockFaqs: Faq[] = [
    {
      id: 1,
      question: 'What are your opening hours?',
      answer: 'We are open Monday to Friday, 9am to 5pm.',
      tags: ['hours', 'schedule'],
      lang: 'en',
    },
    {
      id: 2,
      question: 'How do I book an appointment?',
      answer: 'You can book via our online portal or phone.',
      tags: ['booking', 'appointment'],
      lang: 'en',
    },
    {
      id: 3,
      question: 'Where is the clinic?',
      answer: 'We are at 123 Health St.',
      tags: ['location', 'address'],
      lang: 'en',
    },
    {
      id: 4,
      question: 'Do you provide vaccinations?',
      answer: 'We provide influenza and routine vaccinations.',
      tags: ['services', 'vaccination'],
      lang: 'en',
    },
  ];

  it('should return empty array for query with no matches', () => {
    const result = rankFaqs('completely unrelated query xyz', mockFaqs);
    expect(result).toEqual([]);
  });

  it('should rank FAQs based on question relevance', () => {
    const result = rankFaqs('opening hours', mockFaqs);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].question).toBe('What are your opening hours?');
    expect(result[0].score).toBeGreaterThan(0.35);
  });

  it('should boost score when query matches tags', () => {
    const result = rankFaqs('booking appointment', mockFaqs);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].question).toBe('How do I book an appointment?');
    expect(result[0].score).toBeGreaterThan(0.35);
  });

  it('should return maximum 3 FAQs', () => {
    const manyFaqs = [
      ...mockFaqs,
      {
        id: 5,
        question: 'Test question 1',
        answer: 'Test answer 1',
        tags: ['test'],
        lang: 'en',
      },
      {
        id: 6,
        question: 'Test question 2',
        answer: 'Test answer 2',
        tags: ['test'],
        lang: 'en',
      },
      {
        id: 7,
        question: 'Test question 3',
        answer: 'Test answer 3',
        tags: ['test'],
        lang: 'en',
      },
      {
        id: 8,
        question: 'Test question 4',
        answer: 'Test answer 4',
        tags: ['test'],
        lang: 'en',
      },
    ];

    const result = rankFaqs('test', manyFaqs);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('should filter out results below threshold (0.35)', () => {
    const result = rankFaqs('very vague query', mockFaqs);

    // All returned results should have score >= 0.35
    result.forEach((faq) => {
      expect(faq.score).toBeGreaterThanOrEqual(0.35);
    });
  });

  it('should ignore stopwords in scoring', () => {
    const result1 = rankFaqs('opening hours', mockFaqs);
    const result2 = rankFaqs('the opening hours', mockFaqs);

    // Should get same top result regardless of stopwords
    expect(result1.length).toBeGreaterThan(0);
    expect(result2.length).toBeGreaterThan(0);
    expect(result1[0].question).toBe(result2[0].question);
  });

  it('should score partial matches in answers', () => {
    const result = rankFaqs('schedule opening hours', mockFaqs);

    expect(result.length).toBeGreaterThan(0);
    const bookingFaq = result.find((faq) => faq.question.includes('opening'));
    expect(bookingFaq).toBeDefined();
  });
});

describe('checkAmbiguity', () => {
  it('should return true when FAQs have different tag groups', () => {
    const faqs: FaqWithScore[] = [
      {
        id: 1,
        question: 'Test 1',
        answer: 'Answer 1',
        tags: ['hours', 'schedule'],
        lang: 'en',
        score: 0.8,
      },
      {
        id: 2,
        question: 'Test 2',
        answer: 'Answer 2',
        tags: ['booking', 'appointment'],
        lang: 'en',
        score: 0.7,
      },
    ];

    const result = checkAmbiguity(faqs);
    expect(result).toBe(true);
  });

  it('should return false when FAQs have same tag groups', () => {
    const faqs: FaqWithScore[] = [
      {
        id: 1,
        question: 'Test 1',
        answer: 'Answer 1',
        tags: ['hours', 'schedule'],
        lang: 'en',
        score: 0.8,
      },
      {
        id: 2,
        question: 'Test 2',
        answer: 'Answer 2',
        tags: ['hours', 'schedule'],
        lang: 'en',
        score: 0.7,
      },
    ];

    const result = checkAmbiguity(faqs);
    expect(result).toBe(false);
  });

  it('should handle empty FAQ list', () => {
    const result = checkAmbiguity([]);
    expect(result).toBe(false);
  });

  it('should handle single FAQ', () => {
    const faqs: FaqWithScore[] = [
      {
        id: 1,
        question: 'Test',
        answer: 'Answer',
        tags: ['test'],
        lang: 'en',
        score: 0.8,
      },
    ];

    const result = checkAmbiguity(faqs);
    expect(result).toBe(false);
  });
});
