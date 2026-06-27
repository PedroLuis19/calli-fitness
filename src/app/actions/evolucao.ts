"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSessionUserId } from "./treinos";

// ==========================================
// AÇÕES PARA METAS (GOALS)
// ==========================================
export async function addGoal(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;

  const title = formData.get("title") as string;

  if (!title) return;

  await prisma.goal.create({
    data: { userId, title },
  });

  revalidatePath("/evolucao");
}

export async function toggleGoal(goalId: string, currentStatus: boolean) {
  await prisma.goal.update({
    where: { id: goalId },
    data: { achieved: !currentStatus },
  });
  revalidatePath("/evolucao");
}

export async function deleteGoal(goalId: string) {
  await prisma.goal.delete({ where: { id: goalId } });
  revalidatePath("/evolucao");
}

// ==========================================
// AÇÕES PARA MEDIDAS CORPORAIS
// ==========================================
export async function addMeasurement(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;

  const weight = formData.get("weight");
  const bodyFat = formData.get("bodyFat");

  await prisma.bodyMeasurement.create({
    data: {
      userId,
      weight: weight ? parseFloat(weight as string) : null,
      bodyFat: bodyFat ? parseFloat(bodyFat as string) : null,
    },
  });

  revalidatePath("/evolucao");
}

// ==========================================
// AÇÕES PARA HISTÓRICO DE TREINOS (SESSIONS)
// ==========================================
export async function logWorkoutSession(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;

  const workoutListId = formData.get("workoutListId") as string;
  const durationMins = parseInt(formData.get("durationMins") as string);

  await prisma.workoutSession.create({
    data: {
      userId,
      workoutListId: workoutListId || null,
      durationMins: durationMins || null,
    },
  });

  revalidatePath("/evolucao");
}
