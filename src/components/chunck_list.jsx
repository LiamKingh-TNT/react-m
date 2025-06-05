import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ChunkList({ chunks, type,auto_wheel=false,upoffset=-100}) {
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

  // 节流标记，避免一次滚轮手势触发多次切换
  const isThrottled = useRef(false);

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

  // 侦听“滚轮事件”，向上滚调到上一个 chunk，向下滚调到下一个 chunk
  useEffect(() => {
    const handleWheel = (e) => {
        
      if (isThrottled.current) return;

      const currentIndex = chunks.findIndex((id) => id === activeChunk);
      if (e.deltaY > 0 && currentIndex < chunks.length - 1) {
        if(!auto_wheel) return;
        // 向下滚：调到下一个
        const nextId = chunks[currentIndex + 1];
        if(currentIndex === chunks.length - 2)
        {
            scrollToWithOffset(nextId,0);
        }
        else
        {
            scrollToWithOffset(nextId);
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        if(!auto_wheel) return;
        // 向上滚：调到上一个
        const prevId = chunks[currentIndex - 1];
        if(chunks[currentIndex] === "trait")
        {
            scrollToWithOffset(prevId,-200);
        }
        else
        {
            scrollToWithOffset(prevId,-100);
        }
      }

      // 节流 300ms
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 300);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeChunk, chunks]);
  
  // 计算括号位置的 useLayoutEffect，依赖 activeChunk & menuVisible
  useLayoutEffect(() => {
    if (!activeChunk || !menuVisible) return;
    const btnEl = buttonRefs.current[activeChunk];
    const containerEl = containerRef.current;
    if (!btnEl || !containerEl) return;

    const bracketHeight = 40;
    const containerRect = containerEl.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();

    const bracketTop =
      btnRect.top - containerRect.top + (btnRect.height - bracketHeight) / 2;
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

  const scrollToWithOffset = (id, offset=-50) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 侦听滚动，更新 activeChunk
  useEffect(() => {
    const handleScroll = () => updateActiveByScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chunks]);

  // 初始化定位一次
  useEffect(() => {
    updateActiveByScroll();
  }, []);

  // 侦测菜单可见性
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

  // 菜单一旦可见，就再定位一次
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
            if(idx===0)
            {
                return(null)
            }
            else if(idx===chunks.length-1)
            {
                return(null)
            }
            return (
              <div
                key={`${chunk}-${idx}`}
                className="flex flex-col items-center"
                onMouseEnter={() => setActiveChunk(chunk)}
                onMouseLeave={() => updateActiveByScroll()}
              >
                <button
                  ref={(el) => (buttonRefs.current[chunk] = el)}
                  onClick={() => scrollToWithOffset(chunk,-100)}
                  className={`relative inline-block text-white text-[25px] ${
                    isActive ? "font-bold" : "font-normal"
                  } py-1 focus:outline-none`}
                >
                  {type == "rule"
                    ? lang(`rule.${chunk}.title`)
                    : lang(`fi.${chunk}`)}
                </button>
                {idx < chunks.length - 2 && (
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
