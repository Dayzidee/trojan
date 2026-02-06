document.addEventListener('DOMContentLoaded', () => {

            // --- Light/Dark Mode Toggle Logic ---
            const themeToggleBtn = document.getElementById('theme-toggle');
            const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
            const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
            const htmlElement = document.documentElement;
            
            const toggleTheme = () => { 
                htmlElement.classList.toggle('dark'); 
                localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light'); 
                updateIcon(); 
            };
            
            const updateIcon = () => { 
                if (htmlElement.classList.contains('dark')) { 
                    themeToggleLightIcon.classList.add('hidden'); 
                    themeToggleDarkIcon.classList.remove('hidden'); 
                } else { 
                    themeToggleDarkIcon.classList.add('hidden'); 
                    themeToggleLightIcon.classList.remove('hidden'); 
                } 
            };
            
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { 
                htmlElement.classList.add('dark'); 
            } else { 
                htmlElement.classList.remove('dark'); 
            }
            
            updateIcon();
            themeToggleBtn.addEventListener('click', toggleTheme);
            
            // --- Rank Benefits Tabs Logic ---
            const tabContainer = document.getElementById('rank-benefits-card');
            const tabs = tabContainer.querySelectorAll('.rank-tab');
            const contents = tabContainer.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.getAttribute('data-tab');

                    tabs.forEach(t => {
                        t.classList.remove('text-gray-900', 'dark:text-white', 'border', 'border-gray-400', 'dark:border-gray-500');
                    });
                    tab.classList.add('text-gray-900', 'dark:text-white', 'border', 'border-gray-400', 'dark:border-gray-500');

                    contents.forEach(content => {
                        if (content.id === `${target}-content`) {
                            content.classList.remove('hidden');
                        } else {
                            content.classList.add('hidden');
                        }
                    });
                });
            });
        });
   