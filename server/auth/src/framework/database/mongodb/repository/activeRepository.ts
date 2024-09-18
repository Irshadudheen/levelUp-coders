import { Iactive } from "../../../../entities/activeDays";
import { IactiveRepository } from "../../../../usecases/interface/repositoryInterface/activeRepository";
import activeModel from "../model/activeDays";

export class ActiveRepository implements IactiveRepository {
  constructor(private activeModels: typeof activeModel) {}

  async find(userId: string): Promise<Iactive | void | null> {
    return await this.activeModels.findOne({ userId });
  }

  async update(userId: string): Promise<Iactive | null | void> {
    // Get the current date and set the time to midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the active record for the user
    const active = await this.activeModels.findOne({ userId });

    // If the user has active days, check if today's date is already present
    if (active) {
      const existingDay = active.days?.find(day => {
        const dayDate = new Date(day.date);
        dayDate.setHours(0, 0, 0, 0);  // Set time to midnight for comparison
        return dayDate.getTime() === today.getTime();  // Compare dates without time
      });

      // If an entry for today exists, return without adding a new one
      if (existingDay) {
        return active;
      }
    }

    // If no entry for today exists, add a new active day
    const newActive = await this.activeModels.findOneAndUpdate(
      { userId },
      { $push: { days: { date: today, isActive: true } } },  // Add new active day for today
      { new: true, upsert: true }  // Create document if it doesn't exist
    );

    return newActive;
  }
}
