import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ChunkList({ chunks, type }) {
  const { t: lang } = useTranslation();

  const [activeChunk, setActiveChunk] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [bracketReady, setBracketReady] = useState(false);

  const buttonRefs = useRef({});
  const containerRef = useRef(null);
  const [bracketPos, setBracketPos] = useState({
    top: 0,
    leftLeft: 0,
    leftRight: 0,
  });

  const visibleSet = useRef(new Set());
  const [menuVisible, setMenuVisible] = useState(false);

  const updateActiveByScroll = () => {
    if (!chunks || chunks.length === 0) return;
    const middleY = window.innerHeight / 2;
    let closest = null;
    let minDiff = Infinity;

    chunks.forEach((chunk) => {
      const el = document.getElementById(chunk);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const chunkMiddleY = rect.top + rect.height / 2;
      const diff = Math.abs(chunkMiddleY - middleY);
      if (diff < minDiff) {
        minDiff = diff;
        closest = chunk;
      }
    });

    if (closest !== null) {
      setActiveChunk(closest);
    }
  };

  useEffect(() => {
    if (!chunks || chunks.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          setActiveChunk(id);
        }
      });
    }, observerOptions);

    chunks.forEach((chunk) => {
      const el = document.getElementById(chunk);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chunks]);

  // === 重点改动：把 menuVisible 也放到依赖里 ===
  useLayoutEffect(() => {
    if (!activeChunk || !menuVisible) return;
    const btnEl = buttonRefs.current[activeChunk];
    const containerEl = containerRef.current;
    if (!btnEl || !containerEl) return;

    const bracketHeight = 40;
    const containerRect = containerEl.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();

    const bracketTop = btnRect.top - containerRect.top + (btnRect.height - bracketHeight) / 2;
    const bracketOffsetX = 8;
    const bracketGap = 10;

    const targetLeftPoint =
      btnRect.left - containerRect.left - bracketOffsetX - bracketGap / 2;
    const targetRightPoint =
      btnRect.left - containerRect.left + btnRect.width + bracketOffsetX + bracketGap / 2;

    setBracketPos({
      top: bracketTop,
      leftLeft: targetLeftPoint,
      leftRight: targetRightPoint,
    });

    setBracketReady(true);
  }, [activeChunk, menuVisible]);

  const scrollToWithOffset = (id) => {
    const element = document.getElementById(id);
    const offset = -100;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => updateActiveByScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chunks]);

  useEffect(() => {
    updateActiveByScroll();
  }, []);

  useEffect(() => {
    if (!chunks || chunks.length === 0) return;

    const visibilityOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const visObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          visibleSet.current.add(id);
        } else {
          visibleSet.current.delete(id);
        }
      });

      const anyVisible = visibleSet.current.size > 0;
      // **当菜单可见度发生变化时，顺便触发一次用来计算 activeChunk 的滚动判断**
      if (anyVisible && !hasInitialized) {
        setActiveChunk(chunks[0]);
        setHasInitialized(true);
        setBracketReady(false);
      }
      setMenuVisible(anyVisible);
    }, visibilityOptions);

    chunks.forEach((chunk) => {
      const el = document.getElementById(chunk);
      if (el) visObserver.observe(el);
    });
    return () => {
      visObserver.disconnect();
      visibleSet.current.clear();
    };
  }, [chunks, hasInitialized]);

  useEffect(() => {
    if (menuVisible) {
      updateActiveByScroll();
    }
  }, [menuVisible]);

  return (
    <AnimatePresence>
      {menuVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden md:flex flex-col fixed left-0 top-1/2 -translate-y-1/2 ml-10 w-[10vw]"
        >
          {activeChunk !== null && bracketReady && (
            <>
              <motion.span
                className="absolute text-white text-[25px] pointer-events-none transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{
                  top: bracketPos.top,
                  left: bracketPos.leftLeft,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                〉
              </motion.span>
              <motion.span
                className="absolute text-white text-[25px] pointer-events-none transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{
                  top: bracketPos.top,
                  left: bracketPos.leftRight,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                〈
              </motion.span>
            </>
          )}
          {chunks.map((chunk, idx) => {
            const isActive = chunk === activeChunk;
            return (
              <div
                key={`${chunk}-${idx}`}
                className="flex flex-col items-center"
                onMouseEnter={() => setActiveChunk(chunk)}
                onMouseLeave={() => updateActiveByScroll()}
              >
                <button
                  ref={(el) => (buttonRefs.current[chunk] = el)}
                  onClick={() => scrollToWithOffset(chunk)}
                  className={`relative inline-block text-white text-[25px] ${
                    isActive ? "font-bold" : "font-normal"
                  } py-1 focus:outline-none`}
                >
                  {type == "rule"
                    ? lang(`rule.${chunk}.title`)
                    : lang(`fi.${chunk}`)}
                </button>
                {idx < chunks.length - 1 && (
                  <div className="h-10 w-[2px] bg-gray-300" />
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
