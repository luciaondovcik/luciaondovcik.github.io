window.onload = function() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  const finalMessage = "BUDE SVADBA,28.6.2025,KAMENEC POD VTÁČNIKOM"; // Your final message
  const fontSize = 14;
  const lineGap = fontSize * 2;
  const columns = Math.floor(canvas.width / fontSize);
  const messageLines = finalMessage.split(',');

  const revealDelay = 200; 
  let revealedLettersCount = 0;
  let lastRevealTime = 0;

  // total height of the message with added gaps
  const totalMessageHeight = (messageLines.length - 1) * lineGap + messageLines.length * fontSize;
  const startY = Math.floor((canvas.height - totalMessageHeight) / 2); // Center the message vertically

  // Function to reveal the final message progressively
  function drawFinalMessage(currentTime) {
      // Clear the canvas for each frame
      ctx.fillStyle = "#000"; // Black background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reveal letters one by one based on the time
      if (revealedLettersCount < finalMessage.length) {
          if (currentTime - lastRevealTime >= revealDelay) {
              revealedLettersCount++;
              lastRevealTime = currentTime;
          }
      }

      // Draw the revealed part of the final message
      ctx.fillStyle = "#FFF"; 
      ctx.font = `bold ${fontSize}px monospace`;

      let totalRevealedLetters = 0;

      // Loop through each line of the message
      for (let lineIndex = 0; lineIndex < messageLines.length; lineIndex++) {
          const line = messageLines[lineIndex];
          const lineLength = line.length;

          // Calculate the starting column for centering the current line
          const messageStartCol = Math.floor((columns - lineLength) / 2);
          const y = startY + (lineIndex * (fontSize + lineGap)); // Correct vertical spacing

          // Reveal letters progressively for the current line
          for (let i = 0; i < Math.min(revealedLettersCount - totalRevealedLetters, lineLength); i++) {
              const x = (messageStartCol + i) * fontSize;
              ctx.fillText(line[i], x, y);
          }

          // Update the total number of revealed letters across all lines
          totalRevealedLetters += lineLength;
      }
  }

  // Animation loop
  function animate(currentTime) {
      drawFinalMessage(currentTime);
      requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
};