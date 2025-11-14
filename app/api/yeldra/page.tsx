export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("/api/yeldra", { cache: "no-store" });
  if (!res.ok) throw new Error("No pude obtener YELDRA");
  return res.json() as Promise<{ name:string; tagline:string; features:string[] }>;
}

export default async function YeldraPage() {
  const data = await getData();
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">{data.name}</h1>
      <p className="text-lg text-muted-foreground">{data.tagline}</p>
      <section className="grid gap-4">
        {data.features.map((f, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <p className="font-medium">{f}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
mkdir -p app/api/pilot
mv app/api/yeldra/* app/api/pilot/
rmdir app/api/yeldra 2>/dev/null || true