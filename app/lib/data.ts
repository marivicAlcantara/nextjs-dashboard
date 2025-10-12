// app/lib/data.ts
export async function fetchRevenue() {
  // 🧩 Temporary mock data (instead of database query)
  return [
    { month: 'January', revenue: 12000 },
    { month: 'February', revenue: 8000 },
    { month: 'March', revenue: 14000 },
    { month: 'April', revenue: 9000 },
    { month: 'May', revenue: 16000 },
  ];
}
