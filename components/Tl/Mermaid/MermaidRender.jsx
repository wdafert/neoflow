// import mermaid from "mermaid";
import { useEffect, useRef } from "react";

// mermaid.initialize({})

const Mermaid = ({ chart }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.removeAttribute("data-processed");
      // mermaid.contentLoaded();
    }
  }, [chart]);


  return (
    <div
      className="mermaid flex items-center justify-center  h-full w-full  overflow-visible"
      ref={mermaidRef}
    >
      {chart}
    </div>
  );
};

export default Mermaid;
