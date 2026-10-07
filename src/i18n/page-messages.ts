/**
 * ============================================================================
 *  CASANOSTRA — ترجمات الصفحات الداخلية (6 لغات)
 * ============================================================================
 *
 *  Namespaces الإضافية:
 *    - about: صفحة من نحن
 *    - faq: صفحة الأسئلة الشائعة
 *    - contact: صفحة اتصل بنا
 *    - quickBooking: صفحة الحجز السريع
 *    - offers: صفحة العروض
 *    - plans: صفحة الخطط السنوية
 *    - servicesPage: صفحة فهرس الخدمات
 *    - blogPage: صفحة قائمة المدونة
 *    - help: صفحة مركز المساعدة
 *    - privacy: صفحة الخصوصية
 *    - terms: صفحة الشروط
 * ============================================================================ */

import type { Locale } from "./messages";

type PageMessages = Record<Locale, Record<string, any>>;

export const plansPageMessages: PageMessages = {
  ar: {
    title: "خطط CASANOSTRA",
    subtitle: "تتضمن الخطط أسماء البرونزية والفضية والذهبية. تواصلوا معنا لمعرفة التفاصيل الحالية.",
    bronze: "الخطّة البرونزية",
    silver: "الخطّة الفضية",
    gold: "الخطّة الذهبية",
    contactButton: "استفسر عن الخطط عبر واتساب",
    whatsappMessage: "مرحباً CASANOSTRA، أود الاستفسار عن تفاصيل الخطط الحالية.",
  },
  en: {
    title: "CASANOSTRA Plans",
    subtitle: "The plans are named Bronze, Silver, and Gold. Contact us for their current details.",
    bronze: "Bronze Plan",
    silver: "Silver Plan",
    gold: "Gold Plan",
    contactButton: "Ask about plans via WhatsApp",
    whatsappMessage: "Hello CASANOSTRA, I would like to ask about the current plan details.",
  },
  tr: {
    title: "CASANOSTRA Planları",
    subtitle: "Planların adları Bronz, Gümüş ve Altın'dır. Güncel ayrıntılar için bizimle iletişime geçin.",
    bronze: "Bronz Plan",
    silver: "Gümüş Plan",
    gold: "Altın Plan",
    contactButton: "Planları WhatsApp üzerinden sorun",
    whatsappMessage: "Merhaba CASANOSTRA, güncel plan ayrıntılarını öğrenmek istiyorum.",
  },
  fr: {
    title: "Formules CASANOSTRA",
    subtitle: "Les formules sont nommées Bronze, Argent et Or. Contactez-nous pour connaître leurs détails actuels.",
    bronze: "Formule Bronze",
    silver: "Formule Argent",
    gold: "Formule Or",
    contactButton: "Demander les détails sur WhatsApp",
    whatsappMessage: "Bonjour CASANOSTRA, je souhaite connaître les détails actuels des formules.",
  },
  ru: {
    title: "Планы CASANOSTRA",
    subtitle: "Планы называются «Бронзовый», «Серебряный» и «Золотой». Узнайте актуальные условия у нашей команды.",
    bronze: "Бронзовый план",
    silver: "Серебряный план",
    gold: "Золотой план",
    contactButton: "Уточнить условия в WhatsApp",
    whatsappMessage: "Здравствуйте, CASANOSTRA. Хотел(а) бы узнать актуальные условия планов.",
  },
};

/* ====================================================================
 *  صفحة من نحن (about)
 * ==================================================================== */
export const aboutMessages: PageMessages = {
  ar: {
    title: "من نحن",
    badge: "وكالة CASANOSTRA السياحية",
    intro:
      "وكالة CASANOSTRA السياحية — خدمات سياحية وبرامج متنوعة في تركيا. تتوفر ثلاث خطط بأسماء البرونزية والفضية والذهبية، ويمكنكم التواصل معنا لمعرفة التفاصيل الحالية.",
    partnershipTitle: "شراكة استراتيجية",
    partnershipHeading: "شراكة مع CASANOSTRA",
    partnershipText1:
      "نتشارك مع وكالة CASANOSTRA السابقة في مجال تكنولوجيا المعلومات بناءً على علاقة راسخة وخبرة واسعة وسمعة طيبة، حيث حصلنا على ترخيص رسمي من خلال وكالة CASANOSTRA للسياحة. هذا الشراكة الاستراتيجية تمنحنا إمكانية الوصول إلى شبكة واسعة من موردي الخدمات السياحية في تركيا، مع ضمان الجودة العالية والاحترافية التي تتميّز بها CASANOSTRA.",
    partnershipText2:
      "هدفنا هو تقديم تجربة سياحية فاخرة لا تُنسى لعملائنا الكرام، عبر الاستفادة من خبرة CASANOSTRA المتراكمة على مدى سنوات في السوق التركي، مع إضافة لمستنا الخاصة في الابتكار والخدمة المتميّزة.",
    valuesTitle: "القيم التي نؤمن بها",
    valuesSubtitle:
      "أربع قيم أساسية تُوجّه كل قراراتنا وتُحدّد طريقة تعاملنا مع عملائنا وشركائنا.",
    valueTrust: "الاحتراف",
    valueTrustDesc:
      "نحرص على تقديم معلومات واضحة عن خدماتنا، ويمكنكم التواصل معنا للاستفسار.",
    valueFriendliness: "الودّية",
    valueFriendlinessDesc:
      "نعامل كل عميل كأنه فرد من العائلة. نستمع لاحتياجاتك، نقدّم النصائح الصادقة، ونبني علاقات طويلة الأمد قائمة على الثقة والاحترام المتبادل.",
    valueSafety: "الأمان",
    valueSafetyDesc:
      "نحرص على توضيح تفاصيل الخدمات وشروطها، ويمكنكم التواصل معنا لطرح أي استفسار.",
    valueSpeed: "السرعة",
    valueSpeedDesc:
      "يمكنكم إرسال طلبات الحجز والاستفسارات إلينا عبر واتساب.",
    ctaTitle: "تحدّث معنا الآن",
    ctaSubtitle:
      "للاستفسار عن خدماتنا أو الوكالة، يمكنكم التواصل معنا عبر واتساب.",
    ctaButton: "تحدّث معنا الآن عبر واتساب",
    locationsTitle: "مواقعنا",
    locationsHeading: "أين تجدنا",
    locationsSubtitle:
      "تواصلوا معنا لمعرفة معلومات الموقع.",
    workingHoursTitle: "أوقات العمل",
    fridayClosed: "الجمعة: مغلق",
  },
  en: {
    title: "About Us",
    badge: "CASANOSTRA Tourism Agency",
    intro:
      "CASANOSTRA Tourism Agency provides tourism services and programs in Turkey. Three plans are named Bronze, Silver, and Gold; contact us for their current details.",
    partnershipTitle: "Strategic Partnership",
    partnershipHeading: "Partnership with CASANOSTRA",
    partnershipText1:
      "We partner with CASANOSTRA agency in the field of information technology, based on a solid relationship, extensive experience, and a good reputation. We have obtained an official license through CASANOSTRA for Tourism. This strategic partnership gives us access to a wide network of tourism service providers in Turkey, with guaranteed high quality and professionalism that CASANOSTRA is known for.",
    partnershipText2:
      "Our goal is to provide an unforgettable luxury tourism experience for our clients, leveraging CASANOSTRA's years of experience in the Turkish market, while adding our own touch of innovation and distinguished service.",
    valuesTitle: "Our Core Values",
    valuesSubtitle:
      "Four core values guide all our decisions and determine how we deal with our clients and partners.",
    valueTrust: "Professionalism",
    valueTrustDesc:
      "We aim to provide clear information about our services. Contact us if you have questions.",
    valueFriendliness: "Friendliness",
    valueFriendlinessDesc:
      "We treat every client as a family member. We listen to your needs, provide honest advice, and build long-term relationships based on mutual trust and respect.",
    valueSafety: "Safety",
    valueSafetyDesc:
      "We aim to make service details and terms clear. Contact us if you have any questions.",
    valueSpeed: "Speed",
    valueSpeedDesc:
      "You can send booking requests and inquiries to us via WhatsApp.",
    ctaTitle: "Talk to Us Now",
    ctaSubtitle:
      "For questions about our services or agency, you can contact us via WhatsApp.",
    ctaButton: "Talk to Us Now via WhatsApp",
    locationsTitle: "Our Locations",
    locationsHeading: "Where to Find Us",
    locationsSubtitle:
      "Contact us for location information.",
    workingHoursTitle: "Working Hours",
    fridayClosed: "Friday: Closed",
  },
  tr: {
    title: "Hakkımızda",
    badge: "CASANOSTRA Turizm Ajansı",
    intro:
      "CASANOSTRA Turizm Ajansı Türkiye'de turizm hizmetleri ve programları sunar. Bronz, Gümüş ve Altın adlarında üç plan bulunur; güncel ayrıntılar için bizimle iletişime geçin.",
    partnershipTitle: "Stratejik Ortaklık",
    partnershipHeading: "CASANOSTRA ile Ortaklık",
    partnershipText1:
      "Sağlam bir ilişki, kapsamlı deneyim ve iyi bir itibara dayalı olarak CASANOSTRA ajansı ile bilgi teknolojileri alanında ortaklık yapıyoruz. CASANOSTRA Turizm üzerinden resmi bir lisans aldık. Bu stratejik ortaklık, Türkiye'deki geniş bir turizm hizmet sağlayıcıları ağına erişmemizi sağlar ve CASANOSTRA'nın bilindiği yüksek kalite ve profesyonellik güvencesiyle gelir.",
    partnershipText2:
      "Amacımız, CASANOSTRA'nın Türk pazarındaki yıllarca süren deneyiminden yararlanarak ve kendi inovasyon ve seçkin hizmet dokunuşumuzu ekleyerek müşterilerimize unutulmaz bir lüks turizm deneyimi sunmaktır.",
    valuesTitle: "Temel Değerlerimiz",
    valuesSubtitle:
      "Dört temel değer tüm kararlarımızı yönlendirir ve müşterilerimizle ve ortaklarımızla nasıl başa çıktığımızı belirler.",
    valueTrust: "Profesyonellik",
    valueTrustDesc:
      "Hizmetlerimiz hakkında açık bilgi sunmaya özen gösteriyoruz. Sorularınız için bizimle iletişime geçebilirsiniz.",
    valueFriendliness: "Samimiyet",
    valueFriendlinessDesc:
      "Her müşteriyi bir aile üyesi olarak ele alırız. İhtiyaçlarınızı dinler, dürüst tavsiyeler sunar ve karşılıklı güven ve saygıya dayalı uzun vadeli ilişkiler kurarız.",
    valueSafety: "Güvenlik",
    valueSafetyDesc:
      "Hizmet ayrıntılarını ve koşullarını açıkça sunmaya özen gösteriyoruz. Sorularınız için bizimle iletişime geçebilirsiniz.",
    valueSpeed: "Hız",
    valueSpeedDesc:
      "Rezervasyon taleplerinizi ve sorularınızı WhatsApp üzerinden bize iletebilirsiniz.",
    ctaTitle: "Bizimle Şimdi Konuşun",
    ctaSubtitle:
      "Hizmetlerimiz veya ajans hakkında bilgi almak için WhatsApp üzerinden bize ulaşabilirsiniz.",
    ctaButton: "WhatsApp ile Bizimle Konuşun",
    locationsTitle: "Konumlarımız",
    locationsHeading: "Bizi Nerede Bulursunuz",
    locationsSubtitle:
      "Konum bilgisi için bizimle iletişime geçin.",
    workingHoursTitle: "Çalışma Saatleri",
    fridayClosed: "Cuma: Kapalı",
  },
  fr: {
    title: "À Propos",
    badge: "Agence de Tourisme CASANOSTRA",
    intro:
      "L'agence de tourisme CASANOSTRA propose des services et des programmes touristiques en Turquie. Trois formules portent les noms Bronze, Argent et Or ; contactez-nous pour connaître leurs détails actuels.",
    partnershipTitle: "Partenariat Stratégique",
    partnershipHeading: "Partenariat avec CASANOSTRA",
    partnershipText1:
      "Nous sommes partenaires de l'agence CASANOSTRA dans le domaine des technologies de l'information, sur la base d'une relation solide, d'une expérience approfondie et d'une bonne réputation. Nous avons obtenu une licence officielle via CASANOSTRA pour le Tourisme. Ce partenariat stratégique nous donne accès à un vaste réseau de prestataires de services touristiques en Turquie, avec une qualité élevée garantie et le professionnalisme pour lesquels CASANOSTRA est connu.",
    partnershipText2:
      "Notre objectif est de fournir une expérience touristique de luxe inoubliable à nos clients, en tirant parti des années d'expérience de CASANOSTRA sur le marché turc, tout en ajoutant notre touche d'innovation et de service distingué.",
    valuesTitle: "Nos Valeurs Fondamentales",
    valuesSubtitle:
      "Quatre valeurs fondamentales guident toutes nos décisions et déterminent notre façon de traiter nos clients et partenaires.",
    valueTrust: "Professionnalisme",
    valueTrustDesc:
      "Nous veillons à présenter des informations claires sur nos services. Contactez-nous si vous avez des questions.",
    valueFriendliness: "Convivialité",
    valueFriendlinessDesc:
      "Nous traitons chaque client comme un membre de la famille. Nous écoutons vos besoins, fournissons des conseils honnêtes et construisons des relations à long terme basées sur la confiance et le respect mutuels.",
    valueSafety: "Sécurité",
    valueSafetyDesc:
      "Nous veillons à présenter clairement les détails et les conditions des services. Contactez-nous pour toute question.",
    valueSpeed: "Rapidité",
    valueSpeedDesc:
      "Vous pouvez nous envoyer vos demandes de réservation et vos questions via WhatsApp.",
    ctaTitle: "Parlez-nous Maintenant",
    ctaSubtitle:
      "Pour toute question sur nos services ou l'agence, vous pouvez nous contacter via WhatsApp.",
    ctaButton: "Parlez-nous Maintenant via WhatsApp",
    locationsTitle: "Nos Emplacements",
    locationsHeading: "Où Nous Trouver",
    locationsSubtitle:
      "Contactez-nous pour obtenir des informations sur l'emplacement.",
    workingHoursTitle: "Heures d'Ouverture",
    fridayClosed: "Vendredi : Fermé",
  },
  ru: {
    title: "О нас",
    badge: "Туристическое агентство CASANOSTRA",
    intro:
      "Туристическое агентство CASANOSTRA предлагает туристические услуги и программы в Турции. Есть три плана: «Бронзовый», «Серебряный» и «Золотой»; актуальные условия уточняйте у нашей команды.",
    partnershipTitle: "Стратегическое партнёрство",
    partnershipHeading: "Партнёрство с CASANOSTRA",
    partnershipText1:
      "Мы сотрудничаем с агентством CASANOSTRA в сфере информационных технологий на основе прочных отношений, обширного опыта и хорошей репутации. Мы получили официальную лицензию через CASANOSTRA для туризма. Это стратегическое партнёрство даёт нам доступ к широкой сети поставщиков туристических услуг в Турции, с гарантированным высоким качеством и профессионализмом, которыми известна CASANOSTRA.",
    partnershipText2:
      "Наша цель — предоставить нашим клиентам незабываемый люкс-опыт туризма, используя многолетний опыт CASANOSTRA на турецком рынке, добавляя нашу собственную инновационность и выдающийся сервис.",
    valuesTitle: "Наши основные ценности",
    valuesSubtitle:
      "Четыре основные ценности направляют все наши решения и определяют, как мы общаемся с клиентами и партнёрами.",
    valueTrust: "Профессионализм",
    valueTrustDesc:
      "Мы стараемся ясно предоставлять информацию об услугах. Если у вас есть вопросы, свяжитесь с нами.",
    valueFriendliness: "Дружелюбие",
    valueFriendlinessDesc:
      "Мы относимся к каждому клиенту как к члену семьи. Мы слушаем ваши потребности, даём честные советы и строим долгосрочные отношения на основе взаимного доверия и уважения.",
    valueSafety: "Безопасность",
    valueSafetyDesc:
      "Мы стараемся ясно излагать сведения об услугах и их условиях. Если у вас есть вопросы, свяжитесь с нами.",
    valueSpeed: "Скорость",
    valueSpeedDesc:
      "Вы можете отправить нам запрос на бронирование или задать вопрос через WhatsApp.",
    ctaTitle: "Поговорите с нами сейчас",
    ctaSubtitle:
      "По вопросам об услугах или агентстве свяжитесь с нами через WhatsApp.",
    ctaButton: "Поговорите с нами через WhatsApp",
    locationsTitle: "Наши местоположения",
    locationsHeading: "Где нас найти",
    locationsSubtitle:
      "Свяжитесь с нами, чтобы узнать информацию о местоположении.",
    workingHoursTitle: "Часы работы",
    fridayClosed: "Пятница: Закрыто",
  },
};

