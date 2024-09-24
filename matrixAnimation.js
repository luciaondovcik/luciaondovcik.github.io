window.onload = function() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas size to full-screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const finalMessage = "!BUDE SVADBA!\n28.6.2025\nKAMENEC POD VTÁČNIKOM"; // Your final message
  const fontSize = 14;
  const lineGap = fontSize * 2; // Additional gap between lines (set to twice the font size for empty rows)
  const columns = Math.floor(canvas.width / fontSize); // Calculate how many columns fit across the screen
  const drops = Array(columns).fill(1); // One drop per column

  // Split the message into lines based on the newline character
  const messageLines = finalMessage.split('\n');

  const revealDelay = 300; // Slower delay between revealing each letter (300 ms = 0.3 sec)
  let revealedLettersCount = 0; // Number of letters revealed in the final message
  let lastRevealTime = 0; // Track the time of the last letter reveal

  // Calculate the total height of the message with added gaps
  const totalMessageHeight = (messageLines.length - 1) * lineGap + messageLines.length * fontSize;
  const startY = Math.floor((canvas.height - totalMessageHeight) / 2); // Center the message vertically

  // Function to handle the Matrix rain effect
  function drawMatrix(currentTime) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Black background with slight opacity for rain trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Green letters for the rain
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Rain characters
      ctx.fillText(randomLetter, x, y);

      // Send the drop back to the top after reaching the bottom, creating a loop
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    // Reveal final message letter by letter, timed with the rain
    if (revealedLettersCount < finalMessage.length) {
      if (currentTime - lastRevealTime >= revealDelay) {
        revealedLettersCount++;
        lastRevealTime = currentTime;
      }
    }

    // Draw the revealed part of the final message
    drawFinalMessage();
  }

  // Function to draw the final message progressively
  function drawFinalMessage() {
    ctx.fillStyle = "#FFF"; // White bold text for final message
    ctx.font = `bold ${fontSize}px monospace`;

    // Track how many characters have been revealed so far
    let totalRevealedLetters = 0;

    // Loop through each line in the final message
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

  // Start drawing the rain effect and progressive message reveal
  function animate(currentTime) {
    drawMatrix(currentTime);
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
};
