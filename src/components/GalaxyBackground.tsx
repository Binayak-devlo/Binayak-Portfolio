import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  twinkleSpeed: number;
  phase: number;
}

interface MilkyWayParticle {
  r: number; // distance from center
  angle: number; // orbital angle
  spreadX: number; // arm dispersion
  spreadY: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  type: "star" | "dust" | "gas";
}

interface DigitalParticle {
  r: number;
  angle: number;
  spreadX: number;
  spreadY: number;
  char: string;
  speed: number;
  opacity: number;
  fontSize: number;
  color: string;
}

interface NebulaCloud {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette to match the professional emerald/teal theme with cosmic depth
    const palette = {
      emerald: "rgba(16, 185, 129, 0.7)",
      teal: "rgba(45, 212, 191, 0.7)",
      coreWarm: "rgba(251, 191, 36, 0.85)", // Amber/gold for star-rich core
      purple: "rgba(139, 92, 246, 0.4)", // Violet background dust
      white: "rgba(255, 255, 255, 0.95)", // Bright pristine stars
    };

    // Generate deep space background stars (static and slow twinkle)
    const backgroundStarsCount = 220;
    const stars: Star[] = Array.from({ length: backgroundStarsCount }, () => {
      const z = Math.random();
      let color = "rgba(255, 255, 255, 0.65)";
      if (Math.random() > 0.8) color = "rgba(110, 231, 183, 0.7)"; // Subtle emerald tint
      else if (Math.random() > 0.85) color = "rgba(103, 232, 249, 0.7)"; // Subtle teal tint

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        color,
        size: Math.random() * 1.4 + 0.2, // smaller is deeper, larger is closer
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Generate Milky Way spiral galaxy particles
    const particles: MilkyWayParticle[] = [];
    const galaxyStarsCount = 750; // High density for realistic stellar clouds
    const arms = 2; // Real spiral design
    const rotationTilt = -Math.PI / 6; // Beautiful 30-degree rotation tilt of the disk

    for (let i = 0; i < galaxyStarsCount; i++) {
      // Density increases closer to the core using logarithmic power curves
      const maxRadius = Math.min(width, height) * 0.48;
      const r = Math.pow(Math.random(), 2.8) * maxRadius + 3;
      const armIndex = i % arms;

      // Logarithmic spiral mathematical formula: angle grows proportionally to radius
      const baseAngle = (armIndex * 2 * Math.PI) / arms;
      const spiralWrap = r * 0.009;
      const angle = baseAngle + spiralWrap + (Math.random() - 0.5) * 0.38;

      // Higher dispersion farther away, extremely tight core concentration
      const dispersion = (r * 0.18) + (r < 40 ? 4 : 0);
      const spreadX = (Math.random() - 0.5) * dispersion;
      const spreadY = (Math.random() - 0.5) * dispersion * 0.6; // Slightly flat spiral disk
      const size = Math.random() * 1.5 + 0.3;

      // Classify particles as star, gas dust, or hot core
      let type: "star" | "dust" | "gas" = "star";
      if (Math.random() > 0.85) type = "gas";
      else if (Math.random() > 0.9) type = "dust";

      // Stellar temperature coloring based on distance from galactic core (Milky Way Bulge is golden-yellow)
      let color = palette.teal;
      let opacity = Math.max(0.15, 1 - r / maxRadius);

      if (r < 30) {
        // High density golden core
        color = Math.random() > 0.4 ? palette.coreWarm : palette.white;
        opacity = 0.95;
      } else if (r < 120) {
        // Mid-rim transition: Hot emerald-green & turquoise
        color = Math.random() > 0.5 ? palette.emerald : palette.teal;
        opacity *= 0.85;
      } else {
        // Outer arms: Pale teal, blue and deep space purple gas particles
        const rand = Math.random();
        if (rand > 0.7) {
          color = "rgba(56, 189, 248, 0.65)"; // Light sky blue
        } else if (rand > 0.4) {
          color = palette.purple;
        } else {
          color = "rgba(45, 212, 191, 0.55)";
        }
        opacity *= 0.65;
      }

      particles.push({
        r,
        angle,
        spreadX,
        spreadY,
        size: type === "gas" ? size * 2.5 : size, // gas particles are larger, softer clouds
        color,
        speed: 0.0003 + (15 / (r + 25)) * 0.0016, // stars rotate slower as radius increases (keplerian curve)
        opacity,
        type,
      });
    }

    // Generate flowing digital matrix particles
    const digitalParticles: DigitalParticle[] = [];
    const digitalCount = 85; 
    const charList = ["0", "1", "<>", "[]", "{}", "=>", "fx", "dev", "mca", "java", "react", "git", "api"];
    
    for (let i = 0; i < digitalCount; i++) {
      const maxRadius = Math.min(width, height) * 0.45;
      const r = Math.pow(Math.random(), 2.0) * maxRadius + 15;
      const armIndex = i % arms;
      const baseAngle = (armIndex * 2 * Math.PI) / arms;
      const spiralWrap = r * 0.009;
      const angle = baseAngle + spiralWrap + (Math.random() - 0.5) * 0.25;
      
      const dispersion = (r * 0.12);
      const spreadX = (Math.random() - 0.5) * dispersion;
      const spreadY = (Math.random() - 0.5) * dispersion * 0.6;
      const char = charList[Math.floor(Math.random() * charList.length)];
      const isWord = char.length > 2;
      
      digitalParticles.push({
        r,
        angle,
        spreadX,
        spreadY,
        char,
        speed: 0.0004 + (12 / (r + 20)) * 0.0018, // slightly faster to mimic data flows
        opacity: Math.max(0.12, 0.75 - r / maxRadius),
        fontSize: isWord ? Math.random() * 2 + 7 : Math.random() * 3 + 8, // tiny, elegant, non-distracting 
        color: Math.random() > 0.4 ? "rgba(52, 211, 153, 0.45)" : "rgba(45, 212, 191, 0.4)", // emerald vs teal code coordinates
      });
    }

    // Floating large nebulous gas clouds for space lighting & contrast
    const nebulas: NebulaCloud[] = [
      {
        x: width * 0.60,
        y: height * 0.40,
        r: Math.min(width, height) * 0.42,
        color: "rgba(16, 185, 129, 0.04)", // Beautiful emerald mist glow
        vx: 0.04,
        vy: 0.015,
      },
      {
        x: width * 0.30,
        y: height * 0.55,
        r: Math.min(width, height) * 0.38,
        color: "rgba(45, 212, 191, 0.03)", // Subtle teal gas
        vx: -0.02,
        vy: 0.02,
      },
      {
        x: width * 0.50,
        y: height * 0.30,
        r: Math.min(width, height) * 0.28,
        color: "rgba(139, 92, 246, 0.02)", // Deep space cosmic violet/purple gas
        vx: 0.012,
        vy: -0.01,
      },
    ];

    // Responsive Canvas Resizing behavior
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      nebulas[0].r = Math.min(width, height) * 0.42;
      nebulas[1].r = Math.min(width, height) * 0.38;
      nebulas[2].r = Math.min(width, height) * 0.28;

      stars.forEach((star) => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    };

    window.addEventListener("resize", handleResize);

    // Animation frame engine
    function animate() {
      // Clear canvas with very subtle, opaque dark slate for graceful stardust motion trails
      ctx.fillStyle = "rgba(2, 6, 23, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Render layered drifting gas nebulas (cosmic light painting)
      nebulas.forEach((cloud) => {
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Soft elastic containment coordinates
        if (cloud.x < -width * 0.1 || cloud.x > width * 1.1) cloud.vx *= -1;
        if (cloud.y < -height * 0.1 || cloud.y > height * 1.1) cloud.vy *= -1;

        const grad = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.r
        );
        grad.addColorStop(0, cloud.color);
        grad.addColorStop(0.4, cloud.color.replace(/[\d.]+\)$/, "0.015)"));
        grad.addColorStop(1, "rgba(2, 6, 23, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render distant twinkling stardust
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const opacity = 0.1 + Math.abs(Math.sin(star.phase)) * 0.85;

        ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${opacity})`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render slowly spinning tilted barred Milky Way galaxy
      // Align slightly off-center to elegantly frame the portfolio UI
      const centerX = width * 0.60;
      const centerY = height * 0.46;

      particles.forEach((p) => {
        // Increment orbital motion
        p.angle += p.speed;

        // Calculate original 2D spiral arm offsets
        const originalX = Math.cos(p.angle) * p.r + p.spreadX;
        const originalY = Math.sin(p.angle) * p.r + p.spreadY;

        // Apply a magnificent 3D perspective rotational tilt to the spiral disk coordinates
        const tiltedX = originalX * Math.cos(rotationTilt) - originalY * Math.sin(rotationTilt);
        const tiltedY = (originalX * Math.sin(rotationTilt) + originalY * Math.cos(rotationTilt)) * 0.72; // compressed on the Y axis for tilt depth

        const x = centerX + tiltedX;
        const y = centerY + tiltedY;

        // Twinkle pulsing frequency based on distance and orbital speed
        const pulse = 0.75 + Math.sin(p.angle * 3 + p.r) * 0.25;

        // Determine particle rendering style (stars vs gaseous cloud nodes)
        if (p.type === "gas") {
          // Draw soft glowing gas cloud particle
          const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2);
          grad.addColorStop(0, p.color.replace(/[\d.]+\)$/, `${p.opacity * pulse * 0.4})`));
          grad.addColorStop(1, "rgba(2, 6, 23, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw standard star particle
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity * pulse})`);
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render floating digital code stream coordinates
      digitalParticles.forEach((d) => {
        d.angle += d.speed;

        const originalX = Math.cos(d.angle) * d.r + d.spreadX;
        const originalY = Math.sin(d.angle) * d.r + d.spreadY;

        const tiltedX = originalX * Math.cos(rotationTilt) - originalY * Math.sin(rotationTilt);
        const tiltedY = (originalX * Math.sin(rotationTilt) + originalY * Math.cos(rotationTilt)) * 0.72;

        const x = centerX + tiltedX;
        const y = centerY + tiltedY;

        // Pulsing opacity rate
        const pulse = 0.5 + Math.sin(d.angle * 2.5 + d.r) * 0.5;

        // Render delicate code text symbol
        ctx.fillStyle = d.color.replace(/[\d.]+\)$/, `${d.opacity * pulse * 0.75})`);
        ctx.font = `${d.fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(d.char, x, y);
      });

      // Render a subtle brilliant central bulge core lighting effect
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.12
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      coreGrad.addColorStop(0.2, "rgba(251, 191, 36, 0.1)"); // Warm core golden aura
      coreGrad.addColorStop(0.6, "rgba(16, 185, 129, 0.03)"); // Emerald aura blend
      coreGrad.addColorStop(1, "rgba(2, 6, 23, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.12, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-background-canvas"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
