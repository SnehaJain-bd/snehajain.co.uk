#!/usr/bin/env node
/* =========================================================
   snehajain.co.uk site builder

   Reads content/projects.json and writes every HTML page.
   Run from the repo root:   node build/build.js

   Edit content, not HTML. Anything you type directly into a
   generated .html file is replaced the next time this runs.
   ========================================================= */

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/projects.json'), 'utf8'));

const CSS_VERSION = 12;
const MAIL = 'hello@snehajain.co.uk';
const IG   = 'https://www.instagram.com/snehajain.design';
const BEHANCE = 'https://www.behance.net/sneha_jain14';
const TALLY = 'OD2Da8';
const DESC = 'Brand strategy, identity and packaging for founder-led businesses. UK based, working with founders anywhere.';

const ARROW = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const esc = s => String(s == null ? '' : s)
  .replace(/&(?![a-zA-Z#0-9]+;)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/'/g, '&rsquo;');

const filled = s => typeof s === 'string' && s.trim().length > 0;

/* ---------------- chrome ---------------- */

function head(o){
  const p = o.p;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${o.title}</title>
<meta name="description" content="${o.desc}">
<link rel="canonical" href="https://snehajain.co.uk/${o.canon}">
${o.noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#FBF9F4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1A1512" media="(prefers-color-scheme: dark)">

<meta property="og:type" content="${o.ogtype || 'website'}">
<meta property="og:url" content="https://snehajain.co.uk/${o.canon}">
<meta property="og:title" content="${o.title}">
<meta property="og:description" content="${o.desc}">
<meta property="og:image" content="https://snehajain.co.uk/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${p}assets/img/favicon.svg" type="image/svg+xml">

<link rel="preconnect" href="https://use.typekit.net" crossorigin>
<link rel="stylesheet" href="https://use.typekit.net/yhu7ntr.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300..600;1,300..600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="${p}assets/styles.css?v=${CSS_VERSION}">
${o.jsonld ? '\n<script type="application/ld+json">\n' + o.jsonld + '\n</script>\n' : ''}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
`;
}

/* HEADER. A new design is coming; this whole block is the swap point. */
function header(active, p){
  const item = (href, label) =>
    `      <a href="${p}${href}"${active === label.toLowerCase() ? ' aria-current="page"' : ''}>${label}</a>`;
  return `
<!-- HEADER, PLACEHOLDER. Replace this whole block when the new design lands. -->
<div class="status-bar" id="top">
  <div class="wrap status-bar__inner">
    <span id="clock">&nbsp;</span>
    <span class="status-bar__sep">/</span>
    <span>Based in Southampton</span>
    <span class="status-bar__avail">
      <span class="status-bar__dot" aria-hidden="true"></span>
      Available for work
    </span>
  </div>
</div>

<header class="site-head">
  <div class="wrap site-head__inner">
    <a class="wordmark" href="${p}index.html" aria-label="Sneha Jain, home">
      <picture>
        <source srcset="${p}assets/img/logo-cream.png" media="(prefers-color-scheme: dark)">
        <img src="${p}assets/img/logo-dark.png" alt="Sneha Jain" width="21" height="33">
      </picture>
    </a>

    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu">
      <span></span><span></span>
    </button>

    <nav id="nav" class="nav" aria-label="Primary">
${item('about.html','About')}
${item('services.html','Services')}
${item('work.html','Work')}
      <a class="nav__cta" href="${p}contact.html">Start a project</a>
    </nav>
  </div>
</header>
<!-- END HEADER -->
`;
}

const DOT = p => `<img class="brandmark brandmark--dots" src="${p}assets/img/mark-dots.png" alt="" width="266" height="98">`;

const strip = p => `
  <div class="strip">
    <div class="wrap strip__inner">
      <span>Brands that get chosen.</span>
    </div>
  </div>
`;

const ctaBand = (p, title) => `
<section class="cta-band">
  <div class="wrap">
    <h2 class="cta-band__title reveal">${title || 'Tell me what you&rsquo;re <span class="mark">building.</span>'}</h2>
    <p class="cta-band__lede reveal">Send me two lines about your product. We get on a short call.
      I send one page with scope, price and timeline.</p>
    <a class="btn btn--yellow reveal" href="${p}contact.html">Start a project ${ARROW}</a>
  </div>
</section>
`;

const footer = p => `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:${MAIL}">${MAIL} <span class="arw">&rarr;</span></a></li>
        </ul>
        <a class="btn btn--solid foot-col__cta" href="${p}contact.html">Start a Project ${ARROW}</a>
      </div>
      <div class="foot-col">
        <h4>Menu</h4>
        <ul>
          <li><a href="${p}index.html">Home <span class="arw">&rarr;</span></a></li>
          <li><a href="${p}about.html">About <span class="arw">&rarr;</span></a></li>
          <li><a href="${p}services.html">Services <span class="arw">&rarr;</span></a></li>
          <li><a href="${p}work.html">Work <span class="arw">&rarr;</span></a></li>
          <li><a href="${p}contact.html">Contact <span class="arw">&rarr;</span></a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>Social</h4>
        <ul>
          <li><a href="${IG}" rel="me noopener" target="_blank">Instagram <span class="arw">&rarr;</span></a></li>
          <li><a href="${BEHANCE}" rel="me noopener" target="_blank">Behance <span class="arw">&rarr;</span></a></li>
          <li><a href="https://www.linkedin.com/in/USERNAME" rel="me noopener" target="_blank">LinkedIn <span class="arw">&rarr;</span></a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>Based in</h4>
        <ul>
          <li>Southampton, UK</li>
        </ul>
      </div>
    </div>

    <div class="foot-bar">
      <p class="foot-bar__legal">&copy; <span id="year">2026</span> Sneha Jain</p>
      <a href="#top">Back to top &uarr;</a>
    </div>
  </div>
</footer>

<script src="${p}assets/script.js"></script>
</body>
</html>
`;

/* ---------------- services ---------------- */

const SERVICES = [
  ['Brand Strategy','Positioning, audience and the argument for your brand. Everything else is built on this.'],
  ['Visual Identity','Logo, type, colour and imagery built as a system, so your brand looks like itself everywhere.'],
  ['Packaging Design','Structure and artwork for products that need to get picked up.'],
  ['Brand Refresh','Moving an existing identity forward without throwing away what your customers already recognise.'],
  ['Naming &amp; Tone of Voice','A name people remember, and a way of speaking that sounds like you rather than like your category.'],
  ['Brand Guidelines','Rules your team can follow without me in the room.'],
  ['Art Direction','Photography, illustration and campaign work held to one standard, so nothing drifts off brand.'],
  ['Web &amp; Digital Design','Your identity carried onto a screen properly, not squeezed into a template.'],
  ['Campaign &amp; Social','Templates and artwork so your everyday output stays on brand without you thinking about it.'],
  ['Presentation Design','Pitch and investor decks that argue clearly and look like they came from a real company.'],
  ['Editorial &amp; Print','Books, reports and journals where the layout has to carry the argument.'],
  ['Workshops','Structured sessions to get you and your team unstuck on the decisions holding everything up.']
];

const servicesSection = (p, alt) => `
  <section class="section${alt ? ' section--alt' : ''}" id="services">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Services</p>
        <div>
          <h2 class="sec-title">Twelve services. One job: getting your brand chosen.</h2>
          <p class="sec-lede">Most projects start with one of the <strong>first four</strong>. The rest tend to follow.</p>
        </div>
      </div>

      <ol class="services reveal">
${SERVICES.map(([t,d],i)=>
`        <li class="service">
          <div class="service__top"><h3>${t}</h3><span class="service__num">${i+1}</span></div>
          <p>${d}</p>
        </li>`).join('\n')}
      </ol>

      <div class="sec-foot reveal">
        <p class="sec-foot__note">Not sure which of these you need?</p>
        <a class="btn btn--solid" href="${p}contact.html">Start a project ${ARROW}</a>
      </div>
    </div>
  </section>
`;

/* ---------------- work ---------------- */

/* published:false keeps a project in the file but off the site entirely:
   no page, no card, no sitemap entry. Nothing is lost, one flag brings it back. */
const ALL_PROJECTS = DATA.projects || [];
const PROJECTS = ALL_PROJECTS.filter(x => x.published !== false);
const WORK_HEAD = 'The decision behind each project.';
const WORK_SUB  = 'What each brand had to work out before any of it could look like this.';

function workGrid(p, list){
  return (list || PROJECTS).map(x =>
`        <a class="project reveal" href="${p}work/${x.slug}.html">
          <div class="project__media">
            <img src="${p}${x.image}" alt="${esc(x.imageAlt || x.title + ' project artwork')}" loading="lazy" width="1200" height="900">
          </div>
          <div class="project__body">
            <h3 class="project__title">${esc(x.title)} <span class="arw">&#8599;</span></h3>
            <p class="project__desc">${esc(x.subtitle)}</p>
            <ul class="tags">${(x.services||[]).map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
          </div>
        </a>`).join('\n');
}

/* ---------------- testimonials ----------------
   Empty slots render as visible, obviously-blank cards. Nothing is
   invented, and the section is on the page so real quotes can drop in. */
function voices(){
  const list = DATA.testimonials || [];
  const cards = list.map(t => filled(t.quote)
? `        <li class="voice reveal">
          <p class="voice__quote">${esc(t.quote)}</p>
          <footer class="voice__by">
            <span><span class="voice__name">${esc(t.name)}</span><span class="voice__role">${esc([t.role,t.brand].filter(Boolean).join(', '))}</span></span>
          </footer>
        </li>`
: `        <li class="voice voice--empty reveal">
          <p class="voice__quote">Waiting on a real quote.</p>
          <footer class="voice__by">
            <span><span class="voice__name">Client name</span><span class="voice__role">Role, brand</span></span>
          </footer>
        </li>`).join('\n');

  return `
  <section class="section" id="voices">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Social proof</p>
        <div>
          <h2 class="sec-title">What clients say.</h2>
          <p class="sec-lede">Real words, or nothing at all. <strong>Never paraphrased.</strong></p>
        </div>
      </div>
      <ul class="voices">
${cards}
      </ul>
    </div>
  </section>
`;
}

/* ---------------- FAQ ---------------- */

const FAQ = [
  ['Services &amp; offerings',[
    ['What kind of projects do you take on?','Brand strategy, identity and packaging for founder-led businesses. Product or service, pre-launch or already trading. If your brand needs deciding as much as it needs designing, that is the work I do best.'],
    ['Can you help with just a logo?','No. A logo on its own doesn&rsquo;t make a brand. It works next to the positioning, the colour, the type and the way all of it behaves together. On its own it&rsquo;s just a mark. If a logo really is all you need, I&rsquo;m not the right fit.'],
    ['Do you design websites too?','Yes, as part of an identity project or on its own. The site should carry the brand, not reinterpret it.']
  ]],
  ['Process &amp; workflow',[
    ['What is your design process like?','You book, we talk, we make the decisions together, then I design them. Every direction comes with its reasoning, so you always know why it looks the way it does.'],
    ['How involved will I be?','I need you for the decisions and not much else. One working session at the start, honest answers when I ask for them. You do not need a brief. Making the brief is my job.'],
    ['How do you handle revisions?','Three rounds of changes are included. Because every direction comes with its reasoning, feedback tends to be about the decision rather than about taste, which makes it faster for both of us.']
  ]],
  ['Pricing &amp; collaboration',[
    ['How much does a project cost?','Each package has a fixed price. You get the exact number when you enquire, and it does not change once we start.'],
    ['Do you work with hourly rates?','No. Fixed prices, agreed before anything begins. You should never feel nervous about sending me an email.'],
    ['Do you take on retainers?','Yes, for ongoing design and art direction once a brand is established. It works best when there is a steady flow of applied work.']
  ]],
  ['Practicalities',[
    ['How long does a typical project take?','Identity projects usually run four to six weeks. Packaging depends on how many products. Your proposal will have the honest timeline before you commit to anything.'],
    ['Will I own the final files?','Yes. On final payment, full ownership of the delivered work transfers to you, including editable source files.'],
    ['Can you sign an NDA?','Yes. Send it over before we talk and I will sign it.']
  ]]
];

const faqSection = stripes => `
  <section class="section${stripes ? ' section--stripes' : ''}" id="faq">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Questions</p>
        <div>
          <h2 class="sec-title">What founders ask before they hire me.</h2>
        </div>
      </div>
      <div class="faq-groups reveal">
${FAQ.map(([title,qs],gi)=>
`        <div class="faq-group">
          <div class="faq-group__head">
            <span class="faq-group__num">${gi+1}</span>
            <h3 class="faq-group__title">${title}</h3>
          </div>
${qs.map(([q,a])=>
`          <details class="qa">
            <summary>${q}</summary>
            <div class="qa__body">${a}</div>
          </details>`).join('\n')}
        </div>`).join('\n')}
      </div>
    </div>
  </section>
`;

/* ---------------- pages ---------------- */

const pages = {};

pages['index.html'] =
head({
  p:'', canon:'',
  title:'Sneha Jain, Strategic Brand Designer for Founders',
  desc:DESC,
  jsonld: JSON.stringify({
    '@context':'https://schema.org','@type':'Person',name:'Sneha Jain',
    jobTitle:'Strategic Brand Designer',url:'https://snehajain.co.uk',
    email:'mailto:'+MAIL,
    address:{'@type':'PostalAddress',addressLocality:'Southampton',addressCountry:'GB'},
    sameAs:[IG,BEHANCE,'https://www.linkedin.com/in/USERNAME']
  },null,2)
})
+ header('home','')
+ `
<main id="main">

  <section class="hero">
    <div class="wrap">
      <h1 class="hero__title reveal">
        <span>You know what you&rsquo;re building.</span>
        <span>Your brand doesn&rsquo;t say it yet.</span>
      </h1>
      <p class="hero__sub reveal">Strategic brand design for founder-led businesses.</p>
      <div class="hero__actions reveal">
        <a class="btn btn--solid" href="contact.html">Start a Project ${ARROW}</a>
        <a class="btn btn--ghost" href="work.html">See Selected Work</a>
      </div>
    </div>
  </section>
`
+ strip('')
+ `
  <section class="section section--dark" id="approach">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Approach</p>
        <div>
          <h2 class="sec-title">Most brands get designed before they get decided.</h2>
          <p class="sec-lede">Nobody chooses a brand because <strong>the logo is nice</strong>.</p>
        </div>
      </div>

      <div class="intro__body reveal">
        <p>Founders come to me having already picked a look, or having copied whoever is winning
          in their category. Then they try to work out what the brand actually means. It is the
          expensive way round, and it rarely holds.</p>
        <p>I start with the decisions. What you stand for, who you are for, what makes someone
          choose you over the thing next to you. Then I design those decisions, so the look has
          a reason to exist.</p>
        <p>I was a software engineer before I became a designer. It shows in how I work:
          <strong>systems, not moods</strong>.</p>
      </div>

      <div class="sec-foot reveal">
        <p class="sec-foot__note">The long version</p>
        <a class="arrow-link" href="about.html">Why I left engineering <span>&rarr;</span></a>
      </div>
    </div>
  </section>
`
+ servicesSection('', true)
+ `
  <section class="section" id="work">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">Work</p>
        <div>
          <h2 class="sec-title">${WORK_HEAD}</h2>
          <p class="sec-lede">${WORK_SUB}</p>
        </div>
      </div>

      <div class="work-grid">
${workGrid('', PROJECTS.filter(x => x.featured !== false))}
      </div>

      <div class="sec-foot reveal">
        <p class="sec-foot__note">Every project, in full</p>
        <a class="arrow-link" href="work.html">See all work <span>&rarr;</span></a>
      </div>
    </div>
  </section>
`
+ voices()
+ faqSection(false)
+ `
</main>
`
+ ctaBand('')
+ footer('');

/* ---- ABOUT ---- */
pages['about.html'] =
head({
  p:'', canon:'about.html',
  title:'About Sneha Jain, Strategic Brand Designer',
  desc:'Software engineer turned brand designer. Grew up in northeast India, moved to the UK in 2026. Brand strategy, identity and packaging for founder-led businesses.'
})
+ header('about','')
+ `
<main id="main">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow reveal">About</p>
      <h1 class="page-hero__title reveal">Hi, I&rsquo;m Sneha.</h1>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="about-grid">
        <figure class="about__photo reveal">
          <img src="assets/img/portrait.svg" alt="Portrait of Sneha Jain" width="800" height="1000">
        </figure>

        <div class="story reveal">
          <p class="story__lead">I grew up in northeast India. Nature was just what was outside the
            window there, and I have never really got over it. My phone is still mostly sunsets
            and sky.</p>

          <h2>I started out as a software engineer.</h2>
          <p>I was good at it. The problem was that almost nobody ever saw the work. It shipped,
            it worked, and then it disappeared into a system somewhere. I wanted to make things
            people could actually look at and hold.</p>
          <p>So I changed careers. That was five years ago and I haven&rsquo;t wondered about it since.</p>

          <h2>I moved to the UK in February 2026.</h2>
          <p>New country, no network, starting the whole thing again. I&rsquo;m exploring it one
            weekend at a time, and there is always a book I&rsquo;m in the middle of.</p>

          <h2>I&rsquo;m an introvert.</h2>
          <p>Which makes putting myself online, writing posts, showing work and asking people to
            hire me genuinely uncomfortable. I do it anyway, on purpose. It&rsquo;s the same thing I
            ask founders to do: be clear about who you are, out loud, even when it feels like
            too much.</p>

          <h2>What I actually do</h2>
          <p>Brand strategy, identity and packaging for founder-led businesses. Five years,
            twenty plus clients, and more than half come back with the next project. I make the
            decisions first, what your brand says and why, then make them look good.</p>
        </div>
      </div>
    </div>
  </section>

</main>
`
+ ctaBand('', 'Now tell me what you&rsquo;re <span class="mark">building.</span>')
+ footer('');

/* ---- SERVICES ---- */
const PACKAGES = [
  ['Brand Strategy','For founders with a product but no clear point of view yet.','You leave knowing what your brand says and why.'],
  ['Visual Identity','For founders whose strategy is set but whose look doesn&rsquo;t match it.','You leave with an identity you can use without me.'],
  ['Full Brand Identity','For founders starting from scratch.','Strategy and identity together, done once, in order.'],
  ['Packaging','For products that need to stand out on a shelf and on a screen.','Priced per SKU.']
];

pages['services.html'] =
head({
  p:'', canon:'services.html',
  title:'Services and packages, Sneha Jain',
  desc:'Twelve services and four packages: brand strategy, visual identity, packaging and brand refresh. Fixed prices, agreed before anything begins.'
})
+ header('services','')
+ `
<main id="main">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow reveal">Services</p>
      <h1 class="page-hero__title reveal">Four packages.</h1>
      <p class="page-hero__lede reveal">Every package is a starting point. We shape the scope around
        what you need, then fix it. The price is set before we start and never changes after.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <ol class="packages">
${PACKAGES.map(([t,who,leave],i)=>
`        <li class="package reveal">
          <span class="package__num">${i+1}</span>
          <h3>${t}</h3>
          <p class="package__who">${who}</p>
          <p class="package__leave">${leave}</p>
          <div class="package__meta">Deliverables and timeline: to confirm</div>
        </li>`).join('\n')}
      </ol>
    </div>
  </section>
`
+ servicesSection('', true)
+ `
  <section class="section">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">How it starts</p>
        <div>
          <h2 class="sec-title">Three steps, no mystery</h2>
          <p class="sec-lede">No brief needed. <strong>Making the brief is my job.</strong></p>
        </div>
      </div>
      <ol class="steps reveal">
        <li class="step">
          <span class="step__num">1</span>
          <h3>Two lines</h3>
          <p>Send me two lines about your product. That is genuinely enough to start.</p>
        </li>
        <li class="step">
          <span class="step__num">2</span>
          <h3>A short call</h3>
          <p>We get on a call and work out what you actually need, and what you don&rsquo;t.</p>
        </li>
        <li class="step">
          <span class="step__num">3</span>
          <h3>One page</h3>
          <p>I send one page with scope, price and timeline. The price never changes after that.</p>
        </li>
      </ol>
    </div>
  </section>
`
+ faqSection(true)
+ `
</main>
`
+ ctaBand('')
+ footer('');

/* ---- WORK ---- */
pages['work.html'] =
head({
  p:'', canon:'work.html',
  title:'Selected work, Sneha Jain',
  desc:'Brand and packaging projects for founder-led businesses, and the decision behind each one.'
})
+ header('work','')
+ `
<main id="main">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow reveal">Work</p>
      <h1 class="page-hero__title reveal">${WORK_HEAD}</h1>
      <p class="page-hero__lede reveal">${WORK_SUB}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="work-grid">
${workGrid('')}
      </div>
    </div>
  </section>

</main>
`
+ ctaBand('')
+ footer('');

/* ---- CONTACT ---- */
pages['contact.html'] =
head({
  p:'', canon:'contact.html',
  title:'Start a project, Sneha Jain',
  desc:'Send me two lines about your product. We get on a short call. I send one page with scope, price and timeline.'
})
+ header('contact','')
+ `
<main id="main">

  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow reveal">Contact</p>
      <h1 class="page-hero__title reveal">Tell me what you&rsquo;re building.</h1>
      <p class="page-hero__lede reveal">Send me two lines about your product. We get on a short call.
        I send one page with scope, price and timeline.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="contact-grid">
        <div class="reveal">
          <dl class="contact__ways">
            <dt>Email</dt>
            <dd><a class="contact__mail" href="mailto:${MAIL}?subject=Project%20enquiry">${MAIL}</a></dd>
            <dt>Based in</dt>
            <dd>Southampton, UK.</dd>
            <dt>Reply time</dt>
            <dd>Within two working days.</dd>
          </dl>
        </div>

        <div class="reveal">
          <h2 class="contact__how">Two lines is enough.</h2>
          <p>Answers land straight in my inbox. If you would rather just email,
            the address is on the left.</p>

          <div class="tally-wrap">
            <iframe
              data-tally-src="https://tally.so/embed/${TALLY}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1"
              loading="lazy" width="100%" height="500" frameborder="0"
              marginheight="0" marginwidth="0" title="Start a project"></iframe>
            <noscript>
              <p><a class="btn btn--solid" href="https://tally.so/r/${TALLY}" rel="noopener" target="_blank">Open the form ${ARROW}</a></p>
            </noscript>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>
`
+ footer('');

/* ---- 404 ---- */
pages['404.html'] =
head({
  p:'/', canon:'404.html', noindex:true,
  title:'Page not found, Sneha Jain',
  desc:'This page does not exist.'
})
+ header('','/')
+ `
<main id="main" class="oops">
  <div class="wrap">
    <p class="eyebrow reveal" style="justify-content:center">Error 404</p>
    <h1 class="oops__title reveal">This page doesn&rsquo;t exist. <span class="mark">The work does.</span></h1>
    <p style="margin-top:2rem">
      <a class="btn btn--solid" href="/work.html">Selected work ${ARROW}</a>
    </p>
  </div>
</main>
`
+ footer('/');

/* ---- ONE PAGE PER PROJECT ----
   Sections appear only when the matching field in projects.json has
   something in it, so a half-written case study never reaches the site. */
PROJECTS.forEach((x, i) => {
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  /* Each written block is its own band, label on the left, argument on the
     right. Anything still empty produces nothing at all. */
  const block = (label, text) => filled(text) ? `
  <section class="case-block">
    <div class="wrap case-block__inner reveal">
      <h2>${label}</h2>
      <div>${esc(text).split(/\n{2,}/).map(par => `<p>${par.trim()}</p>`).join('\n        ')}</div>
    </div>
  </section>
` : '';

  /* Gallery entries are optional. wide:true spans the full width. */
  const gallery = Array.isArray(x.gallery) && x.gallery.length ? `
  <section class="section section--tight">
    <div class="wrap">
      <div class="case-gallery reveal">
${x.gallery.map(g => `        <figure${g.wide ? ' class="wide"' : ''}>
          <img src="../${g.src}" alt="${esc(g.alt || '')}" loading="lazy">
        </figure>`).join('\n')}
      </div>
    </div>
  </section>
` : '';

  const credits = Array.isArray(x.credits) && x.credits.length ? `
  <section class="section section--tight">
    <div class="wrap">
      <dl class="case-credits reveal">
${x.credits.map(c => `        <div><dt>${esc(c.role)}</dt><dd>${esc(c.name)}</dd></div>`).join('\n')}
      </dl>
    </div>
  </section>
` : '';

  pages['work/' + x.slug + '.html'] =
  head({
    p:'../', canon:'work/'+x.slug+'.html', ogtype:'article',
    title: esc(x.title) + ', Sneha Jain',
    desc: esc(x.summary).replace(/"/g,'&quot;')
  })
  + header('work','../')
  + `
<main id="main">

  <img class="case-cover" src="../${x.image}" alt="${esc(x.imageAlt || x.title)}" width="1200" height="900">

  <section class="case-intro">
    <div class="wrap">
      <p class="case-intro__client reveal">For ${esc(x.client)}</p>
      <h1 class="case-intro__title reveal">${esc(x.title)}</h1>
      <p class="case-intro__tags reveal">${(x.services||[]).map(esc).join('<span>/</span>')}</p>
      <p class="case-intro__summary reveal">${esc(x.summary)}</p>
    </div>
  </section>

  <div class="wrap">
    <dl class="case-facts reveal">
      <div><dt>Client</dt><dd>${esc(x.client)}</dd></div>
      <div><dt>Year</dt><dd>${esc(x.year)}</dd></div>
      <div><dt>Sector</dt><dd>${esc(x.sector)}</dd></div>
      <div><dt>Services</dt><dd>${esc((x.services||[]).join(', '))}</dd></div>
    </dl>
  </div>
${block('The brief', x.brief)}${block('The decision', x.decision)}${gallery}${block('The outcome', x.outcome)}${credits}
  <section class="section section--tight">
    <div class="wrap">
      <a class="next-project reveal" href="${next.slug}.html">
        <div>
          <p class="next-project__label">Next project</p>
          <h2 class="next-project__title">${esc(next.title)} <span class="arw">&#8599;</span></h2>
          <p class="next-project__sub">${esc(next.subtitle)}</p>
        </div>
        <div class="next-project__media">
          <img src="../${next.image}" alt="" loading="lazy">
        </div>
      </a>

      <nav class="case-nav" aria-label="Project navigation">
        <a class="arrow-link" href="../work.html"><span>&larr;</span> All work</a>
      </nav>
    </div>
  </section>

</main>
`
  + ctaBand('../')
  + footer('../');
});

/* ---------------- sitemap ---------------- */
const urls = ['', 'about.html', 'services.html', 'work.html', 'contact.html']
  .concat(PROJECTS.map(x => 'work/' + x.slug + '.html'));
pages['sitemap.xml'] =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>https://snehajain.co.uk/${u}</loc><priority>${u === '' ? '1.0' : u.startsWith('work/') ? '0.6' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;

/* ---------------- write ---------------- */
let n = 0;
for (const [rel, out] of Object.entries(pages)) {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (out.includes(String.fromCharCode(0x2014))) throw new Error('em-dash found in ' + rel);
  fs.writeFileSync(dest, out);
  n++;
}

/* Remove case study pages for projects that no longer exist */
const keep = new Set(PROJECTS.map(x => x.slug + '.html'));
const workDir = path.join(ROOT, 'work');
if (fs.existsSync(workDir)) {
  for (const f of fs.readdirSync(workDir)) {
    if (f.endsWith('.html') && !keep.has(f)) {
      fs.unlinkSync(path.join(workDir, f));
      console.log('removed stale work/' + f);
    }
  }
}

const held = ALL_PROJECTS.filter(x => x.published === false).map(x => x.title);
console.log(n + ' files written from ' + PROJECTS.length + ' published projects. No em-dashes.');
if (held.length) console.log('held back (published:false): ' + held.join(', '));
