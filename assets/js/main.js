/* Example Electronics v4. Official product imagery. Showcase build, no backend. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

/* Dirham glyph, inherits the surrounding text colour via CSS mask. */
var D = '<i class="dh" aria-hidden="true"></i>';
var money = function (n) { return D + '<span class="num">' + n.toLocaleString('en-US') + '</span>'; };
var plain = function (n) { return D + n.toLocaleString('en-US'); };

var RULES = {
  freeDeliveryOver: 2000,
  savingsBannerMin: 111,
  promo: { code:'WELCOME100', off:100, minSpend:800 }
};

/* colors: [display name, swatch hex, image slug] */
var P = [
  { id:'ip16p', brand:'Apple', name:'iPhone 16 Pro', price:2649, was:4199, stock:6, tags:['new'],
    storage:['128 GB','256 GB','512 GB'],
    colors:[['Desert Titanium','#C4A98C','deserttitanium'],['Black Titanium','#4A4A4C','blacktitanium'],
            ['White Titanium','#E6E4DF','whitetitanium','webp'],['Natural Titanium','#B5AFA4','naturaltitanium']] },
  { id:'ip16', brand:'Apple', name:'iPhone 16', price:2249, was:3399, stock:10, tags:['new'],
    storage:['128 GB','256 GB'],
    colors:[['Ultramarine','#8FA4D8','ultramarine'],['Teal','#B4CBC6','teal'],['Pink','#F2D9DE','pink'],
            ['Black','#3B3B3D','black'],['White','#F2F2F0','white']] },
  { id:'ip15pm', brand:'Apple', name:'iPhone 15 Pro Max', price:2329, was:5099, stock:4, tags:['save'],
    storage:['256 GB','512 GB','1 TB'],
    colors:[['Natural Titanium','#B5AFA4','naturaltitanium'],['Blue Titanium','#5A6B7E','bluetitanium'],
            ['White Titanium','#E6E4DF','whitetitanium'],['Black Titanium','#4A4A4C','blacktitanium']] },
  { id:'ip15p', brand:'Apple', name:'iPhone 15 Pro', price:2039, was:4299, stock:7, tags:['save'],
    storage:['128 GB','256 GB','512 GB'],
    colors:[['Black Titanium','#4A4A4C','blacktitanium'],['White Titanium','#E6E4DF','whitetitanium'],
            ['Blue Titanium','#5A6B7E','bluetitanium'],['Natural Titanium','#B5AFA4','naturaltitanium']] },
  { id:'ip15', brand:'Apple', name:'iPhone 15', price:1609, was:3099, stock:12, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Pink','#F0D3D8','pink'],['Yellow','#EFE7C4','yellow'],['Green','#CDD5C6','green'],['Blue','#C9D6DC','blue']] },
  { id:'ip14pm', brand:'Apple', name:'iPhone 14 Pro Max', price:1839, was:4699, stock:3, tags:['save','low'],
    storage:['128 GB','256 GB','512 GB'],
    colors:[['Space Black','#3A3A3C','spaceblack'],['Gold','#E3CDA6','gold'],
            ['Deep Purple','#5C5670','deeppurple'],['Silver','#E4E4E2','silver']] },
  { id:'ip14p', brand:'Apple', name:'iPhone 14 Pro', price:1569, was:4399, stock:9, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Space Black','#3A3A3C','spaceblack'],['Silver','#E4E4E2','silver'],
            ['Deep Purple','#5C5670','deeppurple'],['Gold','#E3CDA6','gold']] },
  { id:'ip13pm', brand:'Apple', name:'iPhone 13 Pro Max', price:1459, was:3199, stock:6, tags:['save'],
    storage:['128 GB','256 GB','512 GB'],
    colors:[['Graphite','#54524F','graphite'],['Gold','#E5CFB0','gold'],['Silver','#E8E8E6','silver'],
            ['Alpine Green','#576259','alpinegreen'],['Sierra Blue','#9CB4CC','sierrablue']] },
  { id:'ip13', brand:'Apple', name:'iPhone 13', price:979, was:2899, stock:15, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Midnight','#31363E','midnight'],['Starlight','#EEE9E2','starlight'],['Pink','#F6DDD9','pink'],
            ['Blue','#4E6C8F','blue'],['Red','#B8323C','red']] },
  { id:'ip12pm', brand:'Apple', name:'iPhone 12 Pro Max', price:1209, was:2899, stock:4, tags:['save','low'],
    storage:['128 GB','256 GB'],
    colors:[['Graphite','#54524F','graphite'],['Pacific Blue','#2D4F63','pacificblue'],
            ['Gold','#E5CFB0','gold'],['Silver','#E8E8E6','silver']] },
  { id:'ip12', brand:'Apple', name:'iPhone 12', price:669, was:2199, stock:18, tags:['save'],
    storage:['64 GB','128 GB'],
    colors:[['Black','#2B2C2E','black'],['White','#F2F2F0','white'],['Blue','#2F4E68','blue'],
            ['Green','#B6D8C8','green'],['Purple','#C4B5DC','purple'],['Red','#C6353B','red']] },
  { id:'ip11', brand:'Apple', name:'iPhone 11', price:519, was:1899, stock:22, tags:['save'],
    storage:['64 GB','128 GB'],
    colors:[['Black','#2B2C2E','black'],['White','#F2F2F0','white'],['Purple','#D5CEE4','purple'],
            ['Green','#C9E0D2','green'],['Yellow','#F2E3AA','yellow'],['Red','#C6353B','red']] },
  { id:'s24', brand:'Samsung', name:'Galaxy S24', price:1449, was:2799, stock:7, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Onyx Black','#2E2E30','onyxblack'],['Marble Gray','#B9B9BA','marblegray'],
            ['Cobalt Violet','#B0A6C9','cobaltviolet'],['Amber Yellow','#E8D9A8','amberyellow']] },
  { id:'s23u', brand:'Samsung', name:'Galaxy S23 Ultra', price:1629, was:3149, stock:5, tags:['save'],
    storage:['256 GB','512 GB'],
    colors:[['Green','#4A5A4C','green'],['Cream','#E2DACB','cream'],
            ['Lavender','#CFC7DA','lavender'],['Phantom Black','#2E2E30','phantomblack']] },
  { id:'s22u', brand:'Samsung', name:'Galaxy S22 Ultra', price:1199, was:2649, stock:8, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Phantom Black','#2E2E30','phantomblack'],['Green','#3F5145','green'],
            ['Burgundy','#6A2A38','burgundy'],['Phantom White','#EDEDEB','phantomwhite']] },
  { id:'s21u', brand:'Samsung', name:'Galaxy S21 Ultra', price:949, was:2299, stock:11, tags:['save'],
    storage:['128 GB','256 GB'],
    colors:[['Phantom Black','#2E2E30','phantomblack'],['Phantom Silver','#D8D9DB','phantomsilver']] }
];

var CONDS = [
  { k:'C', n:'Good', d:'Visible scratches, works perfectly', m:1 },
  { k:'B', n:'Very good', d:'Light marks, hard to spot', m:1.048 },
  { k:'A', n:'Excellent', d:'Like new, no visible wear', m:1.075 }
];

var BUNDLES = [
  { id:'case',  name:'Protective case',       solo:79,  bundle:39,  img:'acc/case.webp' },
  { id:'glass', name:'Tempered screen guard', solo:59,  bundle:25,  img:'acc/glass.webp' },
  { id:'chg',   name:'20W fast charger',      solo:119, bundle:69,  img:'acc/charger.webp' },
  { id:'buds',  name:'Wireless earbuds',      solo:249, bundle:169, img:'acc/buds.jpg' },
  { id:'bank',  name:'10000mAh power bank',   solo:159, bundle:99,  img:'acc/bank.jpg' }
];

