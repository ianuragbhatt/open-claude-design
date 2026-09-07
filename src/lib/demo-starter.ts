export const DEMO_PROJECT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anthropic Research & Synthesis Hub</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-editorial { font-family: 'Newsreader', Georgia, serif; }
    .terracotta-glow {
      background: radial-gradient(circle at 50% 0%, rgba(217, 119, 87, 0.12) 0%, transparent 65%);
    }
  </style>
</head>
<body class="bg-[#1c1c1f] text-[#edebe6] min-h-screen terracotta-glow antialiased selection:bg-[#d97757]/30 selection:text-white">
  
  <!-- Navigation Header -->
  <nav data-cd-element="navigation-bar" class="h-16 border-b border-[#383632] bg-[#1c1c1f]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#c96442] via-[#d97757] to-[#e28767] flex items-center justify-center shadow-lg shadow-[#d97757]/20">
          <i data-lucide="sparkles" class="w-4 h-4 text-white"></i>
        </div>
        <span class="font-editorial text-base tracking-tight text-white font-medium">Anthropic Research</span>
      </div>
      
      <div class="hidden md:flex items-center gap-1 text-xs">
        <button onclick="switchTab('overview')" id="tab-overview" class="px-3.5 py-1.5 rounded-lg bg-[#282724] text-white font-medium border border-[#383632] transition-colors">Overview</button>
        <button onclick="switchTab('syntheses')" id="tab-syntheses" class="px-3.5 py-1.5 rounded-lg text-[#9c988f] hover:text-white hover:bg-[#282724]/60 transition-colors">Syntheses</button>
        <button onclick="switchTab('evaluations')" id="tab-evaluations" class="px-3.5 py-1.5 rounded-lg text-[#9c988f] hover:text-white hover:bg-[#282724]/60 transition-colors">Evaluations</button>
        <button onclick="switchTab('datasets')" id="tab-datasets" class="px-3.5 py-1.5 rounded-lg text-[#9c988f] hover:text-white hover:bg-[#282724]/60 transition-colors">Datasets</button>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#282724] border border-[#383632] text-xs text-[#9c988f]">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-white font-medium">Cluster Alpha</span>
      </div>
      <button onclick="toggleModal()" data-cd-element="new-synthesis-cta" class="px-3.5 py-1.5 rounded-lg bg-[#d97757] hover:bg-[#e28767] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#d97757]/20">
        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
        <span>New Synthesis</span>
      </button>
    </div>
  </nav>

  <!-- Main Container -->
  <main class="max-w-6xl mx-auto px-6 py-8 space-y-8">
    
    <!-- Hero Header -->
    <header data-cd-element="hero-header" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#383632]">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-[#d97757]/15 text-[#e28767] border border-[#d97757]/30">
            Anthropic Research Lab
          </span>
          <span class="text-xs text-[#9c988f]">• Live Interpretability Suite</span>
        </div>
        <h1 class="font-editorial text-3xl font-medium tracking-tight text-white flex items-center gap-3">
          Frontier Alignment & Interpretability
        </h1>
        <p class="text-sm text-[#9c988f] mt-1.5 max-w-2xl">
          Monosemantic feature dictionaries and safety evaluations across frontier reasoning models.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="refreshMetrics()" class="px-3 py-2 rounded-lg bg-[#282724] hover:bg-[#33312b] border border-[#383632] text-xs text-white flex items-center gap-2 transition-colors">
          <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-[#9c988f]"></i>
          <span>Re-eval</span>
        </button>
        <button onclick="exportData()" class="px-3 py-2 rounded-lg bg-[#282724] hover:bg-[#33312b] border border-[#383632] text-xs text-white flex items-center gap-2 transition-colors">
          <i data-lucide="download" class="w-3.5 h-3.5 text-[#9c988f]"></i>
          <span>Export</span>
        </button>
      </div>
    </header>

    <!-- Metrics Bento Row -->
    <section data-cd-element="metrics-bento" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-[#282724] border border-[#383632] hover:border-[#d97757]/40 transition-colors">
        <div class="flex items-center justify-between text-[#9c988f] text-xs mb-3">
          <span>Active Monosemantic Features</span>
          <i data-lucide="cpu" class="w-4 h-4 text-[#d97757]"></i>
        </div>
        <div class="font-editorial text-2xl font-medium text-white">16.4 Million</div>
        <div class="text-xs text-emerald-400 mt-2 flex items-center gap-1">
          <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
          <span>+24.8% resolution gain</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#282724] border border-[#383632] hover:border-[#d97757]/40 transition-colors">
        <div class="flex items-center justify-between text-[#9c988f] text-xs mb-3">
          <span>Safety Evaluation Index</span>
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
        </div>
        <div class="font-editorial text-2xl font-medium text-white">99.82%</div>
        <div class="text-xs text-[#9c988f] mt-2 flex items-center gap-1">
          <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Verified against ASL-3 standards</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#282724] border border-[#383632] hover:border-[#d97757]/40 transition-colors">
        <div class="flex items-center justify-between text-[#9c988f] text-xs mb-3">
          <span>Mean Steering Latency</span>
          <i data-lucide="zap" class="w-4 h-4 text-[#e28767]"></i>
        </div>
        <div class="font-editorial text-2xl font-medium text-white">14.8 ms</div>
        <div class="text-xs text-emerald-400 mt-2 flex items-center gap-1">
          <i data-lucide="arrow-down-right" class="w-3.5 h-3.5"></i>
          <span>-3.2ms overhead reduction</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#282724] border border-[#383632] hover:border-[#d97757]/40 transition-colors">
        <div class="flex items-center justify-between text-[#9c988f] text-xs mb-3">
          <span>Syntheses Completed</span>
          <i data-lucide="file-text" class="w-4 h-4 text-[#d97757]"></i>
        </div>
        <div class="font-editorial text-2xl font-medium text-white">1,482</div>
        <div class="text-xs text-[#9c988f] mt-2 flex items-center gap-1">
          <i data-lucide="users" class="w-3.5 h-3.5 text-[#9c988f]"></i>
          <span>Across 42 research fellows</span>
        </div>
      </div>
    </section>

    <!-- Interactive Workspace Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Feature Steering Interactive Card -->
      <section data-cd-element="feature-steering-panel" class="lg:col-span-2 p-6 rounded-2xl bg-[#282724] border border-[#383632] space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-editorial text-xl font-medium text-white">Interactive Feature Activation</h2>
            <p class="text-xs text-[#9c988f] mt-1">Adjust vector steering clamps to test model output shifts in real time.</p>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-[#1c1c1f] border border-[#383632] text-[#e28767] font-mono">
            Layer 34 • Sparse Autoencoder
          </span>
        </div>

        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs text-[#edebe6] mb-1.5 font-medium">
              <span>Feature #8,412 (Cautious Epistemic Humility)</span>
              <span id="val-1" class="text-[#d97757] font-mono">+1.8x</span>
            </div>
            <input type="range" min="0" max="4" step="0.1" value="1.8" oninput="updateSlider('val-1', this.value)" class="w-full h-1.5 bg-[#1c1c1f] rounded-lg appearance-none cursor-pointer accent-[#d97757]">
          </div>

          <div>
            <div class="flex justify-between text-xs text-[#edebe6] mb-1.5 font-medium">
              <span>Feature #12,903 (Formal Mathematical Rigor)</span>
              <span id="val-2" class="text-[#d97757] font-mono">+2.5x</span>
            </div>
            <input type="range" min="0" max="4" step="0.1" value="2.5" oninput="updateSlider('val-2', this.value)" class="w-full h-1.5 bg-[#1c1c1f] rounded-lg appearance-none cursor-pointer accent-[#d97757]">
          </div>

          <div>
            <div class="flex justify-between text-xs text-[#edebe6] mb-1.5 font-medium">
              <span>Feature #3,492 (Sycophancy Dampening)</span>
              <span id="val-3" class="text-[#d97757] font-mono">+3.2x</span>
            </div>
            <input type="range" min="0" max="4" step="0.1" value="3.2" oninput="updateSlider('val-3', this.value)" class="w-full h-1.5 bg-[#1c1c1f] rounded-lg appearance-none cursor-pointer accent-[#d97757]">
          </div>
        </div>

        <!-- Sample Model Generation Output -->
        <div class="p-4 rounded-xl bg-[#1c1c1f] border border-[#383632] space-y-2">
          <div class="flex items-center justify-between text-xs text-[#9c988f]">
            <span class="flex items-center gap-1.5">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-[#d97757]"></i>
              <span>Monitored Response Stream</span>
            </span>
            <span class="text-[10px] uppercase font-bold text-emerald-400">Stable</span>
          </div>
          <p class="font-editorial text-sm text-[#edebe6] leading-relaxed italic">
            "When analyzing the convergence bounds of quadratic forms over Riemannian manifolds, we must observe that curvature tensors enforce non-trivial geodesic dispersion. The empirical variance decays asymptotically as O(1/√k)."
          </p>
        </div>
      </section>

      <!-- Recent Research Syntheses -->
      <section data-cd-element="syntheses-sidebar" class="p-6 rounded-2xl bg-[#282724] border border-[#383632] flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-editorial text-lg font-medium text-white">Recent Syntheses</h2>
            <span class="text-xs text-[#d97757] cursor-pointer hover:underline">View All</span>
          </div>
          
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] border border-[#383632] cursor-pointer transition-colors group">
              <div class="text-xs font-semibold text-white group-hover:text-[#e28767] transition-colors">
                Constitutional AI Phase 4
              </div>
              <p class="text-[11px] text-[#9c988f] mt-1">Multi-turn harmlessness reinforcement under adversarial probes.</p>
              <div class="flex items-center justify-between mt-2.5 text-[10px] text-[#9c988f]">
                <span>Dr. E. Vance</span>
                <span class="px-1.5 py-0.5 rounded bg-[#383632] text-neutral-300">Reviewed</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] border border-[#383632] cursor-pointer transition-colors group">
              <div class="text-xs font-semibold text-white group-hover:text-[#e28767] transition-colors">
                Dictionary Learning Scaling Laws
              </div>
              <p class="text-[11px] text-[#9c988f] mt-1">Reconstruction error vs dictionary size on 100B token corpora.</p>
              <div class="flex items-center justify-between mt-2.5 text-[10px] text-[#9c988f]">
                <span>Interpretability Core</span>
                <span class="px-1.5 py-0.5 rounded bg-[#d97757]/20 text-[#e28767]">In Progress</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-[#1c1c1f]/80 hover:bg-[#1c1c1f] border border-[#383632] cursor-pointer transition-colors group">
              <div class="text-xs font-semibold text-white group-hover:text-[#e28767] transition-colors">
                Sycophancy Probe Benchmark
              </div>
              <p class="text-[11px] text-[#9c988f] mt-1">Measuring model agreement with incorrect user premises.</p>
              <div class="flex items-center justify-between mt-2.5 text-[10px] text-[#9c988f]">
                <span>Safety & Alignment</span>
                <span class="px-1.5 py-0.5 rounded bg-[#383632] text-neutral-300">Published</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-[#383632] mt-4">
          <button onclick="toggleModal()" class="w-full py-2.5 rounded-xl bg-[#1c1c1f] hover:bg-[#33312b] border border-[#383632] text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-[#d97757]"></i>
            <span>Browse Research Archive</span>
          </button>
        </div>
      </section>
    </div>

  </main>

  <!-- Interactive Scripts -->
  <script>
    function switchTab(tabName) {
      ['overview', 'syntheses', 'evaluations', 'datasets'].forEach(tab => {
        const btn = document.getElementById('tab-' + tab);
        if (!btn) return;
        if (tab === tabName) {
          btn.className = 'px-3.5 py-1.5 rounded-lg bg-[#282724] text-white font-medium border border-[#383632] transition-colors';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-[#9c988f] hover:text-white hover:bg-[#282724]/60 transition-colors';
        }
      });
    }

    function updateSlider(valId, val) {
      const el = document.getElementById(valId);
      if (el) el.textContent = '+' + parseFloat(val).toFixed(1) + 'x';
    }

    function toggleModal() {
      alert('Anthropic Research Lab: Synthesis creation dialog');
    }

    function refreshMetrics() {
      alert('Re-evaluating feature attribution benchmarks...');
    }

    function exportData() {
      alert('Exporting telemetry package in Parquet format...');
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) {
        lucide.createIcons();
      }
    });
  </script>
</body>
</html>`;
