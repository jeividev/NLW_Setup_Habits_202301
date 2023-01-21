import React from 'react';

interface HabitProps {
  completed: number;
}

export const Habit: React.FC<HabitProps> = (props) => {
  return (
    <div className="rounded bg-black w-10 h-10 text-white m-2 flex items-center justify-center">
      {props.completed}
    </div>
  );
};