var BRAND = { Apple:'assets/img/logo/apple.svg', Samsung:'assets/img/logo/samsung.png' };
var TABBY = 'assets/img/logo/tabby.webp';

/* Pay in 4 splits the price into four equal instalments. "From" because the
   figure shown is the lowest grade and storage on that model. */
function inst(price) { return Math.round(price / 4); }
function tabbyLine(price) {
  return '<span class="tby__l">From <b>' + money(inst(price)) + '</b> x4 <img class="tby" src="' +
    TABBY + '" alt="Tabby" loading="lazy"></span>';
}

/* The price block. Instalment leads, saving sits beside it as the reason,
   full price underneath as the honesty line. One block, never competing boxes. */
function priceBlock(p, save, pct) {
  return '<div class="pblk">' +
    '<div class="pblk__top">' +
      '<div class="pblk__from">' +
        '<span class="pblk__k">Starting from</span>' +
        '<span class="pblk__v"><b>' + money(inst(p.price)) + '</b><em>x4</em></span>' +
        '<span class="pblk__tby">interest free with <img src="' + TABBY + '" alt="Tabby"></span>' +
      '</div>' +
      '<div class="pblk__save"><span>You save</span><b>' + money(save) + '</b><i>' + pct + '% off</i></div>' +
    '</div>' +
    '<div class="pblk__full"><span>Or pay once</span><b>' + money(p.price) + '</b></div>' +
  '</div>';
}

/* Best offers, ranked by how much cash the buyer keeps. */
function bestDeals(limit) {
  return P.map(function (p) { return { p:p, save:p.was - p.price }; })
    .sort(function (a, b) { return b.save - a.save; })
    .slice(0, limit || 5);
}

function imgSrc(p, c) { return 'assets/img/p/' + p.id + '-' + c[2] + '.' + (c[3] || 'jpg'); }

/* Every colourway is rendered once and cross faded, so swapping is instant
   with no flash of a loading image. */
function shots(p, active, cls, eager) {
  return '<div class="ph ' + (cls || '') + '">' + p.colors.map(function (c, i) {
    return '<img class="ph__i' + (i === (active || 0) ? ' on' : '') + '" src="' + imgSrc(p, c) + '"' +
      (i === 0 && eager ? '' : ' loading="lazy"') + ' decoding="async"' +
      ' alt="' + (i === 0 ? p.name + ' in ' + c[0] : '') + '"' + (i === 0 ? '' : ' aria-hidden="true"') + '>';
  }).join('') + '</div>';
}

/* one image, sources kept on the node for instant swapping later */
function shotOne(p, cls) {
  var srcs = p.colors.map(function (c) { return imgSrc(p, c); });
  return '<div class="ph ' + (cls || '') + '" data-srcs="' + srcs.join('|') + '">' +
    '<img class="ph__i on" src="' + srcs[0] + '" loading="lazy" decoding="async" alt="' +
    p.name + ' in ' + p.colors[0][0] + '"></div>';
}
function preloadShots(box) {
  if (!box || box.dataset.pre) return;
  box.dataset.pre = '1';
  box.dataset.srcs.split('|').slice(1).forEach(function (s) { new Image().src = s; });
}
function swapShot(box, i) {
  if (!box) return;
  if (box.dataset.srcs) {                       /* single image card */
    var list = box.dataset.srcs.split('|');
    var im = box.firstElementChild;
    if (im && list[i] && im.getAttribute('src') !== list[i]) im.setAttribute('src', list[i]);
    return;
  }
  $$('.ph__i', box).forEach(function (im, n) { im.classList.toggle('on', n === i); });
}

/* ---------- insight ---------- */
var IN = { leads:0, signals:0, value:0 };
function log(txt, o) {
  o = o || {};
  if (o.lead) IN.leads++; else IN.signals++;
  if (o.value) IN.value += o.value;
  $('#ipLeads').textContent = IN.leads;
  $('#ipSignals').textContent = IN.signals;
  $('#ipValue').textContent = IN.value.toLocaleString('en-US');
  var ul = $('#ipLog'), e = $('.ip__e', ul);
  if (e) e.remove();
  var li = document.createElement('li');
  li.innerHTML = (o.lead ? '<b>LEAD</b> ' : '') + txt;
  ul.insertBefore(li, ul.firstChild);
  while (ul.children.length > 24) ul.removeChild(ul.lastChild);
  intent(o.strong ? 3 : 1);
}
$('#insightFab').addEventListener('click', function () {
  var on = document.body.classList.toggle('insight');
  $('#insightPanel').hidden = !on;
});
$('#ipClose').addEventListener('click', function () {
  document.body.classList.remove('insight'); $('#insightPanel').hidden = true;
});
function toast(msg) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg><span>' + msg + '</span>';
  $('#toasts').appendChild(t);
  setTimeout(function(){ t.classList.add('out'); setTimeout(function(){ t.remove(); }, 300); }, 3200);
}

