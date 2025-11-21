import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const day1Schedule = [
  { time: "8:00 AM", event: "Registration", venue: "Main Entrance" },
  { time: "9:00 AM", event: "Inauguration Ceremony", venue: "Main Auditorium" },
  { time: "10:00 AM", event: "Classical Solo Dance", venue: "Stage 1" },
  { time: "11:30 AM", event: "Classical Solo (Vocals)", venue: "Stage 2" },
  { time: "1:00 PM", event: "Lunch Break", venue: "Cafeteria" },
  { time: "2:00 PM", event: "Western Solo Dance", venue: "Stage 1" },
  { time: "3:30 PM", event: "Stand-Up Comedy", venue: "Stage 3" },
  { time: "5:00 PM", event: "Folk Dance", venue: "Stage 1" },
  { time: "6:30 PM", event: "Day 1 Closing Performance", venue: "Main Auditorium" },
];

const day2Schedule = [
  { time: "8:00 AM", event: "Registration", venue: "Main Entrance" },
  { time: "9:00 AM", event: "Western Group Dance", venue: "Stage 1" },
  { time: "10:30 AM", event: "Classical Group (Vocals)", venue: "Stage 2" },
  { time: "12:00 PM", event: "Skit & Mime", venue: "Stage 3" },
  { time: "1:00 PM", event: "Lunch Break", venue: "Cafeteria" },
  { time: "2:00 PM", event: "Ramp Walk", venue: "Main Auditorium" },
  { time: "3:30 PM", event: "Mr and Miss Ranvita", venue: "Main Auditorium" },
  { time: "5:00 PM", event: "Short Film Screening", venue: "Media Center" },
  { time: "6:30 PM", event: "Grand Finale & Prize Distribution", venue: "Main Auditorium" },
];

export const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  const schedule = activeDay === 'day1' ? day1Schedule : day2Schedule;
  const dayTitle = activeDay === 'day1' ? 'Aurora' : 'Supernova';
  const dayColor = activeDay === 'day1' ? 'primary' : 'accent';

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-gradient-cosmic"
          style={{ fontFamily: "'Cinzel', serif" }}
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Event Schedule
        </motion.h2>
        
        {/* Day Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
        >
          <motion.button
            onClick={() => setActiveDay('day1')}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all ${
              activeDay === 'day1' 
                ? 'bg-primary text-primary-foreground cosmic-glow' 
                : 'bg-card text-muted-foreground border border-border'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day 1: Aurora
          </motion.button>
          <motion.button
            onClick={() => setActiveDay('day2')}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all ${
              activeDay === 'day2' 
                ? 'bg-accent text-accent-foreground star-glow' 
                : 'bg-card text-muted-foreground border border-border'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day 2: Supernova
          </motion.button>
        </motion.div>

        {/* Schedule Display */}
        <motion.div
          variants={tableVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          key={activeDay}
          className="bg-card/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border"
        >
          <h3 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-${dayColor}`}>
            {dayTitle}
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-background/30 rounded-lg sm:rounded-xl hover:bg-background/50 transition-all"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className={`w-4 h-4 sm:w-5 sm:h-5 text-${dayColor}`} />
                  <span className="text-sm sm:text-base md:text-lg font-semibold min-w-[80px] sm:min-w-[100px]">{item.time}</span>
                </div>
                <div className="flex-1 pl-6 sm:pl-0">
                  <p className="text-sm sm:text-base md:text-lg font-medium">{item.event}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {item.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
