"use client";

import { Leaf, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import React from 'react';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Guide', href: '#guide' },
    { name: 'Assessor', href: '#assessor' },
    { name: 'Locations', href: '#locator' },
    { name: 'Schedule Pickup', href: '#schedule' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="#" className="flex items-center space-x-2 mr-6">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">EcoCollect</span>
        </a>
        <nav className="ml-auto hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="ml-auto md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <a href="#" className="flex items-center space-x-2 mb-8" onClick={() => setIsOpen(false)}>
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">EcoCollect</span>
                </a>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
