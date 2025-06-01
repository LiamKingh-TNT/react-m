import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t: lang, i18n: setLanguage } = useTranslation();
  const [listIsOpen, setListIsOpen] = useState(false);

  // -----------------------------
  // 语言切换逻辑（不变）
  // -----------------------------
  const toggleLang = () => {
    const newLang = setLanguage.language === 'en_us' ? 'zh_tw' : 'en_us'
    setLanguage.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  // -----------------------------
  // 1. showHeaderScroll 由“滚动”控制
  //    hoverOverride 由“鼠标在顶部”控制
  //    最终 showHeader = showHeaderScroll || hoverOverride
  // -----------------------------
  const [showHeaderScroll, setShowHeaderScroll] = useState(true)
  const [hoverOverride, setHoverOverride] = useState(false)
  const prevScrollY = useRef(0)

  // 2. 监听滚动：根据 scrollY 判断 Header 收起/展开
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      // 如果向下滚且超过 50px，就收起
      if (currentY > prevScrollY.current && currentY > 50) {
        setShowHeaderScroll(false)
      } else {
        // 向上滚 或 滚回顶部，都展开
        setShowHeaderScroll(true)
      }
      prevScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. 监听鼠标移动：只要鼠标 Y 坐标 < 50，就把 hoverOverride 设为 true
  //    如果鼠标 Y 坐标 > headerHeight（100px），就把 hoverOverride 设为 false
  useEffect(() => {
    const handleMouseMove = (e) => {
      const y = e.clientY
      if (y < 100) {
        // 鼠标移到距离视窗顶部 50px 内，强制展开 Header
        setHoverOverride(true)
      } else if (y > 150) {
        // 鼠标移开 Header 区域（> 100px），取消强制展开
        setHoverOverride(false)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // -----------------------------
  // 下面保持原有的菜单展开/收起（移动端）逻辑
  // -----------------------------
  const menuRef = useRef(null)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setListIsOpen(false)
      }
    }
    if (window.innerWidth >= 768) {
      setListIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const el = menuRef.current
    if (!el) return

    if (listIsOpen) {
      el.style.display = 'block'
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: el.scrollHeight, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          el.style.display = 'none'
        }
      })
    }
  }, [listIsOpen])

  // -----------------------------
  // 计算最终是否显示 Header
  // -----------------------------
  const showHeader = showHeaderScroll || hoverOverride

  return (
    <header
      className={`
        header fixed top-0 left-0 w-full z-40 border-x-6 bg-[#6ac8eb] h-[100px] px-4
        transform transition-transform duration-300 ease-in-out
        ${showHeader ? 'translate-y-0' : '-translate-y-[150%]'}
      `}
    >
      <div className="flex items-center justify-center md:justify-between">
        <div className="flex items-center justify-center md:ml-16">
          <Link to="/">
            <img src="/images/main_icon.png" alt="main_icon" className="w-40 h-40 relative z-[50]" />
          </Link>
          <nav className="hidden ml-5 md:flex gap-8 text-white text-[20px]">
            <Link to="/story" className="nav-underline-center select-none">
              {lang('menu.background')}
            </Link>
            <Link to="/faction" className="nav-underline-center select-none">
              {lang('menu.component')}
            </Link>
            <Link to="/rules" className="nav-underline-center select-none">
              {lang('menu.rules')}
            </Link>
          </nav>
        </div>
        <button
          className="hidden text-white items-center justify-center md:flex ml-16 text-[20px] nav-underline-center select-none"
          onClick={toggleLang}
        >
          {lang('menu.language')}
        </button>
        <button
          onClick={() => setListIsOpen(!listIsOpen)}
          className={`
            absolute right-2 bottom-0 w-[30px] h-auto md:hidden
            transition-opacity duration-500
            ${listIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <img src="/images/down-chevron.png" className="w-full h-auto" />
        </button>
      </div>

      <div
        ref={menuRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden', display: 'none' }}
        className="fixed list top-[100px] left-0 w-screen z-0 text-white text-[25px] py-4 px-6 shadow-md space-y-4 text-center md:hidden"
      >
        <Link to="/story" className="block mt-[40px]">
          {lang('menu.background')}
        </Link>
        <Link to="/faction" className="block">
          {lang('menu.component')}
        </Link>
        <Link to="/rules" className="block">
          {lang('menu.rules')}
        </Link>
        <button className="block text-center text-[25px] w-full" onClick={toggleLang}>
          {lang('menu.language')}
        </button>
        <button
          className="absolute right-2 bottom-0 text-[20px] w-[30px] h-auto md:hidden"
          onClick={() => setListIsOpen(!listIsOpen)}
        >
          <img src="/images/down-chevron.png" className="transform scale-y-[-1] right-0" />
        </button>
        <br />
      </div>
    </header>
  )
}

export default Header
