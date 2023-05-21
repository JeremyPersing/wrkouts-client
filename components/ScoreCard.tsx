export default function ScoreCard({
  items,
}: {
  items: { title: string | number; body: string | number }[];
}) {
  return (
    <div className="flex flex-col items-center ">
      <div>
        {items.map((i) => (
          <div className="stats shadow sm:w-32" key={i.title}>
            <div className="p-4">
              <div className="stat-title">{i.title}</div>
              <div className="stat-value sm:text-2xl text-xl">{i.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
