document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const API_ENDPOINT = 'http://192.168.1.30:8000/creator/form/add';
    const MAX_PLATFORMS = 9;
    const PLATFORMS = [
        'Twitter (X)', 'Instagram', 'TikTok', 'YouTube',
        'Facebook', 'Telegram', 'Reddit', 'LinkedIn',
        'Twitch', 'Discord'
    ];
    
    // --- NEW: Function to get CSRF token from cookies ---
    // This is the standard function recommended by Django's documentation
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrfToken = getCookie('csrftoken');


    // --- ELEMENT SELECTION ---
    const applyButton = document.getElementById('apply-creator-btn');

    if (!applyButton) {
        console.error('Creator application button with id "apply-creator-btn" not found.');
        return;
    }

    const userPk = applyButton.dataset.userPk;
    if (!userPk) {
        console.error('The apply button is missing the "data-user-pk" attribute.');
        return;
    }

    // --- MODAL CREATION ---
    function createModal() {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'creator-modal';
        modalContainer.className = 'hidden fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-50 p-4 pt-12 sm:items-center sm:pt-4';
        
        const platformCheckboxesHTML = PLATFORMS.map(platform => `
            <label class="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <input type="checkbox" name="platforms" value="${platform}" class="form-checkbox h-5 w-5 rounded text-blue-600 bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 focus:ring-blue-500">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">${platform}</span>
            </label>
        `).join('');

        modalContainer.innerHTML = `
            <div id="creator-modal-content" class="bg-white dark:bg-[#1C1C1E] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl transform transition-all" role="dialog" aria-modal="true">
                <div class="sticky top-0 bg-white dark:bg-[#1C1C1E] p-6 pb-4 z-10 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Creator Application</h2>
                    <button id="creator-modal-close" type="button" class="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-3xl font-light leading-none">&times;</button>
                </div>
                <form id="creator-form" class="p-6 space-y-5">
                    <!-- Basic Info -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input type="text" id="name" name="name" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="tg_handle" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telegram Handle (e.g., @username)</label>
                        <input type="text" id="tg_handle" name="tg_handle" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input type="email" id="email" name="email" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="region" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region / Country</label>
                        <input type="text" id="region" name="region" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="content_niche" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content Niche (e.g., Crypto, Gaming, Tech)</label>
                        <input type="text" id="content_niche" name="content_niche" required class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    </div>

                    <!-- Platform Selection -->
                    <div class="space-y-3 pt-2">
                        <label class="block text-sm font-semibold text-gray-800 dark:text-gray-200">Social Platforms (Select multiple)</label>
                        <div id="platform-checkboxes" class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            ${platformCheckboxesHTML}
                        </div>
                        <p id="platform-error" class="text-red-500 text-xs hidden">You can select a maximum of ${MAX_PLATFORMS} platforms.</p>
                    </div>

                    <!-- Dynamic Platform Inputs -->
                    <div id="platform-inputs-container" class="space-y-6"></div>
                    
                    <div class="pt-4">
                        <button type="submit" id="creator-form-submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-black disabled:bg-gray-400 dark:disabled:bg-gray-600">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modalContainer);
    }
    
    createModal();

    // --- MODAL ELEMENTS (post-creation) ---
    const modal = document.getElementById('creator-modal');
    const modalContent = document.getElementById('creator-modal-content');
    const closeButton = document.getElementById('creator-modal-close');
    const form = document.getElementById('creator-form');
    const platformCheckboxesContainer = document.getElementById('platform-checkboxes');
    const platformInputsContainer = document.getElementById('platform-inputs-container');
    const platformError = document.getElementById('platform-error');
    const submitButton = document.getElementById('creator-form-submit-btn');

    // --- MODAL VISIBILITY ---
    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        form.reset(); 
        platformInputsContainer.innerHTML = '';
    }

    // --- EVENT LISTENERS ---
    applyButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- PLATFORM SELECTION LOGIC ---
    platformCheckboxesContainer.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const platformName = e.target.value;
            const checkedCheckboxes = platformCheckboxesContainer.querySelectorAll('input[type="checkbox"]:checked');

            if (checkedCheckboxes.length > MAX_PLATFORMS) {
                e.target.checked = false;
                platformError.classList.remove('hidden');
                setTimeout(() => platformError.classList.add('hidden'), 3000);
                return;
            }

            if (e.target.checked) {
                addPlatformInputs(platformName);
            } else {
                removePlatformInputs(platformName);
            }
        }
    });

    function addPlatformInputs(platform) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'platform-input-group border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 animate-fade-in';
        inputGroup.dataset.platformGroup = platform;

        const sanitizedPlatformName = platform.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        inputGroup.innerHTML = `
            <h3 class="font-semibold text-md text-gray-800 dark:text-gray-200">${platform} Details</h3>
            <div>
                <label for="${sanitizedPlatformName}_url" class="sr-only">Profile URL</label>
                <input type="url" id="${sanitizedPlatformName}_url" name="${sanitizedPlatformName}_url" placeholder="Profile URL" required class="w-full text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
                <label for="${sanitizedPlatformName}_followers" class="sr-only">Followers</label>
                <input type="number" min="0" id="${sanitizedPlatformName}_followers" name="${sanitizedPlatformName}_followers" placeholder="Followers" required class="w-full text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
                <label for="${sanitizedPlatformName}_engagement" class="sr-only">Average Engagement</label>
                <input type="text" id="${sanitizedPlatformName}_engagement" name="${sanitizedPlatformName}_engagement" placeholder="Average engagement per post" required class="w-full text-sm px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            </div>
        `;
        platformInputsContainer.appendChild(inputGroup);
    }

    function removePlatformInputs(platform) {
        const groupToRemove = platformInputsContainer.querySelector(`[data-platform-group="${platform}"]`);
        if (groupToRemove) {
            groupToRemove.remove();
        }
    }

    // --- FORM SUBMISSION LOGIC ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const basicData = new FormData(form);
        const payload = {
            name: basicData.get('name'),
            tg_handle: basicData.get('tg_handle'),
            email: basicData.get('email'),
            region: basicData.get('region'),
            content_niche: basicData.get('content_niche'),
            user: userPk
        };

        const platformInfo = [];
        const selectedPlatforms = platformInputsContainer.querySelectorAll('.platform-input-group');
        
        selectedPlatforms.forEach(group => {
            const platformName = group.dataset.platformGroup;
            const sanitizedPlatformName = platformName.toLowerCase().replace(/[^a-z0-9]/g, '');

            platformInfo.push({
                platform: platformName,
                url: group.querySelector(`input[name="${sanitizedPlatformName}_url"]`).value,
                followers: parseInt(group.querySelector(`input[name="${sanitizedPlatformName}_followers"]`).value, 10),
                engagement: group.querySelector(`input[name="${sanitizedPlatformName}_engagement"]`).value
            });
        });

        if (platformInfo.length === 0) {
            alert('Please select at least one social platform.');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Application';
            return;
        }

        payload.platform_info = JSON.stringify(platformInfo);

        // --- MODIFIED: Added CSRF token to headers ---
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // The crucial line
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'An unknown server error occurred.' }));
                throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
            }

            alert('Application submitted successfully!');
            closeModal();

        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Failed to submit application: ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Application';
        }
    });

    // --- Add simple fade-in animation style ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

});