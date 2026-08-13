export declare const findAllReminders: () => Promise<import("mysql2").QueryResult>;
export declare const findAllRemindersByUserId: (userId: number) => Promise<import("mysql2").QueryResult>;
export declare const createReminder: (payload: {
    user_plant_id: number;
    reminder_type: string;
    frequency_days: number;
    next_due_date: string;
    is_completed?: number;
}) => Promise<{
    id: any;
    user_plant_id: number;
    reminder_type: string;
    frequency_days: number;
    next_due_date: string;
    is_completed: number;
}>;
//# sourceMappingURL=reminderModel.d.ts.map