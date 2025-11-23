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
  };
  const targetPageId = pageMap[pageNumber];

  if (targetPageId) {
    // Animasi fade out (opsional)
    const currentPageElement = document.getElementById(appState.currentPage);
    if (currentPageElement) {
      currentPageElement.style.opacity = '0';
      currentPageElement.style.transition = 'opacity 0.5s ease-out';
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        // Sembunyikan halaman lama
        if (currentPageElement) {
          currentPageElement.classList.remove('active');
          currentPageElement.style.opacity = '1';
        }

        // Cek apakah halaman target sudah ada di DOM
        let targetPageElement = document.getElementById(targetPageId);

        if (!targetPageElement) {
          // Jika belum ada, buat elemen halaman baru
          targetPageElement = createPageElement(targetPageId);
          document.querySelector('.mobile-container').appendChild(targetPageElement);
        }

        // Tampilkan halaman baru
        targetPageElement.classList.add('active');

        // Update status halaman
        appState.currentPage = targetPageId;

        // Panggil inisialisasi khusus halaman jika ada
        initializePage(targetPageId);

      }, 500);
    });
  } else {
    console.error(`Page ${pageNumber} not defined in pageMap.`);
  }
}

// --- FUNGSI UNTUK MEMBUAT ELEMEN HALAMAN SECARA DINAMIS ---
function createPageElement(pageId) {
  const page = document.createElement('section');
  page.id = pageId;
  page.className = 'page';

  switch (pageId) {
    case 'page2':
      page.innerHTML = `
        <img src="Assets/flowerPage3.png" alt="Small Flower" class="page2bg-flower" style="top: 10%; left: 10%;">
        <img src="Assets/flowerPage3.png" alt="Small Flower" class="page2bg-flower" style="top: 80%; right: 15%;">
        <img src="Assets/flowerTopPage2.png" alt="" class="layer page2flower-top">
        <img src="Assets/flowerBottomPage2.png" alt="" class="layer page2flower-bottom">
        <div class="page2content">
          <div class="tabs">
            <button class="tab-btn active" data-tab="bride-groom">Bride & Groom</button>
            <button class="tab-btn" data-tab="akad">Wedding Vow</button>
          </div>
          <div class="tab-content active" id="bride-groom">
            <div class="info-box">
              <h3>INDI PARADISE</h3>
              <p class="parent-line">Second Daughter of Mr. Akhmad Kasun</p>
              <p class="parent-line">& Mrs. Mariyam</p>
              <span class="amp">&</span>
              <h3>SALMAN ZAKARIA</h3>
              <p class="parent-line">Second Son of Mr. Jubaedi Adnan</p>
              <p class="parent-line">& Mrs. Laswati</p>
            </div>
          </div>
          <div class="tab-content" id="akad">
            <div class="info-box">
              <p id="hari">Tuesday</p>
              <h3>25.11.25</h3>
              <p id="hari">09.00 AM </p>
              <p id="hari">Jalan Jangkang No.63 RT 13 RW 02, Leran, Manyar, Gresik</p>
            </div>
          </div>
        </div>
        <button class="open-announcement-btn" onclick="goToPage(3)" style="display: block !important; opacity: 1 !important; z-index: 999 !important;">GIFT</button>
      `;
      break;

    case 'page3':
      page.innerHTML = `
        <img src="Assets/flowersideLeftPage3.png" alt="" class="layer page3flower-top">
        <img src="Assets/flowersideRightPage3.png" alt="" class="layer page3flower-bottom">
        <img src="Assets/flowerTopPage3.png" alt="" class="layer page3flower-top2">
        <div class="page3content">
          <h1 class="title">WEDDING<br>GIFT</h1>
          <div class="gift-box slide-in-left" id="giftBox1">
            <p>Merupakan suatu <strong>kehormatan dan kebahagiaan</strong> bagi kami jika anda berkenan memberikan doa restu kepada kami.</p>
          </div>
          <div class="gift-box slide-in-right" id="giftBox2">
            <p>Namun jika memberi adalah <strong>ungkapan tanda kasih anda</strong>, maka kami akan semakin berbahagia dan bersyukur, bilamana anda berkenan memberikannya kepada yayasan-yayasan sosial-keagamaan yang fokus pada <strong>pembangunan masyarakat seimbang.</strong></p>
          </div>
          <div class="gift-box slide-in-left" id="giftBox3">
            <p>Terima kasih banyak, semoga Allah membalasnya dengan sebaik - baiknya balasan</p>
          </div>
          <h2>Indi & Salman</h2>
        </div>
        <button class="open-announcement-btn" onclick="goToPage(4)">POETRY</button>
      `;
      break;

    case 'page4':
      page.innerHTML = `
        <img src="Assets/leafLeftTopPage1.png" alt="" class="layer page4leaf-top-left">
        <img src="Assets/leafRightBottomPage1.png" alt="" class="layer page4leaf-bottom-right">
        <div class="page4content">
          <h1 class="title">IDAMAN</h1>
          <div class="pantun-box slide-in-up" id="pantunBox">
            <p>Isinya Indi dan Salman</p>
            <p>Semoga menjadi keberkahan</p>
            <p>Mampu melewati ujian</p>
            <p>Demi wujudkan harapan</p>
            <p>Bekerja sama di jalan perjuangan</p>
            <p>Menerapkan nilai keseimbangan</p>
          </div>
        </div>
        <button class="open-announcement-btn" onclick="goToPage(5)">GAME</button>
      `;
      break;

    case 'page5':
      page.innerHTML = `
        <img src="Assets/leafRightTopPage1.png" alt="" class="layer page5leaf-top-right">
        <img src="Assets/leafLeftBottomPage1.png" alt="" class="layer page5leaf-bottom-left">
        <div class="page5content">
          <h1 class="title">PUZZLE<br>WORDS</h1>
          <p class="subtitle">find our special words</p>
          <div class="words-to-find" id="words-to-find">
            <span class="word-item">INDI</span>
            <span class="word-item">SALMAN</span>
            <span class="word-item">KELUARGA</span>
            <span class="word-item">PEJUANG</span>
            <span class="word-item">PMT</span>
          </div>
          <div id="puzzle-grid"></div>
          <div id="completion-message" class="hidden">
            <h2 class="completion-title">Congratulation 🎉</h2>
            <p class="completion-text">you found all of our special words</p>
          </div>
        </div>
      `;
      break;

    default:
      console.error(`Page ${pageId} does not exist in createPageElement`);
  }

  return page;
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
  // Tunggu sampai elemen benar-benar ada di DOM
  setTimeout(() => {
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
  }, 100); // Delay kecil agar DOM sudah siap
}

// Page 3: Gift Box Animation
function animateGiftBoxesPage3() {
  setTimeout(() => {
    const giftBoxes = document.querySelectorAll('#page3 .gift-box');

    giftBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add('active');
      }, index * 300); // Delay antar box
    });
  }, 100);
}

// Page 4: Pantun Box Animation
function animatePantunBoxPage4() {
  setTimeout(() => {
    const pantunBox = document.getElementById('pantunBox');

    if (pantunBox) {
      pantunBox.classList.add('active');
    }
  }, 600);
}

// Page 5: Puzzle Game (Implementasi dasar)
function initializePuzzlePage5() {
  console.log("Initializing Puzzle Game on Page 5...");

  setTimeout(() => {
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

    }

    // Inisialisasi
    grid = generateGrid();
    renderGrid();
    updateWordList();
  }, 100);
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