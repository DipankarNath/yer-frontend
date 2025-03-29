import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LOGIN } from "@/service/auth";
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  userName: z.string().min(2).max(50),
  password: z.string().min(5).max(50),
});

function Login({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (payload: AuthPayload) => LOGIN(payload),
    mutationKey: ["login"],
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);

      if (data?.data.user.role === 'ADMIN') {
        navigate('/providerDashboard');
      } else if (data?.data.user.role === 'USER') {
        navigate('/patientDashboard');
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    loginMutation.mutate(values);
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bayer</CardTitle>
            <CardDescription>
              Login with your username and passsword
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Name</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex">
                              <FormLabel>Password</FormLabel>
                              <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </a>
                            </div>

                            <FormControl>
                              <Input
                                type="password"
                                placeholder="*******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/patient-registration"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

export default Login;
