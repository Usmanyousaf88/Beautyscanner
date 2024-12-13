const ScanningFrame = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-sm aspect-[3/4] border-2 border-white/30 rounded-lg relative">
        <div className="absolute inset-0 border-[16px] border-white/10 rounded-lg" />
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
      </div>
    </div>
  );
};

export default ScanningFrame;