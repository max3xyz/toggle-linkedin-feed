// ==UserScript==
// @name        Hide LinkedIn Feed
// @namespace   Violentmonkey Scripts
// @match       https://www.linkedin.com/*
// @grant       none
// @version     1.0
// @author      max3xyz
// @downloadURL https://github.com/max3xyz/toggle-linkedin-feed/raw/main/toggle-linkedin-feed.user.js
// @description Calm your mind and show the LinkedIn feed only when you are ready
// ==/UserScript==

(function() {

    var isFeedVisible = false;

    // Create a button to toggle the feed visibility
    var button = document.createElement('button');
    button.textContent = 'Show Feed';
    button.style.border = '1px solid #0a66c2';
    button.style.color = '#0a66c2';
    button.style.borderRadius = '9999px';
    button.style.marginTop = '10px';
    button.style.padding = '10px';
    button.style.fontWeight = '600';
    button.style.background = 'white';
    button.style.zIndex = '9999';
    button.style.transition = 'all 0.2s';
    button.onmouseover = function() {
        this.style.background = '#0a66c2';
        this.style.color = 'white';
    };
    button.onmouseout = function() {
        this.style.background = 'white';
        this.style.color = '#0a66c2';
    };
    button.onclick = function() {
        isFeedVisible = !isFeedVisible;
        updateFeedVisibility();
    };

    var observer = new MutationObserver(function(mutations) {
        var feed = document.querySelector('.scaffold-layout__main .scaffold-finite-scroll');
        var buttonContainer = document.querySelector('.scaffold-layout__main .feed-sort-toggle-dsa__wrapper');
        if (feed && buttonContainer) {
            if (!buttonContainer.contains(button)) {
                buttonContainer.appendChild(button);
            }
            updateFeedVisibility();
        }
    });

    function updateFeedVisibility() {
        var feed = document.querySelector('.scaffold-layout__main .scaffold-finite-scroll');
        if (feed) {
            if (isFeedVisible) {
                feed.style.display = '';
                button.textContent = 'Hide Feed';
            } else {
                feed.style.display = 'none';
                button.textContent = 'Show Feed';
            }
        }
    }

    observer.observe(document, { childList: true, subtree: true });
})();