/* ====================================================================
 *  صفحة الأسئلة الشائعة (faq)
 * ==================================================================== */
export const faqMessages: PageMessages = {
  ar: {
    title: "الأسئلة الشائعة",
    badge: "أسئلة شائعة",
    subtitle:
      "مجموعة من أكثر الأسئلة شيوعاً التي يطرحها عملاؤنا عن خدماتنا السياحية. تصفّح الإجابات، وإن لم تجد سؤالك تواصل معنا مباشرةً.",
    ctaTitle: "سؤالك غير موجود؟",
    ctaSubtitle:
      "لا تتردد في سؤالنا مباشرةً عبر واتساب. فريقنا جاهز للرد على جميع استفساراتك خلال دقائق.",
    ctaButton: "اسألنا مباشرةً عبر واتساب",
    whatsappMessage: "مرحباً CASANOSTRA، لديّ سؤال غير موجود في صفحة الأسئلة الشائعة. أرجو الرد عليّ.",
    questions: [
      {
        q: "كيف أحجز خدمة من الموقع؟",
        a: "الحجز سهل جداً: اختر الخدمة المطلوبة من صفحة الخدمات، ثم املأ نموذج الحجز الموجود في صفحة الخدمة. عند الضغط على زر 'إرسال المعلومات إلى واتساب'، سيتم فتح واتساب برسالة جاهزة تحتوي جميع بياناتك.",
      },
      {
        q: "هل يمكنني الحجز لأكثر من شخص؟",
        a: "نعم، بالتأكيد. معظم نماذج الحجز تحتوي على 'عدّاد أشخاص' يتيح لك إضافة عدة أشخاص مع بيانات كل منهم. كما نوفّر خصومات خاصة للمجموعات التي تتجاوز 10 أشخاص.",
      },
      {
        q: "كيف أتواصل معكم؟",
        a: "يمكنك التواصل معنا عبر عدة طرق: واتساب مباشرةً، البريد الإلكتروني، الهاتف، أو نموذج التواصل في صفحة 'اتصل بنا'. فريقنا متاح من السبت إلى الخميس، 9:00 ص حتى 9:00 م.",
      },
      {
        q: "هل الحجوزات مضمونة؟",
        a: "تعتمد إمكانية تأكيد الحجز وشروطه على الخدمة والتوافر. تواصل معنا للتحقق من التفاصيل قبل المتابعة.",
      },
      {
        q: "ما هي طرق الدفع المتاحة؟",
        a: "نوفّر عدة طرق دفع: نقداً عند الوصول، التحويل البنكي، البطاقات الائتمانية (Visa/Mastercard)، والدفع الإلكتروني. عادة نطلب دفعة مقدمة 60% والباقي عند الوصول.",
      },
      {
        q: "هل يوجد خصومات للمجموعات؟",
        a: "نعم، نقدّم خصومات متدرّجة: خصم 10% للمجموعات 5-9 أشخاص، خصم 15% لـ 10-19 شخص، وخصومات تصل إلى 25% للمجموعات فوق 20 شخص.",
      },
      {
        q: "هل توفّرون خدمة الاستقبال من المطار؟",
        a: "نعم، خدمة الاستقبال من المطار متوفّرة في جميع مطارات تركيا. سائقنا سيكون بانتظارك في صالة الوصول مع لوحة تحمل اسمك. السعر يبدأ من 80$ للنقل الواحد.",
      },
      {
        q: "كيف أعدّل أو ألغي حجزي؟",
        a: "التعديل مجاني قبل 12 يوماً. الإلغاء: قبل 12 يوماً = استرداد 100%، من 11-2 يوم = استرداد 25%، أقل من يومين = لا استرداد.",
      },
      {
        q: "هل تقدّمون خدمة الحج والعمرة؟",
        a: "نعم، نوفّر باقات متكاملة للحج والعمرة عبر تركيا تشمل: تأشيرة الدخول، تذاكر الطيران، الإقامة، التنقلات، ومرشد ديني متخصص.",
      },
      {
        q: "ما هي السياحة العلاجية؟",
        a: "السياحة العلاجية تجمع بين العلاج الطبي والسياحة في تركيا. نوفّر باقات شاملة: استشارة طبية، تنسيق مع المستشفيات المعتمدة، ترجمة طبية، إقامة، ومتابعة بعد العودة.",
      },
    ],
  },
  en: {
    title: "FAQ",
    badge: "Common Questions",
    subtitle:
      "A collection of the most common questions our clients ask about our tourism services. Browse the answers, and if you don't find your question, contact us directly.",
    ctaTitle: "Didn't find your question?",
    ctaSubtitle:
      "Don't hesitate to ask us directly via WhatsApp. Our team is ready to answer all your inquiries within minutes.",
    ctaButton: "Ask Us Directly via WhatsApp",
    whatsappMessage: "Hello CASANOSTRA, I have a question not found in the FAQ. Please reply to me.",
    questions: [
      {
        q: "How do I book a service from the website?",
        a: "Booking is very easy: choose the desired service from the services page, then fill out the booking form on the service page. When you click 'Send Information via WhatsApp', WhatsApp will open with a ready message containing all your data.",
      },
      {
        q: "Can I book for more than one person?",
        a: "Yes, absolutely. Most booking forms contain a 'people counter' that allows you to add multiple people with each person's data. We also offer special discounts for groups exceeding 10 people.",
      },
      {
        q: "How do I contact you?",
        a: "You can contact us via several methods: direct WhatsApp, email, phone, or the contact form on the 'Contact' page. Our team is available Saturday to Thursday, 9:00 AM to 9:00 PM.",
      },
      {
        q: "Are bookings guaranteed?",
        a: "Booking confirmation and terms depend on the service and its availability. Contact us to confirm the details before proceeding.",
      },
      {
        q: "What payment methods are available?",
        a: "We offer several payment methods: cash on arrival, bank transfer, credit cards (Visa/Mastercard), and electronic payment. We usually require a 60% deposit with the balance on arrival.",
      },
      {
        q: "Are there group discounts?",
        a: "Yes, we offer graduated discounts: 10% for groups of 5-9 people, 15% for 10-19 people, and discounts up to 25% for groups over 20 people.",
      },
      {
        q: "Do you provide airport pickup service?",
        a: "Yes, airport pickup service is available at all Turkish airports. Our driver will be waiting for you in the arrivals hall with a sign bearing your name. Price starts from $80 per transfer.",
      },
      {
        q: "How do I modify or cancel my booking?",
        a: "Modification is free up to 12 days before. Cancellation: before 12 days = 100% refund, 11-2 days = 25% refund, less than 2 days = no refund.",
      },
      {
        q: "Do you offer Hajj and Umrah services?",
        a: "Yes, we offer comprehensive Hajj and Umrah packages through Turkey including: entry visa, flight tickets, accommodation, transportation, and a specialized religious guide.",
      },
      {
        q: "What is medical tourism?",
        a: "Medical tourism combines medical treatment and tourism in Turkey. We offer comprehensive packages: medical consultation, coordination with accredited hospitals, medical translation, accommodation, and follow-up after return.",
      },
    ],
  },
  tr: {
    title: "SSS",
    badge: "Sıkça Sorulan Sorular",
    subtitle:
      "Müşterilerimizin turizm hizmetlerimiz hakkında en sık sorduğu soruların bir koleksiyonu. Cevaplara göz atın, sorunuzü bulamazsanız bizimle doğrudan iletişime geçin.",
    ctaTitle: "Sorunuzü bulamadınız mı?",
    ctaSubtitle:
      "WhatsApp üzerinden bizimle doğrudan iletişime geçmekten çekinmeyin. Ekibimiz tüm sorularınızı dakikalar içinde yanıtlamaya hazır.",
    ctaButton: "WhatsApp ile Bize Sorun",
    whatsappMessage: "Merhaba CASANOSTRA, SSS bölümünde yanıtını bulamadığım bir sorum var. Lütfen bana dönüş yapın.",
    questions: [
      {
        q: "Web sitesinden nasıl hizmet rezerve ederim?",
        a: "Rezervasyon çok kolay: hizmetler sayfasından istediğiniz hizmeti seçin, ardından hizmet sayfasındaki rezervasyon formunu doldurun. 'WhatsApp ile Bilgi Gönder' düğmesine tıkladığınızda, tüm verilerinizi içeren hazır bir mesajla WhatsApp açılacaktır.",
      },
      {
        q: "Birden fazla kişi için rezerve edebilir miyim?",
        a: "Evet, kesinlikle. Çoğu rezervasyon formu, her kişinin verileriyle birden fazla kişi eklemenize olanak tanıyan bir 'kişi sayacı' içerir. 10 kişiyi aşan gruplar için özel indirimler de sunuyoruz.",
      },
      {
        q: "Sizinle nasıl iletişime geçerim?",
        a: "Birkaç yöntemle bizimle iletişime geçebilirsiniz: doğrudan WhatsApp, e-posta, telefon veya 'İletişim' sayfasındaki iletişim formu. Ekibimiz Cumartesi'den Perşembe'ye, 09:00 - 21:00 saatleri arası hizmet vermektedir.",
      },
      {
        q: "Rezervasyonlar garantili mi?",
        a: "Rezervasyon onayı ve koşulları hizmete ve uygunluğa bağlıdır. Devam etmeden önce ayrıntıları doğrulamak için bizimle iletişime geçin.",
      },
      {
        q: "Hangi ödeme yöntemleri mevcut?",
        a: "Birkaç ödeme yöntemi sunuyoruz: varışta nakit, banka havalesi, kredi kartları (Visa/Mastercard) ve elektronik ödeme. Genellikle %60 depozito ve bakiye varışta istenir.",
      },
      {
        q: "Grup indirimleri var mı?",
        a: "Evet, dereceli indirimler sunuyoruz: 5-9 kişilik gruplar için %10, 10-19 kişi için %15 ve 20 kişiden fazla gruplar için %25'e varan indirimler.",
      },
      {
        q: "Havalimanı karşılama hizmeti sunuyor musunuz?",
        a: "Evet, havalimanı karşılama hizmeti tüm Türk havalimanlarında mevcuttur. Sürücümüz varış salonunda adınızı taşıyan bir tabela ile sizi bekliyor olacaktır. Fiyat transfer başına 80$'dan başlar.",
      },
      {
        q: "Rezervasyonumu nasıl değiştiririm veya iptal ederim?",
        a: "Değişiklik 12 gün öncesine kadar ücretsizdir. İptal: 12 gün öncesi = %100 iade, 11-2 gün = %25 iade, 2 günden az = iade yok.",
      },
      {
        q: "Hac ve Umre hizmetleri sunuyor musunuz?",
        a: "Evet, Türkiye üzerinden kapsamlı Hac ve Umre paketleri sunuyoruz: giriş vizesi, uçak biletleri, konaklama, ulaşım ve uzman din rehberi dahil.",
      },
      {
        q: "Medikal turizm nedir?",
        a: "Medikal turizm, Türkiye'de tıbbi tedavi ve turizmi birleştirir. Kapsamlı paketler sunuyoruz: tıbbi danışmanlık, akredite hastanelerle koordinasyon, tıbbi çeviri, konaklama ve dönüş sonrası takip.",
      },
    ],
  },
  fr: {
    title: "FAQ",
    badge: "Questions Fréquentes",
    subtitle:
      "Une collection des questions les plus fréquentes que nos clients posent sur nos services touristiques. Parcourez les réponses, et si vous ne trouvez pas votre question, contactez-nous directement.",
    ctaTitle: "Vous n'avez pas trouvé votre question ?",
    ctaSubtitle:
      "N'hésitez pas à nous poser votre question directement via WhatsApp. Notre équipe est prête à répondre à toutes vos questions en quelques minutes.",
    ctaButton: "Posez-nous votre question via WhatsApp",
    whatsappMessage: "Bonjour CASANOSTRA, j'ai une question qui ne figure pas dans la FAQ. Merci de me répondre.",
    questions: [
      {
        q: "Comment réserver un service sur le site ?",
        a: "La réservation est très facile : choisissez le service souhaité sur la page des services, puis remplissez le formulaire de réservation sur la page du service. En cliquant sur 'Envoyer les informations via WhatsApp', WhatsApp s'ouvrira avec un message prêt contenant toutes vos données.",
      },
      {
        q: "Puis-je réserver pour plus d'une personne ?",
        a: "Oui, absolument. La plupart des formulaires de réservation contiennent un 'compteur de personnes' qui vous permet d'ajouter plusieurs personnes avec les données de chacun. Nous proposons également des remises spéciales pour les groupes de plus de 10 personnes.",
      },
      {
        q: "Comment vous contacter ?",
        a: "Vous pouvez nous contacter de plusieurs manières : WhatsApp direct, e-mail, téléphone, ou le formulaire de contact sur la page 'Contact'. Notre équipe est disponible du samedi au jeudi, de 9h00 à 21h00.",
      },
      {
        q: "Les réservations sont-elles garanties ?",
        a: "La confirmation et les conditions de réservation dépendent du service et de sa disponibilité. Contactez-nous pour vérifier les détails avant de poursuivre.",
      },
      {
        q: "Quels modes de paiement sont disponibles ?",
        a: "Nous proposons plusieurs modes de paiement : espèces à l'arrivée, virement bancaire, cartes de crédit (Visa/Mastercard) et paiement électronique. Nous exigeons généralement un acompte de 60 % avec le solde à l'arrivée.",
      },
      {
        q: "Y a-t-il des remises de groupe ?",
        a: "Oui, nous proposons des remises dégressives : 10 % pour les groupes de 5-9 personnes, 15 % pour 10-19 personnes, et des remises allant jusqu'à 25 % pour les groupes de plus de 20 personnes.",
      },
      {
        q: "Proposez-vous un service d'accueil à l'aéroport ?",
        a: "Oui, le service d'accueil à l'aéroport est disponible dans tous les aéroports turcs. Notre chauffeur vous attendra dans le hall des arrivées avec un panneau portant votre nom. Le prix commence à 80 $ par transfert.",
      },
      {
        q: "Comment modifier ou annuler ma réservation ?",
        a: "La modification est gratuite jusqu'à 12 jours avant. Annulation : avant 12 jours = 100 % de remboursement, 11-2 jours = 25 % de remboursement, moins de 2 jours = aucun remboursement.",
      },
      {
        q: "Proposez-vous des services de Hajj et Omra ?",
        a: "Oui, nous proposons des forfaits complets de Hajj et Omra via la Turquie comprenant : visa d'entrée, billets d'avion, hébergement, transport et guide religieux spécialisé.",
      },
      {
        q: "Qu'est-ce que le tourisme médical ?",
        a: "Le tourisme médical combine traitement médical et tourisme en Turquie. Nous proposons des forfaits complets : consultation médicale, coordination avec des hôpitaux accrédités, traduction médicale, hébergement et suivi après le retour.",
      },
    ],
  },
  ru: {
    title: "Часто задаваемые вопросы",
    badge: "Частые вопросы",
    subtitle:
      "Сборник наиболее частых вопросов, которые наши клиенты задают о наших туристических услугах. Просмотрите ответы, а если не найдёте свой вопрос, свяжитесь с нами напрямую.",
    ctaTitle: "Не нашли свой вопрос?",
    ctaSubtitle:
      "Не стесняйтесь задать нам вопрос напрямую через WhatsApp. Наша команда готова ответить на все ваши вопросы в течение нескольких минут.",
    ctaButton: "Спросите нас через WhatsApp",
    whatsappMessage: "Здравствуйте, CASANOSTRA! У меня есть вопрос, которого нет в разделе FAQ. Пожалуйста, ответьте мне.",
    questions: [
      {
        q: "Как забронировать услугу на сайте?",
        a: "Бронирование очень простое: выберите нужную услугу на странице услуг, затем заполните форму бронирования на странице услуги. При нажатии 'Отправить информацию через WhatsApp' откроется WhatsApp с готовым сообщением, содержащим все ваши данные.",
      },
      {
        q: "Могу ли я забронировать для более чем одного человека?",
        a: "Да, конечно. Большинство форм бронирования содержат 'счётчик людей', который позволяет добавлять нескольких человек с данными каждого. Мы также предлагаем специальные скидки для групп более 10 человек.",
      },
      {
        q: "Как с вами связаться?",
        a: "Вы можете связаться с нами несколькими способами: прямой WhatsApp, электронная почта, телефон или форма связи на странице 'Контакты'. Наша команда доступна с субботы по четверг, с 9:00 до 21:00.",
      },
      {
        q: "Гарантированы ли бронирования?",
        a: "Подтверждение и условия бронирования зависят от услуги и её доступности. Свяжитесь с нами, чтобы уточнить детали перед продолжением.",
      },
      {
        q: "Какие способы оплаты доступны?",
        a: "Мы предлагаем несколько способов оплаты: наличные при прибытии, банковский перевод, кредитные карты (Visa/Mastercard) и электронная оплата. Обычно мы требуем предоплату 60% с остатком при прибытии.",
      },
      {
        q: "Есть ли групповые скидки?",
        a: "Да, мы предлагаем градуированные скидки: 10% для групп 5-9 человек, 15% для 10-19 человек и скидки до 25% для групп более 20 человек.",
      },
      {
        q: "Предоставляете ли вы услугу встречи в аэропорту?",
        a: "Да, услуга встречи в аэропорту доступна во всех турецких аэропортах. Наш водитель будет ждать вас в зале прилёта с табличкой с вашим именем. Цена начинается от 80$ за трансфер.",
      },
      {
        q: "Как изменить или отменить бронирование?",
        a: "Изменение бесплатно до 12 дней до. Отмена: до 12 дней = 100% возврат, 11-2 дня = 25% возврат, менее 2 дней = без возврата.",
      },
      {
        q: "Предоставляете ли вы услуги Хаджа и Умры?",
        a: "Да, мы предлагаем комплексные пакеты Хаджа и Умры через Турцию, включая: въездную визу, авиабилеты, проживание, транспорт и специализированного религиозного гида.",
      },
      {
        q: "Что такое медицинский туризм?",
        a: "Медицинский туризм сочетает медицинское лечение и туризм в Турции. Мы предлагаем комплексные пакеты: медицинская консультация, координация с аккредитованными больницами, медицинский перевод, проживание и наблюдение после возвращения.",
      },
    ],
  },
};

