import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EntryAnimation from "./components/EntryAnimation";
import CorkBoard from "./components/CorkBoard";

export default function App() {
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#0f0d0b" }}>
      <AnimatePresence>
        {!showBoard && (
          <EntryAnimation onComplete={() => setShowBoard(true)} />
        )}
      </AnimatePresence>
      {showBoard && <CorkBoard />}
    </div>
  );
}