/* ---------- gift flow ---------- */
var GIFT = { shown:false, done:false, score:0, lead:null, unlocked:false };
function intent(n) {
  if (GIFT.shown || GIFT.done) return;
  GIFT.score += n;
  if (GIFT.score >= 3) setTimeout(openGift, 700);
}
var gf = $('#giftFlow'), gbox = $('#giftBox');
function openGift() {
  if (GIFT.shown || GIFT.done) return;
  GIFT.shown = true;
  gf.hidden = false; void gf.offsetWidth; gf.classList.add('on');
  document.body.style.overflow = 'hidden';
  step1();
  log('Gift prompt shown after intent threshold reached');
}
function closeGift(done) {
  gf.classList.remove('on');
  GIFT.done = !!done;
  setTimeout(function(){ gf.hidden = true; }, 320);
  if (!$$('.sheet').some(function(d){ return !d.hidden; })) document.body.style.overflow = '';
}
function step1() {
  gbox.innerHTML =
    '<div class="g1"><button class="g1__x" data-g="close" aria-label="Close">&times;</button>' +
    '<div class="g1__i"><svg viewBox="0 0 24 24"><path d="M12 22s8-4.5 8-11a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 6.5 8 11 8 11z"/></svg></div>' +
    '<h3>Quick one before you go on</h3><p>Is this your first time shopping with Example Electronics?</p>' +
    '<div class="g1__b"><button class="g1__yes" data-g="yes">Yes, first time</button>' +
    '<button class="g1__no" data-g="no">No, I have bought before</button></div></div>';
}
function step2() {
  gbox.innerHTML =
    '<div class="g2__top"><button class="g2__x" data-g="close" aria-label="Close">&times;</button>' +
    '<i class="spark"></i><i class="spark"></i><i class="spark"></i><i class="spark"></i>' +
    '<div class="gift"><svg viewBox="0 0 24 24"><path d="M3 9h18v12H3z"/><path d="M12 9v12M3 9l2-4h5l2 4 2-4h5l2 4"/></svg></div>' +
    '<h3>You have a welcome gift</h3>' +
    '<p>First time customers get something off their first order. Tell us where to send it.</p></div>' +
    '<form class="g2__form" id="giftForm" novalidate>' +
      '<div class="gfield gfield--treasure" id="fWa"><label for="gWa">WhatsApp number</label>' +
      '<input id="gWa" type="tel" inputmode="tel" placeholder="05X XXX XXXX" autocomplete="tel"></div>' +
      '<div class="gfield gfield--slide" id="fName"><label for="gName">Your name</label>' +
      '<input id="gName" type="text" placeholder="First name" autocomplete="given-name"></div>' +
      '<button class="gbtn" id="gSend" type="submit" disabled>Send me my gift</button>' +
      '<p class="gnote">We message you the code on WhatsApp and send occasional stock alerts. Opt out any time by replying STOP.</p>' +
    '</form>';
  var wa = $('#gWa'), nm = $('#gName'), btn = $('#gSend'), fWa = $('#fWa'), fName = $('#fName');
  function refresh() {
    var okWa = wa.value.replace(/\D/g,'').length >= 9;
    fWa.classList.toggle('filled', okWa);
    if (okWa) fName.classList.add('show');
    var ready = okWa && nm.value.trim().length >= 2;
    btn.classList.toggle('ready', ready);
    btn.disabled = !ready;
  }
  wa.addEventListener('input', refresh);
  nm.addEventListener('input', refresh);
  setTimeout(function(){ wa.focus(); }, 320);
  $('#giftForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.disabled) return;
    GIFT.lead = { phone: wa.value.trim(), name: nm.value.trim() };
    GIFT.unlocked = true;
    log('New customer lead: <b>' + GIFT.lead.name + '</b> opted in on WhatsApp', { lead:true });
    step3();
  });
}
function step3() {
  var pr = RULES.promo;
  gbox.innerHTML =
    '<div class="g3"><div class="conf" id="conf"></div>' +
    '<div class="g3__top"><div class="g3__i"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg></div>' +
    '<h3>Unlocked, ' + GIFT.lead.name + '</h3><p>Your welcome gift is ready to use</p></div>' +
    '<div class="g3__body"><div class="code"><span class="code__v">' + pr.code + '</span>' +
    '<button class="code__c" data-g="copy">Copy</button></div>' +
    '<p class="g3__t"><b>' + plain(pr.off) + ' off</b> your first order over ' + plain(pr.minSpend) +
    '. Already saved to your checkout, just tap it in the cart.</p>' +
    '<button class="btn btn--p btn--full" data-g="shop">Start shopping</button></div></div>';
  confetti(); renderCart(); renderGrid();
}
function confetti() {
  var c = $('#conf'); if (!c) return;
  var cols = ['#D9A521','#1D4ED8','#12A16E','#F0C24B','#7FA5FF'];
  for (var i = 0; i < 26; i++) {
    var s = document.createElement('i');
    s.style.left = Math.random()*100 + '%';
    s.style.background = cols[i % cols.length];
    s.style.animationDelay = (Math.random()*.5) + 's';
    s.style.animationDuration = (1.6 + Math.random()*1.1) + 's';
    c.appendChild(s);
  }
}
function stepReturning() {
  gbox.innerHTML =
    '<div class="g1"><button class="g1__x" data-g="close" aria-label="Close">&times;</button>' +
    '<div class="g1__i"><svg viewBox="0 0 24 24"><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="8" r="4"/></svg></div>' +
    '<h3>Good to have you back</h3>' +
    '<p>Returning customers get first look at new stock. Want us to message you when something you are watching lands?</p>' +
    '<div class="g1__b"><button class="g1__yes" data-g="yes">Yes, alert me</button>' +
    '<button class="g1__no" data-g="close">Not right now</button></div></div>';
  log('Returning customer identified, offered stock alerts');
}
gbox.addEventListener('click', function (e) {
  var b = e.target.closest('[data-g]'); if (!b) return;
  var a = b.dataset.g;
  if (a === 'close') { closeGift(true); return; }
  if (a === 'no') { stepReturning(); return; }
  if (a === 'yes') { step2(); return; }
  if (a === 'copy') {
    if (navigator.clipboard) navigator.clipboard.writeText(RULES.promo.code).catch(function(){});
    b.textContent = 'Copied'; return;
  }
  if (a === 'shop') {
    closeGift(true);
    toast('<b>' + RULES.promo.code + '</b> saved to your checkout');
    var s = $('#shop'); if (s) s.scrollIntoView({ behavior:'smooth' });
  }
});

/* ---------- state ---------- */
var cart = [], addons = [], wish = [], shown = 8, filter = 'all', promoOn = false;
function byId(id){ return P.filter(function(p){ return p.id === id; })[0]; }

/* ---------- grid ---------- */
function cardHTML(p) {
  var save = p.was - p.price, pct = Math.round(save / p.was * 100);
  /* One tag only. Scarcity beats a discount badge, and the saving is stated
     in dirhams below the price, so a percentage tag here would just repeat it. */
  var tags = p.tags.indexOf('low') > -1
    ? '<span class="tg tg--l">Only ' + p.stock + ' left</span>'
    : (p.tags.indexOf('new') > -1 ? '<span class="tg tg--n">Brand new</span>' : '');
  var sw = p.colors.slice(0,6).map(function(c,i){
    return '<button data-i="' + i + '" class="' + (i===0?'on':'') + '" style="--sc:' + c[1] + '" aria-label="' + c[0] + '"></button>';
  }).join('');
  return '<article class="cd" data-id="' + p.id + '">' +
    '<div class="cd__t"><div class="cd__tg">' + tags + '</div>' +

    '<button class="cd__w" aria-label="Save to wishlist"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"/></svg></button>' +
    shotOne(p, 'ph--card') + '</div>' +
    '<div class="cd__b">' +
    '<div class="cd__hd"><img class="cd__bl" src="' + BRAND[p.brand] + '" alt="' + p.brand + '" loading="lazy">' +
    '<h3 class="cd__n">' + p.name + '</h3></div>' +
    '<div class="cd__sw"><div class="sw">' + sw + '</div><span class="cd__c">' + p.colors[0][0] + '</span></div>' +
    '<div class="cd__p"><b>' + money(p.price) + '</b><s>' + money(p.was) + '</s></div>' +
    '<div class="cd__sv">Save ' + plain(save) + ' <em>' + pct + '% off</em></div>' +
    '<div class="cd__i">' + tabbyLine(p.price) + '</div>' +
    '<div class="cd__x"><button class="cd__add">Add to cart</button>' +
    '<button class="cd__q" aria-label="Quick view"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></button></div>' +
    '</div></article>';
}
function visible() {
  return P.filter(function(p){
    if (filter === 'all') return true;
    if (filter === 'under1500') return p.price < 1500;
    if (filter === 'new') return p.tags.indexOf('new') > -1;
    return p.brand === filter;
  });
}
function giftTile() {
  if (GIFT.unlocked) {
    return '<article class="cd gtile gtile--done"><div class="gtile__in">' +
      '<div class="gtile__i"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg></div>' +
      '<h3>' + RULES.promo.code + ' is ready</h3>' +
      '<p>' + plain(RULES.promo.off) + ' off once your cart passes ' + plain(RULES.promo.minSpend) + '.</p>' +
      '</div></article>';
  }
  return '<article class="cd gtile" id="gtile"><div class="gtile__in">' +
    '<div class="gtile__i"><svg viewBox="0 0 24 24"><path d="M3 9h18v12H3z"/><path d="M12 9v12M3 9l2-4h5l2 4 2-4h5l2 4"/></svg></div>' +
    '<span class="gtile__tag">First order</span>' +
    '<h3>' + plain(RULES.promo.off) + ' off your first phone</h3>' +
    '<p>Takes ten seconds. We send the code to your WhatsApp.</p>' +
    '<span class="btn btn--g btn--full">Claim my gift</span></div></article>';
}
function renderGrid() {
  var list = visible();
  var cards = list.slice(0, shown).map(cardHTML);
  /* sits in the flow of the grid rather than interrupting as a popup */
  if (cards.length > 3) cards.splice(4, 0, giftTile());
  $('#grid').innerHTML = cards.join('');
  $('#loadMore').style.display = list.length > shown ? '' : 'none';
  syncWish();
}
function syncWish() {
  $$('.cd').forEach(function(c){
    var w = c.querySelector('.cd__w');   /* the gift tile is a .cd with no wishlist button */
    if (w) w.classList.toggle('on', wish.indexOf(c.dataset.id) > -1);
  });
  var w = $('#wishCount'); w.textContent = wish.length; w.classList.toggle('zero', !wish.length);
}
function cardSwatch(c, b) {
  var p = byId(c.dataset.id), i = +b.dataset.i;
  swapShot($('.ph', c), i);
  $('.cd__c', c).textContent = p.colors[i][0];
}
$('#grid').addEventListener('mouseover', function(e){
  var c = e.target.closest('.cd');
  if (c) preloadShots($('.ph', c));
  var b = e.target.closest('.sw button'); if (!b) return;
  cardSwatch(c, b);
});
$('#grid').addEventListener('touchstart', function(e){
  var c = e.target.closest('.cd'); if (c) preloadShots($('.ph', c));
}, { passive:true });
$('#grid').addEventListener('click', function(e){
  if (e.target.closest('#gtile')) {
    log('Tapped the in grid gift offer', { strong:true });
    GIFT.score = 0; GIFT.shown = false; GIFT.done = false;
    openGift();
    return;
  }
  var c = e.target.closest('.cd'); if (!c || c.classList.contains('gtile')) return;
  var p = byId(c.dataset.id), b = e.target.closest('.sw button');
  if (b) {
    $$('.sw button', c).forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); cardSwatch(c, b);
    log('Colour preference: <b>' + p.name + '</b> in ' + p.colors[+b.dataset.i][0]);
    return;
  }
  if (e.target.closest('.cd__w')) {
    var i = wish.indexOf(p.id);
    if (i > -1) wish.splice(i,1);
    else { wish.push(p.id); log('Wishlist add: <b>' + p.name + '</b>', { value:p.price, strong:true }); }
    syncWish(); return;
  }
  if (e.target.closest('.cd__add')) { addCart(p); return; }
  if (e.target.closest('.cd__q')) { openPDP(p); return; }
});
$('#loadMore').addEventListener('click', function(){ shown += 8; renderGrid(); log('Deep browse: loaded more results'); });
$('#filters').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  $$('#filters button').forEach(function(x){ x.classList.remove('on'); });
  b.classList.add('on'); filter = b.dataset.f; shown = 8; renderGrid();
  log('Filter applied: <b>' + b.textContent.trim() + '</b>');
});
$$('[data-filter]').forEach(function(a){
  a.addEventListener('click', function(){
    filter = a.dataset.filter; shown = 8; renderGrid();
    $$('#filters button').forEach(function(x){ x.classList.toggle('on', x.dataset.f === filter); });
    if (filter !== 'all') log('Category intent: <b>' + filter + '</b>');
  });
});

