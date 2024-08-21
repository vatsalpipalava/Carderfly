import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email(),
  password: z.string().nonempty({
    message: "Password is required.",
  }),
});

export { loginSchema };
