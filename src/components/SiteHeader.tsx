import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { content, links, navigation } from "../content";

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="10x Science — back to top">
      <img
        src="/assets/10x-science-wordmark.svg"
        alt="10x Science"
        width="145"
        height="32"
      />
    </a>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="header-inner container">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href={links.login} className="login-link">
            {content.header.login}
            <ArrowUpRight size={13} />
          </a>
          <a
            href="#demo"
            className="button button-small"
            onClick={() => setOpen(false)}
          >
            {content.header.demo}
            <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? content.header.close : content.header.menu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={18} />
          </a>
        ))}
        <a href={links.login}>
          {content.header.login}
          <ArrowUpRight size={18} />
        </a>
      </nav>
    </header>
  );
}
