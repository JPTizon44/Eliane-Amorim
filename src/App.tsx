import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Clock,
  Maximize2
} from 'lucide-react';
import { EXPERT_DATA, IMAGES } from './constants';

// --- Components ---

const Button = ({ children, onClick, className = "", icon: Icon }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all ${className}`}
  >
    {Icon && <Icon size={24} />}
    {children}
  </motion.button>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl font-bold text-neutral-900 mb-2">{children}</h2>
    {subtitle && <p className="text-neutral-500 font-medium">{subtitle}</p>}
    <div className="w-16 h-1 bg-rose-500 mx-auto mt-4 rounded-full" />
  </div>
);

const Lightbox = ({ isOpen, image, onClose }: { isOpen: boolean, image: string | null, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={32} />
        </button>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          src={image}
          alt="Resultado"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleWhatsApp = () => {
    window.open(EXPERT_DATA.whatsapp, '_blank');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-neutral-900 font-sans selection:bg-rose-100 relative">
      
      {/* --- Background Watermark --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-[0.20] flex flex-col justify-around items-center">
        <div className="absolute top-[-10%] left-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
        <div className="absolute top-[40%] right-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
        <div className="absolute bottom-[-10%] left-[10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
      </div>
      
      {/* --- Header / Nav --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo / Name */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
              {EXPERT_DATA.name}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-rose-400 font-bold mt-1">
              {EXPERT_DATA.profession}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-semibold text-white/80 hover:text-rose-400 transition-colors">Sobre Nós</a>
            <button 
              onClick={toggleMenu}
              className="text-sm font-semibold text-white/80 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              Procedimentos <ChevronRight size={14} className={isMenuOpen ? 'rotate-90' : ''} />
            </button>
            <a href="#contato" className="text-sm font-semibold text-white/80 hover:text-rose-400 transition-colors">Contato</a>
          </nav>

          {/* Social Icons & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4 border-r border-white/10 pr-3 md:pr-6">
              <a 
                href={EXPERT_DATA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pink-400 transition-colors p-1"
              >
                <Instagram size={22} />
              </a>
              <a 
                href={EXPERT_DATA.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-rose-400 transition-colors p-1"
              >
                <MessageCircle size={22} />
              </a>
            </div>
            
            <button 
              onClick={toggleMenu}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Hamburger Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#FDFCFB] pt-24 px-6 overflow-y-auto"
          >
            {/* --- Background Watermark Replicated --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-[0.10] flex flex-col justify-around items-center">
              <div className="absolute top-[-10%] left-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
              <div className="absolute top-[40%] right-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
              <div className="absolute bottom-[-10%] left-[10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-6 mb-12 md:hidden">
                <a 
                  href="#sobre" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-neutral-900 border-b border-neutral-50 pb-4"
                >
                  Sobre Nós
                </a>
                <a 
                  href="#contato" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-neutral-900 border-b border-neutral-50 pb-4"
                >
                  Contato
                </a>
              </div>

              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-8">
                Nossos Procedimentos
              </h3>
              <div className="grid gap-4">
                {IMAGES.procedures.map((proc) => (
                  <button
                    key={proc.id}
                    onClick={() => {
                      setSelectedProcedure(proc);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-rose-100/50 hover:bg-rose-50 transition-colors group"
                  >
                    <span className="text-lg font-semibold text-neutral-800 group-hover:text-rose-700">
                      {proc.name}
                    </span>
                    <ChevronRight size={20} className="text-neutral-300 group-hover:text-rose-400" />
                  </button>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-neutral-100 pb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-rose-500 text-white"
                  icon={MessageCircle}
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Procedure Modal --- */}
      <AnimatePresence>
        {selectedProcedure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#FDFCFB] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* --- Background Watermark Replicated --- */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-[0.10] flex flex-col justify-around items-center">
                <div className="absolute top-[-10%] left-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
                <div className="absolute top-[40%] right-[-10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
                <div className="absolute bottom-[-10%] left-[10%] text-[40vw] font-sans font-bold tracking-tighter text-rose-900 -rotate-12">EA</div>
              </div>

              <div className="p-6 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-[#FDFCFB]/80 backdrop-blur-md z-20">
                <h3 className="text-2xl font-bold text-neutral-900">{selectedProcedure.name}</h3>
                <button 
                  onClick={() => setSelectedProcedure(null)}
                  className="p-2 hover:bg-rose-100/50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProcedure.images.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                      onClick={() => setLightboxImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${selectedProcedure.name} ${idx}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-white" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-rose-500 text-white"
                  icon={MessageCircle}
                >
                  Agendar {selectedProcedure.name}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Image first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src={IMAGES.hero} 
                alt={EXPERT_DATA.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-100 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-50 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Text second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              Expert em Estética Avançada
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.1] mb-6">
              Cuidado que <span className="text-rose-600">transforma</span>.
            </h1>
            <p className="text-xl text-neutral-600 mb-10 max-w-lg leading-relaxed">
              A {EXPERT_DATA.name} é uma clínica de estética dedicada a realçar sua beleza natural com tratamentos exclusivos e personalizados. Cada procedimento é planejado para atender suas necessidades e elevar sua autoestima, proporcionando uma experiência estética completa e transformadora.
            </p>
            
            <div className="flex flex-col gap-4 items-start">
              <Button 
                onClick={handleWhatsApp}
                className="bg-rose-500 text-white hover:bg-rose-600"
                icon={MessageCircle}
              >
                Agendar horário no WhatsApp
              </Button>
              <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium ml-4">
                <Clock size={16} className="text-rose-500" />
                Resposta rápida via WhatsApp
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Who Am I Section --- */}
      <section id="sobre" className="py-24 bg-white/60 backdrop-blur-[2px] px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            {IMAGES.expert.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`rounded-2xl overflow-hidden shadow-xl ${idx === 1 ? 'mt-12' : ''}`}
              >
                <img 
                  src={img} 
                  alt="Expert Bastidores" 
                  className="w-full h-full object-cover object-top aspect-[3/4]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-4 block">
              Minha Trajetória
            </span>
            <h2 className="text-4xl font-bold text-neutral-900 mb-8">
              Cuidado humano e resultados reais.
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                Olá, eu sou a Eliane. Minha missão é transformar a vida das minhas clientes através de um atendimento humanizado e focado na saúde e estética.
              </p>
              <p>
                Acredito que cada pessoa é única, por isso meus protocolos são totalmente personalizados para as suas necessidades específicas.
              </p>
              
              <ul className="space-y-4 pt-6">
                {[
                  "Atendimento exclusivo e personalizado",
                  "Ambiente acolhedor e seguro",
                  "Tecnologias de última geração",
                  "Foco total na sua satisfação e saúde"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-800 font-medium">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                      <ChevronRight size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- Results Section --- */}
      <section id="procedimentos" className="py-24 bg-neutral-50/60 backdrop-blur-[2px] px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Transformações que inspiram confiança">
            Resultados Reais
          </SectionTitle>
          
          <div className="relative -mx-6 px-6 overflow-hidden pause-on-hover">
            <div className="flex gap-4 w-max animate-marquee">
              {[...IMAGES.results, ...IMAGES.results].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(img)}
                  className="w-72 h-72 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group/item relative shadow-sm"
                >
                  <img 
                    src={img} 
                    alt={`Resultado ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={24} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient Overlays for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent z-20 pointer-events-none" />
          </div>
          
          <p className="text-center text-neutral-400 text-sm mt-12 italic">
            * Resultados podem variar de pessoa para pessoa.
          </p>
        </div>
      </section>

      {/* --- Why Trust Me Section --- */}
      <section className="py-24 bg-white/60 backdrop-blur-[2px] px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>Por que confiar em mim?</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Avaliação Honesta",
                desc: "Analiso cada caso com transparência, indicando apenas o que você realmente precisa.",
                icon: ShieldCheck
              },
              {
                title: "Atendimento Direto",
                desc: "Sem burocracia. Atendimento claro, humanizado e focado na sua experiência.",
                icon: MessageCircle
              },
              {
                title: "Foco no Resultado",
                desc: "Protocolos validados que entregam a transformação que você busca.",
                icon: Star
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-rose-200 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 mb-6">
                  <card.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{card.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Intermediate CTA --- */}
      <section className="py-20 px-6 bg-rose-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Pronta para agendar sua transformação?
          </h2>
          <div className="flex justify-center">
            <Button 
              onClick={handleWhatsApp}
              className="bg-white text-rose-700 hover:bg-neutral-100"
              icon={MessageCircle}
            >
              Agendar horário no WhatsApp
            </Button>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-white rounded-full" />
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section id="contato" className="py-24 bg-white/60 backdrop-blur-[2px] px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-4 border-rose-100 shadow-lg">
            <img 
              src={IMAGES.expert[0]} 
              alt={EXPERT_DATA.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Não deixe sua autoestima para depois.
          </h2>
          <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
            Clique no botão abaixo e fale diretamente comigo para tirar suas dúvidas e garantir seu horário.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button 
              onClick={handleWhatsApp}
              className="bg-rose-500 text-white hover:bg-rose-600 w-full max-w-md py-6 text-xl shadow-2xl shadow-rose-200"
              icon={MessageCircle}
            >
              Agendar agora no WhatsApp
            </Button>
            <p className="text-neutral-400 font-medium">Restam poucas vagas para esta semana!</p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 bg-neutral-900 text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-1">{EXPERT_DATA.name}</h4>
            <p className="text-neutral-400 text-sm">{EXPERT_DATA.profession} | {EXPERT_DATA.city}</p>
            <a 
              href={EXPERT_DATA.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-500 text-xs mt-4 justify-center md:justify-start hover:text-rose-400 transition-colors"
            >
              <MapPin size={14} />
              {EXPERT_DATA.address}
            </a>
          </div>
          
          <div className="flex gap-4">
            <a 
              href={EXPERT_DATA.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-rose-400"
              title="Ver localização no Google Maps"
            >
              <MapPin size={24} />
            </a>
            <a 
              href={EXPERT_DATA.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-pink-400"
            >
              <Instagram size={24} />
            </a>
            <a 
              href={EXPERT_DATA.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center hover:bg-rose-500/30 transition-colors"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-neutral-600 text-xs">
          © {new Date().getFullYear()} {EXPERT_DATA.name}. Todos os direitos reservados.
        </div>
      </footer>

      {/* --- Lightbox --- */}
      <Lightbox 
        isOpen={!!lightboxImage} 
        image={lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />

    </div>
  );
}
