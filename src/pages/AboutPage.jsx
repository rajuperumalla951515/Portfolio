import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import SiteFooter from '../components/SiteFooter';
import * as Lucide from 'lucide-react';
import profilePhoto from '../assets/profile.png';
import googleLogo from '../assets/google-logo.png';
import sapLogo from '../assets/sap-logo.png';
import capgeminiLogo from '../assets/Capgemini Logo.jpeg';

import { usePageSEO } from '../utils/usePageSEO';

const IconWrapper = ({ name, ...props }) => {
  const Icon = Lucide[name];
  return Icon ? <Icon {...props} /> : <Lucide.Check {...props} />;
};

const AboutPage = () => {
  usePageSEO({
    title: "About Raju Perumalla | Full-Stack & AI Engineer",
    description: "Learn about Raju Perumalla's background in software engineering, Cloud architectures, SAP BTP, computer vision systems, and Google Student Ambassador role.",
    canonical: "https://www.rajuperumalla.in/about",
    ogImage: "https://www.rajuperumalla.in/images/profile.png",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-outfit selection:bg-red-500/30 selection:text-white">
      <HeaderNav />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/80">About</span>
        </nav>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase">
              <IconWrapper name="User" size={14} /> Engineer & Creator
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-blue-500">Raju Perumalla</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Full-Stack Software Engineer, Machine Learning developer, and technical educator based in India. 
              Currently pursuing Computer Science & Engineering (Class of 2027), selected as a 
              <strong> Google Student Ambassador 2026</strong>, and recognized as 
              <strong> 2nd Runner-Up in the Capgemini Tech Challenge</strong> and 
              <strong> Finalist in the SAP Innovation Marathon 4.0</strong>.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl p-1 bg-gradient-to-br from-red-500/30 via-purple-500/20 to-blue-500/30 border border-white/10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <img
                src={profilePhoto}
                alt="Raju Perumalla"
                className="w-full h-full object-cover rounded-[22px]"
              />
            </div>
          </div>
        </div>

        {/* Background & Mission */}
        <section className="space-y-6 mb-16 text-white/80 leading-relaxed text-sm md:text-base border-t border-white/5 pt-10">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <IconWrapper name="Compass" size={22} className="text-red-400" />
            Engineering Philosophy & Mission
          </h2>
          <p>
            I focus on bridging the gap between cutting-edge computational intelligence (Machine Learning, Computer Vision, IoT) and scalable enterprise software architecture. Whether designing accident prevention systems with embedded telematics or orchestrating cloud microservices with FastAPI and Node.js, my goal is to build resilient software that solves tangible human problems.
          </p>
          <p>
            Beyond shipping software, I am dedicated to knowledge sharing. Over the past three years, I have hosted 4+ hands-on technical workshops on modern software development and grown a community of over <strong>2,500 subscribers on YouTube</strong>, teaching practical coding, API design, and deployment strategies.
          </p>
        </section>

        {/* Key Milestones & Credentials */}
        <section className="mb-16 border-t border-white/5 pt-10">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8 flex items-center gap-2">
            <IconWrapper name="Award" size={22} className="text-amber-400" />
            Recognitions & Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Capgemini */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 mb-4">
                <img src={capgeminiLogo} alt="Capgemini" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-white text-base">2nd Runner-Up @ Capgemini</h3>
              <p className="text-xs text-amber-400 font-semibold mt-1">Tech Challenge (T4PF) Hackathon</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Awarded podium position in nationwide technical challenge for software engineering excellence and scalable architecture.
              </p>
            </div>

            {/* Google */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2 mb-4">
                <img src={googleLogo} alt="Google" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-white text-base">Google Student Ambassador</h3>
              <p className="text-xs text-blue-400 font-semibold mt-1">Class of 2026</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Selected campus lead advocating developer ecosystems, Google Cloud platforms, and collaborative technical education.
              </p>
            </div>

            {/* SAP */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center p-2 mb-4">
                <img src={sapLogo} alt="SAP" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-white text-base">SAP Innovation Marathon</h3>
              <p className="text-xs text-purple-400 font-semibold mt-1">National Finalist 4.0</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Pitched SmartGuardian architecture to enterprise panel, solving real-world driver safety using IoT and telemetry algorithms.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Domain Competencies */}
        <section className="mb-16 border-t border-white/5 pt-10">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
            <IconWrapper name="Cpu" size={22} className="text-blue-400" />
            Core Technical Proficiencies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <h3 className="font-bold text-white">Languages & Core</h3>
              <p className="text-white/60">Python, Java, C/C++, JavaScript (ES6+), SQL, Dart</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <h3 className="font-bold text-white">Web & Backend Frameworks</h3>
              <p className="text-white/60">FastAPI, Express.js, Node.js, React.js, Tailwind CSS, REST APIs</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <h3 className="font-bold text-white">AI, ML & Computer Vision</h3>
              <p className="text-white/60">OpenCV, YOLOv8, PyTorch, ONNX, Predictive Modeling, Real-Time Edge Video</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <h3 className="font-bold text-white">Cloud, Enterprise & Databases</h3>
              <p className="text-white/60">SAP BTP, ABAP Cloud, Supabase (PostgreSQL), MongoDB Atlas, Docker, Firebase</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="border border-white/10 rounded-2xl p-8 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Have a project, collaboration, or opportunity?</h3>
            <p className="text-white/60 text-sm mt-1">Feel free to reach out via email or read my latest technical writings.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg">
              Get in Touch
            </Link>
            <Link to="/decode" className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all">
              Explore Decode
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default AboutPage;
