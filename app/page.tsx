'use client';

import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ to, duration }: { to: number, duration: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start = performance.now();
    let animationFrameId: number;

    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(to * ease);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, to, duration]);

  return <span ref={ref}>{count.toFixed(1)}</span>;
}

const menuData = {
  drinks: [
    {
      category: "Classic Coffee",
      items: [
        { name: "Espresso Single", hot: "7k", ice: "-" },
        { name: "Espresso Double", hot: "14k", ice: "-" },
        { name: "Americano", hot: "16k", ice: "18k" },
        { name: "Cafe Latte", hot: "20k", ice: "22k" },
        { name: "Flavoured Latte (Caramel, Vanilla, Hazelnut)", hot: "23k", ice: "25k" },
        { name: "Mochacino", hot: "23k", ice: "25k" },
        { name: "Manual Brew V60 (Flores Manggarai, Natcha)", hot: "28k", ice: "-" },
        { name: "Affogato", hot: "-", ice: "20k" },
      ]
    },
    {
      category: "Crafted Coffee",
      items: [
        { name: "Aren Latte", price: "23k" },
        { name: "Butterscotch Sea Salt Latte", price: "26k" },
        { name: "Pistachio Cream Latte", price: "27k" },
        { name: "Mont Blanc", price: "25k" },
        { name: "Americano Peach", price: "25k" },
        { name: "Americano Lychee", price: "25k" },
        { name: "Americano Berry", price: "27.5k" },
      ]
    },
    {
      category: "Milk Based",
      items: [
        { name: "Chocolate (Hot/Ice)", price: "27k/29k" },
        { name: "Matcha (Hot/Ice)", price: "27k/29k" },
        { name: "Red Velvet (Hot/Ice)", price: "27k/29k" },
      ]
    },
    {
      category: "Tea",
      items: [
        { name: "Iced Clasic Tea", price: "15k" },
        { name: "Hot Classic Tea", price: "14k" },
        { name: "Lychee Tea (Hot/Ice)", price: "18k/20k" },
        { name: "Lemon Tea (Hot/Ice)", price: "18k/20k" },
        { name: "Limeberry Tea", price: "20k" },
        { name: "Peach Tea", price: "20k" },
        { name: "Hot Earl Grey", price: "18k" },
        { name: "Hot Chamomile", price: "18k" },
        { name: "Hot Peppermint", price: "18k" },
      ]
    },
    {
      category: "Healthy Juice",
      items: [
        { name: "Orange", price: "21k" },
        { name: "Watermelon", price: "17k" },
        { name: "Melon", price: "17k" },
        { name: "Dragon Fruit", price: "18k" },
        { name: "Guava", price: "18k" },
        { name: "Healthy Green", price: "21k" },
      ]
    },
    {
      category: "Mocktail",
      items: [
        { name: "Rainbow Punch", price: "31k" },
        { name: "Candied Berry", price: "36k" },
        { name: "Rush Hour", price: "20k" },
      ]
    },
    {
      category: "Whey Series",
      items: [
        { name: "Orange Booster", price: "31k" },
        { name: "Dragon Immune", price: "31k" },
        { name: "Super Avocado", price: "32.5k" },
        { name: "Tropical Fit", price: "31k" },
      ]
    },
    {
      category: "Other",
      items: [
        { name: "Mineral Water", price: "8k" },
        { name: "Add Ice", price: "1k" },
        { name: "Add Milk", price: "3k" },
        { name: "Add Flavoured Syrup", price: "6k" },
      ]
    }
  ],
  food: [
    {
      category: "Dimsum - Steamed",
      items: [
        { name: "siomay ayam original", price: "18k" },
        { name: "siomay udang ayam", price: "21k" },
        { name: "siomay udang ayam jamur", price: "23k" },
        { name: "siomay mozarella", price: "23k" },
        { name: "mantau steam", price: "15k" },
        { name: "hakau", price: "25k" },
        { name: "bakpao coklat", price: "15k" },
        { name: "bakpao coklat keju", price: "18k" },
        { name: "bakpao keju", price: "15k" },
        { name: "bakpao pandan", price: "12k" },
        { name: "bakpao salted egg", price: "21k" },
        { name: "bakpao talas", price: "15k" },
        { name: "bakpao tausa steam", price: "12k" },
        { name: "gyoza steam", price: "18k" },
        { name: "kuo tie", price: "18k" },
        { name: "ceker ayam", price: "21k" },
        { name: "bakso ayam", price: "12k" },
      ]
    },
    {
      category: "Dimsum - Fried",
      items: [
        { name: "money bag", price: "21k" },
        { name: "lumpia ayam kulit tahu", price: "21k" },
        { name: "lumpia udang ayam ngohyang", price: "21k" },
        { name: "mantau goreng", price: "15k" },
        { name: "onde kacang hijau", price: "18k" },
        { name: "onde melting", price: "21k" },
        { name: "udang keju", price: "21k" },
        { name: "udang rambutan", price: "23k" },
        { name: "bakpao tausa goreng", price: "15k" },
        { name: "gyoza goreng", price: "18k" },
        { name: "chicken drumstick", price: "18k" },
        { name: "mini wonton", price: "25k" },
      ]
    },
    {
      category: "Snacks",
      items: [
        { name: "kebab", price: "15k" },
        { name: "risol mayo", price: "15k" },
        { name: "singkong goreng ori", price: "15k" },
        { name: "bakso goreng", price: "12k" },
        { name: "pangsit goreng krispi", price: "23k" },
        { name: "snack mix platter", price: "25k" },
      ]
    },
    {
      category: "Main Course",
      items: [
        { name: "mie ayam ori", price: "24k" },
        { name: "mie ayam bakso", price: "24k" },
        { name: "mie ayam jamur", price: "24k" },
        { name: "yamin ayam manis", price: "25k" },
        { name: "bubur ayam spesial", price: "25k" },
        { name: "pangsit kuah", price: "21k" },
      ]
    }
  ]
};

