import { WeeklyEdition } from '../types/news';

export const CURRENT_WEEKLY_EDITION: WeeklyEdition = {
  id: 'vol-3-issue-42',
  volume: 3,
  issue: 42,
  dateRange: '१ ते ७ ऑक्टोबर २०२६',
  fullDateLabel: 'वर्ष ३ | अंक ४२ | गुरुवार, १ ते ७ ऑक्टोबर २०२६',
  editorInChief: 'Shubham Sonale',
  rniRegistration: 'INTEL/2026/88921',
  establishedYear: 2024,
  headlineQuote: 'Samvad Intel: Multilingual Information Intelligence & Verification Engine',
};

export const EDITORIAL_TEAM = {
  editorInChief: {
    name: 'Shubham Sonale',
    role: 'Platform Creator & System Architect',
    experience: 'Information Intelligence, Edge Distributed Architecture & Cross-Lingual Research',
  },
  residentEditors: [
    {
      name: 'संजय कुलकर्णी',
      role: 'विशेष राजकीय प्रतिनिधी व मंत्रालय ब्युरो',
      location: 'मुंबई',
    },
    {
      name: 'आनंद जोशी',
      role: 'निवासी संपादक (पश्चिम महाराष्ट्र)',
      location: 'पुणे',
    },
    {
      name: 'डॉ. अनिता देशपांडे',
      role: 'स्तंभलेखक (विज्ञान व कृषी तंत्रज्ञान)',
      location: 'पुणे/नाशिक',
    },
    {
      name: 'विकास कदम',
      role: 'शिक्षण व रोजगार वार्ताहर',
      location: 'छत्रपती संभाजीनगर',
    },
  ],
  headOffice: {
    name: 'Samvad Intel Research Hub',
    address: '५४०, सदाशिव पेठ, कुमठेकर मार्ग, पुणे - ४११०३०',
    phone: '+९१ २० २३४५ ६७८९ / ९८७६५ ४३२१०',
    email: 'editor@bahumolsamaj.com',
  },
};
