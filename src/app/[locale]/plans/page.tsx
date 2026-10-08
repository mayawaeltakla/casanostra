import type { Metadata } from "next";
import { PlansOverview } from "./PlansOverview";

export const metadata: Metadata = {
  title: "Plans | CASANOSTRA",
  description:
    "Explore the three CASANOSTRA plan names and contact the team for current details.",
};

export default function PlansPage() {
  return <PlansOverview />;
}