// --- ILLUSTRATION COMPONENTS ---
const Starburst = ({ className, color = "var(--color-yellow)", style }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" d="M50,5 L60,35 L95,25 L70,50 L95,75 L60,65 L50,95 L40,65 L5,75 L30,50 L5,25 L40,35 Z" />
  </svg>
);

const CoffeeCup = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill="var(--color-blue)" stroke="#000" strokeWidth="4" strokeLinejoin="round" d="M20,30 L80,30 L75,80 C75,90 25,90 25,80 Z" />
    <path fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" d="M80,40 C95,40 95,60 80,60" />
    <path fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" d="M35,10 Q40,20 35,25 M50,8 Q55,18 50,23 M65,10 Q70,20 65,25" />
    <rect x="30" y="45" width="40" height="15" fill="#fff" stroke="#000" strokeWidth="3" rx="5" />
  </svg>
);

const Smiley = ({ className, color = "var(--color-yellow)", style }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill={color} stroke="#000" strokeWidth="4" />
    <circle cx="35" cy="40" r="6" fill="#000" />
    <circle cx="65" cy="40" r="6" fill="#000" />
    <path fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" d="M30,65 Q50,85 70,65" />
  </svg>
);

const DimSum = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill="var(--color-orange)" stroke="#000" strokeWidth="4" strokeLinejoin="round" d="M10,60 L90,60 L85,90 L15,90 Z" />
    <path fill="var(--color-pink)" stroke="#000" strokeWidth="4" strokeLinejoin="round" d="M20,60 C20,30 80,30 80,60 Z" />
    <path fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" d="M40,35 L40,45 M50,30 L50,45 M60,35 L60,45" />
  </svg>
);

const Flower = ({ className, color = "var(--color-purple)", style }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" d="M50,10 C60,10 65,30 50,40 C65,30 85,35 75,50 C85,35 85,65 70,60 C85,65 65,85 50,75 C65,85 35,85 30,75 C35,85 15,65 25,50 C15,65 15,35 30,40 C15,35 35,10 50,25 C35,10 50,10 50,10 Z" />
    <circle cx="50" cy="50" r="15" fill="var(--color-yellow)" stroke="#000" strokeWidth="4" />
  </svg>
);