/* ---------- cart ---------- */
function addCart(p, cond, stor, ci) {
  cond = cond || CONDS[1]; stor = stor || p.storage[0]; ci = ci || 0;
  var price = Math.round(p.price * cond.m), wasU = Math.round(p.was * cond.m);
  cart.push({ id:p.id, name:p.name, price:price, was:wasU, cond:cond.n, stor:stor,
              img:imgSrc(p, p.colors[ci]), color:p.colors[ci][0] });
  renderCart(); bump('#cartCount');
  toast('<b>' + p.name + '</b> added to cart');
  log('Add to cart: <b>' + p.name + '</b> ' + stor + ' grade ' + cond.k, { value:price, strong:true });
  openSheet('#cartDrawer');
}
function bump(sel){ var e = $(sel); e.classList.add('pop'); setTimeout(function(){ e.classList.remove('pop'); }, 420); }
function totals() {
  var sub = 0, wasSum = 0;
  cart.forEach(function(i){ sub += i.price; wasSum += i.was; });
  addons.forEach(function(a){ sub += a.bundle; wasSum += a.solo; });
  var discount = (promoOn && sub >= RULES.promo.minSpend) ? RULES.promo.off : 0;
  return { sub:sub, wasSum:wasSum, discount:discount, total:sub - discount, saved:(wasSum - sub) + discount };
}
function renderCart() {
  var t = totals(), n = cart.length + addons.length;
  var cc = $('#cartCount'); cc.textContent = n; cc.classList.toggle('zero', !n);
  var sb = $('#sbar');
  sb.hidden = !n;
  document.body.classList.toggle('has-bar', !!n);
  if (n) {
    $('#sbarN').textContent = n;
    $('#sbarPrice').innerHTML = plain(t.total);
    $('#sbarSave').innerHTML = t.saved > 0 ? 'Saving ' + plain(t.saved) : '';
  }

  if (!n) {
    $('#cartBody').innerHTML = '<div class="empty">Your cart is empty.<br>Browse phones to get started.</div>';
    $('#cartFoot').innerHTML = '<button class="btn btn--o btn--full" data-close>Keep shopping</button>';
    ship(0); return;
  }
  var rows = cart.map(function(i,ix){
    return '<div class="crow"><div class="crow__i"><img src="' + i.img + '" alt="" loading="lazy"></div>' +
      '<div><b>' + i.name + '</b><i>' + i.color + ' · ' + i.stor + ' · Grade ' + i.cond + '</i>' +
      '<button class="rm" data-rm="p" data-ix="' + ix + '">Remove</button></div>' +
      '<div class="rt"><span>' + money(i.price) + '</span><s>' + money(i.was) + '</s></div></div>';
  }).join('');
  rows += addons.map(function(a,ix){
    return '<div class="crow"><div class="crow__i"><img src="assets/img/' + a.img + '" alt="" loading="lazy"></div>' +
      '<div><b>' + a.name + '</b><i>Bundle price</i>' +
      '<button class="rm" data-rm="a" data-ix="' + ix + '">Remove</button></div>' +
      '<div class="rt"><span>' + money(a.bundle) + '</span><s>' + money(a.solo) + '</s></div></div>';
  }).join('');

  var banner = t.saved >= RULES.savingsBannerMin
    ? '<div class="svb"><div class="svb__i"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg></div>' +
      '<div><b>You are saving ' + plain(t.saved) + '</b><i>Against buying these new</i></div></div>' : '';

  var avail = BUNDLES.filter(function(b){ return !addons.some(function(a){ return a.id === b.id; }); }).slice(0,3);
  var bundle = (cart.length && avail.length)
    ? '<div class="bnd"><div class="bnd__h"><b>Frequently bought together</b><span>Bundle price</span></div>' +
      avail.map(function(b){
        return '<div class="bi" data-b="' + b.id + '"><div class="bi__i"><img src="assets/img/' + b.img + '" alt="" loading="lazy"></div>' +
          '<div><b>' + b.name + '</b><div class="pr"><strong>' + money(b.bundle) + '</strong><s>' + money(b.solo) + '</s></div></div>' +
          '<button class="bi__a">Add</button></div>';
      }).join('') + '</div>' : '';

  $('#cartBody').innerHTML = banner + rows + bundle;

  var pr = RULES.promo, eligible = t.sub >= pr.minSpend, chip = '';
  if (GIFT.unlocked) {
    chip = '<div class="pmo"><div class="pmo__h">Your codes</div>' +
      '<button class="pchip' + (promoOn ? ' applied' : '') + '"' + (eligible ? '' : ' disabled') + ' id="promoChip">' +
      '<span class="pchip__c">' + pr.code + '</span>' +
      '<span><b>' + plain(pr.off) + ' off</b><i>' + (eligible ? 'Ready to apply' : 'Spend ' + plain(pr.minSpend - t.sub) + ' more to unlock') + '</i></span>' +
      '<span class="pchip__x">' + (promoOn ? 'Applied' : 'Tap to apply') + '</span></button></div>';
  }
  $('#cartFoot').innerHTML = chip +
    (t.discount ? '<div class="tot"><span>Discount</span><b class="disc">- ' + money(t.discount) + '</b></div>' : '') +
    '<div class="tot"><span>Total</span><div>' +
      (t.saved > 0 ? '<span class="was">' + plain(t.wasSum) + '</span>' : '') +
      '<b>' + money(t.total) + '</b></div></div>' +
    '<button class="btn btn--p btn--l btn--full" id="checkoutBtn">Checkout</button>' +
    '<div class="pay"><span>Pay with</span>' +
      '<img src="assets/img/logo/tabby.webp" alt="Tabby"><img src="assets/img/logo/applepay.webp" alt="Apple Pay">' +
      '<img src="assets/img/logo/visa.webp" alt="Visa"><img src="assets/img/logo/mastercard.svg" alt="Mastercard"></div>';
  ship(t.total);
}
function ship(tot) {
  var need = RULES.freeDeliveryOver - tot, bar = $('#shipBar');
  if (!tot) { bar.style.setProperty('--p','0%'); $('#shipTxt').innerHTML = 'Free delivery on orders over ' + plain(RULES.freeDeliveryOver); bar.classList.remove('done'); }
  else if (need > 0) { bar.style.setProperty('--p', (tot/RULES.freeDeliveryOver*100) + '%'); $('#shipTxt').innerHTML = 'Add ' + plain(need) + ' more for free delivery'; bar.classList.remove('done'); }
  else { bar.style.setProperty('--p','100%'); $('#shipTxt').textContent = 'You qualify for free delivery'; bar.classList.add('done'); }
}
$('#cartBody').addEventListener('click', function(e){
  var rm = e.target.closest('[data-rm]');
  if (rm) {
    if (rm.dataset.rm === 'p') cart.splice(+rm.dataset.ix,1); else addons.splice(+rm.dataset.ix,1);
    renderCart(); return;
  }
  var bi = e.target.closest('.bi');
  if (bi && e.target.closest('.bi__a')) {
    var b = BUNDLES.filter(function(x){ return x.id === bi.dataset.b; })[0];
    addons.push(b);
    log('Bundle attached: <b>' + b.name + '</b> at bundle price', { value:b.bundle });
    toast('<b>' + b.name + '</b> added, you saved ' + plain(b.solo - b.bundle));
    renderCart(); bump('#cartCount');
  }
});
$('#cartFoot').addEventListener('click', function(e){
  if (e.target.closest('#promoChip')) {
    promoOn = !promoOn;
    log(promoOn ? 'Promo <b>' + RULES.promo.code + '</b> applied at checkout' : 'Promo removed');
    renderCart(); return;
  }
  if (e.target.closest('#checkoutBtn')) {
    closeAll();
    modal('<h3>Reserve your order</h3><p>Confirm your details and we deliver today. Pay on delivery or online, your choice.</p>' +
      '<form data-lead="Checkout"><input placeholder="Full name" value="' + (GIFT.lead ? GIFT.lead.name : '') + '" required>' +
      '<input type="tel" placeholder="Mobile number" value="' + (GIFT.lead ? GIFT.lead.phone : '') + '" required>' +
      '<input placeholder="Delivery area in Dubai" required><button class="btn btn--p" type="submit">Confirm reservation</button></form>');
  }
});
$('#sbar').addEventListener('click', function(){ openSheet('#cartDrawer'); });

