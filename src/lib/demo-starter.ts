export const DEMO_PROJECT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Global Finance</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .starlight-glow {
      background: radial-gradient(circle at 50% 0%, rgba(94, 106, 210, 0.15) 0%, transparent 70%);
    }
  </style>
</head>
<body class="bg-[#08090a] text-[#f7f8f8] min-h-screen starlight-glow antialiased selection:bg-[#5e6ad2] selection:text-white">
  
  <!-- Navigation -->
  <nav data-cd-element="navigation-bar" class="h-16 border-b border-white/10 bg-[#08090a]/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center shadow-lg shadow-[#5e6ad2]/30">
          <i data-lucide="layers" class="w-4 h-4 text-white"></i>
        </div>
        <span class="font-semibold text-sm tracking-tight text-white">Apex Capital</span>
      </div>
      
      <div class="hidden md:flex items-center gap-1 text-xs">
        <button onclick="switchTab('overview')" id="tab-overview" class="px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium transition-colors">Overview</button>
        <button onclick="switchTab('transactions')" id="tab-transactions" class="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">Transactions</button>
        <button onclick="switchTab('analytics')" id="tab-analytics" class="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">Analytics</button>
        <button onclick="switchTab('settings')" id="tab-settings" class="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">Treasury</button>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button onclick="alert('Notification center')" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-300 hover:text-white transition-colors">
        <i data-lucide="bell" class="w-4 h-4"></i>
      </button>
      <button onclick="toggleSendModal()" data-cd-element="send-money-cta" class="px-3.5 py-1.5 rounded-lg bg-[#5e6ad2] hover:bg-[#7170ff] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#5e6ad2]/20">
        <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        <span>Send Money</span>
      </button>
    </div>
  </nav>

  <!-- Main Container -->
  <main class="max-w-6xl mx-auto px-6 py-8 space-y-8">
    
    <!-- Hero Header -->
    <header data-cd-element="hero-header" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Portfolio Overview
          <span class="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live Sync</span>
        </h1>
        <p class="text-xs text-neutral-400 mt-1">Multi-currency treasury accounts reconciled in real-time.</p>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <span class="text-neutral-400">Account:</span>
        <div class="px-3 py-1.5 rounded-lg bg-[#141518] border border-white/10 font-mono text-neutral-200 flex items-center gap-2">
          <span>Apex Holdings (US-5921)</span>
          <i data-lucide="chevron-down" class="w-3 h-3 text-neutral-500"></i>
        </div>
      </div>
    </header>

    <!-- Key Metrics Bento Grid -->
    <div data-cd-element="metrics-grid" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      <!-- Card 1 -->
      <div data-cd-element="metric-total-balance" class="p-5 rounded-2xl bg-[#0f1012] border border-white/10 hover:border-white/20 transition-all group">
        <div class="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>Total Balance</span>
          <i data-lucide="wallet" class="w-4 h-4 text-[#5e6ad2]"></i>
        </div>
        <div class="text-2xl font-bold text-white font-mono tracking-tight">$1,482,900.50</div>
        <div class="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-2">
          <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
          <span>+14.2% vs last month</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div data-cd-element="metric-monthly-revenue" class="p-5 rounded-2xl bg-[#0f1012] border border-white/10 hover:border-white/20 transition-all group">
        <div class="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>Monthly Volume</span>
          <i data-lucide="arrow-down-left" class="w-4 h-4 text-emerald-400"></i>
        </div>
        <div class="text-2xl font-bold text-white font-mono tracking-tight">$349,200.00</div>
        <div class="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-2">
          <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
          <span>+8.4% inflow</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div data-cd-element="metric-operating-yield" class="p-5 rounded-2xl bg-[#0f1012] border border-white/10 hover:border-white/20 transition-all group">
        <div class="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>Operating APY</span>
          <i data-lucide="percent" class="w-4 h-4 text-amber-400"></i>
        </div>
        <div class="text-2xl font-bold text-white font-mono tracking-tight">5.24%</div>
        <div class="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mt-2">
          <span>Treasury bill weighted</span>
        </div>
      </div>

      <!-- Card 4 -->
      <div data-cd-element="metric-active-cards" class="p-5 rounded-2xl bg-[#0f1012] border border-white/10 hover:border-white/20 transition-all group">
        <div class="flex items-center justify-between text-neutral-400 text-xs mb-2">
          <span>Corporate Cards</span>
          <i data-lucide="credit-card" class="w-4 h-4 text-purple-400"></i>
        </div>
        <div class="text-2xl font-bold text-white font-mono tracking-tight">18 Active</div>
        <div class="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mt-2">
          <span>$42,100 spend limit</span>
        </div>
      </div>
    </div>

    <!-- Interactive Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Transactions List (2 Cols) -->
      <div data-cd-element="transactions-table" class="lg:col-span-2 p-6 rounded-2xl bg-[#0f1012] border border-white/10">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h2 class="text-sm font-semibold text-white">Recent Settlements</h2>
            <p class="text-xs text-neutral-400 mt-0.5">Real-time ledger updates across ACH, FedNow & SWIFT.</p>
          </div>
          <button class="text-xs text-[#7170ff] hover:text-white transition-colors font-medium">Export CSV</button>
        </div>

        <div class="space-y-3">
          
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <i data-lucide="arrow-down-left" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-xs font-medium text-white">Stripe Payouts US</div>
                <div class="text-[11px] text-neutral-500">Card processing settlement</div>
              </div>
            </div>
            <div class="text-right font-mono">
              <div class="text-xs font-semibold text-emerald-400">+$84,290.00</div>
              <div class="text-[10px] text-neutral-500">Today, 09:12 AM</div>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-[#5e6ad2]/10 text-[#7170ff] flex items-center justify-center">
                <i data-lucide="server" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-xs font-medium text-white">Amazon Web Services</div>
                <div class="text-[11px] text-neutral-500">Cloud computing infrastructure</div>
              </div>
            </div>
            <div class="text-right font-mono">
              <div class="text-xs font-semibold text-white">-$12,450.18</div>
              <div class="text-[10px] text-neutral-500">Yesterday, 14:30 PM</div>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <i data-lucide="cpu" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-xs font-medium text-white">Anthropic Enterprise</div>
                <div class="text-[11px] text-neutral-500">AI model inference token tier</div>
              </div>
            </div>
            <div class="text-right font-mono">
              <div class="text-xs font-semibold text-white">-$8,500.00</div>
              <div class="text-[10px] text-neutral-500">Mar 02, 11:24 AM</div>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <i data-lucide="arrow-down-left" class="w-4 h-4"></i>
              </div>
              <div>
                <div class="text-xs font-medium text-white">Sequoia Capital LP</div>
                <div class="text-[11px] text-neutral-500">Series B tranche wire deposit</div>
              </div>
            </div>
            <div class="text-right font-mono">
              <div class="text-xs font-semibold text-emerald-400">+$250,000.00</div>
              <div class="text-[10px] text-neutral-500">Feb 28, 16:45 PM</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Transfer Widget (1 Col) -->
      <div data-cd-element="quick-transfer-card" class="p-6 rounded-2xl bg-[#0f1012] border border-white/10 flex flex-col justify-between">
        <div>
          <h2 class="text-sm font-semibold text-white mb-1">Instant Liquidity Route</h2>
          <p class="text-xs text-neutral-400 mb-4">Transfer balances between operating accounts.</p>

          <div class="space-y-3">
            <div>
              <label class="text-[11px] text-neutral-400 block mb-1">From Account</label>
              <div class="p-2.5 rounded-xl bg-[#141518] border border-white/10 text-xs font-mono text-white flex items-center justify-between">
                <span>US Operating ($1.48M)</span>
                <i data-lucide="lock" class="w-3.5 h-3.5 text-neutral-500"></i>
              </div>
            </div>

            <div>
              <label class="text-[11px] text-neutral-400 block mb-1">Destination</label>
              <select id="transfer-target" class="w-full p-2.5 rounded-xl bg-[#141518] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#5e6ad2]">
                <option value="uk">EU Operations (EUR IBAN)</option>
                <option value="singapore">Asia-Pacific Hub (SGD)</option>
                <option value="treasury">Yield Vault (T-Bills 5.2%)</option>
              </select>
            </div>

            <div>
              <label class="text-[11px] text-neutral-400 block mb-1">Amount ($ USD)</label>
              <input type="number" id="transfer-amount" value="50000" class="w-full p-2.5 rounded-xl bg-[#141518] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#5e6ad2]">
            </div>
          </div>
        </div>

        <button onclick="executeTransfer()" data-cd-element="execute-transfer-btn" class="w-full mt-6 py-2.5 rounded-xl bg-[#5e6ad2] hover:bg-[#7170ff] text-white text-xs font-semibold transition-all shadow-lg shadow-[#5e6ad2]/20 flex items-center justify-center gap-2">
          <span>Authorize Dispatch</span>
          <i data-lucide="check" class="w-4 h-4"></i>
        </button>
      </div>

    </div>
  </main>

  <script>
    lucide.createIcons();

    function switchTab(name) {
      document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.className = "px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors";
      });
      const active = document.getElementById('tab-' + name);
      if (active) {
        active.className = "px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium transition-colors";
      }
    }

    function toggleSendModal() {
      alert("Send Money modal clicked! You can test interactive actions freely.");
    }

    function executeTransfer() {
      const amt = document.getElementById('transfer-amount').value;
      const target = document.getElementById('transfer-target').value;
      alert('Transfer of $' + Number(amt).toLocaleString() + ' to ' + target.toUpperCase() + ' authorized successfully!');
    }
  </script>
</body>
</html>`;
