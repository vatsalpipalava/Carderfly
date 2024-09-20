import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

const supportSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export { contactSchema, supportSchema };
