"use client";

import { useState } from "react";
import Board from "@/components/board";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <Board setMessage={setMessage} />
      <div id="buttonsAndMessage">
        <input
          id="restartGame"
          type="button"
          value="Reset"
          disabled={message === ""}
          onClick={() => window.location.reload()}
        />
        <label id="message">{message}</label>
      </div>
    </>
  );
}
