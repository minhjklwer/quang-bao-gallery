// Cấu hình cửa hàng (HÃY THAY BẰNG SỐ WHATSAPP THẬT CỦA BẠN, giữ định dạng mã quốc gia không dấu +)
const GALLERY_CONFIG = {
  whatsappNumber: '84327559724', // Ví dụ: 84 + số điện thoại bỏ số 0 đầu
  galleryName: 'Quangbaophoto Gallery',
  address: '02 Hàng Gai, Hoàn Kiếm, Hà Nội',
  exchangeRateInfo: 'USD & VND'
};

// Tạo ảnh minh họa SVG nghệ thuật chủ đề Phố Cổ Hà Nội làm mẫu ban đầu
// Khi có ảnh thật, bạn chỉ cần thay bằng đường dẫn ảnh ví dụ: 'images/o-quan-chuong.jpg'
function createHanoiPlaceholderSVG(theme) {
  const templates = {
    gate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E8DFCE"/>
          <stop offset="55%" stop-color="#F4EFE4"/>
          <stop offset="100%" stop-color="#D7C8AE"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#sky1)"/>
      <circle cx="560" cy="240" r="78" fill="#FAF6ED" opacity="0.85"/>
      <path d="M90 780 L90 420 L240 420 L240 310 L560 310 L560 420 L710 420 L710 780 Z" fill="#9E8B70"/>
      <path d="M265 310 L265 250 L535 250 L535 310 Z" fill="#7D6B52"/>
      <polygon points="245,250 400,185 555,250" fill="#594A36"/>
      <path d="M310 780 L310 560 A90 90 0 0 1 490 560 L490 780 Z" fill="#3B332A"/>
      <path d="M145 780 L145 610 A45 45 0 0 1 235 610 L235 780 Z" fill="#4C4236"/>
      <path d="M565 780 L565 610 A45 45 0 0 1 655 610 L655 780 Z" fill="#4C4236"/>
      <rect x="0" y="780" width="800" height="220" fill="#6F6353"/>
      <ellipse cx="400" cy="835" rx="210" ry="18" fill="#54493C" opacity="0.4"/>
      <circle cx="385" cy="745" r="22" fill="none" stroke="#1E1B18" stroke-width="4"/>
      <circle cx="445" cy="745" r="22" fill="none" stroke="#1E1B18" stroke-width="4"/>
      <path d="M385 745 L412 715 L445 745 M412 715 L408 692" stroke="#1E1B18" stroke-width="3.5" fill="none"/>
      <text x="400" y="930" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#EFE8DC" letter-spacing="6">Ô QUAN CHƯỞNG · 05:45 AM</text>
    </svg>`,
    facade: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="#E3C67C"/>
      <polygon points="0,0 800,0 800,420 0,680" fill="#D4B263" opacity="0.65"/>
      <rect x="60" y="120" width="680" height="45" fill="#9E7C44"/>
      <polygon points="40,120 400,55 760,120" fill="#5A3D2B"/>
      <rect x="170" y="240" width="160" height="260" fill="#3D4F40"/>
      <rect x="470" y="240" width="160" height="260" fill="#3D4F40"/>
      <line x1="250" y1="240" x2="250" y2="500" stroke="#28352A" stroke-width="6"/>
      <line x1="550" y1="240" x2="550" y2="500" stroke="#28352A" stroke-width="6"/>
      <rect x="150" y="500" width="200" height="24" fill="#5A4A38"/>
      <rect x="450" y="500" width="200" height="24" fill="#5A4A38"/>
      <rect x="260" y="590" width="280" height="320" fill="#4E3524"/>
      <circle cx="400" cy="430" r="28" fill="#C94A38"/>
      <line x1="400" y1="360" x2="400" y2="402" stroke="#2B2118" stroke-width="3"/>
      <rect x="0" y="910" width="800" height="90" fill="#5E564C"/>
      <text x="400" y="965" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#EFE8DC" letter-spacing="6">PHỐ HÀNG BẠC · 16:30 PM</text>
    </svg>`,
    alley: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="rain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3E4347"/>
          <stop offset="55%" stop-color="#6E7375"/>
          <stop offset="100%" stop-color="#2B2D2F"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#rain)"/>
      <polygon points="0,0 290,260 290,770 0,1000" fill="#232527"/>
      <polygon points="800,0 510,260 510,770 800,1000" fill="#2B2D30"/>
      <rect x="335" y="420" width="54" height="72" fill="#F0B85B" opacity="0.85"/>
      <rect x="425" y="465" width="38" height="54" fill="#E39B42" opacity="0.75"/>
      <path d="M0 140 Q400 240 800 120" stroke="#161718" stroke-width="3" fill="none"/>
      <path d="M0 185 Q400 285 800 175" stroke="#161718" stroke-width="2" fill="none"/>
      <path d="M0 220 Q400 310 800 210" stroke="#161718" stroke-width="2.5" fill="none"/>
      <ellipse cx="362" cy="840" rx="28" ry="85" fill="#F0B85B" opacity="0.28"/>
      <ellipse cx="442" cy="850" rx="20" ry="70" fill="#E39B42" opacity="0.22"/>
      <text x="400" y="950" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#D5D0C8" letter-spacing="6">NGÕ PHỐ CỔ · MƯA THU</text>
    </svg>`
  };
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(templates[theme]);
}

// BỘ TỪ ĐIỂN GIAO DIỆN 5 NGÔN NGỮ
const UI_TEXT = {
  en: {
    brand: 'Ký Ức Phố Cổ',
    back: 'Gallery',
    eyebrow: 'Hanoi Old Quarter · Fine Art Prints',
    heroTitle: 'Echoes of Old Hanoi',
    heroSubtitle: 'Quiet moments captured on the mossy streets of Hanoi’s 36 Guilds. Archival museum prints crafted for travelers.',
    collectionLabel: 'Curated Collection',
    worksCount: '3 Works',
    fromPrice: 'From',
    tapZoom: 'Tap artwork to view details',
    storyHeading: 'Story Behind the Photo',
    editionHeading: 'Select Edition',
    sizeHeading: 'Select Size',
    rolledTitle: 'Rolled Print',
    rolledBadge: 'Cabin-friendly',
    rolledDesc: 'Packed in a sturdy protective Kraft tube (42cm). Lightweight & safe for carry-on luggage.',
    framedTitle: 'Framed Edition',
    framedBadge: 'Ready to hang',
    framedDesc: 'Minimalist solid wood frame with UV-protective museum acrylic. Worldwide crated shipping available.',
    sizeNotes: {
      a3: 'Fits carry-on backpack',
      a2: 'Statement wall piece'
    },
    selectedLabel: 'Selected',
    ctaButton: 'Order / Ask Int’l Shipping via WhatsApp',
    footerTitle: 'Visit Our Studio in the Old Quarter',
    footerAddress: 'Hàng Bạc Street, Hoàn Kiếm District, Hanoi\nOpen daily 09:00 – 21:00 · Worldwide shipping',
    notFoundTitle: 'Artwork Not Found',
    notFoundText: 'This piece is currently not in our digital catalog.',
    notFoundBtn: 'Return to Gallery'
  },
  vi: {
    brand: 'Ký Ức Phố Cổ',
    back: 'Phòng tranh',
    eyebrow: 'Phố Cổ Hà Nội · Ảnh Nghệ Thuật',
    heroTitle: 'Thanh Âm Phố Cổ',
    heroSubtitle: 'Những khoảnh khắc tĩnh lặng trên 36 phố phường Hà Nội. Bản in nghệ thuật chuẩn bảo tàng dành cho người yêu cái đẹp.',
    collectionLabel: 'Bộ sưu tập tuyển chọn',
    worksCount: '3 Tác phẩm',
    fromPrice: 'Từ',
    tapZoom: 'Chạm vào ảnh để phóng to',
    storyHeading: 'Câu Chuyện Đằng Sau Bức Ảnh',
    editionHeading: 'Chọn Phiên Bản',
    sizeHeading: 'Chọn Kích Thước',
    rolledTitle: 'Bản in cuộn gọn nhẹ',
    rolledBadge: 'Mang lên máy bay',
    rolledDesc: 'Đóng gói trong ống giấy cứng bảo vệ (42cm). Nhẹ, an toàn, dễ dàng mang theo hành lý xách tay.',
    framedTitle: 'Bản đóng khung hoàn chỉnh',
    framedBadge: 'Treo tường ngay',
    framedDesc: 'Khung gỗ tự nhiên tối giản cùng mica chống tia UV chuẩn triển lãm. Hỗ trợ đóng kiện gửi quốc tế.',
    sizeNotes: {
      a3: 'Gọn nhẹ vừa balo',
      a2: 'Kích thước triển lãm'
    },
    selectedLabel: 'Đã chọn',
    ctaButton: 'Đặt hàng / Hỏi ship quốc tế qua WhatsApp',
    footerTitle: 'Ghé Thăm Cửa Hàng Tại Phố Cổ',
    footerAddress: 'Phố Hàng Bạc, Quận Hoàn Kiếm, Hà Nội\nMở cửa 09:00 – 21:00 hàng ngày · Giao hàng toàn cầu',
    notFoundTitle: 'Không tìm thấy tác phẩm',
    notFoundText: 'Tác phẩm này hiện không có trong danh mục trưng bày.',
    notFoundBtn: 'Quay lại phòng tranh'
  },
  ko: {
    brand: '하노이 구시가지 갤러리',
    back: '갤러리',
    eyebrow: '하노이 구시가지 · 파인 아트 프린트',
    heroTitle: '오래된 하노이의 울림',
    heroSubtitle: '이끼 낀 하노이 36거리의 고요한 순간들. 여행자를 위해 정성껏 제작한 박물관 아카이브 프린트.',
    collectionLabel: '큐레이션 컬렉션',
    worksCount: '작품 3점',
    fromPrice: '가격',
    tapZoom: '작품을 탭하여 크게 보기',
    storyHeading: '사진 속 이야기',
    editionHeading: '에디션 선택',
    sizeHeading: '크기 선택',
    rolledTitle: '롤드 프린트 (지관통 포장)',
    rolledBadge: '기내 반입 가능',
    rolledDesc: '견고한 크라프트 지관통(42cm)에 말아 안전하게 포장됩니다. 가볍고 기내 수하물에 쏙 들어갑니다.',
    framedTitle: '액자 포함 에디션',
    framedBadge: '바로 전시 가능',
    framedDesc: 'UV 차단 아크릴과 미니멀한 원목 프레임. 전 세계 안전 해외 배송이 가능합니다.',
    sizeNotes: {
      a3: '기내 백팩 수납',
      a2: '대형 전시용'
    },
    selectedLabel: '선택한 옵션',
    ctaButton: 'WhatsApp으로 주문 / 해외배송 문의',
    footerTitle: '구시가지 스튜디오 방문하기',
    footerAddress: '하노이 호안끼엠 항박 거리 (Hàng Bạc)\n매일 09:00 – 21:00 운영 · 전 세계 배송 가능',
    notFoundTitle: '작품을 찾을 수 없습니다',
    notFoundText: '요청하신 작품이 현재 목록에 없습니다.',
    notFoundBtn: '갤러리로 돌아가기'
  },
  ja: {
    brand: 'ハノイ旧市街ギャラリー',
    back: 'ギャラリー',
    eyebrow: 'ハノイ旧市街 · ファインアートプリント',
    heroTitle: '古きハノイの余韻',
    heroSubtitle: '苔むしたハノイ三十六通りの静かな瞬間。旅人のために仕立てた美術館品質のアーカイブプリント。',
    collectionLabel: '厳選コレクション',
    worksCount: '全3作品',
    fromPrice: '価格',
    tapZoom: 'タップして拡大表示',
    storyHeading: '写真に込められた物語',
    editionHeading: 'エディションを選択',
    sizeHeading: 'サイズを選択',
    rolledTitle: 'ロールプリント（筒入り）',
    rolledBadge: '機内持ち込み可',
    rolledDesc: '丈夫なクラフト紙筒（42cm）に丸めて梱包。軽量で機内持ち込み手荷物にも最適です。',
    framedTitle: '額装エディション',
    framedBadge: 'すぐに飾れる',
    framedDesc: 'UVカットアクリルと上質な木製フレーム付き。海外への木枠梱包発送も承ります。',
    sizeNotes: {
      a3: '機内持ち込みサイズ',
      a2: '存在感のある展示用'
    },
    selectedLabel: '選択中',
    ctaButton: 'WhatsAppで注文・海外発送を相談',
    footerTitle: '旧市街のスタジオへお越しください',
    footerAddress: 'ハノイ市ホアンキエム区ハンバック通り\n毎日 09:00 – 21:00 · 世界中へ発送可能',
    notFoundTitle: '作品が見つかりません',
    notFoundText: 'お探しの作品は現在カタログに掲載されていません。',
    notFoundBtn: 'ギャラリーに戻る'
  },
  fr: {
    brand: 'Mémoires du Vieux Hanoï',
    back: 'Galerie',
    eyebrow: 'Vieux Quartier de Hanoï · Tirages d’Art',
    heroTitle: 'Échos du Vieux Hanoï',
    heroSubtitle: 'Instants silencieux saisis dans les ruelles des 36 corporations. Tirages d’art qualité musée pensés pour les voyageurs.',
    collectionLabel: 'Collection Choisie',
    worksCount: '3 Œuvres',
    fromPrice: 'À partir de',
    tapZoom: 'Appuyez pour agrandir',
    storyHeading: 'L’Histoire Derrière la Photo',
    editionHeading: 'Choisir l’Édition',
    sizeHeading: 'Choisir le Format',
    rolledTitle: 'Tirage Roulé en Tube',
    rolledBadge: 'Format Cabine',
    rolledDesc: 'Protégé dans un tube rigide (42 cm). Léger et idéal pour voyager en bagage cabine.',
    framedTitle: 'Édition Encadrée',
    framedBadge: 'Prêt à accrocher',
    framedDesc: 'Cadre minimaliste en bois massif et verre acrylique anti-UV. Expédition internationale sécurisée.',
    sizeNotes: {
      a3: 'Tient dans un sac cabine',
      a2: 'Format galerie'
    },
    selectedLabel: 'Sélection',
    ctaButton: 'Commander / Livraison Int’l via WhatsApp',
    footerTitle: 'Visitez Notre Atelier au Vieux Quartier',
    footerAddress: 'Rue Hàng Bạc, District de Hoàn Kiếm, Hanoï\nOuvert tous les jours 09:00 – 21:00 · Livraison mondiale',
    notFoundTitle: 'Œuvre Introuvable',
    notFoundText: 'Cette photographie ne figure pas dans notre catalogue actuel.',
    notFoundBtn: 'Retour à la Galerie'
  }
};

// DỮ LIỆU 3 TÁC PHẨM MẪU (Đường dẫn /art/1, /art/2, /art/3)
const ARTWORKS = [
  {
    id: '1',
    catalogNo: 'NO. 01 · LIMITED EDITION',
    image: createHanoiPlaceholderSVG('gate'), // Thay bằng 'images/art-1.jpg' khi có ảnh thật
    year: '2025',
    title: {
      en: 'Morning Mist at Ô Quan Chưởng',
      vi: 'Sáng Sớm Ô Quan Chưởng',
      ko: '오 꽌 쯔엉의 아침 안개',
      ja: 'オ・クアン・チュオンの朝霧',
      fr: 'Brume Matinale à Ô Quan Chưởng'
    },
    location: {
      en: 'Ô Quan Chưởng Gate, Hoàn Kiếm',
      vi: 'Cửa Ô Quan Chưởng, Hoàn Kiếm',
      ko: '하노이 호안끼엠 오 꽌 쯔엉',
      ja: 'ハノイ・ホアンキエム区 オ・クアン・チュオン',
      fr: 'Porte Ô Quan Chưởng, Hoàn Kiếm'
    },
    story: {
      en: 'At 5:45 AM, before the roar of motorbikes wakes the Old Quarter, the last surviving city gate of ancient Thăng Long stands draped in silver mist.\n\nA lone flower vendor pedals silently beneath the centuries-old brick arch—a fleeting bridge between royal history and everyday Hanoi.',
      vi: 'Lúc 5 giờ 45 sáng, trước khi tiếng xe cộ đánh thức cả khu Phố Cổ, cửa ô cuối cùng còn sót lại của kinh thành Thăng Long xưa đứng lặng lẽ trong màn sương bạc.\n\nMột gánh hàng hoa đạp xe lướt qua vòm gạch cổ rêu phong—như một nhịp cầu mong manh nối liền lịch sử trăm năm với nhịp sống bình dị của Hà Nội hôm nay.',
      ko: '오전 5시 45분, 오토바이 소음이 구시가지를 깨우기 전. 옛 탕롱 성의 마지막 남은 성문이 은빛 안개 속에 고요히 서 있습니다.\n\n수백 년 된 벽돌 아치 아래로 꽃을 실은 자전거 한 대가 조용히 지나갑니다. 천 년의 역사와 오늘날 하노이의 소박한 일상이 만나는 찰나의 순간입니다.',
      ja: '午前5時45分、バイクの喧騒が旧市街を目覚めさせる前。古都タンロンに現存する最後の城門が、銀色の朝霧に包まれて静かに佇んでいます。\n\n何世紀も経た煉瓦のアーチの下を、花売りの自転車が音もなく通り過ぎていく——悠久の歴史と現在のハノイの日常が交差する一瞬の記録です。',
      fr: 'À 5h45 du matin, avant que le vacarme des scooters n’éveille le Vieux Quartier, la dernière porte de l’ancienne citadelle de Thăng Long repose dans une brume argentée.\n\nUne marchande de fleurs passe à vélo sous l’arche séculaire — un trait d’union éphémère entre l’histoire impériale et le Hanoï d’aujourd’hui.'
    },
    pricing: {
      rolled: {
        a3: { label: '30 × 40 cm (A3)', usd: 45, vnd: '1.125.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 75, vnd: '1.875.000 ₫' }
      },
      framed: {
        a3: { label: '30 × 40 cm (A3)', usd: 95, vnd: '2.375.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 155, vnd: '3.875.000 ₫' }
      }
    }
  },
  {
    id: '2',
    catalogNo: 'NO. 02 · LIMITED EDITION',
    image: createHanoiPlaceholderSVG('facade'),
    year: '2025',
    title: {
      en: 'Afternoon Sun on Hàng Bạc',
      vi: 'Nắng Chiều Phố Hàng Bạc',
      ko: '항박 거리의 오후 햇살',
      ja: 'ハンバック通りの午後の陽射し',
      fr: 'Soleil d’Après-Midi rue Hàng Bạc'
    },
    location: {
      en: 'Hàng Bạc Silversmith Street, Hanoi',
      vi: 'Phố Hàng Bạc, Hoàn Kiếm, Hà Nội',
      ko: '하노이 항박(Hàng Bạc) 은세공 거리',
      ja: 'ハノイ・ハンバック通り（銀細工師の街）',
      fr: 'Rue Hàng Bạc, Vieux Hanoï'
    },
    story: {
      en: 'Late afternoon sunlight turns the weathered mustard-yellow walls of Hàng Bạc into molten gold. Behind those faded green wooden shutters, silversmiths have tapped delicate patterns for generations.\n\nLook closely at the shadows—time seems to slow down on these crumbling French-Vietnamese facades.',
      vi: 'Nắng cuối chiều nhuộm vàng rực những bức tường vôi cũ kỹ trên con phố thợ bạc lâu đời nhất Hà Nội. Phía sau khung cửa chớp xanh rêu, tiếng búa gõ bạc vẫn vang lên đều đặn qua bao thế hệ.\n\nÁnh sáng đổ nghiêng lên mặt tiền cổ kính khiến thời gian như chậm lại giữa lòng phố thị.',
      ko: '늦은 오후의 햇살이 항박 거리의 빛바랜 겨자빛 벽면을 황금빛으로 물들입니다. 낡은 초록색 나무 덧문 너머로는 대를 이어 은을 두드리는 장인들의 소리가 들려옵니다.\n\n오랜 세월을 품은 외벽 위로 길게 드리워진 그림자 속에서, 하노이의 시간은 잠시 멈춘 듯 천천히 흐릅니다.',
      ja: '夕暮れ前の陽射しが、ハンバック通りの色褪せたマスタードイエローの壁を黄金色に染め上げます。古びた緑の木製鎧戸の奥では、何世代にもわたり銀細工職人の槌音が響いてきました。\n\n歴史を刻むファサードに落ちる光と影の中で、時の流れがそっと緩やかになるのを感じます。',
      fr: 'La lumière dorée de fin d’après-midi embrase les façades ocre jaune de la rue Hàng Bạc. Derrière ces volets verts patinés, les orfèvres cisèlent l’argent depuis des générations.\n\nDans le jeu des ombres allongées sur l’architecture franco-vietnamienne, le temps semble suspendu.'
    },
    pricing: {
      rolled: {
        a3: { label: '30 × 40 cm (A3)', usd: 45, vnd: '1.125.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 75, vnd: '1.875.000 ₫' }
      },
      framed: {
        a3: { label: '30 × 40 cm (A3)', usd: 95, vnd: '2.375.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 155, vnd: '3.875.000 ₫' }
      }
    }
  },
  {
    id: '3',
    catalogNo: 'NO. 03 · LIMITED EDITION',
    image: createHanoiPlaceholderSVG('alley'),
    year: '2025',
    title: {
      en: 'Autumn Rain in a Hidden Alley',
      vi: 'Mưa Thu Trong Ngõ Nhỏ',
      ko: '작은 골목의 가을비',
      ja: '路地裏の秋雨',
      fr: 'Pluie d’Automne dans une Ruelle'
    },
    location: {
      en: 'Tạm Thương Alley, Old Quarter',
      vi: 'Ngõ Tạm Thương, Phố Cổ Hà Nội',
      ko: '하노이 구시가지 땀트엉 골목',
      ja: 'ハノイ旧市街 タムトゥオン路地',
      fr: 'Ruelle Tạm Thương, Vieux Quartier'
    },
    story: {
      en: 'Only two shoulders wide, this hidden alley holds a world of its own. When autumn drizzle slicks the cobblestones, warm amber light from upstairs windows spills down into the puddles.\n\nAbove, tangled power lines weave a chaotic crown—an unmistakable signature of Hanoi’s living poetry.',
      vi: 'Con ngõ nhỏ chỉ vừa hai người đi bộ lại cất giữ cả một thế giới riêng. Khi mưa phùn thu làm ướt mặt ngõ, ánh đèn vàng ấm áp từ những ô cửa sổ trên cao soi bóng xuống vũng nước.\n\nPhía trên là những chùm dây điện đan xen—nét ký họa chân thực và đầy chất thơ của Hà Nội.',
      ko: '어깨 두 개가 겨우 지나갈 만한 좁은 골목 안에는 또 다른 세상이 숨어 있습니다. 가을 이슬비가 돌바닥을 적시면, 2층 창가에서 새어 나온 따뜻한 호박빛 조명이 빗물 웅덩이에 비칩니다.\n\n머리 위로 얽힌 전선들마저도 살아 숨 쉬는 하노이만의 시적인 풍경을 완성합니다.',
      ja: '肩幅ほどの狭い路地裏には、もう一つの世界が広がっています。秋の小雨が石畳を濡らすと、二階の窓からこぼれる温かい琥珀色の灯りが水たまりに揺れます。\n\n頭上に絡み合う無数の電線さえも、生き続けるハノイならではの詩情を語る象徴的な風景です。',
      fr: 'Large comme deux épaules, cette ruelle secrète abrite tout un univers. Sous la bruine d’automne, la lueur ambrée des fenêtres se reflète dans les flaques sur les pavés.\n\nAu-dessus, l’entrelacs des fils électriques dessine une couronne familière — la poésie vivante et indissociable de Hanoï.'
    },
    pricing: {
      rolled: {
        a3: { label: '30 × 40 cm (A3)', usd: 50, vnd: '1.250.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 80, vnd: '2.000.000 ₫' }
      },
      framed: {
        a3: { label: '30 × 40 cm (A3)', usd: 100, vnd: '2.500.000 ₫' },
        a2: { label: '50 × 70 cm (A2)', usd: 165, vnd: '4.125.000 ₫' }
      }
    }
  }
];