import type { Locale } from "./messages";

export interface ServiceDetailContent {
  description: string;
  features: { title: string; description: string }[];
  included: string[];
  excluded: string[];
}

type NonArabicLocale = Exclude<Locale, "ar">;
type ServiceDetailCatalog = Record<string, ServiceDetailContent>;

export const serviceDetailMessages: Record<NonArabicLocale, ServiceDetailCatalog> = {
  en: {
    "reservations-turkey": {
      description: "We arrange luxury stays in Istanbul, Antalya, Bodrum and Trabzon, from a week-long visit to monthly or yearly accommodation. We find the right option at a competitive price and in a prime location near attractions and shopping districts. Our network includes four- and five-star hotels and serviced apartments, helping make your stay memorable.",
      features: [
        { title: "Strategic locations", description: "Stays near key attractions, markets, and restaurants." },
        { title: "A range of options", description: "Hotels, serviced apartments, villas, and studios." },
        { title: "Exclusive rates", description: "Special hotel agreements at rates below direct booking prices." },
        { title: "24/7 service", description: "Immediate WhatsApp support throughout your stay." },
      ],
      included: ["Booking at a four- or five-star hotel or serviced apartment", "Daily room cleaning", "Free high-speed internet", "Reception service", "Accommodation arrangements for the full stay"],
      excluded: ["Flights to and from Turkey", "Meals unless included in the hotel offer", "Airport transfer; available as an optional VIP service"],
    },
    visa: {
      description: "We assist travelers of all Arab and international nationalities with Turkish tourist visa applications. Our experience working with Turkish consulates worldwide helps us guide you through the process efficiently. We handle forms, appointments, document preparation, and follow-up until the visa is issued. Turkey offers an electronic e-Visa to many nationalities; we help determine which option applies to you.",
      features: [
        { title: "All nationalities", description: "We work with Arab and international nationalities." },
        { title: "High approval rate", description: "More than 95% of our applications are approved." },
        { title: "Two options", description: "Electronic or paper visa, depending on your case." },
        { title: "Full follow-up", description: "We guide you from the first step through to collection." },
      ],
      included: ["Free advice on the visa option that suits you", "Online completion of the application form", "Consulate appointment booking", "Document review before submission", "Application follow-up until the visa is issued"],
      excluded: ["Official consular visa fees, paid separately", "Translation costs if required", "Shipping costs if the visa is delivered by post"],
    },
    "vip-cars": {
      description: "Travel around Turkey in our luxury fleet, including Mercedes V-Class, BMW, and Audi vehicles, with a professional private driver. Our complete VIP service covers airport-to-hotel transfers and travel to destinations throughout Turkey. Drivers are trained to respect your privacy and safety, and vehicles are fully insured and equipped for comfort. Ideal for business travelers, families, and anyone seeking an exceptional experience.",
      features: [
        { title: "Luxury vehicles", description: "Mercedes V-Class, BMW Series 7, and Audi A8." },
        { title: "Professional drivers", description: "Experienced drivers who speak Arabic and English." },
        { title: "Full insurance", description: "All our vehicles are fully insured." },
        { title: "Flexible booking", description: "Book by the hour, day, or week." },
      ],
      included: ["Luxury car with a professional driver", "Fuel and parking during the booking", "Water and refreshments in the car", "Comprehensive vehicle and passenger insurance", "Free Wi-Fi in the car"],
      excluded: ["Driver meals, charged separately on long trips", "Attraction tickets", "Buffet or special admission fees"],
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
      description: "Explore Istanbul on organized daily tours covering its leading historical and tourist attractions. Options include Sultanahmet, the Blue Mosque, Hagia Sophia, Topkapi Palace, a Bosphorus boat trip, the Grand Bazaar, Taksim Square, and the Spice Bazaar. Each tour includes an Arabic-speaking guide and comfortable, air-conditioned transport.",
      features: [
        { title: "Arabic-speaking guide", description: "Professional tourist guides who speak Arabic." },
        { title: "Comfortable transport", description: "Air-conditioned buses and modern cars." },
        { title: "Tour selection", description: "More than 15 destinations around Istanbul." },
        { title: "Morning and evening tours", description: "Choose a time that suits you." },
      ],
      included: ["Round-trip air-conditioned transport", "Arabic-speaking tourist guide", "Admission tickets for attractions listed in the itinerary", "Lunch on full-day tours", "Water and refreshments during the tour"],
      excluded: ["Personal tips", "Personal shopping at markets", "Additional meals outside the itinerary"],
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
      description: "We arrange medical travel in Turkey through internationally accredited JCI hospitals and medical centers in Istanbul, Ankara, and Antalya. Services include hair transplantation, dental aesthetics, cosmetic surgery, eye care, cardiology, orthopedics, and oncology. We can coordinate an initial consultation, hospital arrangements, medical translation, premium accommodation, and follow-up after you return home.",
      features: [
        { title: "Accredited hospitals", description: "JCI-accredited and internationally recognized facilities." },
        { title: "Experienced doctors", description: "Doctors with more than 15 years of experience." },
        { title: "Medical translation", description: "Arabic-speaking medical translators throughout treatment." },
        { title: "Follow-up after your return", description: "Remote medical follow-up after you return home." },
      ],
      included: ["Free initial medical consultation", "Full coordination with the hospital and doctor", "Arabic medical translation throughout treatment", "Hotel booking near the hospital", "Transport to and from the hospital", "Medical follow-up after your return"],
      excluded: ["Treatment costs, determined after consultation", "Medication after hospital discharge", "Hotel meals"],
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
  },
  tr: {
    "reservations-turkey": {
      description: "İstanbul, Antalya, Bodrum ve Trabzon'daki lüks otel ve servisli dairelerde haftalık, aylık veya yıllık konaklama seçenekleri sunuyoruz. Turistik yerlere ve alışveriş bölgelerine yakın, uygun fiyatlı seçeneği bulmanıza yardımcı oluyoruz. Ağımızda dört ve beş yıldızlı oteller ile servisli daireler bulunur; böylece unutulmaz bir konaklama deneyimi yaşayabilirsiniz.",
      features: [{ title: "Stratejik konumlar", description: "Önemli turistik yerlere, pazarlara ve restoranlara yakın konaklama." }, { title: "Çeşitli seçenekler", description: "Oteller, servisli daireler, villalar ve stüdyolar." }, { title: "Özel fiyatlar", description: "Doğrudan rezervasyondan daha uygun özel otel anlaşmaları." }, { title: "7/24 hizmet", description: "Konaklamanız boyunca WhatsApp üzerinden anında destek." }],
      included: ["Dört veya beş yıldızlı otel ya da servisli daire rezervasyonu", "Günlük oda temizliği", "Ücretsiz yüksek hızlı internet", "Resepsiyon hizmeti", "Konaklama süresinin tamamı için düzenleme"],
      excluded: ["Türkiye'ye gidiş-dönüş uçak biletleri", "Otel teklifine dahil değilse yemekler", "İsteğe bağlı VIP hizmet olarak sunulan havalimanı transferi"],
    },
    visa: {
      description: "Arap ve diğer tüm ülke vatandaşlarına Türkiye turistik vizesi başvurularında yardımcı oluyoruz. Dünya genelindeki Türk konsolosluklarıyla çalışma deneyimimiz sayesinde süreci verimli biçimde yönlendiriyoruz. Formları, randevuları ve belgeleri hazırlıyor, vize çıkana kadar başvuruyu takip ediyoruz. Türkiye birçok ülke vatandaşına e-Vize sunar; sizin için uygun seçeneği belirlemenize yardımcı oluruz.",
      features: [{ title: "Tüm ülke vatandaşları", description: "Arap ve diğer ülke vatandaşlarının başvurularıyla ilgileniyoruz." }, { title: "Yüksek onay oranı", description: "Başvurularımızın %95'inden fazlası onaylanır." }, { title: "İki seçenek", description: "Duruma göre elektronik veya basılı vize." }, { title: "Eksiksiz takip", description: "İlk adımdan vize teslimine kadar yanınızdayız." }],
      included: ["Size uygun vize seçeneği için ücretsiz danışmanlık", "Başvuru formunun çevrimiçi doldurulması", "Konsolosluk randevusunun alınması", "Başvuru öncesi belgelerin incelenmesi", "Vize çıkana kadar başvuru takibi"],
      excluded: ["Ayrı ödenen resmî konsolosluk vize harçları", "Gerekirse çeviri ücretleri", "Postayla teslimde kargo ücretleri"],
    },
    "vip-cars": {
      description: "Türkiye'de Mercedes V-Class, BMW ve Audi araçlardan oluşan lüks filomuz ve profesyonel özel sürücülerimizle seyahat edin. VIP hizmetimiz havalimanı-otel transferlerini ve Türkiye'deki diğer noktalara ulaşımı kapsar. Sürücülerimiz mahremiyet ve güvenlik konusunda eğitimlidir; araçlarımız tam sigortalı ve konfor için donanımlıdır. İş seyahatleri, aileler ve ayrıcalıklı bir deneyim arayanlar için idealdir.",
      features: [{ title: "Lüks araçlar", description: "Mercedes V-Class, BMW Series 7 ve Audi A8." }, { title: "Profesyonel sürücüler", description: "Arapça ve İngilizce konuşan deneyimli sürücüler." }, { title: "Tam sigorta", description: "Tüm araçlarımız kapsamlı sigortalıdır." }, { title: "Esnek rezervasyon", description: "Saatlik, günlük veya haftalık rezervasyon." }],
      included: ["Profesyonel sürücülü lüks araç", "Rezervasyon boyunca yakıt ve otopark", "Araçta su ve ikramlar", "Araç ve yolcular için kapsamlı sigorta", "Araçta ücretsiz Wi-Fi"],
      excluded: ["Uzun yolculuklarda ayrıca hesaplanan sürücü yemekleri", "Turistik yer giriş biletleri", "Açık büfe veya özel giriş ücretleri"],
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
      description: "İstanbul'un başlıca tarihî ve turistik yerlerini kapsayan düzenli günlük turlarla şehri keşfedin. Sultanahmet, Sultanahmet Camii, Ayasofya, Topkapı Sarayı, Boğaz tekne turu, Kapalıçarşı, Taksim Meydanı ve Mısır Çarşısı seçenekler arasındadır. Her turda Arapça konuşan rehber ve konforlu, klimalı ulaşım bulunur.",
      features: [{ title: "Arapça konuşan rehber", description: "Arapça konuşan profesyonel tur rehberleri." }, { title: "Konforlu ulaşım", description: "Klimalı otobüsler ve modern araçlar." }, { title: "Tur seçenekleri", description: "İstanbul'da 15'ten fazla farklı nokta." }, { title: "Sabah ve akşam turları", description: "Size uygun saati seçin." }],
      included: ["Gidiş-dönüş klimalı ulaşım", "Arapça konuşan tur rehberi", "Programda belirtilen yerlere giriş biletleri", "Tam günlük turlarda öğle yemeği", "Tur boyunca su ve ikramlar"],
      excluded: ["Kişisel bahşişler", "Çarşılardaki kişisel alışverişler", "Program dışındaki ek yemekler"],
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
      description: "İstanbul, Ankara ve Antalya'daki uluslararası JCI akreditasyonlu hastane ve tıp merkezleriyle Türkiye'de sağlık seyahati düzenliyoruz. Saç ekimi, diş estetiği, estetik cerrahi, göz tedavisi, kardiyoloji, ortopedi ve onkoloji hizmetleri sunulur. İlk danışmanlığı, hastane düzenlemelerini, tıbbi çeviriyi, seçkin konaklamayı ve ülkenize döndükten sonraki takibi ayarlayabiliriz.",
      features: [{ title: "Akredite hastaneler", description: "JCI akreditasyonlu ve uluslararası tanınan kuruluşlar." }, { title: "Deneyimli doktorlar", description: "15 yılı aşkın deneyime sahip doktorlar." }, { title: "Tıbbi çeviri", description: "Tedavi boyunca Arapça konuşan tıbbi tercümanlar." }, { title: "Dönüş sonrası takip", description: "Eve döndükten sonra uzaktan tıbbi takip." }],
      included: ["Ücretsiz ilk tıbbi danışmanlık", "Hastane ve doktorla eksiksiz koordinasyon", "Tedavi boyunca Arapça tıbbi çeviri", "Hastaneye yakın otel rezervasyonu", "Hastaneye gidiş-dönüş ulaşım", "Dönüş sonrası tıbbi takip"],
      excluded: ["Danışmanlık sonrası belirlenen tedavi ücretleri", "Hastaneden taburcu olduktan sonraki ilaçlar", "Otel yemekleri"],
    },
    "other-services": {
      description: "Türkiye'de ihtiyaç duyabileceğiniz ek hizmetleri sunuyoruz: seçkin restoran rezervasyonları, etkinlik ve kutlama organizasyonu, özel yat kiralama, spor karşılaşması biletleri, çeviri ve kişisel refakat, balayı planlaması, spa ve Türk hamamları. Türkiye'de neye ihtiyacınız olduğunu bize bildirin; sizin için düzenleyelim.",
      features: [{ title: "Geniş hizmet yelpazesi", description: "20'den fazla farklı ek hizmet." }, { title: "Tam özelleştirme", description: "Belirttiğiniz isteğe göre düzenleme." }, { title: "Adil fiyatlar", description: "Aracısız, rekabetçi fiyatlar." }, { title: "VIP hizmet", description: "Her ayrıntıda seçkin bir deneyim." }],
      included: ["İhtiyacınız olan hizmeti belirlemek için danışmanlık", "Hizmet sağlayıcılarla eksiksiz koordinasyon", "Rezervasyon ve randevu onayı", "Hizmet tamamlanana kadar takip", "7/24 destek"],
      excluded: ["Hizmetin kendisinin ücrete tabi maliyeti", "Kişisel alışverişler", "Bahşişler"],
    },
  },
  fr: {
    "reservations-turkey": {
      description: "Nous organisons des séjours de luxe à Istanbul, Antalya, Bodrum et Trabzon, pour une semaine, un mois ou une année. Nous recherchons l'option adaptée à un tarif compétitif et dans un emplacement privilégié, près des sites touristiques et des quartiers commerçants. Notre réseau comprend des hôtels quatre et cinq étoiles ainsi que des appartements avec services pour un séjour mémorable.",
      features: [{ title: "Emplacements stratégiques", description: "Séjours proches des sites, marchés et restaurants importants." }, { title: "Choix varié", description: "Hôtels, appartements avec services, villas et studios." }, { title: "Tarifs exclusifs", description: "Accords hôteliers spéciaux à des tarifs inférieurs à la réservation directe." }, { title: "Service 24h/24 et 7j/7", description: "Assistance immédiate par WhatsApp pendant tout votre séjour." }],
      included: ["Réservation dans un hôtel quatre ou cinq étoiles ou un appartement avec services", "Ménage quotidien des chambres", "Internet haut débit gratuit", "Service de réception", "Organisation de l'hébergement pour toute la durée du séjour"],
      excluded: ["Vols à destination et au départ de la Turquie", "Repas sauf s'ils sont inclus dans l'offre de l'hôtel", "Transfert aéroport, disponible en option VIP"],
    },
    visa: {
      description: "Nous accompagnons les voyageurs de toutes nationalités arabes et étrangères dans leurs démarches de visa touristique turc. Notre expérience auprès des consulats turcs dans le monde nous permet de vous guider efficacement. Nous prenons en charge les formulaires, rendez-vous, documents et le suivi jusqu'à la délivrance du visa. La Turquie propose le visa électronique e-Visa à de nombreuses nationalités ; nous vous aidons à déterminer l'option qui vous concerne.",
      features: [{ title: "Toutes nationalités", description: "Nous accompagnons les ressortissants arabes et étrangers." }, { title: "Taux d'approbation élevé", description: "Plus de 95 % de nos demandes sont approuvées." }, { title: "Deux options", description: "Visa électronique ou papier selon votre situation." }, { title: "Suivi complet", description: "Nous vous accompagnons de la première étape jusqu'au retrait." }],
      included: ["Conseil gratuit sur le visa adapté", "Remplissage en ligne du formulaire", "Prise de rendez-vous au consulat", "Vérification du dossier avant dépôt", "Suivi de la demande jusqu'à la délivrance du visa"],
      excluded: ["Frais officiels du visa consulaire, à régler séparément", "Frais de traduction si nécessaire", "Frais d'envoi si le visa est expédié par courrier"],
    },
    "vip-cars": {
      description: "Parcourez la Turquie à bord de notre flotte de luxe, comprenant des Mercedes V-Class, BMW et Audi, avec un chauffeur privé professionnel. Notre service VIP complet assure les transferts entre l'aéroport et l'hôtel ainsi que les déplacements dans toute la Turquie. Nos chauffeurs sont formés au respect de votre intimité et de votre sécurité ; les véhicules sont entièrement assurés et équipés pour votre confort. Idéal pour les voyageurs d'affaires, les familles et ceux qui recherchent une expérience exceptionnelle.",
      features: [{ title: "Véhicules de luxe", description: "Mercedes V-Class, BMW Série 7 et Audi A8." }, { title: "Chauffeurs professionnels", description: "Chauffeurs expérimentés parlant arabe et anglais." }, { title: "Assurance complète", description: "Tous nos véhicules sont entièrement assurés." }, { title: "Réservation flexible", description: "Réservez à l'heure, à la journée ou à la semaine." }],
      included: ["Voiture de luxe avec chauffeur professionnel", "Carburant et stationnement pendant la réservation", "Eau et rafraîchissements dans le véhicule", "Assurance complète du véhicule et des passagers", "Wi-Fi gratuit dans la voiture"],
      excluded: ["Repas du chauffeur, facturés séparément lors des longs trajets", "Billets d'entrée aux attractions", "Buffets ou frais d'entrée spéciaux"],
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
      description: "Découvrez Istanbul grâce à des excursions quotidiennes organisées autour de ses principaux sites historiques et touristiques. Les options comprennent Sultanahmet, la Mosquée Bleue, Sainte-Sophie, le palais de Topkapi, une croisière sur le Bosphore, le Grand Bazar, la place Taksim et le Bazar aux épices. Chaque excursion comprend un guide arabophone et un transport confortable et climatisé.",
      features: [{ title: "Guide arabophone", description: "Guides touristiques professionnels parlant arabe." }, { title: "Transport confortable", description: "Autocars climatisés et voitures modernes." }, { title: "Choix d'excursions", description: "Plus de 15 destinations différentes à Istanbul." }, { title: "Excursions matin et soir", description: "Choisissez l'horaire qui vous convient." }],
      included: ["Transport climatisé aller-retour", "Guide touristique arabophone", "Billets d'entrée des sites indiqués au programme", "Déjeuner lors des excursions à la journée", "Eau et rafraîchissements pendant l'excursion"],
      excluded: ["Pourboires personnels", "Achats personnels dans les marchés", "Repas supplémentaires hors programme"],
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
      description: "Nous organisons des séjours médicaux en Turquie auprès d'hôpitaux et de centres médicaux accrédités JCI à Istanbul, Ankara et Antalya. Les prestations comprennent greffe de cheveux, esthétique dentaire, chirurgie esthétique, soins ophtalmologiques, cardiologie, orthopédie et oncologie. Nous pouvons coordonner une première consultation, les démarches hospitalières, la traduction médicale, un hébergement haut de gamme et le suivi après votre retour.",
      features: [{ title: "Hôpitaux accrédités", description: "Établissements accrédités JCI et reconnus à l'international." }, { title: "Médecins expérimentés", description: "Médecins ayant plus de 15 ans d'expérience." }, { title: "Traduction médicale", description: "Interprètes médicaux arabophones pendant les soins." }, { title: "Suivi après le retour", description: "Suivi médical à distance après votre retour." }],
      included: ["Première consultation médicale gratuite", "Coordination complète avec l'hôpital et le médecin", "Traduction médicale en arabe pendant les soins", "Réservation d'un hôtel près de l'hôpital", "Transport vers et depuis l'hôpital", "Suivi médical après votre retour"],
      excluded: ["Coût des soins, déterminé après consultation", "Médicaments après la sortie de l'hôpital", "Repas à l'hôtel"],
    },
    "other-services": {
      description: "Nous proposons des services complémentaires pour votre séjour en Turquie : réservations dans des restaurants raffinés, organisation d'événements et de célébrations, location de yachts privés, billets pour des rencontres sportives, traduction et accompagnement, organisation de lunes de miel, spas et bains turcs. Indiquez-nous vos besoins en Turquie et nous organiserons le service demandé.",
      features: [{ title: "Large choix", description: "Plus de 20 services complémentaires différents." }, { title: "Personnalisation complète", description: "Service organisé selon votre demande précise." }, { title: "Prix justes", description: "Tarifs compétitifs sans intermédiaires." }, { title: "Service VIP", description: "Une expérience haut de gamme dans chaque détail." }],
      included: ["Conseil pour définir le service souhaité", "Coordination complète avec les prestataires", "Réservation et confirmation du rendez-vous", "Suivi jusqu'à la fin du service", "Assistance 24h/24 et 7j/7"],
      excluded: ["Coût du service lui-même, déterminé selon la demande", "Achats personnels", "Pourboires"],
    },
  },
  ru: {
    "reservations-turkey": {
      description: "Мы организуем роскошное проживание в Стамбуле, Анталье, Бодруме и Трабзоне: на неделю, месяц или год. Поможем подобрать подходящий вариант по выгодной цене и в удобном месте рядом с достопримечательностями и торговыми районами. В нашу сеть входят четырёх- и пятизвёздочные отели, а также апартаменты с обслуживанием, чтобы ваше пребывание запомнилось.",
      features: [{ title: "Удобное расположение", description: "Жильё рядом с главными достопримечательностями, рынками и ресторанами." }, { title: "Разные варианты", description: "Отели, апартаменты с обслуживанием, виллы и студии." }, { title: "Специальные цены", description: "Особые соглашения с отелями по ценам ниже прямого бронирования." }, { title: "Поддержка 24/7", description: "Оперативная помощь в WhatsApp на протяжении всего пребывания." }],
      included: ["Бронирование четырёх- или пятизвёздочного отеля либо апартаментов с обслуживанием", "Ежедневная уборка номера", "Бесплатный высокоскоростной интернет", "Услуги стойки регистрации", "Организация проживания на весь срок поездки"],
      excluded: ["Перелёты в Турцию и обратно", "Питание, если оно не включено в предложение отеля", "Трансфер из аэропорта, доступный как дополнительная VIP-услуга"],
    },
    visa: {
      description: "Мы помогаем гражданам арабских стран и других государств оформить туристическую визу в Турцию. Опыт работы с турецкими консульствами по всему миру помогает эффективно пройти процедуру. Мы заполняем анкеты, записываем на приём, готовим документы и сопровождаем заявление до получения визы. Для граждан многих стран доступна электронная e-Visa; мы поможем определить подходящий вариант.",
      features: [{ title: "Для граждан всех стран", description: "Помогаем заявителям из арабских стран и других государств." }, { title: "Высокая доля одобрений", description: "Одобряется более 95% наших заявлений." }, { title: "Два варианта", description: "Электронная или бумажная виза в зависимости от ситуации." }, { title: "Полное сопровождение", description: "Помогаем с первого шага до получения визы." }],
      included: ["Бесплатная консультация по подходящему типу визы", "Заполнение онлайн-анкеты", "Запись на приём в консульство", "Проверка документов перед подачей", "Сопровождение заявления до выдачи визы"],
      excluded: ["Официальный консульский сбор, оплачиваемый отдельно", "Перевод документов, если он требуется", "Почтовая доставка, если виза отправляется письмом"],
    },
    "vip-cars": {
      description: "Путешествуйте по Турции на автомобилях премиального класса Mercedes V-Class, BMW и Audi с профессиональным личным водителем. Полный VIP-сервис включает трансферы из аэропорта в отель и поездки по всей Турции. Водители обучены обеспечивать приватность и безопасность; автомобили полностью застрахованы и оснащены для комфорта. Подходит деловым путешественникам, семьям и тем, кто ищет особые впечатления.",
      features: [{ title: "Автомобили премиум-класса", description: "Mercedes V-Class, BMW Series 7 и Audi A8." }, { title: "Профессиональные водители", description: "Опытные водители, говорящие на арабском и английском." }, { title: "Полная страховка", description: "Все автомобили полностью застрахованы." }, { title: "Гибкое бронирование", description: "Почасовая аренда, на день или на неделю." }],
      included: ["Премиальный автомобиль с профессиональным водителем", "Топливо и парковка на время бронирования", "Вода и напитки в автомобиле", "Комплексная страховка автомобиля и пассажиров", "Бесплатный Wi-Fi в автомобиле"],
      excluded: ["Питание водителя, отдельно оплачиваемое в длительных поездках", "Билеты к достопримечательностям", "Фуршет или специальные входные сборы"],
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
      description: "Откройте для себя Стамбул на организованных ежедневных экскурсиях по главным историческим и туристическим местам. Среди вариантов — Султанахмет, Голубая мечеть, Айя-София, дворец Топкапы, прогулка по Босфору, Гранд-базар, площадь Таксим и Египетский базар. В каждую экскурсию входят арабоязычный гид и комфортный транспорт с кондиционером.",
      features: [{ title: "Арабоязычный гид", description: "Профессиональные экскурсоводы, говорящие на арабском." }, { title: "Комфортный транспорт", description: "Автобусы с кондиционером и современные автомобили." }, { title: "Выбор экскурсий", description: "Более 15 разных мест в Стамбуле." }, { title: "Утренние и вечерние экскурсии", description: "Выберите удобное время." }],
      included: ["Транспорт с кондиционером туда и обратно", "Арабоязычный экскурсовод", "Входные билеты к указанным в программе достопримечательностям", "Обед в экскурсиях на полный день", "Вода и напитки во время экскурсии"],
      excluded: ["Личные чаевые", "Личные покупки на рынках", "Дополнительное питание вне программы"],
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
      description: "Мы организуем медицинские поездки в Турцию через международно аккредитованные JCI больницы и медицинские центры в Стамбуле, Анкаре и Анталье. Среди услуг — пересадка волос, эстетическая стоматология, пластическая хирургия, офтальмология, кардиология, ортопедия и онкология. Мы помогаем с первичной консультацией, организацией лечения, медицинским переводом, проживанием премиум-класса и наблюдением после возвращения домой.",
      features: [{ title: "Аккредитованные больницы", description: "Клиники с аккредитацией JCI и международным признанием." }, { title: "Опытные врачи", description: "Врачи с опытом более 15 лет." }, { title: "Медицинский перевод", description: "Арабоязычные медицинские переводчики на протяжении лечения." }, { title: "Наблюдение после возвращения", description: "Дистанционное медицинское сопровождение после поездки." }],
      included: ["Бесплатная первичная медицинская консультация", "Полная координация с больницей и врачом", "Медицинский перевод на арабский во время лечения", "Бронирование отеля рядом с больницей", "Транспорт до больницы и обратно", "Медицинское наблюдение после возвращения"],
      excluded: ["Стоимость лечения, определяется после консультации", "Лекарства после выписки из больницы", "Питание в отеле"],
    },
    "other-services": {
      description: "Мы предлагаем дополнительные услуги для вашего пребывания в Турции: бронирование ресторанов высокой кухни, организацию мероприятий и торжеств, аренду частных яхт, билеты на спортивные матчи, перевод и сопровождение, организацию медового месяца, спа и турецкие бани. Расскажите, что вам нужно в Турции, и мы организуем выбранную услугу.",
      features: [{ title: "Широкий выбор", description: "Более 20 разных дополнительных услуг." }, { title: "Индивидуальная организация", description: "Услуга под ваши конкретные требования." }, { title: "Честные цены", description: "Выгодные тарифы без посредников." }, { title: "VIP-сервис", description: "Премиальный подход к каждой детали." }],
      included: ["Консультация для определения нужной услуги", "Полная координация с поставщиками услуг", "Бронирование и подтверждение времени", "Сопровождение до завершения услуги", "Поддержка 24/7"],
      excluded: ["Стоимость самой услуги, определяется индивидуально", "Личные покупки", "Чаевые"],
    },
  },
};