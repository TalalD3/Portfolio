import styles from './hero.module.css'

export default function Hero() {
  return (
    <section className={styles.section} id="home">
      <div className={styles.inner}>

        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Available for work
          </div>

          <h1 className={styles.name}>
            Hi, I'm <span className={styles.accent}>TALAL DOUIBI</span>
          </h1>
          <p className={styles.role}>Full Stack Developer</p>
          <p className={styles.desc}>
          I design and build immersive digital experiences focused on performance, creativity, and emotion. <br />
          From AI-powered editing platforms to modern web apps, <br /> I love creating products that feel smooth, meaningful, and slightly futuristic.<br />

          Half developer, half exhausted philosopher trying to make beautiful things before the next mental breakdown.

          </p>

          <div className={styles.btns}>
            <a href="/cv.pdf" download className={styles.btnPrimary}>
              <i className="ti ti-download" aria-hidden="true"></i>
              Download CV
            </a>
            <a href="#contact" className={styles.btnOutline}>
              <i className="ti ti-mail" aria-hidden="true"></i>
              Contact me
            </a>
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <i className="ti ti-brand-github"></i>
            </a>
            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <i className="ti ti-brand-linkedin"></i>
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Twitter">
              <i className="ti ti-brand-twitter"></i>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imgWrap}>
            <div className={styles.imgRing}>
              <div className={styles.imgAvatar}>
                <img src="/assets/images/pro.jpg" alt="Your Name" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}