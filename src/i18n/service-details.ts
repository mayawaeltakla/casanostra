import type { Locale } from "./messages";

export interface ServiceDetailContent {
  description: string;
  features: { title: string; description: string }[];
  included: string[];
  excluded: string[];
  /** عنوان تسويقي اختياري (موضعه position في site-config) */
  marketing?: { title: string; subtitle: string };

  /* ------------------------------------------------------------------
   * أقسام إضافية اختيارية — تُعرَّف بالعربية في site-config.ts
   * وتُترجَم هنا لبقية اللغات. الخدمات التي لا تعرّفها لا يتغير شكلها.
   * ------------------------------------------------------------------ */

  /** نص بديل لصورة الغلاف */
  heroImageAlt?: string;
  /** نصوص بديلة لصور المعرض بنفس ترتيبها */
  galleryImagesAlt?: string[];
  /** قسم «باقة الخدمات الشاملة» */
  bundle?: { heading: string; items: { title: string; description: string }[] };
  /**
   * قسم الشركاء (الجامعات).
   * `name` الاسم في هذه اللغة، و`official` الاسم الرسمي بالتركية.
   * إذا كان الاسم الرسمي مطابقاً للاسم المحلي (التركية) اترك `official` فارغاً.
   */
  universities?: {
    heading: string;
    intro: string;
    items: { name: string; official: string }[];
  };
  /** قسم العرض الترويجي — نسبة الخصم تُعرَّف مرة واحدة في site-config */
  promo?: { heading: string; description: string };
}

type NonArabicLocale = Exclude<Locale, "ar">;
type ServiceDetailCatalog = Record<string, ServiceDetailContent>;

