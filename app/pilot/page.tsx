async function getData() {
  try {
    const res = await fetch("/api/pilot", { cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  } catch (e) {
    return { error: String(e) };
  }
}

export default async function PilotPage() {
  const data = await getData();
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold">Yeldra · Pilot</h1>
      <p className="mt-2 opacity-70">Entrada aislada: /pilot</p>
      <pre className="mt-6 rounded-lg p-4 bg-gray-100 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
