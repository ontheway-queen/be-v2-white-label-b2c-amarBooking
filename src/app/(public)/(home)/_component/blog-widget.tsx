import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogWidget = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Travel Tips & Guides
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Expert advice to help you plan the perfect trip and make the most of
            your travels
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "10 Tips for Budget Travel in Europe",
              excerpt:
                "Learn how to explore Europe without breaking the bank with these expert tips.",
              image: "https://placehold.co/500x300",
              date: "April 15, 2023",
            },
            {
              title: "The Ultimate Packing Checklist",
              excerpt:
                "Never forget essential items again with our comprehensive packing guide.",
              image: "https://placehold.co/500x300",
              date: "March 22, 2023",
            },
            {
              title: "How to Find the Best Flight Deals",
              excerpt:
                "Insider secrets to scoring amazing deals on flights to anywhere in the world.",
              image: "https://placehold.co/500x300",
              date: "February 10, 2023",
            },
            {
              title: "How to Find the Best Flight Deals",
              excerpt:
                "Insider secrets to scoring amazing deals on flights to anywhere in the world.",
              image: "https://placehold.co/500x300",
              date: "February 10, 2023",
            },
          ].map((article, index) => (
            <Link href="#" key={index} className="group">
              <div className="overflow-hidden rounded-lg">
                <div className="relative h-[180px] w-full overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  {article.date}
                </p>
                <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Read More
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center lg:mt-12">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogWidget;
