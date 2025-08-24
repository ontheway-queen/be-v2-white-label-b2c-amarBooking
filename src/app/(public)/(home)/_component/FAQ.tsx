// 'use client';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { fadeIn } from '@/lib/varients/varients';

// interface Category {
//   id: string;
//   name: string;
// }

// interface FaqItem {
//   question: string;
//   answer: string;
// }

// const categories: Category[] = [
//   { id: 'general', name: 'General Questions' },
//   { id: 'booking', name: 'Booking Related' },
//   { id: 'payment', name: 'Payment Information' },
//   { id: 'support', name: 'Customer Support' },
// ];

// const faqData: Record<string, FaqItem[]> = {
//   general: [
//     {
//       question: 'Is it accessible?',
//       answer:
//         'Yes, our website adheres to the WAI-ARIA design pattern, ensuring that all users, including those with disabilities, can navigate and utilize our services with ease.',
//     },
//     {
//       question: 'Is it styled?',
//       answer:
//         'Absolutely! Our platform comes with default styles that complement the overall aesthetic, providing a cohesive and visually pleasing user experience.',
//     },
//     {
//       question: 'Is it animated?',
//       answer:
//         'Yes, our components include smooth animations by default to enhance user interaction. However, you can easily disable these animations in the settings if you prefer a static interface.',
//     },
//     {
//       question: 'How do I submit feedback?',
//       answer:
//         "You can submit feedback through the 'Contact Us' form on our website or send us an email directly.",
//     },
//     {
//       question: 'Can I access the site in multiple languages?',
//       answer:
//         'Yes, our website supports multiple languages. You can switch the language from the footer.',
//     },
//     {
//       question: 'How do I delete my account?',
//       answer: 'If you wish to delete your account, please contact our support team for assistance.',
//     },
//   ],
//   booking: [
//     {
//       question: 'How do I reset my password?',
//       answer:
//         'You can reset your password by clicking the "Forgot Password?" link on the login page. Follow the instructions in the email you receive to create a new password.',
//     },
//     {
//       question: 'Can I change my booking?',
//       answer:
//         'Yes, you can change your booking. Simply log into your account, go to your bookings, and follow the instructions to modify your flight details.',
//     },
//     {
//       question: 'What should I do if my flight is canceled?',
//       answer:
//         'In the event of a flight cancellation, you will receive an email notification. You can either rebook your flight through your account or contact our customer support for assistance.',
//     },
//     {
//       question: 'How far in advance can I book a flight?',
//       answer:
//         "You can book a flight up to one year in advance, depending on the airline's policies.",
//     },
//     {
//       question: 'Can I book a flight for someone else?',
//       answer:
//         'Yes, you can book a flight for another person. Just provide their details during the booking process.',
//     },
//     {
//       question: 'What should I do if I forgot to add baggage?',
//       answer:
//         'If you forgot to add baggage, you can usually do so through your account or by contacting customer support before your flight.',
//     },
//   ],
//   payment: [
//     {
//       question: 'What payment methods are accepted?',
//       answer:
//         'We accept a variety of payment methods, including credit cards, debit cards, and PayPal, ensuring that you have flexible options to complete your transactions.',
//     },
//     {
//       question: 'Are there any hidden fees?',
//       answer:
//         "We believe in transparency. All fees will be clearly outlined during the booking process, so you know exactly what you're paying for.",
//     },
//     {
//       question: 'Can I pay in installments?',
//       answer:
//         'Yes, we offer payment plans that allow you to pay for your flight in installments. Check during the checkout process for available options.',
//     },
//     {
//       question: 'What should I do if my payment is declined?',
//       answer:
//         'If your payment is declined, please check with your bank for possible issues, or try using a different payment method.',
//     },
//     {
//       question: 'Is my payment information secure?',
//       answer: 'Yes, we use SSL encryption to protect your payment information during transactions.',
//     },
//     {
//       question: 'Can I request a refund?',
//       answer:
//         "Refund policies vary by airline. Please refer to the specific airline's policy or contact our support for more details.",
//     },
//   ],
//   support: [
//     {
//       question: 'Is there a loyalty program?',
//       answer:
//         'Yes, we offer a loyalty program where you can earn points for every booking, which can be redeemed for discounts on future flights or exclusive offers.',
//     },
//     {
//       question: 'How do I contact customer support?',
//       answer:
//         "You can reach our customer support team via live chat, email, or phone. Visit the 'Contact Us' section on our website for more details.",
//     },
//     {
//       question: 'What are your support hours?',
//       answer:
//         'Our customer support team is available 24/7 to assist you with any inquiries or issues.',
//     },
//     {
//       question: 'How do I report a problem with my booking?',
//       answer:
//         'If you encounter any issues with your booking, please contact our support team immediately for assistance.',
//     },
//     {
//       question: 'Can I chat with a representative?',
//       answer: 'Yes, we offer live chat support on our website for immediate assistance.',
//     },
//     {
//       question: 'Where can I find user guides or tutorials?',
//       answer:
//         "User guides and tutorials are available in the 'Help Center' section of our website.",
//     },
//   ],
// };

