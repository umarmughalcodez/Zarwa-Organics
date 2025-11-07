function calculateSecurityDeposit(totalAmount: number): number {
  if (totalAmount < 1000) return 150;
  if (totalAmount < 2000) return 300;
  if (totalAmount < 4000) return 500;
  return 800;
}
