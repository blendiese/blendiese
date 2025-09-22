// MySelect.tsx
import React from "react";
import * as RadixSelect from "@radix-ui/react-select";

interface SelectProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultValue,
  onValueChange,
  placeholder,
  className,
}) => {
  return (
    <div className={className}>
      <RadixSelect.Root
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <RadixSelect.Trigger className="flex items-center justify-between px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 radix-open:border-blue-500 w-full">
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2">▼</RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className="bg-white rounded-md shadow-lg py-1 z-50">
            <RadixSelect.Viewport>
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none cursor-pointer radix-highlighted:bg-blue-100"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="ml-auto">
                    ✓
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};

export default Select;
