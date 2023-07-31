import { Yeseva_One, Josefin_Sans } from 'next/font/google';

export const serif = Yeseva_One({ 
  display: 'swap',
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400'],
});

export const sans = Josefin_Sans({ 
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});