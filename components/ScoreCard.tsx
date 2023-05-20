export default function ScoreCard({
  items,
}: {
  items: { title: string | number; body: string | number }[];
}) {
  return (
    <div className="flex flex-col items-center pt-10">
      <div>
        {items.map((i) => (
          <div className="stats shadow w-32" key={i.title}>
            <div className="stat">
              <div className="stat-title">{i.title}</div>
              <div className="stat-value text-2xl">{i.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
