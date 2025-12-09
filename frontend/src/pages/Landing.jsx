// src/pages/Landing.jsx
import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState(
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en"
  );

  React.useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "mr" : "en"));

  // Images (medium-sized)
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
    en: {
      siteName: "Excella Digitals",
      title: "Push Boundaries. Build Skills. Earn Passively.",
      desc:
        "Excella Digitals trains students, creators and freelancers in practical digital skills (Canva, social media management, video editing, branding) and helps them earn with a 50% commission referral model. ISO & MSME registered — high-quality content, real support.",
      getStarted: "Get Started",
      viewServices: "View Services",
      perReferral: "Per Referral",
      enrollmentFee: "Enrollment Fee",
      commission: "Commission",
      whoIsThisFor: "Who is this for?",
      servicesTitle: "Our Services",
      masterPackageTitle: "EXCELLA MASTER PACKAGE — only ₹1200",
      masterPackageDesc:
        "10+ practical business-focused courses in one package. Marathi & Hindi support available on request.",
      enrollNow: "Enroll Now — ₹1200",
      referralTitle: "Affiliate / Referral — Your Income, Your Pace",
      referralSteps: [
        {
          title: "Join the Program",
          text: "Sign up and get your referral link."
        },
        {
          title: "Get Referral Link",
          text: "Share it on WhatsApp & social."
        },
        {
          title: "Promote Courses",
          text: "Use templates & creatives."
        },
        {
          title: "Earn Commission",
          text: "Earn ₹600 per referral (50% commission)."
        }
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
        "Content Strategy — Plan content that converts"
      ],
      audience: [
        "Students — Learn job-ready skills and build side-income",
        "Homemakers — Work from home & earn",
        "Corporate Staff — Upskill for better roles",
        "Freelancers — Expand services & clients",
        "Aspiring Entrepreneurs — Learn funnels & marketing",
        "Anyone Who Wants Extra Income"
      ],
      jobSupportItems: [
        "Internship & College Programs",
        "Work-from-home Jobs",
        "Resume & Interview Prep",
        "Freelance Project Mentorship"
      ],
      badges: ["MSME / UDYAM Registered", "ISO Certified", "Weekly Payouts & Mentorship"]
    },

    mr: {
      siteName: "Excella Digitals",
      title: "Push Boundaries. Build Skills. Earn Passively.",
      desc:
        "एक्सेला डिजिटल्स विद्यार्थ्यांना, क्रिएटर्सना आणि फ्रीलान्सर्सना व्यावहारिक डिजिटल कौशल्ये (Canva, सोशल मिडिया मॅनेजमेंट, व्हिडिओ एडिटिंग, ब्रँडिंग) शिकवते आणि 50% कमिशन रिफरल मॉडेलद्वारे कमाईची संधी देते. ISO व MSME नोंदणीकृत — उच्च प्रतीचे कंटेंट व सक्रिय सपोर्ट.",
      getStarted: "सुरू करा",
      viewServices: "सेवा पहा",
      perReferral: "प्रत्येक रिफरल",
      enrollmentFee: "नोंदणी फी",
      commission: "कमिशन",
      whoIsThisFor: "हे कोणासाठी आहे?",
      servicesTitle: "आमच्या सेवा",
      masterPackageTitle: "EXCELLA मास्टर पॅकेज — फक्त ₹1200",
      masterPackageDesc:
        "10+ व्यावहारिक बिझिनेस कोर्सेस एका पॅकेजमध्ये. मराठी व हिंदी सपोर्ट विनंतीनुसार उपलब्ध.",
      enrollNow: "नोंदणी करा — ₹1200",
      referralTitle: "अ‍ॅफिलिएट / रिफरल — तुमची कमाई, तुमचा वेगळा गती",
      referralSteps: [
        {
          title: "प्रोग्राममध्ये सामील व्हा",
          text: "साइन अप करा व तुमचा रिफरल लिंक मिळवा."
        },
        {
          title: "रिफरल लिंक मिळवा",
          text: "ह्या लिंकला WhatsApp व सोशलवर शेअर करा."
        },
        {
          title: "कोर्सेस प्रमोट करा",
          text: "टेम्पलेट्स व क्रिएटिव्ह वापरा."
        },
        {
          title: "कमिशन कमवा",
          text: "प्रत्येक रिफरलवर ₹600 कमवा (50% कमिशन)."
        }
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
        "कंटेंट स्ट्रॅटेजी — रूपांतर करणारे कंटेंट"
      ],
      audience: [
        "विद्यार्थी — नोकरी-तयार कौशल्ये व साइड-इनकम",
        "घरेणी — घरी राहून काम व कमाई",
        "कॉर्पोरेट स्टाफ — उन्नतीसाठी अपस्किलिंग",
        "फ्रीलान्सर — सेवा व क्लायंट वाढवा",
        "उद्योजक — फनेल व मार्केटिंग शिका",
        "अतिरिक्त कमाई हवी असलेले सर्व"
      ],
      jobSupportItems: [
        "इंटर्नशिप व कॉलेज प्रोग्राम",
        "वर्क-फ्रॉम-होम नोकऱ्या",
        "रेझ्युमे व मुलाखत तयारी",
        "फ्रीलान्स प्रोजेक्ट मार्गदर्शन"
      ],
      badges: ["MSME / UDYAM नोंदणीकृत", "ISO प्रमाणित", "साप्ताहिक पेआउट व मार्गदर्शन"]
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
      <header className="w-full fixed top-0 left-0 z-50 bg-[#071035]/90 backdrop-blur-md border-b border-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-extrabold text-white">
            {t.siteName}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-slate-200 font-medium">
            <a href="#home" className="hover:text-indigo-300">
              {lang === "en" ? "Home" : "मुख्य पृष्ठ"}
            </a>
            <a href="#about" className="hover:text-indigo-300">
              {lang === "en" ? "About" : "बद्दल"}
            </a>
            <a href="#services" className="hover:text-indigo-300">
              {lang === "en" ? "Services" : "सेवा"}
            </a>
            <a href="#package" className="hover:text-indigo-300">
              {lang === "en" ? "Master Package" : "मास्टर पॅकेज"}
            </a>
            <a href="#referral" className="hover:text-indigo-300">
              {lang === "en" ? "Referral" : "रिफरल"}
            </a>
            <a href="#contact" className="hover:text-indigo-300">
              {lang === "en" ? "Contact" : "संपर्क"}
            </a>
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-md border border-slate-700 text-sm text-slate-200"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN" : "MR"}
            </button>

            <a
              href="/login"
              className="px-4 py-2 rounded-md border border-transparent hover:border-indigo-300 text-slate-100"
            >
              {lang === "en" ? "Login" : "लॉगिन"}
            </a>

            <a
              href="/register"
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow"
            >
              {lang === "en" ? "Register" : "नोंदणी"}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-md border border-slate-700 text-sm text-slate-200"
              aria-label="Toggle language"
            >
              {lang === "en" ? "EN" : "MR"}
            </button>

            <button onClick={() => setOpen(!open)} className="text-white text-2xl" aria-label="Open menu">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-[#071035] px-6 pb-6 border-t border-[#0f172a]">
            <div className="flex flex-col gap-3 text-slate-200 py-4">
              <a href="#home" onClick={() => setOpen(false)}>{lang === "en" ? "Home" : "मुख्य पृष्ठ"}</a>
              <a href="#about" onClick={() => setOpen(false)}>{lang === "en" ? "About" : "बद्दल"}</a>
              <a href="#services" onClick={() => setOpen(false)}>{lang === "en" ? "Services" : "सेवा"}</a>
              <a href="#package" onClick={() => setOpen(false)}>{lang === "en" ? "Master Package" : "मास्टर पॅकेज"}</a>
              <a href="#referral" onClick={() => setOpen(false)}>{lang === "en" ? "Referral" : "रिफरल"}</a>
              <a href="#contact" onClick={() => setOpen(false)}>{lang === "en" ? "Contact" : "संपर्क"}</a>
            </div>

            <div className="flex gap-3">
              <a href="/login" className="px-4 py-2 rounded-md bg-transparent text-white border border-slate-700 w-full text-center">
                {lang === "en" ? "Login" : "लॉगिन"}
              </a>
              <a href="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white w-full text-center">
                {lang === "en" ? "Register" : "नोंदणी"}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main id="home" className="min-h-screen bg-gradient-to-b from-[#061028] to-[#071132] text-slate-100 pt-24">
        {/* HERO */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center gap-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{t.title}</h1>
              <p className="text-slate-300 max-w-xl">{t.desc}</p>

              <div className="flex gap-4 mt-4">
                <a href="/register" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-md font-medium shadow">
                  {t.getStarted || content.en.getStarted}
                </a>
                <a href="#services" className="px-6 py-3 border border-slate-600 rounded-md text-slate-200 hover:bg-white/5">
                  {t.viewServices || content.en.viewServices}
                </a>
              </div>

              <div className="mt-6 flex gap-6">
                <div>
                  <div className="text-xs text-slate-300">{t.perReferral}</div>
                  <div className="text-xl font-semibold">₹600</div>
                </div>
                <div>
                  <div className="text-xs text-slate-300">{t.enrollmentFee}</div>
                  <div className="text-xl font-semibold">₹1200</div>
                </div>
                <div>
                  <div className="text-xs text-slate-300">{t.commission}</div>
                  <div className="text-xl font-semibold">50%</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  whileHover={{ scale: 1.03, y: -6 }}
  className="flex items-center justify-center">
              <img src={heroImg} alt="digital marketing" className="w-full max-w-md h-80  rounded-xl shadow-2xl shadow-[0_10px_40px_rgba(59,130,246,0.25)]  border border-slate-700" animate={{
      y: [0, -6, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }} />
            </motion.div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section id="about" className="py-16 bg-[#071132]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{t.whoIsThisFor}</h2>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8">{lang === "en" ? content.en.desc : content.mr.desc}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {t.audience.map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0f1b36] border border-slate-700">
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
 {/* SERVICES – Premium Glass Cards */}
<section
  id="services"
  className="py-20 bg-[#060c1f] relative overflow-hidden"
>
  {/* subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07102c]/70 pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
    <h3 className="text-3xl font-bold text-white mb-10 tracking-wide">
      {t.servicesTitle}
    </h3>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {t.features.map((text, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.04, rotate: 1 }}
          className="
            group
            p-8
            rounded-2xl
            bg-white/5
            backdrop-blur-xl
            border border-slate-700/40
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all
          "
        >
          {/* Icon Holder */}
          <div
            className="
              w-14 h-14 mx-auto mb-4 
              rounded-xl 
              bg-gradient-to-br from-blue-600 to-indigo-500 
              flex items-center justify-center 
              shadow-lg 
              group-hover:scale-110 
              transition
            "
          >
            <span className="text-white text-2xl font-bold">
              {i + 1}
            </span>
          </div>

          {/* Text */}
          <p className="text-slate-200 text-lg mt-2 leading-relaxed">
            {text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


        {/* MASTER PACKAGE */}
        <section id="package" className="py-16 bg-[#071132]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white">{t.masterPackageTitle}</h2>
            <p className="text-slate-300 mt-3">{t.masterPackageDesc}</p>

            <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <ul className="space-y-3 text-slate-200 text-left">
                  {[
                    "Canva Mastery — business designs",
                    "Video Editing — short & long form",
                    "Instagram Mastery — branding & content",
                    "Facebook Basics — ads fundamentals",
                    "Digital Marketing — full foundation",
                    "Email Marketing — simple automation",
                    "Content Creation — writing that converts",
                    "Google Ads — search & display basics",
                    "YouTube Basics — organic reach",
                    "Public Speaking — confidence building"
                  ].map((li, i) => (
                    <li key={i}>{lang === "en" ? li : content.mr.features[i] || li}</li>
                  ))}
                </ul>

                <a href="/register" className="mt-8 inline-block px-6 py-3 bg-indigo-500 rounded-md text-white font-medium shadow">
                  {t.enrollNow}
                </a>
              </div>

              <div className="flex flex-col items-center">
                <img src={featureImg} alt="courses" className="rounded-xl shadow-lg border border-slate-700 w-full max-w-sm" />
                <div className="mt-4 bg-[#0b1630] border border-slate-700 p-4 rounded-lg text-slate-300 text-sm">
                  {lang === "en"
                    ? "All courses available with Marathi and Hindi support on request."
                    : "विनंतीनुसार सर्व कोर्स मराठी व हिंदी सपोर्टसह उपलब्ध आहेत."}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REFERRAL */}
        <section id="referral" className="py-16 bg-gradient-to-b from-[#06102a] to-[#071132]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 text-center md:text-left">{t.referralTitle}</h3>

              <ol className="space-y-6 text-slate-200 list-decimal ml-6">
                {t.referralSteps.map((s, i) => (
                  <li key={i}>
                    <strong className="text-white">{s.title}</strong>
                    <div className="text-slate-300">{s.text}</div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  [lang === "en" ? "Referral" : "रिफरल", "₹600"],
                  [lang === "en" ? "Fee" : "फी", "₹1200"],
                  [lang === "en" ? "Commission" : "कमिशन", "50%"]
                ].map(([label, value], i) => (
                  <div key={i} className="p-4 bg-[#0b1630] border border-slate-700 rounded">
                    <div className="text-sm text-slate-300">{label}</div>
                    <div className="text-xl font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img src={graphImg} alt="referral graph" className="rounded-xl shadow-lg border border-slate-700 w-full max-w-md" />
              <p className="mt-3 text-slate-400 text-sm text-center">{lang === "en" ? "Example earnings: More referrals = more passive income." : "उदाहरण कमाई: अधिक रिफरल = जास्त निष्प्रवाही उत्पन्न."}</p>
            </div>
          </div>
        </section>

        {/* JOB SUPPORT */}
        <section id="jobs" className="py-16 bg-[#071132]">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">{lang === "en" ? "Job Placement & Career Support" : "नोकरी प्लेसमेंट व करिअर सपोर्ट"}</h3>
              <p className="text-slate-300 mt-3">{lang === "en" ? "On course completion we help with interview preparation, resume improvement, freelancing guidance, and job support." : "कोर्स पूर्ण झाल्यावर आम्ही मुलाखत तयारी, रेझ्युमे सुधारणा, फ्रीलान्स मार्गदर्शन व नोकरी सहाय्य करतो."}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {t.jobSupportItems.map((item, i) => (
                  <div key={i} className="p-4 bg-[#0b1630] rounded border border-slate-700 text-slate-200">{item}</div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <img src={jobsImg} alt="job support" className="rounded-xl shadow-lg border border-slate-700 w-full max-w-sm" />
            </div>
          </div>
        </section>

        {/* SUCCESS */}
        <section className="py-16 bg-gradient-to-b from-[#06102a] to-[#071132]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <img src={successImg} alt="success" className="rounded-xl w-full max-w-md mx-auto shadow-lg border border-slate-700" />
            <h3 className="text-3xl text-white font-bold mt-8">{lang === "en" ? "Start Your Successful Journey Today" : "आजच तुमची यशस्वी यात्रा सुरू करा"}</h3>
            <p className="text-slate-300 mt-3 max-w-2xl mx-auto">{lang === "en" ? "ISO & MSME registered. Practical training, lifetime access, weekly payouts and dedicated support." : "ISO व MSME नोंदणीकृत. व्यावहारिक प्रशिक्षण, आयुष्यातभर प्रवेश, साप्ताहिक पेआउट व समर्पित सपोर्ट."}</p>

            <div className="mt-8">
              <a href="/register" className="px-6 py-3 bg-indigo-500 text-white rounded-md font-medium">{lang === "en" ? "Join & Start Earning" : "साइन अप व कमाई सुरू करा"}</a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12 bg-[#071132]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-white">{t.contactTitle}</h3>
            <p className="text-slate-300 mt-3">
              Email: <a href={`mailto:${t.contactEmail}`} className="text-indigo-300">{t.contactEmail}</a> • Phone: <a href={`tel:${t.contactPhone}`} className="text-indigo-300">{t.contactPhone}</a>
            </p>
            <p className="text-slate-400 mt-2">
              Website: <a className="text-indigo-300" href="https://excella-digitals.netlify.app/" target="_blank" rel="noreferrer">www.excelladigitals.in</a>
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {t.badges.map((b, i) => (
                <div key={i} className="p-4 bg-[#0b1630] border border-slate-700 rounded text-slate-200">{b}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 bg-[#03061a] border-t border-slate-800 text-slate-400">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-semibold">{t.siteName}</h4>
              <p className="mt-2 text-sm">{t.footerCopy}</p>
            </div>

            <div>
              <h5 className="text-white">{lang === "en" ? "Quick Links" : "त्वरित दुवे"}</h5>
              <ul className="mt-2 text-sm space-y-1">
                {t.quickLinks.map((ql, i) => (
                  <li key={i}><a className="text-slate-300" href={ql === (lang === "en" ? "Register" : "नोंदणी") ? "/register" : ql === (lang === "en" ? "Login" : "लॉगिन") ? "/login" : "#package"}>{ql}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white">{lang === "en" ? "Contact" : "संपर्क"}</h5>
              <p className="mt-2 text-sm">{t.contactEmail}</p>
              <p className="text-sm">{t.contactPhone}</p>
              <p className="mt-2 text-xs text-slate-500">Address: FR4H+PMQ, Bharat Petrol, Pimple Saudagar, Pune 411046</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {/* Footer language toggle (visible on mobile too) */}
            <button onClick={toggleLang} className="px-3 py-2 rounded-md border border-slate-700 text-sm text-slate-200">
              {lang === "en" ? "EN" : "MR"}
            </button>
            <div className="text-center text-xs text-slate-600">© {new Date().getFullYear()} Excella Digitals. All rights reserved.</div>
          </div>
        </footer>
      </main>
    </>
  );
}
