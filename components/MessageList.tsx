"use client";
// Initialize the JS client
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MessageList = () => {
  const [list, setList] = useState<Array<any>>([]);
  const getMessages = async () => {
    const { data } = await supabase.from("messages").select("*");
    if (!!data) {
      setList(data);
    }
  };

  const handleInserts = (payload: any) => {
    setList((prevValues) => [...prevValues, payload.new]);
  };

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  useEffect(() => {
    getMessages();
    // Listen to inserts
    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleInserts
      )
      .subscribe();
  }, []);

  return (
    <div>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {!!list && list!.length > 0
          ? list?.map((el, idx) => <p key={idx}>{el.text}</p>)
          : null}
      </div>
    </div>
  );
};

export default MessageList;
