import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const VideoSection = () => {
  return (
    <section className="relative py-20 px-0 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-8 px-4"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-2">Flashback</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">The Ranvita Legacy</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto"
        >
          {/* Video Container - Edge to Edge on Mobile */}
          <div className="relative aspect-video w-full sm:rounded-3xl overflow-hidden border-y sm:border border-white/10 bg-black shadow-2xl group">
            {/* Overlay Gradient that fades out on hover/interaction */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60" />
            
            <video
              className="w-full h-full object-cover"
              playsInline
              controls
              preload="metadata"
              poster="/media/ranvita-poster.jpg" 
            >
              <source src="/media/ranvita-highlight.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Decorative glow behind video */}
            <div className="absolute -inset-4 -z-10 bg-primary/20 blur-3xl opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};