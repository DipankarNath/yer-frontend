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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_PROVIDER } from "@/service/auth";

const providerRegistrationSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10).max(10),
  password: z.string().min(5).max(50),
});

function ProviderRegistration() {
  const form = useForm<z.infer<typeof providerRegistrationSchema>>({
    resolver: zodResolver(providerRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const providerRegistrationMutation = useMutation({
    mutationFn: (payload: ProviderCreationPayload) => REGISTER_PROVIDER(payload),
    mutationKey: ["provider-reg"],
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (values: z.infer<typeof providerRegistrationSchema>) => {
    console.log(values)
    providerRegistrationMutation.mutate(data)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bayer</CardTitle>
            <CardDescription>Provider Registration</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543456" {...field} />
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
                            <Input
                              type="password"
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                      Login
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

export default ProviderRegistration;
