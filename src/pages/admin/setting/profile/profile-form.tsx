import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import constants from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
	avatar: z.string().optional(),
	nickname: z
		.string({
			required_error: "请输入您的昵称。",
		})
		.min(2, {
			message: "昵称必须至少2个字符。",
		})
		.max(30, {
			message: "昵称长度不得超过30个字符。",
		}),
	email: z
		.string({
			required_error: "请选择您要显示的电子邮件。",
		})
		.email(),
	bio: z
		.string({
			required_error: "请输入您的简介。",
		})
		.max(160, {})
		.min(4, {
			message: "简介必须至少4个字符。",
		}),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: "请输入有效的网址。" }),
			}),
		)
		.optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	nickname: constants.name,
	bio: constants.description,
	urls: [
		{ value: "https://shadcn.com" },
		{ value: "http://twitter.com/shadcn" },
	],
};

export default function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		name: "urls",
		control: form.control,
	});

	function onSubmit(data: ProfileFormValues) {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* <FormField
					control={form.control}
					name="avatar"
					render={({ field }) => (
						<FormItem>
							<FormLabel>头像</FormLabel>
							<FormControl>

							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				<FormField
					control={form.control}
					name="nickname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>昵称</FormLabel>
							<FormControl>
								<Input placeholder="请输入您的昵称" {...field} />
							</FormControl>
							<FormDescription>
								这是您的公开显示名称。它可以是你真实姓名或化名。您每30天只能更改一次。
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>邮箱</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="选择一个已验证的电子邮件以显示" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="m@example.com">m@example.com</SelectItem>
									<SelectItem value="m@google.com">m@google.com</SelectItem>
									<SelectItem value="m@support.com">m@support.com</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								您可以管理您账户中的已验证电子邮件地址。{" "}
								<a className="underline" href="#">
									邮箱设置
								</a>
								.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>简介</FormLabel>
							<FormControl>
								<Textarea
									placeholder="请告诉我们一些关于您自己的信息"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								您可以<span>@提及</span>其他用户和组织以链接到他们。
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					{fields.map((field, index) => (
						<FormField
							control={form.control}
							key={field.id}
							name={`urls.${index}.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && "sr-only")}>
										链接
									</FormLabel>
									<FormDescription className={cn(index !== 0 && "sr-only")}>
										添加链接到您的网站、博客或社交媒体资料。
									</FormDescription>
									<div className="flex items-center space-x-2">
										<FormControl>
											<Input {...field} />
										</FormControl>
										{index !== 0 && (
											<Button
												type="button"
												variant="outline"
												size="icon"
												onClick={() => remove(index)}
											>
												<Trash2 />
											</Button>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="mt-2"
						onClick={() => append({ value: "" })}
					>
						新增链接
					</Button>
				</div>
				<Button type="submit">立即更新</Button>
			</form>
		</Form>
	);
}