/* ====================================================================
 *  صفحة اتصل بنا (contact)
 * ==================================================================== */
export const contactMessages: PageMessages = {
  ar: {
    title: "اتصل بنا",
    subtitle:
      "نحن هنا للإجابة على جميع استفساراتك ومساعدتك في تخطيط رحلتك المثالية إلى تركيا. تواصل معنا بأي طريقة تناسبك.",
    formTitle: "نموذج التواصل",
    formSubtitle:
      "املأ النموذج وسنقوم بفتح برنامج البريد الإلكتروني لديك برسالة جاهزة إلى فريقنا.",
    fieldName: "الاسم الكامل",
    fieldEmail: "البريد الإلكتروني",
    fieldPhone: "رقم الهاتف (اختياري)",
    fieldMessage: "رسالتك",
    submitButton: "إرسال عبر البريد الإلكتروني",
    mailtoNote: "سيتم فتح برنامج البريد لديك برسالة جاهزة",
    infoTitle: "معلومات الاتصال",
    phoneWhatsapp: "الهاتف / واتساب",
    callNow: "اتصل الآن",
    sendEmail: "أرسل بريداً",
    address: "العنوان",
    workingHours: "ساعات العمل",
    mapTitle: "موقعنا على الخريطة",
    mapSubtitle: "تجدنا في إسطنبول",
    whatsappBtn: "واتساب",
    callBtn: "اتصال مباشر",
    successMsg: "تم فتح برنامج البريد!",
    successNote: "أكمل إرسال الرسالة من برنامج البريد لديك.",
    sentViaEmail: "جاري الفتح...",
    addressValue: "بي أوغلو، إسطنبول، تركيا",
    workingHoursValue: "السبت - الخميس: 9:00 ص - 9:00 م",
    emergencyService: "خدمة الطوارئ متاحة على مدار الساعة",
    whatsappMessage: "مرحباً CASANOSTRA، أرغب بالتواصل معكم.",
    namePlaceholder: "مثال: محمد أحمد",
    messagePlaceholder: "اكتب رسالتك هنا...",
    validationNameRequired: "الاسم مطلوب",
    validationEmailRequired: "البريد الإلكتروني مطلوب",
    validationEmailInvalid: "البريد الإلكتروني غير صحيح",
    validationMessageRequired: "الرسالة مطلوبة",
    emailSubject: "رسالة من {name} — موقع CASANOSTRA",
    emailBody: "الاسم: {name}\nالبريد: {email}\nالهاتف: {phone}\n\nالرسالة:\n{message}",
    mapAccessibleTitle: "موقع CASANOSTRA في إسطنبول",
    notProvided: "غير محدد",
    formPrompt: "أرسل لنا {field}",
  },
  en: {
    title: "Contact Us",
    subtitle:
      "We are here to answer all your questions and help you plan your perfect trip to Turkey. Contact us in any way that suits you.",
    formTitle: "Contact Form",
    formSubtitle:
      "Fill out the form and we will open your email program with a ready message to our team.",
    fieldName: "Full Name",
    fieldEmail: "Email Address",
    fieldPhone: "Phone Number (Optional)",
    fieldMessage: "Your Message",
    submitButton: "Send via Email",
    mailtoNote: "Your email program will open with a ready message",
    infoTitle: "Contact Information",
    phoneWhatsapp: "Phone / WhatsApp",
    callNow: "Call Now",
    sendEmail: "Send Email",
    address: "Address",
    workingHours: "Working Hours",
    mapTitle: "Our Location on Map",
    mapSubtitle: "Find us in Istanbul",
    whatsappBtn: "WhatsApp",
    callBtn: "Direct Call",
    successMsg: "Email program opened!",
    successNote: "Complete sending the message from your email program.",
    sentViaEmail: "Opening...",
    addressValue: "Beyoğlu, Istanbul, Turkey",
    workingHoursValue: "Saturday - Thursday: 9:00 AM - 9:00 PM",
    emergencyService: "24/7 emergency service available",
    whatsappMessage: "Hello CASANOSTRA, I would like to contact you.",
    namePlaceholder: "Example: John Doe",
    messagePlaceholder: "Write your message here...",
    validationNameRequired: "Name is required",
    validationEmailRequired: "Email address is required",
    validationEmailInvalid: "Invalid email address",
    validationMessageRequired: "Message is required",
    emailSubject: "Message from {name} — CASANOSTRA website",
    emailBody: "Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}",
    mapAccessibleTitle: "CASANOSTRA location in Istanbul",
    notProvided: "Not provided",
    formPrompt: "Send us {field}",
  },
  tr: {
    title: "İletişim",
    subtitle:
      "Sorularınızı yanıtlamak ve Türkiye'de mükemmel gezinizi planlamanıza yardımcı olmak için buradayız. Size uygun olan herhangi bir yolla bizimle iletişime geçin.",
    formTitle: "İletişim Formu",
    formSubtitle:
      "Formu doldurun, ekibimize hazır bir mesajla e-posta programınızı açacağız.",
    fieldName: "Ad Soyad",
    fieldEmail: "E-posta Adresi",
    fieldPhone: "Telefon Numarası (İsteğe Bağlı)",
    fieldMessage: "Mesajınız",
    submitButton: "E-posta ile Gönder",
    mailtoNote: "Hazır bir mesajla e-posta programınız açılacak",
    infoTitle: "İletişim Bilgileri",
    phoneWhatsapp: "Telefon / WhatsApp",
    callNow: "Şimdi Ara",
    sendEmail: "E-posta Gönder",
    address: "Adres",
    workingHours: "Çalışma Saatleri",
    mapTitle: "Haritada Konumumuz",
    mapSubtitle: "Bizi İstanbul'da bulun",
    whatsappBtn: "WhatsApp",
    callBtn: "Doğrudan Ara",
    successMsg: "E-posta programı açıldı!",
    successNote: "Mesajı e-posta programınızdan göndermeyi tamamlayın.",
    sentViaEmail: "Açılıyor...",
    addressValue: "Beyoğlu, İstanbul, Türkiye",
    workingHoursValue: "Cumartesi - Perşembe: 09.00 - 21.00",
    emergencyService: "7/24 acil servis hizmeti",
    whatsappMessage: "Merhaba CASANOSTRA, sizinle iletişime geçmek istiyorum.",
    namePlaceholder: "Örnek: Ahmet Yılmaz",
    messagePlaceholder: "Mesajınızı buraya yazın...",
    validationNameRequired: "Ad gereklidir",
    validationEmailRequired: "E-posta adresi gereklidir",
    validationEmailInvalid: "Geçersiz e-posta adresi",
    validationMessageRequired: "Mesaj gereklidir",
    emailSubject: "{name} adlı kişiden mesaj — CASANOSTRA web sitesi",
    emailBody: "Ad: {name}\nE-posta: {email}\nTelefon: {phone}\n\nMesaj:\n{message}",
    mapAccessibleTitle: "CASANOSTRA'nın İstanbul'daki konumu",
    notProvided: "Belirtilmedi",
    formPrompt: "Bize {field} gönderin",
  },
  fr: {
    title: "Contactez-nous",
    subtitle:
      "Nous sommes là pour répondre à toutes vos questions et vous aider à planifier votre voyage parfait en Turquie. Contactez-nous de la manière qui vous convient.",
    formTitle: "Formulaire de Contact",
    formSubtitle:
      "Remplissez le formulaire et nous ouvrirons votre programme de messagerie avec un message prêt pour notre équipe.",
    fieldName: "Nom Complet",
    fieldEmail: "Adresse E-mail",
    fieldPhone: "Numéro de Téléphone (Optionnel)",
    fieldMessage: "Votre Message",
    submitButton: "Envoyer par E-mail",
    mailtoNote: "Votre programme de messagerie s'ouvrira avec un message prêt",
    infoTitle: "Informations de Contact",
    phoneWhatsapp: "Téléphone / WhatsApp",
    callNow: "Appeler Maintenant",
    sendEmail: "Envoyer un E-mail",
    address: "Adresse",
    workingHours: "Heures d'Ouverture",
    mapTitle: "Notre Emplacement sur la Carte",
    mapSubtitle: "Trouvez-nous à Istanbul",
    whatsappBtn: "WhatsApp",
    callBtn: "Appel Direct",
    successMsg: "Programme de messagerie ouvert !",
    successNote: "Complétez l'envoi du message depuis votre programme de messagerie.",
    sentViaEmail: "Ouverture...",
    addressValue: "Beyoğlu, Istanbul, Turquie",
    workingHoursValue: "Samedi - jeudi : 9 h - 21 h",
    emergencyService: "Service d'urgence disponible 24 h/24 et 7 j/7",
    whatsappMessage: "Bonjour CASANOSTRA, je souhaite vous contacter.",
    namePlaceholder: "Exemple : Jean Dupont",
    messagePlaceholder: "Écrivez votre message ici...",
    validationNameRequired: "Le nom est obligatoire",
    validationEmailRequired: "L'adresse e-mail est obligatoire",
    validationEmailInvalid: "Adresse e-mail invalide",
    validationMessageRequired: "Le message est obligatoire",
    emailSubject: "Message de {name} — site CASANOSTRA",
    emailBody: "Nom : {name}\nE-mail : {email}\nTéléphone : {phone}\n\nMessage :\n{message}",
    mapAccessibleTitle: "Emplacement de CASANOSTRA à Istanbul",
    notProvided: "Non renseigné",
    formPrompt: "Envoyez-nous {field}",
  },
  ru: {
    title: "Свяжитесь с нами",
    subtitle:
      "Мы здесь, чтобы ответить на все ваши вопросы и помочь спланировать идеальную поездку в Турцию. Свяжитесь с нами любым удобным способом.",
    formTitle: "Форма обратной связи",
    formSubtitle:
      "Заполните форму, и мы откроем вашу почтовую программу с готовым сообщением для нашей команды.",
    fieldName: "Полное имя",
    fieldEmail: "Адрес электронной почты",
    fieldPhone: "Номер телефона (необязательно)",
    fieldMessage: "Ваше сообщение",
    submitButton: "Отправить по электронной почте",
    mailtoNote: "Ваша почтовая программа откроется с готовым сообщением",
    infoTitle: "Контактная информация",
    phoneWhatsapp: "Телефон / WhatsApp",
    callNow: "Позвонить сейчас",
    sendEmail: "Отправить письмо",
    address: "Адрес",
    workingHours: "Часы работы",
    mapTitle: "Наше местоположение на карте",
    mapSubtitle: "Найдите нас в Стамбуле",
    whatsappBtn: "WhatsApp",
    callBtn: "Прямой звонок",
    successMsg: "Почтовая программа открыта!",
    successNote: "Завершите отправку сообщения из вашей почтовой программы.",
    sentViaEmail: "Открытие...",
    addressValue: "Бейоглу, Стамбул, Турция",
    workingHoursValue: "Суббота - четверг: 09:00 - 21:00",
    emergencyService: "Экстренная служба доступна круглосуточно",
    whatsappMessage: "Здравствуйте, CASANOSTRA! Хочу связаться с вами.",
    namePlaceholder: "Например: Иван Иванов",
    messagePlaceholder: "Напишите сообщение здесь...",
    validationNameRequired: "Укажите имя",
    validationEmailRequired: "Укажите адрес электронной почты",
    validationEmailInvalid: "Неверный адрес электронной почты",
    validationMessageRequired: "Введите сообщение",
    emailSubject: "Сообщение от {name} — сайт CASANOSTRA",
    emailBody: "Имя: {name}\nЭл. почта: {email}\nТелефон: {phone}\n\nСообщение:\n{message}",
    mapAccessibleTitle: "Местоположение CASANOSTRA в Стамбуле",
    notProvided: "Не указано",
    formPrompt: "Отправьте нам: {field}",
  },
};

