/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    // Prevent browser from restoring scroll position automatically
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    try {
        // initMatrix(); // Removed as it is undefined
        initBootSequence();
        initSystemStatus();

        initTypingEffect();
        initCLI();
        initNavigation();

        // Force scroll to top on load for the terminal content
        const terminalContent = document.querySelector('.terminal-content');
        if (terminalContent) {
            terminalContent.scrollTop = 0;
            // Also try scrolling window just in case mobile behavior differs
            window.scrollTo(0, 0);
        }

        // Failsafe: Ensure boot overlay is gone after 5 seconds max
        setTimeout(() => {
            const bootOverlay = document.getElementById('boot-overlay');
            if (bootOverlay && window.getComputedStyle(bootOverlay).display !== 'none') {
                console.warn("Boot sequence timed out or failed. Forcing start.");
                bootOverlay.style.display = 'none';
                const container = document.getElementById('type-container');
                if (container) container.style.visibility = 'visible';
            }
        }, 5000);

    } catch (e) {
        console.error("Initialization error:", e);
        const bootOverlay = document.getElementById('boot-overlay');
        if (bootOverlay) bootOverlay.style.display = 'none';
        const container = document.getElementById('type-container');
        if (container) container.style.visibility = 'visible';
    }
});

/* --- NAVIGATION & TRANSITIONS --- */
function initNavigation() {
    // Use delegation on document body to catch all links
    document.body.addEventListener('click', (e) => {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;

        // Check if it's an internal link
        const href = link.getAttribute('href');

        // Skip external links, anchors, or javascript: links (like the back button)
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript:') || link.getAttribute('target') === '_blank') return;

        // Prevent default navigation to allowing typing animation
        e.preventDefault();

        // Determined command text
        let command = link.getAttribute('data-command');
        if (!command) {
            // Fallback mapping based on href
            if (href === '/') command = "cd ~";
            else if (href.includes('about')) command = "cat about_me.txt";
            else if (href.includes('skills')) command = "ls -la /skills/";
            else if (href.includes('projects')) command = "./run_projects.sh";
            else if (href.includes('contact')) command = "exit";
            else command = `cd ${href}`;
        }

        transitionTo(href, command);
    });
}

