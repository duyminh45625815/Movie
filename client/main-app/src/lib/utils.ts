import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Format currency to VND
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "VNĐ")
}

// Format date to dd/mm/yyyy
export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A"
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "Invalid Date"

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date)
}

// Format dd-mm-yyyy to yyyy-mm-dd
export const convertDateFormat = (dateStr: string) => {
  const regex = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/ // Hỗ trợ dd-mm-yyyy và dd/mm/yyyy
  const match = dateStr.match(regex)

  if (!match) return dateStr // Nếu không đúng định dạng, giữ nguyên

  const [, day, month, year] = match
  return `${year}-${month}-${day}` // Chuyển thành yyyy-mm-dd
}