'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/icons/logo.svg'
import { Button } from '../components';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const links = [
  { label: 'How We Work', path: '/how-we-work' },
  { label: 'Services', path: '/services' },
  { label: 'Our Projects', path: '/our-projects' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Carreers', path: '/carrers' },
  { label: 'Contact', path: '/contact' },
];

export function NavLinks() {
  const pathname = usePathname();

  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("bg-primary") : setnavColor("");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <nav className={twMerge("absolute md:fixed z-50 text-white top-0 left-0 right-0 p-5", navColor)}>
      <div className='md:container m-auto flex justify-center md:justify-between flex-wrap items-center gap-5'>
        <Image
          priority
          src={logo}
          alt="Follow us on Twitter"
          className='w-[14.8rem] h-auto'
        />

        <div className='hidden lg:flex flex-1 justify-center gap-7'>
          {links.map((item, idx) => (
            <Link
              key={`nav-${idx}`}
              className={`transition hover:text-secondary ${pathname === item.path ? 'text-secondary' : ''}`}
              href={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='w-[14.48rem] text-center md:text-end'>
          <Button><i className='md:hidden icon-bars-3' /></Button>
          <Button variant='secondary'>GET STARTED</Button>
        </div>
      </div>
    </nav>
  );
}
