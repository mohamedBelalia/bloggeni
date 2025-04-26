"use client";

import { motion } from 'framer-motion';
import { ProfileActions } from './ProfileActions';

export default function AuthenticatedSection({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ProfileActions email={email} />
    </motion.div>
  );
} 