/* ====================================================================
 *  صفحة الحجز السريع (quickBooking)
 * ==================================================================== */
export const quickBookingMessages: PageMessages = {
  ar: {
    title: "الحجز السريع",
    badge: "خدمات — اختر خدمتك",
    subtitle:
      "اختر الخدمة التي تريدها بسرعة من بين خدماتنا الـ11 المتكاملة. كل خدمة لها صفحة خاصة بنموذج حجز يُرسل بياناتك مباشرةً عبر واتساب.",
    sectionTitle: "11 خدمة سياحية متكاملة",
    sectionSubtitle:
      "من الإقامات الفاخرة إلى السيارات VIP والفيزا والرحلات — كل ما تحتاجه لرحلة مثالية في تركيا تحت سقف واحد.",
    bookNow: "احجز الآن",
    ctaTitle: "لست متأكداً أي خدمة تناسبك؟",
    ctaSubtitle:
      "تواصل معنا عبر واتساب وسنساعدك في اختيار الخدمة المناسبة لاحتياجاتك خلال دقائق.",
    ctaButton: "اسألنا عبر واتساب",
    chooseService: "اختر خدمتك",
    whatsappMessage: "مرحباً CASANOSTRA، لست متأكداً أي خدمة تناسبني. أرجو مساعدتي في الاختيار.",
  },
  en: {
    title: "Quick Booking",
    badge: "Services — Choose your service",
    subtitle:
      "Quickly choose the service you want from our 11 integrated services. Each service has its own page with a booking form that sends your data directly via WhatsApp.",
    sectionTitle: "11 Integrated Tourism Services",
    sectionSubtitle:
      "From luxury stays to VIP cars, visa, and tours — everything you need for a perfect trip in Turkey under one roof.",
    bookNow: "Book Now",
    ctaTitle: "Not sure which service suits you?",
    ctaSubtitle:
      "Contact us via WhatsApp and we will help you choose the right service for your needs within minutes.",
    ctaButton: "Ask Us via WhatsApp",
    chooseService: "Choose your service",
    whatsappMessage: "Hello CASANOSTRA, I am not sure which service is right for me. Please help me choose.",
  },
  tr: {
    title: "Hızlı Rezervasyon",
    badge: "Hizmetler — Hizmetinizi seçin",
    subtitle:
      "11 entegre hizmetimizden istediğiniz hizmeti hızla seçin. Her hizmetin, verilerinizi doğrudan WhatsApp üzerinden gönderen bir rezervasyon formuna sahip kendi sayfası vardır.",
    sectionTitle: "11 Entegre Turizm Hizmeti",
    sectionSubtitle:
      "Lüks konaklamalardan VIP araçlara, vizeden turlara kadar — Türkiye'de mükemmel bir gezi için ihtiyacınız olan her şey tek çatı altında.",
    bookNow: "Hemen Rezerve Et",
    ctaTitle: "Hangi hizmetin size uygun olduğundan emin değil misiniz?",
    ctaSubtitle:
      "WhatsApp üzerinden bizimle iletişime geçin, ihtiyaçlarınıza uygun hizmeti dakikalar içinde seçmenize yardımcı olalım.",
    ctaButton: "WhatsApp ile Sorun",
    chooseService: "Hizmetinizi seçin",
    whatsappMessage: "Merhaba CASANOSTRA, hangi hizmetin bana uygun olduğundan emin değilim. Seçim yapmama yardımcı olur musunuz?",
  },
  fr: {
    title: "Réservation Rapide",
    badge: "Services — Choisissez votre service",
    subtitle:
      "Choisissez rapidement le service que vous souhaitez parmi nos 11 services intégrés. Chaque service a sa propre page avec un formulaire de réservation qui envoie vos données directement via WhatsApp.",
    sectionTitle: "11 Services Touristiques Intégrés",
    sectionSubtitle:
      "Des séjours de luxe aux voitures VIP, visa et excursions — tout ce dont vous avez besoin pour un voyage parfait en Turquie sous un même toit.",
    bookNow: "Réserver Maintenant",
    ctaTitle: "Vous ne savez pas quel service vous convient ?",
    ctaSubtitle:
      "Contactez-nous via WhatsApp et nous vous aiderons à choisir le bon service pour vos besoins en quelques minutes.",
    ctaButton: "Demandez-nous via WhatsApp",
    chooseService: "Choisissez votre service",
    whatsappMessage: "Bonjour CASANOSTRA, je ne sais pas quel service me convient. Pouvez-vous m'aider à choisir ?",
  },
  ru: {
    title: "Быстрое бронирование",
    badge: "Услуги — Выберите услугу",
    subtitle:
      "Быстро выберите нужную услугу из наших 11 интегрированных услуг. Каждая услуга имеет свою страницу с формой бронирования, которая отправляет ваши данные напрямую через WhatsApp.",
    sectionTitle: "11 интегрированных туристических услуг",
    sectionSubtitle:
      "От роскошных проживаний до VIP-автомобилей, виз и туров — всё, что нужно для идеальной поездки в Турцию под одной крышей.",
    bookNow: "Забронировать",
    ctaTitle: "Не знаете, какая услуга вам подходит?",
    ctaSubtitle:
      "Свяжитесь с нами через WhatsApp, и мы поможем выбрать подходящую услугу для ваших нужд в течение нескольких минут.",
    ctaButton: "Спросите нас через WhatsApp",
    chooseService: "Выберите услугу",
    whatsappMessage: "Здравствуйте, CASANOSTRA! Я не знаю, какая услуга мне подходит. Помогите, пожалуйста, с выбором.",
  },
};

