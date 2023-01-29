import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./prisma";
import dayjs from "dayjs";

interface completedHabtisView {
  date: string;
  dateId: string;
  week_day: string;
  habit_id: string;
  day_id_habit: string
  id: string;
}

export async function appRoutes(app: FastifyInstance) {
  app.get("/", () => {
    return {
      Status: "Ok",
      Date: Date(),
    };
  });

  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    // localhost:3333/day?date=2023-01-22
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parseDate = dayjs(date).startOf("day");
    const weekDay = parseDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    /** * v1 - Rocketseat */
    // const day = await prisma.day.findUnique({
    //   where: {
    //     date: parseDate.toDate(),
    //   },
    //   include: {
    //     dayHabits: true,
    //     _count: true,
    //   },
    // });
    // const completedHabits = day?.dayHabits.map((dayHabit) => {
    //   return dayHabit.habit_id;
    // }) ?? []

    const day: completedHabtisView[] = await prisma.$queryRaw`  
      select * from v_completedHabits
      where dateId = ${parseDate.toDate()}
    `;

    const completedHabits =
      day?.map((completedView: completedHabtisView) => {
        return completedView.habit_id;
      }) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  });

  /**
   * completar / descompletar um hábito
   */

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      //Delete
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      //Create
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get("/summary", async () => {
    /**
     * Example
     * [{
     *    date:  22/01,
     *    amount: 5,
     *    completed: 1
     *  }]
     */

    const summary = await prisma.$queryRaw`
      SELECT
        D.id
        ,D.date
        ,(
          SELECT 
            cast(count(*) as float)
          FROM habit_week_days HWD    
          JOIN habits H
            ON HWD.habit_id = H.id
          WHERE 1 = 1
            AND HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as float)
            AND H.created_at <= D.date
        ) as amount
        ,(
          SELECT 
            cast(count(*) as float)
          FROM v_completedHabits VCH
          WHERE VCH.day_id_habit = D.id
        ) as complete
        
      FROM days D
    `;
    return summary;
  });
}
