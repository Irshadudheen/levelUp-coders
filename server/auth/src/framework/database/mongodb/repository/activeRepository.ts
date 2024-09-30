import { Iactive } from "../../../../entities/activeDays";
import { IactiveRepository } from "../../../../usecases/interface/repositoryInterface/activeRepository";
import activeModel from "../model/activeDays";

export class ActiveRepository implements IactiveRepository {
  constructor(private activeModels: typeof activeModel) { }
  async toTenUser(): Promise<object | void | null> {
    // const findTotalUser = await this.activeModels.find()
    const topTenUsers = await this.activeModels.aggregate([
      {
        // Unwind the 'days' array to create a separate document for each day
        $unwind: "$days"
      },
      {
        // Match only documents where 'isActive' is true
        $match: { "days.isActive": true }
      },
      {
        // Group by userId and count the number of active days
        $group: {
          _id: "$userId",
          activeDaysCount: { $sum: 1 }
        }
      },
      {
        // Sort by activeDaysCount in descending order
        $sort: { activeDaysCount: -1 }
      },
      {
        // Limit the result to the top 10 users
        $limit: 10
      },
      {
        // Optionally, lookup the user details
        $lookup: {
          from: 'users', // Collection name of users
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        // Project the final fields you want to return
        $project: {
          userId: "$_id",
          activeDaysCount: 1,
          userDetails: { $arrayElemAt: ["$userDetails", 0] }
        }
      }
    ]);
    console.log(topTenUsers, 'the top ten user')
    return topTenUsers
  }

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
