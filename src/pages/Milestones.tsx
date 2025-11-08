import { useState, useEffect } from "react";
import { Milestone, getItemsByBucket, addItem } from "../lib/storage";
import { useBucket } from "../hooks/useBucket";
import { Countdown } from "../components/ui/Countdown";
import Confetti from "react-confetti";

export function Milestones() {
  const [bucketId] = useBucket();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");
  const [nextMilestone, setNextMilestone] = useState<Milestone | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (bucketId) {
      const items = getItemsByBucket<Milestone>("milestones", bucketId);
      setMilestones(items);

      const upcomingMilestones = items.filter(
        (m) => new Date(m.date).getTime() > new Date().getTime()
      );
      if (upcomingMilestones.length > 0) {
        upcomingMilestones.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setNextMilestone(upcomingMilestones[0]);
      }
    }
  }, [bucketId]);

  const handleAddMilestone = () => {
    if (bucketId && newMilestoneTitle && newMilestoneDate) {
      const newMilestone = addItem<Milestone>(
        "milestones",
        {
          title: newMilestoneTitle,
          date: newMilestoneDate,
          emoji: "",
        },
        bucketId
      );
      setMilestones([...milestones, newMilestone]);
      setNewMilestoneTitle("");
      setNewMilestoneDate("");
    }
  };

  const onCountdownEnd = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="p-8">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold mb-4">Milestones</h1>

      {nextMilestone && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">
            Next Milestone: {nextMilestone.title}
          </h2>
          <Countdown date={nextMilestone.date} onEnd={onCountdownEnd} />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={newMilestoneTitle}
          onChange={(e) => setNewMilestoneTitle(e.target.value)}
          placeholder="New milestone..."
          className="bg-secondary text-text px-4 py-2 rounded-lg mr-2"
        />
        <input
          type="date"
          value={newMilestoneDate}
          onChange={(e) => setNewMilestoneDate(e.target.value)}
          className="bg-secondary text-text px-4 py-2 rounded-lg mr-2"
        />
        <button
          onClick={handleAddMilestone}
          className="bg-primary hover:bg-secondary text-text font-bold py-2 px-4 rounded-lg"
        >
          Add Milestone
        </button>
      </div>
      <ul>
        {milestones.map((milestone) => (
          <li key={milestone.id} className="bg-secondary p-4 rounded-lg mb-2">
            <h2 className="text-xl font-bold">{milestone.title}</h2>
            <p>{new Date(milestone.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