// export function Faq() {
//   const [activeCategory, setActiveCategory] = useState<string>('general');

//   return (
//     <section className='container py-16 md:py-24 overflow-hidden'>
//       <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
//         {/* Title */}
//         <div className='col-span-full text-center mb-8'>
//           <motion.h2
//             variants={fadeIn('up', 0.2)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: true, amount: 0.2 }}
//             className='text-3xl font-bold text-neutral-800 text-center'
//           >
//             Frequently Asked Questions
//           </motion.h2>
//           <motion.p
//             variants={fadeIn('up', 0.3)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: true, amount: 0.2 }}
//             className='mt-4 max-w-3xl mx-auto text-neutral-600 text-center'
//           >
//             Browse common queries organized by category for quicker answers.
//           </motion.p>
//         </div>

//         {/* Sidebar Table of Contents */}
//         <motion.aside
//           variants={fadeIn('right', 0.4)}
//           initial='hidden'
//           whileInView={'show'}
//           viewport={{ once: true, amount: 0.2 }}
//           className='col-span-full md:col-span-1 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm sticky top-28 self-start'
//         >
//           <h3 className='text-lg font-semibold mb-5 text-gray-800'>Browse Topics</h3>
//           <ul className='space-y-3'>
//             {categories.map((category) => (
//               <li key={category.id}>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 border ${
//                     activeCategory === category.id
//                       ? 'bg-primary text-white border-primary shadow'
//                       : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
//                   }`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   {category.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </motion.aside>

//         {/* FAQ Accordion */}
//         <motion.section
//           variants={fadeIn('left', 0.4)}
//           initial='hidden'
//           whileInView={'show'}
//           viewport={{ once: true, amount: 0.2 }}
//           className='col-span-full md:col-span-2 lg:col-span-3'
//         >
//           <Accordion type='single' collapsible className='space-y-5'>
//             {faqData[activeCategory].map((item, index) => (
//               <AccordionItem
//                 value={`item-${index}`}
//                 key={index}
//                 className='border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300'
//               >
//                 <AccordionTrigger
//                   className='px-5 py-4 rounded-t-xl transition-all duration-300
//              text-lg font-medium text-gray-800 rounded-b-none
//              data-[state=open]:bg-primary data-[state=open]:text-white '
//                 >
//                   <span className='block w-full text-left transition-all duration-300 data-[state=open]:text-white decoration-none'>
//                     {item.question}
//                   </span>
//                 </AccordionTrigger>

//                 <AccordionContent className='text-gray-600 text-base px-5 pb-5 leading-relaxed'>
//                   {item.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </motion.section>
//       </div>
//     </section>
//   );
// }
import React from 'react';

type Props = {};

export const Faq = (props: Props) => {
  return <div></div>;
};
