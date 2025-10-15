import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Picker from "emoji-picker-react";

const EmojiPickerPopup = ({ selectedEmoji, onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-3xl border p-2 rounded-full bg-white shadow"
      >
        {selectedEmoji || "😀"}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 left-0 z-50 shadow-lg"
          >
            <Picker
              onEmojiClick={(emojiData) => {
                onEmojiSelect(emojiData.emoji);
                setIsOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiPickerPopup;