/* ---------- PDP ---------- */
function openPDP(p) {
  var sel = { color:0, stor:0, cond:1 };
  $('#pdpTitle').textContent = p.name;
  $('#pdpBody').innerHTML = '<div class="pdp">' +
    '<div class="pdp__d">' + shots(p, 0, 'ph--pdp', true) + '</div>' +
    '<div class="pdp__meta"></div></div>';
  var box = $('.ph', $('#pdpBody'));
  function paint() {
    var price = Math.round(p.price * CONDS[sel.cond].m), wasU = Math.round(p.was * CONDS[sel.cond].m);
    $('.pdp__meta', $('#pdpBody')).innerHTML =
      '<div class="pdp__br"><img src="' + BRAND[p.brand] + '" alt="' + p.brand + '"><span>Certified renewed</span></div>' +
      '<h3>' + p.name + '</h3>' +
      '<div class="pdp__p"><b>' + money(price) + '</b><s>' + money(wasU) + '</s></div>' +
      '<span class="cd__sv">You save ' + plain(wasU - price) + '</span>' +
      '<div class="pdp__tby">' +
        '<div class="pdp__tby-r"><span>From</span><b>' + money(inst(price)) + '</b><em>x4 interest free</em>' +
        '<img class="tby" src="' + TABBY + '" alt="Tabby"></div>' +
        '<button class="pdp__tby-q" id="tbyHow">How does this work?</button>' +
        '<p class="pdp__tby-x">The full price is ' + money(price) + '. Tabby splits it into four equal ' +
        'payments of ' + money(inst(price)) + ' with no interest and no fees. The "from" price on the ' +
        'home page is the lowest grade and storage of this model.</p></div>' +
      '<div class="pdp__lb">Colour: <em>' + p.colors[sel.color][0] + '</em></div><div class="pdp__sw">' +
      p.colors.map(function(c,i){ return '<button data-k="color" data-i="' + i + '" class="' + (i===sel.color?'on':'') + '" style="--sc:' + c[1] + '" aria-label="' + c[0] + '"></button>'; }).join('') + '</div>' +
      '<div class="pdp__lb">Storage: <em>' + p.storage[sel.stor] + '</em></div><div class="pdp__o">' +
      p.storage.map(function(s,i){ return '<button data-k="stor" data-i="' + i + '" class="' + (i===sel.stor?'on':'') + '">' + s + '</button>'; }).join('') + '</div>' +
      '<div class="pdp__lb">Condition: <em>' + CONDS[sel.cond].n + '</em></div><div class="pdp__cn">' +
      CONDS.map(function(c,i){ return '<button data-k="cond" data-i="' + i + '" class="' + (i===sel.cond?'on':'') + '">' +
        '<div><b>Grade ' + c.k + ' · ' + c.n + '</b><i>' + c.d + '</i></div><span>' + money(Math.round(p.price*c.m)) + '</span></button>'; }).join('') + '</div>' +
      '<div class="pdp__in"><span><b>In the box:</b> phone, cable</span><span><b>Warranty:</b> 12 months</span><span><b>Delivery:</b> today</span></div>' +
      '<div class="pdp__by"><button class="btn btn--p btn--l btn--full" id="pdpAdd">Add to cart · ' + money(price) + '</button>' +
      '<button class="pdp__al" id="pdpAlert"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7z"/><path d="M10 20h4"/></svg>Tell me if this price drops</button></div>';
  }
  paint();
  $('#pdpBody').onclick = function(e){
    var b = e.target.closest('[data-k]');
    if (b) {
      sel[b.dataset.k] = +b.dataset.i;
      if (b.dataset.k === 'color') swapShot(box, sel.color);
      paint();
      if (b.dataset.k === 'cond') log('Condition compared on <b>' + p.name + '</b>: grade ' + CONDS[sel.cond].k);
      if (b.dataset.k === 'color') log('Colour preference: <b>' + p.name + '</b> in ' + p.colors[sel.color][0]);
      return;
    }
    if (e.target.closest('#tbyHow')) { e.target.closest('.pdp__tby').classList.toggle('open'); log('Opened the pay in 4 explainer'); return; }
    if (e.target.closest('#pdpAdd')) { closeAll(); addCart(p, CONDS[sel.cond], p.storage[sel.stor], sel.color); return; }
    if (e.target.closest('#pdpAlert')) { closeAll(); askAlert(p); return; }
  };
  openSheet('#pdpDrawer');
  log('Product viewed: <b>' + p.name + '</b>', { strong:true });
}
function askAlert(p) {
  modal('<h3>Watch this price</h3><p>We message you the moment the ' + p.name +
    ' drops in price or a better grade lands in stock. One message, no spam.</p>' +
    '<form data-lead="Price alert: ' + p.name + '"><input type="tel" placeholder="WhatsApp number" required>' +
    '<button class="btn btn--p" type="submit">Watch this price</button></form>');
}

