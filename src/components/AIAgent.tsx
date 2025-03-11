import { useEffect, useRef } from "react";

const AIWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customElements.get("elevenlabs-convai")) {
      // Load the ElevenLabs widget script only once
      const scriptId = "elevenlabs-convai-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://elevenlabs.io/convai-widget/index.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    if (containerRef.current && !containerRef.current.querySelector("elevenlabs-convai")) {
      // Add the ElevenLabs AI widget dynamically
      const aiElement = document.createElement("elevenlabs-convai");
      aiElement.setAttribute("agent-id", "58eoPaLbBIZYiGGUhuiq");
      containerRef.current.appendChild(aiElement);
    }
  }, []);

  return <div ref={containerRef} />;
};

export default AIWidget;
