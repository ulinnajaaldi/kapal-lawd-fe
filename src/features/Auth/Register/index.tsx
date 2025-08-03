import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import { AuthUseCases } from "@/useCases/Auth";

import { ACCESS_TOKEN } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Name is required",
      })
      .max(100, {
        message: "Name is too long",
      }),
    email: z.email().min(1, {
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const RegisterFeature: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutate = AuthUseCases.useRegister();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate.mutate(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          if (data.data?.access_token) {
            Cookies.set(ACCESS_TOKEN, data.data.access_token);
            window.location.href = ROUTES.HOME;
          }
        },
      },
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-4 py-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@dev.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-1">
            <p className="text-sm">Already have an account?</p>
            <Link
              to={ROUTES.AUTH.LOGIN}
              className={cn(
                buttonVariants({ variant: "link", className: "px-0" }),
              )}
            >
              Login here
            </Link>
          </div>

          <Button type="submit" disabled={mutate.isPending}>
            {mutate.isPending && <Loader2 className="animate-spin" />}Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterFeature;
