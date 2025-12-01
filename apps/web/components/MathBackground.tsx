'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface MathSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

// Seeded random number generator for consistent server/client rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Pre-computed static data to avoid hydration mismatches
const symbols = [
  // Numbers (Arabic-inspired for Tarabi3)
  '٢', '٣', '٤', '٧', '٨', '٩',
  // Math operators
  '+', '−', '×', '÷', '=', '≠', '≈',
  // Greek letters
  'π', 'Σ', 'Δ', 'λ', 'θ', 'α', 'β', 'γ', 'Ω',
  // Calculus & advanced
  '∫', '∂', '∞', '√', '∑', '∏',
  // Geometry
  '∠', '⊥', '∥', '△', '□', '◇',
  // Set theory
  '∈', '∉', '⊂', '⊃', '∪', '∩',
  // Arrows & relations
  '→', '←', '↔', '⇒', '⇔',
  // Brackets
  '{ }', '[ ]', '( )',
  // Superscripts
  'x²', 'x³', 'xⁿ', 'n!',
  // Fractions representation
  '½', '⅓', '¼', '⅔',
];

// Generate static math symbols with seeded randomness
const mathSymbols: MathSymbol[] = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  symbol: symbols[Math.floor(seededRandom(i * 1) * symbols.length)],
  x: seededRandom(i * 2) * 100,
  y: seededRandom(i * 3) * 100,
  size: 12 + seededRandom(i * 4) * 24,
  duration: 15 + seededRandom(i * 5) * 25,
  delay: seededRandom(i * 6) * 10,
  opacity: 0.03 + seededRandom(i * 7) * 0.08,
  rotation: seededRandom(i * 8) * 360,
}));

