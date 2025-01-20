import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

mermaid.initialize({

})

const Mermaid = ({ chart, id }) => {

  const [first, setFirst] = useState(true)
  const divId = id
  const mermaidRef = useRef(null);

  const loadState = () => {
    const mermaidDiv = document.getElementById(divId)
    if (mermaidDiv) {
      mermaidDiv.removeAttribute("data-processed");
      mermaid.contentLoaded();
      setFirst(false)
    }
  };

  const upDateState = () => {
    if (mermaidRef.current) {
      mermaidRef.current.removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
  }

  useEffect(() => {
    if (first) {
      loadState()
    } else {
      upDateState()
    }
  }, [chart]);

  return (
    <div
      className="mermaid flex items-center justify-center  h-full w-full  overflow-visible text-transparent"
      ref={mermaidRef}
      id={divId}
    >
      {chart}
    </div>
  );
};

export default Mermaid;
