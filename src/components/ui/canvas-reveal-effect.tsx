"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const SimpleCard = ({
  ClassName,
  children,
}: {
  ClassName?: string;
  showGradient?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", ClassName)}>
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
};