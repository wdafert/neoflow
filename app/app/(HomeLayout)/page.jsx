export function metadata() {
  return {
    title: "Neoflow - Get started",
  };
}

export default function WavyBackgroundDemo() {

  return (
    <div className="h-full w-full bg-background relative">
      <div className="h-full w-full overflow-y-auto  p-3 lg:p-10  absolute top-0 right-0 ">
        <h1 className="text-3xl font-bold">Get started</h1>
        {/* <TopActions />
        <div className="w-full ">

          <h2 className="mt-5 mb-1.5 flex items-center justify-center gap-2 w-max text-foreground">
            <Sparkles size={20} />
            Start from the templates 
          </h2>
          <Themps />
        </div> */}
      </div>
    </div>
  );
}
