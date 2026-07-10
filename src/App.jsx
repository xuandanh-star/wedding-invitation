import { useEffect, useRef, useState } from 'react'
import './App.css'

// ---------- IMAGE DATA (3 placeholder images from picsum) ----------
const IMAGES = [
  {
    id: 1,
    title: 'Mountain lake',
    url: 'https://picsum.photos/id/1015/600/400',  // mountain
    alt: 'Scenic mountain lake',
  },
  {
    id: 2,
    title: 'City night',
    url: 'https://picsum.photos/id/1018/600/400',  // city
    alt: 'Urban night skyline',
  },
  {
    id: 3,
    title: 'Forest path',
    url: 'https://picsum.photos/id/1043/600/400',  // forest
    alt: 'Sunlit forest trail',
  },
];

const couple = {
  groom: 'Xuân Danh',
  bride: 'Thuý An',
  date: 'Chủ nhật, 12 tháng 7 năm 2026',
  lunarDate: 'Ngày 28 tháng 5 năm Bính Ngọ',
  families: {
    groom: 'Ông Nguyễn Văn Minh & Bà Lê Thị Hương',
    bride: 'Ông Trần Quốc Dũng & Bà Phạm Ngọc Mai',
  },
}

const events = [
  {
    title: 'Lễ Thành Hôn',
    time: '15:30',
    date: '12.07.2026',
    place: 'Tư gia nhà gái',
    address: '123 Blossom Avenue, Quận 1, TP. Hồ Chí Minh',
  },
  {
    title: 'Tiệc Cưới',
    time: '19:00',
    date: '12.07.2026',
    place: 'Rosewood Grand Ballroom',
    address: '88 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  },
]

const timeline = [
  ['15:00', 'Đón khách'],
  ['15:30', 'Lễ gia tiên'],
  ['18:30', 'Khai tiệc'],
  ['20:00', 'Nâng ly chúc mừng'],
]

const wishes = [
  'Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.',
  'Kính mong quý khách đến chung vui và gửi lời chúc phúc cho đôi uyên ương.',
]

const musicSource = '/L%E1%BB%85%20%C4%90%C6%B0%E1%BB%9Dng.mp3'

const fallingCharacters = [
  ['囍', '8%', '0s', '9s', '1rem'],
  ['福', '19%', '1.4s', '11s', '1.55rem'],
  ['囍', '31%', '3s', '8.5s', '1.2rem'],
  ['禧', '43%', '0.8s', '10s', '1.7rem'],
  ['喜', '56%', '2.2s', '9.5s', '1.15rem'],
  ['福', '68%', '4s', '12s', '1.45rem'],
  ['囍', '81%', '1.8s', '8.8s', '1.85rem'],
  ['禄', '91%', '3.4s', '10.8s', '1.25rem'],
]

// ---------- IMAGE DATA (6 images with different animations) ----------
const IMAGE_SECTIONS = [
  {
    id: 1,
    imgSrc: '/anh_cuoi_02.jpg',
    alt: 'Couple in mountain lake',
    animation: 'bounce-up',
    badge: 'Bounce up',
  },
  {
    id: 2,
    imgSrc: '/anh_cuoi_03.jpg',
    alt: 'Urban city night',
    animation: 'slide-left',
    badge: 'Slide left',
  },
  {
    id: 3,
    imgSrc: '/anh_cuoi_04.jpg',
    alt: 'Forest path',
    animation: 'zoom-rotate',
    badge: 'Zoom + rotate',
  },
  {
    id: 4,

    imgSrc: '/anh_cuoi_05.jpg',
    alt: 'Sunset over ocean',
    animation: 'flip-3d',
    badge: '3D flip',
  },
  {
    id: 5,
    imgSrc: '/anh_cuoi_06.jpg',
    alt: 'Snowy mountain peak',
    animation: 'blur-slide',
    badge: 'Blur + slide',
  },
  {
    id: 6,
    imgSrc: '/anh_cuoi_07.jpg',
    alt: 'Peaceful lake view',
    animation: 'scale-fade',
    badge: 'Scale + fade',
  },
  {
    id: 7,
    imgSrc: '/anh_cuoi_08.jpg',
    alt: 'Peaceful lake view',
    animation: 'scale-fade',
    badge: 'Scale + fade',
  },
  {
    id: 8,
    imgSrc: '/anh_cuoi_09.jpg',
    alt: 'Peaceful lake view',
    animation: 'scale-fade',
    badge: 'Scale + fade',
  },
  {
    id: 9,
    imgSrc: '/anh_cuoi_10.jpg',
    alt: 'Peaceful lake view',
    animation: 'scale-fade',
    badge: 'Scale + fade',
  },
];

// ============================================
//  REVEAL CARD COMPONENT (handles one section)
// ============================================
function RevealCard({ data, index }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsActive(true);
          // unobserve after first appearance (optional)
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // 20% visible → trigger
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  // ----- build className dynamically -----
  const cardClassName = [
    'reveal-card',
    data.animation, // e.g. 'bounce-up', 'slide-left', etc.
    isActive && 'active',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={cardRef} className={cardClassName}>
      <div className="reveal-card__image">
        <img src={data.imgSrc} alt={data.alt} loading="lazy" />
      </div>
    </section>
  );
}
function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const openTimerRef = useRef(null)
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsActive(true);
          // Unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,        // 20% visible triggers animation
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  const cardClassName = [
    'reveal-card',
    'bounce',          // Animation style (change this to try different animations)
    isActive && 'active'
  ]
    .filter(Boolean)
    .join(' ');

  const playMusic = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = 0.55
    audio.play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false))
  }

  const handleOpenInvitation = () => {
    if (isOpening || isOpened) {
      return
    }

    setIsOpening(true)
    playMusic()

    openTimerRef.current = setTimeout(() => {
      setIsOpened(true)
      setIsOpening(false)
    }, 1050)
  }

  const handleCloseInvitation = () => {
    const audio = audioRef.current

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    setIsMusicPlaying(false)
    setIsOpening(false)
    setIsOpened(false)
  }

  const handleToggleMusic = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      playMusic()
      return
    }

    audio.pause()
    setIsMusicPlaying(false)
  }

  const invitationClassName = [
    'invitation',
    isOpening ? 'is-opening' : '',
    isOpened ? 'is-opened' : '',
  ].filter(Boolean).join(' ')

  return (
    <main className={invitationClassName}>
      <audio ref={audioRef} src={musicSource} preload="auto" loop />

      <section className="cover" aria-label="Wedding invitation cover">
        <div className="falling-characters" aria-hidden="true">
          {fallingCharacters.map(([character, left, delay, duration, size], index) => (
            <span
              key={`${character}-${left}`}
              style={{
                '--fall-left': left,
                '--fall-delay': delay,
                '--fall-duration': duration,
                '--fall-size': size,
                '--fall-sway': index % 2 === 0 ? '-22px' : '22px',
              }}
            >
              {character}
            </span>
          ))}
        </div>

        <div className="cover__ornament" aria-hidden="true">
          <div className="ornament-charms" aria-hidden="true">
            {fallingCharacters.map(([character, left, delay, duration, size], index) => (
              <span
                key={`${character}-${left}-ornament`}
                style={{
                  '--fall-left': left,
                  '--fall-delay': delay,
                  '--fall-duration': duration,
                  '--fall-size': size,
                  '--fall-sway': index % 2 === 0 ? '-16px' : '16px',
                }}
              >
                {character}
              </span>
            ))}
          </div>
        </div>

        {/* <p className="cover__date">{couple.date}</p> */}
        <button type="button" className="seal-button" onClick={handleOpenInvitation} disabled={isOpening}>
          <span>{isOpening ? 'Đang Mở' : 'Mở Thiệp'}</span>
        </button>
      </section>

      <section className="page" aria-hidden={!isOpened}>
        <section className="reveal-card" aria-label="Wedding photo reveal">
          <div className="reveal-card__image">
            <img src="/anh_cuoi_01.jpg" alt="Xuân Danh và Thuý An" />
          </div>
          <h3>16-08-2026</h3>
          <h2>
            {couple.groom}
            <span>&</span>
            {couple.bride}
          </h2>
        </section>

        <section className="reveal-card" aria-label="Wedding video reveal">
          <div className="reveal-card__video">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/video_cuoi.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* ✅ FIXED: RevealCard components now inside page section */}
        {IMAGE_SECTIONS.map((img, idx) => (
          <RevealCard key={img.id} data={img} index={idx} />
        ))}

        <section className="events section-block" aria-label="Wedding events">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <div className="event-card__date">
                <strong>{event.time}</strong>
                <span>{event.date}</span>
              </div>
              <div>
                <h3>{event.title}</h3>
                <p className="event-card__place">{event.place}</p>
                <p>{event.address}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="timeline section-block" aria-label="Wedding timeline">
          <p className="section-kicker">Lịch trình</p>
          <h3>Ngày vui của chúng mình</h3>
          <div className="timeline__list">
            {timeline.map(([time, label]) => (
              <div className="timeline__item" key={time}>
                <time>{time}</time>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="wishes section-block" aria-label="Invitation message">
          <div className="wishes__symbol" aria-hidden="true">
            龍鳳
          </div>
          <h3>Thân mời</h3>
          {wishes.map((wish) => (
            <p key={wish}>{wish}</p>
          ))}
          <div className="actions">
            <a href="https://maps.google.com/?q=88%20Nguyen%20Hue%20Quan%201%20Ho%20Chi%20Minh">
              Xem Bản Đồ
            </a>
            <a href="mailto:hello@tuankietthanhha.com?subject=Xac%20nhan%20tham%20du%20dam%20cuoi">
              Xác Nhận Tham Dự
            </a>
          </div>
        </section>

        <footer className="footer">
          <button type="button" onClick={handleCloseInvitation}>
            Đóng Thiệp
          </button>
          <button type="button" onClick={handleToggleMusic}>
            {isMusicPlaying ? 'Tạm Dừng Nhạc' : 'Phát Nhạc'}
          </button>
          <a href="https://m.me/1118193241377093" target="_blank" rel="noreferrer">
            Gửi lời chúc
          </a>
        </footer>
      </section>
    </main>
  )
}

export default App