/* ---------- sheets ---------- */
function openSheet(sel) {
  var d = $(sel); d.hidden = false; void d.offsetWidth;
  d.classList.add('on'); $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeAll() {
  $$('.sheet').forEach(function(d){
    if (d.hidden) return;
    d.classList.remove('on');
    setTimeout(function(){ d.hidden = true; }, 380);
  });
  var m = $('#modal');
  if (!m.hidden) { m.classList.remove('on'); setTimeout(function(){ m.hidden = true; }, 280); }
  $('#scrim').classList.remove('on');
  if (gf.hidden) document.body.style.overflow = '';
}
$('#scrim').addEventListener('click', closeAll);
document.addEventListener('click', function(e){ if (e.target.closest('[data-close]')) closeAll(); });
document.addEventListener('keydown', function(e){
  if (e.key !== 'Escape') return;
  if (!gf.hidden) { closeGift(true); return; }
  closeAll();
});
$('#cartBtn').addEventListener('click', function(){ openSheet('#cartDrawer'); });
$('#wishBtn').addEventListener('click', function(){
  if (!wish.length) { toast('Your wishlist is empty'); return; }
  var names = wish.map(function(id){ return byId(id).name; }).join(', ');
  modal('<h3>Your wishlist</h3><p>' + names + '</p><p style="margin-top:10px">Want us to hold these and send a bundle price?</p>' +
    '<form data-lead="Wishlist bundle quote"><input type="tel" placeholder="WhatsApp number" required>' +
    '<button class="btn btn--p" type="submit">Send me a bundle price</button></form>');
});
function modal(html) {
  var m = $('#modal');
  $('#modalBox').innerHTML = '<button class="mdl__x" data-close aria-label="Close">&times;</button>' + html;
  m.hidden = false; void m.offsetWidth; m.classList.add('on');
  $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
$('#modalBox').addEventListener('submit', function(e){
  var f = e.target.closest('form[data-lead]'); if (!f) return;
  e.preventDefault();
  log(f.dataset.lead + ' captured with contact number', { lead:true });
  $('#modalBox').innerHTML = '<div class="ok"><div class="ok__i"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg></div>' +
    '<h3>You are on the list</h3><p>We will message you on WhatsApp. This is a draft, so nothing was actually sent.</p>' +
    '<button class="btn btn--p btn--full" data-close style="margin-top:16px">Done</button></div>';
});

/* ---------- trade in ---------- */
var TIN = [ {n:'iPhone 15 Pro Max',b:2100},{n:'iPhone 15',b:1350},{n:'iPhone 14 Pro',b:1500},
  {n:'iPhone 13',b:850},{n:'iPhone 12',b:520},{n:'iPhone 11',b:380},
  {n:'Galaxy S23 Ultra',b:1300},{n:'Galaxy S22',b:700},{n:'Other model',b:400} ];
var STOR = [['64 GB',.88],['128 GB',1],['256 GB',1.12],['512 GB',1.26]];
var TCOND = [['Flawless','Like new, no marks',1],['Good','Light scratches',.85],['Worn','Clear scratches or dents',.68],['Damaged','Cracked screen or faulty',.4]];
var tin = { m:null, s:null, c:null, step:1 };
$('#tinModels').innerHTML = TIN.map(function(m,i){ return '<button data-i="' + i + '">' + m.n + '</button>'; }).join('');
$('#tinStorage').innerHTML = STOR.map(function(s,i){ return '<button data-i="' + i + '">' + s[0] + '</button>'; }).join('');
$('#tinCond').innerHTML = TCOND.map(function(c,i){ return '<button data-i="' + i + '"><span>' + c[0] + '</span><em>' + c[1] + '</em></button>'; }).join('');
function tinGo(n){ tin.step = n; $$('.tin__s').forEach(function(s){ s.classList.toggle('is-on', +s.dataset.step === n); }); $('#tinBar').style.width = (n*25) + '%'; }
$('#tinModels').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  tin.m = TIN[+b.dataset.i]; tinGo(2); log('Trade in started: <b>' + tin.m.n + '</b>', { strong:true });
});
$('#tinStorage').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return; tin.s = STOR[+b.dataset.i]; tinGo(3);
});
$('#tinCond').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  tin.c = TCOND[+b.dataset.i];
  var v = Math.round(tin.m.b * tin.s[1] * tin.c[2] / 10) * 10;
  $('#tinModelName').textContent = tin.m.n + ' · ' + tin.s[0] + ' · ' + tin.c[0];
  var out = $('#tinValue'), cur = 0;
  var t = setInterval(function(){
    cur += Math.max(10, Math.round(v/22));
    if (cur >= v) { cur = v; clearInterval(t); }
    out.textContent = cur.toLocaleString('en-US');
  }, 28);
  tinGo(4);
  log('Trade in valued: <b>' + tin.m.n + '</b> at ' + plain(v), { value:v, strong:true });
});
$$('.bk').forEach(function(b){ b.addEventListener('click', function(){ tinGo(tin.step === 4 ? 1 : tin.step - 1); }); });
$('#tinForm').addEventListener('submit', function(e){
  e.preventDefault();
  var name = $('#tinName').value || 'Customer';
  log('Trade in lead: <b>' + name + '</b> locked ' + tin.m.n + ' quote for 7 days', { lead:true });
  $('.tin__s[data-step="4"]').innerHTML =
    '<div class="ok"><div class="ok__i"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-9"/></svg></div>' +
    '<h3>Price locked for 7 days</h3><p>We sent the quote to your WhatsApp, ' + name +
    '. Bring the phone in or book a free collection.</p>' +
    '<button class="btn btn--p btn--full" style="margin-top:16px" onclick="location.reload()">Value another phone</button></div>';
});

