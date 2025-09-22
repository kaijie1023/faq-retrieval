'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  askFaq,
} from '../../lib/api';
import { Modal } from '../../components/Modal';
import { Button } from '@/components/Button';
import AskResult from './AskResult';
import { Input } from '@/components/Input';
import FaqList from './FaqList';
import { FaqForm } from './FaqForm';
import { Faq } from './types/Faq.type';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  tags: string[];
}
const DashboardPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [askText, setAskText] = useState('');

  const [showAskModal, setShowAskModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const router = useRouter();

  // TODO: Replace with proper authentication
  useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      router.push('/');
    }
    fetchFaqs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/');
  };

  const fetchFaqs = async () => {
    const data = await getFaqs();
    setFaqs(data);
  };

  const handleAdd = async (faq: Faq) => {
    setShowAddModal(false);

    const { question, answer, tags } = faq;

    await createFaq({
      question,
      answer,
      tags,
    });

    fetchFaqs();
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold mb-4'>FAQ Admin Dashboard</h1>
        <div className='w-fit'>
          <Button onClick={handleLogout} label='Logout' />
        </div>
      </div>

      <div className='w-fit mb-4'>
        <Button onClick={() => setShowAddModal(true)} label='Add FAQ' />
      </div>

      <div className='border p-4 rounded-md'>
        <div className='mb-4 p-4 border rounded-md'>
          <h2 className='text-xl font-bold mb-2'>Ask Test</h2>
          <Input value={askText} onChange={(e) => setAskText(e)} />
          <div className='w-fit'>
            <Button onClick={() => setShowAskModal(true)} label='Ask' />
          </div>
        </div>

        <FaqList faqs={faqs} refetchFaqs={fetchFaqs} />
      </div>

      {showAskModal && (
        <Modal onClose={() => setShowAskModal(false)}>
          <AskResult query={askText} />
        </Modal>
      )}

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <FaqForm action='Add' onSubmit={handleAdd} />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
