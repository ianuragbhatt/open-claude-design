export const IFRAME_BRIDGE_SCRIPT = `
<script id="khayal-bridge">
(function() {
  var mode = 'interact'; // 'interact' or 'inspect'
  var hoveredEl = null;
  var selectedEl = null;

  var style = document.createElement('style');
  style.id = 'khayal-bridge-styles';
  style.textContent = \`
    .khayal-inspect-hover {
      outline: 2px solid #d97757 !important;
      outline-offset: -2px !important;
      cursor: crosshair !important;
      background-color: rgba(217, 119, 87, 0.12) !important;
      transition: outline 0.1s ease, background-color 0.1s ease !important;
    }
    .khayal-inspect-selected {
      outline: 2px solid #d97757 !important;
      outline-offset: -2px !important;
      background-color: rgba(217, 119, 87, 0.18) !important;
      box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.25) !important;
    }
  \`;
  document.head.appendChild(style);

  window.addEventListener('message', function(e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'SET_MODE') {
      mode = e.data.mode;
      if (mode === 'interact' && hoveredEl) {
        hoveredEl.classList.remove('khayal-inspect-hover');
        hoveredEl = null;
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
    var target = e.target;
    if (!target || target === document.body || target === document.documentElement) return;
    if (hoveredEl && hoveredEl !== target) {
      hoveredEl.classList.remove('khayal-inspect-hover');
    }
    hoveredEl = target;
    hoveredEl.classList.add('khayal-inspect-hover');
  }, true);

  document.addEventListener('mouseout', function(e) {
    if (mode !== 'inspect') return;
    var target = e.target;
    if (target && target.classList) {
      target.classList.remove('khayal-inspect-hover');
    }
  }, true);

  document.addEventListener('click', function(e) {
    if (mode !== 'inspect') return;
    e.preventDefault();
    e.stopPropagation();

    var target = e.target;
    if (!target) return;

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