export const servicesPageMessages: PageMessages = {
  ar: {
    metadataTitle: "خدماتنا | CASANOSTRA",
    metadataDescription: "وكالة CASANOSTRA السياحية — 11 خدمة متكاملة في تركيا.",
    home: "الرئيسية", title: "الخدمات", badge: "11 خدمة متكاملة",
    detailMetadataTitle: "{service} | CASANOSTRA", detailMetadataDescription: "تعرّف على خدمة {service} واحجزها مع CASANOSTRA في تركيا.",
    durationLabel: "المدة: {duration}", bookNow: "احجز الآن", aboutService: "عن الخدمة", featuresTitle: "مميزات الخدمة",
    included: "المشمولات", excluded: "غير المشمولات", gallery: "معرض الصور", whyBookTitle: "لماذا تحجز معنا؟",
    detailQuickReply: "رد سريع خلال دقائق", bestPrices: "أسعار مناسبة", ongoingSupport: "دعم متواصل طوال رحلتك", arabicTeam: "فريق يتحدث العربية",
    previousService: "الخدمة السابقة", nextService: "الخدمة التالية", viewAllServices: "عرض جميع الخدمات",
    heroTitle: "خدمات CASANOSTRA",
    intro: "وكالة CASANOSTRA السياحية — خدمات فاخرة وسيارات VIP وبرامج سياحية متنوعة. نقدّم لكم تجربة سياحية متكاملة في إسطنبول وتركيا، من لحظة الوصول حتى المغادرة.",
    highlightTitle: "استشارتنا مجانية — أخبرنا عن خطتك ونتكفل بالباقي",
    highlightSubtitle: "أكثر من 500 عميل سعيد سنوياً — رضاك هو شعارنا",
    detailsButton: "تفاصيل واحجز الآن",
    ctaTitle: "غير متأكد مما يناسبك؟",
    ctaSubtitle: "أخبرنا عن خطتك ونتكفل بالباقي — استشارتنا مجانية والرد خلال دقائق. فريقنا جاهز لمساعدتك في اختيار الخدمة المناسبة.",
    ctaButton: "تواصل معنا الآن", quickReply: "رد فوري خلال دقائق على واتساب",
    whatsappMessage: "مرحباً CASANOSTRA، أخبركم بخطتي السياحية وأرغب باستشارة مجانية.",
    serviceCards: {
      "reservations-turkey": { title: "الإقامات في تركيا", description: "إقامات قانونية بإدارة كاملة", duration: "حسب الطلب", price: "ابتداءً من 60$ / ليلة" },
      visa: { title: "الفيزا", description: "نرافقك في إجراءات التأشيرة خطوة بخطوة", duration: "3 - 10 أيام عمل", price: "ابتداءً من 50$" },
      "vip-cars": { title: "السيارات VIP", description: "توصيلة أو خدمة يومية وأسبوعية بسيارات فاخرة مع سائق", duration: "حسب الطلب (بالساعة أو اليوم)", price: "ابتداءً من 80$ / ساعة", transfer: "توصيلة", daily: "يومي", weekly: "أسبوعي" },
      hotels: { title: "حجز الفنادق", description: "فنادق مميزة وخيارات إقامة متنوعة", duration: "حسب الفترة المطلوبة", price: "ابتداءً من 70$ / ليلة" },
      flights: { title: "حجز الطيران", description: "تذاكر ذهاب وإياب لوجهات متعددة", duration: "حسب الرحلة", price: "حسب الوجهة والموسم" },
      "daily-tours": { title: "الرحلات اليومية داخل إسطنبول", description: "جولات يومية لأبرز معالم إسطنبول", duration: "6 - 10 ساعات / يوم", price: "ابتداءً من 45$ / شخص" },
      "private-tours": { title: "الرحلات الخاصة في تركيا", description: "برامج خاصة مصممة حسب رغبتك في تركيا", duration: "3 - 14 يوم (حسب البرنامج)", price: "ابتداءً من 350$ / يوم" },
      "group-tours": { title: "الرحلات الجماعية", description: "رحلات منظمة للعائلات والمجموعات", duration: "3 - 10 أيام", price: "ابتداءً من 250$ / شخص" },
      "hajj-umrah": { title: "الحج والعمرة", description: "برامج منظمة للحج والعمرة", duration: "7 - 15 يوم", price: "حسب الباقة والموسم" },
      "medical-tourism": { title: "السياحة العلاجية", description: "تنسيق الإقامة والعلاج في تركيا", duration: "3 - 14 يوم (حسب العلاج)", price: "حسب نوع العلاج" },
      "other-services": { title: "خدمات أخرى", description: "خدمات إضافية حسب احتياجاتك في تركيا", duration: "حسب الخدمة", price: "حسب الطلب" },
    },
  },
  en: {
    metadataTitle: "Our Services | CASANOSTRA",
    metadataDescription: "CASANOSTRA tourism agency — 11 integrated services in Turkey.",
    home: "Home", title: "Services", badge: "11 Integrated Services",
    detailMetadataTitle: "{service} | CASANOSTRA", detailMetadataDescription: "Explore and book {service} in Turkey with CASANOSTRA.",
    durationLabel: "Duration: {duration}", bookNow: "Book Now", aboutService: "About This Service", featuresTitle: "Service Features",
    included: "Included", excluded: "Not Included", gallery: "Photo Gallery", whyBookTitle: "Why Book with Us?",
    detailQuickReply: "Fast response within minutes", bestPrices: "Competitive prices", ongoingSupport: "Ongoing support throughout your trip", arabicTeam: "Arabic-speaking team",
    previousService: "Previous Service", nextService: "Next Service", viewAllServices: "View All Services",
    heroTitle: "CASANOSTRA Services",
    intro: "CASANOSTRA Tourism Agency offers premium services, VIP cars, and varied tour programs. We provide an integrated travel experience in Istanbul and Turkey, from arrival through departure.",
    highlightTitle: "Free consultation — tell us your plans and we will take care of the rest",
    highlightSubtitle: "More than 500 happy clients each year — your satisfaction is our motto",
    detailsButton: "View Details and Book",
    ctaTitle: "Not sure what suits you?",
    ctaSubtitle: "Tell us your plans and we will take care of the rest. Consultation is free, with a reply in minutes. Our team will help you choose the right service.",
    ctaButton: "Contact Us Now", quickReply: "WhatsApp replies in minutes",
    whatsappMessage: "Hello CASANOSTRA, I would like to discuss my travel plans and get a free consultation.",
    serviceCards: {
      "reservations-turkey": { title: "Stays in Turkey", description: "Managed short- and long-term stays", duration: "As requested", price: "From $60 / night" },
      visa: { title: "Visas", description: "Step-by-step visa application assistance", duration: "3 - 10 working days", price: "From $50" },
      "vip-cars": { title: "VIP Cars", description: "Point-to-point, daily, and weekly luxury car service with a driver", duration: "As requested (hourly or daily)", price: "From $80 / hour", transfer: "Transfer", daily: "Daily", weekly: "Weekly" },
      hotels: { title: "Hotel Bookings", description: "Quality hotels and a range of accommodation options", duration: "As required", price: "From $70 / night" },
      flights: { title: "Flight Bookings", description: "One-way and return tickets to many destinations", duration: "Depends on itinerary", price: "Depends on destination and season" },
      "daily-tours": { title: "Daily Istanbul Tours", description: "Daily tours of Istanbul's key attractions", duration: "6 - 10 hours / day", price: "From $45 / person" },
      "private-tours": { title: "Private Tours in Turkey", description: "Private programs tailored to your preferences in Turkey", duration: "3 - 14 days (depending on program)", price: "From $350 / day" },
      "group-tours": { title: "Group Tours", description: "Organized trips for families and groups", duration: "3 - 10 days", price: "From $250 / person" },
      "hajj-umrah": { title: "Hajj and Umrah", description: "Organized Hajj and Umrah programs", duration: "7 - 15 days", price: "Depends on package and season" },
      "medical-tourism": { title: "Medical Tourism", description: "Coordinating treatment and stays in Turkey", duration: "3 - 14 days (depending on treatment)", price: "Depends on treatment" },
      "other-services": { title: "Other Services", description: "Additional services to suit your needs in Turkey", duration: "Depends on service", price: "As requested" },
    },
  },
  tr: {
    metadataTitle: "Hizmetlerimiz | CASANOSTRA",
    metadataDescription: "CASANOSTRA Turizm Ajansı — Türkiye'de 11 kapsamlı hizmet.",
    home: "Ana Sayfa", title: "Hizmetler", badge: "11 Kapsamlı Hizmet",
    detailMetadataTitle: "{service} | CASANOSTRA", detailMetadataDescription: "CASANOSTRA ile Türkiye'de {service} hizmetini keşfedin ve rezervasyon yapın.",
    durationLabel: "Süre: {duration}", bookNow: "Rezervasyon Yap", aboutService: "Hizmet Hakkında", featuresTitle: "Hizmet Özellikleri",
    included: "Dahil Olanlar", excluded: "Dahil Olmayanlar", gallery: "Fotoğraf Galerisi", whyBookTitle: "Neden Bizimle Rezervasyon Yapmalısınız?",
    detailQuickReply: "Dakikalar içinde hızlı yanıt", bestPrices: "Rekabetçi fiyatlar", ongoingSupport: "Geziniz boyunca kesintisiz destek", arabicTeam: "Arapça konuşan ekip",
    previousService: "Önceki Hizmet", nextService: "Sonraki Hizmet", viewAllServices: "Tüm Hizmetleri Gör",
    heroTitle: "CASANOSTRA Hizmetleri",
    intro: "CASANOSTRA Turizm Ajansı; premium hizmetler, VIP araçlar ve çeşitli tur programları sunar. İstanbul ve Türkiye'de varıştan ayrılışa kadar kapsamlı bir seyahat deneyimi sağlıyoruz.",
    highlightTitle: "Ücretsiz danışmanlık — planınızı anlatın, gerisini bize bırakın",
    highlightSubtitle: "Her yıl 500'den fazla mutlu müşteri — sloganımız memnuniyetiniz",
    detailsButton: "Detayları Gör ve Rezervasyon Yap",
    ctaTitle: "Size neyin uygun olduğundan emin değil misiniz?",
    ctaSubtitle: "Planınızı anlatın, gerisini bize bırakın. Danışmanlık ücretsizdir ve dakikalar içinde yanıt veririz. Ekibimiz doğru hizmeti seçmenize yardımcı olur.",
    ctaButton: "Şimdi Bize Ulaşın", quickReply: "WhatsApp üzerinden dakikalar içinde yanıt",
    whatsappMessage: "Merhaba CASANOSTRA, seyahat planımı görüşmek ve ücretsiz danışmanlık almak istiyorum.",
    serviceCards: {
      "reservations-turkey": { title: "Türkiye'de Konaklama", description: "Yönetilen kısa ve uzun süreli konaklamalar", duration: "Talebe göre", price: "Gecelik 60$'dan başlayan fiyatlarla" },
      visa: { title: "Vize", description: "Vize başvurusunda adım adım destek", duration: "3 - 10 iş günü", price: "50$'dan başlayan fiyatlarla" },
      "vip-cars": { title: "VIP Araçlar", description: "Şoförlü lüks araçla transfer, günlük ve haftalık hizmet", duration: "Talebe göre (saatlik veya günlük)", price: "Saatlik 80$'dan başlayan fiyatlarla", transfer: "Transfer", daily: "Günlük", weekly: "Haftalık" },
      hotels: { title: "Otel Rezervasyonu", description: "Kaliteli oteller ve çeşitli konaklama seçenekleri", duration: "İstenen döneme göre", price: "Gecelik 70$'dan başlayan fiyatlarla" },
      flights: { title: "Uçak Bileti", description: "Birçok destinasyona gidiş ve dönüş biletleri", duration: "Uçuşa göre", price: "Varış noktası ve sezona göre" },
      "daily-tours": { title: "İstanbul Günlük Turları", description: "İstanbul'un önemli turistik yerlerine günlük turlar", duration: "Günde 6 - 10 saat", price: "Kişi başı 45$'dan başlayan fiyatlarla" },
      "private-tours": { title: "Türkiye Özel Turları", description: "Türkiye'de tercihlerinize göre özel programlar", duration: "3 - 14 gün (programa göre)", price: "Günlük 350$'dan başlayan fiyatlarla" },
      "group-tours": { title: "Grup Turları", description: "Aileler ve gruplar için organize geziler", duration: "3 - 10 gün", price: "Kişi başı 250$'dan başlayan fiyatlarla" },
      "hajj-umrah": { title: "Hac ve Umre", description: "Organize Hac ve Umre programları", duration: "7 - 15 gün", price: "Pakete ve sezona göre" },
      "medical-tourism": { title: "Sağlık Turizmi", description: "Türkiye'de tedavi ve konaklama koordinasyonu", duration: "3 - 14 gün (tedaviye göre)", price: "Tedavi türüne göre" },
      "other-services": { title: "Diğer Hizmetler", description: "Türkiye'deki ihtiyaçlarınıza yönelik ek hizmetler", duration: "Hizmete göre", price: "Talebe göre" },
    },
  },
  fr: {
    metadataTitle: "Nos Services | CASANOSTRA",
    metadataDescription: "Agence de tourisme CASANOSTRA — 11 services intégrés en Turquie.",
    home: "Accueil", title: "Services", badge: "11 Services Intégrés",
    detailMetadataTitle: "{service} | CASANOSTRA", detailMetadataDescription: "Découvrez et réservez {service} en Turquie avec CASANOSTRA.",
    durationLabel: "Durée : {duration}", bookNow: "Réserver", aboutService: "À Propos du Service", featuresTitle: "Atouts du Service",
    included: "Inclus", excluded: "Non Inclus", gallery: "Galerie Photos", whyBookTitle: "Pourquoi Réserver avec Nous ?",
    detailQuickReply: "Réponse rapide en quelques minutes", bestPrices: "Prix compétitifs", ongoingSupport: "Assistance pendant tout votre voyage", arabicTeam: "Équipe arabophone",
    previousService: "Service Précédent", nextService: "Service Suivant", viewAllServices: "Voir Tous les Services",
    heroTitle: "Services CASANOSTRA",
    intro: "L'agence CASANOSTRA propose des services haut de gamme, des voitures VIP et divers programmes touristiques. Nous offrons une expérience complète à Istanbul et en Turquie, de l'arrivée au départ.",
    highlightTitle: "Consultation gratuite — parlez-nous de votre projet, nous nous occupons du reste",
    highlightSubtitle: "Plus de 500 clients satisfaits chaque année — votre satisfaction est notre devise",
    detailsButton: "Voir les Détails et Réserver",
    ctaTitle: "Vous ne savez pas ce qui vous convient ?",
    ctaSubtitle: "Parlez-nous de votre projet et nous nous occupons du reste. La consultation est gratuite et nous répondons en quelques minutes. Notre équipe vous aide à choisir le service adapté.",
    ctaButton: "Contactez-nous", quickReply: "Réponse WhatsApp en quelques minutes",
    whatsappMessage: "Bonjour CASANOSTRA, je souhaite parler de mon projet de voyage et obtenir une consultation gratuite.",
    serviceCards: {
      "reservations-turkey": { title: "Séjours en Turquie", description: "Séjours courts et longs avec gestion complète", duration: "Selon la demande", price: "À partir de 60$ / nuit" },
      visa: { title: "Visa", description: "Accompagnement étape par étape pour votre visa", duration: "3 - 10 jours ouvrés", price: "À partir de 50$" },
      "vip-cars": { title: "Voitures VIP", description: "Transferts et services quotidiens ou hebdomadaires avec chauffeur", duration: "Selon la demande (à l'heure ou à la journée)", price: "À partir de 80$ / heure", transfer: "Transfert", daily: "À la journée", weekly: "À la semaine" },
      hotels: { title: "Réservation d'Hôtels", description: "Hôtels de qualité et diverses options d'hébergement", duration: "Selon la période souhaitée", price: "À partir de 70$ / nuit" },
      flights: { title: "Réservation de Vols", description: "Billets aller et retour vers de nombreuses destinations", duration: "Selon le vol", price: "Selon la destination et la saison" },
      "daily-tours": { title: "Excursions Quotidiennes à Istanbul", description: "Visites quotidiennes des principaux sites d'Istanbul", duration: "6 - 10 heures / jour", price: "À partir de 45$ / personne" },
      "private-tours": { title: "Excursions Privées en Turquie", description: "Programmes privés adaptés à vos envies en Turquie", duration: "3 - 14 jours (selon le programme)", price: "À partir de 350$ / jour" },
      "group-tours": { title: "Voyages en Groupe", description: "Voyages organisés pour les familles et les groupes", duration: "3 - 10 jours", price: "À partir de 250$ / personne" },
      "hajj-umrah": { title: "Hajj et Omra", description: "Programmes organisés pour le Hajj et la Omra", duration: "7 - 15 jours", price: "Selon le forfait et la saison" },
      "medical-tourism": { title: "Tourisme Médical", description: "Coordination des soins et du séjour en Turquie", duration: "3 - 14 jours (selon le traitement)", price: "Selon le type de traitement" },
      "other-services": { title: "Autres Services", description: "Services supplémentaires selon vos besoins en Turquie", duration: "Selon le service", price: "Selon la demande" },
    },
  },
  ru: {
    metadataTitle: "Наши услуги | CASANOSTRA",
    metadataDescription: "Туристическое агентство CASANOSTRA — 11 комплексных услуг в Турции.",
    home: "Главная", title: "Услуги", badge: "11 комплексных услуг",
    detailMetadataTitle: "{service} | CASANOSTRA", detailMetadataDescription: "Узнайте об услуге «{service}» и забронируйте её в Турции с CASANOSTRA.",
    durationLabel: "Продолжительность: {duration}", bookNow: "Забронировать", aboutService: "Об услуге", featuresTitle: "Особенности услуги",
    included: "Включено", excluded: "Не включено", gallery: "Фотогалерея", whyBookTitle: "Почему бронируют у нас?",
    detailQuickReply: "Быстрый ответ в течение нескольких минут", bestPrices: "Конкурентные цены", ongoingSupport: "Поддержка на протяжении всей поездки", arabicTeam: "Арабоязычная команда",
    previousService: "Предыдущая услуга", nextService: "Следующая услуга", viewAllServices: "Все услуги",
    heroTitle: "Услуги CASANOSTRA",
    intro: "Туристическое агентство CASANOSTRA предлагает премиальные услуги, VIP-автомобили и разнообразные туристические программы. Мы организуем поездку по Стамбулу и Турции от прибытия до отъезда.",
    highlightTitle: "Бесплатная консультация — расскажите о планах, остальное мы организуем",
    highlightSubtitle: "Более 500 довольных клиентов ежегодно — ваше удовлетворение наш приоритет",
    detailsButton: "Подробнее и забронировать",
    ctaTitle: "Не уверены, что вам подходит?",
    ctaSubtitle: "Расскажите о планах, а остальное мы организуем. Консультация бесплатна, ответим в течение нескольких минут. Команда поможет выбрать подходящую услугу.",
    ctaButton: "Связаться с нами", quickReply: "Ответ в WhatsApp в течение нескольких минут",
    whatsappMessage: "Здравствуйте, CASANOSTRA! Хочу обсудить планы поездки и получить бесплатную консультацию.",
    serviceCards: {
      "reservations-turkey": { title: "Проживание в Турции", description: "Организация краткосрочного и долгосрочного проживания", duration: "По запросу", price: "От 60$ / ночь" },
      visa: { title: "Визы", description: "Помощь с оформлением визы на каждом этапе", duration: "3 - 10 рабочих дней", price: "От 50$" },
      "vip-cars": { title: "VIP-автомобили", description: "Трансфер и аренда автомобиля с водителем на день или неделю", duration: "По запросу (почасово или на день)", price: "От 80$ / час", transfer: "Трансфер", daily: "На день", weekly: "На неделю" },
      hotels: { title: "Бронирование отелей", description: "Отели высокого уровня и различные варианты проживания", duration: "На нужный период", price: "От 70$ / ночь" },
      flights: { title: "Авиабилеты", description: "Билеты в одну сторону и туда-обратно по разным направлениям", duration: "Зависит от рейса", price: "Зависит от направления и сезона" },
      "daily-tours": { title: "Ежедневные экскурсии по Стамбулу", description: "Ежедневные экскурсии по главным достопримечательностям Стамбула", duration: "6 - 10 часов / день", price: "От 45$ / человек" },
      "private-tours": { title: "Частные туры по Турции", description: "Индивидуальные программы по вашим предпочтениям", duration: "3 - 14 дней (по программе)", price: "От 350$ / день" },
      "group-tours": { title: "Групповые туры", description: "Организованные поездки для семей и групп", duration: "3 - 10 дней", price: "От 250$ / человек" },
      "hajj-umrah": { title: "Хадж и Умра", description: "Организованные программы для Хаджа и Умры", duration: "7 - 15 дней", price: "Зависит от пакета и сезона" },
      "medical-tourism": { title: "Медицинский туризм", description: "Организация лечения и проживания в Турции", duration: "3 - 14 дней (в зависимости от лечения)", price: "Зависит от вида лечения" },
      "other-services": { title: "Другие услуги", description: "Дополнительные услуги с учётом ваших потребностей в Турции", duration: "Зависит от услуги", price: "По запросу" },
    },
  },
};

