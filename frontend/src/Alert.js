import React, { useEffect } from 'react';
import { motion } from "framer-motion";

export default function Alert({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Call the onClose function to dismiss the alert
      }, 1000); // Auto-dismiss after 1 second

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts or message changes
    }
  }, [message, onClose]); // Re-run the effect whenever `message` or `onClose` changes

  return (
    <div>
      <motion.div
        className={`alert-container py-5 px-20 z-50 top-0 right-0 fixed border bg-white`}
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <div className={`alert ${type} mb-8`}>{message}</div>
      </motion.div>
    </div>
  );
}
