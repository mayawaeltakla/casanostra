/**
 * محتوى صفحة «من نحن» — النسخة العربية (نصوص معتمدة من العميل، 2026-10-11).
 *
 * الصور: صورة المؤسس وشعارات الشركاء الخمسة مأخوذة من ملف العميل (الوورد) كما هي.
 * شعارات الشركاء مُجهَّزة كمربعات 640×640 بحيث تظهر كاملة داخل دائرة بلا قص.
 * لا يظهر عنوان «Trusted By» إلا عند وجود شعارات.
 *
 * TODO(client): عبارة «حطي صورتي ناح كلمتي والغي الكلام يلي تحت بس DR. ALZUHAILI»
 * غامضة — لم تُحذف فقرات السيرة قبل حسم المقصود.
 */
export const founderPhoto = {
  src: "/images/about/founder.webp",
  alt: "Dr. MHD GHIATH ALZUHAILI",
  width: 800,
  height: 800,
};

export const partnerLogos: { src: string; alt: string }[] = [
  { src: "/images/about/partners/best-moment.webp", alt: "Best Moment" },
  { src: "/images/about/partners/mgz.webp", alt: "MGZ Economic Advisors" },
  { src: "/images/about/partners/oakland.webp", alt: "Oakland Real Estate" },
  { src: "/images/about/partners/orec-clinic.webp", alt: "O'rec Clinic" },
  { src: "/images/about/partners/tk.webp", alt: "TK" },
];

export const aboutAr = {
  intro: [
    "منذ تأسيس CASA NOSTRA Tourism, Hospitality, Construction, Import & Export Ltd.، أصبحت الشركة رمزاً للثقة والاحترافية في تقديم الخدمات السياحية والتجارية والاستثمارية. يقع مقر الشركة في إسطنبول، وتمتلك ترخيص وكالة سفر من الفئة A TÜRSAB No: 10516",
    "نؤمن بأن النجاح لا يُقاس فقط بحجم الأعمال، بل بقيمة العلاقات التي نبنيها مع عملائنا وشركائنا. لذلك نحرص على تقديم حلول متكاملة ترتكز على الجودة والشفافية والالتزام، مع فهم عميق لاحتياجات الأسواق المحلية والدولية.",
    "وتواصل الشركة توسيع نطاق أعمالها من خلال الاستثمار في الفرص النوعية، وتطوير الشراكات الاستراتيجية، وتقديم خدمات مصممة خصيصاً لتلبية تطلعات العملاء الباحثين عن التميز والثقة والاستدامة.",
  ],
  company: {
    lines: [
      "CASA NOSTRA",
      "Cumhuriyet Mah. Saksı Sk. Aslı Han No:9/15 Şişli - Istanbul",
      "A Group Travel Agency License No: 10516",
      "Tourism • Investment • Business Development • International Partnerships",
    ],
  },
  founder: {
    heading: "Founder & Managing Director",
    name: "Dr. MHD GHIATH ALZUHAILI",
    photo: founderPhoto,
    paragraphs: [
      "رائد أعمال ومستشار اقتصادي يتمتع بخبرة واسعة في إدارة الأعمال والاستثمار والتطوير الاستراتيجي للشركات.",
      "يشغل Dr. MHD GHIATH ALZUHAILI منصب المدير المفوض والشريك في CASA NOSTRA، ويتمتع بحق التمثيل المنفرد للشركة وفق السجلات الرسمية",
      "تتمثل رؤيته في بناء مؤسسة دولية تجمع بين الابتكار والاحترافية وتوفير حلول متكاملة تساهم في خلق فرص جديدة للأعمال والاستثمار والسياحة. ومن خلال نهجه القائم على الجودة والثقة والشراكات طويلة الأمد، يعمل على تعزيز مكانة الشركة كشريك موثوق للعملاء والمؤسسات في الأسواق العالمية.",
    ],
    quote: "نؤمن بأن الثقة هي أساس كل نجاح، وأن أفضل الاستثمارات هي تلك التي تبني قيمة مستدامة للناس والأعمال.",
  },
  partners: {
    heading: "Our Partners",
    text: "نفخر بشبكة شركائنا الذين يمثلون جزءاً أساسياً من قصة نجاحنا. لقد ساهمت هذه الشراكات في تعزيز قدرتنا على تقديم خدمات عالية المستوى وتوفير حلول مبتكرة تلبي متطلبات الأسواق المتغيرة.",
    closing: "شركاؤنا هم شركاء النجاح، ومعاً نبني مستقبلاً أكثر قوة واستدامة.",
    trustedBy: "Trusted By",
    logos: partnerLogos,
  },
};