/* ---------- finder ---------- */
var fin = { budget:1500, priority:null, brand:'any' };
var sl = $('#finBudget');
function slPaint(){ sl.style.setProperty('--p', (sl.value - sl.min)/(sl.max - sl.min)*100 + '%'); $('#finBudgetOut').textContent = (+sl.value).toLocaleString('en-US'); }
sl.addEventListener('input', function(){ fin.budget = +sl.value; slPaint(); finRun(); });
sl.addEventListener('change', function(){ log('Budget signal: up to <b>' + plain(fin.budget) + '</b>'); });
slPaint();
$('#finPriority').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  $$('#finPriority button').forEach(function(x){ x.classList.remove('on'); });
  b.classList.add('on'); fin.priority = b.dataset.v;
  log('Priority signal: <b>' + b.textContent + '</b>', { strong:true }); finRun();
});
$('#finBrand').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  $$('#finBrand button').forEach(function(x){ x.classList.remove('on'); });
  b.classList.add('on'); fin.brand = b.dataset.v; finRun();
});
function finRun() {
  var pro = { ip16p:1, ip15pm:1, ip15p:1, ip14pm:1, ip14p:1, ip13pm:1, ip12pm:1, s23u:1, s22u:1, s21u:1 };
  var list = P.filter(function(p){
    if (p.price > fin.budget) return false;
    if (fin.brand !== 'any' && p.brand !== fin.brand) return false;
    if (fin.priority === 'camera' || fin.priority === 'gaming') return !!pro[p.id];
    return true;
  }).sort(function(a,b){ return b.price - a.price; }).slice(0,3);
  if (!fin.priority) { $('#finOut').innerHTML = '<p class="fin__h">Pick what matters most and we shortlist instantly.</p>'; return; }
  if (!list.length) {
    $('#finOut').innerHTML = '<p class="fin__h">Nothing in stock at that budget yet. Raise the budget, or let us message you when something lands.</p>' +
      '<div class="fin__c"><p><b>We will hunt for it.</b> Give us your number and we message you when a match arrives.</p><button class="btn btn--p" id="finLead">Alert me</button></div>';
  } else {
    $('#finOut').innerHTML = '<div class="fin__r">' + list.map(function(p){
      return '<div class="fin__m" data-open="' + p.id + '"><div class="fin__im"><img src="' + imgSrc(p, p.colors[0]) + '" alt="" loading="lazy"></div>' +
        '<div><b>' + p.name + '</b><span>' + plain(p.price) + '</span><i>Grade B, in stock</i></div></div>';
    }).join('') + '</div>' +
    '<div class="fin__c"><p><b>Want these compared side by side?</b> We send a one page comparison to your WhatsApp with live prices.</p><button class="btn btn--p" id="finLead">Send my shortlist</button></div>';
  }
}
$('#finOut').addEventListener('click', function(e){
  var m = e.target.closest('[data-open]');
  if (m) { openPDP(byId(m.dataset.open)); return; }
  if (e.target.closest('#finLead')) {
    modal('<h3>Send my shortlist</h3><p>We message the matches to your WhatsApp with live stock and prices, and hold them for 48 hours.</p>' +
      '<form data-lead="Finder shortlist (budget ' + fin.budget + ', wants ' + (fin.priority || 'any') + ')">' +
      '<input placeholder="Your name" required><input type="tel" placeholder="WhatsApp number" required>' +
      '<button class="btn btn--p" type="submit">Send my shortlist</button></form>');
  }
});
finRun();

/* ---------- search ---------- */
var si = $('#searchInput'), sd = $('#searchDrop');
si.addEventListener('input', function(){
  var q = si.value.trim().toLowerCase();
  if (!q) { sd.hidden = true; return; }
  var hits = P.filter(function(p){ return (p.name + ' ' + p.brand).toLowerCase().indexOf(q) > -1; }).slice(0,6);
  sd.innerHTML = hits.length
    ? hits.map(function(p){ return '<a href="#shop" data-open="' + p.id + '"><img src="' + imgSrc(p, p.colors[0]) + '" alt="" loading="lazy">' +
        '<span>' + p.name + '</span><b>' + plain(p.price) + '</b></a>'; }).join('')
    : '<div class="none">No match for "' + si.value + '". We can source it, ask us on WhatsApp.</div>';
  sd.hidden = false;
});
sd.addEventListener('click', function(e){
  var a = e.target.closest('[data-open]'); if (!a) return;
  e.preventDefault(); sd.hidden = true; si.value = ''; openPDP(byId(a.dataset.open));
});
$('#searchForm').addEventListener('submit', function(e){
  e.preventDefault();
  if (si.value.trim()) log('Search query: <b>' + si.value.trim() + '</b>', { strong:true });
});
document.addEventListener('click', function(e){ if (!e.target.closest('.srch') && !e.target.closest('#srchToggle')) sd.hidden = true; });
$('#srchToggle').addEventListener('click', function(){
  var s = $('#searchForm'); s.classList.toggle('on');
  if (s.classList.contains('on')) si.focus();
});
$('#capForm').addEventListener('submit', function(e){
  e.preventDefault();
  var m = $('#capModel').value || 'unspecified model';
  log('Stock alert: wants <b>' + m + '</b>, number captured', { lead:true });
  toast('You are on the list for <b>' + m + '</b>');
  e.target.reset();
});

var exited = false;
document.addEventListener('mouseout', function(e){
  if (exited || e.relatedTarget || e.clientY > 20) return;
  exited = true;
  if (!GIFT.shown && !GIFT.done) { openGift(); return; }
  if (GIFT.done && !GIFT.unlocked) {
    modal('<h3>Before you go</h3><p>Take ' + plain(RULES.promo.off) + ' off your first order over ' + plain(RULES.promo.minSpend) + '. We send the code to your WhatsApp.</p>' +
      '<form data-lead="Exit intent voucher"><input type="tel" placeholder="WhatsApp number" required>' +
      '<button class="btn btn--p" type="submit">Send me the code</button></form>');
    log('Exit intent triggered: recovery offer shown');
  }
});
/* FABs reveal only after the hero, so they never sit on its CTA */
(function () {
  var on = false;
  function check() {
    var want = scrollY > 380;
    if (want !== on) { on = want; document.body.classList.toggle('scrolled', on); }
  }
  addEventListener('scroll', check, { passive:true }); check();
})();
/* Desktop has exit intent. Touch devices do not, so engagement depth, dwell
   time and a fast upward flick all count toward the same threshold. */
var hit35 = false, hit65 = false, lastY = 0, upRun = 0, leftOnce = false;
window.addEventListener('scroll', function(){
  var y = scrollY, depth = (y + innerHeight) / document.body.scrollHeight;
  if (!hit35 && depth > .35) { hit35 = true; intent(1); }
  if (!hit65 && depth > .65) { hit65 = true; intent(2); }
  /* a hard flick back to the top is the closest thing mobile has to leaving */
  if (y < lastY - 90) upRun += 1; else if (y > lastY) upRun = 0;
  if (!leftOnce && upRun >= 3 && hit35 && y < 400) { leftOnce = true; intent(3); }
  lastY = y;
}, { passive:true });

/* dwell: 25 seconds of an open, visible tab */
var dwell = 0;
setInterval(function(){
  if (document.visibilityState !== 'visible') return;
  dwell += 1;
  if (dwell === 25) intent(2);
}, 1000);

/* ---------- content ---------- */
var ANNO = ['Free same day delivery across Dubai','12 month warranty on every graded phone',
  'AED 100 off your first order with <b>WELCOME100</b>','Trade in and pay less','Pay in 4, interest free with Tabby'];
$('#annoTrack').innerHTML = (ANNO.concat(ANNO)).map(function(s){ return '<span>' + s + '</span><i></i>'; }).join('');

var REV = [
  ['Mariam A.','Downtown','Grade B iPhone 13 looked better than described. Delivered in three hours.'],
  ['Joseph K.','Business Bay','Traded my old 12 Pro. Got the quote on WhatsApp and they honoured it exactly.'],
  ['Priya S.','Marina','They came to my building so I could check the phone first. No pressure at all.'],
  ['Hassan R.','Downtown','Battery health was exactly what the listing said. That is rare here.']
];
$('#revs').innerHTML = REV.map(function(r){
  return '<article class="rv"><div class="st">★★★★★</div><p>' + r[2] + '</p>' +
    '<div class="rv__w"><div class="av">' + r[0][0] + '</div><div><b>' + r[0] + '</b><i>' + r[1] + '</i></div></div></article>';
}).join('');

var PROOF = [['Ahmed','Downtown','iPhone 13 Pro Max'],['Sara','JVC','iPhone 15'],
  ['Rahul','Bur Dubai','Galaxy S23 Ultra'],['Fatima','Mirdif','iPhone 14 Pro'],['Omar','JLT','iPhone 12']];
var pi = 0;
setTimeout(function tick(){
  var p = PROOF[pi++ % PROOF.length];
  toast('<b>' + p[0] + '</b> in ' + p[1] + ' just ordered a ' + p[2]);
  setTimeout(tick, 24000);
}, 11000);

/* ================= hero deal carousel ================= */
var DEALS = bestDeals(4);
var dIdx = 0, dTimer = null, DUR = 5200;

