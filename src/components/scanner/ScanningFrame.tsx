const ScanningFrame = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/15" />
      
      {/* Scanning frame with glow effect */}
      <div className="w-full max-w-sm aspect-[3/4] border-2 border-primary rounded-lg relative animate-pulse shadow-[0_0_15px_rgba(134,180,156,0.3)]">
        <div className="absolute inset-0 border-[16px] border-primary/10 rounded-lg" />
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
      </div>
    </div>
  );
};

export default ScanningFrame;