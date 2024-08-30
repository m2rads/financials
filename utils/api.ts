export async function fetchFinancialData() {
  // Replace this with your actual API call
  const response = await fetch('/api/financial-data');
  if (!response.ok) {
    throw new Error('Failed to fetch financial data');
  }
  return response.json();
}