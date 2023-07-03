import React from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

interface ISwitchProps {
  label?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}
export default function Switch(props: ISwitchProps) {
  const { enabled, onChange, label } = props;
  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center gap-2">
        <HeadlessSwitch.Label>{label}</HeadlessSwitch.Label>
        <HeadlessSwitch
          checked={enabled}
          onChange={onChange}
          className={`${enabled ? "bg-teal-400" : "bg-gray-200"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </HeadlessSwitch>
      </div>
    </HeadlessSwitch.Group>
  );
}
