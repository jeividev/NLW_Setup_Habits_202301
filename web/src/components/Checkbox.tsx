import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckBoxProps {
  title: string;
  checkedChange: Function;
  checked?: boolean;
}

export function CheckBox(props: CheckBoxProps) {
  return (
    <div>
      <Checkbox.Root
        className="flex items-center gap-3 group"
        onCheckedChange={()=> props.checkedChange()}
        checked={props.checked}
      >
        <div className="h-8 w-8 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:via-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
          <Checkbox.Indicator>
            <Check size={24} className="text-white" />
          </Checkbox.Indicator>
        </div>
        <span className="leading-tight text-white">{props.title}</span>
      </Checkbox.Root>
    </div>
  );
}
