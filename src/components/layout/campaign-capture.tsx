"use client";

import { useEffect } from "react";
import { captureCampaign } from "@/lib/campaign";

export function CampaignCapture() {
  useEffect(() => {
    captureCampaign();
  }, []);
  return null;
}
