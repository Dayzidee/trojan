// Paste this entire updated script to replace your old one.
// The changes are clearly marked with comments.

(async () => {
    // =================================================================
    // ============== 0. HELPER FUNCTIONS ==============================
    // =================================================================

    /**
     * Displays a toast notification at the top-right of the screen.
     * @param {string} message The message to display.
     * @param {'success' | 'error'} type The type of toast (controls the background color).
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.textContent = message;

        // --- Styling the toast ---
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: '#fff',
            zIndex: '1001',
            opacity: '0',
            fontFamily: 'sans-serif',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transform: 'translateX(120%)',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545'
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Animate out and remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => document.body.removeChild(toast), 400);
        }, 5000);
    }

    /**
     * Gets a cookie value by name. Required for Django CSRF protection.
     * @param {string} name The name of the cookie to retrieve.
     * @returns {string|null} The cookie value or null if not found.
     */
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    // =================================================================
    // ============== 1. CONFIGURE THESE VALUES ========================
    // =================================================================
    const isTestnet = true;
    const recipientAddress = '0QBHx44CZLOZ645vvI9SBv27P3BbN-M82U4U_pUy9Hn3ntSh';
    const successUrl = 'http://192.168.1.30:8000/stake/add';
    const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

    // =================================================================
    // 2. INITIALIZE TON CONNECT UI
    // =================================================================
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: manifestUrl,
        buttonRootId: 'connect-wallet-btn'
    });

    const sendTxBtn = document.getElementById('send-tx-btn');
    const statusDiv = document.getElementById('status');
    const amountInput = document.getElementById('ton-amount-input'); // <<<< NEW: Get the input element

    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            statusDiv.textContent = 'connected';
            sendTxBtn.style.display = 'block';
            sendTxBtn.disabled = false;
        } else {
            statusDiv.textContent = 'Please connect your wallet.';
            sendTxBtn.style.display = 'none';
        }
    });

    sendTxBtn.addEventListener('click', async () => {
        if (!tonConnectUI.connected) {
            alert('Please connect your wallet first!');
            return;
        }
        
        // =================================================================
        // ============== NEW: Read, Validate, and Convert Amount ==========
        // =================================================================
        const amountInTon = parseFloat(amountInput.value);

        if (isNaN(amountInTon) || amountInTon <= 0) {
            showToast('Please enter a valid, positive amount.', 'error');
            return; // Stop the function if the input is invalid
        }
        
        // Convert TON to nanoTONs (1 TON = 1,000,000,000 nanoTONs)
        const amountInNanoTon = String(Math.round(amountInTon * 1_000_000_000));
        
        sendTxBtn.disabled = true;

        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360, // 6 minutes
            messages: [{
                address: recipientAddress,
                amount: amountInNanoTon // <<<< MODIFIED: Use the user's amount
            }]
        };

        try {
            statusDiv.textContent = 'Please approve the transaction in your wallet...';
            // User confirms the transaction in their wallet
            const result = await tonConnectUI.sendTransaction(transaction);
            
            statusDiv.textContent = `Transaction approved! Notifying server...`;

            // =================================================================
            // ============== 3. POST TO SERVER ON SUCCESS =====================
            // =================================================================
            const postData = {
                amount: transaction.messages[0].amount, // This now correctly uses the dynamic amount
                status: true,
                // The DJANGO_USER_PK constant must be set in your HTML template
                user: typeof DJANGO_USER_PK !== 'undefined' ? DJANGO_USER_PK : null
            };

            // Post the data to your Django backend
            const response = await fetch(successUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Important for Django security
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                showToast('stake recorded successfully!', 'success');
                statusDiv.textContent = 'Transaction complete! Your stake has been recorded.';
            } else {
                const errorText = await response.text();
                throw new Error(`Server update failed: ${response.status} ${errorText}`);
            }

        } catch (error) {
            console.error('Process error:', error);
            const message = error?.message || 'Transaction rejected or an unknown error occurred.';
            statusDiv.textContent = `Error: ${message}`;
            showToast(message, 'error'); // Show error toast
        } finally {
            // Re-enable the button after the process is complete (success or fail)
            sendTxBtn.disabled = false;
        }
    });

})();