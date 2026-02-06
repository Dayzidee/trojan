(function() {
    // Get parameter from URL
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lan");

    // Function to update links with lan parameter
    function updateLinks(language) {
        if (!language) return;
        const links = document.querySelectorAll("a[href]");

        links.forEach(link => {
            const href = link.getAttribute("href");

            // Skip external links, anchors, and javascript:void(0)
            if (
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("#") ||
                href.startsWith("javascript:")
            ) {
                return;
            }

            const linkUrl = new URL(href, window.location.origin);

            // Set or replace the 'lan' parameter
            linkUrl.searchParams.set("lan", language);
            link.setAttribute("href", linkUrl.pathname + "?" + linkUrl.searchParams.toString());
        });
    }

    // Apply URL language directly without saving or loading from cache
    if (urlLang) {
        updateLinks(urlLang);
    }
})();
