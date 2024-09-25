window.onload = function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 250;
  
    const finalMessage = "BUDE SVADBA,\n,\n,\n,28.6.2025,\n,KAMENEC POD VTÁČNIKOM,\n,\n,\n,Michal a Lucka"; // Your final message
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const messageLines = finalMessage.split(',');
  
    const revealDelay = 200; 
    let revealedLettersCount = 0;
    let lastRevealTime = 0;
    
    const blinkInterval = 500;
    let showCursor = true; // cursor visibility
    let lastBlinkTime = 0;
  
    // total height of the message
    const totalMessageHeight = messageLines.length * fontSize;
    const startY = Math.floor((canvas.height - totalMessageHeight) / 2); // Center the message vertically
  
    function drawFinalMessage(currentTime) {
        // Clear the canvas for each frame
        ctx.fillStyle = "#000"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        // Reveal letters one by one based on the time
        if (revealedLettersCount < finalMessage.length) {
            if (currentTime - lastRevealTime >= revealDelay) {
                revealedLettersCount++;
                lastRevealTime = currentTime;
            }
        }
  
        ctx.fillStyle = "#FFF"; 
        ctx.font = `bold ${fontSize}px monospace`;
  
        let totalRevealedLetters = 0;
        let lastLetterPosition = { x: 0, y: 0 }; // To track the position of the last letter
  
        for (let lineIndex = 0; lineIndex < messageLines.length; lineIndex++) {
            const line = messageLines[lineIndex];
            const lineLength = line.length;
  
            const messageStartCol = Math.floor((columns - lineLength) / 2);
            const y = startY + (lineIndex * fontSize); // Correct vertical spacing
  
            // Reveal letters progressively for the current line
            for (let i = 0; i < Math.min(revealedLettersCount - totalRevealedLetters, lineLength); i++) {
                const x = (messageStartCol + i) * fontSize;
                ctx.fillText(line[i], x, y);
  
                // Update last letter position
                lastLetterPosition.x = x + fontSize;
                lastLetterPosition.y = y;
            }
            totalRevealedLetters += lineLength;
        }
  
        // cursor at the last revealed letter position
        if (showCursor) {
            ctx.fillText("|", lastLetterPosition.x, lastLetterPosition.y);
        }
    }
  
    // Animation loop
    function animate(currentTime) {
        drawFinalMessage(currentTime);
        
        if (currentTime - lastBlinkTime >= blinkInterval) {
            showCursor = !showCursor; // Toggle cursor visibility
            lastBlinkTime = currentTime; // Reset the blink timer
        }
  
        requestAnimationFrame(animate);
    }
  
    // Start the animation loop
    requestAnimationFrame(animate);
  };
  