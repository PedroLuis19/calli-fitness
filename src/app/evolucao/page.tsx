import { getSessionUserId } from '@/app/actions/treinos';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function EvolucaoPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect('/login');

  const workouts = await prisma.workoutList.findMany({ where: { userId }, include: { exercises: true } });
  
  const totalLists = workouts.length;
  let totalExercises = 0, completedExercises = 0;
  
  workouts.forEach((w: { exercises: { completed: boolean }[] }) => {
    totalExercises += w.exercises.length;
    completedExercises += w.exercises.filter((ex: { completed: boolean }) => ex.completed).length;
  });

  const progressPercentage = totalExercises === 0 ? 0 : Math.round((completedExercises / totalExercises) * 100);

  return (
    <div className="max-w-3xl mx-auto text-center mt-10">
      <h2 className="text-3xl font-bold text-white mb-8">Sua Evolução</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h3 className="text-6xl font-black text-emerald-500 mb-2">{progressPercentage}%</h3>
        <p className="text-zinc-400 mb-8">dos seus exercícios concluídos!</p>
        <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
          <div><p className="text-zinc-500 text-sm">Listas</p><p className="text-2xl font-bold text-white">{totalLists}</p></div>
          <div><p className="text-zinc-500 text-sm">Total Exercícios</p><p className="text-2xl font-bold text-white">{totalExercises}</p></div>
          <div><p className="text-zinc-500 text-sm">Finalizados</p><p className="text-2xl font-bold text-emerald-400">{completedExercises}</p></div>
        </div>
      </div>
    </div>
  );
}
