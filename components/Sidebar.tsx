'use client'

import React from 'react'

import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const Sidebar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col
    justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);


          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                'bg-blue-1': isActive,
              })}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='text-lg font-semibold max-lg:hidden'>
                {link.label}
              </p>

            </Link>
          )
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='w-full h-14 text-2xl mb-10 mt-10 pl-4 gap-2 flex items-center active:bg-blue-1 justify-start rounded-xl'><Image
        src="/icons/setting.svg"
        alt="feature"
        width={30}
        height={30}
      />Settings</div>
    </section>
  )
}

export default Sidebar