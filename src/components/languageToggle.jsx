import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-mono text-neutral-400 hover:text-white hover:border-white/20 transition-colors duration-300"
    >
      <span className={language === 'en' ? 'text-white' : 'text-neutral-500'}>ENG</span>
      <span className="text-neutral-600">/</span>
      <span className={language === 'ja' ? 'text-white' : 'text-neutral-500'}>日本語</span>
    </motion.button>
  );
}