import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { askFaq } from '@/lib/api';
import { useEffect, useState } from 'react';

type AskProps = {
  query: string;
};

const Ask = ({ query }: AskProps) => {
  const [askResult, setAskResult] = useState<any>(null);

  useEffect(() => {
    handleAsk(query);
  }, [query]);

  const handleAsk = async (query: string) => {
    const result = await askFaq(query);
    console.log('askResult', result);
    setAskResult(result);
  };
  return (
    <div className='p-4'>
      {askResult && askResult.message && (
        <div className='text-center p-4'>{askResult.message}</div>
      )}

      {askResult && askResult.ambiguous && (
        <div className='mb-4'>
          Your query is ambiguous. There are multiple tags.
        </div>
      )}

      {askResult &&
        askResult.faqs &&
        askResult.faqs.length > 0 &&
        askResult.faqs.map((item: any) => (
          <div
            className='border p-4 rounded-lg'
            key={item.id}
            style={{ marginBottom: '20px' }}
          >
            <h2 className='font-bold'>Question:</h2>
            <p>{item.question}</p>
            <h2 className='font-bold'>Answer:</h2>
            <p>{item.answer}</p>
            <h3 className='font-bold'>Score: {item.score.toFixed(2)}</h3>
          </div>
        ))}
    </div>
  );
};

export default Ask;
