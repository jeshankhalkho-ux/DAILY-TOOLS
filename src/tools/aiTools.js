// AI Image Generator & AI Video Generator tools

const IMAGE_API = 'https://anshapiimgegn.vercel.app/api?imgp=';
const VIDEO_API = 'https://texttovideo-six.vercel.app/generate?prompt=';

export function initAiTool(toolId, container, helpers) {
  container.innerHTML = '';

  switch (toolId) {
    case 'ai-image-gen':
      renderAiImageGenerator(container, helpers);
      break;
    case 'ai-video-gen':
      renderAiVideoGenerator(container, helpers);
      break;
    default:
      container.innerHTML = `<p>AI tool "${toolId}" is under construction.</p>`;
  }
}

// AI Image Generator
function renderAiImageGenerator(container, helpers) {
  const imageSuggestions = [
    'A sunset over mountains',
    'Cyberpunk city at night',
    'Cute cat wearing glasses',
    'Abstract colorful art',
    'Forest with magical light',
    'Underwater coral reef'
  ];

  container.innerHTML = `
    <div class="ai-prompt-section">
      <div style="text-align: center; margin-bottom: 8px;">
        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 6px;">AI Image Generator</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Describe what you want to see and our AI will create it instantly</p>
      </div>
      
      <div class="ai-prompt-input-wrapper">
        <input type="text" class="ai-prompt-input" id="imgPromptInput" placeholder="Describe your image... e.g. A dragon flying over a castle" />
        <button class="ai-prompt-btn" id="imgGenBtn">✨ Generate</button>
      </div>
      
      <div class="ai-prompt-suggestions" id="imgSuggestions">
        ${imageSuggestions.map(s => `<span class="ai-suggestion-chip">${s}</span>`).join('')}
      </div>
      
      <div id="imgResultArea"></div>
      
      <div id="imgGallery" style="margin-top: 24px;">
        <div class="section-header" id="galleryHeader" style="display: none;">
          <span class="section-title">Generated Images</span>
          <span class="section-subtitle" id="clearGallery">Clear all</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;" id="galleryGrid"></div>
      </div>
    </div>
  `;

  const promptInput = container.querySelector('#imgPromptInput');
  const genBtn = container.querySelector('#imgGenBtn');
  const resultArea = container.querySelector('#imgResultArea');
  const suggestions = container.querySelectorAll('.ai-suggestion-chip');
  const galleryGrid = container.querySelector('#galleryGrid');
  const galleryHeader = container.querySelector('#galleryHeader');
  const clearGallery = container.querySelector('#clearGallery');

  let generatedImages = [];

  // Click suggestions to autofill
  suggestions.forEach(chip => {
    chip.onclick = () => {
      promptInput.value = chip.textContent;
      promptInput.focus();
    };
  });

  // Handle Enter key
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') genBtn.click();
  });

  genBtn.onclick = async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      helpers.showToast('Please enter a description for your image.', 'warning');
      return;
    }

    genBtn.disabled = true;
    genBtn.textContent = '⏳ Generating...';

    resultArea.innerHTML = `
      <div class="ai-loading">
        <div class="ai-spinner"></div>
        <span class="ai-loading-text">Creating your image: "${prompt}"...</span>
      </div>
    `;

    try {
      const imgUrl = IMAGE_API + encodeURIComponent(prompt);
      
      // Preload the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to generate image'));
        img.src = imgUrl;
      });

      resultArea.innerHTML = `
        <div class="ai-result-container">
          <img src="${imgUrl}" class="ai-result-media" alt="${prompt}" style="max-height: 500px;" />
          <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
            <button class="action-btn" id="downloadAiImg">
              ⬇ Download Image
            </button>
            <button class="action-btn action-btn-secondary" id="regenerateImg">
              🔄 Regenerate
            </button>
          </div>
        </div>
      `;

      // Add to gallery
      generatedImages.unshift({ url: imgUrl, prompt: prompt });
      renderGallery();

      container.querySelector('#downloadAiImg').onclick = () => {
        downloadImageFromUrl(imgUrl, `ai_image_${Date.now()}.png`, helpers);
      };

      container.querySelector('#regenerateImg').onclick = () => {
        genBtn.click();
      };

      helpers.showToast('Image generated successfully! ✨');
    } catch (err) {
      console.error(err);
      resultArea.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--accent-coral);">
          <p style="font-weight: 600;">Failed to generate image</p>
          <p style="font-size: 0.82rem; margin-top: 6px; color: var(--text-secondary);">${err.message}. Please try again.</p>
        </div>
      `;
      helpers.showToast('Image generation failed. Try again.', 'error');
    } finally {
      genBtn.disabled = false;
      genBtn.textContent = '✨ Generate';
    }
  };

  clearGallery.onclick = () => {
    generatedImages = [];
    renderGallery();
  };

  function renderGallery() {
    if (generatedImages.length === 0) {
      galleryHeader.style.display = 'none';
      galleryGrid.innerHTML = '';
      return;
    }

    galleryHeader.style.display = 'flex';
    galleryGrid.innerHTML = generatedImages.map((item, i) => `
      <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border); cursor: pointer; transition: transform 0.2s; position: relative;" 
           class="gallery-item" data-index="${i}">
        <img src="${item.url}" alt="${item.prompt}" style="width: 100%; height: 160px; object-fit: cover;" />
        <div style="padding: 8px; font-size: 0.72rem; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.prompt}</div>
      </div>
    `).join('');

    // Click to enlarge
    galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-3px)');
      item.addEventListener('mouseleave', () => item.style.transform = '');
      item.onclick = () => {
        const idx = parseInt(item.getAttribute('data-index'));
        const img = generatedImages[idx];
        resultArea.innerHTML = `
          <div class="ai-result-container">
            <img src="${img.url}" class="ai-result-media" alt="${img.prompt}" style="max-height: 500px;" />
            <div style="display: flex; gap: 10px;">
              <button class="action-btn" id="downloadGalleryImg">⬇ Download</button>
            </div>
          </div>
        `;
        container.querySelector('#downloadGalleryImg').onclick = () => {
          downloadImageFromUrl(img.url, `ai_image_${Date.now()}.png`, helpers);
        };
      };
    });
  }
}

// AI Video Generator
function renderAiVideoGenerator(container, helpers) {
  const videoSuggestions = [
    'Ocean waves at sunset',
    'A dog running in a park',
    'Timelapse of clouds',
    'Astronaut on the moon',
    'Dancing flames on campfire',
    'Rain falling on a window'
  ];

  container.innerHTML = `
    <div class="ai-prompt-section">
      <div style="text-align: center; margin-bottom: 8px;">
        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 6px;">AI Video Generator</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Describe a scene and our AI will generate a short video clip</p>
      </div>
      
      <div class="ai-prompt-input-wrapper">
        <input type="text" class="ai-prompt-input" id="vidPromptInput" placeholder="Describe a scene... e.g. A puppy playing in the snow" />
        <button class="ai-prompt-btn" id="vidGenBtn">🎬 Generate</button>
      </div>
      
      <div class="ai-prompt-suggestions" id="vidSuggestions">
        ${videoSuggestions.map(s => `<span class="ai-suggestion-chip">${s}</span>`).join('')}
      </div>
      
      <div id="vidResultArea"></div>
    </div>
  `;

  const promptInput = container.querySelector('#vidPromptInput');
  const genBtn = container.querySelector('#vidGenBtn');
  const resultArea = container.querySelector('#vidResultArea');
  const suggestions = container.querySelectorAll('.ai-suggestion-chip');

  // Suggestions
  suggestions.forEach(chip => {
    chip.onclick = () => {
      promptInput.value = chip.textContent;
      promptInput.focus();
    };
  });

  // Enter key
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') genBtn.click();
  });

  genBtn.onclick = async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      helpers.showToast('Please enter a video description.', 'warning');
      return;
    }

    genBtn.disabled = true;
    genBtn.textContent = '⏳ Generating...';

    resultArea.innerHTML = `
      <div class="ai-loading">
        <div class="ai-spinner"></div>
        <span class="ai-loading-text">Generating video for: "${prompt}"</span>
        <span class="ai-loading-text" style="font-size: 0.78rem; color: var(--text-muted);">This may take 10-30 seconds...</span>
      </div>
    `;

    try {
      const apiUrl = VIDEO_API + encodeURIComponent(prompt);
      const response = await fetch(apiUrl);
      
      if (!response.ok) throw new Error(`API responded with ${response.status}`);
      
      const data = await response.json();

      if (data.status === 'success' && data.url) {
        resultArea.innerHTML = `
          <div class="ai-result-container">
            <video class="ai-result-media" controls autoplay loop style="max-height: 450px; width: 100%;">
              <source src="${data.url}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
              <a href="${data.url}" download="${data.filename || 'ai_video.mp4'}" class="action-btn" style="text-decoration: none;">
                ⬇ Download Video
              </a>
              <button class="action-btn action-btn-secondary" id="regenerateVid">
                🔄 Regenerate
              </button>
            </div>
          </div>
        `;

        container.querySelector('#regenerateVid').onclick = () => {
          genBtn.click();
        };

        helpers.showToast('Video generated! 🎬');
      } else {
        throw new Error(data.error || 'Unknown error from API');
      }
    } catch (err) {
      console.error(err);
      resultArea.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--accent-coral);">
          <p style="font-weight: 600;">Failed to generate video</p>
          <p style="font-size: 0.82rem; margin-top: 6px; color: var(--text-secondary);">${err.message}</p>
        </div>
      `;
      helpers.showToast('Video generation failed.', 'error');
    } finally {
      genBtn.disabled = false;
      genBtn.textContent = '🎬 Generate';
    }
  };
}

// Helper: Download image from URL via canvas to avoid CORS issues
async function downloadImageFromUrl(url, filename, helpers) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    helpers.downloadFile(blob, filename);
    helpers.showToast('Download started!');
  } catch {
    // Fallback: open in new tab
    window.open(url, '_blank');
    helpers.showToast('Opened image in a new tab for download.', 'warning');
  }
}
