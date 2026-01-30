"use client";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";
import LeftPanel from "./_dashboard/leftPanel";
import RightPanel from "./_dashboard/rightPanel";
import MiddlePanel from "./_dashboard/middlePanel";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <div className="flex flex-row flex-1 overflow-hidden">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
    </div>
  );
}
  