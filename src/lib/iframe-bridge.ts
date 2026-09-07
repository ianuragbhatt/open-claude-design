export const IFRAME_BRIDGE_SCRIPT = `
<script id="claude-design-bridge">
(function() {
  var mode = 'interact'; // 'interact' or 'inspect'
  var hoveredEl = null;

  var style = document.createElement('style');
  style.id = 'claude-design-bridge-styles';
  style.textContent = \`
    .cd-inspect-hover {
      outline: 2px solid #f59e0b !important;
      outline-offset: -2px !important;
      cursor: crosshair !important;
      background-color: rgba(245, 158, 11, 0.08) !important;
    }
  \`;
  document.head.appendChild(style);

  window.addEventListener('message', function(e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'SET_MODE') {
      mode = e.data.mode;
      if (mode === 'interact' && hoveredEl) {
        hoveredEl.classList.remove('cd-inspect-hover');
        hoveredEl = null;
      }
    }
  });

  document.addEventListener('mouseover', function(e) {
    if (mode !== 'inspect') return;
    var target = e.target;
    if (!target || target === document.body || target === document.documentElement) return;
    if (hoveredEl && hoveredEl !== target) {
      hoveredEl.classList.remove('cd-inspect-hover');
    }
    hoveredEl = target;
    hoveredEl.classList.add('cd-inspect-hover');
  }, true);

  document.addEventListener('mouseout', function(e) {
    if (mode !== 'inspect') return;
    var target = e.target;
    if (target && target.classList) {
      target.classList.remove('cd-inspect-hover');
    }
  }, true);

  document.addEventListener('click', function(e) {
    if (mode !== 'inspect') return;
    e.preventDefault();
    e.stopPropagation();

    var target = e.target;
    if (!target) return;

    var elementName = target.getAttribute('data-cd-element') || 
                      target.id || 
                      (target.tagName.toLowerCase() + (target.className ? '.' + target.className.split(' ')[0] : ''));

    var textSnippet = (target.innerText || target.textContent || '').trim().slice(0, 80);
    
    var selector = target.tagName.toLowerCase();
    if (target.id) {
      selector += '#' + target.id;
    } else if (target.getAttribute('data-cd-element')) {
      selector += '[data-cd-element="' + target.getAttribute('data-cd-element') + '"]';
    }

    window.parent.postMessage({
      type: 'ELEMENT_SELECTED',
      elementName: elementName,
      selector: selector,
      textSnippet: textSnippet
    }, '*');
  }, true);

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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
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
  if (!processed.includes("claude-design-bridge")) {
    if (processed.includes("</body>")) {
      processed = processed.replace("</body>", `${IFRAME_BRIDGE_SCRIPT}\n</body>`);
    } else {
      processed += IFRAME_BRIDGE_SCRIPT;
    }
  }

  return processed;
}
