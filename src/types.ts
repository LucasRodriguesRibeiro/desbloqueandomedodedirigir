/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ScreenState {
  START = "START",
  QUIZ = "QUIZ",
  HALTED = "HALTED",
  PROCESSING = "PROCESSING",
  RESULT = "RESULT"
}

export enum ProfileType {
  LEVE = "LEVE",
  MODERADO = "MODERADO",
  INTENSO = "INTENSO"
}

export interface QuizOption {
  id: string;
  text: string;
  score: number; // to calculate severity of blockage
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  type: "select" | "slider";
}

export interface QuizResultProfile {
  type: ProfileType;
  title: string;
  subtitle: string;
  description: string;
  behaviorDetails: string[];
  recommendation: string;
}

export interface PixelEvent {
  id: string;
  name: string;
  params: Record<string, any>;
  timestamp: string;
}