function transitionTo(url, command) {
    const input = document.getElementById('cli-input');
    const terminalContent = document.querySelector('.terminal-content');

    if (input) {
        // 1. Force scroll to bottom so input is visible
        if (terminalContent) {
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
        input.scrollIntoView({ behavior: "smooth", block: "end" });

        input.value = "";
        input.focus();

        // Remove placeholder to make it look cleaner while typing
        const originalPlaceholder = input.placeholder;
        input.placeholder = "";

        // 2. Typing animation within the input
        let i = 0;
        const typeChar = () => {
            if (i < command.length) {
                input.value += command.charAt(i);
                i++;

                // Keep scrolling to bottom to ensure visibility
                if (terminalContent) terminalContent.scrollTop = terminalContent.scrollHeight;

                setTimeout(typeChar, 60 + Math.random() * 40);
            } else {
                // Done typing
                setTimeout(() => {
                    window.location.href = url;
                }, 400);
            }
        };

        // Start typing after a tiny delay to allow scroll to settle
        setTimeout(typeChar, 300);

    } else {
        // Fallback
        window.location.href = url;
    }
}




/* --- CLI LOGIC --- */
function initCLI() {
    const input = document.getElementById('cli-input');
    if (!input) return;

    // Always focus input when clicking anywhere (terminal feel)
    document.addEventListener('click', (e) => {
        // specific check to avoid stealing focus if selecting text or clicking links
        if (window.getSelection().toString().length === 0 && !e.target.closest('a') && !e.target.closest('button')) {
            input.focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            handleCommand(command);
        }
    });
}

function handleCommand(cmd) {
    // Simple router
    // clean up simple "cd " prefix if present
    if (cmd.startsWith("cd ")) {
        cmd = cmd.substring(3).trim();
    }

    switch (cmd) {
        case 'ls':
        case '/skills/':
        case 'ls -la':
        case 'ls -la /skills/':
        case 'skills':
            transitionTo('/skills/', cmd); // Use transition for consistency
            break;
        case 'cat about_me.txt':
        case 'cat about':
        case 'about':
        case 'fetch_profile':
        case 'fetch_profile --verbose':
        case 'whoami':
            transitionTo('/about/', cmd);
            break;
        case './run_projects.sh':
        case 'run_projects.sh':
        case 'projects':
        case './projects':
            transitionTo('/projects/', cmd);
            break;
        case 'exit':
        case 'contact':
            transitionTo('/contact/', cmd);
            break;
        case 'home':
        case '~':
        case '/':
        case 'clear':
            transitionTo('/', 'cd ~');
            break;
        case 'back':
        case 'cd ..':
            window.history.back();
            break;
        default:
            // ... (keep existing default)
            const input = document.getElementById('cli-input');
            const originalVal = input.value;
            input.value = "Command not found: " + cmd;
            setTimeout(() => { input.value = ""; }, 1500);
            break;
    }
}

/* --- BOOT SEQUENCE --- */
function initBootSequence() {
    // Only run boot sequence if it's the first visit (session storage)
    if (sessionStorage.getItem("booted")) {
        const bootOverlay = document.getElementById('boot-overlay');
        if (bootOverlay) bootOverlay.style.display = 'none';
        return;
    }

    const bootOverlay = document.getElementById('boot-overlay');
    if (!bootOverlay) return;

    const bootLines = [
        "[OK] Initializing Kernel...",
        "[OK] Checking Memory...",
        "[OK] Loading Drivers...",
        "[OK] Mounting Filesystems...",
        "[OK] Starting Network Services...",
        "[OK] Authenticating User...",
        "Welcome to PortfolioOS v1.0"
    ];

    let lineIndex = 0;

    function addLine() {
        if (lineIndex < bootLines.length) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.innerText = bootLines[lineIndex];
            bootOverlay.appendChild(line);
            lineIndex++;

            // Random delay between lines for realism
            setTimeout(addLine, Math.random() * 300 + 100);
        } else {
            // Boot complete, start penguin sequence
            setTimeout(() => {
                bootOverlay.style.display = 'none'; // Hide boot instantly
                startPenguinSequence();             // Start penguin
            }, 800);
        }
    }

    addLine();
}

function startPenguinSequence() {
    const penguinOverlay = document.getElementById('penguin-overlay');
    const progressFill = document.getElementById('progress-fill');

    if (penguinOverlay) penguinOverlay.style.display = 'flex';

    // Start face animation
    initPenguin();

    // Animate progress bar
    let width = 0;
    const duration = 4000; // 4.0 seconds (Slower)
    const intervalTime = 50;
    const step = 100 / (duration / intervalTime);

    const loadingInterval = setInterval(() => {
        width += step;
        if (width >= 100) {
            width = 100;
            clearInterval(loadingInterval); // Stop
            if (progressFill) progressFill.style.width = '100%';

            setTimeout(() => {
                // Done
                if (penguinOverlay) {
                    penguinOverlay.style.transition = "opacity 0.5s";
                    penguinOverlay.style.opacity = "0";
                    setTimeout(() => {
                        penguinOverlay.style.display = 'none';
                        sessionStorage.setItem("booted", "true");
                    }, 500);
                }
            }, 500);
        } else {
            if (progressFill) progressFill.style.width = width + '%';
        }
    }, intervalTime);
}

/* --- SYSTEM STATUS --- */
function initSystemStatus() {
    const cpuEl = document.getElementById('cpu-load');
    const memEl = document.getElementById('mem-load');
    const uptimeEl = document.getElementById('uptime');

    if (!cpuEl || !memEl || !uptimeEl) return;

    // Fake CPU/Mem updates
    setInterval(() => {
        const cpu = Math.floor(Math.random() * 30) + 5; // 5-35%
        cpuEl.innerText = cpu + "%";

        // Random slight fluctuation in mem
        const mem = (4.2 + (Math.random() * 0.2 - 0.1)).toFixed(1);
        memEl.innerText = mem + "GB";
    }, 2000);

    // Uptime counter
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const date = new Date(0);
        date.setSeconds(seconds);
        const timeString = date.toISOString().substr(11, 8);
        uptimeEl.innerText = timeString;
    }, 1000);
}

