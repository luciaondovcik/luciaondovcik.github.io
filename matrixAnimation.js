window.onload = function() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  
  // Set the canvas size to full-screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const finalMessage = "BUDE SVADBA,28.6.2025,KAMENEC POD VTÁČNIKOM";
  const fontSize = 14;
  const lineGap = fontSize * 2; // Additional gap between lines
  const columns = Math.floor(canvas.width / fontSize); // how many columns fit the screen
  const drops = Array(columns).fill(1);
  
  const messageLines = finalMessage.split(',');
  const revealDelay = 200; // Delay for each letter reveal
  const initialDelay = 5000; // Initial delay before revealing the final message (in milliseconds)
  let revealedLettersCount = 0;
  let lastRevealTime = 0;
  let revealStarted = false; // Flag to track if the reveal has started
  
  const totalMessageHeight = (messageLines.length - 1) * lineGap + messageLines.length * fontSize;
  const startY = Math.floor((canvas.height - totalMessageHeight) / 2); // Centering
  
  function drawMatrix(currentTime) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = `${fontSize}px monospace`;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;

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
    
    // Start revealing the message after the initial delay
    if (currentTime >= initialDelay) {
      if (!revealStarted) {
        revealStarted = true; // Mark that reveal has started
      }
      
      if (revealedLettersCount < finalMessage.length) {
        if (currentTime - lastRevealTime >= revealDelay) {
          revealedLettersCount++;
          lastRevealTime = currentTime;
        }
      }
    }
    
    drawFinalMessage();
  }
  
  function drawFinalMessage() {
    ctx.fillStyle = "#FFF";
    ctx.font = `bold ${fontSize}px monospace`;
    
    let totalRevealedLetters = 0;
    
    for (let lineIndex = 0; lineIndex < messageLines.length; lineIndex++) {
      const line = messageLines[lineIndex];
      const lineLength = line.length;
      
      const messageStartCol = Math.floor((columns - lineLength) / 2); // Calculate the starting column for centering the current line
      const y = startY + (lineIndex * (fontSize + lineGap)); // Correct vertical spacing
      
      for (let i = 0; i < Math.min(revealedLettersCount - totalRevealedLetters, lineLength); i++) {
        const x = (messageStartCol + i) * fontSize;
        ctx.fillText(line[i], x, y);
      }
      
      totalRevealedLetters += lineLength;
    }
  }
  
  function animate(currentTime) {
    drawMatrix(currentTime);
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
};
