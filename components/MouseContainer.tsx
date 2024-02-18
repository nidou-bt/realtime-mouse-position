"use client";
import React, { useEffect, useState } from "react";
import { RealtimePresenceState, createClient } from "@supabase/supabase-js";
import CursorDemo from "./CursorDemo";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const userId = Math.random().toString();
const slackRoomId = "#random";

const MouseContainer = () => {
  const [listMouse, setListMouse] = useState<Array<any>>([]);

  useEffect(() => {
    const channel = supabase.channel(slackRoomId, {
      config: {
        presence: { key: userId },
      },
    });
    // Receive Presence updates
    const presenceChanged = () => {
      const newState: RealtimePresenceState<Record<string, string>> =
        channel.presenceState();
      const users = Object.keys(newState);
      // console.log("users", newState);
      const newList = users.map((el: string) => ({
        id: el,
        ...newState[el][0],
      }));

      if (!!newList) {
        setListMouse(newList);
      }
    };
    // We can subscribe to all Presence changes using the 'presence' -> 'sync' event.
    channel
      .on("presence", { event: "sync" }, () => presenceChanged())
      .subscribe();

    document.addEventListener("keydown", function (event) {
      channel.track({ isTyping: Date.now(), value: event.key });
    });
    document.addEventListener("mousemove", function (event) {
      channel.track({
        isTyping: Date.now(),
        valueX: event.clientX,
        valueY: event.clientY,
      });
    });
    return () => {
      // When you no longer wish to track data
      channel.untrack().then((status) => console.log("status", status));
    };
  }, []);

  return (
    <div className="w-screen h-[400px]">
      {listMouse
        .filter((el) => el.id !== userId)
        .map((el: Record<string, string>) => (
          <div
            style={{
              position: el.id === userId ? "static" : "absolute",
              top: el.valueY + "px",
              left: el.valueX + "px",
              // backgroundColor: el.id === userId ? "blue" : "red",
            }}
            key={el.id}
          >
            <CursorDemo color={"blue"} id={el.id} />
          </div>
        ))}
    </div>
  );
};

export default MouseContainer;
