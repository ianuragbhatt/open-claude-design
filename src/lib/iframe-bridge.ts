export const IFRAME_BRIDGE_SCRIPT = `
<script id="khayal-bridge">
(function() {
  var mode = 'interact'; // 'interact' or 'inspect'
  var hoveredEl = null;
  var selectedEl = null;

  var style = document.createElement('style');
  style.id = 'khayal-bridge-styles';
  style.textContent = \`
    body.khayal-inspect-active, body.khayal-inspect-active * {
      cursor: crosshair !important;
    }
    .khayal-inspect-hover {
      outline: 2px solid #d97757 !important;
      outline-offset: -2px !important;
      background-color: rgba(217, 119, 87, 0.14) !important;
      transition: outline 0.1s ease, background-color 0.1s ease !important;
    }
    .khayal-inspect-selected {
      outline: 2px solid #d97757 !important;
      outline-offset: -2px !important;
      background-color: rgba(217, 119, 87, 0.22) !important;
      box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.3) !important;
    }
  \`;
  document.head.appendChild(style);

  function resolveTargetElement(el) {
    if (!el || el === document.body || el === document.documentElement) return null;
    var curr = el;
    while (curr && curr !== document.body && curr !== document.documentElement) {
      if (curr.getAttribute && (curr.getAttribute('data-khayal-element') || curr.getAttribute('data-cd-element') || curr.id)) {
        return curr;
      }
      var tag = curr.tagName.toLowerCase();
      if (['button', 'a', 'header', 'nav', 'section', 'aside', 'main', 'footer', 'form', 'article'].indexOf(tag) !== -1) {
        return curr;
      }
      if (curr.classList && (curr.classList.contains('card') || curr.classList.contains('vault-card') || curr.classList.contains('budget-card') || curr.classList.contains('btn'))) {
        return curr;
      }
      curr = curr.parentElement;
    }
    return el;
  }

  window.addEventListener('message', function(e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'SET_MODE') {
      mode = e.data.mode;
      if (mode === 'inspect') {
        document.body.classList.add('khayal-inspect-active');
      } else {
        document.body.classList.remove('khayal-inspect-active');
        if (hoveredEl) {
          hoveredEl.classList.remove('khayal-inspect-hover');
          hoveredEl = null;
        }
      }
    } else if (e.data.type === 'CLEAR_SELECTION') {
      if (selectedEl) {
        selectedEl.classList.remove('khayal-inspect-selected');
        selectedEl = null;
      }
    } else if (e.data.type === 'SET_THEME') {
      if (e.data.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (e.data.theme === 'light') {
        document.documentElement.classList.remove('dark');
      }
    } else if (e.data.type === 'UPDATE_TOKENS' && e.data.tokens) {
      for (var k in e.data.tokens) {
        document.documentElement.style.setProperty(k, e.data.tokens[k]);
      }
    }
  });

  document.addEventListener('mouseover', function(e) {
    if (mode !== 'inspect') return;
    var raw = e.target;
    var target = resolveTargetElement(raw) || raw;
    if (!target || target === document.body || target === document.documentElement) return;
    if (hoveredEl && hoveredEl !== target) {
      hoveredEl.classList.remove('khayal-inspect-hover');
    }
    hoveredEl = target;
    hoveredEl.classList.add('khayal-inspect-hover');
  }, true);

  document.addEventListener('mouseout', function(e) {
    if (mode !== 'inspect') return;
    var raw = e.target;
    var target = resolveTargetElement(raw) || raw;
    if (target && target.classList) {
      target.classList.remove('khayal-inspect-hover');
    }
  }, true);

  document.addEventListener('click', function(e) {
    if (mode !== 'inspect') return;
    e.preventDefault();
    e.stopPropagation();

    var raw = e.target;
    if (!raw) return;
    var target = resolveTargetElement(raw) || raw;
    if (!target || target === document.body || target === document.documentElement) return;

    if (selectedEl && selectedEl !== target) {
      selectedEl.classList.remove('khayal-inspect-selected');
    }
    selectedEl = target;
    selectedEl.classList.add('khayal-inspect-selected');

    var customElementTag = target.getAttribute('data-khayal-element') || target.getAttribute('data-cd-element');
    var elementName = customElementTag || 
                      target.id || 
                      (target.tagName.toLowerCase() + (target.className && typeof target.className === 'string' ? '.' + target.className.split(' ')[0] : ''));

    var textSnippet = (target.innerText || target.textContent || '').trim().slice(0, 80);
    
    var selector = target.tagName.toLowerCase();
    if (target.id) {
      selector += '#' + target.id;
    } else if (target.getAttribute('data-khayal-element')) {
      selector += '[data-khayal-element="' + target.getAttribute('data-khayal-element') + '"]';
    } else if (target.getAttribute('data-cd-element')) {
      selector += '[data-cd-element="' + target.getAttribute('data-cd-element') + '"]';
    }

    // Build ancestor breadcrumb path
    var path = [];
    var curr = target;
    while (curr && curr !== document.body && curr !== document.documentElement && path.length < 3) {
      var tag = curr.getAttribute('data-khayal-element') || curr.id || curr.tagName.toLowerCase();
      path.unshift(tag);
      curr = curr.parentElement;
    }

    window.parent.postMessage({
      type: 'ELEMENT_SELECTED',
      elementName: elementName,
      selector: selector,
      textSnippet: textSnippet,
      breadcrumbs: path.join(' > ')
    }, '*');
  }, true);

  // Auto-refresh Lucide icons on dynamic DOM modifications
  try {
    var iconObserver = new MutationObserver(function() {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
    iconObserver.observe(document.body, { childList: true, subtree: true });
  } catch(e) {}

  // Capture runtime errors and send to parent for agent self-healing
  window.addEventListener('error', function(e) {
    window.parent.postMessage({
      type: 'RUNTIME_ERROR',
      message: e.message || 'Script error',
      filename: e.filename || 'unknown',
      lineno: e.lineno,
      colno: e.colno
    }, '*');
  });

  window.addEventListener('unhandledrejection', function(e) {
    window.parent.postMessage({
      type: 'RUNTIME_ERROR',
      message: (e.reason && e.reason.message) || String(e.reason) || 'Unhandled promise rejection',
    }, '*');
  });

  // --- PRESENTATION MODE & LIVE REAL-TIME CROSS-TAB SYNC ---
  var isPresentMode = (window.top === window.self) || (window.location.search.indexOf('present=1') !== -1);
  var pathSegments = window.location.pathname.split('/');
  var wsIdx = pathSegments.indexOf('workspaces');
  var activeProjId = (wsIdx !== -1 && pathSegments[wsIdx + 1]) ? pathSegments[wsIdx + 1] : '';

  if (isPresentMode) {
    try {
      var badge = document.createElement('div');
      badge.id = 'khayal-present-badge';
      badge.style.cssText = 'position:fixed;top:14px;right:16px;z-index:999999;display:flex;align-items:center;gap:7px;background:rgba(18,19,25,0.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.14);padding:5px 11px;border-radius:9999px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;color:#f1f5f9;box-shadow:0 6px 20px rgba(0,0,0,0.4);user-select:none;transition:opacity 0.2s ease;opacity:0.85;';
      badge.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 6px #10b981;"></span><span style="font-weight:600;letter-spacing:0.02em;">Live Synced</span><span style="opacity:0.4;margin:0 1px;">|</span><span style="opacity:0.8;">Presentation</span><button id="khayal-present-reload-btn" title="Reload live preview" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;padding:2px;border-radius:4px;display:flex;align-items:center;margin-left:3px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg></button>';
      
      badge.addEventListener('mouseenter', function() { badge.style.opacity = '1'; });
      badge.addEventListener('mouseleave', function() { badge.style.opacity = '0.85'; });

      document.body.appendChild(badge);

      var reloadBtn = document.getElementById('khayal-present-reload-btn');
      if (reloadBtn) {
        reloadBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.location.reload();
        });
      }
    } catch(err) {}
  }

  var reloadDebounceTimer = null;
  function triggerLiveReload(source) {
    if (reloadDebounceTimer) clearTimeout(reloadDebounceTimer);
    
    if (isPresentMode) {
      var b = document.getElementById('khayal-present-badge');
      if (b) {
        b.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#d97757;display:inline-block;animation:pulse 1s infinite;"></span><span style="font-weight:600;color:#d97757;">Updating live changes...</span>';
      }
    }

    reloadDebounceTimer = setTimeout(function() {
      window.location.reload();
    }, isPresentMode ? 260 : 80);
  }

  if (activeProjId) {
    // 1. Inter-tab BroadcastChannel
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        var bc = new BroadcastChannel('khayal_workspace_' + activeProjId);
        bc.onmessage = function(ev) {
          if (ev && ev.data && (ev.data.type === 'RELOAD' || ev.data.type === 'CHANGE')) {
            triggerLiveReload('broadcast');
          }
        };
      }
    } catch(e) {}

    // 2. Inter-tab localStorage storage event fallback
    try {
      window.addEventListener('storage', function(ev) {
        if (ev.key === 'khayal_workspace_reload_' + activeProjId) {
          triggerLiveReload('storage');
        }
      });
    } catch(e) {}

    // 3. SSE live filesystem watcher stream
    try {
      if (typeof EventSource !== 'undefined') {
        var es = new EventSource('/api/workspaces/' + activeProjId + '/live');
        es.onmessage = function(ev) {
          if (!ev || !ev.data) return;
          try {
            var payload = JSON.parse(ev.data);
            if (payload.type === 'change') {
              triggerLiveReload('sse');
            }
          } catch(err) {}
        };
      }
    } catch(e) {}
  }

  // Notify parent that bridge is ready
  window.parent.postMessage({ type: 'BRIDGE_READY' }, '*');
})();
</script>
`;

