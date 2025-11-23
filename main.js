// --- OBJEK UNTUK MENYIMPAN STATUS APLIKASI ---
let appState = {
  currentPage: 'page1', // Halaman aktif saat ini
  audioPaused: false    // Apakah audio sedang dijeda (misalnya saat pindah halaman)
};

// --- FUNGSI NAVIGASI ---
function goToPage(pageNumber) {
  const pageMap = {
    1: 'page1',
    2: 'page2',
    3: 'page3',
    4: 'page4',
    5: 'page5',
    6: 'page6'
  };
  const targetPageId = pageMap[pageNumber];

  if (targetPageId) {
    // Animasi fade out (opsional)
    const currentPageElement = document.getElementById(appState.currentPage);
    if (currentPageElement) {
      currentPageElement.style.opacity = '0';
      currentPageElement.style.transition = 'opacity 0.5s ease-out';
    }

    // Gunakan requestAnimationFrame untuk performa lebih baik
    requestAnimationFrame(() => {
      setTimeout(() => {
        // Sembunyikan halaman lama
        if (currentPageElement) {
          currentPageElement.classList.remove('active');
          currentPageElement.style.opacity = '1'; // Reset opacity untuk transisi berikutnya
        }

        // Tampilkan halaman baru
        const targetPageElement = document.getElementById(targetPageId);
        if (targetPageElement) {
          targetPageElement.classList.add('active');
        }

        // Update status halaman
        appState.currentPage = targetPageId;

        // Panggil inisialisasi khusus halaman jika ada
        initializePage(targetPageId);

      }, 500); // Durasi harus sesuai dengan transition CSS
    });
  } else {
    console.error(`Page ${pageNumber} not defined in pageMap.`);
  }
}

// --- FUNGSI UNTUK MENAMPILKAN NAMA TAMU ---
function displayVisitorName() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = decodeURIComponent(urlParams.get('name') || 'Sahabat yang Dirahmati');
  const visitorNameElement = document.getElementById('visitorName');
  if (visitorNameElement) {
    visitorNameElement.textContent = name;
  } else {
    console.error("Element #visitorName not found!");
  }
}

// --- FUNGSI UNTUK MEMUTAR MUSIK ---
function playMusic() {
  // Cek apakah elemen audio ada
  const audio = document.getElementById('backgroundMusic');
  if (!audio) {
    console.error("Audio element #backgroundMusic not found!");
    // Karena audio sudah ada di HTML, maka bagian ini tidak akan aktif
  } else {
    // Jika elemen audio sudah ada, coba mainkan
    audio.play()
      .then(() => {
        console.log("Audio playback started successfully after user interaction (e.g., click OPEN).");
      })
      .catch((error) => {
        console.log("Audio playback failed (autoplay policy) even after user interaction:", error);
      });
  }
}

// --- FUNGSI UNTUK MENJEDA MUSIK (OPSIOAL, misalnya saat pindah halaman) ---
function pauseMusic() {
  const audio = document.getElementById('backgroundMusic');
  if (audio) {
    audio.pause();
  }
}

// --- FUNGSI UNTUK INISIALISASI HALAMAN TERTENTU ---
function initializePage(pageId) {
  // Panggil fungsi inisialisasi khusus berdasarkan ID halaman
  switch (pageId) {
    case 'page1':
      // Tidak ada inisialisasi khusus untuk page1 selain nama tamu
      break;
    case 'page2':
      setupTabNavigationPage2();
      break;
    case 'page3':
      animateGiftBoxesPage3();
      break;
    case 'page4':
      animatePantunBoxPage4();
      break;
    case 'page5':
      initializePuzzlePage5();
      break;
    case 'page6':
      // Tidak ada inisialisasi khusus untuk page6
      break;
    default:
      console.warn(`No specific initialization found for page ${pageId}`);
  }
}

// --- FUNGSI INISIALISASI KHUSUS UNTUK SETIAP HALAMAN ---

