// components/ui/loading-spinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-[#8BBE67] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
