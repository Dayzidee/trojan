document.addEventListener('DOMContentLoaded', function () {
  const tabs = ['terminal', 'wallet'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (btn) {
      btn.addEventListener('click', () => switchTab(t));
    }
  });
});

function switchTab(tabId) {
  // Update Tab Buttons
  const tabs = ['terminal', 'wallet'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (btn) {
      if (t === tabId) {
        btn.classList.add('text-text-primary', 'bg-bg-surface2', 'rounded-6');
        btn.classList.remove('text-text-tertiary');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('text-text-primary', 'bg-bg-surface2', 'rounded-6');
        btn.classList.add('text-text-tertiary');
        btn.setAttribute('aria-selected', 'false');
      }
    }
  });

  // Update Views
  const terminalIds = ['trading-column', 'swap-column'];
  const walletId = 'wallet-view';

  if (tabId === 'terminal') {
    terminalIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });
    const wallet = document.getElementById(walletId);
    if (wallet) wallet.classList.add('hidden');
  } else if (tabId === 'wallet') {
    terminalIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    const wallet = document.getElementById(walletId);
    if (wallet) wallet.classList.remove('hidden');
  }
}
