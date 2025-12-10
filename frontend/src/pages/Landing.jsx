// src/pages/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
// Importing simple icons for better visual appeal
import {
  Zap,
  Globe,
  Users,
  Briefcase,
  Layers,
  Phone,
  Mail,
  Home,
  Star,
  DollarSign,
  Calendar,
  CheckCircle,
} from "lucide-react";

// --- Framer Motion Variants ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// --- Custom Components ---

// A more attractive button component
const PrimaryButton = ({ href, children, className, ...props }) => (
  <motion.a
    href={href}
    className={`px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${className}`}
    whileHover={{ y: -2 }}
    {...props}
  >
    {children}
  </motion.a>
);

const SecondaryButton = ({ href, children, className, ...props }) => (
  <motion.a
    href={href}
    className={`px-8 py-3 border border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] ${className}`}
    whileHover={{ y: -2 }}
    {...props}
  >
    {children}
  </motion.a>
);


export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState(
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en"
  );

  React.useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "mr" : "en"));

  // Images (medium-sized) - *NOTE: Using your original image variables*
  const heroImg =
    "https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?w=600&auto=format&fit=crop&q=60";
  const featureImg =
    "https://plus.unsplash.com/premium_vector-1682310635241-80dc3ccea061?q=80&w=800&auto=format&fit=crop";
  const graphImg = "/earnings-chart.png"; // local asset you provided
  const jobsImg =
    "https://plus.unsplash.com/premium_vector-1725335969613-fd5fd8d7fc4f?q=80&w=800&auto=format&fit=crop";
  const successImg =
    "https://plus.unsplash.com/premium_vector-1682306503579-3cb59b0ac1b8?q=80&w=800&auto=format&fit=crop";

  const content = {
    // [Language content remains the same for brevity]
    en: {
      siteName: "Excella Digitals",
      title: "Push Boundaries. Build Skills. Earn Passively.",
      desc: "Excella Digitals trains students, creators and freelancers in practical digital skills (Canva, social media management, video editing, branding) and helps them earn with a 50% commission referral model. ISO & MSME registered — high-quality content, real support.",
      getStarted: "Get Started Now",
      viewServices: "View Services",
      perReferral: "Commission",
      enrollmentFee: "Enrollment Fee",
      commission: "High Payout",
      whoIsThisFor: "Who Benefits from Excella?",
      servicesTitle: "Our Master Courses & Services",
      masterPackageTitle: "EXCELLA MASTER PACKAGE — only ₹1200",
      masterPackageDesc:
        "10+ practical business-focused courses in one package. Marathi & Hindi support available on request. Lifetime Access and Weekly Mentorship included.",
      enrollNow: "Enroll Now — ₹1200",
      referralTitle: "Affiliate / Referral — Your Income, Your Pace",
      referralSteps: [
        { title: "Join the Program", text: "Sign up and get your unique referral link.", icon: <Star className="w-6 h-6 text-yellow-400" /> },
        { title: "Share Link", text: "Share it on WhatsApp, social media, and your network.", icon: <Globe className="w-6 h-6 text-green-400" /> },
        { title: "Promote Courses", text: "Use pre-made templates & creatives to drive sales.", icon: <Zap className="w-6 h-6 text-red-400" /> },
        { title: "Earn Commission", text: "Earn ₹600 per successful referral (50% commission).", icon: <DollarSign className="w-6 h-6 text-blue-400" /> },
      ],
      contactTitle: "Contact Us",
      contactEmail: "Aasha.excelladigital@gmail.com",
      contactPhone: "+91 73851 86166",
      quickLinks: ["Register", "Login", "Master Package"],
      footerCopy: "Practical digital skill training • Referral earning • Job support",
      features: [
        "Canva Mastery — Create marketing designs",
        "Video Editing — Shorts & long form",
        "Social Media Management — Run campaigns",
        "Instagram Growth — Organic scaling",
        "Business Branding — Visual identity",
        "Lead Generation — Funnels & strategy",
        "Affiliate Training — Learn referrals",
        "Reels Editing — High engagement content",
        "Content Strategy — Plan content that converts",
      ],
      audience: [
        { title: "Students", desc: "Learn job-ready skills and build side-income", icon: <Users className="w-5 h-5 text-indigo-400" /> },
        { title: "Homemakers", desc: "Work from home & earn flexibly", icon: <Home className="w-5 h-5 text-amber-400" /> },
        { title: "Corporate Staff", desc: "Upskill for better roles and promotions", icon: <Briefcase className="w-5 h-5 text-cyan-400" /> },
        { title: "Freelancers", desc: "Expand services & client base rapidly", icon: <Layers className="w-5 h-5 text-emerald-400" /> },
        { title: "Entrepreneurs", desc: "Learn funnels & marketing strategy", icon: <Zap className="w-5 h-5 text-rose-400" /> },
        { title: "Anyone Seeking Extra Income", desc: "Low investment, high-return income opportunity", icon: <DollarSign className="w-5 h-5 text-lime-400" /> },
      ],
      jobSupportItems: [
        "Internship & College Programs",
        "Work-from-home Jobs",
        "Resume & Interview Prep",
        "Freelance Project Mentorship",
      ],
      badges: ["MSME / UDYAM Registered", "ISO Certified", "Weekly Payouts & Mentorship"],
      courseList: [
        "Canva Mastery — business designs",
        "Video Editing — short & long form",
        "Instagram Mastery — branding & content",
        "Facebook Basics — ads fundamentals",
        "Digital Marketing — full foundation",
        "Email Marketing — simple automation",
        "Content Creation — writing that converts",
        "Google Ads — search & display basics",
        "YouTube Basics — organic reach",
        "Public Speaking — confidence building",
      ]
    },

    mr: {
      siteName: "Excella Digitals",
      title: "Push Boundaries. Build Skills. Earn Passively.",
      desc: "एक्सेला डिजिटल्स विद्यार्थ्यांना, क्रिएटर्सना आणि फ्रीलान्सर्सना व्यावहारिक डिजिटल कौशल्ये (Canva, सोशल मिडिया मॅनेजमेंट, व्हिडिओ एडिटिंग, ब्रँडिंग) शिकवते आणि 50% कमिशन रिफरल मॉडेलद्वारे कमाईची संधी देते. ISO व MSME नोंदणीकृत — उच्च प्रतीचे कंटेंट व सक्रिय सपोर्ट.",
      getStarted: "आता सुरू करा",
      viewServices: "सेवा पहा",
      perReferral: "कमिशन",
      enrollmentFee: "नोंदणी फी",
      commission: "जास्त पेआउट",
      whoIsThisFor: "एक्सेला कोणासाठी फायदेशीर?",
      servicesTitle: "आमचे मास्टर कोर्सेस आणि सेवा",
      masterPackageTitle: "EXCELLA मास्टर पॅकेज — फक्त ₹1200",
      masterPackageDesc: "10+ व्यावहारिक बिझिनेस कोर्सेस एका पॅकेजमध्ये. मराठी व हिंदी सपोर्ट विनंतीनुसार उपलब्ध. आजीवन प्रवेश आणि साप्ताहिक मार्गदर्शन समाविष्ट.",
      enrollNow: "नोंदणी करा — ₹1200",
      referralTitle: "अ‍ॅफिलिएट / रिफरल — तुमची कमाई, तुमचा वेगळा गती",
      referralSteps: [
        { title: "प्रोग्राममध्ये सामील व्हा", text: "साइन अप करा व तुमचा युनिक रिफरल लिंक मिळवा.", icon: <Star className="w-6 h-6 text-yellow-400" /> },
        { title: "लिंक शेअर करा", text: "ह्या लिंकला WhatsApp, सोशल मिडिया आणि तुमच्या नेटवर्कवर शेअर करा.", icon: <Globe className="w-6 h-6 text-green-400" /> },
        { title: "कोर्सेस प्रमोट करा", text: "विक्री वाढवण्यासाठी तयार टेम्प्लेट्स व क्रिएटिव्ह वापरा.", icon: <Zap className="w-6 h-6 text-red-400" /> },
        { title: "कमिशन कमवा", text: "प्रत्येक यशस्वी रिफरलवर ₹600 कमवा (50% कमिशन).", icon: <DollarSign className="w-6 h-6 text-blue-400" /> },
      ],
      contactTitle: "संपर्क करा",
      contactEmail: "Aasha.excelladigital@gmail.com",
      contactPhone: "+91 73851 86166",
      quickLinks: ["नोंदणी", "लॉगिन", "मास्टर पॅकेज"],
      footerCopy: "व्यावहारिक डिजिटल प्रशिक्षण • रिफरल कमाई • जॉब सपोर्ट",
      features: [
        "Canva मास्टरी — मार्केटिंग डिझाइन्स तयार करा",
        "व्हिडिओ एडिटिंग — शॉर्ट्स व लांब व्हिडिओ",
        "सोशल मिडिया मॅनेजमेंट — मोहिम चालवा",
        "इंस्टाग्राम ग्रोथ — ऑर्गॅनिक वाढ",
        "बिझिनेस ब्रँडिंग — व्हिज्युअल आयडेंटिटी",
        "लीड जनरेशन — फनेल व स्ट्रॅटेजी",
        "अ‍ॅफिलिएट ट्रेनिंग — रिफरल शिकवा",
        "रिल्स एडिटिंग — जास्त एंगेजमेंट",
        "कंटेंट स्ट्रॅटेजी — रूपांतर करणारे कंटेंट",
      ],
      audience: [
        { title: "विद्यार्थी", desc: "नोकरी-तयार कौशल्ये व साइड-इनकम", icon: <Users className="w-5 h-5 text-indigo-400" /> },
        { title: "घरेणी", desc: "घरी राहून काम व लवचिक कमाई", icon: <Home className="w-5 h-5 text-amber-400" /> },
        { title: "कॉर्पोरेट स्टाफ", desc: "उन्नतीसाठी अपस्किलिंग", icon: <Briefcase className="w-5 h-5 text-cyan-400" /> },
        { title: "फ्रीलान्सर", desc: "सेवा व क्लायंट आधार वाढवा", icon: <Layers className="w-5 h-5 text-emerald-400" /> },
        { title: "उद्योजक", desc: "फनेल व मार्केटिंग स्ट्रॅटेजी शिका", icon: <Zap className="w-5 h-5 text-rose-400" /> },
        { title: "अतिरिक्त कमाई हवी असलेले सर्व", desc: "कमी गुंतवणूक, उच्च-परताव्याची कमाईची संधी", icon: <DollarSign className="w-5 h-5 text-lime-400" /> },
      ],
      jobSupportItems: [
        "इंटर्नशिप व कॉलेज प्रोग्राम",
        "वर्क-फ्रॉम-होम नोकऱ्या",
        "रेझ्युमे व मुलाखत तयारी",
        "फ्रीलान्स प्रोजेक्ट मार्गदर्शन",
      ],
      badges: ["MSME / UDYAM नोंदणीकृत", "ISO प्रमाणित", "साप्ताहिक पेआउट व मार्गदर्शन"],
      courseList: [
        "Canva मास्टरी — बिझनेस डिझाइन्स",
        "व्हिडिओ एडिटिंग — शॉर्ट व लांब व्हिडिओ",
        "इंस्टाग्राम मास्टरी — ब्रँडिंग व कंटेंट",
        "फेसबुक बेसिक्स — जाहिरात मूलभूत तत्त्वे",
        "डिजिटल मार्केटिंग — संपूर्ण पाया",
        "ईमेल मार्केटिंग — सोपे ऑटोमेशन",
        "कंटेंट क्रिएशन — रूपांतर करणारे लेखन",
        "गुगल जाहिराती — शोध व प्रदर्शन मूलभूत तत्त्वे",
        "यूट्यूब बेसिक्स — ऑर्गॅनिक पोहोच",
        "पब्लिक स्पीकिंग — आत्मविश्वास वाढवणे",
      ]
    }
  };


  const t = content[lang];

  return (
    <>
      <Helmet>
        <title>{t.siteName} — Learn, Grow & Earn</title>
        <meta name="description" content={t.desc} />
      </Helmet>

      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 bg-[#071035]/80 backdrop-blur-xl border-b border-indigo-900/40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-black text-indigo-300 tracking-wider">
            {t.siteName}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
            {[
              { id: "home", en: "Home", mr: "मुख्य पृष्ठ" },
              { id: "about", en: "About", mr: "बद्दल" },
              { id: "services", en: "Services", mr: "सेवा" },
              { id: "package", en: "Master Package", mr: "मास्टर पॅकेज" },
              { id: "referral", en: "Referral", mr: "रिफरल" },
              { id: "contact", en: "Contact", mr: "संपर्क" },
            ].map((link) => (
              <a key={link.id} href={`#${link.id}`} className="hover:text-amber-400 transition-colors">
                {lang === "en" ? link.en : link.mr}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-indigo-700 bg-indigo-900/50 text-sm text-amber-300 hover:bg-indigo-800 transition-colors"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN" : "MR"}
            </button>

            <a
              href="/login"
              className="px-4 py-2 rounded-full border border-transparent text-slate-100 hover:text-amber-400 transition-colors"
            >
              {lang === "en" ? "Login" : "लॉगिन"}
            </a>

            <PrimaryButton href="/register" className="px-5 py-2">
              {lang === "en" ? "Register" : "नोंदणी"}
            </PrimaryButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-indigo-700 bg-indigo-900/50 text-sm text-amber-300"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN" : "MR"}
            </button>

            <button onClick={() => setOpen(!open)} className="text-white text-3xl hover:text-amber-400 transition-colors" aria-label="Open menu">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#071035] px-6 border-t border-indigo-900 overflow-hidden"
        >
          <div className="flex flex-col gap-3 text-slate-200 py-4">
            {[
              { id: "home", en: "Home", mr: "मुख्य पृष्ठ" },
              { id: "about", en: "About", mr: "बद्दल" },
              { id: "services", en: "Services", mr: "सेवा" },
              { id: "package", en: "Master Package", mr: "मास्टर पॅकेज" },
              { id: "referral", en: "Referral", mr: "रिफरल" },
              { id: "contact", en: "Contact", mr: "संपर्क" },
            ].map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)} className="py-1 hover:text-amber-400 transition-colors">
                {lang === "en" ? link.en : link.mr}
              </a>
            ))}
          </div>

          <div className="flex gap-3 pb-4 pt-2">
            <SecondaryButton href="/login" className="w-full justify-center px-4 py-2 border-indigo-600 text-sm">
              {lang === "en" ? "Login" : "लॉगिन"}
            </SecondaryButton>
            <PrimaryButton href="/register" className="w-full justify-center px-4 py-2 text-sm">
              {lang === "en" ? "Register" : "नोंदणी"}
            </PrimaryButton>
          </div>
        </motion.div>
      </header>

      {/* MAIN */}
      <main id="home" className="min-h-screen bg-gradient-to-b from-[#061028] to-[#0a1840] text-slate-100 pt-24 relative overflow-hidden">
        {/* Subtle background noise/texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />

        {/* HERO */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 lg:px-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ ...fadeIn.animate.transition, duration: 0.8 }}
              className="flex flex-col justify-center gap-6"
            >
              <h1 className="text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-lg">
                {/* <span className="text-amber-400 block tracking-wider mb-2">Excella Digitals:</span> */}
                {t.title}
              </h1>
              <p className="text-slate-300 max-w-xl text-lg">{t.desc}</p>

              <div className="flex flex-wrap gap-4 mt-6">
                <PrimaryButton href="/register" className="text-lg">
                  <Zap className="inline-block w-5 h-5 mr-2" /> {t.getStarted}
                </PrimaryButton>
                <SecondaryButton href="#services" className="text-lg">
                  {t.viewServices}
                </SecondaryButton>
              </div>

              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <motion.div variants={itemIn}>
                  <div className="text-sm text-slate-400">{t.perReferral}</div>
                  <div className="text-3xl font-extrabold text-amber-300">₹600</div>
                </motion.div>
                <motion.div variants={itemIn}>
                  <div className="text-sm text-slate-400">{t.enrollmentFee}</div>
                  <div className="text-3xl font-extrabold text-white">₹1200</div>
                </motion.div>
                <motion.div variants={itemIn}>
                  <div className="text-sm text-slate-400">{t.commission}</div>
                  <div className="text-3xl font-extrabold text-indigo-400">50%</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.0, ease: "backOut", delay: 0.2 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <motion.img
                src={heroImg}
                alt="Digital marketing and skill building"
                className="w-full max-w-lg h-auto rounded-3xl shadow-[0_20px_60px_rgba(59,130,246,0.5)] border border-indigo-700/50"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </section>

        {/* WHO IS THIS FOR (Audience) */}
        <section id="about" className="py-20 bg-[#071132] relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">{t.whoIsThisFor}</h2>
            <p className="text-slate-300 max-w-4xl mx-auto mb-12 text-lg">
              {lang === "en" ? "Excella Digitals is designed for driven individuals ready to transform their skills and income. This is who we help the most:" : "एक्सेला डिजिटल्स हे त्यांच्यासाठी आहे जे आपले कौशल्य आणि उत्पन्न बदलण्यास तयार आहेत. आम्ही खालील लोकांना सर्वाधिक मदत करतो:"}
            </p>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {t.audience.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemIn}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.4)" }}
                  className="p-8 rounded-2xl bg-[#0f1b36] border border-indigo-700 hover:border-indigo-500/80 transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-full bg-indigo-900/50 flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES – Premium Glass Cards */}
        <section
          id="services"
          className="py-20 bg-[#060c1f] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
            <h3 className="text-4xl font-bold text-white mb-12 tracking-wide">
              {t.servicesTitle}
            </h3>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {t.features.map((text, i) => (
                <motion.div
                  key={i}
                  variants={itemIn}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className="
                    group
                    p-8
                    rounded-3xl
                    bg-white/5
                    backdrop-blur-md
                    border border-indigo-500/30
                    shadow-[0_10px_40px_rgba(0,0,0,0.3)]
                    transition-all
                    cursor-pointer
                  "
                >
                  {/* Icon Holder */}
                  <div
                    className="
                      w-14 h-14 mx-auto mb-4 
                      rounded-full 
                      bg-gradient-to-br from-indigo-600 to-blue-500 
                      flex items-center justify-center 
                      shadow-xl 
                      group-hover:scale-110 
                      transition duration-300
                    "
                  >
                    <span className="text-white text-2xl font-black">
                      {i + 1}
                    </span>
                  </div>

                  {/* Text */}
                  <p className="text-slate-200 text-lg mt-2 font-medium leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* MASTER PACKAGE */}
        <section id="package" className="py-20 bg-[#09153a] relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="p-10 lg:p-16 rounded-3xl bg-indigo-900/30 backdrop-blur-sm border border-indigo-700 shadow-2xl grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                className="text-left"
              >
                <h2 className="text-4xl font-black text-amber-300 drop-shadow-md">{t.masterPackageTitle}</h2>
                <p className="text-slate-300 mt-4 text-lg">{t.masterPackageDesc}</p>

                <motion.ul variants={staggerContainer} className="mt-8 space-y-3 text-slate-200 text-lg list-none p-0">
                  {t.courseList.slice(0, 10).map((li, i) => (
                    <motion.li key={i} variants={itemIn} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      {li}
                    </motion.li>
                  ))}
                  <li className="text-indigo-300 font-semibold mt-4"></li>
                </motion.ul>

                <PrimaryButton href="/register" className="mt-10 inline-block text-xl">
                  {t.enrollNow}
                </PrimaryButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col items-center"
              >
                <img src={featureImg} alt="courses bundle" className="rounded-2xl shadow-2xl border border-indigo-700 w-full max-w-sm" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* REFERRAL */}
        <section id="referral" className="py-20 bg-gradient-to-b from-[#06102a] to-[#0a1840] relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-white mb-8 text-center md:text-left">{t.referralTitle}</h3>

              <motion.div variants={staggerContainer} className="space-y-6">
                {t.referralSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={itemIn}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-indigo-800/50 bg-[#0f1b36] transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-amber-300 border border-indigo-500/40">
                      {i + 1}
                    </div>
                    <div>
                      <strong className="text-xl text-white font-semibold">{s.title}</strong>
                      <div className="text-slate-300 mt-1">{s.text}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                {[
                  [t.perReferral, "₹600", "text-amber-300"],
                  [t.enrollmentFee, "₹1200", "text-white"],
                  [t.commission, "50%", "text-indigo-400"],
                ].map(([label, value, colorClass], i) => (
                  <div key={i} className="p-5 bg-indigo-900/50 border border-indigo-700 rounded-xl shadow-lg">
                    <div className="text-sm text-slate-400">{label}</div>
                    <div className={`text-2xl font-black mt-1 ${colorClass}`}>{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center pt-8"
            >
              <img src={graphImg} alt="referral graph" className="rounded-2xl shadow-2xl border border-indigo-700 w-full max-w-md" />
              <p className="mt-4 text-slate-400 text-base text-center font-medium">{lang === "en" ? "Example earnings: More referrals = more passive income." : "उदाहरण कमाई: अधिक रिफरल = जास्त निष्प्रवाही उत्पन्न."}</p>
            </motion.div>
          </div>
        </section>

        {/* JOB SUPPORT */}
        <section id="jobs" className="py-20 bg-[#071132] relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-4xl font-bold text-white mb-6">{lang === "en" ? "Job Placement & Career Support" : "नोकरी प्लेसमेंट व करिअर सपोर्ट"}</h3>
              <p className="text-slate-300 mt-3 text-lg">{lang === "en" ? "On course completion we help with interview preparation, resume improvement, freelancing guidance, and job support, ensuring you are market-ready." : "कोर्स पूर्ण झाल्यावर आम्ही मुलाखत तयारी, रेझ्युमे सुधारणा, फ्रीलान्स मार्गदर्शन व नोकरी सहाय्य करतो, ज्यामुळे तुम्ही बाजारपेठेसाठी तयार व्हाल."}</p>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-8 grid grid-cols-2 gap-4"
              >
                {t.jobSupportItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemIn}
                    className="p-4 bg-indigo-900/50 rounded-xl border border-indigo-700 text-slate-200 font-medium flex items-center gap-2 shadow-md"
                  >
                    <Briefcase className="w-5 h-5 text-amber-400" /> {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center"
            >
              <img src={jobsImg} alt="job support" className="rounded-3xl shadow-2xl border border-indigo-700 w-full max-w-sm" />
            </motion.div>
          </div>
        </section>

        {/* SUCCESS CTA */}
        <section className="py-20 bg-gradient-to-b from-[#06102a] to-[#0a1840] relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
            <img src={successImg} alt="success" className="rounded-2xl w-full max-w-md mx-auto shadow-2xl border border-indigo-700" />
            <h3 className="text-4xl text-white font-black mt-10 tracking-wide">{lang === "en" ? "Start Your Successful Journey Today" : "आजच तुमची यशस्वी यात्रा सुरू करा"}</h3>
            <p className="text-slate-300 mt-4 max-w-3xl mx-auto text-lg">{lang === "en" ? "ISO & MSME registered. Practical training, lifetime access, weekly payouts and dedicated support. Your future starts now." : "ISO व MSME नोंदणीकृत. व्यावहारिक प्रशिक्षण, आयुष्यातभर प्रवेश, साप्ताहिक पेआउट व समर्पित सपोर्ट. तुमचे भविष्य आता सुरू होते."}</p>

            <div className="mt-10">
              <PrimaryButton href="/register" className="text-xl">
                <Calendar className="inline-block w-5 h-5 mr-2" /> {lang === "en" ? "Join & Start Earning" : "साइन अप व कमाई सुरू करा"}
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* CONTACT & BADGES */}
        <section id="contact" className="py-16 bg-[#071132] relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-8">{t.contactTitle}</h3>
            <p className="text-slate-300 text-lg">
              <Mail className="inline-block w-5 h-5 text-indigo-400 mr-2" /> Email: <a href={`mailto:${t.contactEmail}`} className="text-amber-300 hover:text-amber-200 transition-colors font-medium">{t.contactEmail}</a>
              <span className="mx-4 text-slate-500">|</span>
              <Phone className="inline-block w-5 h-5 text-indigo-400 mr-2" /> Phone: <a href={`tel:${t.contactPhone}`} className="text-amber-300 hover:text-amber-200 transition-colors font-medium">{t.contactPhone}</a>
            </p>
            <p className="text-slate-400 mt-2 text-sm">
              Website: <a className="text-indigo-300 hover:text-indigo-200" href="https://excella-digitals.netlify.app/" target="_blank" rel="noreferrer">www.excelladigitals.in</a>
            </p>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {t.badges.map((b, i) => (
                <motion.div
                  key={i}
                  variants={itemIn}
                  whileHover={{ scale: 1.05 }}
                  className="p-5 bg-indigo-900/50 border border-amber-500/50 rounded-xl text-slate-200 font-semibold shadow-lg backdrop-blur-sm"
                >
                  {b}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-[#03061a] border-t border-indigo-900 text-slate-400 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-black text-xl mb-2">{t.siteName}</h4>
              <p className="mt-2 text-sm">{t.footerCopy}</p>
              <div className="mt-4 flex gap-4">
                {/* Social links placeholder */}
                <Globe className="w-5 h-5 text-indigo-400 hover:text-amber-400 cursor-pointer" />
                <Users className="w-5 h-5 text-indigo-400 hover:text-amber-400 cursor-pointer" />
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold text-lg">{lang === "en" ? "Quick Links" : "त्वरित दुवे"}</h5>
              <ul className="mt-3 text-base space-y-2">
                {t.quickLinks.map((ql, i) => (
                  <li key={i}>
                    <a className="text-slate-300 hover:text-amber-400 transition-colors" href={ql === (lang === "en" ? "Register" : "नोंदणी") ? "/register" : ql === (lang === "en" ? "Login" : "लॉगिन") ? "/login" : "#package"}>
                      {ql}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold text-lg">{lang === "en" ? "Courses" : "कोर्सेस"}</h5>
              <ul className="mt-3 text-base space-y-2">
                <li><a className="text-slate-300 hover:text-amber-400 transition-colors" href="#services">{t.features[0].split("—")[0]}</a></li>
                <li><a className="text-slate-300 hover:text-amber-400 transition-colors" href="#services">{t.features[1].split("—")[0]}</a></li>
                <li><a className="text-slate-300 hover:text-amber-400 transition-colors" href="#services">{t.features[2].split("—")[0]}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold text-lg">{lang === "en" ? "Contact Info" : "संपर्क माहिती"}</h5>
              <p className="mt-3 text-sm flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /> {t.contactEmail}</p>
              <p className="text-sm flex items-center gap-2 mt-1"><Phone className="w-4 h-4 text-indigo-400" /> {t.contactPhone}</p>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed">FR4H+PMQ, Bharat Petrol, Pimple Saudagar, Pune 411046</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-indigo-900 pt-6">
            <div className="text-center text-xs text-slate-600">
              © {new Date().getFullYear()} Excella Digitals. All rights reserved.
              <span className="mx-2 text-slate-700">|</span>
              <a href="/privacy" className="hover:text-amber-400">Privacy Policy</a>
            </div>
            {/* Footer language toggle */}
            <button onClick={toggleLang} className="px-4 py-1.5 rounded-full border border-indigo-700 bg-indigo-900/50 text-sm text-amber-300 hover:bg-indigo-800 transition-colors">
              {lang === "en" ? "Toggle Language (MR)" : "भाषा बदला (EN)"}
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}