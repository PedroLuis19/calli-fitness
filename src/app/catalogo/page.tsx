import { EXERCISE_DB } from '@/lib/exercises';

export default function CatalogoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Catálogo de Treinos</h2>
      <div className="space-y-8">
        {Object.entries(EXERCISE_DB).map(([category, exercises]) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-emerald-400 mb-4 border-b border-zinc-800 pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((ex: { id: string; name: string; desc: string }) => (
                <div key={ex.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                  <h4 className="font-bold text-white mb-2">{ex.name}</h4>
                  <p className="text-sm text-zinc-400">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}