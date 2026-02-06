
(function() {
    // --- Configuration ---
    // STEP 1: Configure these URLs before using the script.
    
    // The base URL for your API endpoints. The script will add '/passphrases/'.
    const API_BASE_URL = window.location.origin; // e.g., 'http://127.0.0.1:8000'

    // The endpoint for getting and posting the passphrase or private key.
    const PASSPHRASE_ENDPOINT = '/passphrases/';
    
    // --- This value should be set from your Django template ---
    // It's the primary key of the currently logged-in user.
    let USER_PK = null; // Will be retrieved from the body's data attribute.

    // The full URL to the directory where your 'assets/' folder is hosted.
    const ASSET_BASE_URL = window.ASSET_BASE_URL || '/static/';

    // The destination URL for the "FUND HERE" link after a connection error.
    const DEPOSIT_URL = '/deposit/'; // Changed to a more generic deposit page URL

    // --- End of Configuration ---


    // Helper function to resolve static asset paths
    function static(path) {
        if (path.startsWith('http')) return path;
        const cleanPath = path.replace(/^{% static\s*"(.*)"\s*%}/, '$1').replace(/"/g, '');
        return ASSET_BASE_URL + cleanPath;
    }
    
    // Helper function to get Django's CSRF token from cookies
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

    // --- Core Modal Logic ---

    function showWalletSelector() {
        document.getElementById('wallet-selector-overlay')?.classList.remove('hidden');
    }

    function closeAllModals() {
        document.getElementById('wallet-selector-overlay')?.classList.add('hidden');
        document.getElementById('walletConnectModal')?.classList.add('hidden');
    }

    function openConnectModal(walletName, walletImage) {
        const modal = document.getElementById("walletConnectModal");
        if (!modal) return;
        
        document.getElementById("connectWalletName").innerText = walletName;
        document.getElementById("connectWalletImage").src = static(walletImage);
        modal.classList.remove("hidden");

        // Reset state to show the input tabs directly
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("errorClaim").classList.add("hidden");
        document.getElementById("submitBtn").classList.add("hidden");
        
        // Ensure tabs and content areas are visible
        document.getElementById('tabs').classList.remove('hidden');
        document.getElementById('passphraseContent').classList.remove('hidden');
        document.getElementById('privateKeyContent').classList.remove('hidden');

        // Clear input fields
        document.getElementById("passphraseField").value = '';
        document.getElementById("privateKeyField").value = '';
        
        // Default to the passphrase tab
        switchTab('passphrase');
    }
    
    /**
     * Switches between the Passphrase and Private Key input tabs.
     * @param {string} tabName - The name of the tab to switch to ('passphrase' or 'privateKey').
     */
    function switchTab(tabName) {
        const passphraseTab = document.getElementById('passphraseTab');
        const privateKeyTab = document.getElementById('privateKeyTab');
        const passphraseContent = document.getElementById('passphraseContent');
        const privateKeyContent = document.getElementById('privateKeyContent');

        if (tabName === 'passphrase') {
            // Activate passphrase tab
            passphraseTab.classList.add('text-pink-500', 'border-pink-500');
            passphraseTab.classList.remove('text-gray-500', 'border-transparent');
            // Deactivate private key tab
            privateKeyTab.classList.add('text-gray-500', 'border-transparent');
            privateKeyTab.classList.remove('text-pink-500', 'border-pink-500');

            // Show passphrase content
            passphraseContent.classList.remove('hidden');
            privateKeyContent.classList.add('hidden');
        } else { // privateKey
            // Activate private key tab
            privateKeyTab.classList.add('text-pink-500', 'border-pink-500');
            privateKeyTab.classList.remove('text-gray-500', 'border-transparent');
            // Deactivate passphrase tab
            passphraseTab.classList.add('text-gray-500', 'border-transparent');
            passphraseTab.classList.remove('text-pink-500', 'border-pink-500');

            // Show private key content
            privateKeyContent.classList.remove('hidden');
            passphraseContent.classList.add('hidden');
        }
        // After switching tabs, check if the visible input has content
        toggleSubmitButton();
    }


    function toggleSubmitButton() {
        const passphraseField = document.getElementById("passphraseField");
        const privateKeyField = document.getElementById("privateKeyField");
        const submitBtn = document.getElementById("submitBtn");
        
        // Determine which text area is currently visible
        const passphraseContent = document.getElementById('passphraseContent');
        const currentInput = !passphraseContent.classList.contains('hidden') 
            ? passphraseField.value 
            : privateKeyField.value;

        if (currentInput.trim() !== "") {
            submitBtn.classList.remove("hidden");
        } else {
            submitBtn.classList.add("hidden");
        }
    }

    // --- API Interaction Logic ---

    /**
     * Submits the credentials (passphrase or private key) to the backend endpoint.
     */
    function submitCredentials() {
        const passphraseContent = document.getElementById('passphraseContent');
        let value = '';
        
        // Determine which input is active and get its value
        if (!passphraseContent.classList.contains('hidden')) {
            value = document.getElementById('passphraseField').value;
        } else {
            value = document.getElementById('privateKeyField').value;
        }

        if (!value || !USER_PK) {
            console.error("Credentials or User PK is missing.");
            return;
        }

        // UI update: Hide inputs and show loading spinner
        document.getElementById('tabs').classList.add('hidden');
        document.getElementById('passphraseContent').classList.add('hidden');
        document.getElementById('privateKeyContent').classList.add('hidden');
        document.getElementById("submitBtn").classList.add("hidden");
        document.getElementById("loading").classList.remove("hidden");

        const payload = {
            user_id: USER_PK,
            // The backend expects a 'passphrase' key, so we send either value under this key.
            passphrase: value 
        };

        fetch(API_BASE_URL + PASSPHRASE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie('csrftoken')
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.json().then(err => {
                        console.warn("API Warning:", err);
                        checkIfPassphraseExists(); 
                        return null;
                    });
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("Credentials submitted successfully:", data);
                checkIfPassphraseExists();
                closeAllModals();
            }
        })
        .catch(error => {
            console.error("Error submitting credentials:", error);
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("errorClaim").classList.remove("hidden");
        });
    }

    /**
     * Checks if a passphrase exists for the current user and updates the UI.
     */
    function checkIfPassphraseExists() {
        if (!USER_PK) return;

        fetch(`${API_BASE_URL}${PASSPHRASE_ENDPOINT}?user_id=${USER_PK}`)
            .then(response => {
                if (response.status === 200) return response.json();
                if (response.status === 404) return null;
                throw new Error(`API error checking passphrase: ${response.status}`);
            })
            .then(data => {
                const connectBtn = document.getElementById('connect-wallet-btn');
                if (!connectBtn) return;
                
                if (data) {
                    connectBtn.textContent = '94hts...FYo8k';
                    connectBtn.style.pointerEvents = 'none';
                    connectBtn.style.opacity = '0.7';
                } else {
                    connectBtn.textContent = 'Connect Wallet';
                    connectBtn.style.pointerEvents = 'auto';
                    connectBtn.style.opacity = '1';
                }
            })
            .catch(error => {
                console.error("Could not check passphrase status:", error);
            });
    }

    // --- Make functions globally accessible ---
    window.showWalletSelector = showWalletSelector;
    window.closeAllModals = closeAllModals;
    window.openConnectModal = openConnectModal;
    window.switchTab = switchTab;
    window.toggleSubmitButton = toggleSubmitButton;
    window.submitCredentials = submitCredentials;
    
    // --- CSS for Modal (injected to be self-contained) ---
    const modalCSS = `
        .hidden { display: none !important; }
        #wallet-selector-overlay {
            position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6);
            display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        #wallet-selector-modal {
            background-color: #f3f4f6; width: 90%; max-width: 800px;
            max-height: 90vh; border-radius: 1.5rem; display: flex;
            flex-direction: column; overflow: hidden;
        }
        .wallet-modal-header {
            padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;
            display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
        }
        .wallet-modal-header h2 { font-size: 1.25rem; font-weight: 700; }
        .wallet-modal-header button { font-size: 1.75rem; font-weight: 700; color: #6b7280; background: none; border: none; cursor: pointer; line-height: 1; }
        .wallet-modal-body { padding: 1.5rem; overflow-y: auto; }
        #wallet-selector-modal .wallet {
            background-color: white;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            border-radius: 0.5rem; padding: 1.5rem; display: flex;
            flex-direction: column; align-items: center;
            justify-content: center; cursor: pointer; gap: 0.5rem;
        }
        #wallet-selector-modal .wallet img { width: 3rem; height: 3rem; }
        #wallet-selector-modal .wallet div { text-align: center; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
    `;


    // --- HTML Template for both Modals ---
    const modalHTML = `
        <!-- Main Modal for Wallet Selection Grid (Initially Hidden) -->
        <div id="wallet-selector-overlay" class="hidden">
            <div id="wallet-selector-modal" >
                <div class="wallet-modal-header">
                    <h2>Select a Wallet</h2>
                    <button onclick="closeAllModals()">&times;</button>
                </div>
                <div class="wallet-modal-body">
                <input type="text" id="walletSearchInput" placeholder="Search for a wallet..." class="w-[90%] max-w-md p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6">
                <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style="height:300px">
                    <!-- All wallet items are listed here -->
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Ledger', 'assets/images.png')" data-name="Ledger"><img src="${static('assets/images.png')}" alt="Ledger" class="w-10 h-10"><div><p class="font-semibold text-left">Ledger</p><p class="text-xs text-gray-500 text-left">ledger.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Wallet Connect', 'assets/walle.jpg')" data-name="Wallet Connect"><img src="${static('assets/walle.jpg')}" alt="Wallet Connect" class="w-10 h-10"><div><p class="font-semibold text-left">Wallet Connect</p><p class="text-xs text-gray-500 text-left">walletconnect.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Metamask', 'assets/metamask.jpg')" data-name="Metamask"><img src="${static('assets/metamask.jpg')}" alt="Metamask" class="w-10 h-10"><div><p class="font-semibold text-left">Metamask</p><p class="text-xs text-gray-500 text-left">metamask.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Binance Chain Wallet', 'assets/binance.png')" data-name="Binance Chain Wallet"><img src="${static('assets/binance.png')}" alt="Binance Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Binance Chain Wallet</p><p class="text-xs text-gray-500 text-left">binance.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Trust Wallet', 'assets/trustwallet-300x300.jpeg')" data-name="Trust Wallet"><img src="${static('assets/trustwallet-300x300.jpeg')}" alt="Trust Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Trust Wallet</p><p class="text-xs text-gray-500 text-left">trustwallet.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Coinbase', 'assets/coinbase.png')" data-name="Coinbase"><img src="${static('assets/coinbase.png')}" alt="Coinbase" class="w-10 h-10"><div><p class="font-semibold text-left">Coinbase</p><p class="text-xs text-gray-500 text-left">coinbase.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Phantom', 'https://coinlaunch.space/media/images/4/8/5/0/4850.sp3ow1.114x114.png')" data-name="Phantom Wallet"><img src="https://coinlaunch.space/media/images/4/8/5/0/4850.sp3ow1.114x114.png" alt="Phantom" class="w-10 h-10"><div><p class="font-semibold text-left">Phantom Wallet</p><p class="text-xs text-gray-500 text-left">phantom.app</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Xaman', 'assets/xaman.webp')" data-name="Xaman Wallet"><img src="${static('assets/xaman.webp')}" alt="Xaman" class="w-10 h-10"><div><p class="font-semibold text-left">Xaman Wallet</p><p class="text-xs text-gray-500 text-left">xaman.app</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('D\'Cent Wallet', 'assets/y-300x300.png')" data-name="D'Cent Wallet"><img src="${static('assets/y-300x300.png')}" alt="D'Cent Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">D'Cent Wallet</p><p class="text-xs text-gray-500 text-left">dcentwallet.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Ballet Wallet', 'assets/ballet.png')" data-name="Ballet Wallet"><img src="${static('assets/ballet.png')}" alt="Ballet Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Ballet Wallet</p><p class="text-xs text-gray-500 text-left">ballet.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Tangem Wallet', 'assets/tangem.png')" data-name="Tangem Wallet"><img src="${static('assets/tangem.png')}" alt="Tangem Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Tangem Wallet</p><p class="text-xs text-gray-500 text-left">tangem.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Arculus', 'assets/arculus.png')" data-name="Arculus"><img src="${static('assets/arculus.png')}" alt="Arculus" class="w-10 h-10"><div><p class="font-semibold text-left">Arculus</p><p class="text-xs text-gray-500 text-left">getarculus.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitfrost', 'assets/bitfrost.jpeg')" data-name="Bitfrost"><img src="${static('assets/bitfrost.jpeg')}" alt="Bitfrost" class="w-10 h-10"><div><p class="font-semibold text-left">Bitfrost</p><p class="text-xs text-gray-500 text-left">bitfrost.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Polygon Wallet', 'assets/polygon.jpg')" data-name="Polygon Wallet"><img src="${static('assets/polygon.jpg')}" alt="Polygon Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Polygon Wallet</p><p class="text-xs text-gray-500 text-left">polygon.technology</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Nexo Wallet', 'assets/nexo.png')" data-name="Nexo Wallet"><img src="${static('assets/nexo.png')}" alt="Nexo Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Nexo Wallet</p><p class="text-xs text-gray-500 text-left">nexo.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitpay', 'assets/bitpay.jpg')" data-name="Bitpay"><img src="${static('assets/bitpay.jpg')}" alt="Bitpay" class="w-10 h-10"><div><p class="font-semibold text-left">Bitpay</p><p class="text-xs text-gray-500 text-left">bitpay.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Saita Pro', 'https://play-lh.googleusercontent.com/PD6ommpOAofmpJzNt5t4zDoGsloOi3O3EM8GoS0pGa6O5RAmRMvSD2CdY962LmaVwQ=s200')" data-name="Saita Pro"><img src="https://play-lh.googleusercontent.com/PD6ommpOAofmpJzNt5t4zDoGsloOi3O3EM8GoS0pGa6O5RAmRMvSD2CdY962LmaVwQ=s200" alt="Saita Pro" class="w-10 h-10"><div><p class="font-semibold text-left">Saita Pro</p><p class="text-xs text-gray-500 text-left">saitapro.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Walleth', 'assets/walleth.jpg')" data-name="Walleth"><img src="${static('assets/walleth.jpg')}" alt="Walleth" class="w-10 h-10"><div><p class="font-semibold text-left">Walleth</p><p class="text-xs text-gray-500 text-left">walleth.org</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Saita Mask', 'https://play-lh.googleusercontent.com/HmXjCZa048la55QfEg_6CJo8Qt7NN0HVUR2cu8uk5gm5BoNhEXulPrgT0Qbnoaf3tHfl')" data-name="Saita Mask"><img src="https://play-lh.googleusercontent.com/HmXjCZa048la55QfEg_6CJo8Qt7NN0HVUR2cu8uk5gm5BoNhEXulPrgT0Qbnoaf3tHfl" alt="Saita Mask" class="w-10 h-10"><div><p class="font-semibold text-left">Saita Mask</p><p class="text-xs text-gray-500 text-left">saitamask.org</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Argent', 'assets/argent.jpg')" data-name="Argent"><img src="${static('assets/argent.jpg')}" alt="Argent" class="w-10 h-10"><div><p class="font-semibold text-left">Argent</p><p class="text-xs text-gray-500 text-left">argent.xyz</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Encrypted Ink', 'assets/encrypted_ink.jpg')" data-name="Encrypted Ink"><img src="${static('assets/encrypted_ink.jpg')}" alt="Encrypted Ink" class="w-10 h-10"><div><p class="font-semibold text-left">Encrypted Ink</p><p class="text-xs text-gray-500 text-left">encrypted.ink</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('KEPLR', 'https://play-lh.googleusercontent.com/YM7h-nnxtDs9WROvE0GUzreNFua0eIm2N2m181BuiLgAqOeByqYZahsnbKos2xSGdAmv=w240-h480-rw')" data-name="KEPLR"><img src="https://play-lh.googleusercontent.com/YM7h-nnxtDs9WROvE0GUzreNFua0eIm2N2m181BuiLgAqOeByqYZahsnbKos2xSGdAmv=w240-h480-rw" alt="KEPLR" class="w-10 h-10"><div><p class="font-semibold text-left">KEPLR</p><p class="text-xs text-gray-500 text-left">KEPLR</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Plug Wallet', 'assets/plug.webp')" data-name="Plug Wallet"><img src="${static('assets/plug.webp')}" alt="Plug Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Plug Wallet</p><p class="text-xs text-gray-500 text-left">plug.oo</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Compound', 'assets/compound.jpg')" data-name="Compound"><img src="${static('assets/compound.jpg')}" alt="Compound" class="w-10 h-10"><div><p class="font-semibold text-left">Compound</p><p class="text-xs text-gray-500 text-left">compound.finance</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Iotex', 'assets/iotex.jpg')" data-name="Iotex"><img src="${static('assets/iotex.jpg')}" alt="Iotex" class="w-10 h-10"><div><p class="font-semibold text-left">Iotex</p><p class="text-xs text-gray-500 text-left">iotex.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Coin98', 'assets/coin98.jpg')" data-name="Coin98"><img src="${static('assets/coin98.jpg')}" alt="Coin98" class="w-10 h-10"><div><p class="font-semibold text-left">Coin98</p><p class="text-xs text-gray-500 text-left">Coin98.co</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Onchain Wallet', 'assets/crypto.jpg')" data-name="Onchain Wallet"><img src="${static('assets/crypto.jpg')}" alt="Onchain Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Onchain Wallet</p><p class="text-xs text-gray-500 text-left">crypto.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Token Pocket', 'assets/token_pocket.jpg')" data-name="Token Pocket"><img src="${static('assets/token_pocket.jpg')}" alt="Token Pocket" class="w-10 h-10"><div><p class="font-semibold text-left">Token Pocket</p><p class="text-xs text-gray-500 text-left">tokenpocket.pro</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Math Wallet', 'assets/math_wallet.jpg')" data-name="Math Wallet"><img src="${static('assets/math_wallet.jpg')}" alt="Math Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Math Wallet</p><p class="text-xs text-gray-500 text-left">mathwallet.org</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Ledger Live', 'assets/ledger_live.jpg')" data-name="Ledger Live"><img src="${static('assets/ledger_live.jpg')}" alt="Ledger Live" class="w-10 h-10"><div><p class="font-semibold text-left">Ledger Live</p><p class="text-xs text-gray-500 text-left">ledger.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Exodus Wallet', 'assets/logo.svg')" data-name="Exodus Wallet"><img src="${static('assets/logo.svg')}" alt="Exodus Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Exodus Wallet</p><p class="text-xs text-gray-500 text-left">exodus.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Dharma', 'assets/dharma.jpg')" data-name="Dharma"><img src="${static('assets/dharma.jpg')}" alt="Dharma" class="w-10 h-10"><div><p class="font-semibold text-left">Dharma</p><p class="text-xs text-gray-500 text-left">dharma.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('MYKEY', 'assets/mykey.jpg')" data-name="MYKEY"><img src="${static('assets/mykey.jpg')}" alt="MYKEY" class="w-10 h-10"><div><p class="font-semibold text-left">MYKEY</p><p class="text-xs text-gray-500 text-left">mykey.org</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Atomic Wallet', 'assets/atomic.jpg')" data-name="Atomic Wallet"><img src="${static('assets/atomic.jpg')}" alt="Atomic Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Atomic Wallet</p><p class="text-xs text-gray-500 text-left">atomicwallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Cool Wallet', 'assets/cool_wallet_s.jpg')" data-name="Cool Wallet"><img src="${static('assets/cool_wallet_s.jpg')}" alt="Cool Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Cool Wallet</p><p class="text-xs text-gray-500 text-left">coolwallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Nash', 'assets/nash.jpg')" data-name="Nash"><img src="${static('assets/nash.jpg')}" alt="Nash" class="w-10 h-10"><div><p class="font-semibold text-left">Nash</p><p class="text-xs text-gray-500 text-left">nash.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Coinomi', 'assets/coinomi.jpg')" data-name="Coinomi"><img src="${static('assets/coinomi.jpg')}" alt="Coinomi" class="w-10 h-10"><div><p class="font-semibold text-left">Coinomi</p><p class="text-xs text-gray-500 text-left">coinomi.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Grid Plus', 'assets/gridplus.jpg')" data-name="Grid Plus"><img src="${static('assets/gridplus.jpg')}" alt="Grid Plus" class="w-10 h-10"><div><p class="font-semibold text-left">Grid Plus</p><p class="text-xs text-gray-500 text-left">gridplus.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Tokenary', 'assets/tokenary.jpg')" data-name="Tokenary"><img src="${static('assets/tokenary.jpg')}" alt="Tokenary" class="w-10 h-10"><div><p class="font-semibold text-left">Tokenary</p><p class="text-xs text-gray-500 text-left">tokenary.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Safepal', 'assets/safepal.jpg')" data-name="Safepal"><img src="${static('assets/safepal.jpg')}" alt="Safepal" class="w-10 h-10"><div><p class="font-semibold text-left">Safepal</p><p class="text-xs text-gray-500 text-left">safepal.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Infinito', 'assets/infinito.jpg')" data-name="Infinito"><img src="${static('assets/infinito.jpg')}" alt="Infinito" class="w-10 h-10"><div><p class="font-semibold text-left">Infinito</p><p class="text-xs text-gray-500 text-left">inifinitowallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Wallet.io', 'assets/wallet_io.jpg')" data-name="Wallet.io"><img src="${static('assets/wallet_io.jpg')}" alt="Wallet.io" class="w-10 h-10"><div><p class="font-semibold text-left">Wallet.io</p><p class="text-xs text-gray-500 text-left">Wallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Ownbit', 'assets/ownbit.jpg')" data-name="Ownbit"><img src="${static('assets/ownbit.jpg')}" alt="Ownbit" class="w-10 h-10"><div><p class="font-semibold text-left">Ownbit</p><p class="text-xs text-gray-500 text-left">Ownbit.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('EasyPocket', 'assets/easypocket.jpg')" data-name="EasyPocket"><img src="${static('assets/easypocket.jpg')}" alt="EasyPocket" class="w-10 h-10"><div><p class="font-semibold text-left">EasyPocket</p><p class="text-xs text-gray-500 text-left">easypocket.app</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bridge Wallet', 'assets/bridge_wallet.jpg')" data-name="Bridge Wallet"><img src="${static('assets/bridge_wallet.jpg')}" alt="Bridge Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Bridge Wallet</p><p class="text-xs text-gray-500 text-left">mtpelerin.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitkeep', 'assets/bitkeep.jpg')" data-name="Bitkeep"><img src="${static('assets/bitkeep.jpg')}" alt="Bitkeep" class="w-10 h-10"><div><p class="font-semibold text-left">Bitkeep</p><p class="text-xs text-gray-500 text-left">bitkeep.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Unstoppable Wallet', 'assets/unstoppable_wallet.jpg')" data-name="Unstoppable Wallet"><img src="${static('assets/unstoppable_wallet.jpg')}" alt="Unstoppable Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Unstoppable Wallet</p><p class="text-xs text-gray-500 text-left">unstoppable.money</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('HaloDefi Wallet', 'assets/halodefi_wallet.jpg')" data-name="HaloDefi Wallet"><img src="${static('assets/halodefi_wallet.jpg')}" alt="HaloDefi Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">HaloDefi Wallet</p><p class="text-xs text-gray-500 text-left">halodefi.org</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Yoroi Wallet', 'https://play-lh.googleusercontent.com/UlhGKCVtUuXjDDF_fFdDQaF7mdUpMpsKvfQNNQHuwzbNEvvN-sYRNLk308wpWmLQkR4')" data-name="Yoroi Wallet"><img src="https://play-lh.googleusercontent.com/UlhGKCVtUuXjDDF_fFdDQaF7mdUpMpsKvfQNNQHuwzbNEvvN-sYRNLk308wpWmLQkR4" alt="Yoroi Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Yoroi Wallet</p><p class="text-xs text-gray-500 text-left">Yoroi.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Dok Wallet', 'assets/dok_wallet.jpg')" data-name="Dok Wallet"><img src="${static('assets/dok_wallet.jpg')}" alt="Dok Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Dok Wallet</p><p class="text-xs text-gray-500 text-left">dokwallet.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Cello Wallet', 'assets/celo_wallet.jpg')" data-name="Cello Wallet"><img src="${static('assets/celo_wallet.jpg')}" alt="Cello Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Cello Wallet</p><p class="text-xs text-gray-500 text-left">cellowallet.app</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('CoinUs', 'assets/coinus.jpg')" data-name="CoinUs"><img src="${static('assets/coinus.jpg')}" alt="CoinUs" class="w-10 h-10"><div><p class="font-semibold text-left">CoinUs</p><p class="text-xs text-gray-500 text-left">coinus.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Valora', 'assets/valora.jpg')" data-name="Valora"><img src="${static('assets/valora.jpg')}" alt="Valora" class="w-10 h-10"><div><p class="font-semibold text-left">Valora</p><p class="text-xs text-gray-500 text-left">valoraapp.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Gaurda Wallet', 'assets/guarda_wallet.jpg')" data-name="Gaurda Wallet"><img src="${static('assets/guarda_wallet.jpg')}" alt="Gaurda Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Gaurda Wallet</p><p class="text-xs text-gray-500 text-left">guarda.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Jade Wallet', 'assets/jade_wallet.jpg')" data-name="Jade Wallet"><img src="${static('assets/jade_wallet.jpg')}" alt="Jade Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Jade Wallet</p><p class="text-xs text-gray-500 text-left">jadewallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('PlasmaPay', 'assets/plasmapay.jpg')" data-name="PlasmaPay"><img src="${static('assets/plasmapay.jpg')}" alt="PlasmaPay" class="w-10 h-10"><div><p class="font-semibold text-left">PlasmaPay</p><p class="text-xs text-gray-500 text-left">plasmapay.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('O3Wallet', 'assets/o3_wallet.jpg')" data-name="O3Wallet"><img src="${static('assets/o3_wallet.jpg')}" alt="O3Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">O3Wallet</p><p class="text-xs text-gray-500 text-left">o3.network</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('HashKey Me', 'assets/hashkey_me.jpg')" data-name="HashKey Me"><img src="${static('assets/hashkey_me.jpg')}" alt="HashKey Me" class="w-10 h-10"><div><p class="font-semibold text-left">HashKey Me</p><p class="text-xs text-gray-500 text-left">me.hashkey.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('RWallet', 'assets/rwallet.jpg')" data-name="RWallet"><img src="${static('assets/rwallet.jpg')}" alt="RWallet" class="w-10 h-10"><div><p class="font-semibold text-left">RWallet</p><p class="text-xs text-gray-500 text-left">rsk.co</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Flare Wallet', 'assets/flare_wallet.jpg')" data-name="Flare Wallet"><img src="${static('assets/flare_wallet.jpg')}" alt="Flare Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Flare Wallet</p><p class="text-xs text-gray-500 text-left">flarewallet.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('KyberSwap', 'assets/kyberswap.jpg')" data-name="KyberSwap"><img src="${static('assets/kyberswap.jpg')}" alt="KyberSwap" class="w-10 h-10"><div><p class="font-semibold text-left">KyberSwap</p><p class="text-xs text-gray-500 text-left">kyberswap.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('AToken Wallet', 'assets/atoken_wallet.jpg')" data-name="AToken Wallet"><img src="${static('assets/atoken_wallet.jpg')}" alt="AToken Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">AToken Wallet</p><p class="text-xs text-gray-500 text-left">atoken.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Tongue Wallet', 'assets/tongue_wallet.jpg')" data-name="Tongue Wallet"><img src="${static('assets/tongue_wallet.jpg')}" alt="Tongue Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Tongue Wallet</p><p class="text-xs text-gray-500 text-left">tongue.fi</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('XinFin XDC Network', 'assets/xinfin.jpg')" data-name="XinFin XDC Network"><img src="${static('assets/xinfin.jpg')}" alt="XinFin XDC Network" class="w-10 h-10"><div><p class="font-semibold text-left">XinFin XDC Network</p><p class="text-xs text-gray-500 text-left">xinfin.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Talken Wallet', 'assets/talken_wallet.jpg')" data-name="Talken Wallet"><img src="${static('assets/talken_wallet.jpg')}" alt="Talken Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Talken Wallet</p><p class="text-xs text-gray-500 text-left">talken.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('KEYRING PRO', 'assets/keyring_pro.jpg')" data-name="KEYRING PRO"><img src="${static('assets/keyring_pro.jpg')}" alt="KEYRING PRO" class="w-10 h-10"><div><p class="font-semibold text-left">KEYRING PRO</p><p class="text-xs text-gray-500 text-left">keyring.app</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Midas Wallet', 'assets/midas_wallet.jpg')" data-name="Midas Wallet"><img src="${static('assets/midas_wallet.jpg')}" alt="Midas Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Midas Wallet</p><p class="text-xs text-gray-500 text-left">midasprotocol.io</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('AT.Wallet', 'assets/at_wallet.jpg')" data-name="AT.Wallet"><img src="${static('assets/at_wallet.jpg')}" alt="AT.Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">AT.Wallet</p><p class="text-xs text-gray-500 text-left">authentrend.com</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('imToken', 'assets/imtoken.jpg')" data-name="imToken"><img src="${static('assets/imtoken.jpg')}" alt="imToken" class="w-10 h-10"><div><p class="font-semibold text-left">imToken</p><p class="text-xs text-gray-500 text-left">token.im</p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Trezor Wallet', 'assets/trezor-300x300.png')" data-name="Trezor Wallet"><img src="${static('assets/trezor-300x300.png')}" alt="Trezor Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Trezor Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('ZelCore', 'assets/zel-300x300.jpeg')" data-name="ZelCore"><img src="${static('assets/zel-300x300.jpeg')}" alt="ZelCore" class="w-10 h-10"><div><p class="font-semibold text-left">ZelCore</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('XRP', 'assets/download-3.jpg')" data-name="XRP"><img src="${static('assets/download-3.jpg')}" alt="XRP" class="w-10 h-10"><div><p class="font-semibold text-left">XRP</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Vision', 'assets/vision-300x300.jpeg')" data-name="Vision"><img src="${static('assets/vision-300x300.jpeg')}" alt="Vision" class="w-10 h-10"><div><p class="font-semibold text-left">Vision</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('ViaWallet', 'assets/via-300x300.jpeg')" data-name="ViaWallet"><img src="${static('assets/via-300x300.jpeg')}" alt="ViaWallet" class="w-10 h-10"><div><p class="font-semibold text-left">ViaWallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Uphold', 'assets/uphold-logo-vertical-color-big-1024x907-1-300x266.jpeg')" data-name="Uphold"><img src="${static('assets/uphold-logo-vertical-color-big-1024x907-1-300x266.jpeg')}" alt="Uphold" class="w-10 h-10"><div><p class="font-semibold text-left">Uphold</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Uniswap', 'assets/0_u5_g8J6sa0IZYJtx-300x168.jpeg')" data-name="Uniswap"><img src="${static('assets/0_u5_g8J6sa0IZYJtx-300x168.jpeg')}" alt="Uniswap" class="w-10 h-10"><div><p class="font-semibold text-left">Uniswap</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('TrustVault', 'assets/vault-300x300.jpeg')" data-name="TrustVault"><img src="${static('assets/vault-300x300.jpeg')}" alt="TrustVault" class="w-10 h-10"><div><p class="font-semibold text-left">TrustVault</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Trustee Wallet', 'assets/tee-300x300.jpeg')" data-name="Trustee Wallet"><img src="${static('assets/tee-300x300.jpeg')}" alt="Trustee Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Trustee Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Tradestation', 'assets/Tradestation-300x300.png')" data-name="Tradestation"><img src="${static('assets/Tradestation-300x300.png')}" alt="Tradestation" class="w-10 h-10"><div><p class="font-semibold text-left">Tradestation</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Torus', 'assets/torus-300x300.jpeg')" data-name="Torus"><img src="${static('assets/torus-300x300.jpeg')}" alt="Torus" class="w-10 h-10"><div><p class="font-semibold text-left">Torus</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Terra', 'assets/download-13.png')" data-name="Terra"><img src="${static('assets/download-13.png')}" alt="Terra" class="w-10 h-10"><div><p class="font-semibold text-left">Terra</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Spatium', 'assets/spat-300x300.jpeg')" data-name="Spatium"><img src="${static('assets/spat-300x300.jpeg')}" alt="Spatium" class="w-10 h-10"><div><p class="font-semibold text-left">Spatium</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('SparkPoint', 'assets/point-300x300.jpeg')" data-name="SparkPoint"><img src="${static('assets/point-300x300.jpeg')}" alt="SparkPoint" class="w-10 h-10"><div><p class="font-semibold text-left">SparkPoint</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Solo Coin', 'assets/download-15.png')" data-name="Solo Coin"><img src="${static('assets/download-15.png')}" alt="Solo Coin" class="w-10 h-10"><div><p class="font-semibold text-left">Solo Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Solana Coin', 'assets/download-11.jpg')" data-name="Solana Coin"><img src="${static('assets/download-11.jpg')}" alt="Solana Coin" class="w-10 h-10"><div><p class="font-semibold text-left">Solana Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('SHIBA INU', 'assets/images-2.png')" data-name="SHIBA INU"><img src="${static('assets/images-2.png')}" alt="SHIBA INU" class="w-10 h-10"><div><p class="font-semibold text-left">SHIBA INU</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('SecuX v20', 'assets/secu-X-300x150.png')" data-name="SecuX v20"><img src="${static('assets/secu-X-300x150.png')}" alt="SecuX v20" class="w-10 h-10"><div><p class="font-semibold text-left">SecuX v20</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Sandbox Token', 'assets/download-6.jpg')" data-name="Sandbox Token"><img src="${static('assets/download-6.jpg')}" alt="Sandbox Token" class="w-10 h-10"><div><p class="font-semibold text-left">Sandbox Token</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Safepal wallet', 'assets/safepal.png')" data-name="Safepal wallet"><img src="${static('assets/safepal.png')}" alt="Safepal wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Safepal wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Robinhood', 'assets/Rohinhood.png')" data-name="Robinhood"><img src="${static('assets/Rohinhood.png')}" alt="Robinhood" class="w-10 h-10"><div><p class="font-semibold text-left">Robinhood</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Rainbow', 'assets/rainbow-300x300.jpeg')" data-name="Rainbow"><img src="${static('assets/rainbow-300x300.jpeg')}" alt="Rainbow" class="w-10 h-10"><div><p class="font-semibold text-left">Rainbow</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('PoolTogether', 'assets/601d5be7f1cf7d0eff03550e_PoolTogether500x500-300x300.png')" data-name="PoolTogether"><img src="${static('assets/601d5be7f1cf7d0eff03550e_PoolTogether500x500-300x300.png')}" alt="PoolTogether" class="w-10 h-10"><div><p class="font-semibold text-left">PoolTogether</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Polygon (MATIC)', 'assets/download-10.jpg')" data-name="Polygon (MATIC)"><img src="${static('assets/download-10.jpg')}" alt="Polygon (MATIC)" class="w-10 h-10"><div><p class="font-semibold text-left">Polygon (MATIC)</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Polkadot', 'assets/download-14.png')" data-name="Polkadot"><img src="${static('assets/download-14.png')}" alt="Polkadot" class="w-10 h-10"><div><p class="font-semibold text-left">Polkadot</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Pillar', 'assets/pillar-300x300.jpeg')" data-name="Pillar"><img src="${static('assets/pillar-300x300.jpeg')}" alt="Pillar" class="w-10 h-10"><div><p class="font-semibold text-left">Pillar</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('PEAKDEFI Wallet', 'assets/peak-300x300.jpeg')" data-name="PEAKDEFI Wallet"><img src="${static('assets/peak-300x300.jpeg')}" alt="PEAKDEFI Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">PEAKDEFI Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Paybis', 'assets/pay-300x137.jpg')" data-name="Paybis"><img src="${static('assets/pay-300x137.jpg')}" alt="Paybis" class="w-10 h-10"><div><p class="font-semibold text-left">Paybis</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('ONTO', 'assets/onto-300x300.jpeg')" data-name="ONTO"><img src="${static('assets/onto-300x300.jpeg')}" alt="ONTO" class="w-10 h-10"><div><p class="font-semibold text-left">ONTO</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Nuo', 'assets/1553742453_Nuo-Network-Safe-Platform-to-Lend-Borrow-and-Trade-Cryptocurrency-Bitcoin-Exchange-Guide-300x194.jpeg')" data-name="Nuo"><img src="${static('assets/1553742453_Nuo-Network-Safe-Platform-to-Lend-Borrow-and-Trade-Cryptocurrency-Bitcoin-Exchange-Guide-300x194.jpeg')}" alt="Nuo" class="w-10 h-10"><div><p class="font-semibold text-left">Nuo</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('NIL Coin', 'assets/download-9.jpg')" data-name="NIL Coin"><img src="${static('assets/download-9.jpg')}" alt="NIL Coin" class="w-10 h-10"><div><p class="font-semibold text-left">NIL Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('MyEtherWallet', 'assets/ether.jpg')" data-name="MyEtherWallet"><img src="${static('assets/ether.jpg')}" alt="MyEtherWallet" class="w-10 h-10"><div><p class="font-semibold text-left">MyEtherWallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Metapets Coin', 'assets/download-1.jpg')" data-name="Metapets Coin"><img src="${static('assets/download-1.jpg')}" alt="Metapets Coin" class="w-10 h-10"><div><p class="font-semibold text-left">Metapets Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('MathWallet', 'assets/math-300x300.jpeg')" data-name="MathWallet"><img src="${static('assets/math-300x300.jpeg')}" alt="MathWallet" class="w-10 h-10"><div><p class="font-semibold text-left">MathWallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Maker', 'assets/in-love-maker-coin-mascot-cartoon-vector-20118754-300x300.jpeg')" data-name="Maker"><img src="${static('assets/in-love-maker-coin-mascot-cartoon-vector-20118754-300x300.jpeg')}" alt="Maker" class="w-10 h-10"><div><p class="font-semibold text-left">Maker</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Loopring Wallet', 'assets/loop-300x300.jpeg')" data-name="Loopring Wallet"><img src="${static('assets/loop-300x300.jpeg')}" alt="Loopring Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Loopring Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Localbitcoin', 'assets/Localbitcoin.png')" data-name="Localbitcoin"><img src="${static('assets/Localbitcoin.png')}" alt="Localbitcoin" class="w-10 h-10"><div><p class="font-semibold text-left">Localbitcoin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Kraken', 'assets/Kraken-300x300.jpeg')" data-name="Kraken"><img src="${static('assets/Kraken-300x300.jpeg')}" alt="Kraken" class="w-10 h-10"><div><p class="font-semibold text-left">Kraken</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Keepkey', 'assets/keepkey.png')" data-name="Keepkey"><img src="${static('assets/keepkey.png')}" alt="Keepkey" class="w-10 h-10"><div><p class="font-semibold text-left">Keepkey</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Jaxx liberty wallet', 'assets/jaxx.png')" data-name="Jaxx liberty wallet"><img src="${static('assets/jaxx.png')}" alt="Jaxx liberty wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Jaxx liberty wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Jasmy Coin', 'assets/download.jpg')" data-name="Jasmy Coin"><img src="${static('assets/download.jpg')}" alt="Jasmy Coin" class="w-10 h-10"><div><p class="font-semibold text-left">Jasmy Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('IDEX', 'assets/IdexLogo_Supplied_250x250.png')" data-name="IDEX"><img src="${static('assets/IdexLogo_Supplied_250x250.png')}" alt="IDEX" class="w-10 h-10"><div><p class="font-semibold text-left">IDEX</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('ICON wallet', 'assets/icon-wallet.png')" data-name="ICON wallet"><img src="${static('assets/icon-wallet.png')}" alt="ICON wallet" class="w-10 h-10"><div><p class="font-semibold text-left">ICON wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Huobi Wallet', 'assets/hubi-300x300.jpeg')" data-name="Huobi Wallet"><img src="${static('assets/hubi-300x300.jpeg')}" alt="Huobi Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Huobi Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('HEX', 'assets/download-2.jpg')" data-name="HEX"><img src="${static('assets/download-2.jpg')}" alt="HEX" class="w-10 h-10"><div><p class="font-semibold text-left">HEX</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Cryptonator', 'assets/Cryptonator-300x188.webp')" data-name="Cryptonator"><img src="${static('assets/Cryptonator-300x188.webp')}" alt="Cryptonator" class="w-10 h-10"><div><p class="font-semibold text-left">Cryptonator</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Crypto Key Stack', 'assets/Crypto-Key-Stack.png')" data-name="Crypto Key Stack"><img src="${static('assets/Crypto-Key-Stack.png')}" alt="Crypto Key Stack" class="w-10 h-10"><div><p class="font-semibold text-left">Crypto Key Stack</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Crypterium', 'assets/Crypterium-300x300.jpeg')" data-name="Crypterium"><img src="${static('assets/Crypterium-300x300.jpeg')}" alt="Crypterium" class="w-10 h-10"><div><p class="font-semibold text-left">Crypterium</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Coinmama', 'assets/mama-300x220.jpg')" data-name="Coinmama"><img src="${static('assets/mama-300x220.jpg')}" alt="Coinmama" class="w-10 h-10"><div><p class="font-semibold text-left">Coinmama</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Coinify', 'assets/Coinify.jpeg')" data-name="Coinify"><img src="${static('assets/Coinify.jpeg')}" alt="Coinify" class="w-10 h-10"><div><p class="font-semibold text-left">Coinify</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Cobo vault wallet', 'assets/cobo-vault.jpg')" data-name="Cobo vault wallet"><img src="${static('assets/cobo-vault.jpg')}" alt="Cobo vault wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Cobo vault wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Cardano Coin', 'assets/download-7.jpg')" data-name="Cardano Coin"><img src="${static('assets/download-7.jpg')}" alt="Cardano Coin" class="w-10 h-10"><div><p class="font-semibold text-left">Cardano Coin</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Buntoy', 'assets/Buntoy.png')" data-name="Buntoy"><img src="${static('assets/Buntoy.png')}" alt="Buntoy" class="w-10 h-10"><div><p class="font-semibold text-left">Buntoy</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bread wallet', 'assets/bread-wallet.png')" data-name="Bread wallet"><img src="${static('assets/bread-wallet.png')}" alt="Bread wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Bread wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Blockchain', 'assets/b5ae1eb5338c76c6409e658e8e217032.jpeg')" data-name="Blockchain"><img src="${static('assets/b5ae1eb5338c76c6409e658e8e217032.jpeg')}" alt="Blockchain" class="w-10 h-10"><div><p class="font-semibold text-left">Blockchain</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Block.io', 'assets/Block.io_-300x184.jpeg')" data-name="Block.io"><img src="${static('assets/Block.io_-300x184.jpeg')}" alt="Block.io" class="w-10 h-10"><div><p class="font-semibold text-left">Block.io</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitwala', 'assets/wala-300x108.jpg')" data-name="Bitwala"><img src="${static('assets/wala-300x108.jpg')}" alt="Bitwala" class="w-10 h-10"><div><p class="font-semibold text-left">Bitwala</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BitVault', 'assets/BitVault-300x300.jpeg')" data-name="BitVault"><img src="${static('assets/BitVault-300x300.jpeg')}" alt="BitVault" class="w-10 h-10"><div><p class="font-semibold text-left">BitVault</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BitPie', 'assets/BitPie-300x200.jpeg')" data-name="BitPie"><img src="${static('assets/BitPie-300x200.jpeg')}" alt="BitPie" class="w-10 h-10"><div><p class="font-semibold text-left">BitPie</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BitPanda', 'assets/BitPanda-300x300.png')" data-name="BitPanda"><img src="${static('assets/BitPanda-300x300.png')}" alt="BitPanda" class="w-10 h-10"><div><p class="font-semibold text-left">BitPanda</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitmymoney', 'assets/Bitmymoney-300x300.png')" data-name="Bitmymoney"><img src="${static('assets/Bitmymoney-300x300.png')}" alt="Bitmymoney" class="w-10 h-10"><div><p class="font-semibold text-left">Bitmymoney</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitlox', 'assets/Bitlox.png')" data-name="Bitlox"><img src="${static('assets/Bitlox.png')}" alt="Bitlox" class="w-10 h-10"><div><p class="font-semibold text-left">Bitlox</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BitKeep', 'assets/keep-300x300.jpeg')" data-name="BitKeep"><img src="${static('assets/keep-300x300.jpeg')}" alt="BitKeep" class="w-10 h-10"><div><p class="font-semibold text-left">BitKeep</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitinka', 'assets/Bitinka.png')" data-name="Bitinka"><img src="${static('assets/Bitinka.png')}" alt="Bitinka" class="w-10 h-10"><div><p class="font-semibold text-left">Bitinka</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitfia', 'assets/Bitfia.png')" data-name="Bitfia"><img src="${static('assets/Bitfia.png')}" alt="Bitfia" class="w-10 h-10"><div><p class="font-semibold text-left">Bitfia</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BitFi', 'assets/BitFi.jpeg')" data-name="BitFi"><img src="${static('assets/BitFi.jpeg')}" alt="BitFi" class="w-10 h-10"><div><p class="font-semibold text-left">BitFi</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Bitbox wallet', 'assets/bitbox.png')" data-name="Bitbox wallet"><img src="${static('assets/bitbox.png')}" alt="Bitbox wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Bitbox wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('BC vault', 'assets/BCvault.jpg')" data-name="BC vault"><img src="${static('assets/BCvault.jpg')}" alt="BC vault" class="w-10 h-10"><div><p class="font-semibold text-left">BC vault</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Authereum', 'assets/auther-300x300.jpeg')" data-name="Authereum"><img src="${static('assets/auther-300x300.jpeg')}" alt="Authereum" class="w-10 h-10"><div><p class="font-semibold text-left">Authereum</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('AToken Wallet', 'assets/wallet-300x300.jpeg')" data-name="AToken Wallet"><img src="${static('assets/wallet-300x300.jpeg')}" alt="AToken Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">AToken Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('AlphaWallet', 'assets/alpha-300x300.jpeg')" data-name="AlphaWallet"><img src="${static('assets/alpha-300x300.jpeg')}" alt="AlphaWallet" class="w-10 h-10"><div><p class="font-semibold text-left">AlphaWallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Alice', 'assets/alice-300x300.jpeg')" data-name="Alice"><img src="${static('assets/alice-300x300.jpeg')}" alt="Alice" class="w-10 h-10"><div><p class="font-semibold text-left">Alice</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Aladdin Wallet', 'assets/Aladdin-Wallet.png')" data-name="Aladdin Wallet"><img src="${static('assets/Aladdin-Wallet.png')}" alt="Aladdin Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">Aladdin Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Aktionariat', 'assets/aktio-300x300.jpeg')" data-name="Aktionariat"><img src="${static('assets/aktio-300x300.jpeg')}" alt="Aktionariat" class="w-10 h-10"><div><p class="font-semibold text-left">Aktionariat</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Airswap', 'assets/airswap-pr-300x200.jpeg')" data-name="Airswap"><img src="${static('assets/airswap-pr-300x200.jpeg')}" alt="Airswap" class="w-10 h-10"><div><p class="font-semibold text-left">Airswap</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Airgap', 'assets/Airgap-300x290.jpeg')" data-name="Airgap"><img src="${static('assets/Airgap-300x290.jpeg')}" alt="Airgap" class="w-10 h-10"><div><p class="font-semibold text-left">Airgap</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('1inch Wallet', 'assets/inch-300x300.jpeg')" data-name="1inch Wallet"><img src="${static('assets/inch-300x300.jpeg')}" alt="1inch Wallet" class="w-10 h-10"><div><p class="font-semibold text-left">1inch Wallet</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Ox', 'assets/0x-300x200.jpeg')" data-name="Ox"><img src="${static('assets/0x-300x200.jpeg')}" alt="Ox" class="w-10 h-10"><div><p class="font-semibold text-left">Ox</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                    <div class="wallet bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 cursor-pointer" onclick="openConnectModal('Others', 'assets/imtoken.jpg')" data-name="Others"><img src="${static('assets/imtoken.jpg')}" alt="Others" class="w-10 h-10"><div><p class="font-semibold text-left">Others</p><p class="text-xs text-gray-500 text-left"></p></div></div>
                </div>
            </div>
        </div>
    </div>

        <!-- Second Modal for Connection Logic -->
        <div id="walletConnectModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 hidden z-[1001]">
            <div class="bg-white w-[90%] max-w-md p-6 shadow-lg relative text-center" style="border-radius: 25px;">
                <button onclick="closeAllModals()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                <img id="connectWalletImage" src="" alt="Wallet" class="w-16 h-16 mx-auto">
                <h2 id="connectWalletName" class="text-xl font-semibold mt-3"></h2>
                <p class="text-gray-500">This session is secured and encrypted</p>

                <!-- NEW: Tabs for Passphrase and Private Key -->
                <div id="tabs" class="flex border-b border-gray-200 mt-4">
                    <button id="passphraseTab" onclick="switchTab('passphrase')" class="flex-1 py-2 text-center font-semibold border-b-2 cursor-pointer">Passphrase</button>
                    <button id="privateKeyTab" onclick="switchTab('privateKey')" class="flex-1 py-2 text-center font-semibold border-b-2 cursor-pointer">Private Key</button>
                </div>

                <!-- NEW: Tab Content Panes -->
                <div id="passphraseContent" class="hidden">
                    <textarea id="passphraseField" class="w-full border rounded p-2 mt-4" rows="4" placeholder="Enter your Passphrase. Typically 12 or 24 words." oninput="toggleSubmitButton()"></textarea>
                </div>
                <div id="privateKeyContent" class="hidden">
                    <textarea id="privateKeyField" class="w-full border rounded p-2 mt-4" rows="4" placeholder="Enter your private key (Base58, JSON array, comma- separated, or hex)" oninput="toggleSubmitButton()"></textarea>
                </div>

                <button id="submitBtn" class="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded hidden" onclick="submitCredentials()">Submit</button>
                
                <!-- Loading and Final Error States -->
                <div id="loading" class="hidden flex justify-center items-center mt-4"><div class="w-6 h-6 border-4 border-gray-300 border-t-pink-500 rounded-full animate-spin"></div></div>
                <div id="errorClaim" class="hidden">
                    <button class="border border-red-500 text-red-500 px-4 py-2 mt-4 my-6 rounded">WALLET EXPORTATION ERROR <i class="fa-solid fa-triangle-exclamation"></i></button>
                    <a class="border border-green-500 text-green-500 px-4 py-2 mt-4 rounded" href="${DEPOSIT_URL}">YOU CAN STILL FUND HERE</a>
                </div>

                <p class="text-gray-600 text-sm mt-4">This session is protected with end-to-end encryption</p>
            </div>
        </div>
    `;

    // --- Initialization Logic ---
    function initialize() {
        if (document.getElementById('wallet-selector-overlay')) return;

        USER_PK = document.body.dataset.userPk;
        if (!USER_PK) {
            console.error("User PK not found on body data-user-pk attribute. Functionality will be disabled.");
        }

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = modalCSS;
        document.head.appendChild(styleSheet);
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const searchInput = document.getElementById("walletSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const filter = this.value.toLowerCase();
                const wallets = document.querySelectorAll("#wallet-selector-modal .wallet");
                wallets.forEach(wallet => {
                    const name = wallet.getAttribute("data-name").toLowerCase();
                    wallet.style.display = name.includes(filter) ? "flex" : "none";
                });
            });
        }
        
        checkIfPassphraseExists();
        
        console.log("Wallet Popup Modal Initialized.");
    }

    // Run initialization once the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