export default function MathBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Floating equations - static data
  const equations = [
    { id: 'eq1', text: 'E = mc²', x: 15, y: 20 },
    { id: 'eq2', text: 'a² + b² = c²', x: 75, y: 35 },
    { id: 'eq3', text: '∫ f(x)dx', x: 85, y: 70 },
    { id: 'eq4', text: 'Σ(n=1→∞)', x: 10, y: 75 },
    { id: 'eq5', text: 'lim x→∞', x: 60, y: 15 },
    { id: 'eq6', text: 'f(x) = ax + b', x: 25, y: 55 },
    { id: 'eq7', text: 'Δy/Δx', x: 80, y: 85 },
    { id: 'eq8', text: '√(x² + y²)', x: 45, y: 80 },
  ];

  // Grid lines for geometric feel - static data
  const gridLines = Array.from({ length: 15 }, (_, i) => [
    {
      id: `h${i}`,
      type: 'horizontal' as const,
      position: (i + 1) * 6.66,
      delay: i * 0.1,
    },
    {
      id: `v${i}`,
      type: 'vertical' as const,
      position: (i + 1) * 6.66,
      delay: i * 0.1 + 0.05,
    },
  ]).flat();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Subtle grid pattern */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern
            id="mathGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mathGrid)" />
      </svg>

      {/* Animated grid lines */}
      {gridLines.map((line) => (
        <motion.div
          key={line.id}
          style={{
            position: 'absolute',
            backgroundColor: 'var(--tarabi3-accent)',
            opacity: 0,
            ...(line.type === 'horizontal'
              ? {
                  top: `${line.position}%`,
                  left: 0,
                  width: '100%',
                  height: '1px',
                }
              : {
                  left: `${line.position}%`,
                  top: 0,
                  width: '1px',
                  height: '100%',
                }),
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.02 }
              : {
                  opacity: [0, 0.06, 0],
                }
          }
          transition={{
            duration: 8,
            delay: line.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating math symbols */}
      {mathSymbols.map((item) => (
        <motion.div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: 'var(--tarabi3-light)',
            opacity: item.opacity,
            transform: `rotate(${item.rotation}deg)`,
            userSelect: 'none',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  rotate: [item.rotation, item.rotation + 10, item.rotation],
                  opacity: [item.opacity, item.opacity * 1.5, item.opacity],
                }
          }
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}

      {/* Floating equations */}
      {equations.map((eq, index) => (
        <motion.div
          key={eq.id}
          style={{
            position: 'absolute',
            left: `${eq.x}%`,
            top: `${eq.y}%`,
            fontSize: '14px',
            fontFamily: '"Courier New", monospace',
            color: 'var(--tarabi3-accent)',
            opacity: 0.08,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.05, 0.12, 0.05],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            duration: 6 + index,
            delay: index * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {eq.text}
        </motion.div>
      ))}

      {/* Geometric shapes */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Rotating circle with radius lines */}
        <motion.g
          style={{ transformOrigin: '20% 30%' }}
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <circle
            cx="20%"
            cy="30%"
            r="80"
            fill="none"
            stroke="var(--tarabi3-accent)"
            strokeWidth="0.5"
            opacity="0.06"
          />
          <line
            x1="20%"
            y1="30%"
            x2="calc(20% + 80px)"
            y2="30%"
            stroke="var(--tarabi3-accent)"
            strokeWidth="0.5"
            opacity="0.06"
          />
        </motion.g>

        {/* Fibonacci spiral suggestion */}
        <motion.path
          d="M 85% 60% Q 80% 65% 82% 70% Q 85% 75% 90% 72% Q 95% 68% 92% 62%"
          fill="none"
          stroke="var(--tarabi3-accent-alt)"
          strokeWidth="1"
          opacity="0.05"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  pathLength: [0, 1, 0],
                  opacity: [0.02, 0.08, 0.02],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Triangle with labeled vertices */}
        <motion.g
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.04, 0.1, 0.04],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <polygon
            points="70,750 150,620 230,750"
            fill="none"
            stroke="var(--tarabi3-light)"
            strokeWidth="0.5"
            opacity="0.06"
          />
          <text x="65" y="765" fontSize="10" fill="var(--tarabi3-light)" opacity="0.06">A</text>
          <text x="148" y="610" fontSize="10" fill="var(--tarabi3-light)" opacity="0.06">B</text>
          <text x="235" y="765" fontSize="10" fill="var(--tarabi3-light)" opacity="0.06">C</text>
        </motion.g>

        {/* Coordinate axes */}
        <motion.g
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.03, 0.08, 0.03],
                }
          }
          transition={{
            duration: 7,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <line x1="88%" y1="25%" x2="98%" y2="25%" stroke="var(--tarabi3-light)" strokeWidth="1" />
          <line x1="93%" y1="15%" x2="93%" y2="35%" stroke="var(--tarabi3-light)" strokeWidth="1" />
          <text x="97%" y="23%" fontSize="8" fill="var(--tarabi3-light)">x</text>
          <text x="94%" y="17%" fontSize="8" fill="var(--tarabi3-light)">y</text>
          {/* Plot points */}
          <circle cx="94%" cy="22%" r="2" fill="var(--tarabi3-accent)" />
          <circle cx="96%" cy="20%" r="2" fill="var(--tarabi3-accent)" />
          <circle cx="91%" cy="28%" r="2" fill="var(--tarabi3-accent)" />
        </motion.g>
      </svg>

      {/* Pulsing square accents (brand element) */}
      {[
        { x: 5, y: 10, size: 40 },
        { x: 92, y: 85, size: 30 },
        { x: 50, y: 5, size: 25 },
        { x: 8, y: 90, size: 35 },
      ].map((square, i) => (
        <motion.div
          key={`square-${i}`}
          style={{
            position: 'absolute',
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: square.size,
            height: square.size,
            border: '1px solid var(--tarabi3-accent)',
            opacity: 0.08,
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.05, 0.15, 0.05],
                }
          }
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Binary/code-like elements */}
      {['01101', '10010', '11001', '00110'].map((binary, i) => (
        <motion.div
          key={`binary-${i}`}
          style={{
            position: 'absolute',
            left: `${15 + i * 25}%`,
            top: `${85 + (i % 2) * 5}%`,
            fontSize: '10px',
            fontFamily: 'monospace',
            color: 'var(--tarabi3-accent-alt)',
            opacity: 0.06,
            letterSpacing: '2px',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.03, 0.1, 0.03],
                }
          }
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {binary}
        </motion.div>
      ))}

      {/* Gradient overlays for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(233, 69, 96, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse at 70% 80%, rgba(83, 52, 131, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
