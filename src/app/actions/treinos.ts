// ficheiro: src/app/actions/treinos.ts (apenas o topo do ficheiro)
'use server'
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { ALL_EXERCISES } from '@/lib/exercises';

export async function getSessionUserId() {
  const session = await getServerSession(authOptions); 
  const user = session?.user as { id?: string } | undefined;
  return user?.id;
}

export async function createWorkoutList(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) return;
  const name = formData.get('name') as string;
  await prisma.workoutList.create({ data: { name, userId } });
  revalidatePath('/treinos');
}

export async function deleteWorkoutList(id: string) {
  await prisma.workoutList.delete({ where: { id } });
  revalidatePath('/treinos');
}

export async function addExercise(formData: FormData) {
  const workoutListId = formData.get('workoutListId') as string;
  const baseId = formData.get('baseId') as string;
  const type = formData.get('type') as string;
  const value = parseInt(formData.get('value') as string);

  const baseExercise = ALL_EXERCISES.find(ex => ex.id === baseId);
  if (!baseExercise) return;

  await prisma.exercise.create({
    data: { name: baseExercise.name, baseId, type, value, workoutListId }
  });
  revalidatePath('/treinos');
}

export async function toggleExerciseStatus(exerciseId: string, currentStatus: boolean) {
  await prisma.exercise.update({ where: { id: exerciseId }, data: { completed: !currentStatus } });
  revalidatePath('/treinos');
}

export async function deleteExercise(exerciseId: string) {
  await prisma.exercise.delete({ where: { id: exerciseId } });
  revalidatePath('/treinos');
}
