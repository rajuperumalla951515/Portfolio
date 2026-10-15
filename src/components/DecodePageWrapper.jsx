import { motion, useReducedMotion } from 'framer-motion';
import { useTransitionContext } from '../context/TransitionContext';

/**
 * DecodePageWrapper provides a cinematic 3D perspective transition
 * when entering Decode from the portfolio or navigating back to the portfolio.
 *
 * It coordinates with TransitionContext to smoothly animate the physical surface,
 * respecting user preferences for reduced motion.
 */
export const DecodePageWrapper = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const { isTransitioningToPortfolio } = useTransitionContext();

  return (
    <div
      className="w-full min-h-screen bg-[#fcfcfc] overflow-x-hidden selection:bg-red-100 selection:text-red-900"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : {
          opacity: 0,
          y: 20,
          scale: 0.965,
          rotateX: 3.5,
        }}
        animate={isTransitioningToPortfolio ? {
          opacity: 0,
          y: 20,
          scale: 0.965,
          rotateX: 3.5,
          transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
        } : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: { duration: 0.44, ease: [0.16, 1, 0.3, 1] }
        }}
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
        }}
        className={`min-h-screen flex flex-col bg-white text-zinc-900 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DecodePageWrapper;