export function injectBridgeIntoHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  let processed = rawHtml;

  // 1. If not a full HTML document, wrap it safely
  if (!processed.toLowerCase().includes("<!doctype html") && !processed.toLowerCase().includes("<html")) {
    processed = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
</head>
<body class="bg-neutral-900 text-neutral-100 min-h-screen">
  ${processed}
  <script>if (window.lucide) { lucide.createIcons(); }</script>
</body>
</html>`;
  } else {
    // 2. Full document: ensure Tailwind CDN and Lucide exist
    if (!processed.includes("cdn.tailwindcss.com") && processed.includes("<head>")) {
      processed = processed.replace(
        "<head>",
        `<head>\n  <script src="https://cdn.tailwindcss.com"></script>`
      );
    }
    if (!processed.includes("lucide") && processed.includes("<head>")) {
      processed = processed.replace(
        "<head>",
        `<head>\n  <script src="https://unpkg.com/lucide@latest"></script>`
      );
    }
    // Ensure lucide icon creation is triggered
    if (processed.includes("</body>") && !processed.includes("lucide.createIcons")) {
      processed = processed.replace(
        "</body>",
        `  <script>if (window.lucide) { lucide.createIcons(); }</script>\n</body>`
      );
    }
  }

  // 3. Inject our inspector bridge
  if (!processed.includes("khayal-bridge") && !processed.includes("open-claude-design-bridge")) {
    if (processed.includes("</body>")) {
      processed = processed.replace("</body>", `${IFRAME_BRIDGE_SCRIPT}\n</body>`);
    } else {
      processed += IFRAME_BRIDGE_SCRIPT;
    }
  }

  return processed;
}
