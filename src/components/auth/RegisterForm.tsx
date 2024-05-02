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
import { toast } from "../ui/use-toast";

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters long",
  }),
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z.string().min(4, {
    message: "Password must be at least characters long",
  }),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (registerCredentials: RegisterCredentials) => {
      return await axios.post("/register", {
        username: registerCredentials.username,
        email: registerCredentials.email,
        password: registerCredentials.password,
      });
    },
    onSuccess: (response: AxiosResponse<APIResponse<LoginUser>>) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast({ title: "Register Success" });
      navigate("/");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    registerMutation.mutate({
      email: values.email,
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username...." {...field} />
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
                <Input placeholder="Enter your email...." {...field} />
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
          title="Register"
          loading={registerMutation.isPending}
          className="mt-4 w-full"
          type="submit"
        />
      </form>
    </Form>
  );
};

export default RegisterForm;