/* --- TYPING EFFECT (DOM-Aware) --- */
function initTypingEffect() {
    const container = document.getElementById('type-container');
    if (!container) return;

    // 1. Snapshot the structure (deep clone)
    // We clone children to an array to keep a reference to the structure
    const sourceNodes = Array.from(container.childNodes).map(node => node.cloneNode(true));

    // 2. Clear the container
    container.innerHTML = '';
    container.style.visibility = 'visible';

    // 3. Helper to process nodes recursively
    async function typeNodes(nodes, parent) {
        for (const node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                // It's text: type it char by char
                const text = node.textContent;
                // Optimization: Don't type massive whitespace blocks (newlines in HTML) slow
                // but we do want to preserve them for spacing.
                const textNode = document.createTextNode("");

                // If it's pure whitespace (just formatting), append immediately
                if (!text.trim() && text.includes('\n')) {
                    textNode.nodeValue = text;
                    parent.appendChild(textNode);
                    continue;
                }

                parent.appendChild(textNode);

                for (let i = 0; i < text.length; i++) {
                    textNode.nodeValue += text[i];

                    // Specific scroll logic to keep bottom in view
                    const terminalContent = document.querySelector('.terminal-content');
                    if (terminalContent) terminalContent.scrollTop = terminalContent.scrollHeight;

                    // Delay - faster for whitespace
                    const char = text[i];
                    let delay = 10;
                    if (char === '\n' || char === ' ') delay = 0; // Skip delay for formatting whitespace
                    else if (char === '.' || char === '?' || char === '!') delay = 60;

                    if (delay > 0) await new Promise(r => setTimeout(r, delay));
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // It's an element: create it, append it, then process its children
                const newEl = node.cloneNode(false); // shallow clone (attributes only)
                parent.appendChild(newEl);

                // Recursively type children
                const children = Array.from(node.childNodes);
                await typeNodes(children, newEl);
            } else {
                // Comments etc: just append
                parent.appendChild(node.cloneNode(true));
            }
        }
    }

    // Logic to start typing
    async function start() {
        await typeNodes(sourceNodes, container);
    }

    // Check for Boot Overlay
    const bootOverlay = document.getElementById('boot-overlay');
    if (bootOverlay && window.getComputedStyle(bootOverlay).display !== 'none') {
        const checkBoot = setInterval(() => {
            // Wait for both boot and penguin overlays
            const bootStyle = window.getComputedStyle(bootOverlay).display;
            const penguinOverlay = document.getElementById('penguin-overlay');
            const penguinStyle = penguinOverlay ? window.getComputedStyle(penguinOverlay).display : 'none';

            if (bootStyle === 'none' && penguinStyle === 'none') {
                clearInterval(checkBoot);
                start();
            }
        }, 100);
    } else {
        start();
    }
}

/* --- PENGUIN ANIMATION --- */
function initPenguin() {
    const face = document.getElementById('penguin-face');
    if (!face) return;

    // Expressions map
    // Structure: [LeftEye, Beak, RightEye]
    const expressions = [
        ['^', 'v', '^'], // Normal
        ['^', 'v', '^'], // Normal (higher weight)
        ['-', 'v', '-'], // Blink
        ['^', 'V', '^'], // Chirp
        ['>', 'v', '<'], // Angry/Focused
        ['o', 'v', 'o'], // Surprised
        ['*', 'v', '*'], // Dazed
        ['^', '<', '^'], // Side talk
    ];

    const animate = () => {
        // Pick random expression
        const rand = Math.floor(Math.random() * expressions.length);
        const [l, b, r] = expressions[rand];

        face.innerText = `${l}${b}${r}`;

        // Fixed 1-second interval as requested
        setTimeout(animate, 1000);
    };

    // Start loop
    setTimeout(animate, 1000);
}
