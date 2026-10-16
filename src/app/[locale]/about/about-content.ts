/**
 * محتوى صفحة «من نحن» الموسّع لكل اللغات.
 * العربية معتمدة من العميل؛ en/tr/fr/ru ترجمة أولية تحتاج مراجعة ناطق أصلي.
 * أسماء الشركة والمؤسس والعنوان والترخيص تبقى بالأحرف اللاتينية كما هي.
 */
import type { Locale } from "@/i18n/messages";
import { aboutAr, founderPhoto, partnerLogos } from "./about-ar";

type AboutContentData = typeof aboutAr;

const companyLines = (tagline: string, license: string) => [
  "CASA NOSTRA",
  "Cumhuriyet Mah. Saksı Sk. Aslı Han No:9/15 Şişli - Istanbul",
  license,
  tagline,
];
const LIC = "A Group Travel Agency License No: 10516";

const en: AboutContentData = {
  intro: [
    "Since the founding of CASA NOSTRA Tourism, Hospitality, Construction, Import & Export Ltd., the company has become a symbol of trust and professionalism in providing tourism, commercial and investment services. The company is headquartered in Istanbul and holds a Group A travel agency license, TÜRSAB No: 10516.",
    "We believe that success is measured not only by the size of the business, but by the value of the relationships we build with our clients and partners. We therefore deliver integrated solutions built on quality, transparency and commitment, with a deep understanding of local and international market needs.",
    "The company continues to expand its business by investing in quality opportunities, developing strategic partnerships, and providing services designed to meet the aspirations of clients seeking excellence, trust and sustainability.",
  ],
  company: { lines: companyLines("Tourism • Investment • Business Development • International Partnerships", LIC) },
  founder: {
    heading: "Founder & Managing Director",
    name: "Dr. MHD GHIATH ALZUHAILI",
    photo: founderPhoto,
    paragraphs: [
      "An entrepreneur and economic advisor with extensive experience in business management, investment and the strategic development of companies.",
      "Dr. MHD GHIATH ALZUHAILI serves as Managing Director and partner at CASA NOSTRA, with the right of sole representation of the company according to official records.",
      "His vision is to build an international institution that combines innovation and professionalism and provides integrated solutions that help create new opportunities for business, investment and tourism. Through his approach based on quality, trust and long-term partnerships, he works to strengthen the company's position as a trusted partner for clients and institutions in global markets.",
    ],
    quote: "We believe that trust is the foundation of every success, and that the best investments are those that build lasting value for people and businesses.",
  },
  partners: {
    heading: "Our Partners",
    text: "We are proud of our network of partners, who are an essential part of our success story. These partnerships have strengthened our ability to deliver high-level services and innovative solutions that meet the demands of changing markets.",
    closing: "Our partners are partners in success, and together we are building a stronger and more sustainable future.",
    trustedBy: "Trusted By",
    logos: partnerLogos,
  },
};

const tr: AboutContentData = {
  intro: [
    "CASA NOSTRA Tourism, Hospitality, Construction, Import & Export Ltd.'in kuruluşundan bu yana şirket, turizm, ticaret ve yatırım hizmetlerinde güven ve profesyonelliğin simgesi haline gelmiştir. Şirketin merkezi İstanbul'dadır ve A grubu seyahat acentesi lisansına sahiptir: TÜRSAB No: 10516.",
    "Başarının yalnızca işin büyüklüğüyle değil, müşterilerimiz ve iş ortaklarımızla kurduğumuz ilişkilerin değeriyle ölçüldüğüne inanıyoruz. Bu nedenle yerel ve uluslararası pazarların ihtiyaçlarını derinlemesine anlayarak kalite, şeffaflık ve bağlılığa dayalı bütüncül çözümler sunuyoruz.",
    "Şirket; nitelikli fırsatlara yatırım yaparak, stratejik ortaklıklar geliştirerek ve mükemmellik, güven ve sürdürülebilirlik arayan müşterilerin beklentilerine özel olarak tasarlanmış hizmetler sunarak faaliyet alanını genişletmeye devam etmektedir.",
  ],
  company: { lines: companyLines("Turizm • Yatırım • İş Geliştirme • Uluslararası Ortaklıklar", LIC) },
  founder: {
    heading: "Founder & Managing Director",
    name: "Dr. MHD GHIATH ALZUHAILI",
    photo: founderPhoto,
    paragraphs: [
      "İş yönetimi, yatırım ve şirketlerin stratejik gelişimi konusunda geniş deneyime sahip girişimci ve ekonomi danışmanı.",
      "Dr. MHD GHIATH ALZUHAILI, CASA NOSTRA'da müdür ve ortak olarak görev yapmakta olup resmi kayıtlara göre şirketi tek başına temsil yetkisine sahiptir.",
      "Vizyonu; yeniliği ve profesyonelliği bir araya getiren, iş, yatırım ve turizmde yeni fırsatlar yaratmaya katkı sağlayan bütüncül çözümler sunan uluslararası bir kurum inşa etmektir. Kalite, güven ve uzun vadeli ortaklıklara dayanan yaklaşımıyla şirketin küresel pazarlarda müşteriler ve kurumlar için güvenilir bir ortak olarak konumunu güçlendirmektedir.",
    ],
    quote: "Güvenin her başarının temeli olduğuna ve en iyi yatırımların insanlar ve işletmeler için kalıcı değer yaratanlar olduğuna inanıyoruz.",
  },
  partners: {
    heading: "Our Partners",
    text: "Başarı hikâyemizin temel bir parçası olan iş ortakları ağımızla gurur duyuyoruz. Bu ortaklıklar, değişen pazarların taleplerini karşılayan üst düzey hizmetler ve yenilikçi çözümler sunma yeteneğimizi güçlendirdi.",
    closing: "İş ortaklarımız başarının ortaklarıdır; birlikte daha güçlü ve sürdürülebilir bir gelecek inşa ediyoruz.",
    trustedBy: "Trusted By",
    logos: partnerLogos,
  },
};

