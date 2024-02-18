"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";

// Initialize the JS client
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Form = () => {
  const [text, setText] = useState("");

  const addMessage = async () => {
    await supabase.from("messages").insert({
      text: text,
    });
  };

  return (
    <div className="flex">
      <FormInput
        onChange={(e) => setText(e.target.value)}
        id="text"
        name="text"
      />
      <button onClick={addMessage}>Save</button>
    </div>
  );
};

export default Form;
