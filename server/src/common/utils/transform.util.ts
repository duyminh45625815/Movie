import { Types } from "mongoose";

export function transformToString(value: Types.ObjectId | string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Types.ObjectId ? value.toString() : value;
}

export function transformDate(date: Date | null | undefined): string | null {
  return date ? date.toISOString() : null;
} 