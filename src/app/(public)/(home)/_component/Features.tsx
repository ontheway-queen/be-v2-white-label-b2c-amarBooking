'use client';
import { cn } from '@/lib/utils';
import {
  FaGlobe,
  FaTag,
  FaMousePointer,
  FaPhoneAlt,
  FaShieldAlt,
  FaExchangeAlt,
  FaClock,
  FaGift,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/varients/varients';

export function Features() {
  const features = [
    {
      title: 'Global Airline Access',
      description: 'Explore a vast network of international airlines to match your travel plans.',
      icon: <FaGlobe size={24} />,
      color: 'text-blue-600', // blue
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
    },
    {
      title: 'Lowest Fare Assurance',
      description: 'We guarantee unbeatable rates with our competitive pricing promise.',
      icon: <FaTag size={24} />,
      color: 'text-red-500',
      hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/30',
    },
    {
      title: 'Seamless Booking Experience',
      description: 'Our intuitive platform makes flight booking fast and stress-free.',
      icon: <FaMousePointer size={24} />,
      color: 'text-purple-500',
      hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/30',
    },
    {
      title: 'Always-On Support',
      description: 'Get help anytime with our dedicated 24/7 customer service team.',
      icon: <FaPhoneAlt size={24} />,
      color: 'text-green-500',
      hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/30',
    },
    {
      title: 'Protected Transactions',
      description: 'Your payments are safe with our secure and encrypted systems.',
      icon: <FaShieldAlt size={24} />,
      color: 'text-amber-500',
      hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-900/30',
    },
    {
      title: 'Hassle-Free Modifications',
      description: 'Change or cancel your trip effortlessly with flexible policies.',
      icon: <FaExchangeAlt size={24} />,
      color: 'text-cyan-500',
      hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/30',
    },
    {
      title: 'Live Travel Notifications',
      description: 'Stay on top of your journey with real-time alerts and updates.',
      icon: <FaClock size={24} />,
      color: 'text-orange-500',
      hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/30',
    },
    {
      title: 'Exclusive Loyalty Perks',
      description: 'Earn rewards and enjoy members-only privileges as you travel more.',
      icon: <FaGift size={24} />,
      color: 'text-pink-500',
      hoverBg: 'hover:bg-pink-50 dark:hover:bg-pink-900/30',
    },
  ];

  return (
    <div className='container px-4 md:px-6 py-10 md:py-20'>
      <div className='overflow-hidden'>
        <section className='relative'>
          {/* <Grid size={35} /> */}
          <div className='mb-10'>
            <motion.h2
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.1 }}
              className='text-3xl font-bold text-neutral-800 text-center'
            >
              Our Services at a Glance
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true, amount: 0.1 }}
              className='mt-4 max-w-3xl mx-auto text-neutral-600 text-center'
            >
              Discover a variety of features designed to enhance and simplify your travel journey.
            </motion.p>
          </div>

          <motion.div
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: true, amount: 0.1 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10'
          >
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  color,
  hoverBg,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: string;
  hoverBg: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col py-10 relative group/feature transition duration-300',
        'lg:border-r dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800',
        hoverBg,
      )}
    >
      <div className='transform-style preserve-3d transition-transform duration-500 group-hover/feature:rotate-y-6'>
        <div className={cn('mb-4 relative z-10 px-10', color)}>{icon}</div>
        <div className='text-lg font-bold mb-2 relative z-10 px-10'>
          <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-secondary transition-all duration-200 origin-center' />
          <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100'>
            {title}
          </span>
        </div>
        <p className='text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10'>
          {description}
        </p>
      </div>
    </div>
  );
};
