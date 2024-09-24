window.onload = function() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const finalMessage = "BUDE SVADBA,28.6.2025,KAMENEC POD VTÁČNIKOM";
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);  // how many columns fit the screen
  const ypos = Array(columns).fill(0);                  // Initial vertical positions

  const revealDelay = 200;                              // Delay for letter reveal
  const initialDelay = 6000; 
  let revealedLettersCount = 0;
  let lastRevealTime = 0;
  let revealStarted = false; // Flag

  const totalMessageHeight = (finalMessage.split(',').length - 1) * (fontSize * 2) + finalMessage.split(',').length * fontSize;
  const startY = Math.floor((canvas.height - totalMessageHeight) / 2);

  function matrix() {
    ctx.fillStyle = '#0001'; // Slow fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = '#03A062';
    ctx.font = `${fontSize}px monospace`;

    const minCharCode = 32; // Space character
    const maxCharCode = 126; // Tilde character (~)
  
    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.floor(Math.random() * (maxCharCode - minCharCode + 1)) + minCharCode);

      const x = ind * fontSize;
      ctx.fillText(text, x, y);
      if (y > canvas.height + Math.random() * 10000) {
        ypos[ind] = 0; // Reset position to top
      } else {
        ypos[ind] = y + fontSize; // Move down
      }
    });

    // Start revealing the message after the initial delay
    if (performance.now() >= initialDelay) {
      if (!revealStarted) {
        revealStarted = true; // Mark that reveal has started
      }
      
      if (revealedLettersCount < finalMessage.length) {
        if (performance.now() - lastRevealTime >= revealDelay) {
          revealedLettersCount++;
          lastRevealTime = performance.now();
        }
      }
    }
    
    drawFinalMessage();
  }
  
  function drawFinalMessage() {
    ctx.fillStyle = "#FFF";
    ctx.font = `bold ${fontSize}px monospace`;
    
    const messageLines = finalMessage.split(',');
    let totalRevealedLetters = 0;
    
    for (let lineIndex = 0; lineIndex < messageLines.length; lineIndex++) {
      const line = messageLines[lineIndex];
      const lineLength = line.length;
      
      const messageStartCol = Math.floor((columns - lineLength) / 2); // Calculate the starting column for centering the current line
      const y = startY + (lineIndex * (fontSize * 2)); // Correct vertical spacing
      
      for (let i = 0; i < Math.min(revealedLettersCount - totalRevealedLetters, lineLength); i++) {
        const x = (messageStartCol + i) * fontSize;
        ctx.fillText(line[i], x, y);
      }
      
      totalRevealedLetters += lineLength;
    }
  }
  
  setInterval(matrix, 40);
};
