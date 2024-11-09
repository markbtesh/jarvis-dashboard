import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, maxLength = 80, styles }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lineStartIndex, setLineStartIndex] = useState(0);

  // Reset currentText and currentIndex when the new text is received
  useEffect(() => {
    setCurrentText("");
    setCurrentIndex(0);
    setLineStartIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextChar = text[currentIndex];
        const nextText = currentText + nextChar;

        // Check if adding the next character would cause word splitting
        if (nextText.length - lineStartIndex > maxLength && nextChar === " ") {
          // Move to a new line if max length exceeded after a word
     
          setCurrentText("");
        } else {
          setCurrentText((prevText) => prevText + nextChar);
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, currentText, lineStartIndex, maxLength]);

  return (
    <div className={styles}> {/* Ensures line breaks are rendered */}
      {currentText}
    </div>
  );
};

export default Typewriter;
