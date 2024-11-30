import {z} from "zod";

export const CommandSchema = z.object({
    id:z.number().optional(),
    command:z.string().min(2,"Command must be at least 2 characters long"),
    created_at:z.date().optional(),
});
