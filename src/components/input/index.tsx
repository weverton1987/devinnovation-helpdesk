"use client"

import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ type, register, name, error, rules, placeholder }: InputProps) {
    return (
        <>
            <input 
            className="border-2 w-full h-11 border-gray-300 px-2 rounded-md"
            placeholder={placeholder} 
            type={type}
            id={name}
            {...register(name, rules)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
    );
}