// Page 2: Tab Navigation
function setupTabNavigationPage2() {
  const tabBtns = document.querySelectorAll('#page2 .tab-btn');
  const tabContents = document.querySelectorAll('#page2 .tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetTabId);

      // Cek apakah tombol yang diklik adalah tombol yang sedang aktif
      if (btn.classList.contains('active')) {
        // Jika ya, tidak perlu lakukan apa-apa
        return;
      }

      // Hapus class 'active' dari semua tombol
      tabBtns.forEach(b => b.classList.remove('active'));

      // Hapus class 'active' dari semua konten tab
      tabContents.forEach(content => content.classList.remove('active'));

      // Tambahkan class 'active' ke tombol yang diklik
      btn.classList.add('active');

      // Tambahkan class 'active' ke konten tab yang sesuai
      targetContent.classList.add('active');
    });
  });

  // Inisialisasi: Pastikan tab pertama aktif saat halaman dimuat
  const firstTabBtn = document.querySelector('#page2 .tab-btn');
  const firstTabContent = document.querySelector('#page2 .tab-content');

  if (firstTabBtn && firstTabContent) {
    // Hapus class 'active' dari semua (jika ada)
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Tambahkan class 'active' ke yang pertama
    firstTabBtn.classList.add('active');
    firstTabContent.classList.add('active');
  }
}

// Page 3: Gift Box Animation
function animateGiftBoxesPage3() {
  const giftBoxes = document.querySelectorAll('#page3 .gift-box');

  giftBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('active');
    }, index * 300); // Delay antar box
  });
}

// Page 4: Pantun Box Animation
function animatePantunBoxPage4() {
  const pantunBox = document.getElementById('pantunBox');

  setTimeout(() => {
    pantunBox.classList.add('active');
  }, 500); // Delay agar tidak langsung setelah fade in
}