const fr: AboutContentData = {
  intro: [
    "Depuis la création de CASA NOSTRA Tourism, Hospitality, Construction, Import & Export Ltd., l'entreprise est devenue un symbole de confiance et de professionnalisme dans la fourniture de services touristiques, commerciaux et d'investissement. Son siège est à Istanbul et elle détient une licence d'agence de voyages de catégorie A, TÜRSAB No : 10516.",
    "Nous croyons que le succès ne se mesure pas seulement à la taille de l'activité, mais à la valeur des relations que nous construisons avec nos clients et partenaires. Nous proposons donc des solutions intégrées fondées sur la qualité, la transparence et l'engagement, avec une compréhension approfondie des besoins des marchés locaux et internationaux.",
    "L'entreprise poursuit l'expansion de son activité en investissant dans des opportunités de qualité, en développant des partenariats stratégiques et en proposant des services conçus pour répondre aux attentes de clients en quête d'excellence, de confiance et de durabilité.",
  ],
  company: { lines: companyLines("Tourisme • Investissement • Développement commercial • Partenariats internationaux", LIC) },
  founder: {
    heading: "Founder & Managing Director",
    name: "Dr. MHD GHIATH ALZUHAILI",
    photo: founderPhoto,
    paragraphs: [
      "Entrepreneur et conseiller économique doté d'une vaste expérience en gestion d'entreprise, en investissement et en développement stratégique des sociétés.",
      "Dr. MHD GHIATH ALZUHAILI est directeur général et associé de CASA NOSTRA, avec le droit de représenter seul la société selon les registres officiels.",
      "Sa vision est de bâtir une institution internationale alliant innovation et professionnalisme et proposant des solutions intégrées qui contribuent à créer de nouvelles opportunités pour les affaires, l'investissement et le tourisme. Grâce à une approche fondée sur la qualité, la confiance et les partenariats à long terme, il renforce la position de l'entreprise comme partenaire de confiance pour les clients et les institutions sur les marchés mondiaux.",
    ],
    quote: "Nous croyons que la confiance est le fondement de toute réussite, et que les meilleurs investissements sont ceux qui créent une valeur durable pour les personnes et les entreprises.",
  },
  partners: {
    heading: "Our Partners",
    text: "Nous sommes fiers de notre réseau de partenaires, qui fait partie intégrante de notre réussite. Ces partenariats ont renforcé notre capacité à offrir des services de haut niveau et des solutions innovantes répondant aux exigences de marchés en constante évolution.",
    closing: "Nos partenaires sont des partenaires de réussite, et ensemble nous construisons un avenir plus solide et plus durable.",
    trustedBy: "Trusted By",
    logos: partnerLogos,
  },
};

const ru: AboutContentData = {
  intro: [
    "С момента основания CASA NOSTRA Tourism, Hospitality, Construction, Import & Export Ltd. компания стала символом доверия и профессионализма в предоставлении туристических, коммерческих и инвестиционных услуг. Штаб-квартира компании находится в Стамбуле, она имеет лицензию турагентства категории A, TÜRSAB No: 10516.",
    "Мы убеждены, что успех измеряется не только масштабом бизнеса, но и ценностью отношений, которые мы выстраиваем с клиентами и партнёрами. Поэтому мы предлагаем комплексные решения, основанные на качестве, прозрачности и ответственности, с глубоким пониманием потребностей местных и международных рынков.",
    "Компания продолжает расширять свою деятельность, инвестируя в качественные возможности, развивая стратегические партнёрства и предоставляя услуги, созданные для клиентов, ищущих превосходство, надёжность и устойчивость.",
  ],
  company: { lines: companyLines("Туризм • Инвестиции • Развитие бизнеса • Международные партнёрства", LIC) },
  founder: {
    heading: "Founder & Managing Director",
    name: "Dr. MHD GHIATH ALZUHAILI",
    photo: founderPhoto,
    paragraphs: [
      "Предприниматель и экономический консультант с большим опытом в управлении бизнесом, инвестициях и стратегическом развитии компаний.",
      "Dr. MHD GHIATH ALZUHAILI занимает должность управляющего директора и партнёра CASA NOSTRA и, согласно официальным реестрам, имеет право единоличного представления компании.",
      "Его видение — создать международную организацию, объединяющую инновации и профессионализм и предлагающую комплексные решения, которые открывают новые возможности для бизнеса, инвестиций и туризма. Благодаря подходу, основанному на качестве, доверии и долгосрочном партнёрстве, он укрепляет позиции компании как надёжного партнёра для клиентов и организаций на мировых рынках.",
    ],
    quote: "Мы убеждены, что доверие — основа любого успеха, а лучшие инвестиции — те, что создают устойчивую ценность для людей и бизнеса.",
  },
  partners: {
    heading: "Our Partners",
    text: "Мы гордимся сетью наших партнёров, которая является важной частью нашей истории успеха. Эти партнёрства укрепили нашу способность предоставлять услуги высокого уровня и инновационные решения, отвечающие требованиям меняющихся рынков.",
    closing: "Наши партнёры — партнёры по успеху, и вместе мы строим более сильное и устойчивое будущее.",
    trustedBy: "Trusted By",
    logos: partnerLogos,
  },
};

export const aboutContent: Record<Locale, AboutContentData> = { ar: aboutAr, en, tr, fr, ru };
