import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HotelRateCheckLoading = () => {
  return (
    <div className="min-h-screen container mx-auto mt-5">
      <Card className="px-5 mb-5 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hotel Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        {/* Rates */}
        {[...Array(1)].map((_, i) => (
          <Card key={i} className="py-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg py-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 bg-white/30" />
                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-5 w-24 rounded-full bg-white/20" />
                    <Skeleton className="h-5 w-20 rounded-full bg-white/20" />
                    <Skeleton className="h-5 w-28 rounded-full bg-green-500/20" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-6 w-24 bg-white/30" />
                  <Skeleton className="h-4 w-16 bg-white/30" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Room Details */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-40" />
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="space-y-2 bg-muted p-4 rounded-lg">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex gap-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <div className="space-y-2 bg-blue-50 p-4 rounded-lg dark:bg-muted">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>

                {/* Policies */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="mt-6">
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Passenger Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default HotelRateCheckLoading;