function dealSlide(d, i) {
  var p = d.p, pct = Math.round(d.save / p.was * 100);
  var low = p.stock <= 5;
  return '<article class="dsl" data-open="' + p.id + '">' +
    '<div class="dsl__hd">' +
      '<span class="dsl__bg">' + (i === 0 ? 'Biggest saving today' : 'Deal ' + (i + 1)) + '</span>' +
      (low ? '<span class="dsl__st">Only ' + p.stock + ' left</span>' : '') +
      '<img class="dsl__brand" src="' + BRAND[p.brand] + '" alt="' + p.brand + '">' +
    '</div>' +
    '<div class="dsl__im"><img src="' + imgSrc(p, p.colors[0]) + '" alt="' + p.name + '"' +
      (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + '></div>' +
    '<div class="dsl__b">' +
      '<h3>' + p.name + '</h3>' +
      '<p class="dsl__m">Grade A tested &middot; ' + p.storage[0] + ' &middot; ' + p.colors[0][0] + '</p>' +
      priceBlock(p, d.save, pct) +
      '<span class="btn btn--p btn--full">See this deal</span>' +
    '</div></article>';
}
function renderDeals() {
  $('#dealTrack').innerHTML = DEALS.map(dealSlide).join('');
  $('#dealPg').innerHTML = DEALS.map(function (_, i) {
    return '<button class="dpg" data-i="' + i + '" aria-label="Deal ' + (i + 1) + '"><i></i></button>';
  }).join('');
  goDeal(0);
}
function goDeal(i, manual) {
  dIdx = (i + DEALS.length) % DEALS.length;
  $('#dealTrack').style.transform = 'translateX(' + (-dIdx * 100) + '%)';
  $$('#dealPg .dpg').forEach(function (b, n) {
    b.classList.toggle('on', n === dIdx);
    b.classList.toggle('done', n < dIdx);
    var bar = b.firstElementChild;
    bar.style.animation = 'none'; void bar.offsetWidth;
    if (n === dIdx) bar.style.animation = 'dfill ' + DUR + 'ms linear forwards';
  });
  clearTimeout(dTimer);
  dTimer = setTimeout(function () { goDeal(dIdx + 1); }, DUR);
  if (manual) intent(1);
  if (dIdx === 2) intent(1);
}
function pauseDeal() { clearTimeout(dTimer); $$('#dealPg .dpg i').forEach(function (b) { b.style.animationPlayState = 'paused'; }); }
$('#dealNext').addEventListener('click', function () { goDeal(dIdx + 1, true); });
$('#dealPrev').addEventListener('click', function () { goDeal(dIdx - 1, true); });
$('#dealPg').addEventListener('click', function (e) {
  var b = e.target.closest('.dpg'); if (b) goDeal(+b.dataset.i, true);
});
$('#dealTrack').addEventListener('click', function (e) {
  var s = e.target.closest('[data-open]'); if (!s) return;
  var p = byId(s.dataset.open);
  log('Opened a hero deal: <b>' + p.name + '</b>', { strong:true });
  openPDP(p);
});
/* swipe */
(function () {
  var x0 = null, d = $('#deal');
  d.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; pauseDeal(); }, { passive:true });
  d.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) goDeal(dIdx + (dx < 0 ? 1 : -1), true); else goDeal(dIdx);
    x0 = null;
  });
  d.addEventListener('mouseenter', pauseDeal);
  d.addEventListener('mouseleave', function () { goDeal(dIdx); });
})();
renderDeals();

/* ================= trade in starter =================
   Two taps and a figure. No form, no account, nothing to read. The model is
   captured on tap one, which is the single most useful field, so even an
   abandon here leaves the business something it can act on. */
(function () {
  var STEP1 = [
    { n:'iPhone 14 or newer', b:1500 }, { n:'iPhone 12 or 13', b:850 },
    { n:'iPhone 11 or older', b:380 },  { n:'Samsung Galaxy', b:700 },
    { n:'Something else', b:400, wide:true }
  ];
  var STEP2 = [
    { n:'Looks new', m:1 }, { n:'A few scratches', m:.82 }, { n:'Cracked or faulty', m:.45 }
  ];
  var pick = null;
  var opts = $('#tin2Opts'), lbl = $('#tin2Lbl'), step = $('#tin2Step'), hint = $('#tin2Hint');

  /* the exchange photo is a static asset, nothing to populate here */

  function paint(list) {
    opts.innerHTML = list.map(function (o, i) {
      return '<button data-i="' + i + '"' + (o.wide ? ' class="wide"' : '') + '>' + o.n + '</button>';
    }).join('');
  }
  paint(STEP1);

  opts.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var i = +b.dataset.i;
    if (!pick) {
      pick = STEP1[i];
      log('Trade in starter: owns <b>' + pick.n + '</b>', { strong:true });
      lbl.textContent = 'What condition is it in?';
      step.textContent = 'Step 2 of 2';
      hint.textContent = 'Last one, then you get a number';
      paint(STEP2);
      return;
    }
    var v = Math.round(pick.b * STEP2[i].m / 10) * 10;
    log('Trade in valued at ' + plain(v) + ' from the hero starter', { value:v, strong:true });
    $('.tin2__q').innerHTML =
      '<div class="tin2__res"><span>Your phone is worth about</span>' +
      '<b>' + money(v) + '</b><i>' + pick.n + ', ' + STEP2[i].n.toLowerCase() + '</i></div>' +
      '<button class="btn btn--p btn--full" id="tin2Lock" style="margin-top:10px">Lock this price for 7 days</button>' +
      '<p class="tin2__step" style="justify-content:center"><span>We send it to your WhatsApp. No account needed.</span></p>';
  });

  $('#tin2').addEventListener('click', function (e) {
    if (!e.target.closest('#tin2Lock')) return;
    modal('<h3>Lock your price</h3><p>We hold this valuation for seven days and send it straight to your WhatsApp.</p>' +
      '<form data-lead="Trade in quote from the hero starter"><input placeholder="Your name" required>' +
      '<input type="tel" placeholder="WhatsApp number" required>' +
      '<button class="btn btn--p" type="submit">Lock it in</button></form>');
  });
})();

/* ================= auto scrolling offer rail ================= */
(function () {
  var list = bestDeals(8);
  function chip(d) {
    var p = d.p;
    return '<button class="ochip" data-open="' + p.id + '">' +
      '<div class="ochip__im"><img src="' + imgSrc(p, p.colors[0]) + '" alt="" loading="lazy"></div>' +
      '<div><b>' + p.name + '</b>' +
      '<span class="ochip__f">From ' + money(inst(p.price)) + ' <em>x4</em></span>' +
      '<span class="ochip__s">Save ' + money(d.save) + '</span></div></button>';
  }
  /* duplicated once so the marquee loops seamlessly */
  $('#offerTrack').innerHTML = list.concat(list).map(chip).join('');
  $('#offerTrack').addEventListener('click', function (e) {
    var b = e.target.closest('[data-open]'); if (!b) return;
    var p = byId(b.dataset.open);
    log('Opened an offer from the rail: <b>' + p.name + '</b>', { strong:true });
    openPDP(p);
  });
})();

/* hero + rail imagery */
$$('[data-dev]').forEach(function(el){
  var p = byId(el.dataset.dev);
  if (p) el.innerHTML = '<img src="' + imgSrc(p, p.colors[0]) + '" alt="' + p.name + '" loading="lazy">';
});

$('#burger').addEventListener('click', function(){
  $('#nav').classList.toggle('on'); this.classList.toggle('on');
});
$$('.nav__in a').forEach(function(a){
  a.addEventListener('click', function(){ $('#nav').classList.remove('on'); $('#burger').classList.remove('on'); });
});
$('#yr').textContent = new Date().getFullYear();

renderGrid(); renderCart();
})();
