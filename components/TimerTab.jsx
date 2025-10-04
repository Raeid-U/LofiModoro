"use client";
import React from "react";

export default function TimerTab({ timer, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tab ${isSelected ? "tab-selected" : ""}`}
      type="button"
    >
      {timer.name}
    </button>
  );
}
