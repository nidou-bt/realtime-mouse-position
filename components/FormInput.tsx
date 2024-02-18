"use client";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const FormInput = (Props: Props) => {
  return (
    <div>
      <label htmlFor={Props.id}></label>
      <input type="text" {...Props} />
    </div>
  );
};

export default FormInput;