export default function Home() {
  const [activeMenuTab, setActiveMenuTab] = useState<'favs' | 'full'>('favs');
  const [fullMenuCategory, setFullMenuCategory] = useState<'drinks' | 'food'>('drinks');

  useEffect(() => {
    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const interactives = document.querySelectorAll('.interactive, a, button');

    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
      }

      if (cursorOutline) {
        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);

    // Hover states for cursor
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline?.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline?.classList.remove('hover');
      });
    });

    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, revealOptions);

    revealElements.forEach(el => {
      revealOnScroll.observe(el);
    });

    // Trigger hero animations immediately on load
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('active'));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      revealOnScroll.disconnect();
    };
  }, []);

  return (
    <>
      {/* Grain Overlay */}
      <div className="noise"></div>

      {/* Custom Cursor */}
      <div className="cursor-dot" id="cursor-dot"></div>
      <div className="cursor-outline" id="cursor-outline"></div>

      {/* Navigation */}
      <nav className="nav">
        <div>Imajinary Coffee & Space</div>
        <div>Semarang, ID</div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        {/* Illustrations */}
        <CoffeeCup className="illust illust-float interactive illust-coffee" />

        <h1 className="hero-title reveal" style={{ alignItems: 'flex-start' }}>
          <span className="skewed">IMAJINARY</span>
          <span className="text-outline">COFFEE</span>
          <span className="skewed" style={{ color: 'var(--color-blue)', marginTop: '0.05em' }}>& SPACE</span>
        </h1>
        
        <div className="hero-meta reveal" style={{ transitionDelay: '0.2s' }}>
          <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Rp 25K–50K</p>
          <p>Dim Sum • Pastry • Live Music</p>
          <p style={{ marginTop: '1rem', color: 'var(--border)', backgroundColor: 'var(--color-yellow)', padding: '0.2rem 0.5rem', display: 'inline-block', border: '2px solid #000' }}>Open · Closes 12 am</p>
        </div>
      </header>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee">
          <span>COFFEE & SPACE</span> <span className="text-outline-white">✦</span>
          <span>SEMARANG</span> <span className="text-outline-white">✦</span>
          <span>DIM SUM</span> <span className="text-outline-white">✦</span>
          <span>LIVE MUSIC</span> <span className="text-outline-white">✦</span>
          <span>COFFEE & SPACE</span> <span className="text-outline-white">✦</span>
          <span>SEMARANG</span> <span className="text-outline-white">✦</span>
          <span>DIM SUM</span> <span className="text-outline-white">✦</span>
          <span>LIVE MUSIC</span> <span className="text-outline-white">✦</span>
        </div>
      </div>

      {/* About / Identity */}
      <section className="section-grid">
        <div className="col about-col bg-pink reveal">
          <p className="quote">"Tempat ini cukup menarik.. Asyik juga buat sekedar nongkrong.. Banyak pilihan minuman dari kopi dan non kopi serta cemilan.."</p>
          <p className="quote-author">Updates from customers</p>
        </div>
        <div className="col stats-col bg-purple reveal" style={{ transitionDelay: '0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 className="text-yellow" style={{ fontSize: 'clamp(6rem, 12vw, 9rem)', textShadow: '6px 6px 0px #000', lineHeight: '1' }}>
              <AnimatedCounter to={5.0} duration={2000} />
            </h2>
            <p className="text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 'bold', marginTop: '0.5rem' }}>Based on 100+ Reviews</p>
          </div>
          
          <Smiley className="illust-wiggle interactive" color="var(--color-orange)" style={{ width: 'clamp(120px, 15vw, 180px)', marginTop: '2rem', alignSelf: 'flex-end' }} />
        </div>
      </section>

      {/* Menu / Offerings */}
      <section className="section-grid">
        <div className="col menu-title-col bg-green reveal">
          <h2 style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', wordBreak: 'break-word', color: '#000', lineHeight: '0.9' }}>
            <span className="skewed">MENU</span><br/>
            <span className="text-outline">{activeMenuTab === 'favs' ? 'FAVS' : 'FULL'}</span>
          </h2>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveMenuTab('favs')}
              className={`cta-btn interactive ${activeMenuTab === 'favs' ? 'bg-pink' : 'bg-white'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
            >
              Favorites
            </button>
            <button 
              onClick={() => setActiveMenuTab('full')}
              className={`cta-btn interactive ${activeMenuTab === 'full' ? 'bg-pink' : 'bg-white'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
            >
              Full Menu
            </button>
          </div>

          {activeMenuTab === 'full' && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setFullMenuCategory('drinks')}
                className={`cta-btn interactive ${fullMenuCategory === 'drinks' ? 'bg-yellow' : 'bg-white'}`}
                style={{ padding: '0.5rem 1rem', fontSize: '1rem', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
              >
                Drinks
              </button>
              <button 
                onClick={() => setFullMenuCategory('food')}
                className={`cta-btn interactive ${fullMenuCategory === 'food' ? 'bg-yellow' : 'bg-white'}`}
                style={{ padding: '0.5rem 1rem', fontSize: '1rem', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
              >
                Food
              </button>
            </div>
          )}

          <DimSum className="illust-float" style={{ width: '200px', marginTop: '4rem' }} />
        </div>
        <div className="col menu-list-col reveal" style={{ transitionDelay: '0.2s' }}>
          {activeMenuTab === 'favs' ? (
            <>
              <div className="menu-item interactive">
                <div>
                  <h3 className="skewed">Americano Berry</h3>
                  <p>Signature Coffee Blend</p>
                </div>
              </div>
              <div className="menu-item interactive">
                <div>
                  <h3 className="text-outline">Dim Sum</h3>
                  <p>Steamed & Fried Selections</p>
                </div>
              </div>
              <div className="menu-item interactive">
                <div>
                  <h3 className="skewed" style={{ color: 'var(--color-pink)' }}>Pastry Series</h3>
                  <p>Croissant, Tiramisu, Nastar Crumble</p>
                </div>
              </div>
              <div className="menu-item interactive">
                <div>
                  <h3>Non-Coffee</h3>
                  <p>Pandan Taosa, Mocktails</p>
                </div>
              </div>
            </>
          ) : (
            <div className="full-menu-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {menuData[fullMenuCategory].map((category, idx) => (
                <div key={idx} className="menu-category">
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-purple)', borderBottom: '4px solid #000', paddingBottom: '0.5rem' }}>{category.category}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {category.category === 'Classic Coffee' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <span style={{ width: '40px', textAlign: 'right' }}>HOT</span>
                        <span style={{ width: '40px', textAlign: 'right' }}>ICE</span>
                      </div>
                    )}
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed #ccc', paddingBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', flex: 1, paddingRight: '1rem', textTransform: 'capitalize' }}>{item.name}</span>
                        {'hot' in item ? (
                          <div style={{ display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
                            <span style={{ width: '40px', textAlign: 'right' }}>{item.hot}</span>
                            <span style={{ width: '40px', textAlign: 'right' }}>{item.ice}</span>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{'price' in item ? item.price : ''}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="footer bg-blue">
        <Starburst className="illust illust-spin" color="var(--color-green)" style={{ bottom: '10%', left: '5%', width: '150px', opacity: 0.8 }} />

        <div className="footer-grid reveal">
          <div>
            <h2>FIND<br/><span className="skewed text-yellow">US</span></h2>
            <a href="https://www.google.com/maps/place/Imajinary+Coffee/@-7.0249047,110.4137572,17z/data=!4m15!1m8!3m7!1s0x2e708b067ad2a2d1:0x18b4418f6f1c76b5!2sImajinary+Coffee!8m2!3d-7.0248529!4d110.4136439!10e9!16s%2Fg%2F11mm0hpk2_!3m5!1s0x2e708b067ad2a2d1:0x18b4418f6f1c76b5!8m2!3d-7.0248529!4d110.4136439!16s%2Fg%2F11mm0hpk2_?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="cta-btn interactive">Get Directions ↗</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2rem' }}>
            <div className="footer-info">
              <p style={{ marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Imajinary Coffee & Space</p>
              <p>Jl. Telaga Bodas Raya No.Kav 60,<br/>Karangrejo, Kec. Gajahmungkur,<br/>Kota Semarang, Jawa Tengah 50231</p>
              <p style={{ marginTop: '1rem', color: 'var(--color-purple)' }}>WA: +62 853-8506-1435</p>
            </div>
            <div style={{ border: '4px solid #000', borderRadius: '12px', overflow: 'hidden', boxShadow: '8px 8px 0px #000', height: '250px', width: '100%', maxWidth: '100%', backgroundColor: '#fff' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Imajinary%20Coffee%20Semarang&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
