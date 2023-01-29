import { Check } from "phosphor-react";
import { CheckBox } from "./Checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const recurrences: string[] = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState<string>("");
  const [weekDay, setWeekDay] = useState<Array<number>>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDay.length === 0) {
      return;
    }

    console.log(title, weekDay);

    await api.post("habits", {
      title,
      weekDays: weekDay,
    });

    setTitle("");
    setWeekDay([]);

    alert("Hábito criado com sucesso");
  }

  function weekDayCheck(i: number) {
    if (weekDay.includes(i)) {
      const weekDaysWithRemoveOne = weekDay.filter((day) => day != i);
      setWeekDay(weekDaysWithRemoveOne);
    } else {
      const weekDaysWithAddedOne = [...weekDay, i];
      setWeekDay(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title">Qual seu comprometimento?</label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        autoFocus
      />
      <label htmlFor="" className="mt-3">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {recurrences.map((itemWeekDay, index) => {
          return (
            <CheckBox
              key={`${itemWeekDay}-${index}`}
              title={itemWeekDay}
              checkedChange={() => weekDayCheck(index)}
              checked={weekDay.includes(index)}
            />
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
