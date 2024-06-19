export default function Steps({
  currentStepIndex,
  maxSteps,
}: {
  currentStepIndex: number;
  maxSteps: number;
}): JSX.Element {
  return (
    <div className="mt-4 flex flex-col">
      <div className="text-subtle text-sm">
        step {currentStepIndex} of {maxSteps}
      </div>
      <div className="mt-1">
        <div className="flex space-x-2">
          {Array.from({ length: maxSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex h-[3px] w-[80px] rounded-full ${
                index <= currentStepIndex - 1 ? "bg-black" : "bg-emphasis"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
