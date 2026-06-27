import { getSessionUserId } from "@/app/actions/treinos";
import {
  addGoal,
  toggleGoal,
  deleteGoal,
  addMeasurement,
  logWorkoutSession,
} from "@/app/actions/evolucao";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  CheckCircle,
  Circle,
  Target,
  Scale,
  Clock,
  Trash2,
  Plus,
} from "lucide-react";

export default async function EvolucaoPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login");

  // 1. Ir buscar todos os dados do utilizador à base de dados em paralelo para ser mais rápido
  const [workouts, measurements, sessions, goals] = await Promise.all([
    prisma.workoutList.findMany({
      where: { userId },
      include: { exercises: true },
    }),
    prisma.bodyMeasurement.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.workoutSession.findMany({
      where: { userId },
      include: { workoutList: true },
      orderBy: { completedAt: "desc" },
    }),
    prisma.goal.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);

  // Cálculos de Progresso Geral
  let totalExercises = 0;
  let completedExercises = 0;

  workouts.forEach((w: { exercises: { completed: boolean }[] }) => {
    totalExercises += w.exercises.length;
    completedExercises += w.exercises.filter(
      (ex: { completed: boolean }) => ex.completed,
    ).length;
  });

  const progressPercentage =
    totalExercises === 0
      ? 0
      : Math.round((completedExercises / totalExercises) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* SEÇÃO 1: RESUMO GERAL */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Visão Geral</h2>
        <h3 className="text-6xl font-black text-emerald-500 my-4">
          {progressPercentage}%
        </h3>
        <p className="text-zinc-400 mb-6">
          dos exercícios nos seus planos foram marcados como concluídos.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-800 pt-6">
          <div>
            <p className="text-zinc-500 text-sm">Listas Ativas</p>
            <p className="text-xl font-bold text-white">{workouts.length}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Treinos Concluídos</p>
            <p className="text-xl font-bold text-white">{sessions.length}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Metas Atingidas</p>
            <p className="text-xl font-bold text-emerald-400">
              {goals.filter((g: { achieved: boolean }) => g.achieved).length}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Peso Atual</p>
            <p className="text-xl font-bold text-white">
              {measurements[0]?.weight ? `${measurements[0].weight}kg` : "--"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SEÇÃO 2: METAS (GOALS) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-emerald-500" />
            <h3 className="text-xl font-bold text-white">Minhas Metas</h3>
          </div>

          <form action={addGoal} className="flex gap-2 mb-6">
            <input
              name="title"
              required
              placeholder="Nova meta (ex: Chegar a 80kg)"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-3 py-2 rounded-lg font-bold transition-colors"
            >
              <Plus size={18} />
            </button>
          </form>

          <div className="space-y-3">
            {goals.map(
              (goal: { id: string; title: string; achieved: boolean }) => (
                <div
                  key={goal.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${goal.achieved ? "bg-emerald-950/20 border-emerald-500/30" : "bg-zinc-950 border-zinc-800"}`}
                >
                  <form
                    action={async () => {
                      "use server";
                      await toggleGoal(goal.id, goal.achieved);
                    }}
                  >
                    <button
                      type="submit"
                      className={
                        goal.achieved ? "text-emerald-500" : "text-zinc-600"
                      }
                    >
                      {goal.achieved ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                  </form>
                  <span
                    className={`flex-1 ${goal.achieved ? "text-zinc-400 line-through" : "text-zinc-200"}`}
                  >
                    {goal.title}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await deleteGoal(goal.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-zinc-600 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              ),
            )}
            {goals.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4">
                Nenhuma meta definida.
              </p>
            )}
          </div>
        </div>

        {/* SEÇÃO 3: MEDIDAS CORPORAIS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="text-emerald-500" />
            <h3 className="text-xl font-bold text-white">Registo de Peso</h3>
          </div>

          <form action={addMeasurement} className="flex gap-2 mb-6">
            <input
              name="weight"
              type="number"
              step="0.1"
              required
              placeholder="Peso (kg)"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <input
              name="bodyFat"
              type="number"
              step="0.1"
              placeholder="% BF (Opcional)"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm border border-zinc-700 transition-colors"
            >
              Registar
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {measurements.map(
              (m: {
                id: string;
                createdAt: Date;
                weight: number | null;
                bodyFat: number | null;
              }) => (
                <div
                  key={m.id}
                  className="flex justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm"
                >
                  <span className="text-zinc-400">
                    {new Date(m.createdAt).toLocaleDateString("pt-PT")}
                  </span>
                  <span className="text-white font-bold">
                    {m.weight} kg {m.bodyFat ? `| ${m.bodyFat}% BF` : ""}
                  </span>
                </div>
              ),
            )}
            {measurements.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4">
                Sem registos de peso.
              </p>
            )}
          </div>
        </div>

        {/* SEÇÃO 4: HISTÓRICO DE TREINOS LOGADOS */}
        <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-emerald-500" />
            <h3 className="text-xl font-bold text-white">
              Diário de Treinos Concluídos
            </h3>
          </div>

          <form
            action={logWorkoutSession}
            className="flex flex-col sm:flex-row gap-3 mb-6 bg-zinc-950 p-4 rounded-xl border border-zinc-800"
          >
            <select
              name="workoutListId"
              required
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">Qual treino fez hoje?</option>
              {workouts.map((w: { id: string; name: string }) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            <input
              name="durationMins"
              type="number"
              required
              placeholder="Duração (minutos)"
              className="w-full sm:w-40 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm"
            >
              Salvar Treino
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sessions.map(
              (session: {
                id: string;
                completedAt: Date;
                durationMins: number | null;
                workoutList: { name: string } | null;
              }) => (
                <div
                  key={session.id}
                  className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl"
                >
                  <p className="text-xs text-emerald-500 font-semibold mb-1">
                    {new Date(session.completedAt).toLocaleDateString("pt-PT")}
                  </p>
                  <h4 className="font-bold text-white">
                    {session.workoutList?.name || "Treino Apagado"}
                  </h4>
                  <p className="text-sm text-zinc-400 mt-2">
                    {session.durationMins} minutos
                  </p>
                </div>
              ),
            )}
            {sessions.length === 0 && (
              <p className="text-sm text-zinc-500 col-span-full py-4 text-center">
                Ainda não registou nenhum treino concluído neste diário.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
