import StakeForm from "@/components/StakeForm";
import CycleStats from "@/components/CycleStats";
import TimeControl from "@/components/TimeControl";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <StakeForm />
        </div>
        <div className="space-y-4">
          <TimeControl />
          <CycleStats />
        </div>
      </div>
    </div>
  );
}
