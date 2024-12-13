const ScanningFrame = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/15" />
      
      {/* Scanning frame with glow effect */}
      <div className="w-full max-w-sm aspect-[3/4] border-4 border-primary rounded-lg relative shadow-[0_0_15px_rgba(134,180,156,0.3)]">
        <div className="absolute inset-0 border-[24px] border-primary/10 rounded-lg" />
      </div>
    </div>
  );
};

export default ScanningFrame;