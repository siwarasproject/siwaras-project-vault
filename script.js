// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const articlesContainer = document.getElementById('articles-container');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        blogData = data;
        init();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        // Fallback data if JSON fails to load
        blogData = {
            "header": {"title":"Siwaras Blog","image":"header.jpg"},
            "menu":[
                {"name":"Beranda","target":""},
                {"name":"Tentang","target":"tentang"},
                {"name":"Kontak","target":"kontak"},
                {"name":"Sosial Media","target":"sosmed"},
                {"name":"Daftar Isi Artikel","target":"daftar-artikel"}
            ],
            "articles":[
                {
                    "id":"artikel1",
                    "title":"🌹 Cinta Rasulullah ﷺ",
                    "image":"artikel1.jpg",
                    "excerpt":"Mencintai Rasulullah ﷺ adalah bagian dari iman...",
                    "content":"<div style='text-align:center; font-size:1.5rem; margin:1rem 0; animation:pulse 2s infinite;'><span style='background: linear-gradient(90deg, #22c55e, #a3e635, #22c55e); -webkit-background-clip: text; color: transparent; font-weight:bold;'>السلام عليكم</span></div><blockquote>“Tidak sempurna iman salah seorang di antara kalian hingga aku lebih ia cintai daripada dirinya sendiri, orang tuanya, dan seluruh manusia.”<br><em>(HR. Bukhari & Muslim)</em></blockquote>"
                }
            ],
            "sections":[
                {"id":"tentang","title":"Tentang Kami","content":"<p>Siwaras Project adalah blog sederhana yang dibangun dengan cinta 💚</p>"},
                {"id":"kontak","title":"Kontak","content":"<p>Email: siwaras@example.com</p>"},
                {"id":"sosmed","title":"Sosial Media","content":"<p>IG/Twitter: @siwaras</p>"}
            ],
            "footer":"© Siwaras Project - Powered by GPT Plus"
        };
        init();
    });

// Function to check if image exists
function checkImageExists(imageUrl, callback) {
    const img = new Image();
    img.onload = function() {
        callback(true);
    };
    img.onerror = function() {
        callback(false);
    };
    img.src = imageUrl;
}

// Load header data
function loadHeaderData() {
    const headerTitle = document.getElementById('header-title');
    const headerImage = document.getElementById('header-image');
    
    if (blogData.header) {
        // Set header title
        if (blogData.header.title) {
            headerTitle.textContent = blogData.header.title;
        }
        
        // Set header image
        if (blogData.header.image) {
            headerImage.src = blogData.header.image;
            
            // Check if image exists
            checkImageExists(blogData.header.image, function(exists) {
                if (!exists) {
                    console.warn('Header image not found:', blogData.header.image);
                    headerImage.style.display = 'none';
                    const container = document.querySelector('.header-image-container');
                    if (container) {
                        container.style.background = 'var(--gradient)';
                        container.style.height = '200px';
                        container.style.display = 'flex';
                        container.style.alignItems = 'center';
                        container.style.justifyContent = 'center';
                        container.innerHTML = `<span style="font-size: 2rem; font-weight: bold; color: var(--dark);">${blogData.header.title || 'Siwaras Blog'}</span>`;
                    }
                }
            });
        }
    }
}

// Render articles on home page
function renderArticles() {
    articlesContainer.innerHTML = '';
    
    blogData.articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" data-id="${article.id}">Baca Selengkapnya</a>
            </div>
        `;
        articlesContainer.appendChild(articleCard);
    });
}

// Render sections content
function renderSections() {
    blogData.sections.forEach(section => {
        const sectionElement = document.getElementById(`${section.id}-content`);
        sectionElement.innerHTML = `
            <h2>${section.title}</h2>
            ${section.content}
        `;
    });
}

// Render article list
function renderArticleList() {
    const articleListContainer = document.getElementById('article-list-container');
    articleListContainer.innerHTML = '';
    
    if (blogData.articles.length === 0) {
        articleListContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>Belum ada artikel tersedia</p>
            </div>
        `;
        return;
    }
    
    blogData.articles.forEach((article, index) => {
        const articleItem = document.createElement('div');
        articleItem.className = 'article-list-item';
        articleItem.setAttribute('data-id', article.id);
        
        // Generate random date for demo
        const randomDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const formattedDate = randomDate.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        articleItem.innerHTML = `
            <h3 class="article-list-title">${article.title}</h3>
            <p class="article-list-excerpt">${article.excerpt}</p>
            <div class="article-list-meta">
                <span class="article-list-date">${formattedDate}</span>
                <span class="article-list-read">Baca Artikel</span>
            </div>
        `;
        
        articleItem.addEventListener('click', () => {
            showArticleDetail(article.id);
        });
        
        articleListContainer.appendChild(articleItem);
    });
}

// Setup back to top button
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Menu toggle for mobile
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Menu navigation
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            if (target === 'home') {
                document.getElementById('home').classList.add('active');
            } else if (target === 'daftar-artikel') {
                document.getElementById('daftar-artikel').classList.add('active');
                renderArticleList(); // Render article list when section is shown
            } else {
                document.getElementById(target).classList.add('active');
            }
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
            }
        });
    });

    // Article detail view
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const articleId = e.target.getAttribute('data-id');
            showArticleDetail(articleId);
        }
    });

    // Back to home from article detail
    document.addEventListener('click', (e) => {
        if (e.target.id === 'back-to-home') {
            e.preventDefault();
            showSection('home');
        }
    });
    
    // Setup back to top button
    setupBackToTopButton();
}

// Show article detail
function showArticleDetail(articleId) {
    const article = blogData.articles.find(a => a.id === articleId);
    
    if (article) {
        const articleDetailContent = document.getElementById('article-detail-content');
        
        // Generate random date for demo
        const randomDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const formattedDate = randomDate.toLocaleDateString('id-ID', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        articleDetailContent.innerHTML = `
            <a href="#" id="back-to-home" style="color: var(--primary); margin-bottom: 1rem; display: inline-block;">← Kembali ke Beranda</a>
            <div style="text-align: center; margin-bottom: 1rem; color: #94a3b8; font-size: 0.9rem;">
                Dipublikasikan pada ${formattedDate}
            </div>
            <h2>${article.title}</h2>
            <img src="${article.image}" alt="${article.title}">
            <div>${article.content}</div>
            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #94a3b8; font-size: 0.9rem; text-align: center;">
                    Terima kasih telah membaca artikel ini. Jangan lupa bagikan jika bermanfaat! 💚
                </p>
            </div>
        `;
        
        // Hide all sections and show article detail
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('article-detail').classList.add('active');
        
        // Update active menu
        menuItems.forEach(mi => mi.classList.remove('active'));
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Show specific section
function showSection(sectionId) {
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    if (sectionId === 'home') {
        document.getElementById('home').classList.add('active');
        menuItems[0].classList.add('active');
    } else {
        document.getElementById(sectionId).classList.add('active');
        
        menuItems.forEach(item => {
            if (item.getAttribute('data-target') === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Initialize the page
function init() {
    loadHeaderData();
    renderArticles();
    renderSections();
    setupEventListeners();
}