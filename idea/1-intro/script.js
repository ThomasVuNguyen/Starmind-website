document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    const starCursor = document.getElementById('star-cursor');
    const introContainer = document.getElementById('intro-container');
    const headerTitle = document.getElementById('header-title');
    const headerStar = document.getElementById('header-star');
    
    // The text to type
    const fullText = "Welcome to Starmind";
    const finalText = "Starmind"; // The part that stays
    
    // Initial State
    // We want the star to start roughly where the text will start? 
    // Or center of screen?
    // Let's center everything using flexbox in CSS, so the text container grows.
    // The star needs to position absolute relative to the text flow.
    
    // Strategy:
    // We will inject spans for characters.
    // We will move the star to the position of the last injected character (or just after it).
    
    let currentIndex = 0;
    const typingSpeed = 100; // ms
    const initialDelay = 800; // ms
    
    // Position star initially at the center of the empty text container
    // Since textContainer is empty and centered, let's just place star there.
    // Actually, to make it follow text, we might need to append the star INSIDE the text container?
    // Or calculate coordinates. appending is easier for flow, but let's see.
    // If we append it, it behaves like an inline-block element.
    
    // Improved Strategy:
    // Use the star as an 'inline-block' element at the end of the text.
    // That way it naturally flows with the text.
    // But the design shows the star ON TOP or next to it.
    
    // Let's try putting the star inside the text container as a span/div
    // text-container { display: flex; align-items: center; }
    
    // Clear initial absolutes from CSS to use flex flow for the typing phase
    starCursor.style.position = 'relative';
    starCursor.style.marginLeft = '10px'; 
    starCursor.style.transform = 'scale(1)';
    
    // Move star into text container for the typing phase
    textContainer.appendChild(starCursor);
    
    function typeWriter() {
        if (currentIndex < fullText.length) {
            // Create a span for the char
            const span = document.createElement('span');
            span.textContent = fullText.charAt(currentIndex);
            
            // Insert before the star
            textContainer.insertBefore(span, starCursor);
            
            currentIndex++;
            setTimeout(typeWriter, typingSpeed + (Math.random() * 50)); // mild random variance
        } else {
            // Finished typing
            setTimeout(finishAnimation, 1000);
        }
    }
    
    setTimeout(typeWriter, initialDelay);
    
    function finishAnimation() {
        // The sketch says: "Starmind text moves to top, Starmind logo also moves"
        // The text currently is "Welcome to Starmind".
        // We probably want to fade out "Welcome to " and keep "Starmind".
        
        // 1. Fade out "Welcome to "
        // Let's find the nodes.
        const childNodes = Array.from(textContainer.childNodes);
        // Find split point
        // "Welcome to " length is 11 chars. 
        // 0-10 are "Welcome to ". 11 is 'S'.
        
        const splitIndex = fullText.indexOf("Starmind");
        
        // Animate out the prefix
        childNodes.forEach((node, index) => {
            if (node !== starCursor && index < splitIndex) {
                 // It's a text node (span)
                 if(node.style) {
                     node.style.transition = 'opacity 0.5s, width 0.5s';
                     node.style.opacity = '0';
                     node.style.width = '0'; // collapse space
                     node.style.overflow = 'hidden';
                     node.style.display = 'inline-block';
                 }
            }
        });
        
        // Wait for collapse
        setTimeout(() => {
            transitionToHeader();
        }, 600);
    }
    
    function transitionToHeader() {
        // Now we have "Starmind" and the Star in the center.
        // We want to transform the whole `intro-container` to the position of the header logo area?
        // OR, smoother:
        // Get strict rect of the current center logo group.
        // Get rect of the target header logo group.
        // Animate using FLIP technique or simple CSS transform.
        
        // Simple approach:
        // 1. Hide the real header logo opacity:0 (already done in CSS).
        // 2. Add a class to body that moves the Intro Container to top-left.
        //    AND scales it down if necessary.
        
        const headerRect = document.querySelector('.logo-area').getBoundingClientRect();
        const introRect = textContainer.getBoundingClientRect();
        
        // Calculate translation
        // Target is roughly top-left padding (40px, maybe centered vertically in 80px header).
        // Let's rely on fixed CSS animation for simplicity and robustness first, 
        // modifying top/left of the FIXED intro container might be easier.
        // But flex center makes it hard to move effortlessly.
        
        // Let's change the strategy for the Move:
        // We remove `justify-content: center` property via class?
        // No, `intro-container` is fixed full screen.
        
        // Let's do a manual calculation for the satisfying "swoosh"
        const targetTop = 20; // roughly header center (80/2 - height/2)
        const targetLeft = 40; // padding
        
        // Current center items are in textContainer.
        // We can just animate the textContainer itself if we free it from flex center.
        
        // Disable flex centering on parent for a moment?
        // Or just transform the textContainer.
        
        // The textContainer is flex-centered by parent.
        // Let's calculate the delta.
        // We want textContainer to end up at `headerRect.left, headerRect.top`.
        
        // Actually, let's just Activate the real header and Fade Out the intro, 
        // BUT to make it look like it MOVED, we can match the position.
        
        // "Cheating" the morph:
        // 1. Match Header 'Star' and 'Starmind' content exactly to what remains in Intro.
        headerTitle.textContent = "Starmind";
        // Header star is just a div, let's put the SVG in there?
        // actually header-star in HTML is empty.
        
        // FLIP Animation:
        // 1. Measure current position (First)
        const firstRect = textContainer.getBoundingClientRect();
        
        // 2. Move elements to final state (Last)
        // We will do this by manipulating the separate 'floating' intro container 
        // to overlapping the header position?
        // Or better: Hide intro, Show header, but animate the transition?
        
        // Let's try: Animate intro-container to top-left.
        introContainer.style.justifyContent = 'flex-start';
        introContainer.style.alignItems = 'flex-start';
        introContainer.style.padding = '0 40px'; // Match header padding width-wise
        introContainer.style.paddingTop = '0'; // We will use margin or transform for vertical
        
        // This sudden layout change will jump. We need `transform`.
        
        // Back to transform strategy:
        // We know where we want to go: Top Left.
        // Current: Center.
        // Let's apply a transform translate to the textContainer.
        
        const currentX = firstRect.left;
        const currentY = firstRect.top;
        
        // We want to go to header Logo position.
        // Logo container is .logo-area
        const navRect = document.querySelector('.logo-area').getBoundingClientRect();
        
        const deltaX = navRect.left - currentX;
        const deltaY = navRect.top - currentY;
        
        const scale = 1.5 / 2.5; // Font size change? Logo font is 1.5rem, Intro is 2.5rem.
        
        textContainer.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        textContainer.style.transformOrigin = 'top left';
        textContainer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
        
        // Star size adjustment?
        // Intro star is 40px. Header is implied smaller.
        // The scale() on container will handle the star size too!
        
        // After transition, swap element visibility
        setTimeout(() => {
            document.body.classList.add('animation-complete');
            
            // Populate header properly
            headerStar.innerHTML = starCursor.innerHTML; 
            // set header star size
            headerStar.style.width = '24px';
            headerStar.style.height = '24px';
            headerStar.style.color = 'var(--accent-color)';
            
            // The text is already in header-title from HTML logic? No currently empty.
            headerTitle.textContent = "Starmind";
            
        }, 800); // Wait for transition
    }
});
