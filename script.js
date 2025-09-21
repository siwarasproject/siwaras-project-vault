fetch('data.json')
.then(res=>res.json())
.then(data=>{
  // header
  document.getElementById('header-container').innerHTML = `<img src="${data.header.image}" alt="Header"><h1>${data.header.title}</h1>`;
  
  // sidebar
  let sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `<a href="javascript:void(0)" onclick="closeNav()">✕ Tutup</a>`;
  data.menu.forEach(item=>{ sidebar.innerHTML += `<a href="#" onclick="goToSection('${item.target}')">${item.name}</a>`; });
  sidebar.innerHTML += `<hr><strong style="color:#22c55e; padding:10px 20px; display:block;">Daftar Artikel</strong>`;
  data.articles.forEach(art=>{ sidebar.innerHTML += `<a href="#" onclick="goToSection('${art.id}')">${art.title}</a>`; });

  // main articles
  let main = document.getElementById('main-content');
  data.articles.forEach(art=>{
    main.innerHTML += `<article id="${art.id}"><h2>${art.title}</h2><img src="${art.image}"><p>${art.excerpt}</p><button class="readmore" onclick="toggleArticle(this)">Baca Selengkapnya</button><div class="full-content" style="display:none;">${art.content}</div></article>`;
  });

  // hidden sections
  data.sections.forEach(sec=>{ main.innerHTML += `<section id="${sec.id}" class="hidden-section"><h2>${sec.title}</h2>${sec.content}</section>`; });

  // footer
  document.getElementById('footer').innerHTML = data.footer;
});

function toggleArticle(btn){
  let content = btn.nextElementSibling;
  if(content.style.display==='none'){ content.style.display='block'; btn.textContent='Tutup Artikel'; }
  else{ content.style.display='none'; btn.textContent='Baca Selengkapnya'; }
}

function openNav(){ document.getElementById("sidebar").style.width="250px"; }
function closeNav(){ document.getElementById("sidebar").style.width="0"; }
function goToSection(id){
  closeNav();
  document.querySelectorAll('.hidden-section').forEach(sec=>sec.style.display='none');
  if(id){ document.getElementById(id).style.display='block'; document.getElementById(id).scrollIntoView({behavior:'smooth'}); }
  else{ window.scrollTo({top:0, behavior:'smooth'}); }
}