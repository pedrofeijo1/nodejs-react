import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react";
import {Link} from "react-router-dom";
import { z } from "zod";
import {useForm} from "react-hook-form";
import {useAuth} from "@/context/useAuth.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const formSchema = z.object({
  login: z.string().nonempty('Login is required'),
  password: z.string().nonempty('Password is required')
})

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const { loginUser } = useAuth();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  function handleSubmitForm(data: FormSchema) {
    loginUser(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)}
              className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="login"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Login</Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?
            <Link to="/register" className="ml-1 underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
