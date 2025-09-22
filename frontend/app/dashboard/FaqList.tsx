import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { deleteFaq, updateFaq } from '@/lib/api';
import { useState } from 'react';
import { Faq } from './types/Faq.type';
import { FaqForm } from './FaqForm';

type FaqListProps = {
  faqs: Faq[];
  refetchFaqs: () => void;
};

const tableHeaders = ['Question', 'Answer', 'Tags', 'Actions'];

const FaqList = ({ refetchFaqs, faqs }: FaqListProps) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  const handleUpdate = async (faq: Faq) => {
    await updateFaq(faq.id!, {
      question: faq.question,
      answer: faq.answer,
      tags: faq.tags,
    });

    refetchFaqs();
    setShowUpdateModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteFaq(id);
    refetchFaqs();
  };

  const handleEditClick = (faq: Faq) => {
    setSelectedFaq(faq);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedFaq(null);
  };

  return (
    <div className='overflow-x-auto'>
      <h2 className='text-2xl font-bold mb-2'>Faq List</h2>
      <table className='min-w-full border border-gray-300 w-full'>
        <thead className='bg-gray-100'>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className='border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 capitalize'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className='hover:bg-gray-50'>
              <td className='border border-gray-300 px-4 py-2 text-sm text-gray-800'>
                {faq.question}
              </td>
              <td className='border border-gray-300 px-4 py-2 text-sm text-gray-800'>
                {faq.answer}
              </td>
              <td className='border border-gray-300 px-4 py-2 text-sm text-gray-800'>
                {faq.tags.join(', ')}
              </td>
              <td className='border border-gray-300 px-4 py-2 text-sm text-gray-800'>
                <div className='flex gap-4'>
                  <Button label='Edit' onClick={() => handleEditClick(faq)} />
                  <Button
                    label='Delete'
                    onClick={() => handleDelete(faq.id!)}
                  />
                </div>

                {/* <button onClick={() => handleUpdate(faq)}>Edit</button>
                <button onClick={() => handleDelete(faq.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && selectedFaq && (
        <Modal
          onClose={handleCloseModal}
          children={
            <FaqForm
              action='Update'
              faq={selectedFaq}
              onSubmit={handleUpdate}
            />
          }
        />
      )}
    </div>
  );
};

export default FaqList;
