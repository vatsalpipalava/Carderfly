import * as z from "zod";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty({
      message: "First Name is required.",
    })
    .min(2, {
      message: "First Name must be at least 2 characters.",
    }),
  lastName: z
    .string()
    .nonempty({
      message: "Last Name is required.",
    })
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email(),
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .regex(new RegExp(PWD_REGEX), {
      message: "Password not match.",
    }),
});

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

const settingsNameSchema = z.object({
  firstName: z
    .string()
    .nonempty({
      message: "First Name is required.",
    })
    .min(2, {
      message: "First Name must be at least 2 characters.",
    }),
  lastName: z
    .string()
    .nonempty({
      message: "Last Name is required.",
    })
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
});

const otpSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required.",
    })
    .email(),
});

const resetPasswordSchema = z.object({
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .regex(new RegExp(PWD_REGEX), {
      message: "Password not match.",
    }),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty({
    message: "Current password is required.",
  }),
  newPassword: z
    .string()
    .nonempty({
      message: "New password is required.",
    })
    .regex(new RegExp(PWD_REGEX), {
      message: "New password not match.",
    }),
});

export {
  registerSchema,
  loginSchema,
  settingsNameSchema,
  otpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