export const serviceDetailMessages: Record<NonArabicLocale, ServiceDetailCatalog> = {
  en: {
    "reservations-turkey": {
      description: "We help you obtain and renew all types of legal residence permits in Turkey easily and professionally, following every official procedure and providing the advice needed for your application to succeed as quickly as possible. Whether you are applying for the first time or renewing your current permit, the CASANOSTRA team supports you step by step until you receive your residence card. We handle: tourist residence, student residence, real-estate residence, work residence, family residence, and permanent (long-term) residence.",
      features: [{ title: "Professional follow-up", description: "Full follow-up of your file from submission until you obtain the residence permit." }, { title: "Saving time and effort", description: "Official procedures completed efficiently and quickly." }, { title: "Legal advice", description: "Guidance on choosing the residence type that best fits your situation." }, { title: "Ongoing support", description: "Customer service via WhatsApp throughout the process." }],
      included: ["Free consultation to determine the suitable residence type", "Immigration office appointment booking", "Preparing and reviewing the residence file", "Completing the online residence application", "Following up the application procedures", "Help obtaining health insurance when needed", "Support and guidance until you receive the residence card"],
      excluded: ["Government immigration office fees", "Mandatory health insurance fees", "Translation and notarization fees (if any)", "Notary fees", "Passport issuance or renewal fees", "Any additional government fees imposed by the competent authorities"],
      marketing: { title: "Get your residence permit in Turkey with ease with CASANOSTRA", subtitle: "Professional follow-up for tourist, student, real-estate, family, work and permanent residence permits with the highest level of accuracy and reliability." },
    },
    "visa": {
      description: "We provide visa services for all countries of the world for individuals, families and business travelers, with professional follow-up of every procedure and requirement for each country. The CASANOSTRA team prepares your visa file with great care to ensure a complete application that meets embassy and consulate requirements, saving you time and effort and improving your chances of approval. Whether you are travelling for tourism, business, study or a family visit, we help you choose the right visa and complete every step from the beginning until you collect your passport.",
      features: [{ title: "All countries of the world", description: "Visas for Europe, the UK, the USA, Canada, Asia, the Gulf states and more." }, { title: "Experience and professionalism", description: "A team specialized in the requirements of different embassies and consulates." }, { title: "Full follow-up", description: "Continuous follow-up of every stage of the application until a decision is issued." }, { title: "Saving time and effort", description: "We prepare the file, book appointments and follow the procedures on your behalf." }],
      included: ["Free consultation to determine the suitable visa type", "Reviewing and checking all required documents", "Completing visa application forms", "Booking embassy and visa-center appointments", "Preparing and organizing the application file", "Interview guidance when needed", "Following the application until the visa is issued"],
      excluded: ["Official embassy and consulate fees", "Approved visa-center fees", "Translation and certification fees", "Travel health insurance fees", "Shipping or passport-return postage fees", "Flight and hotel bookings unless requested as a separate package"],
      marketing: { title: "We open the doors of the world with CASANOSTRA's professional visa services", subtitle: "Get your visa easily and quickly through a specialized team that handles every procedure needed to obtain a travel visa to countries around the world." },
    },
    "vip-cars": {
      description: "Enjoy a luxurious and comfortable travel experience in Turkey with the Mercedes Vito VIP service, designed for airport pick-up and drop-off and private transfers within Istanbul. Whether you travel for tourism or business, we provide a luxury vehicle with a professional driver to ensure the highest levels of comfort, safety and privacy. The service is available for airport transfers, city transfers, private tours, or daily hire of a car with a driver according to your needs.",
      features: [{ title: "Airport pick-up and drop-off", description: "Professional reception at all Istanbul airports with flight tracking." }, { title: "Mercedes Vito VIP vehicles", description: "Luxury vehicles with comfortable seats, spacious interiors and top comfort standards." }, { title: "Professional drivers", description: "Highly experienced drivers who are punctual and professional." }, { title: "Full flexibility", description: "Book a single trip, a full day or several days." }],
      included: ["A private Mercedes Vito VIP", "A professional driver throughout the booking", "Airport pick-up or drop-off", "Fuel and road tolls within the agreed route", "Water and refreshments in the car", "Flight tracking for travelers", "Comprehensive insurance for the vehicle and passengers", "Direct support via WhatsApp"],
      excluded: ["Private parking fees on request", "Trips outside the agreed route or program", "Tours that require admission tickets", "Driver accommodation or meals on intercity trips", "Any additional requests or services not mentioned in the offer"],
      marketing: { title: "Travel in style with the Mercedes Vito VIP service in Turkey", subtitle: "Airport pick-up and drop-off, private transfers within Istanbul, and a car with a professional driver for a full day or several days with the highest levels of comfort and privacy." },
    },
    hotels: {
      description: "Book hotels in Turkey at exclusive rates through our direct relationships with premium hotels and resorts in Istanbul, Antalya, Bodrum, Trabzon, and Kayseri. We offer discounts of up to 40% off official rates. Whether you want a Bosphorus view, an Antalya beach resort, or a historic hotel in Sultanahmet, we can help find the right stay.",
      features: [
        { title: "Exclusive discounts", description: "Up to 40% below global booking platforms." },
        { title: "Wide selection", description: "More than 500 hotels and resorts across Turkey." },
        { title: "Great locations", description: "Hotels in leading tourist areas." },
        { title: "Fast confirmation", description: "Booking confirmation within minutes via WhatsApp." },
      ],
      included: ["Room booking at a four- or five-star hotel", "Best-price guarantee", "Arrival reception service", "24/7 support during your stay", "Complimentary breakfast at most hotels"],
      excluded: ["Lunch and dinner", "Laundry and ironing services", "Resort fees charged by some hotels"],
    },
    flights: {
      description: "We arrange competitive fares on Turkish and international airlines, including Turkish Airlines, Iraqi Airways, Saudia, and Air Arabia. Choose from economy or business class. Our service covers finding suitable flights, booking, ticket issuance, and help with schedule changes. We also arrange group bookings for families and tour groups at special rates.",
      features: [
        { title: "All major airlines", description: "Turkish, Arab, and international carriers." },
        { title: "Competitive fares", description: "Options designed to beat online prices." },
        { title: "Flexible choices", description: "Economy, business, and first class." },
        { title: "Group bookings", description: "Special rates for families and groups." },
      ],
      included: ["Finding the best flight by price and schedule", "Electronic ticket issuance", "Ticket delivery by WhatsApp and email", "Assistance with flight changes", "Advice on visa and transit requirements"],
      excluded: ["Excess baggage fees, based on the airline's policy", "Special onboard meals", "Travel insurance"],
    },
    "daily-tours": {
      description: "Enjoy the best day trips from Istanbul with CASANOSTRA. We offer complete tour programs to Turkey's most famous natural and historical destinations. Whether you want to explore the European or Asian side of Istanbul, or spend a day in nature in Bursa, Sapanca or Yalova, we provide a comfortable and enjoyable experience with modern transport and professional service. Our programs include: the European Istanbul trip, the Asian Istanbul trip, Sapanca and Maşukiye, Bursa and Mount Uludağ, Yalova, Düzce, Şile and Ağva, the Princes' Islands, and a luxury dinner on the Bosphorus.",
      features: [{ title: "Varied programs", description: "The most popular trips and tours in and around Istanbul." }, { title: "Comfortable transport", description: "Modern air-conditioned cars and buses for passenger comfort." }, { title: "Professional organization", description: "Carefully planned programs to enjoy as many sights and activities as possible." }, { title: "Daily trips", description: "Daily departures with options for individuals, families and groups." }],
      included: ["Round-trip transport from the designated meeting points", "Comfortable air-conditioned car or bus", "Complete organization of the tour program", "Visits to the sights listed in the trip program", "Support and follow-up throughout the trip", "Transport insurance during the program"],
      excluded: ["Admission tickets for sights and optional activities", "Personal expenses", "Food and drinks unless stated in the program", "Cable-car fees or paid activities", "Optional tips", "Any services not mentioned under what is included"],
      marketing: { title: "Discover Turkey's most beautiful destinations with CASANOSTRA daily tours 🌍✨", subtitle: "Enjoy special trips to Bursa, Sapanca, Yalova, Şile, the Princes' Islands, European and Asian Istanbul, plus a luxury dinner experience on the Bosphorus, with the highest levels of comfort and organization." },
    },
    "private-tours": {
      description: "Build a private Turkey itinerary around your preferences and budget. Visit Cappadocia by balloon, Antalya's beaches, Pamukkale's thermal springs, Trabzon's Byzantine castles, or Rize's green mountains. We create a fully customized program with a luxury car and an Arabic-speaking driver or guide throughout your trip, along with stays at premium hotels.",
      features: [
        { title: "Made to order", description: "An itinerary tailored entirely to your preferences." },
        { title: "Private guide", description: "An Arabic-speaking guide and driver throughout the trip." },
        { title: "Luxury car", description: "Mercedes V-Class or BMW." },
        { title: "Complete flexibility", description: "Change your plans at any time during the trip." },
      ],
      included: ["Luxury car with an Arabic-speaking driver or guide", "Fuel and parking throughout the trip", "Hotel bookings in each city", "Breakfast arrangements at hotels", "24/7 support during the trip"],
      excluded: ["International flights", "Lunch and dinner", "Attraction tickets", "Optional activities such as balloons or diving"],
    },
    "group-tours": {
      description: "Fully organized group trips for large families, friends, and corporate delegations. Packages can include flights, accommodation, transport, tours, meals, and the details in between. Special rates are available for groups of ten or more, and itineraries can be customized. Suitable for company, school, family, and holiday group trips.",
      features: [
        { title: "Group discounts", description: "Special rates for groups of more than ten people." },
        { title: "Complete itinerary", description: "Flights, accommodation, tours, and transport." },
        { title: "Group guide", description: "A dedicated Arabic-speaking guide throughout the trip." },
        { title: "Luxury coaches", description: "Air-conditioned coaches seating up to 45 people." },
      ],
      included: ["Luxury air-conditioned coach for the group", "Arabic-speaking tourist guide throughout the trip", "Four- or five-star group hotel booking", "Breakfast and lunch", "Attraction admission tickets", "Full coordination of the daily itinerary"],
      excluded: ["International flights", "Dinner, available as an add-on", "Personal shopping", "Tips"],
    },
    "hajj-umrah": {
      description: "We arrange comprehensive Hajj and Umrah packages via Turkey, including a Saudi entry visa, flights from your country to Jeddah or Medina, hotels near the Haram, transport between holy sites, and meals throughout the trip. Packages are planned to support a comfortable and peaceful pilgrimage. Our team specializes in the logistics of Hajj and Umrah travel.",
      features: [
        { title: "Complete packages", description: "Flights, accommodation, transport, and meals." },
        { title: "Near the Haram", description: "Hotels a few minutes from the Haram." },
        { title: "Religious guide", description: "A guide experienced in pilgrimage rites." },
        { title: "Peace of mind", description: "All arrangements are organized in advance." },
      ],
      included: ["Hajj or Umrah visa", "Flights from your country to Saudi Arabia", "Accommodation at hotels near the Haram", "Transport between Mecca, Medina, and holy sites", "Full meals throughout the trip", "Specialist religious guide"],
      excluded: ["Gifts and personal shopping", "Sacrificial offerings, which can be arranged separately", "Tips"],
    },
    "medical-tourism": {
      description: "We provide medical tourism services in Turkey in cooperation with leading hospitals and specialized medical centers, giving you a complete treatment experience that combines high medical quality with professional service. The CASANOSTRA team handles all arrangements for your treatment trip, from the initial consultation until treatment is completed and follow-up care. Our treatment services include: hair transplant, dental aesthetics, cosmetic surgery, obesity treatment and weight-loss surgery, and eye treatment and correction.",
      features: [{ title: "Specialized medical centers", description: "We work with leading hospitals and clinics across many treatment fields." }, { title: "Experienced doctors", description: "Leading internationally accredited doctors and consultants." }, { title: "Arabic interpreter", description: "Accompaniment and medical interpretation in Arabic throughout the treatment." }, { title: "Integrated follow-up", description: "Follow-up before, during and after treatment, including once you are back in your country." }],
      included: ["Free initial medical consultation", "Study and assessment of the medical case", "Coordinating appointments with the doctor or medical center", "Reception and follow-up of the patient throughout treatment", "Medical interpretation in Arabic", "Booking a suitable hotel near the medical center", "Transfers between the airport, hotel and medical center", "Post-treatment follow-up when needed"],
      excluded: ["Additional accommodation costs outside the agreed program", "International flight tickets", "Personal expenses"],
      marketing: { title: "Your journey to better health starts in Turkey with CASANOSTRA ✨", subtitle: "We offer complete solutions in hair transplantation, dental aesthetics, cosmetic surgery, obesity treatment and eye care, with professional follow-up and VIP services that give you comfort and confidence at every step." },
    },
    "other-services": {
      description: "We offer additional services for your time in Turkey, from fine-dining reservations and event planning to private yacht rental, sports tickets, translation and personal assistance, honeymoon planning, spas, and Turkish baths. Tell us what you need in Turkey and we will work to arrange it for you.",
      features: [
        { title: "Broad selection", description: "More than 20 different additional services." },
        { title: "Fully customized", description: "Arranged to match your specific request." },
        { title: "Fair prices", description: "Competitive rates without intermediaries." },
        { title: "VIP service", description: "A premium experience in every detail." },
      ],
      included: ["Consultation to identify the service you need", "Full coordination with service providers", "Booking and appointment confirmation", "Follow-up until the service is complete", "24/7 support"],
      excluded: ["The service cost itself, determined for each request", "Personal purchases", "Tips"],
    },
    "student-services": {
      description: "At CASANOSTRA we believe the start of your academic future deserves a smooth beginning free of complications. That is why we designed the comprehensive \"Student Services\" package to be your trusted advisor and your legal and logistical support, from the moment you consider studying in Turkey until you are fully settled at your university.",
      features: [],
      included: [],
      excluded: [],
      heroImageAlt: "University students walking together in front of a campus building",
      galleryImagesAlt: ["A student arriving at the airport with his luggage", "A furnished student room prepared for studying", "Students studying inside the university library"],
      bundle: {
        heading: "Our comprehensive student services package",
        items: [
          { title: "University admission", description: "We secure your academic acceptance at the best private universities in Turkey and advise you on choosing the major that best fits your future." },
          { title: "Securing suitable student housing", description: "We provide safe and comfortable housing options — student dormitories or shared flats — close to your campus and within your budget." },
          { title: "Booking the cheapest flight tickets", description: "We secure the best student flight offers to reduce your travel costs." },
          { title: "Luxury transfer and reception services", description: "We welcome you at the airport as soon as you arrive with our VIP car fleet and drive you to your accommodation in complete comfort and safety." },
          { title: "Student residence permit and health insurance", description: "We handle all the legal procedures for your student residence file, book the appointment, and provide the mandatory approved health insurance." },
          { title: "Equivalency of secondary and university certificates", description: "We help you complete the certificate equivalency procedures (Denklik) and prepare the required documents before the Turkish Ministry of Higher Education." },
          { title: "Opening a bank account", description: "We accompany you step by step to open an official Turkish bank account and obtain your debit card to make your financial transactions easier." },
          { title: "Obtaining a SIM card", description: "We help you buy and activate a Turkish phone line and set up the internet packages suitable for student use as soon as you arrive." },
          { title: "Obtaining the student transport card", description: "We obtain the discounted student transport card (İndirimli Kart) for easy and economical travel around the city." },
        ],
      },
      universities: {
        heading: "Our partners among Turkey's long-established universities",
        intro: "At CASANOSTRA we are authorised agents of Turkey's most prominent and strongest universities, and through this partnership we provide you with guaranteed seats and exclusive discounts:",
        items: [
          { name: "Haliç University", official: "Haliç Üniversitesi" },
          { name: "Üsküdar University", official: "Üsküdar Üniversitesi" },
          { name: "Fenerbahçe University", official: "Fenerbahçe Üniversitesi" },
          { name: "Beykent University", official: "Beykent Üniversitesi" },
          { name: "Kent University", official: "Kent Üniversitesi" },
          { name: "Beykoz University", official: "Beykoz Üniversitesi" },
        ],
      },
      promo: {
        heading: "A special discount on the comprehensive student services package in Turkey.",
        description: "Get an exclusive discount when you request the comprehensive student services package (admission, residence permit, housing, and airport reception).",
      },
    },
  },
  tr: {
    "reservations-turkey": {
      description: "Türkiye'de her türlü yasal oturma izninin alınması ve yenilenmesinde, tüm resmî işlemleri takip ederek ve başvurunun en kısa sürede sonuçlanması için gerekli danışmanlığı sağlayarak size kolay ve profesyonel biçimde yardımcı oluyoruz. İster ilk kez başvurun ister mevcut oturma izninizi yenileyin, CASANOSTRA ekibi oturma izni kartınızı alana kadar adım adım yanınızda. Şu oturma izinlerinde hizmet veriyoruz: turistik, öğrenci, gayrimenkul, çalışma, aile ve uzun dönem (sürekli) oturma izni.",
      features: [{ title: "Profesyonel takip", description: "Başvurudan oturma iznini alana kadar dosyanızın tam takibi." }, { title: "Zaman ve emek tasarrufu", description: "Resmî işlemlerin verimli ve hızlı biçimde tamamlanması." }, { title: "Hukuki danışmanlık", description: "Durumunuza en uygun oturma izni türünü seçmeniz için yönlendirme." }, { title: "Sürekli destek", description: "İşlem boyunca WhatsApp üzerinden müşteri hizmetleri." }],
      included: ["Uygun oturma izni türünü belirlemek için ücretsiz danışmanlık", "Göç İdaresi randevusunun alınması", "Oturma izni dosyasının hazırlanması ve incelenmesi", "Çevrimiçi oturma izni başvurusunun doldurulması", "Başvuru işlemlerinin takibi", "Gerektiğinde sağlık sigortası yaptırma desteği", "Oturma izni kartı teslim alınana kadar destek ve rehberlik"],
      excluded: ["Göç İdaresi resmî harçları", "Zorunlu sağlık sigortası ücretleri", "Tercüme ve onay ücretleri (varsa)", "Noter ücretleri", "Pasaport çıkarma veya yenileme ücretleri", "Yetkili makamların talep ettiği diğer resmî harçlar"],
      marketing: { title: "CASANOSTRA ile Türkiye'de oturma izninizi kolayca alın", subtitle: "Turistik, öğrenci, gayrimenkul, aile, çalışma ve uzun dönem oturma izinleri için en yüksek doğruluk ve güvenilirlikle profesyonel takip." },
    },
    "visa": {
      description: "Bireyler, aileler ve iş insanları için dünyanın tüm ülkelerine vize hizmeti sunuyoruz; her ülkenin kendine özgü işlem ve gerekliliklerini profesyonelce takip ediyoruz. CASANOSTRA ekibi, büyükelçilik ve konsolosluk gerekliliklerine uygun eksiksiz bir başvuru için vize dosyanızı titizlikle hazırlar; böylece zamandan ve emekten tasarruf eder, onay şansınızı artırırsınız. Turizm, iş, eğitim veya aile ziyareti için seyahat ediyor olun, doğru vizeyi seçmenize ve pasaportunuzu teslim alana kadar tüm adımları tamamlamanıza yardımcı oluruz.",
      features: [{ title: "Dünyanın tüm ülkeleri", description: "Avrupa, Birleşik Krallık, ABD, Kanada, Asya, Körfez ülkeleri ve daha fazlası için vize." }, { title: "Deneyim ve profesyonellik", description: "Farklı büyükelçilik ve konsolosluk gerekliliklerinde uzman ekip." }, { title: "Tam takip", description: "Karar çıkana kadar başvurunun tüm aşamalarının sürekli takibi." }, { title: "Zaman ve emek tasarrufu", description: "Dosya hazırlığı, randevu alma ve işlemlerin sizin adınıza takibi." }],
      included: ["Uygun vize türünü belirlemek için ücretsiz danışmanlık", "Gerekli tüm belgelerin incelenmesi ve kontrolü", "Vize başvuru formlarının doldurulması", "Büyükelçilik ve vize merkezi randevularının alınması", "Başvuru dosyasının hazırlanması ve düzenlenmesi", "Gerektiğinde mülakat için rehberlik", "Vize çıkana kadar başvurunun takibi"],
      excluded: ["Resmî büyükelçilik ve konsolosluk harçları", "Yetkili vize merkezi ücretleri", "Tercüme ve onay ücretleri", "Seyahat sağlık sigortası ücretleri", "Kargo veya pasaportun posta ile iadesi ücretleri", "Ayrı bir paket olarak istenmedikçe uçak ve otel rezervasyonları"],
      marketing: { title: "CASANOSTRA'nın profesyonel vize hizmetleriyle dünyanın kapılarını açıyoruz", subtitle: "Dünyanın dört bir yanındaki ülkelere seyahat vizesi almak için gerekli tüm işlemleri üstlenen uzman bir ekiple vizenizi kolay ve hızlı şekilde alın." },
    },
    "vip-cars": {
      description: "İstanbul içinde havalimanı karşılama-uğurlama ve özel transferler için tasarlanan Mercedes Vito VIP hizmetiyle Türkiye'de lüks ve konforlu bir ulaşım deneyimi yaşayın. İster turizm ister iş için seyahat edin, en yüksek konfor, güvenlik ve gizlilik için profesyonel şoförlü lüks bir araç sunuyoruz. Hizmet; havalimanı karşılama ve uğurlama, şehir içi transferler, özel turlar veya ihtiyacınıza göre günlük şoförlü araç kiralama için geçerlidir.",
      features: [{ title: "Havalimanı karşılama ve uğurlama", description: "İstanbul'un tüm havalimanlarında uçuş takibiyle profesyonel karşılama." }, { title: "Mercedes Vito VIP araçlar", description: "Konforlu koltuklar, geniş iç mekân ve en üst düzey konfor standartlarına sahip lüks araçlar." }, { title: "Profesyonel şoförler", description: "Dakik ve profesyonel, deneyimli şoförler." }, { title: "Tam esneklik", description: "Tek bir yolculuk, tam gün veya birkaç gün için rezervasyon imkânı." }],
      included: ["Özel Mercedes Vito VIP araç", "Rezervasyon süresince profesyonel şoför", "Havalimanı karşılama veya uğurlama", "Anlaşılan güzergâh içinde yakıt ve yol ücretleri", "Araç içinde su ve ikramlıklar", "Yolcular için uçuş takibi hizmeti", "Araç ve yolcular için kapsamlı sigorta", "WhatsApp üzerinden doğrudan destek"],
      excluded: ["İstek halinde özel otopark ücretleri", "Anlaşılan güzergâh veya program dışındaki yolculuklar", "Giriş bileti gerektiren turistik turlar", "Şehirler arası yolculuklarda şoförün konaklama veya yemek giderleri", "Tekliflerde belirtilmeyen ek talepler veya hizmetler"],
      marketing: { title: "Türkiye'de Mercedes Vito VIP hizmetiyle şık seyahat edin", subtitle: "Havalimanı karşılama ve uğurlama, İstanbul içinde özel transferler ve profesyonel şoförlü araç; tam gün veya birkaç gün boyunca en üst düzey konfor ve gizlilikle." },
    },
    hotels: {
      description: "İstanbul, Antalya, Bodrum, Trabzon ve Kayseri'deki seçkin otel ve tatil köyleriyle doğrudan ilişkilerimiz sayesinde Türkiye'de özel fiyatlarla konaklama ayarlıyoruz. Resmî fiyatlarda %40'a varan indirim sunuyoruz. Boğaz manzaralı bir otel, Antalya'da sahil tatil köyü veya Sultanahmet'te tarihî bir otel arıyorsanız size uygun konaklamayı bulmanıza yardımcı oluruz.",
      features: [{ title: "Özel indirimler", description: "Uluslararası rezervasyon platformlarından %40'a kadar daha uygun." }, { title: "Geniş seçenek", description: "Türkiye genelinde 500'den fazla otel ve tatil köyü." }, { title: "İyi konumlar", description: "Önde gelen turistik bölgelerde oteller." }, { title: "Hızlı onay", description: "WhatsApp üzerinden dakikalar içinde rezervasyon onayı." }],
      included: ["Dört veya beş yıldızlı otelde oda rezervasyonu", "En iyi fiyat garantisi", "Varışta karşılama hizmeti", "Konaklama boyunca 7/24 destek", "Çoğu otelde ücretsiz kahvaltı"],
      excluded: ["Öğle ve akşam yemekleri", "Çamaşır yıkama ve ütü hizmetleri", "Bazı otellerin aldığı tesis ücretleri"],
    },
    flights: {
      description: "Turkish Airlines, Iraqi Airways, Saudia ve Air Arabia dahil Türk ve uluslararası hava yollarında uygun fiyatlı biletler ayarlıyoruz. Ekonomi veya business class seçenekleri arasından seçim yapın. Hizmetimiz uygun uçuşu bulma, rezervasyon, bilet düzenleme ve saat değişikliklerinde desteği kapsar. Aileler ve tur grupları için özel fiyatlı grup rezervasyonları da yapıyoruz.",
      features: [{ title: "Önde gelen hava yolları", description: "Türk, Arap ve uluslararası hava yolları." }, { title: "Rekabetçi fiyatlar", description: "Çevrimiçi fiyatlarla rekabet eden seçenekler." }, { title: "Esnek seçenekler", description: "Ekonomi, business ve first class." }, { title: "Grup rezervasyonları", description: "Aileler ve gruplar için özel fiyatlar." }],
      included: ["Fiyat ve saate göre en uygun uçuşu bulma", "Elektronik bilet düzenleme", "Biletin WhatsApp ve e-posta ile gönderilmesi", "Uçuş değişikliklerinde destek", "Vize ve aktarma koşulları hakkında danışmanlık"],
      excluded: ["Hava yolu politikasına göre fazla bagaj ücretleri", "Uçakta özel yemekler", "Seyahat sigortası"],
    },
    "daily-tours": {
      description: "CASANOSTRA ile İstanbul'dan çıkışlı en güzel günübirlik gezileri yaşayın; Türkiye'nin en ünlü doğal ve tarihî destinasyonlarına kapsamlı tur programları sunuyoruz. İster İstanbul'un Avrupa veya Asya yakasını keşfetmek, ister Bursa, Sapanca veya Yalova'da doğayla bir gün geçirmek isteyin, modern ulaşım ve profesyonel hizmetle rahat ve keyifli bir deneyim sağlıyoruz. Programlarımız: İstanbul Avrupa Yakası gezisi, İstanbul Anadolu Yakası gezisi, Sapanca ve Maşukiye, Bursa ve Uludağ, Yalova, Düzce, Şile ve Ağva, Adalar ve Boğaz'da lüks akşam yemeği.",
      features: [{ title: "Çeşitli programlar", description: "İstanbul ve çevresindeki en popüler geziler ve turlar." }, { title: "Rahat ulaşım", description: "Yolcu konforu için modern, klimalı araçlar ve otobüsler." }, { title: "Profesyonel organizasyon", description: "Mümkün olduğunca çok mekânı ve etkinliği keyifle deneyimlemeniz için özenle hazırlanmış programlar." }, { title: "Günlük geziler", description: "Bireyler, aileler ve gruplar için uygun seçeneklerle her gün hareket." }],
      included: ["Belirlenen buluşma noktalarından gidiş-dönüş ulaşım", "Klimalı ve konforlu araç veya otobüs", "Gezi programının eksiksiz organizasyonu", "Gezi programında belirtilen mekânların ziyareti", "Gezi boyunca destek ve takip", "Program süresince ulaşım sigortası"],
      excluded: ["Mekân ve isteğe bağlı etkinlik giriş biletleri", "Kişisel harcamalar", "Programda belirtilmedikçe yiyecek ve içecekler", "Teleferik ücretleri veya ücretli etkinlikler", "İsteğe bağlı bahşişler", "Dahil olanlar arasında belirtilmeyen hizmetler"],
      marketing: { title: "CASANOSTRA günlük turlarıyla Türkiye'nin en güzel destinasyonlarını keşfedin 🌍✨", subtitle: "Bursa, Sapanca, Yalova, Şile, Adalar, Avrupa ve Asya yakası İstanbul gezilerinin yanı sıra Boğaz'da lüks akşam yemeği deneyimini en üst düzey konfor ve organizasyonla yaşayın." },
    },
    "private-tours": {
      description: "Türkiye'deki özel seyahat programınızı tercihlerinize ve bütçenize göre hazırlayın. Kapadokya'da balon turu, Antalya plajları, Pamukkale kaplıcaları, Trabzon'daki Bizans kaleleri veya Rize'nin yeşil dağlarını ziyaret edin. Yolculuk boyunca lüks araç ve Arapça konuşan sürücü veya rehber ile tamamen size özel program ve seçkin otel konaklaması sağlıyoruz.",
      features: [{ title: "İsteğe göre tasarım", description: "Tamamen tercihlerinize göre hazırlanan program." }, { title: "Özel rehber", description: "Yolculuk boyunca Arapça konuşan rehber ve sürücü." }, { title: "Lüks araç", description: "Mercedes V-Class veya BMW." }, { title: "Tam esneklik", description: "Yolculuk sırasında planınızı istediğiniz zaman değiştirin." }],
      included: ["Arapça konuşan sürücü veya rehberli lüks araç", "Yolculuk boyunca yakıt ve otopark", "Her şehirde otel rezervasyonu", "Otellerde kahvaltı düzenlemesi", "Yolculuk boyunca 7/24 destek"],
      excluded: ["Uluslararası uçak biletleri", "Öğle ve akşam yemekleri", "Turistik yer giriş biletleri", "Balon ve dalış gibi isteğe bağlı etkinlikler"],
    },
    "group-tours": {
      description: "Geniş aileler, arkadaş grupları ve şirket heyetleri için tam düzenlenmiş grup seyahatleri. Paketlere uçuşlar, konaklama, ulaşım, turlar, yemekler ve diğer ayrıntılar dahil edilebilir. On veya daha fazla kişilik gruplara özel fiyatlar sunulur ve programlar isteğe göre özelleştirilebilir. Şirket, okul, aile ve tatil grupları için uygundur.",
      features: [{ title: "Grup indirimleri", description: "On kişiden büyük gruplara özel fiyatlar." }, { title: "Eksiksiz program", description: "Uçuş, konaklama, turlar ve ulaşım." }, { title: "Grup rehberi", description: "Yolculuk boyunca gruba özel Arapça rehber." }, { title: "Lüks otobüsler", description: "45 kişiye kadar kapasiteli klimalı otobüsler." }],
      included: ["Grup için lüks klimalı otobüs", "Yolculuk boyunca Arapça tur rehberi", "Grup için dört veya beş yıldızlı otel rezervasyonu", "Kahvaltı ve öğle yemeği", "Turistik yer giriş biletleri", "Günlük programın eksiksiz koordinasyonu"],
      excluded: ["Uluslararası uçak biletleri", "Eklenebilen akşam yemeği", "Kişisel alışverişler", "Bahşişler"],
    },
    "hajj-umrah": {
      description: "Türkiye üzerinden Suudi Arabistan giriş vizesi, ülkenizden Cidde veya Medine'ye uçak biletleri, Harem'e yakın oteller, kutsal mekânlar arasındaki ulaşım ve yolculuk boyunca yemekleri içeren kapsamlı Hac ve Umre paketleri düzenliyoruz. Paketler ibadetinizi rahat ve huzurlu biçimde yerine getirmeniz için hazırlanır. Ekibimiz Hac ve Umre seyahatlerinin lojistiğinde uzmandır.",
      features: [{ title: "Eksiksiz paketler", description: "Uçuş, konaklama, ulaşım ve yemekler." }, { title: "Harem'e yakın", description: "Harem'e birkaç dakika uzaklıktaki oteller." }, { title: "Dinî rehber", description: "Hac ve Umre ibadetlerinde uzman rehber." }, { title: "İçiniz rahat olsun", description: "Tüm düzenlemeler önceden yapılır." }],
      included: ["Hac veya Umre vizesi", "Ülkenizden Suudi Arabistan'a uçak biletleri", "Harem'e yakın otellerde konaklama", "Mekke, Medine ve kutsal mekânlar arasında ulaşım", "Yolculuk boyunca tam pansiyon", "Uzman dinî rehber"],
      excluded: ["Hediyeler ve kişisel alışverişler", "Ayrıca düzenlenebilen kurban", "Bahşişler"],
    },
    "medical-tourism": {
      description: "Türkiye'de seçkin hastaneler ve uzman tıp merkezleriyle iş birliği içinde sağlık turizmi hizmetleri sunuyor, yüksek tıbbi kalite ile profesyonel hizmeti buluşturan bütünsel bir tedavi deneyimi yaşatıyoruz. CASANOSTRA ekibi, ilk danışmanlıktan tedavinin tamamlanmasına ve sonraki takibe kadar tedavi seyahatinizin tüm düzenlemelerini üstlenir. Tedavi hizmetlerimiz: saç ekimi, diş estetiği, estetik ameliyatlar, obezite tedavisi ve kilo verme ameliyatları ile göz tedavisi ve düzeltme.",
      features: [{ title: "Uzman tıp merkezleri", description: "Birçok tedavi alanında önde gelen hastane ve kliniklerle çalışıyoruz." }, { title: "Deneyimli doktorlar", description: "Uluslararası akreditasyonlu seçkin doktorlar ve danışmanlar." }, { title: "Arapça tercüman", description: "Tedavi süresince Arapça refakat ve tıbbi tercümanlık." }, { title: "Bütünsel takip", description: "Tedavi öncesinde, sırasında ve ülkenize döndükten sonra takip." }],
      included: ["Ücretsiz ilk tıbbi danışmanlık", "Tıbbi durumun incelenmesi ve değerlendirilmesi", "Doktor veya tıp merkeziyle randevu koordinasyonu", "Tedavi süresince hastanın karşılanması ve takibi", "Arapça tıbbi tercümanlık", "Tıp merkezine yakın uygun otel rezervasyonu", "Havalimanı, otel ve tıp merkezi arasında transfer", "Gerektiğinde tedavi sonrası takip"],
      excluded: ["Anlaşılan program dışındaki ek konaklama giderleri", "Uluslararası uçak biletleri", "Kişisel harcamalar"],
      marketing: { title: "Daha sağlıklı bir yaşama giden yolculuğunuz CASANOSTRA ile Türkiye'de başlıyor ✨", subtitle: "Saç ekimi, diş estetiği, estetik ameliyatlar, obezite tedavisi ve göz tedavisinde, her adımda konfor ve güven sağlayan profesyonel takip ve VIP hizmetlerle eksiksiz çözümler sunuyoruz." },
    },
    "other-services": {
      description: "Türkiye'de ihtiyaç duyabileceğiniz ek hizmetleri sunuyoruz: seçkin restoran rezervasyonları, etkinlik ve kutlama organizasyonu, özel yat kiralama, spor karşılaşması biletleri, çeviri ve kişisel refakat, balayı planlaması, spa ve Türk hamamları. Türkiye'de neye ihtiyacınız olduğunu bize bildirin; sizin için düzenleyelim.",
      features: [{ title: "Geniş hizmet yelpazesi", description: "20'den fazla farklı ek hizmet." }, { title: "Tam özelleştirme", description: "Belirttiğiniz isteğe göre düzenleme." }, { title: "Adil fiyatlar", description: "Aracısız, rekabetçi fiyatlar." }, { title: "VIP hizmet", description: "Her ayrıntıda seçkin bir deneyim." }],
      included: ["İhtiyacınız olan hizmeti belirlemek için danışmanlık", "Hizmet sağlayıcılarla eksiksiz koordinasyon", "Rezervasyon ve randevu onayı", "Hizmet tamamlanana kadar takip", "7/24 destek"],
      excluded: ["Hizmetin kendisinin ücrete tabi maliyeti", "Kişisel alışverişler", "Bahşişler"],
    },
    "student-services": {
      description: "CASANOSTRA olarak akademik geleceğinizin başlangıcının, karmaşadan uzak ve konforlu bir başlangıcı hak ettiğine inanıyoruz. Bu nedenle kapsamlı \"Öğrenci Hizmetleri\" paketini; Türkiye'de eğitim almayı düşündüğünüz andan üniversitenizde tamamen yerleşene kadar güvenilir danışmanınız, hukuki ve lojistik destekçiniz olacak şekilde tasarladık.",
      features: [],
      included: [],
      excluded: [],
      heroImageAlt: "Üniversite öğrencileri kampüs binasının önünde birlikte yürüyor",
      galleryImagesAlt: ["Havalimanına bavuluyla yeni gelen bir öğrenci", "Ders çalışmaya hazır, döşenmiş bir öğrenci odası", "Üniversite kütüphanesinde ders çalışan öğrenciler"],
      bundle: {
        heading: "Kapsamlı öğrenci hizmetleri paketimiz",
        items: [
          { title: "Üniversite kabulleri", description: "Türkiye'nin en iyi vakıf üniversitelerinde akademik kabulünüzü sağlıyor ve geleceğinize en uygun bölümü seçmeniz için danışmanlık sunuyoruz." },
          { title: "Uygun öğrenci yurdunun sağlanması", description: "Kampüsünüze yakın, bütçenize uygun, güvenli ve konforlu konaklama seçenekleri (öğrenci yurtları veya paylaşımlı daireler) sunuyoruz." },
          { title: "En uygun uçak biletlerinin rezervasyonu", description: "Seyahat masraflarınızı azaltmak için öğrencilere özel en iyi uçak bileti fırsatlarını sağlıyoruz." },
          { title: "Lüks transfer ve karşılama hizmetleri", description: "Varışınızda sizi havalimanında VIP araç filomuzla karşılıyor ve konaklayacağınız yere konfor ve güven içinde ulaştırıyoruz." },
          { title: "Öğrenci oturma izni ve sağlık sigortası", description: "Öğrenci oturma izni dosyanızı hazırlamak, randevu almak ve zorunlu onaylı sağlık sigortasını sağlamak için tüm yasal işlemleri üstleniyoruz." },
          { title: "Lise ve üniversite diplomalarının denkliği", description: "Türkiye Cumhuriyeti Yükseköğretim Kurulu nezdinde denklik işlemlerinin yürütülmesine ve gerekli belgelerin hazırlanmasına yardımcı oluyoruz." },
          { title: "Banka hesabı açma", description: "Resmî bir Türk banka hesabı açmanız ve banka kartınızı almanız için adım adım yanınızdayız; böylece mali işlemleriniz kolaylaşır." },
          { title: "SIM kart temini", description: "Varışınızda Türk telefon hattı satın almanıza, hattı kullanıma açmanıza ve öğrenci kullanımına uygun internet paketlerini seçmenize yardımcı oluyoruz." },
          { title: "Öğrenci ulaşım kartının temini", description: "Şehir içinde ekonomik ve kolay ulaşım için öğrencilere özel indirimli ulaşım kartını (İndirimli Kart) çıkarıyoruz." },
        ],
      },
      universities: {
        heading: "Türkiye'nin köklü üniversitelerinden iş ortaklarımız",
        intro: "CASANOSTRA olarak Türkiye'nin en köklü ve en güçlü üniversitelerinin yetkili temsilcisiyiz; bu iş birliği sayesinde size garantili kontenjan ve özel indirimler sunuyoruz:",
        items: [
          { name: "Haliç Üniversitesi", official: "" },
          { name: "Üsküdar Üniversitesi", official: "" },
          { name: "Fenerbahçe Üniversitesi", official: "" },
          { name: "Beykent Üniversitesi", official: "" },
          { name: "Kent Üniversitesi", official: "" },
          { name: "Beykoz Üniversitesi", official: "" },
        ],
      },
      promo: {
        heading: "Türkiye'deki kapsamlı öğrenci hizmetleri paketinde özel indirim.",
        description: "Kapsamlı öğrenci hizmetleri paketini (kabul, oturma izni, konaklama ve karşılama) talep ettiğinizde özel indirim kazanın.",
      },
    },
  },
  fr: {
    "reservations-turkey": {
      description: "Nous vous aidons à obtenir et à renouveler tous les types de titres de séjour légaux en Turquie, simplement et professionnellement, en suivant toutes les démarches officielles et en vous conseillant pour que votre demande aboutisse le plus vite possible. Que vous fassiez une première demande ou que vous renouveliez votre titre actuel, l'équipe CASANOSTRA vous accompagne pas à pas jusqu'à la réception de votre carte de séjour. Nous prenons en charge : le séjour touristique, étudiant, immobilier, de travail, familial et de longue durée (permanent).",
      features: [{ title: "Suivi professionnel", description: "Suivi complet de votre dossier du dépôt jusqu'à l'obtention du titre de séjour." }, { title: "Gain de temps et d'efforts", description: "Démarches officielles réalisées efficacement et rapidement." }, { title: "Conseils juridiques", description: "Orientation pour choisir le type de séjour le plus adapté à votre situation." }, { title: "Assistance continue", description: "Service client via WhatsApp tout au long de la procédure." }],
      included: ["Consultation gratuite pour déterminer le type de séjour adapté", "Prise de rendez-vous à la direction de l'immigration", "Préparation et vérification du dossier de séjour", "Remplissage de la demande de séjour en ligne", "Suivi des démarches de dépôt", "Aide à l'obtention d'une assurance santé si nécessaire", "Assistance et conseils jusqu'à la réception de la carte de séjour"],
      excluded: ["Frais officiels de la direction de l'immigration", "Frais d'assurance santé obligatoire", "Frais de traduction et de légalisation (le cas échéant)", "Frais de notaire", "Frais d'émission ou de renouvellement du passeport", "Tout autre frais officiel imposé par les autorités compétentes"],
      marketing: { title: "Obtenez votre titre de séjour en Turquie en toute simplicité avec CASANOSTRA", subtitle: "Un suivi professionnel pour les titres de séjour touristique, étudiant, immobilier, familial, de travail et permanent, avec le plus haut niveau de précision et de fiabilité." },
    },
    "visa": {
      description: "Nous proposons des services de visa pour tous les pays du monde, pour les particuliers, les familles et les hommes d'affaires, avec un suivi professionnel de toutes les démarches et exigences propres à chaque pays. L'équipe CASANOSTRA prépare votre dossier de visa avec une grande précision afin de présenter une demande complète conforme aux exigences des ambassades et consulats, ce qui vous fait gagner du temps et des efforts et augmente vos chances d'acceptation. Que vous voyagiez pour le tourisme, les affaires, les études ou une visite familiale, nous vous aidons à choisir le visa adapté et à accomplir toutes les démarches jusqu'à la remise du passeport.",
      features: [{ title: "Tous les pays du monde", description: "Visas pour l'Europe, le Royaume-Uni, les États-Unis, le Canada, l'Asie, les pays du Golfe et plus encore." }, { title: "Expérience et professionnalisme", description: "Une équipe spécialisée dans les exigences des différentes ambassades et consulats." }, { title: "Suivi complet", description: "Suivi continu de toutes les étapes de la demande jusqu'à la décision." }, { title: "Gain de temps et d'efforts", description: "Préparation du dossier, prise de rendez-vous et suivi des démarches à votre place." }],
      included: ["Consultation gratuite pour déterminer le type de visa adapté", "Vérification de tous les documents requis", "Remplissage des formulaires de visa", "Prise de rendez-vous auprès des ambassades et centres de visas", "Préparation et organisation du dossier de demande", "Conseils pour l'entretien si nécessaire", "Suivi de la demande jusqu'à la délivrance du visa"],
      excluded: ["Frais officiels des ambassades et consulats", "Frais des centres de visas agréés", "Frais de traduction et de légalisation", "Frais d'assurance santé voyage", "Frais d'envoi ou de retour du passeport par la poste", "Réservations de vols et d'hôtels, sauf si elles sont demandées dans un forfait distinct"],
      marketing: { title: "Nous vous ouvrons les portes du monde avec les services de visa professionnels de CASANOSTRA", subtitle: "Obtenez votre visa facilement et rapidement grâce à une équipe spécialisée qui s'occupe de toutes les démarches pour un visa de voyage vers les pays du monde entier." },
    },
    "vip-cars": {
      description: "Profitez d'un voyage luxueux et confortable en Turquie avec le service Mercedes Vito VIP, destiné à l'accueil et au départ aux aéroports et aux transferts privés à Istanbul. Que vous voyagiez pour le tourisme ou les affaires, nous mettons à votre disposition un véhicule de luxe avec chauffeur professionnel pour un confort, une sécurité et une discrétion optimaux. Le service est disponible pour l'accueil et le départ aéroport, les déplacements en ville, les excursions privées ou la location à la journée d'une voiture avec chauffeur selon vos besoins.",
      features: [{ title: "Accueil et départ aéroport", description: "Accueil professionnel dans tous les aéroports d'Istanbul avec suivi des vols." }, { title: "Véhicules Mercedes Vito VIP", description: "Véhicules de luxe avec sièges confortables, grand espace et standards de confort élevés." }, { title: "Chauffeurs professionnels", description: "Chauffeurs très expérimentés, ponctuels et professionnels." }, { title: "Flexibilité totale", description: "Réservation pour un trajet, une journée entière ou plusieurs jours." }],
      included: ["Mercedes Vito VIP privée", "Chauffeur professionnel pendant toute la réservation", "Accueil ou départ aéroport", "Carburant et péages sur l'itinéraire convenu", "Eau et rafraîchissements dans le véhicule", "Suivi du vol des voyageurs", "Assurance complète pour le véhicule et les passagers", "Assistance directe via WhatsApp"],
      excluded: ["Frais de stationnement privé sur demande", "Trajets hors de l'itinéraire ou du programme convenu", "Excursions nécessitant des billets d'entrée", "Hébergement ou repas du chauffeur lors des trajets entre villes", "Toute demande ou service supplémentaire non mentionné dans l'offre"],
      marketing: { title: "Voyagez avec élégance avec le service Mercedes Vito VIP en Turquie", subtitle: "Accueil et transfert aéroport, déplacements privés à Istanbul et voiture avec chauffeur professionnel pour une journée entière ou plusieurs jours, avec le plus haut niveau de confort et d'intimité." },
    },
    hotels: {
      description: "Réservez des hôtels en Turquie à des tarifs exclusifs grâce à nos relations directes avec des hôtels et complexes haut de gamme à Istanbul, Antalya, Bodrum, Trabzon et Kayseri. Nous proposons des réductions pouvant atteindre 40 % sur les tarifs officiels. Que vous cherchiez une vue sur le Bosphore, un complexe balnéaire à Antalya ou un hôtel historique à Sultanahmet, nous vous aidons à trouver le séjour adapté.",
      features: [{ title: "Réductions exclusives", description: "Jusqu'à 40 % de moins que les plateformes internationales." }, { title: "Large sélection", description: "Plus de 500 hôtels et complexes en Turquie." }, { title: "Emplacements de choix", description: "Hôtels dans les principales zones touristiques." }, { title: "Confirmation rapide", description: "Confirmation de réservation en quelques minutes par WhatsApp." }],
      included: ["Réservation d'une chambre dans un hôtel quatre ou cinq étoiles", "Garantie du meilleur tarif", "Accueil à l'arrivée", "Assistance 24h/24 et 7j/7 pendant le séjour", "Petit-déjeuner offert dans la plupart des hôtels"],
      excluded: ["Déjeuner et dîner", "Services de blanchisserie et de repassage", "Frais de séjour facturés par certains hôtels"],
    },
    flights: {
      description: "Nous organisons des billets à des tarifs compétitifs sur des compagnies turques et internationales, notamment Turkish Airlines, Iraqi Airways, Saudia et Air Arabia. Choisissez entre la classe économique et la classe affaires. Notre service comprend la recherche de vols adaptés, la réservation, l'émission du billet et l'assistance en cas de changement d'horaire. Nous proposons aussi des réservations de groupe à tarifs spéciaux pour les familles et les groupes touristiques.",
      features: [{ title: "Grandes compagnies aériennes", description: "Compagnies turques, arabes et internationales." }, { title: "Tarifs compétitifs", description: "Des options conçues pour rivaliser avec les prix en ligne." }, { title: "Choix flexibles", description: "Économique, affaires et première classe." }, { title: "Réservations de groupe", description: "Tarifs spéciaux pour les familles et les groupes." }],
      included: ["Recherche du meilleur vol selon le prix et l'horaire", "Émission du billet électronique", "Envoi du billet par WhatsApp et e-mail", "Assistance en cas de changement de vol", "Conseils sur les visas et les correspondances"],
      excluded: ["Frais d'excédent de bagages selon la politique de la compagnie", "Repas spéciaux à bord", "Assurance voyage"],
    },
    "daily-tours": {
      description: "Profitez des plus belles excursions à la journée au départ d'Istanbul avec CASANOSTRA : nous proposons des programmes touristiques complets vers les destinations naturelles et historiques les plus célèbres de Turquie. Que vous souhaitiez découvrir la rive européenne ou asiatique d'Istanbul, ou passer une journée en pleine nature à Bursa, Sapanca ou Yalova, nous vous offrons une expérience confortable et agréable avec des transports modernes et un service professionnel. Nos programmes comprennent : Istanbul côté européen, Istanbul côté asiatique, Sapanca et Maşukiye, Bursa et le mont Uludağ, Yalova, Düzce, Şile et Ağva, les îles des Princes et un dîner de luxe sur le Bosphore.",
      features: [{ title: "Programmes variés", description: "Les excursions et circuits les plus populaires à Istanbul et dans ses environs." }, { title: "Transport confortable", description: "Voitures et bus modernes et climatisés pour le confort des voyageurs." }, { title: "Organisation professionnelle", description: "Programmes soigneusement conçus pour profiter d'un maximum de sites et d'activités." }, { title: "Excursions quotidiennes", description: "Départs quotidiens avec des options adaptées aux voyageurs individuels, aux familles et aux groupes." }],
      included: ["Transport aller-retour depuis les points de rendez-vous", "Voiture ou bus climatisé et confortable", "Organisation complète du programme touristique", "Visite des sites mentionnés dans le programme", "Assistance et suivi pendant toute l'excursion", "Assurance du transport pendant le programme"],
      excluded: ["Billets d'entrée aux sites et activités optionnelles", "Dépenses personnelles", "Repas et boissons sauf mention dans le programme", "Frais de téléphérique ou activités payantes", "Pourboires facultatifs", "Tout service non mentionné dans les prestations incluses"],
      marketing: { title: "Découvrez les plus belles destinations de Turquie avec les excursions quotidiennes CASANOSTRA 🌍✨", subtitle: "Profitez d'excursions privilégiées vers Bursa, Sapanca, Yalova, Şile, les îles des Princes, Istanbul européenne et asiatique, ainsi que d'un dîner de luxe sur le Bosphore, avec le plus haut niveau de confort et d'organisation." },
    },
    "private-tours": {
      description: "Composez un itinéraire privé en Turquie selon vos envies et votre budget. Découvrez la Cappadoce en montgolfière, les plages d'Antalya, les sources thermales de Pamukkale, les châteaux byzantins de Trabzon ou les montagnes verdoyantes de Rize. Nous créons un programme entièrement personnalisé avec une voiture de luxe et un chauffeur ou guide arabophone pendant tout le voyage, ainsi que des séjours dans des hôtels haut de gamme.",
      features: [{ title: "Sur mesure", description: "Un itinéraire entièrement adapté à vos envies." }, { title: "Guide privé", description: "Guide et chauffeur arabophone pendant tout le voyage." }, { title: "Voiture de luxe", description: "Mercedes V-Class ou BMW." }, { title: "Flexibilité totale", description: "Modifiez votre programme à tout moment pendant le voyage." }],
      included: ["Voiture de luxe avec chauffeur ou guide arabophone", "Carburant et stationnement pendant le voyage", "Réservation d'hôtels dans chaque ville", "Organisation des petits-déjeuners à l'hôtel", "Assistance 24h/24 et 7j/7 pendant le voyage"],
      excluded: ["Vols internationaux", "Déjeuner et dîner", "Billets d'entrée aux attractions", "Activités optionnelles comme les montgolfières ou la plongée"],
    },
    "group-tours": {
      description: "Voyages de groupe entièrement organisés pour les grandes familles, les amis et les délégations professionnelles. Les forfaits peuvent inclure vols, hébergement, transport, excursions, repas et autres détails. Des tarifs spéciaux sont proposés aux groupes de dix personnes ou plus, avec des itinéraires personnalisables. Convient aux voyages d'entreprise, scolaires, familiaux et aux séjours de vacances en groupe.",
      features: [{ title: "Remises de groupe", description: "Tarifs spéciaux pour les groupes de plus de dix personnes." }, { title: "Programme complet", description: "Vols, hébergement, excursions et transport." }, { title: "Guide de groupe", description: "Guide arabophone dédié pendant tout le voyage." }, { title: "Autocars de luxe", description: "Autocars climatisés pouvant accueillir jusqu'à 45 personnes." }],
      included: ["Autocar de luxe climatisé pour le groupe", "Guide touristique arabophone pendant tout le voyage", "Réservation d'hôtel quatre ou cinq étoiles pour le groupe", "Petit-déjeuner et déjeuner", "Billets d'entrée aux attractions", "Coordination complète du programme quotidien"],
      excluded: ["Vols internationaux", "Dîner, disponible en supplément", "Achats personnels", "Pourboires"],
    },
    "hajj-umrah": {
      description: "Nous organisons des forfaits complets pour le Hajj et la Omra via la Turquie : visa d'entrée en Arabie saoudite, vols depuis votre pays vers Djeddah ou Médine, hôtels proches du Haram, transport entre les lieux saints et repas pendant tout le voyage. Nos forfaits sont conçus pour vous permettre d'accomplir le pèlerinage dans le confort et la sérénité. Notre équipe est spécialisée dans la logistique du Hajj et de la Omra.",
      features: [{ title: "Forfaits complets", description: "Vols, hébergement, transport et repas." }, { title: "Près du Haram", description: "Hôtels à quelques minutes du Haram." }, { title: "Guide religieux", description: "Guide spécialisé dans les rites du pèlerinage." }, { title: "En toute sérénité", description: "Tous les détails sont organisés à l'avance." }],
      included: ["Visa pour le Hajj ou la Omra", "Vols de votre pays vers l'Arabie saoudite", "Hébergement dans des hôtels proches du Haram", "Transport entre La Mecque, Médine et les lieux saints", "Pension complète pendant le voyage", "Guide religieux spécialisé"],
      excluded: ["Cadeaux et achats personnels", "Sacrifices, qui peuvent être organisés séparément", "Pourboires"],
    },
    "medical-tourism": {
      description: "Nous proposons des services de tourisme médical en Turquie en collaboration avec des hôpitaux et centres médicaux spécialisés de premier plan, pour vous offrir une expérience de soins complète alliant qualité médicale élevée et service professionnel. L'équipe CASANOSTRA s'occupe de tous les préparatifs de votre voyage de soins, de la consultation initiale à la fin du traitement et au suivi. Nos services comprennent : greffe de cheveux, esthétique dentaire, chirurgie esthétique, traitement de l'obésité et chirurgie de perte de poids, traitement et correction des problèmes oculaires.",
      features: [{ title: "Centres médicaux spécialisés", description: "Nous travaillons avec les meilleurs hôpitaux et cliniques dans de nombreux domaines de soins." }, { title: "Médecins expérimentés", description: "Des médecins et consultants de renom, accrédités à l'international." }, { title: "Interprète arabe", description: "Accompagnement et interprétariat médical en arabe pendant toute la durée du traitement." }, { title: "Suivi intégré", description: "Suivi avant, pendant et après le traitement, une fois de retour dans votre pays." }],
      included: ["Consultation médicale initiale gratuite", "Étude et évaluation du dossier médical", "Coordination des rendez-vous avec le médecin ou le centre médical", "Accueil et suivi du patient pendant tout le traitement", "Interprétariat médical en arabe", "Réservation d'un hôtel adapté près du centre médical", "Transferts entre l'aéroport, l'hôtel et le centre médical", "Suivi après traitement si nécessaire"],
      excluded: ["Frais d'hébergement supplémentaires hors du programme convenu", "Billets d'avion internationaux", "Dépenses personnelles"],
      marketing: { title: "Votre voyage vers une meilleure santé commence en Turquie avec CASANOSTRA ✨", subtitle: "Nous proposons des solutions complètes en greffe de cheveux, esthétique dentaire, chirurgie esthétique, traitement de l'obésité et soins des yeux, avec un suivi professionnel et des services VIP qui vous garantissent confort et confiance à chaque étape." },
    },
    "other-services": {
      description: "Nous proposons des services complémentaires pour votre séjour en Turquie : réservations dans des restaurants raffinés, organisation d'événements et de célébrations, location de yachts privés, billets pour des rencontres sportives, traduction et accompagnement, organisation de lunes de miel, spas et bains turcs. Indiquez-nous vos besoins en Turquie et nous organiserons le service demandé.",
      features: [{ title: "Large choix", description: "Plus de 20 services complémentaires différents." }, { title: "Personnalisation complète", description: "Service organisé selon votre demande précise." }, { title: "Prix justes", description: "Tarifs compétitifs sans intermédiaires." }, { title: "Service VIP", description: "Une expérience haut de gamme dans chaque détail." }],
      included: ["Conseil pour définir le service souhaité", "Coordination complète avec les prestataires", "Réservation et confirmation du rendez-vous", "Suivi jusqu'à la fin du service", "Assistance 24h/24 et 7j/7"],
      excluded: ["Coût du service lui-même, déterminé selon la demande", "Achats personnels", "Pourboires"],
    },
    "student-services": {
      description: "Chez CASANOSTRA, nous croyons que le début de votre avenir académique mérite des débuts sereins, sans complications. C'est pourquoi nous avons conçu le pack complet « Services Étudiants » pour être votre conseiller de confiance et votre soutien juridique et logistique, depuis le moment où vous envisagez d'étudier en Turquie jusqu'à votre installation complète à l'université.",
      features: [],
      included: [],
      excluded: [],
      heroImageAlt: "Étudiants universitaires marchant ensemble devant un bâtiment du campus",
      galleryImagesAlt: ["Un étudiant arrivant à l'aéroport avec sa valise", "Une chambre d'étudiant meublée et prête pour les études", "Des étudiants travaillant dans la bibliothèque universitaire"],
      bundle: {
        heading: "Notre pack complet de services étudiants",
        items: [
          { title: "Obtention des admissions universitaires", description: "Nous vous garantissons votre admission académique dans les meilleures universités privées de Turquie et vous conseillons pour choisir la filière la plus adaptée à votre avenir." },
          { title: "Réservation d'un logement étudiant adapté", description: "Nous vous proposons des options de logement sûres et confortables — résidences étudiantes ou appartements partagés — proches de votre campus et adaptées à votre budget." },
          { title: "Réservation des billets d'avion les moins chers", description: "Nous vous obtenons les meilleures offres de vols réservées aux étudiants afin de réduire vos frais de voyage." },
          { title: "Services de transfert et d'accueil de luxe", description: "Nous vous accueillons à l'aéroport dès votre arrivée avec notre flotte de voitures VIP et vous conduisons à votre logement en tout confort et en toute sécurité." },
          { title: "Permis de séjour étudiant et assurance santé", description: "Nous prenons en charge toutes les démarches légales pour préparer votre dossier de permis de séjour étudiant, prendre le rendez-vous et fournir l'assurance santé obligatoire agréée." },
          { title: "Équivalence des diplômes du secondaire et de l'université", description: "Nous vous aidons à accomplir les démarches d'équivalence des diplômes (Denklik) et à préparer les documents requis auprès du Conseil turc de l'enseignement supérieur." },
          { title: "Ouverture d'un compte bancaire", description: "Nous vous accompagnons pas à pas pour ouvrir un compte bancaire turc officiel et obtenir votre carte bancaire, afin de faciliter vos opérations financières." },
          { title: "Obtention d'une carte SIM", description: "Nous vous aidons à acheter et activer une ligne téléphonique turque et à souscrire les forfaits internet adaptés à un usage étudiant dès votre arrivée." },
          { title: "Obtention de la carte de transport étudiante", description: "Nous obtenons la carte de transport étudiante à tarif réduit (İndirimli Kart) pour des déplacements faciles et économiques en ville." },
        ],
      },
      universities: {
        heading: "Nos partenaires parmi les universités turques de longue tradition",
        intro: "Chez CASANOSTRA, nous sommes agents agréés des universités les plus prestigieuses et les plus solides de Turquie ; grâce à ce partenariat, nous vous garantissons des places réservées et des réductions exclusives :",
        items: [
          { name: "Université Haliç", official: "Haliç Üniversitesi" },
          { name: "Université Üsküdar", official: "Üsküdar Üniversitesi" },
          { name: "Université Fenerbahçe", official: "Fenerbahçe Üniversitesi" },
          { name: "Université Beykent", official: "Beykent Üniversitesi" },
          { name: "Université Kent", official: "Kent Üniversitesi" },
          { name: "Université Beykoz", official: "Beykoz Üniversitesi" },
        ],
      },
      promo: {
        heading: "Une réduction spéciale sur le pack complet des services étudiants en Turquie.",
        description: "Bénéficiez d'une réduction exclusive lorsque vous demandez le pack complet des services étudiants (admission, permis de séjour, logement et accueil à l'aéroport).",
      },
    },
  },
  ru: {
    "reservations-turkey": {
      description: "Мы помогаем получать и продлевать все виды законного вида на жительство (ВНЖ) в Турции просто и профессионально: ведём все официальные процедуры и консультируем, чтобы заявление было одобрено как можно быстрее. Подаёте ли вы документы впервые или продлеваете действующий ВНЖ, команда CASANOSTRA сопровождает вас шаг за шагом до получения карты. Мы оформляем: туристический ВНЖ, студенческий ВНЖ, ВНЖ по недвижимости, рабочий ВНЖ, семейный ВНЖ и постоянный (долгосрочный) ВНЖ.",
      features: [{ title: "Профессиональное сопровождение", description: "Полное сопровождение вашего дела от подачи до получения ВНЖ." }, { title: "Экономия времени и сил", description: "Официальные процедуры выполняются быстро и эффективно." }, { title: "Юридические консультации", description: "Помощь в выборе типа ВНЖ, который лучше всего подходит вам." }, { title: "Постоянная поддержка", description: "Клиентская служба в WhatsApp на всех этапах оформления." }],
      included: ["Бесплатная консультация по выбору подходящего типа ВНЖ", "Запись на приём в миграционную службу", "Подготовка и проверка пакета документов", "Заполнение электронной заявки на ВНЖ", "Сопровождение процедуры подачи", "Помощь в оформлении медицинской страховки при необходимости", "Поддержка и консультации до получения карты ВНЖ"],
      excluded: ["Государственные сборы миграционной службы", "Обязательная медицинская страховка", "Расходы на перевод и заверение (при необходимости)", "Услуги нотариуса", "Расходы на выдачу или продление загранпаспорта", "Любые другие государственные сборы, установленные компетентными органами"],
      marketing: { title: "Получите вид на жительство в Турции легко с CASANOSTRA", subtitle: "Профессиональное сопровождение оформления туристического, студенческого, «недвижимого», семейного, рабочего и постоянного ВНЖ с максимальной точностью и надёжностью." },
    },
    "visa": {
      description: "Мы оформляем визы в любые страны мира для частных лиц, семей и деловых путешественников, профессионально сопровождая все процедуры и требования каждой страны. Команда CASANOSTRA тщательно готовит визовое дело, чтобы заявление было полным и соответствовало требованиям посольств и консульств, — это экономит ваше время и силы и повышает шансы на одобрение. Путешествуете ли вы с туристической, деловой, учебной или семейной целью, мы поможем выбрать подходящую визу и пройти все этапы до получения паспорта.",
      features: [{ title: "Все страны мира", description: "Визы в Европу, Великобританию, США, Канаду, Азию, страны Персидского залива и другие." }, { title: "Опыт и профессионализм", description: "Команда, специализирующаяся на требованиях разных посольств и консульств." }, { title: "Полное сопровождение", description: "Постоянное сопровождение всех этапов заявки до принятия решения." }, { title: "Экономия времени и сил", description: "Готовим документы, записываем на приём и ведём процедуры вместо вас." }],
      included: ["Бесплатная консультация по выбору подходящего типа визы", "Проверка всех необходимых документов", "Заполнение визовых анкет", "Запись на приём в посольства и визовые центры", "Подготовка и оформление пакета документов", "Рекомендации к собеседованию при необходимости", "Сопровождение заявки до выдачи визы"],
      excluded: ["Официальные сборы посольств и консульств", "Сборы аккредитованных визовых центров", "Расходы на перевод и заверение", "Туристическая медицинская страховка", "Расходы на доставку или возврат паспорта почтой", "Бронирование авиабилетов и отелей, если не заказано отдельным пакетом"],
      marketing: { title: "Мы открываем перед вами двери мира с профессиональными визовыми услугами CASANOSTRA", subtitle: "Получите визу легко и быстро с помощью команды специалистов, которая берёт на себя все процедуры для оформления визы в страны по всему миру." },
    },
    "vip-cars": {
      description: "Путешествуйте по Турции роскошно и комфортно с услугой Mercedes Vito VIP — для встречи и проводов в аэропортах и частных трансферов по Стамбулу. Отправляетесь ли вы в туристическую или деловую поездку, мы предоставим премиальный автомобиль с профессиональным водителем для максимального комфорта, безопасности и приватности. Услуга доступна для встречи и проводов в аэропорту, поездок по городу, частных экскурсий или аренды автомобиля с водителем на день по вашим потребностям.",
      features: [{ title: "Встреча и проводы в аэропорту", description: "Профессиональная встреча во всех аэропортах Стамбула с отслеживанием рейсов." }, { title: "Автомобили Mercedes Vito VIP", description: "Премиальные автомобили с удобными сиденьями, просторным салоном и высоким уровнем комфорта." }, { title: "Профессиональные водители", description: "Опытные водители, пунктуальные и профессиональные." }, { title: "Полная гибкость", description: "Можно заказать одну поездку, целый день или несколько дней." }],
      included: ["Личный Mercedes Vito VIP", "Профессиональный водитель на весь период бронирования", "Встреча или проводы в аэропорту", "Топливо и платные дороги в рамках согласованного маршрута", "Вода и прохладительные напитки в салоне", "Отслеживание рейса для пассажиров", "Полная страховка автомобиля и пассажиров", "Прямая поддержка в WhatsApp"],
      excluded: ["Плата за частную парковку по запросу", "Поездки вне согласованного маршрута или программы", "Экскурсии, требующие входных билетов", "Проживание и питание водителя в междугородних поездках", "Любые дополнительные заказы и услуги, не указанные в предложении"],
      marketing: { title: "Путешествуйте стильно с услугой Mercedes Vito VIP в Турции", subtitle: "Встреча и проводы в аэропортах, частные поездки по Стамбулу и автомобиль с профессиональным водителем на целый день или несколько дней с высочайшим уровнем комфорта и приватности." },
    },
    hotels: {
      description: "Бронируйте отели в Турции по специальным ценам благодаря прямым отношениям с премиальными отелями и курортами в Стамбуле, Анталье, Бодруме, Трабзоне и Кайсери. Скидки достигают 40% от официальной стоимости. Мы поможем подобрать проживание: от отеля с видом на Босфор до пляжного курорта в Анталье или исторического отеля в Султанахмете.",
      features: [{ title: "Эксклюзивные скидки", description: "До 40% ниже цен международных платформ бронирования." }, { title: "Большой выбор", description: "Более 500 отелей и курортов по всей Турции." }, { title: "Удобное расположение", description: "Отели в популярных туристических районах." }, { title: "Быстрое подтверждение", description: "Подтверждение бронирования в WhatsApp за несколько минут." }],
      included: ["Бронирование номера в четырёх- или пятизвёздочном отеле", "Гарантия лучшей цены", "Встреча по прибытии", "Поддержка 24/7 во время проживания", "Бесплатный завтрак в большинстве отелей"],
      excluded: ["Обед и ужин", "Услуги прачечной и глажки", "Сборы курорта, взимаемые некоторыми отелями"],
    },
    flights: {
      description: "Мы подбираем выгодные билеты турецких и международных авиакомпаний, включая Turkish Airlines, Iraqi Airways, Saudia и Air Arabia. Доступны экономический и бизнес-класс. Услуга включает поиск подходящего рейса, бронирование, оформление билета и помощь при изменении расписания. Для семей и туристических групп доступны специальные условия группового бронирования.",
      features: [{ title: "Ведущие авиакомпании", description: "Турецкие, арабские и международные перевозчики." }, { title: "Конкурентные тарифы", description: "Варианты, сопоставимые с онлайн-ценами." }, { title: "Гибкий выбор", description: "Экономический, бизнес- и первый класс." }, { title: "Групповое бронирование", description: "Специальные тарифы для семей и групп." }],
      included: ["Поиск лучшего рейса по цене и расписанию", "Оформление электронного билета", "Отправка билета через WhatsApp и электронную почту", "Помощь при изменении рейса", "Консультация по визовым требованиям и пересадкам"],
      excluded: ["Плата за перевес согласно правилам авиакомпании", "Специальное питание на борту", "Страхование путешествия"],
    },
    "daily-tours": {
      description: "Откройте для себя лучшие однодневные поездки из Стамбула с CASANOSTRA: мы предлагаем полноценные туристические программы к самым известным природным и историческим местам Турции. Хотите ли вы исследовать европейскую или азиатскую часть Стамбула или провести день на природе в Бурсе, Сапандже или Ялове — мы обеспечим комфортную и приятную поездку с современным транспортом и профессиональным сервисом. Наши программы: поездка по европейской части Стамбула, поездка по азиатской части Стамбула, Сапанджа и Машукие, Бурса и гора Улудаг, Ялова, Дюздже, Шиле и Агва, Принцевы острова и роскошный ужин на Босфоре.",
      features: [{ title: "Разнообразные программы", description: "Самые популярные поездки и экскурсии по Стамбулу и окрестностям." }, { title: "Комфортный транспорт", description: "Современные автомобили и автобусы с кондиционером для комфорта пассажиров." }, { title: "Профессиональная организация", description: "Тщательно продуманные программы, чтобы вы увидели как можно больше достопримечательностей." }, { title: "Ежедневные поездки", description: "Ежедневные выезды с вариантами для индивидуальных путешественников, семей и групп." }],
      included: ["Трансфер туда и обратно от согласованных мест сбора", "Комфортный автомобиль или автобус с кондиционером", "Полная организация туристической программы", "Посещение достопримечательностей, указанных в программе", "Поддержка и сопровождение в течение всей поездки", "Страхование перевозки на время программы"],
      excluded: ["Входные билеты в достопримечательности и дополнительные активности", "Личные расходы", "Еда и напитки, если не указаны в программе", "Плата за канатную дорогу и платные активности", "Чаевые по желанию", "Любые услуги, не указанные в разделе «Включено»"],
      marketing: { title: "Откройте самые красивые места Турции с ежедневными турами CASANOSTRA 🌍✨", subtitle: "Насладитесь особыми поездками в Бурсу, Сапанджу, Ялову, Шиле, на Принцевы острова, по европейской и азиатской частям Стамбула, а также роскошным ужином на Босфоре с высочайшим уровнем комфорта и организации." },
    },
    "private-tours": {
      description: "Составьте индивидуальный маршрут по Турции с учётом ваших предпочтений и бюджета. Посетите Каппадокию на воздушном шаре, пляжи Антальи, термальные источники Памуккале, византийские замки Трабзона или зелёные горы Ризе. Мы подготовим полностью персональную программу с премиальным автомобилем и арабоязычным водителем или гидом на протяжении всей поездки, а также проживанием в лучших отелях.",
      features: [{ title: "По вашему запросу", description: "Маршрут полностью соответствует вашим пожеланиям." }, { title: "Личный гид", description: "Арабоязычный гид и водитель на протяжении поездки." }, { title: "Премиальный автомобиль", description: "Mercedes V-Class или BMW." }, { title: "Полная гибкость", description: "Меняйте планы в любое время во время поездки." }],
      included: ["Премиальный автомобиль с арабоязычным водителем или гидом", "Топливо и парковка на протяжении поездки", "Бронирование отелей в каждом городе", "Организация завтраков в отелях", "Поддержка 24/7 во время поездки"],
      excluded: ["Международные авиабилеты", "Обед и ужин", "Входные билеты к достопримечательностям", "Дополнительные развлечения, например полёты на шарах или дайвинг"],
    },
    "group-tours": {
      description: "Полностью организованные групповые поездки для больших семей, компаний друзей и корпоративных делегаций. Пакет может включать перелёты, проживание, транспорт, экскурсии, питание и все необходимые детали. Для групп от десяти человек действуют специальные цены; маршруты можно настроить по пожеланиям. Подходит для корпоративных, школьных, семейных и праздничных поездок.",
      features: [{ title: "Скидки для групп", description: "Специальные цены для групп более десяти человек." }, { title: "Полная программа", description: "Перелёты, проживание, экскурсии и транспорт." }, { title: "Групповой гид", description: "Персональный арабоязычный гид на протяжении поездки." }, { title: "Комфортабельные автобусы", description: "Автобусы с кондиционером вместимостью до 45 человек." }],
      included: ["Комфортабельный автобус с кондиционером для группы", "Арабоязычный экскурсовод на протяжении поездки", "Бронирование четырёх- или пятизвёздочного отеля для группы", "Завтрак и обед", "Входные билеты к достопримечательностям", "Полная координация ежедневной программы"],
      excluded: ["Международные авиабилеты", "Ужин, который можно добавить отдельно", "Личные покупки", "Чаевые"],
    },
    "hajj-umrah": {
      description: "Мы организуем комплексные поездки для Хаджа и Умры через Турцию: въездную визу в Саудовскую Аравию, перелёты из вашей страны в Джидду или Медину, отели рядом с Харам, транспорт между святыми местами и питание на протяжении поездки. Пакеты составлены для комфортного и спокойного совершения паломничества. Наша команда специализируется на организации поездок для Хаджа и Умры.",
      features: [{ title: "Комплексные пакеты", description: "Перелёты, проживание, транспорт и питание." }, { title: "Рядом с Харам", description: "Отели в нескольких минутах от Харам." }, { title: "Религиозный гид", description: "Специалист по обрядам паломничества." }, { title: "Спокойствие и комфорт", description: "Все детали организованы заранее." }],
      included: ["Виза для Хаджа или Умры", "Авиабилеты из вашей страны в Саудовскую Аравию", "Проживание в отелях рядом с Харам", "Транспорт между Меккой, Мединой и святыми местами", "Полное питание на протяжении поездки", "Специализированный религиозный гид"],
      excluded: ["Подарки и личные покупки", "Жертвоприношение, которое можно организовать отдельно", "Чаевые"],
    },
    "medical-tourism": {
      description: "Мы организуем медицинский туризм в Турции в сотрудничестве с ведущими больницами и специализированными медицинскими центрами и обеспечиваем комплексное лечение, сочетающее высокое качество медицины и профессиональный сервис. Команда CASANOSTRA берёт на себя все организационные вопросы вашей лечебной поездки — от первичной консультации до завершения лечения и последующего наблюдения. Наши направления: пересадка волос, эстетическая стоматология, косметические операции, лечение ожирения и бариатрическая хирургия, лечение и коррекция зрения.",
      features: [{ title: "Специализированные медицинские центры", description: "Работаем с ведущими больницами и клиниками в разных областях лечения." }, { title: "Опытные врачи", description: "Ведущие врачи и консультанты с международной аккредитацией." }, { title: "Арабскоязычный переводчик", description: "Сопровождение и медицинский перевод на арабский язык на протяжении всего лечения." }, { title: "Комплексное наблюдение", description: "Наблюдение до, во время и после лечения — в том числе после возвращения в вашу страну." }],
      included: ["Бесплатная первичная медицинская консультация", "Изучение и оценка медицинского случая", "Согласование приёма с врачом или медицинским центром", "Встреча и сопровождение пациента на протяжении всего лечения", "Медицинский перевод на арабский язык", "Бронирование подходящего отеля рядом с медицинским центром", "Трансферы между аэропортом, отелем и медицинским центром", "Наблюдение после лечения при необходимости"],
      excluded: ["Дополнительные расходы на проживание вне согласованной программы", "Международные авиабилеты", "Личные расходы"],
      marketing: { title: "Ваш путь к лучшему здоровью начинается в Турции с CASANOSTRA ✨", subtitle: "Мы предлагаем комплексные решения в области пересадки волос, стоматологической эстетики, пластической хирургии, лечения ожирения и глазных заболеваний с профессиональным сопровождением и VIP-услугами, дающими комфорт и уверенность на каждом шаге." },
    },
    "other-services": {
      description: "Мы предлагаем дополнительные услуги для вашего пребывания в Турции: бронирование ресторанов высокой кухни, организацию мероприятий и торжеств, аренду частных яхт, билеты на спортивные матчи, перевод и сопровождение, организацию медового месяца, спа и турецкие бани. Расскажите, что вам нужно в Турции, и мы организуем выбранную услугу.",
      features: [{ title: "Широкий выбор", description: "Более 20 разных дополнительных услуг." }, { title: "Индивидуальная организация", description: "Услуга под ваши конкретные требования." }, { title: "Честные цены", description: "Выгодные тарифы без посредников." }, { title: "VIP-сервис", description: "Премиальный подход к каждой детали." }],
      included: ["Консультация для определения нужной услуги", "Полная координация с поставщиками услуг", "Бронирование и подтверждение времени", "Сопровождение до завершения услуги", "Поддержка 24/7"],
      excluded: ["Стоимость самой услуги, определяется индивидуально", "Личные покупки", "Чаевые"],
    },
    "student-services": {
      description: "В CASANOSTRA мы уверены: начало вашего академического будущего заслуживает спокойного старта без сложностей. Поэтому мы создали комплексный пакет «Студенческие услуги», чтобы стать вашим надёжным консультантом и вашей юридической и логистической поддержкой с момента, когда вы задумались об учёбе в Турции, и до полного обустройства в университете.",
      features: [],
      included: [],
      excluded: [],
      heroImageAlt: "Студенты университета идут вместе перед зданием кампуса",
      galleryImagesAlt: ["Студент приехал в аэропорт с чемоданом", "Обставленная студенческая комната, готовая для учёбы", "Студенты занимаются в университетской библиотеке"],
      bundle: {
        heading: "Наш комплексный пакет студенческих услуг",
        items: [
          { title: "Получение университетских зачислений", description: "Мы гарантируем ваше академическое зачисление в лучшие частные университеты Турции и консультируем по выбору специальности, наиболее подходящей для вашего будущего." },
          { title: "Подбор подходящего студенческого жилья", description: "Мы предлагаем безопасные и комфортные варианты проживания — студенческие общежития или совместные квартиры — рядом с вашим кампусом и в рамках вашего бюджета." },
          { title: "Бронирование самых дешёвых авиабилетов", description: "Мы подбираем лучшие предложения авиабилетов для студентов, чтобы сократить ваши расходы на поездку." },
          { title: "Услуги трансфера и встречи премиум-класса", description: "Мы встречаем вас в аэропорту сразу по прибытии нашим VIP-автопарком и доставляем к месту проживания с полным комфортом и безопасностью." },
          { title: "Студенческий вид на жительство и медицинская страховка", description: "Мы берём на себя все юридические процедуры: подготовку документов на студенческий вид на жительство, запись на приём и оформление обязательной одобренной медицинской страховки." },
          { title: "Признание школьных и университетских дипломов", description: "Мы помогаем пройти процедуру признания дипломов (Denklik) и подготовить необходимые документы в Совете по высшему образованию Турции." },
          { title: "Открытие банковского счёта", description: "Мы сопровождаем вас шаг за шагом в открытии официального турецкого банковского счёта и получении банковской карты, чтобы упростить ваши финансовые операции." },
          { title: "Оформление SIM-карты", description: "Мы помогаем купить и активировать турецкую телефонную линию и подключить интернет-пакеты, подходящие для студенческого использования, сразу по приезде." },
          { title: "Оформление студенческой транспортной карты", description: "Мы оформляем студенческую транспортную карту со скидкой (İndirimli Kart) для удобных и экономичных поездок по городу." },
        ],
      },
      universities: {
        heading: "Наши партнёры — университеты Турции с богатой историей",
        intro: "CASANOSTRA является официальным представителем самых известных и сильных университетов Турции, и благодаря этому партнёрству мы предоставляем вам гарантированные места и эксклюзивные скидки:",
        items: [
          { name: "Университет Халич", official: "Haliç Üniversitesi" },
          { name: "Университет Ускюдар", official: "Üsküdar Üniversitesi" },
          { name: "Университет Фенербахче", official: "Fenerbahçe Üniversitesi" },
          { name: "Университет Бейкент", official: "Beykent Üniversitesi" },
          { name: "Университет Кент", official: "Kent Üniversitesi" },
          { name: "Университет Бейкоз", official: "Beykoz Üniversitesi" },
        ],
      },
      promo: {
        heading: "Особая скидка на комплексный пакет студенческих услуг в Турции.",
        description: "Получите эксклюзивную скидку при заказе комплексного пакета студенческих услуг (зачисление, вид на жительство, жильё и встреча в аэропорту).",
      },
    },
  },
};