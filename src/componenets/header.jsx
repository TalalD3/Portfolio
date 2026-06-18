import { useState, useEffect } from 'react'
import styles from './header.module.css'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('About')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.wrap} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.pill} ${scrolled ? styles.pillScrolled : ''}`}>
        <span className={styles.logo}>YN</span>
        {links.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`${styles.link} ${active === link ? styles.active : ''}`}
            onClick={() => setActive(link)}
          >
            {link}
          </a>
        ))}
        <a href="#contact" className={styles.cta}>Hire me</a>
      </nav>
    </header>
  )
}