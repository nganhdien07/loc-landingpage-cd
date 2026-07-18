
(function(){
  var modal = document.querySelector('[data-product-modal]');
  function updateCount(){ var visible=[...document.querySelectorAll('.product-card')].filter(c=>!c.hidden).length; var el=document.querySelector('[data-product-count]'); if(el) el.textContent=visible; }
  document.querySelectorAll('[data-filter]').forEach(function(btn){ btn.addEventListener('click', function(){ var filter=btn.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); document.querySelectorAll('.product-card').forEach(function(card){ card.hidden = filter !== 'all' && card.dataset.series !== filter; }); updateCount(); }); });
  document.querySelectorAll('.product-card').forEach(function(card){ card.addEventListener('click', function(){ if(!modal) return; var isUniversal=card.dataset.series==='Universal'; modal.querySelector('[data-modal-image]').src = card.dataset.scene || card.dataset.image; modal.querySelector('[data-modal-image]').alt = (isUniversal ? 'Universal ' : 'LOC ') + card.dataset.code; modal.querySelector('[data-modal-series]').textContent = isUniversal ? 'Universal – Engineer' : (card.dataset.series === 'Elite' ? 'LOC Elite Series - Laminate' : 'LOC Plus Series - Laminate'); modal.querySelector('[data-modal-title]').textContent = (isUniversal ? 'Universal ' : 'LOC ') + card.dataset.code; var dds=[].slice.call(modal.querySelectorAll('.spec-row dd')); if(isUniversal){ if(dds[0]) dds[0].textContent='EN 14354 · EN 14342:2013'; if(dds[1]) dds[1].textContent='13.5mm'; }else{ if(dds[0]) dds[0].textContent='EN 13329 · Class 32'; if(dds[1]) dds[1].textContent='HDF 8mm'; } if(dds[2]) dds[2].textContent='Uniclic'; if(dds[3]) dds[3].textContent='Bỉ'; var link=modal.querySelector('.product-modal-content .btn'); if(link) link.href=card.dataset.tds || 'assets/loc-certificates/tds-loc-floor-elite-plus.pdf'; modal.classList.add('open'); document.body.style.overflow='hidden'; }); });
  document.querySelectorAll('[data-modal-close]').forEach(function(btn){ btn.addEventListener('click', function(){ modal.classList.remove('open'); document.body.style.overflow=''; }); });
  if(modal) modal.addEventListener('click', function(e){ if(e.target===modal){ modal.classList.remove('open'); document.body.style.overflow=''; } });
  var contact=document.getElementById('contactModal');
  document.querySelectorAll('[data-contact-open]').forEach(function(btn){ btn.addEventListener('click', function(e){ e.preventDefault(); contact.classList.add('open'); document.body.style.overflow='hidden'; }); });
  document.querySelectorAll('[data-contact-close]').forEach(function(btn){ btn.addEventListener('click', function(){ contact.classList.remove('open'); document.body.style.overflow=''; }); });
  if(contact) contact.addEventListener('click', function(e){ if(e.target===contact){ contact.classList.remove('open'); document.body.style.overflow=''; } });
  document.querySelectorAll('.contact-form').forEach(function(form){ form.addEventListener('submit', function(e){ e.preventDefault(); var note=form.querySelector('.contact-note'); if(note) note.textContent='Form đã sẵn sàng để kết nối hệ thống nhận lead.'; }); });
  var heroCarousel=document.querySelector('[data-hero-carousel]');
  if(heroCarousel){
    var heroSlides=[].slice.call(heroCarousel.querySelectorAll('img'));
    var heroTitle=document.querySelector('[data-hero-title]');
    var heroSubtitle=document.querySelector('[data-hero-subtitle]');
    var heroCopy=document.querySelector('.hero-copy');
    var heroIndex=0;
    function animateHeroCopy(){
      if(!heroCopy) return;
      heroCopy.classList.remove('is-entering');
      void heroCopy.offsetWidth;
      heroCopy.classList.add('is-entering');
    }
    function updateHeroCopy(slide){
      if(heroTitle && slide.dataset.title) heroTitle.textContent=slide.dataset.title;
      if(heroSubtitle && slide.dataset.subtitle) heroSubtitle.textContent=slide.dataset.subtitle;
      animateHeroCopy();
    }
    animateHeroCopy();
    if(heroSlides.length>1){
      setInterval(function(){
        heroSlides[heroIndex].classList.remove('active');
        heroIndex=(heroIndex+1)%heroSlides.length;
        heroSlides[heroIndex].classList.add('active');
        updateHeroCopy(heroSlides[heroIndex]);
      },3000);
    }
  }
  document.querySelectorAll('.technology-section').forEach(function(section){
    var techImage=section.querySelector('[data-tech-image]');
    var techCaption=section.querySelector('[data-tech-caption]');
    var techVideo=section.querySelector('[data-tech-video]');
    section.querySelectorAll('[data-tech-card]').forEach(function(card){
      card.addEventListener('click', function(){
        section.querySelectorAll('[data-tech-card]').forEach(function(item){ item.classList.remove('active'); });
        card.classList.add('active');
        if(techVideo){
          if(card.dataset.video){
            techVideo.src=card.dataset.video;
            techVideo.hidden=false;
            if(techImage) techImage.hidden=true;
            techVideo.play && techVideo.play().catch(function(){});
          }else{
            techVideo.pause && techVideo.pause();
            techVideo.removeAttribute('src');
            techVideo.load && techVideo.load();
            techVideo.hidden=true;
            if(techImage) techImage.hidden=false;
          }
        }
        if(techImage && card.dataset.image){
          techImage.src=card.dataset.image;
          techImage.alt='Minh họa công nghệ ' + card.querySelector('h3').textContent;
          techImage.style.objectPosition=card.dataset.objectPosition || '';
        }
        if(techCaption) techCaption.textContent=card.dataset.caption || card.querySelector('h3').textContent;
      });
    });
  });
  var docCards=[].slice.call(document.querySelectorAll('[data-doc-card]'));
  var docFilters=[].slice.call(document.querySelectorAll('[data-doc-filter]'));
  var docSearch=document.querySelector('[data-doc-search]');
  var docCount=document.querySelector('[data-doc-count]');
  var docGrid=document.querySelector('.finder-grid');
  function updateDocs(){
    if(!docCards.length) return;
    var checked=docFilters.filter(function(input){ return input.checked; }).map(function(input){ return input.value; });
    var term=(docSearch && docSearch.value || '').trim().toLowerCase();
    var visible=0;
    docCards.forEach(function(card){
      var matchType=!checked.length || checked.indexOf(card.dataset.type)>-1;
      var matchTerm=!term || (card.dataset.title || card.textContent).toLowerCase().indexOf(term)>-1;
      card.hidden=!(matchType && matchTerm);
      card.classList.toggle('is-hidden', card.hidden);
      if(!card.hidden) visible++;
    });
    if(docCount) docCount.textContent=visible;
  }
  docFilters.forEach(function(input){ input.addEventListener('change', updateDocs); });
  if(docSearch) docSearch.addEventListener('input', updateDocs);
  document.querySelectorAll('[data-doc-clear]').forEach(function(btn){ btn.addEventListener('click', function(){ docFilters.forEach(function(input){ input.checked=false; }); if(docSearch) docSearch.value=''; updateDocs(); }); });
  document.querySelectorAll('[data-doc-view]').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('[data-doc-view]').forEach(function(item){ item.classList.remove('active'); });
      btn.classList.add('active');
      if(docGrid) docGrid.classList.toggle('is-list', btn.dataset.docView === 'list');
    });
  });
  var tdsPreviewData={
    elite:{
      title:'LOC Floor ELITE — General Data',
      rows:[
        ['Wear resistance','≥ 4000 cycles'],
        ['Wear class','AC4'],
        ['Scratch resistance','Charge ≥ 3N'],
        ['Thickness swelling','≤ 18% sau 24h immersion'],
        ['Locking strength','Long side ≥ 1 kN/m · Short side ≥ 2 kN/m'],
        ['Resistance to staining','Class 5 / Class 4'],
        ['Light fastness','Class 4'],
        ['Origin','Belgium']
      ]
    },
    plus:{
      title:'LOC Floor PLUS — General Data',
      rows:[
        ['Wear resistance','≥ 6000 cycles'],
        ['Wear class','AC5'],
        ['Scratch resistance','Charge ≥ 3N'],
        ['Thickness swelling','≤ 18% sau 24h immersion'],
        ['Locking strength','Long side ≥ 1 kN/m · Short side ≥ 2 kN/m'],
        ['Resistance to staining','Class 5 / Class 4'],
        ['Light fastness','Class 4'],
        ['Origin','Belgium']
      ]
    },
    universal:{
      title:'Universal Floor — General Data',
      rows:[
        ['Panel','2200 x 165 mm'],
        ['Total thickness','± 13.5 mm'],
        ['Panels per pack','6'],
        ['m² per pack','2.178 m²'],
        ['Top layer','Oak · 2.5 mm'],
        ['Core board','Hevea'],
        ['Tongue and groove','Uniclic length & width'],
        ['Water Resistance','10 years']
      ]
    },
    certificate:{
      title:'Chứng chỉ và kiểm định',
      rows:[
        ['EPD','Unilin Laminate'],
        ['Nhãn A+','LOC Floor'],
        ['CE','Chứng nhận kiểm nghiệm'],
        ['DOP','Bản công bố đặc tính sản phẩm'],
        ['Uniclic','Chứng chỉ hèm khóa']
      ]
    }
  };
  var tdsPreview=document.querySelector('.lu-tds-preview');
  if(tdsPreview){
    var tdsTitle=tdsPreview.querySelector('.lu-tds-sheet h3');
    var tdsDl=tdsPreview.querySelector('.lu-tds-sheet dl');
    function renderTdsPreview(key){
      var data=tdsPreviewData[key];
      if(!data || !tdsTitle || !tdsDl) return;
      tdsTitle.textContent=data.title;
      tdsDl.innerHTML=data.rows.map(function(row){
        return '<div><dt>'+row[0]+'</dt><dd>'+row[1]+'</dd></div>';
      }).join('');
    }
    document.querySelectorAll('[data-tds-preview]').forEach(function(link){
      link.addEventListener('mouseenter', function(){ renderTdsPreview(link.dataset.tdsPreview); });
      link.addEventListener('focus', function(){ renderTdsPreview(link.dataset.tdsPreview); });
    });
  }
  updateCount();
  updateDocs();
})();
