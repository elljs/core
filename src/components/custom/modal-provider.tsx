import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useReactive } from "ahooks";
import { createContext, useContext } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

type Modal = "alert" | "dialog";

type ModalProps = {
	title: React.ReactNode;
	description?: React.ReactNode;
	cancelText?: React.ReactNode;
	confirmText?: React.ReactNode;
	onCancel?: () => void | Promise<void>;
	onConfirm?: () => void | boolean | Promise<void> | Promise<boolean>;
};

const initialModalProps: ModalProps = {
	title: "",
	description: "",
	cancelText: "取消",
	confirmText: "确定",
	onCancel: () => {},
	onConfirm: () => true,
};

type ModalProviderProps = {
	children: React.ReactNode;
	defaultType?: Modal;
};

type ModalProviderState = DialogProps & {
	alert: (props: ModalProps) => void;
	dialog: (props: ModalProps) => void;
};

const initialState: ModalProviderState = {
	open: false,
	alert: () => {},
	dialog: () => {},
};

const ModalProviderContext = createContext<ModalProviderState>(initialState);

export function ModalProvider({ children, defaultType }: ModalProviderProps) {
	const state = useReactive<
		ModalProviderState & {
			type: Modal;
			modalProps: ModalProps;
		}
	>({
		open: false,
		type: defaultType ?? "alert",
		modalProps: {
			title: "",
		},
		alert: (props: ModalProps) => {
			state.type = "alert";
			state.modalProps = { ...initialModalProps, ...props };
			state.open = true;
		},
		dialog: (props: ModalProps) => {
			state.type = "dialog";
			state.modalProps = { ...initialModalProps, ...props };
			state.open = true;
		},
	});

	return (
		<ModalProviderContext.Provider
			value={{
				open: state.open,
				alert: state.alert,
				dialog: state.dialog,
			}}
		>
			{children}
			{state.type === "alert" && (
				<AlertDialog open={state.open}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{state.modalProps.title}</AlertDialogTitle>
							{state.modalProps?.description && (
								<AlertDialogDescription>
									{state.modalProps?.description}
								</AlertDialogDescription>
							)}
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={() => {
									state.modalProps?.onCancel?.();
									state.open = false;
								}}
							>
								{state.modalProps?.cancelText}
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={async () => {
									const isConfirm = await state.modalProps?.onConfirm?.();
									if (typeof isConfirm === "undefined") {
										state.open = false;
									} else {
										state.open = !isConfirm;
									}
								}}
							>
								{state.modalProps?.confirmText}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
			{state.type === "dialog" && (
				<Dialog open={state.open} onOpenChange={(open) => (state.open = open)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{state.modalProps.title}</DialogTitle>
							{state.modalProps?.description && (
								<DialogDescription>
									{state.modalProps?.description}
								</DialogDescription>
							)}
						</DialogHeader>
						<DialogFooter>
							<Button
								onClick={async () => {
									await state.modalProps?.onConfirm?.();
									state.open = false;
								}}
							>
								{state.modalProps?.confirmText}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</ModalProviderContext.Provider>
	);
}

export const useModal = () => {
	const context = useContext(ModalProviderContext);

	if (context === undefined)
		throw new Error("useModal must be used within a ModalProviderContext");

	return context;
};
