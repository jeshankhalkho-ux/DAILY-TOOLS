import './style.css';

// Import tool initialization delegates
import { initDocumentTool } from './tools/documentTools.js';
import { initImageTool } from './tools/imageTools.js';
import { initVideoTool } from './tools/videoTools.js';
import { initTextTool } from './tools/textTools.js';
import { initCryptoTool } from './tools/cryptoTools.js';
import { initAiTool } from './tools/aiTools.js';

// ======================== TOOLS REGISTRY ========================
const TOOLS = [
  // AI Tools
  { id: 'ai-image-gen', name: 'AI Image Generator', desc: 'Create stunning images from text prompts with AI.', cat: 'ai', icon: '🎨', featured: true },
  { id: 'ai-video-gen', name: 'AI Video Generator', desc: 'Generate short video clips from text descriptions.', cat: 'ai', icon: '🎬', featured: true },

  // Document Tools
  { id: 'pdf-merger', name: 'PDF Merger', desc: 'Combine multiple PDFs into one file.', cat: 'doc', icon: '📑', featured: true },
  { id: 'pdf-splitter', name: 'PDF Splitter', desc: 'Extract pages from your PDF.', cat: 'doc', icon: '✂️' },
  { id: 'pdf-compressor', name: 'PDF Compressor', desc: 'Reduce PDF file size locally.', cat: 'doc', icon: '🗜️' },
  { id: 'pdf-to-image', name: 'PDF to Image', desc: 'Convert PDF pages to PNG/JPEG.', cat: 'doc', icon: '🖼️', featured: true },
  { id: 'image-to-pdf', name: 'Image to PDF', desc: 'Create PDF from images.', cat: 'doc', icon: '📄' },
  { id: 'pdf-protector', name: 'PDF Password Protector', desc: 'Encrypt PDF with password.', cat: 'doc', icon: '🔐' },
  { id: 'pdf-unlocker', name: 'PDF Unlocker', desc: 'Remove PDF password protection.', cat: 'doc', icon: '🔓' },

  // Image Tools
  { id: 'image-resizer', name: 'Image Resizer', desc: 'Resize images with aspect lock.', cat: 'img', icon: '📐' },
  { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress image file size.', cat: 'img', icon: '📦', featured: true },
  { id: 'bg-remover', name: 'Background Remover', desc: 'Remove image backgrounds.', cat: 'img', icon: '✨', featured: true },
  { id: 'image-cropper', name: 'Image Cropper', desc: 'Crop images with presets.', cat: 'img', icon: '🔲' },
  { id: 'watermark-adder', name: 'Watermark Adder', desc: 'Add text watermarks.', cat: 'img', icon: '💧' },
  { id: 'image-converter', name: 'Format Converter', desc: 'Convert JPG ↔ PNG ↔ WebP.', cat: 'img', icon: '🔄' },
  { id: 'screenshot-beautifier', name: 'Screenshot Beautifier', desc: 'Beautify screenshots with frames.', cat: 'img', icon: '💅' },

  // Video Tools
  { id: 'video-compressor', name: 'Video Compressor', desc: 'Compress videos in-browser.', cat: 'vid', icon: '🎞️' },
  { id: 'video-trimmer', name: 'Video Trimmer', desc: 'Trim video start/end.', cat: 'vid', icon: '✂️' },
  { id: 'video-to-gif', name: 'Video to GIF', desc: 'Convert video to animated GIF.', cat: 'vid', icon: '🎠' },
  { id: 'audio-extractor', name: 'Audio Extractor', desc: 'Extract audio from video.', cat: 'vid', icon: '🎵' },
  { id: 'video-converter', name: 'Video Format Converter', desc: 'Convert video formats.', cat: 'vid', icon: '🔄' },

  // Text Tools
  { id: 'word-counter', name: 'Word & Char Counter', desc: 'Count words, characters, lines.', cat: 'txt', icon: '🔢', featured: true },
  { id: 'case-converter', name: 'Case Converter', desc: 'Convert text cases.', cat: 'txt', icon: '🔠' },
  { id: 'diff-checker', name: 'Text Diff Checker', desc: 'Compare two texts side-by-side.', cat: 'txt', icon: '🔍' },
  { id: 'dup-remover', name: 'Duplicate Line Remover', desc: 'Remove duplicate lines.', cat: 'txt', icon: '🧹' },
  { id: 'pass-generator', name: 'Password Generator', desc: 'Generate strong passwords.', cat: 'txt', icon: '🔑' },
  { id: 'qr-generator', name: 'QR Code Generator', desc: 'Generate QR codes.', cat: 'txt', icon: '📱', featured: true },
  { id: 'barcode-generator', name: 'Barcode Generator', desc: 'Generate barcodes.', cat: 'txt', icon: '📊' },

  // Security Tools
  { id: 'pass-strength', name: 'Password Strength', desc: 'Analyze password strength.', cat: 'sec', icon: '🛡️' },
  { id: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA hashes.', cat: 'sec', icon: '#️⃣' },
  { id: 'hash-verifier', name: 'File Hash Verifier', desc: 'Verify file hash signatures.', cat: 'sec', icon: '✅' },
  { id: 'base64-codec', name: 'Base64 Encoder/Decoder', desc: 'Encode/decode Base64.', cat: 'sec', icon: '🔤' },
  { id: 'url-codec', name: 'URL Encoder/Decoder', desc: 'Encode/decode URL params.', cat: 'sec', icon: '🔗' },
  { id: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode & inspect JWT tokens.', cat: 'sec', icon: '🎟️' },
  { id: 'aes-playground', name: 'Encryption Playground', desc: 'AES-GCM encrypt/decrypt.', cat: 'sec', icon: '🔒' }
];

const CATEGORIES = [
  { id: 'ai', name: 'AI Tools', emoji: '🤖', color: 'ai' },
  { id: 'doc', name: 'Document Tools', emoji: '📄', color: 'doc' },
  { id: 'img', name: 'Image Tools', emoji: '🖼️', color: 'img' },
  { id: 'vid', name: 'Video Tools', emoji: '🎥', color: 'vid' },
  { id: 'txt', name: 'Text Tools', emoji: '✍️', color: 'txt' },
  { id: 'sec', name: 'Security Tools', emoji: '🔒', color: 'sec' }
];

const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { id: 'ai', label: 'AI', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10h16V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>' },
  { id: 'doc', label: 'Docs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>' },
  { id: 'img', label: 'Images', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>' },
  { id: 'vid', label: 'Video', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>' },
  { id: 'txt', label: 'Text', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>' },
  { id: 'sec', label: 'Security', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
];

// ======================== APP STATE ========================
let activeToolId = null;
let activeSection = 'home';
let currentTheme = localStorage.getItem('omniforge-theme') || 'light';

// ======================== DOM REFERENCES ========================
const app = document.getElementById('app');

// ======================== GLOBAL HELPERS ========================
const HELPERS = {
  showProgress: (percent) => {
    const bar = document.getElementById('globalProgressFill');
    const container = document.getElementById('globalProgressBar');
    if (bar && container) {
      container.style.display = 'block';
      bar.style.width = `${percent}%`;
    }
  },
  hideProgress: () => {
    const bar = document.getElementById('globalProgressFill');
    const container = document.getElementById('globalProgressBar');
    if (bar && container) {
      container.style.display = 'none';
      bar.style.width = '0%';
    }
  },
  showToast: (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    const borderColor = type === 'success' ? 'var(--accent-teal)' : type === 'warning' ? 'var(--accent-amber)' : 'var(--accent-coral)';
    toast.style.borderLeft = `4px solid ${borderColor}`;
    toast.innerHTML = `<span style="font-weight: 600; font-size: 0.88rem;">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  downloadFile: (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  setupDragAndDrop: (dropzone, fileInput, callback) => {
    dropzone.onclick = () => fileInput.click();
    fileInput.onchange = () => { if (fileInput.files.length > 0) callback(fileInput.files); };
    dropzone.ondragover = (e) => { e.preventDefault(); dropzone.classList.add('dragover'); };
    dropzone.ondragleave = () => { dropzone.classList.remove('dragover'); };
    dropzone.ondrop = (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); if (e.dataTransfer.files.length > 0) callback(e.dataTransfer.files); };
  },
  escapeHtml: (str) => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'),
  copyToClipboard: (text) => {
    navigator.clipboard.writeText(text).then(() => HELPERS.showToast('Copied to clipboard!')).catch(err => HELPERS.showToast('Copy failed: ' + err, 'error'));
  },
  dataURLtoBlob: (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }
};

// ======================== RENDER: APP SHELL ========================
function renderAppShell() {
  document.documentElement.setAttribute('data-theme', currentTheme);

  app.innerHTML = `
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo" id="sidebarLogo" title="OmniForge">⚡</div>
      <nav class="sidebar-nav" id="sidebarNav">
        ${SIDEBAR_ITEMS.map(item => `
          <button class="sidebar-item ${activeSection === item.id ? 'active' : ''}" data-section="${item.id}" title="${item.label}">
            ${item.svg}
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
      <div class="sidebar-bottom">
        <button class="sidebar-item" id="themeToggleBtn" title="Toggle Theme">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          <span>Theme</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-viewport">
      <div class="progress-bar-container" id="globalProgressBar">
        <div class="progress-bar-fill" id="globalProgressFill"></div>
      </div>
      <div class="content-scroll" id="contentScroll"></div>
    </div>
  `;

  // Sidebar event listeners
  document.querySelectorAll('.sidebar-item[data-section]').forEach(btn => {
    btn.onclick = () => {
      const section = btn.getAttribute('data-section');
      if (section === 'home') {
        activeToolId = null;
        activeSection = 'home';
        renderDashboard();
      } else {
        activeSection = section;
        activeToolId = null;
        renderCategoryPage(section);
      }
      updateSidebarActive();
    };
  });

  document.getElementById('sidebarLogo').onclick = () => {
    activeToolId = null;
    activeSection = 'home';
    renderDashboard();
    updateSidebarActive();
  };

  document.getElementById('themeToggleBtn').onclick = toggleTheme;
}

function updateSidebarActive() {
  document.querySelectorAll('.sidebar-item[data-section]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-section') === activeSection);
  });
}

// ======================== RENDER: DASHBOARD ========================
function renderDashboard() {
  const contentScroll = document.getElementById('contentScroll');
  const greeting = getGreeting();

  const quickEditTools = TOOLS.filter(t => t.featured);

  contentScroll.innerHTML = `
    <div class="dashboard">
      <!-- Hero -->
      <div class="hero-section">
        <p class="hero-greeting">${greeting}</p>
        <h1 class="hero-title">How would you like to start?</h1>
      </div>

      <!-- Search Bar -->
      <div class="search-bar-wrapper">
        <svg class="search-bar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="search-bar" id="dashboardSearch" placeholder="Search 34+ tools... PDF, Image, Video, QR, Hash..." />
      </div>

      <!-- Starter Cards -->
      <div class="starter-row" id="starterRow">
        <div class="starter-card" data-tool="upload-trigger">
          <div class="starter-card-icon">📂</div>
          <span class="starter-card-title">Upload</span>
        </div>
        <div class="starter-card gradient-card gradient-coral" data-tool="ai-image-gen">
          <div class="starter-card-icon">🎨</div>
          <span class="starter-card-title">Generate Image</span>
        </div>
        <div class="starter-card gradient-card gradient-purple" data-tool="ai-video-gen">
          <div class="starter-card-icon">🎬</div>
          <span class="starter-card-title">Create Video</span>
        </div>
        <div class="starter-card gradient-card gradient-teal" data-section="img">
          <div class="starter-card-icon">🖼️</div>
          <span class="starter-card-title">Edit Photos</span>
        </div>
        <div class="starter-card gradient-card gradient-blue" data-section="doc">
          <div class="starter-card-icon">📄</div>
          <span class="starter-card-title">Documents</span>
        </div>
      </div>

      <!-- Quick Edits -->
      <div class="section-header">
        <span class="section-title">Quick edits</span>
        <span class="section-subtitle" id="viewAllQuickEdits">View all</span>
      </div>
      <div class="quick-edits-scroll" id="quickEditsScroll">
        ${quickEditTools.map(tool => `
          <div class="quick-edit-card" data-tool="${tool.id}">
            <div class="quick-edit-thumbnail">${tool.icon}</div>
            <span class="quick-edit-label">${tool.name}</span>
          </div>
        `).join('')}
      </div>

      <!-- All Categories -->
      <div id="categorySections">
        ${CATEGORIES.map(cat => {
          const tools = TOOLS.filter(t => t.cat === cat.id);
          return `
            <div class="category-section" data-cat="${cat.id}">
              <div class="category-header">
                <div class="category-icon ${cat.color}">${cat.emoji}</div>
                <span class="category-name">${cat.name}</span>
                <span class="category-count">${tools.length}</span>
              </div>
              <div class="tools-grid">
                ${tools.map(tool => `
                  <div class="tool-card ${tool.cat}" data-tool="${tool.id}">
                    <div class="tool-card-icon">${tool.icon}</div>
                    <div class="tool-card-body">
                      <div class="tool-card-title">${tool.name}</div>
                      <div class="tool-card-desc">${tool.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Event listeners
  bindToolClicks(contentScroll);
  bindSectionClicks(contentScroll);

  // Search
  const searchInput = document.getElementById('dashboardSearch');
  searchInput.oninput = () => {
    const q = searchInput.value.toLowerCase();
    filterDashboard(q);
  };

  // View all quick edits
  document.getElementById('viewAllQuickEdits').onclick = () => {
    searchInput.value = '';
    searchInput.focus();
  };

  // Upload trigger
  const uploadCard = contentScroll.querySelector('[data-tool="upload-trigger"]');
  if (uploadCard) {
    uploadCard.onclick = (e) => {
      e.stopPropagation();
      // Create a file picker
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.onchange = () => {
        if (input.files.length > 0) {
          const file = input.files[0];
          // Auto route based on file type
          if (file.type === 'application/pdf') {
            loadTool('pdf-merger');
          } else if (file.type.startsWith('image/')) {
            loadTool('image-compressor');
          } else if (file.type.startsWith('video/')) {
            loadTool('video-compressor');
          } else {
            HELPERS.showToast('Uploaded! Choose a tool to process your file.', 'warning');
          }
        }
      };
      input.click();
    };
  }
}

function filterDashboard(query) {
  // Filter category sections
  document.querySelectorAll('.category-section').forEach(section => {
    const cards = section.querySelectorAll('.tool-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const toolId = card.getAttribute('data-tool');
      const tool = TOOLS.find(t => t.id === toolId);
      const matches = tool && (
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query) ||
        tool.cat.toLowerCase().includes(query)
      );
      card.style.display = matches || !query ? '' : 'none';
      if (matches || !query) visibleCount++;
    });

    section.style.display = visibleCount > 0 || !query ? '' : 'none';
  });

  // Filter quick edits
  document.querySelectorAll('.quick-edit-card').forEach(card => {
    const toolId = card.getAttribute('data-tool');
    const tool = TOOLS.find(t => t.id === toolId);
    const matches = tool && (
      tool.name.toLowerCase().includes(query) ||
      tool.desc.toLowerCase().includes(query)
    );
    card.style.display = matches || !query ? '' : 'none';
  });
}

// ======================== RENDER: CATEGORY PAGE ========================
function renderCategoryPage(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return renderDashboard();

  const tools = TOOLS.filter(t => t.cat === catId);
  const contentScroll = document.getElementById('contentScroll');

  contentScroll.innerHTML = `
    <div class="dashboard">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 28px;">
        <button class="back-btn" id="backHomeBtn">← Home</button>
        <div class="category-icon ${cat.color}" style="width: 40px; height: 40px; font-size: 1.2rem;">${cat.emoji}</div>
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 800;">${cat.name}</h2>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${tools.length} tools available</p>
        </div>
      </div>

      <div class="tools-grid">
        ${tools.map(tool => `
          <div class="tool-card ${tool.cat}" data-tool="${tool.id}">
            <div class="tool-card-icon">${tool.icon}</div>
            <div class="tool-card-body">
              <div class="tool-card-title">${tool.name}</div>
              <div class="tool-card-desc">${tool.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('backHomeBtn').onclick = () => {
    activeSection = 'home';
    renderDashboard();
    updateSidebarActive();
  };

  bindToolClicks(contentScroll);
}

// ======================== RENDER: TOOL VIEW ========================
function loadTool(toolId) {
  activeToolId = toolId;
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return renderDashboard();

  activeSection = tool.cat;
  updateSidebarActive();

  const contentScroll = document.getElementById('contentScroll');

  contentScroll.innerHTML = `
    <div class="tool-page">
      <div class="tool-page-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="back-btn" id="backFromTool">← Back</button>
          <span class="tool-page-title">${tool.icon} ${tool.name}</span>
        </div>
        <span style="font-size: 0.75rem; padding: 4px 12px; border-radius: var(--radius-full); background: var(--bg-input); color: var(--text-muted); font-weight: 600;">100% Local</span>
      </div>
      <div class="tool-workspace" id="toolWorkspace"></div>
    </div>
  `;

  document.getElementById('backFromTool').onclick = () => {
    activeToolId = null;
    activeSection = 'home';
    renderDashboard();
    updateSidebarActive();
  };

  const workspace = document.getElementById('toolWorkspace');

  // Delegate to correct tool module
  if (tool.cat === 'ai') {
    initAiTool(tool.id, workspace, HELPERS);
  } else if (tool.cat === 'doc') {
    initDocumentTool(tool.id, workspace, HELPERS);
  } else if (tool.cat === 'img') {
    initImageTool(tool.id, workspace, HELPERS);
  } else if (tool.cat === 'vid') {
    initVideoTool(tool.id, workspace, HELPERS);
  } else if (tool.cat === 'txt') {
    initTextTool(tool.id, workspace, HELPERS);
  } else if (tool.cat === 'sec') {
    initCryptoTool(tool.id, workspace, HELPERS);
  }
}

// ======================== EVENT BINDING HELPERS ========================
function bindToolClicks(container) {
  container.querySelectorAll('[data-tool]').forEach(el => {
    if (el.getAttribute('data-tool') === 'upload-trigger') return; // handled separately
    el.onclick = () => loadTool(el.getAttribute('data-tool'));
  });
}

function bindSectionClicks(container) {
  container.querySelectorAll('[data-section]').forEach(el => {
    if (el.classList.contains('sidebar-item')) return; // already handled
    el.onclick = () => {
      activeSection = el.getAttribute('data-section');
      renderCategoryPage(activeSection);
      updateSidebarActive();
    };
  });
}

// ======================== THEME ========================
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('omniforge-theme', currentTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    const icon = currentTheme === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    themeBtn.querySelector('svg').outerHTML = icon;
  }
}

// ======================== UTILITIES ========================
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning ☀️';
  if (hour < 17) return 'Good afternoon 🌤️';
  return 'Good evening 🌙';
}

// ======================== INIT ========================
function initApp() {
  renderAppShell();
  renderDashboard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