export const offersPageMessages: PageMessages = {
  ar: {
    metadataTitle: "العروض الخاصة | CASANOSTRA", metadataDescription: "اكتشف عروض CASANOSTRA السياحية في تركيا.",
    home: "الرئيسية", title: "عروض CASANOSTRA المميّزة", activeBadge: "عرض نشط — شهري",
    intro: "عروض حصرية على خدماتنا بخصومات تختلف حسب الجنسية والفئة. تتجدد العروض شهرياً.",
    activeOffers: "عرض نشط", highestDiscount: "أعلى خصم", includedServices: "خدمة مشمولة",
    discount: "خصم", validUntil: "ساري حتى: {date}", requestOffer: "اطلب العرض عبر واتساب",
    endOfMonth: "نهاية الشهر",
    servicePage: "صفحة الخدمة", followTitle: "العروض تتغيّر شهرياً",
    allOffers: "عرض جميع العروض ({count})",
    followSubtitle: "تابعنا للبقاء على اطلاع بآخر العروض الشهرية على كل خدمة.",
    followButton: "تابع آخر العروض عبر واتساب",
    whatsappMessage: "مرحباً CASANOSTRA، أرغب بالاستفادة من عرض: \"{title}\" ({target}). أرجو إرسال التفاصيل.",
    offers: {
      "stays-morocco": { badge: "عرض خاص", title: "خصم على الإقامات في تركيا", target: "للجنسية المغربية", description: "خصم 25% على باقات الإقامة في تركيا للمواطنين المغاربة." },
      "internal-tours-europe": { badge: "عرض خاص", title: "خصم على الرحلات الداخلية", target: "للمقيمين بأوروبا", description: "خصم 25% على الرحلات والجولات الداخلية في تركيا للمقيمين في أوروبا." },
      "vip-cars-monthly": { badge: "عرض شهري", title: "خصم على السيارات VIP", target: "للجميع", description: "خصم 15% على استئجار سيارة فاخرة مع سائق لمدة أسبوع أو أكثر." },
      "hotels-gulf": { badge: "عرض خاص", title: "خصم على حجز الفنادق", target: "للجنسيات الخليجية", description: "خصم 20% على حجز فنادق 4 و5 نجوم في تركيا للجنسيات الخليجية." },
      "flights-early": { badge: "عرض شهري", title: "خصم على حجز الطيران", target: "للجميع", description: "خصم 10% على تذاكر الطيران عند الحجز قبل موعد السفر بـ30 يوماً." },
      "daily-tours-arab": { badge: "عرض خاص", title: "خصم على الرحلات اليومية", target: "للجنسيات العربية", description: "خصم 15% على الجولات اليومية في إسطنبول للجنسيات العربية." },
      "private-tours-family": { badge: "عرض عائلي", title: "خصم على الرحلات الخاصة", target: "للعائلات", description: "خصم 20% على الرحلات الخاصة للعائلات المكوّنة من شخصين أو أكثر." },
      "group-tours-discount": { badge: "عرض جماعي", title: "خصم على الرحلات الجماعية", target: "للمجموعات من 10 أشخاص فأكثر", description: "خصم 25% على الرحلات الجماعية للمجموعات من 10 أشخاص أو أكثر." },
      "hajj-umrah-early": { badge: "عرض خاص", title: "خصم على الحج والعمرة", target: "للجميع", description: "خصم 15% على باقات الحج والعمرة عند الحجز المبكر." },
      "medical-tourism-all": { badge: "عرض شهري", title: "خصم على السياحة العلاجية", target: "للجميع", description: "خصم 10% على باقات السياحة العلاجية في المستشفيات التركية." },
      "visa-fast": { badge: "عرض خاص", title: "خصم على الفيزا", target: "للجنسيات العربية", description: "خصم 15% على خدمة استخراج التأشيرة التركية للجنسيات العربية." },
    },
  },
  en: {
    metadataTitle: "Special Offers | CASANOSTRA", metadataDescription: "Explore CASANOSTRA travel offers in Turkey.",
    home: "Home", title: "CASANOSTRA Special Offers", activeBadge: "Active Monthly Offer",
    intro: "Exclusive discounts on our services, with eligibility varying by nationality and customer group. Offers are updated monthly.",
    activeOffers: "Active Offers", highestDiscount: "Highest Discount", includedServices: "Services Included",
    discount: "off", validUntil: "Valid until: {date}", requestOffer: "Request via WhatsApp",
    endOfMonth: "the end of the month",
    servicePage: "Service Page", followTitle: "Offers Change Monthly",
    allOffers: "View All Offers ({count})",
    followSubtitle: "Follow us to stay up to date with monthly offers across our services.",
    followButton: "Follow the Latest Offers on WhatsApp",
    whatsappMessage: "Hello CASANOSTRA, I would like details about the \"{title}\" offer ({target}).",
    offers: {
      "stays-morocco": { badge: "Special Offer", title: "Discount on Stays in Turkey", target: "Moroccan nationals", description: "25% off accommodation packages in Turkey for Moroccan nationals." },
      "internal-tours-europe": { badge: "Special Offer", title: "Discount on Domestic Tours", target: "European residents", description: "25% off domestic trips and tours in Turkey for European residents." },
      "vip-cars-monthly": { badge: "Monthly Offer", title: "Discount on VIP Cars", target: "Everyone", description: "15% off luxury car hire with a driver for one week or longer." },
      "hotels-gulf": { badge: "Special Offer", title: "Discount on Hotel Bookings", target: "Gulf nationals", description: "20% off four- and five-star hotel bookings in Turkey for Gulf nationals." },
      "flights-early": { badge: "Monthly Offer", title: "Discount on Flights", target: "Everyone", description: "10% off flight tickets booked at least 30 days before travel." },
      "daily-tours-arab": { badge: "Special Offer", title: "Discount on Daily Tours", target: "Arab nationals", description: "15% off daily tours in Istanbul for Arab nationals." },
      "private-tours-family": { badge: "Family Offer", title: "Discount on Private Tours", target: "Families", description: "20% off private tours for families of two or more." },
      "group-tours-discount": { badge: "Group Offer", title: "Discount on Group Tours", target: "Groups of 10 or more", description: "25% off group tours for parties of 10 or more." },
      "hajj-umrah-early": { badge: "Special Offer", title: "Discount on Hajj and Umrah", target: "Everyone", description: "15% off Hajj and Umrah packages when booked in advance." },
      "medical-tourism-all": { badge: "Monthly Offer", title: "Discount on Medical Tourism", target: "Everyone", description: "10% off medical tourism packages at Turkish hospitals." },
      "visa-fast": { badge: "Special Offer", title: "Discount on Visas", target: "Arab nationals", description: "15% off Turkish visa assistance for Arab nationals." },
    },
  },
  tr: {
    metadataTitle: "Özel Fırsatlar | CASANOSTRA", metadataDescription: "CASANOSTRA'nın Türkiye seyahat fırsatlarını keşfedin.",
    home: "Ana Sayfa", title: "CASANOSTRA Özel Fırsatları", activeBadge: "Aylık Aktif Fırsat",
    intro: "Uyruk ve müşteri grubuna göre değişen özel hizmet indirimleri. Fırsatlar her ay güncellenir.",
    activeOffers: "Aktif Fırsatlar", highestDiscount: "En Yüksek İndirim", includedServices: "Dahil Hizmetler",
    discount: "indirim", validUntil: "Son geçerlilik: {date}", requestOffer: "WhatsApp'tan Talep Edin",
    endOfMonth: "ayın sonu",
    servicePage: "Hizmet Sayfası", followTitle: "Fırsatlar Her Ay Değişir",
    allOffers: "Tüm Fırsatları Gör ({count})",
    followSubtitle: "Hizmetlerimizin aylık fırsatlarından haberdar olmak için bizi takip edin.",
    followButton: "En Yeni Fırsatları WhatsApp'tan Takip Edin",
    whatsappMessage: "Merhaba CASANOSTRA, \"{title}\" fırsatı ({target}) hakkında detay almak istiyorum.",
    offers: {
      "stays-morocco": { badge: "Özel Fırsat", title: "Türkiye Konaklamalarında İndirim", target: "Fas vatandaşlarına", description: "Fas vatandaşlarına Türkiye'deki konaklama paketlerinde %25 indirim." },
      "internal-tours-europe": { badge: "Özel Fırsat", title: "Yurt İçi Turlarda İndirim", target: "Avrupa'da ikamet edenlere", description: "Avrupa'da ikamet edenlere Türkiye içi gezi ve turlarda %25 indirim." },
      "vip-cars-monthly": { badge: "Aylık Fırsat", title: "VIP Araçlarda İndirim", target: "Herkese", description: "Bir hafta veya daha uzun süreli şoförlü lüks araç kiralamada %15 indirim." },
      "hotels-gulf": { badge: "Özel Fırsat", title: "Otel Rezervasyonunda İndirim", target: "Körfez ülkeleri vatandaşlarına", description: "Körfez ülkeleri vatandaşlarına Türkiye'deki 4 ve 5 yıldızlı otellerde %20 indirim." },
      "flights-early": { badge: "Aylık Fırsat", title: "Uçak Biletlerinde İndirim", target: "Herkese", description: "Uçuştan en az 30 gün önce alınan uçak biletlerinde %10 indirim." },
      "daily-tours-arab": { badge: "Özel Fırsat", title: "Günlük Turlarda İndirim", target: "Arap vatandaşlarına", description: "Arap vatandaşlarına İstanbul günlük turlarında %15 indirim." },
      "private-tours-family": { badge: "Aile Fırsatı", title: "Özel Turlarda İndirim", target: "Ailelere", description: "İki veya daha fazla kişilik ailelere özel turlarda %20 indirim." },
      "group-tours-discount": { badge: "Grup Fırsatı", title: "Grup Turlarında İndirim", target: "10 veya daha fazla kişilik gruplara", description: "10 veya daha fazla kişilik gruplara grup turlarında %25 indirim." },
      "hajj-umrah-early": { badge: "Özel Fırsat", title: "Hac ve Umre İndirimi", target: "Herkese", description: "Erken rezervasyonda Hac ve Umre paketlerinde %15 indirim." },
      "medical-tourism-all": { badge: "Aylık Fırsat", title: "Sağlık Turizminde İndirim", target: "Herkese", description: "Türkiye hastanelerindeki sağlık turizmi paketlerinde %10 indirim." },
      "visa-fast": { badge: "Özel Fırsat", title: "Vize Hizmetinde İndirim", target: "Arap vatandaşlarına", description: "Arap vatandaşlarına Türkiye vizesi hizmetinde %15 indirim." },
    },
  },
  fr: {
    metadataTitle: "Offres Spéciales | CASANOSTRA", metadataDescription: "Découvrez les offres de voyage CASANOSTRA en Turquie.",
    home: "Accueil", title: "Offres Spéciales CASANOSTRA", activeBadge: "Offre Mensuelle Active",
    intro: "Des réductions exclusives sur nos services, selon la nationalité et le profil du client. Les offres sont renouvelées chaque mois.",
    activeOffers: "Offres Actives", highestDiscount: "Réduction Maximale", includedServices: "Services Inclus",
    discount: "de réduction", validUntil: "Valable jusqu'au : {date}", requestOffer: "Demander via WhatsApp",
    endOfMonth: "la fin du mois",
    servicePage: "Page du Service", followTitle: "Les Offres Changent Chaque Mois",
    allOffers: "Voir Toutes les Offres ({count})",
    followSubtitle: "Suivez-nous pour découvrir les offres mensuelles sur nos services.",
    followButton: "Suivre les Dernières Offres sur WhatsApp",
    whatsappMessage: "Bonjour CASANOSTRA, je souhaite recevoir les détails de l'offre « {title} » ({target}).",
    offers: {
      "stays-morocco": { badge: "Offre Spéciale", title: "Réduction sur les Séjours en Turquie", target: "Ressortissants marocains", description: "25 % de réduction sur les séjours en Turquie pour les ressortissants marocains." },
      "internal-tours-europe": { badge: "Offre Spéciale", title: "Réduction sur les Excursions Intérieures", target: "Résidents en Europe", description: "25 % de réduction sur les voyages et excursions en Turquie pour les résidents européens." },
      "vip-cars-monthly": { badge: "Offre Mensuelle", title: "Réduction sur les Voitures VIP", target: "Tout le monde", description: "15 % de réduction sur une voiture de luxe avec chauffeur pour une semaine ou plus." },
      "hotels-gulf": { badge: "Offre Spéciale", title: "Réduction sur les Hôtels", target: "Ressortissants du Golfe", description: "20 % de réduction sur les hôtels 4 et 5 étoiles en Turquie pour les ressortissants du Golfe." },
      "flights-early": { badge: "Offre Mensuelle", title: "Réduction sur les Vols", target: "Tout le monde", description: "10 % de réduction sur les billets réservés au moins 30 jours avant le départ." },
      "daily-tours-arab": { badge: "Offre Spéciale", title: "Réduction sur les Excursions Quotidiennes", target: "Ressortissants arabes", description: "15 % de réduction sur les excursions quotidiennes à Istanbul pour les ressortissants arabes." },
      "private-tours-family": { badge: "Offre Famille", title: "Réduction sur les Excursions Privées", target: "Familles", description: "20 % de réduction sur les excursions privées pour les familles de deux personnes ou plus." },
      "group-tours-discount": { badge: "Offre de Groupe", title: "Réduction sur les Voyages en Groupe", target: "Groupes de 10 personnes ou plus", description: "25 % de réduction sur les voyages en groupe à partir de 10 personnes." },
      "hajj-umrah-early": { badge: "Offre Spéciale", title: "Réduction sur le Hajj et la Omra", target: "Tout le monde", description: "15 % de réduction sur les forfaits Hajj et Omra en réservation anticipée." },
      "medical-tourism-all": { badge: "Offre Mensuelle", title: "Réduction sur le Tourisme Médical", target: "Tout le monde", description: "10 % de réduction sur les forfaits de tourisme médical dans les hôpitaux turcs." },
      "visa-fast": { badge: "Offre Spéciale", title: "Réduction sur les Visas", target: "Ressortissants arabes", description: "15 % de réduction sur l'assistance au visa turc pour les ressortissants arabes." },
    },
  },
  ru: {
    metadataTitle: "Специальные предложения | CASANOSTRA", metadataDescription: "Откройте для себя туристические предложения CASANOSTRA в Турции.",
    home: "Главная", title: "Специальные предложения CASANOSTRA", activeBadge: "Активное предложение месяца",
    intro: "Специальные скидки на наши услуги. Условия зависят от гражданства и категории клиента. Предложения обновляются ежемесячно.",
    activeOffers: "Активные предложения", highestDiscount: "Максимальная скидка", includedServices: "Услуги",
    discount: "скидка", validUntil: "Действует до: {date}", requestOffer: "Запросить в WhatsApp",
    endOfMonth: "конец месяца",
    servicePage: "Страница услуги", followTitle: "Предложения обновляются ежемесячно",
    allOffers: "Все предложения ({count})",
    followSubtitle: "Следите за ежемесячными предложениями на наши услуги.",
    followButton: "Узнавать о новых предложениях в WhatsApp",
    whatsappMessage: "Здравствуйте, CASANOSTRA! Пришлите, пожалуйста, подробности предложения «{title}» ({target}).",
    offers: {
      "stays-morocco": { badge: "Специальное предложение", title: "Скидка на проживание в Турции", target: "Гражданам Марокко", description: "Скидка 25% на проживание в Турции для граждан Марокко." },
      "internal-tours-europe": { badge: "Специальное предложение", title: "Скидка на внутренние экскурсии", target: "Жителям Европы", description: "Скидка 25% на поездки и экскурсии по Турции для жителей Европы." },
      "vip-cars-monthly": { badge: "Предложение месяца", title: "Скидка на VIP-автомобили", target: "Для всех", description: "Скидка 15% на аренду премиального автомобиля с водителем на неделю и дольше." },
      "hotels-gulf": { badge: "Специальное предложение", title: "Скидка на бронирование отелей", target: "Гражданам стран Персидского залива", description: "Скидка 20% на отели 4 и 5 звёзд в Турции для граждан стран Персидского залива." },
      "flights-early": { badge: "Предложение месяца", title: "Скидка на авиабилеты", target: "Для всех", description: "Скидка 10% на авиабилеты при бронировании за 30 дней до поездки." },
      "daily-tours-arab": { badge: "Специальное предложение", title: "Скидка на ежедневные экскурсии", target: "Гражданам арабских стран", description: "Скидка 15% на ежедневные экскурсии по Стамбулу для граждан арабских стран." },
      "private-tours-family": { badge: "Семейное предложение", title: "Скидка на частные туры", target: "Семьям", description: "Скидка 20% на частные экскурсии для семей от двух человек." },
      "group-tours-discount": { badge: "Групповое предложение", title: "Скидка на групповые туры", target: "Группам от 10 человек", description: "Скидка 25% на групповые экскурсии для компаний от 10 человек." },
      "hajj-umrah-early": { badge: "Специальное предложение", title: "Скидка на Хадж и Умру", target: "Для всех", description: "Скидка 15% на пакеты Хадж и Умра при раннем бронировании." },
      "medical-tourism-all": { badge: "Предложение месяца", title: "Скидка на медицинский туризм", target: "Для всех", description: "Скидка 10% на программы медицинского туризма в клиниках Турции." },
      "visa-fast": { badge: "Специальное предложение", title: "Скидка на визовые услуги", target: "Гражданам арабских стран", description: "Скидка 15% на оформление турецкой визы для граждан арабских стран." },
    },
  },
};

