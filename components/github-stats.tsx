"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton"; // Updated import path

export default function GitHubStats() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">GitHub Statistics</h2>
      <p className="text-gray-500">Statistics are currently unavailable</p>
    </div>
  );
}