import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { Faq } from './types/Faq.type';

type FaqFormProps = {
  action: 'Add' | 'Update';
  faq?: Faq;
  onSubmit: (faq: Faq) => void;
};

export const FaqForm = ({ action, faq, onSubmit }: FaqFormProps) => {
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [tags, setTags] = useState(faq?.tags.join(', ') ?? '');

  const handleSubmit = () => {
    onSubmit({
      id: faq?.id ?? undefined,
      question: question,
      answer: answer,
      tags: tags.split(',').map((tag) => tag.trim()),
    });
  };

  return (
    <div className='flex flex-col gap-4 px-6 pb-6'>
      <h2 className='text-lg'>{action} FAQ</h2>
      <Input
        label='Question'
        value={question}
        onChange={(e) => setQuestion(e)}
      />
      <Input label='Answer' value={answer} onChange={(e) => setAnswer(e)} />
      <Input label='Tags (comma separated)' value={tags} onChange={setTags} />
      <Button label={action} onClick={() => handleSubmit()} />
    </div>
  );
};