export const serviceFormsMessages: PageMessages = {
  ar: {
    formEyebrow: "نموذج الحجز السريع", heading: "احجز الآن — {service}",
    formDescription: "املأ النموذج التالي لإرسال طلبك مباشرةً عبر واتساب. سيتواصل معك فريقنا لتأكيد الحجز.",
    successTitle: "تم إرسال طلبك بنجاح", successText: "تم فتح واتساب برسالة جاهزة تحتوي بياناتك. أرسل الرسالة لتأكيد الطلب.",
    sending: "جاري الإرسال...", submit: "إرسال المعلومات إلى واتساب",
    privacy: "تُرسل بياناتك مباشرةً إلى واتساب CASANOSTRA ولا تُحفظ في قاعدة بيانات. نلتزم بحماية خصوصيتك.",
    addPerson: "إضافة شخص", removePerson: "حذف شخص", person: "الشخص {index}",
    remove: "حذف", choose: "— اختر —", enterValue: "أدخل {field}",
    requiredField: "{field} مطلوب", requiredPersonField: "{field} مطلوب للشخص {person}",
    fields: {
      guests: "عدد الأشخاص", applicants: "عدد المتقدمين", name: "الاسم الكامل", phone: "الهاتف (واتساب مع رمز الدولة)", age: "العمر", passport: "رقم جواز السفر", nationality: "الجنسية", entryDate: "تاريخ الدخول إلى تركيا", residenceCountry: "بلد الإقامة الحالي", visaCountry: "الدولة المطلوب استخراج تأشيرة لها", serviceType: "نوع الخدمة", passengerCount: "عدد الأشخاص", pickupLocation: "مكان الانطلاق", dropoffLocation: "مكان الوصول", departureDatetime: "اليوم والساعة", hasReturn: "هل توجد رحلة عودة؟", returnPickupLocation: "مكان انطلاق العودة", returnDropoffLocation: "مكان الوصول في العودة", returnDatetime: "موعد العودة", hotelLocation: "موقع الفندق المطلوب", stars: "تصنيف الفندق بالنجوم", checkIn: "تاريخ الدخول", checkOut: "تاريخ الخروج", passengers: "عدد المسافرين", fromAirport: "مطار المغادرة", toAirport: "مطار الوصول", departureDate: "تاريخ الذهاب", returnDate: "تاريخ الإياب", participants: "عدد المشاركين", tourType: "نوع الرحلة", tourDate: "تاريخ الرحلة", location: "الموقع", pilgrims: "عدد الحجاج أو المعتمرين", patients: "عدد المرضى", arrivalDate: "تاريخ الوصول إلى إسطنبول", interest: "نوع العلاج أو الاهتمام", serviceInterest: "الخدمة التي تبحث عنها",
    },
    options: {
      serviceType: ["توصيلة (من نقطة إلى نقطة)", "يومي (حتى 8 ساعات)", "أسبوعي (7 أيام)"],
      hasReturn: ["نعم", "لا"], stars: ["3 نجوم", "4 نجوم", "5 نجوم"],
      dailyTours: ["جولة السلطان أحمد (المسجد الأزرق + آيا صوفيا + قصر توبكابي)", "جولة البوسفور بالقارب (قلعة روملي حصار + القرى)", "جولة غراند بازار والأسواق التاريخية", "جولة تكسيم وساحة الاستقلال + برج غلطة", "جولة الجزر الأميرية بالعبّارة (بويوك أضا)"],
      privateTours: ["رحلة كابادوكيا والمناطيد (يومان كاملان)", "رحلة باموكالي والينابيع الحرارية البيضاء", "رحلة طرابزون وهضبة أيدر", "رحلة أنطاليا والشواطئ الفيروزية", "رحلة بودروم ويخوت بحر إيجة", "رحلة بورصة وشلالات أولوداغ", "رحلة إسطنبول الشاملة (3 أيام)"],
      groupTours: ["رحلة عائلية شاملة لإسطنبول (عائلات وأطفال)", "رحلة نسائية خاصة (للنساء فقط — مرشدة)", "رحلة رجالية خاصة (للرجال فقط)", "رحلة شبابية للمجموعات (18-35 سنة)", "رحلة شركات ووفود رسمية (VIP)", "رحلة مدرسية للطلاب (مرشد تعليمي)", "رحلة شهر العسل الجماعية (أزواج فقط)"],
      medicalInterest: ["زراعة الشعر", "تجميل الأسنان", "عمليات تجميلية (أنف، شفاه، تنحيف)", "علاج العيون (ليزك)", "أمراض القلب والشرايين", "جراحة العظام والمفاصل", "علاج الأورام", "فحوصات شاملة", "أخرى"],
    },
    whatsapp: { requestTitle: "CASANOSTRA — طلب جديد", service: "الخدمة", requestDetails: "تفاصيل الطلب", travelers: "عدد المسافرين ({count})", person: "الشخص {index}", intent: "أرغب بحجز هذه الخدمة. شكراً لكم.", notProvided: "غير محدد" },
  },
  en: {
    formEyebrow: "Quick Booking Form", heading: "Book Now — {service}",
    formDescription: "Complete this form to send your request directly via WhatsApp. Our team will contact you to confirm the booking.",
    successTitle: "Your request was sent successfully", successText: "WhatsApp opened with a message containing your details. Send it to confirm your request.",
    sending: "Sending...", submit: "Send Details via WhatsApp",
    privacy: "Your details are sent directly to CASANOSTRA on WhatsApp and are not stored in a database. We are committed to protecting your privacy.",
    addPerson: "Add Person", removePerson: "Remove Person", person: "Person {index}",
    remove: "Remove", choose: "— Select —", enterValue: "Enter {field}",
    requiredField: "{field} is required", requiredPersonField: "{field} is required for person {person}",
    fields: {
      guests: "Number of people", applicants: "Number of applicants", name: "Full name", phone: "Phone (WhatsApp with country code)", age: "Age", passport: "Passport number", nationality: "Nationality", entryDate: "Entry date in Turkey", residenceCountry: "Current country of residence", visaCountry: "Country for which a visa is requested", serviceType: "Service type", passengerCount: "Number of passengers", pickupLocation: "Pickup location", dropoffLocation: "Drop-off location", departureDatetime: "Date and time", hasReturn: "Is a return trip required?", returnPickupLocation: "Return pickup location", returnDropoffLocation: "Return destination", returnDatetime: "Return date and time", hotelLocation: "Preferred hotel location", stars: "Hotel star rating", checkIn: "Check-in date", checkOut: "Check-out date", passengers: "Number of travelers", fromAirport: "Departure airport", toAirport: "Arrival airport", departureDate: "Departure date", returnDate: "Return date", participants: "Number of participants", tourType: "Tour type", tourDate: "Tour date", location: "Location", pilgrims: "Number of pilgrims", patients: "Number of patients", arrivalDate: "Arrival date in Istanbul", interest: "Treatment or area of interest", serviceInterest: "Service you are looking for",
    },
    options: {
      serviceType: ["Point-to-point transfer", "Daily (up to 8 hours)", "Weekly (7 days)"], hasReturn: ["Yes", "No"], stars: ["3 stars", "4 stars", "5 stars"],
      dailyTours: ["Sultanahmet tour (Blue Mosque + Hagia Sophia + Topkapi Palace)", "Bosphorus boat tour (Rumeli Fortress + villages)", "Grand Bazaar and historic markets tour", "Taksim and Istiklal Street + Galata Tower", "Princes' Islands ferry tour (Buyukada)"],
      privateTours: ["Cappadocia and balloon trip (2 full days)", "Pamukkale and white thermal springs", "Trabzon and Ayder Plateau", "Antalya and turquoise beaches", "Bodrum and Aegean yachts", "Bursa and Uludag waterfalls", "Complete Istanbul tour (3 days)"],
      groupTours: ["Complete Istanbul family trip (families and children)", "Women's trip (women only — female guide)", "Men's trip (men only)", "Youth group trip (ages 18-35)", "Corporate and official delegation trip (VIP)", "Student school trip (educational guide)", "Group honeymoon trip (couples only)"],
      medicalInterest: ["Hair transplant", "Cosmetic dentistry", "Cosmetic surgery (nose, lips, body contouring)", "Eye treatment (LASIK)", "Heart and vascular conditions", "Orthopedic and joint surgery", "Cancer treatment", "Comprehensive check-up", "Other"],
    },
    whatsapp: { requestTitle: "CASANOSTRA — New Request", service: "Service", requestDetails: "Request Details", travelers: "Number of travelers ({count})", person: "Person {index}", intent: "I would like to book this service. Thank you.", notProvided: "Not provided" },
  },
  tr: {
    formEyebrow: "Hızlı Rezervasyon Formu", heading: "Şimdi Rezervasyon Yap — {service}",
    formDescription: "Talebinizi doğrudan WhatsApp üzerinden göndermek için formu doldurun. Ekibimiz rezervasyonu onaylamak için sizinle iletişime geçecektir.",
    successTitle: "Talebiniz başarıyla gönderildi", successText: "Bilgilerinizi içeren hazır mesaj WhatsApp'ta açıldı. Talebinizi onaylamak için mesajı gönderin.",
    sending: "Gönderiliyor...", submit: "Bilgileri WhatsApp ile Gönder",
    privacy: "Bilgileriniz doğrudan WhatsApp üzerinden CASANOSTRA'ya iletilir ve veritabanında saklanmaz. Gizliliğinizi korumayı taahhüt ediyoruz.",
    addPerson: "Kişi Ekle", removePerson: "Kişiyi Sil", person: "Kişi {index}", remove: "Sil", choose: "— Seçin —", enterValue: "{field} girin",
    requiredField: "{field} gereklidir", requiredPersonField: "{person}. kişi için {field} gereklidir",
    fields: {
      guests: "Kişi sayısı", applicants: "Başvuru sahibi sayısı", name: "Ad Soyad", phone: "Telefon (ülke kodlu WhatsApp)", age: "Yaş", passport: "Pasaport numarası", nationality: "Uyruk", entryDate: "Türkiye'ye giriş tarihi", residenceCountry: "Mevcut ikamet ülkesi", visaCountry: "Vize başvurusu yapılacak ülke", serviceType: "Hizmet türü", passengerCount: "Yolcu sayısı", pickupLocation: "Alış noktası", dropoffLocation: "Varış noktası", departureDatetime: "Tarih ve saat", hasReturn: "Dönüş yolculuğu var mı?", returnPickupLocation: "Dönüş alış noktası", returnDropoffLocation: "Dönüş varış noktası", returnDatetime: "Dönüş tarihi ve saati", hotelLocation: "İstenen otel konumu", stars: "Otel yıldız sayısı", checkIn: "Giriş tarihi", checkOut: "Çıkış tarihi", passengers: "Yolcu sayısı", fromAirport: "Kalkış havalimanı", toAirport: "Varış havalimanı", departureDate: "Gidiş tarihi", returnDate: "Dönüş tarihi", participants: "Katılımcı sayısı", tourType: "Tur türü", tourDate: "Tur tarihi", location: "Konum", pilgrims: "Hacı veya umreci sayısı", patients: "Hasta sayısı", arrivalDate: "İstanbul'a varış tarihi", interest: "Tedavi veya ilgi alanı", serviceInterest: "Aradığınız hizmet",
    },
    options: {
      serviceType: ["Noktadan noktaya transfer", "Günlük (8 saate kadar)", "Haftalık (7 gün)"], hasReturn: ["Evet", "Hayır"], stars: ["3 yıldız", "4 yıldız", "5 yıldız"],
      dailyTours: ["Sultanahmet turu (Sultanahmet Camii + Ayasofya + Topkapı Sarayı)", "Boğaz tekne turu (Rumeli Hisarı + köyler)", "Kapalıçarşı ve tarihi çarşılar turu", "Taksim ve İstiklal Caddesi + Galata Kulesi", "Prens Adaları vapur turu (Büyükada)"],
      privateTours: ["Kapadokya ve balon gezisi (2 tam gün)", "Pamukkale ve beyaz termal kaynaklar", "Trabzon ve Ayder Yaylası", "Antalya ve turkuaz plajlar", "Bodrum ve Ege yatları", "Bursa ve Uludağ şelaleleri", "Kapsamlı İstanbul turu (3 gün)"],
      groupTours: ["İstanbul aile gezisi (aileler ve çocuklar)", "Kadınlara özel gezi (kadın rehber)", "Erkeklere özel gezi", "Gençlik grup gezisi (18-35 yaş)", "Şirket ve resmi heyet gezisi (VIP)", "Öğrenci okul gezisi (eğitici rehber)", "Grup balayı gezisi (yalnızca çiftler)"],
      medicalInterest: ["Saç ekimi", "Diş estetiği", "Estetik ameliyatlar (burun, dudak, vücut şekillendirme)", "Göz tedavisi (LASIK)", "Kalp ve damar hastalıkları", "Ortopedi ve eklem ameliyatları", "Kanser tedavisi", "Kapsamlı check-up", "Diğer"],
    },
    whatsapp: { requestTitle: "CASANOSTRA — Yeni Talep", service: "Hizmet", requestDetails: "Talep Detayları", travelers: "Yolcu sayısı ({count})", person: "Kişi {index}", intent: "Bu hizmeti rezerve etmek istiyorum. Teşekkürler.", notProvided: "Belirtilmedi" },
  },
  fr: {
    formEyebrow: "Formulaire de Réservation Rapide", heading: "Réserver — {service}",
    formDescription: "Remplissez ce formulaire pour envoyer votre demande directement via WhatsApp. Notre équipe vous contactera pour confirmer la réservation.",
    successTitle: "Votre demande a été envoyée", successText: "WhatsApp s'est ouvert avec un message contenant vos coordonnées. Envoyez-le pour confirmer votre demande.",
    sending: "Envoi en cours...", submit: "Envoyer les Informations via WhatsApp",
    privacy: "Vos données sont envoyées directement à CASANOSTRA via WhatsApp et ne sont pas stockées dans une base de données. Nous protégeons votre vie privée.",
    addPerson: "Ajouter une Personne", removePerson: "Supprimer la Personne", person: "Personne {index}", remove: "Supprimer", choose: "— Sélectionner —", enterValue: "Saisissez {field}",
    requiredField: "{field} est obligatoire", requiredPersonField: "{field} est obligatoire pour la personne {person}",
    fields: {
      guests: "Nombre de personnes", applicants: "Nombre de demandeurs", name: "Nom complet", phone: "Téléphone (WhatsApp avec indicatif)", age: "Âge", passport: "Numéro de passeport", nationality: "Nationalité", entryDate: "Date d'entrée en Turquie", residenceCountry: "Pays de résidence actuel", visaCountry: "Pays pour lequel le visa est demandé", serviceType: "Type de service", passengerCount: "Nombre de passagers", pickupLocation: "Lieu de prise en charge", dropoffLocation: "Lieu d'arrivée", departureDatetime: "Date et heure", hasReturn: "Un trajet retour est-il nécessaire ?", returnPickupLocation: "Lieu de prise en charge du retour", returnDropoffLocation: "Destination du retour", returnDatetime: "Date et heure du retour", hotelLocation: "Emplacement hôtelier souhaité", stars: "Classement de l'hôtel", checkIn: "Date d'arrivée", checkOut: "Date de départ", passengers: "Nombre de voyageurs", fromAirport: "Aéroport de départ", toAirport: "Aéroport d'arrivée", departureDate: "Date aller", returnDate: "Date retour", participants: "Nombre de participants", tourType: "Type d'excursion", tourDate: "Date de l'excursion", location: "Emplacement", pilgrims: "Nombre de pèlerins", patients: "Nombre de patients", arrivalDate: "Date d'arrivée à Istanbul", interest: "Traitement ou domaine souhaité", serviceInterest: "Service recherché",
    },
    options: {
      serviceType: ["Transfert point à point", "À la journée (jusqu'à 8 h)", "À la semaine (7 jours)"], hasReturn: ["Oui", "Non"], stars: ["3 étoiles", "4 étoiles", "5 étoiles"],
      dailyTours: ["Visite de Sultanahmet (Mosquée Bleue + Sainte-Sophie + palais de Topkapi)", "Croisière sur le Bosphore (forteresse de Rumeli + villages)", "Grand Bazar et marchés historiques", "Taksim et avenue Istiklal + tour de Galata", "Excursion aux îles des Princes (Büyükada)"],
      privateTours: ["Cappadoce et montgolfière (2 jours complets)", "Pamukkale et sources thermales blanches", "Trabzon et plateau d'Ayder", "Antalya et plages turquoise", "Bodrum et yachts de la mer Égée", "Bursa et cascades d'Uludağ", "Visite complète d'Istanbul (3 jours)"],
      groupTours: ["Séjour familial à Istanbul (familles et enfants)", "Excursion réservée aux femmes (guide femme)", "Excursion réservée aux hommes", "Voyage de groupe jeunes (18-35 ans)", "Voyage d'entreprise et délégation officielle (VIP)", "Sortie scolaire (guide pédagogique)", "Voyage de noces en groupe (couples uniquement)"],
      medicalInterest: ["Greffe de cheveux", "Dentisterie esthétique", "Chirurgie esthétique (nez, lèvres, silhouette)", "Traitement des yeux (LASIK)", "Maladies cardiaques et vasculaires", "Chirurgie orthopédique et articulaire", "Traitement oncologique", "Bilan de santé complet", "Autre"],
    },
    whatsapp: { requestTitle: "CASANOSTRA — Nouvelle Demande", service: "Service", requestDetails: "Détails de la Demande", travelers: "Nombre de voyageurs ({count})", person: "Personne {index}", intent: "Je souhaite réserver ce service. Merci.", notProvided: "Non renseigné" },
  },
  ru: {
    formEyebrow: "Форма быстрого бронирования", heading: "Забронировать — {service}",
    formDescription: "Заполните форму, чтобы отправить запрос напрямую через WhatsApp. Наша команда свяжется с вами для подтверждения бронирования.",
    successTitle: "Запрос успешно отправлен", successText: "Открылся WhatsApp с сообщением, содержащим ваши данные. Отправьте его для подтверждения запроса.",
    sending: "Отправка...", submit: "Отправить данные через WhatsApp",
    privacy: "Ваши данные отправляются напрямую в CASANOSTRA через WhatsApp и не сохраняются в базе данных. Мы защищаем вашу конфиденциальность.",
    addPerson: "Добавить человека", removePerson: "Удалить человека", person: "Человек {index}", remove: "Удалить", choose: "— Выберите —", enterValue: "Введите: {field}",
    requiredField: "Поле «{field}» обязательно", requiredPersonField: "Поле «{field}» обязательно для человека {person}",
    fields: {
      guests: "Количество человек", applicants: "Количество заявителей", name: "Полное имя", phone: "Телефон (WhatsApp с кодом страны)", age: "Возраст", passport: "Номер паспорта", nationality: "Гражданство", entryDate: "Дата въезда в Турцию", residenceCountry: "Страна проживания", visaCountry: "Страна, для которой запрашивается виза", serviceType: "Тип услуги", passengerCount: "Количество пассажиров", pickupLocation: "Место подачи", dropoffLocation: "Место назначения", departureDatetime: "Дата и время", hasReturn: "Нужна ли обратная поездка?", returnPickupLocation: "Место подачи для обратной поездки", returnDropoffLocation: "Место назначения обратной поездки", returnDatetime: "Дата и время обратной поездки", hotelLocation: "Желаемый район отеля", stars: "Категория отеля", checkIn: "Дата заезда", checkOut: "Дата выезда", passengers: "Количество путешественников", fromAirport: "Аэропорт отправления", toAirport: "Аэропорт прибытия", departureDate: "Дата вылета", returnDate: "Дата обратного рейса", participants: "Количество участников", tourType: "Тип экскурсии", tourDate: "Дата экскурсии", location: "Местоположение", pilgrims: "Количество паломников", patients: "Количество пациентов", arrivalDate: "Дата прибытия в Стамбул", interest: "Лечение или интересующая область", serviceInterest: "Интересующая услуга",
    },
    options: {
      serviceType: ["Трансфер из точки в точку", "На день (до 8 часов)", "На неделю (7 дней)"], hasReturn: ["Да", "Нет"], stars: ["3 звезды", "4 звезды", "5 звёзд"],
      dailyTours: ["Экскурсия по Султанахмету (Голубая мечеть + Айя-София + дворец Топкапы)", "Прогулка по Босфору (крепость Румели + деревни)", "Гранд-базар и исторические рынки", "Таксим и улица Истикляль + Галатская башня", "Паромная экскурсия на Принцевы острова (Бююкада)"],
      privateTours: ["Каппадокия и воздушные шары (2 полных дня)", "Памуккале и белые термальные источники", "Трабзон и плато Айдер", "Анталья и бирюзовые пляжи", "Бодрум и яхты Эгейского моря", "Бурса и водопады Улудага", "Полная экскурсия по Стамбулу (3 дня)"],
      groupTours: ["Семейная поездка по Стамбулу (семьи и дети)", "Женская поездка (только для женщин — гид-женщина)", "Мужская поездка (только для мужчин)", "Молодёжная поездка (18-35 лет)", "Корпоративная поездка и официальная делегация (VIP)", "Школьная поездка (образовательный гид)", "Групповое свадебное путешествие (только пары)"],
      medicalInterest: ["Пересадка волос", "Эстетическая стоматология", "Пластическая хирургия (нос, губы, коррекция фигуры)", "Лечение глаз (LASIK)", "Заболевания сердца и сосудов", "Ортопедия и хирургия суставов", "Лечение онкологии", "Комплексное обследование", "Другое"],
    },
    whatsapp: { requestTitle: "CASANOSTRA — Новый запрос", service: "Услуга", requestDetails: "Детали запроса", travelers: "Количество путешественников ({count})", person: "Человек {index}", intent: "Я хотел(а) бы забронировать эту услугу. Спасибо.", notProvided: "Не указано" },
  },
};

/* ====================================================================
 *  دمج جميع الرسائل — تُصدَّر للدمج مع messages.ts الرئيسي
 * ==================================================================== */
export const pageMessages: Record<string, PageMessages> = {
  about: aboutMessages,
  faq: faqMessages,
  contact: contactMessages,
  quickBooking: quickBookingMessages,
  servicesPage: servicesPageMessages,
  offersPage: offersPageMessages,
  serviceForms: serviceFormsMessages,
};

/**
 * دمج رسائل صفحة معيّنة مع الرسائل الأساسية للّغة المعطاة.
 *
 * @param baseMessages الرسائل الأساسية (common, nav, footer, home)
 * @param pageName اسم الصفحة المراد دمجها
 * @param locale اللغة
 * @returns الرسائل المدموجة
 */
export function mergePageMessages(
  baseMessages: Record<string, any>,
  pageName: string,
  locale: Locale,
): Record<string, any> {
  const pageMsg = pageMessages[pageName];
  if (!pageMsg) return baseMessages;
  return {
    ...baseMessages,
    [pageName]: pageMsg[locale] || pageMsg.ar,
  };
}
