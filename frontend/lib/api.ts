export interface FAQInput {
  question: string;
  answer: string;
  tags: string[];
}

const BASE = 'http://localhost:3001/faqs';

export async function getFaqs() {
  const res = await fetch(BASE);
  return res.json();
}

export async function createFaq(faq: FAQInput) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faq),
  });
  return res.json();
}

export async function updateFaq(id: number, faq: FAQInput) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(faq),
  });
  return res.json();
}

export async function deleteFaq(id: number) {
  await fetch(`${BASE}/${id}`, { method: 'DELETE' });
}

export async function askFaq(text: string) {
  const res = await fetch(`${BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
