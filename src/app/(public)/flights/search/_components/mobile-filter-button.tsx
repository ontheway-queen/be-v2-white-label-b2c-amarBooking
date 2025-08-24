"use client";;
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

import type { JSX } from "react";

interface MobileFilterButtonProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  element: JSX.Element;
}

export function MobileFilterButton({
  isOpen,
  setIsOpen,
  element,
}: MobileFilterButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 lg:hidden z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg flex items-center gap-2 bg-secondary"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4 overflow-y-auto max-h-[calc(85vh-80px)]">
            {element}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
