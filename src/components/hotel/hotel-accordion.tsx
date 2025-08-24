import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Loader } from "lucide-react";
import React from "react";

type HotelAccordionProps = {
  value: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const HotelAccordion: React.FC<HotelAccordionProps> = ({
  value,
  label,
  children,
  className,
}) => {
  const isLoading = false;

  return (
    <AccordionItem
      value={value}
      className={cn("bg-background rounded-lg", className)}
      disabled={isLoading}
    >
      <AccordionTrigger className="hover:no-underline py-2.5 px-4 font-semibold">
        <div className="flex items-center gap-2">
          {label}
          {isLoading && (
            <Loader className="size-3 animate-spin" strokeWidth={1.2} />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pt-3 border-t px-4 ">
          {isLoading ? (
            <div className="pt-2 border-t px-4 ">
              <div className="animate-pulse">
                <div className="flex gap-2 items-center">
                  <div className="h-5 w-5 rounded bg-gray-200 mt-1" />
                  <div className="h-3 bg-gray-200 mt-1 w-[60%]" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-5 w-5 rounded bg-gray-200 mt-1" />
                  <div className="h-3 bg-gray-200 mt-1 w-[60%]" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-5 w-5 rounded bg-gray-200 mt-1" />
                  <div className="h-3 bg-gray-200 mt-1 w-[60%]" />
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
