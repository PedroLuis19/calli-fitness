import { getSessionUserId, createWorkoutList, deleteWorkoutList, toggleExerciseStatus, deleteExercise, addExercise } from '@/app/actions/treinos';
import { ALL_EXERCISES } from '@/lib/exercises';
import prisma from '@/lib/prisma';
import { Trash2, Plus, CheckCircle, Circle, Hash, Clock } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Exercicio = { id: string; name: string; type: string; value: number; completed: boolean; };
type Treino = { id: string; name: string; exercises: Exercicio[]; };

export default async function TreinosPage(props: { searchParams: Promise<{ listId?: string }> }) {
  const searchParams = await props.searchParams;

  const userId = await getSessionUserId();
  if (!userId) redirect('/login'); 

  const workouts = await prisma.workoutList.findMany({
    where: { userId },
    include: { exercises: true },
    orderBy: { createdAt: 'desc' }
  });

  const selectedList = searchParams.listId ? workouts.find((w: Treino) => w.id === searchParams.listId) : workouts[0];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* SIDEBAR */}
      <div className="w-full md:w-1/3 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <h2 className="text-xl font-bold text-white mb-4">Minhas Listas</h2>
        <div className="space-y-2 mb-6">
          {workouts.map((w: Treino) => (
            <div key={w.id} className={`flex items-center justify-between p-3 rounded-xl border ${selectedList?.id === w.id ? 'bg-zinc-800 border-emerald-500' : 'bg-zinc-950 border-zinc-800'}`}>
              <Link href={`/treinos?listId=${w.id}`} className="flex-1 text-white">{w.name}</Link>
              <form action={async () => { 'use server'; await deleteWorkoutList(w.id) }}>
                <button type="submit" className="text-zinc-600 hover:text-red-500"><Trash2 size={16}/></button>
              </form>
            </div>
          ))}
        </div>
        <form action={createWorkoutList} className="flex gap-2">
          <input name="name" required placeholder="Nova lista..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 p-2 rounded-lg"><Plus size={20}/></button>
        </form>
      </div>

      {/* MAIN */}
      <div className="w-full md:w-2/3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        {selectedList ? (
          <>
            <h2 className="text-2xl font-bold text-emerald-400 mb-6">{selectedList.name}</h2>
            <form action={addExercise} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-8 flex flex-wrap gap-3 items-end">
              <input type="hidden" name="workoutListId" value={selectedList.id} />
              <div className="flex-1">
                <label className="block text-xs text-zinc-500 mb-1">Exercício</label>
                <select name="baseId" required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white">
                  <option value="">Selecione...</option>
                  {ALL_EXERCISES.map((ex: { id: string; name: string }) => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                </select>
              </div>
              <div className="w-28">
                <label className="block text-xs text-zinc-500 mb-1">Tipo</label>
                <select name="type" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white">
                  <option value="reps">Reps</option><option value="time">Minutos</option>
                </select>
              </div>
              <div className="w-24">
                <label className="block text-xs text-zinc-500 mb-1">Valor</label>
                <input name="value" type="number" required min="1" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
              </div>
              <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 h-[38px]">Add</button>
            </form>

            <div className="space-y-3">
              {selectedList.exercises.map((ex: Exercicio) => (
                <div key={ex.id} className={`flex items-center gap-4 p-4 rounded-xl border ${ex.completed ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-zinc-950 border-zinc-800'}`}>
                  <form action={async () => { 'use server'; await toggleExerciseStatus(ex.id, ex.completed) }}>
                    <button type="submit" className={ex.completed ? 'text-emerald-500' : 'text-zinc-600'}>
                      {ex.completed ? <CheckCircle /> : <Circle />}
                    </button>
                  </form>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-200">{ex.name}</h4>
                    <span className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                      {ex.type === 'reps' ? <Hash size={12}/> : <Clock size={12}/>}
                      {ex.value} {ex.type === 'reps' ? 'repetições' : 'minutos'}
                    </span>
                  </div>
                  <form action={async () => { 'use server'; await deleteExercise(ex.id) }}>
                    <button type="submit" className="text-zinc-600 hover:text-red-500"><Trash2 size={16}/></button>
                  </form>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-zinc-500 text-center py-10">Crie ou selecione uma lista.</p>
        )}
      </div>
    </div>
  );
}
