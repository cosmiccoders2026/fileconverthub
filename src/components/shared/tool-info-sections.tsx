import { HowToUseSection } from "./how-to-use";
import { WhyUseSection } from "./why-use";

export function ToolInfoSections({
  steps,
  whyPoints,
}: {
  steps: string[];
  whyPoints: string[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <HowToUseSection steps={steps} />
      <WhyUseSection points={whyPoints} />
    </div>
  );
}
