document.addEventListener('DOMContentLoaded', () => {
    // --- Globals & State ---
    const userPk = document.body.dataset.userPk;
    let referralDataLoaded = false;
    let referralDataCache = null;

    // --- Element Selectors ---
    const referralRankClassEl = document.getElementById('referral-rank-class');
    const referralButtonContainer = document.getElementById('referral-button-container');
    const networkModal = document.getElementById('network-modal');
    const networkModalContent = document.getElementById('network-modal-content');
    const closeNetworkModalBtn = document.getElementById('close-network-modal');
    const networkModalRankEl = document.getElementById('network-modal-rank');
    const networkListContainer = document.getElementById('network-list-container');
    
    // ADDED: Selectors for the "Invite Your Friends" section
    const copyReferralLinkBtn = document.getElementById('copy-referral-link-btn');
    const referralLinkTextEl = document.getElementById('referral-link-text');


    // --- Core Fetch Function ---
    async function fetchAndRenderReferralData() {
        if (referralDataLoaded) return; // Don't fetch again if already loaded

        try {
            const response = await fetch(`http://192.168.1.30:8000/referral/action/${userPk}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            referralDataCache = data;
            renderReferralCard(data.referral);
            prepareNetworkModal(data);
            referralDataLoaded = true;
        } catch (error) {
            console.error("Failed to fetch referral data:", error);
            if(referralRankClassEl) referralRankClassEl.textContent = 'Error';
        }
    }
    
    // --- UI Rendering & Utility Functions ---

    /**
     * Displays a popover notification at the top of the screen.
     * @param {string} message The text to display in the popover.
     * @param {string} type 'success' or 'error' to determine the color.
     */
    function showPopover(message, type = 'success') {
        const existingPopover = document.getElementById('dynamic-popover');
        if (existingPopover) {
            existingPopover.remove();
        }

        const popover = document.createElement('div');
        popover.id = 'dynamic-popover';
        popover.textContent = message;
        popover.className = 'fixed top-0 left-1/2 -translate-x-1/2 -translate-y-full transform px-6 py-3 rounded-b-lg shadow-lg text-white font-semibold transition-transform duration-300 ease-in-out z-50';

        if (type === 'success') {
            popover.classList.add('bg-green-500');
        } else {
            popover.classList.add('bg-red-500');
        }

        document.body.appendChild(popover);

        setTimeout(() => {
            popover.classList.remove('-translate-y-full');
        }, 100);

        setTimeout(() => {
            popover.classList.add('-translate-y-full');
            popover.addEventListener('transitionend', () => {
                popover.remove();
            }, { once: true });
        }, 3000);
    }

    function renderReferralCard(referral) {
        if (!referral) return;
        
        if(referralRankClassEl) referralRankClassEl.textContent = referral.rank_class || 'N/A';
        
        if(referralButtonContainer) {
            referralButtonContainer.innerHTML = `
                <button id="network-btn" class="w-full py-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition">Network</button>
                <button id="copy-code-btn" data-code="https://t.me/YourBotApp?start=${referral.code}" class="w-full py-3 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span id="copy-code-text">Copy Code</span>
                </button>
            `;
            
            const newNetworkBtn = document.getElementById('network-btn');
            if (newNetworkBtn) newNetworkBtn.addEventListener('click', openNetworkModal);
            
            const copyBtn = document.getElementById('copy-code-btn');
            if (copyBtn) copyBtn.addEventListener('click', handleCopyCode);
        }
    }

    function prepareNetworkModal(data) {
        if (!data || !data.network || !data.referral) return;
        if(networkModalRankEl) networkModalRankEl.textContent = data.referral.rank_value || 0;
        
        if (data.network.length === 0) {
            if(networkListContainer) networkListContainer.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">Your network is empty.</p>`;
            return;
        }
        const networkHTML = data.network.map(user => {
            const profileImageHTML = user.profile 
                ? `<img src="${user.profile}" alt="${user.username}'s profile" class="w-full h-full object-cover">`
                : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
            const joinDate = new Date(user.date_created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            return `
                <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">${profileImageHTML}</div>
                        <div><p class="font-bold text-gray-800 dark:text-gray-100">${user.username}</p><p class="text-sm text-gray-500 dark:text-gray-400">Joined: ${joinDate}</p></div>
                    </div>
                </div>`;
        }).join('');
        if(networkListContainer) networkListContainer.innerHTML = networkHTML;
    }

    // --- Event Handlers & Modal Logic ---

    function handleCopyCode(event) {
        const button = event.currentTarget;
        const code = button.dataset.code;
        const textSpan = document.getElementById('copy-code-text');

        const showSuccess = () => {
            showPopover('Referral code copied!', 'success');
            if(textSpan) textSpan.textContent = 'Copied!';
            button.classList.add('text-green-500');
            setTimeout(() => {
                if(textSpan) textSpan.textContent = 'Copy Code';
                button.classList.remove('text-green-500');
            }, 2000);
        };
        
        const showFailure = () => {
             showPopover('Failed to copy code.', 'error');
        };

        copyToClipboard(code, showSuccess, showFailure);
    }

    /**
     * ADDED: New handler specifically for the referral link button.
     */
    function handleCopyReferralLink() {
        if (!copyReferralLinkBtn || !referralLinkTextEl) return;

        const linkToCopy = referralLinkTextEl.textContent;
        
        const showSuccess = () => {
            showPopover('Referral link copied!', 'success');
            copyReferralLinkBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyReferralLinkBtn.textContent = 'Copy';
            }, 2000);
        };

        const showFailure = () => {
            showPopover('Failed to copy link.', 'error');
        };
        
        copyToClipboard(linkToCopy, showSuccess, showFailure);
    }
    
    /**
     * ADDED: A reusable copy-to-clipboard function to avoid code duplication.
     */
    function copyToClipboard(text, onSuccess, onFailure) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(onSuccess, onFailure);
        } else {
            // Fallback for insecure contexts (HTTP) and older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'absolute';
            textArea.style.left = '-9999px';
            
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                onSuccess();
            } catch (err) {
                console.error('Fallback copy failed:', err);
                onFailure();
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    function openNetworkModal() {
        if (!referralDataLoaded) return;
        if (!networkModal || !networkModalContent) return;
        networkModal.classList.remove('hidden');
        networkModal.classList.add('flex');
        setTimeout(() => networkModalContent.classList.remove('scale-95', 'opacity-0'), 10);
    }

    function closeNetworkModal() {
        if (!networkModal || !networkModalContent) return;
        networkModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            networkModal.classList.add('hidden');
            networkModal.classList.remove('flex');
        }, 300);
    }
    
    // --- Initial Event Listeners ---
    
    window.addEventListener('slidechange', (event) => {
        if (event.detail.newIndex === 2) {
            fetchAndRenderReferralData();
        }
    });

    const initialNetworkBtn = document.getElementById('network-btn');
    if(initialNetworkBtn) initialNetworkBtn.addEventListener('click', openNetworkModal);
    
    if(closeNetworkModalBtn) closeNetworkModalBtn.addEventListener('click', closeNetworkModal);
    if(networkModal) networkModal.addEventListener('click', (event) => {
        if (event.target === networkModal) closeNetworkModal();
    });

    // ADDED: Bind the event listener for the "Invite Your Friends" button.
    if(copyReferralLinkBtn) {
        copyReferralLinkBtn.addEventListener('click', handleCopyReferralLink);
    }
});