// Page 5: Puzzle Game (Implementasi dasar)
function initializePuzzlePage5() {
  console.log("Initializing Puzzle Game on Page 5...");

  const wordsToFind = [
      { word: "INDI", positions: [[1,0], [1,1], [1,2], [1,3]] },
      { word: "SALMAN", positions: [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]] },
      { word: "PEJUANG", positions: [[0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7]] },
      { word: "KELUARGA", positions: [[0,6], [1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6]] },
      { word: "PMT", positions: [[3,3], [3,4], [3,5]] }
  ];

  const gridSize = 8;
  let grid = [];
  let foundWords = new Set();
  let currentWord = null;
  let currentStep = 0;
  let selectedCells = [];

  function generateGrid() {
      return [
          ['S', 'A', 'L', 'M', 'A', 'N', 'K', 'P'],
          ['I', 'N', 'D', 'I', 'U', 'J', 'E', 'E'],
          ['K', 'B', 'C', 'V', 'W', 'U', 'L', 'J'],
          ['E', 'Q', 'F', 'P', 'M', 'T', 'U', 'U'],
          ['L', 'H', 'R', 'X', 'Y', 'A', 'A', 'A'],
          ['U', 'Z', 'O', 'L', 'K', 'N', 'R', 'N'],
          ['A', 'M', 'P', 'Q', 'J', 'G', 'G', 'G'],
          ['G', 'A', 'N', 'T', 'U', 'G', 'A', 'A']
      ];
  }

  function renderGrid() {
      const puzzleGrid = document.getElementById('puzzle-grid');
      if (!puzzleGrid) {
        console.error("Element #puzzle-grid not found!");
        return;
      }
      puzzleGrid.innerHTML = '';

      for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
              const cell = document.createElement('div');
              cell.className = 'cell';
              cell.textContent = grid[i][j];
              cell.dataset.row = i;
              cell.dataset.col = j;
              cell.addEventListener('click', () => handleCellClick(i, j));
              puzzleGrid.appendChild(cell);
          }
      }
  }

  function handleCellClick(row, col) {
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

      // Jika sudah ditemukan, skip
      if (cell.classList.contains('highlighted')) return;

      // Jika sedang dalam proses mencari kata
      if (currentWord) {
          checkNextStep(row, col);
      } else {
          // Mulai baru: cari kata yang mengandung sel ini
          startNewSearch(row, col);
      }
  }

  function startNewSearch(row, col) {
      resetSelection();

      for (let wordObj of wordsToFind) {
          if (foundWords.has(wordObj.word)) continue;

          const index = wordObj.positions.findIndex(pos => pos[0] === row && pos[1] === col);

          if (index !== -1) {
              currentWord = wordObj;
              currentStep = index;
              selectedCells = [ [row, col] ];

              const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
              cell.classList.add('selected');
              return;
          }
      }

      alert("Sel ini tidak termasuk dalam kata apa pun. Coba lagi!");
  }

  function checkNextStep(row, col) {
      const nextIndex = currentStep + 1;
      if (nextIndex >= currentWord.positions.length) return;

      const expectedPos = currentWord.positions[nextIndex];

      if (expectedPos[0] === row && expectedPos[1] === col) {
          currentStep = nextIndex;
          selectedCells.push([row, col]);

          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
          cell.classList.add('selected');

          if (currentStep === currentWord.positions.length - 1) {
              completeWord();
          }
      } else {
          alert("Langkah salah! Kamu harus mengikuti urutan kata. Mulai ulang.");
          resetSelection();
      }
  }

  function completeWord() {
      currentWord.positions.forEach(pos => {
          const cell = document.querySelector(`[data-row="${pos[0]}"][data-col="${pos[1]}"]`);
          cell.classList.remove('selected');
          cell.classList.add('highlighted');
      });

      foundWords.add(currentWord.word);
      updateWordList();
      resetSelection();

      if (foundWords.size === wordsToFind.length) {
          showCompletionMessage();
      }
  }

  function resetSelection() {
      selectedCells.forEach(pos => {
          const cell = document.querySelector(`[data-row="${pos[0]}"][data-col="${pos[1]}"]`);
          if (cell && !cell.classList.contains('highlighted')) {
              cell.classList.remove('selected');
          }
      });
      selectedCells = [];
      currentWord = null;
      currentStep = 0;
  }

  function updateWordList() {
      const wordItems = document.querySelectorAll('.word-item');
      wordItems.forEach(item => {
          const word = item.textContent.trim();
          if (foundWords.has(word)) {
              item.classList.add('found');
          }
      });
  }

  function showCompletionMessage() {
      // Sembunyikan grid puzzle
      const puzzleGrid = document.getElementById('puzzle-grid');
      if (puzzleGrid) {
        puzzleGrid.style.display = 'none';
      }

      // Tampilkan completion message
      const completionMsg = document.getElementById('completion-message');
      if (completionMsg) {
        completionMsg.classList.remove('hidden');
      }

      // Event listener untuk tombol CLAIM CUPON
      const claimButton = document.getElementById('claim-button');
      if (claimButton) {
        claimButton.addEventListener('click', () => {
            goToPage(6);
        });
      }
  }

  // Inisialisasi
  grid = generateGrid();
  renderGrid();
  updateWordList();
}

// --- INISIALISASI AWAL ---
document.addEventListener('DOMContentLoaded', () => {
  // Sembunyikan semua halaman kecuali halaman 1
  document.querySelectorAll('.page').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('page1').classList.add('active');

  // Tampilkan nama tamu berdasarkan URL
  displayVisitorName();

  // Tambahkan event listener ke tombol OPEN sebagai fallback jika autoplay gagal
  const openBtn = document.getElementById('openBtn');
  if (openBtn) {
    openBtn.addEventListener('click', function(event) {
        // Coba putar musik lagi saat tombol diklik (fallback jika autoplay gagal)
        playMusic();
        // Pindah ke halaman 2
        goToPage(2);
    });
  } else {
    console.error("Element #openBtn not found!");
  }

  // Inisialisasi halaman pertama (jika perlu)
  initializePage('page1');
});