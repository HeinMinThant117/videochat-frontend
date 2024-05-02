import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import axios from "@/lib/axios";
import { APIResponse } from "@/types/common";
import { LoginUser } from "@/types/User";

import LoadingButton from "../LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface LoginCredentials {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z.string().min(4, {
    message: "Password must be at 4 least characters long",
  }),
});

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginCredentials: LoginCredentials) => {
      return await axios.post("/login", {
        email: loginCredentials.email,
        password: loginCredentials.password,
      });
    },
    onSuccess: (response: AxiosResponse<APIResponse<LoginUser>>) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast({ title: "Login Success" });
      navigate("/");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email...."
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
                <Input
                  type="password"
                  placeholder="Enter your password...."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          className="mt-4 w-full"
          title="Login"
          loading={loginMutation.isPending}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
