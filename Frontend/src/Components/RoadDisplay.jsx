const RoadmapDisplay = ({ roadmap, isPremium, progress, toggleTask, cleanRoadmap, formatContentWithCheckboxes }) => {
    if (!roadmap) return null;
  
    const sections = cleanRoadmap(roadmap);
    const filteredSections = isPremium
      ? sections
      : sections.filter(section => section.label === "Goal" || section.label === "Topics");
  
    return (
      <>
        {filteredSections.map((section, index) => (
          <div key={index} className="card bg-base-300 text-base-content shadow-xl p-8 rounded-3xl w-full max-w-5xl hover:shadow-2xl hover:scale-[1.02] transition duration-300">
            <h4 className="text-xl font-bold text-secondary mb-4">{section.label}</h4>
            <div className="text-base leading-relaxed break-words whitespace-pre-wrap max-h-[300px] overflow-auto">
              {section.label === 'Goal'
                ? <div>{section.content}</div>
                : formatContentWithCheckboxes(section.label, section.content)}
            </div>
          </div>
        ))}
  
        {!isPremium && (
          <div className="alert alert-warning shadow-lg my-4">
            🚀 Unlock Premium to view the full roadmap, including Milestones, Exercises, Books & more!
          </div>
        )}
      </>
    );
  };
  
  export default RoadmapDisplay;
  