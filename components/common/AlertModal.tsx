import {
	AlertDescriptionProps,
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogProps,
	AlertProps,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends AlertDialogProps {
	header?: React.ReactNode;
	headerProps?: Omit<AlertDialogProps, "children">;
	contentProps?: AlertDescriptionProps;
	footer?: React.ReactNode;
	footerProps?: AlertProps;
	closeIcon?: boolean | React.ReactNode;
}

const AlertModal = (props: IProps) => {
	const {
		headerProps = {},
		contentProps = {},
		children,
		header,
		footer,
		footerProps = {},
		closeIcon = true,
		...AlertDialogProps
	} = props;

	return (
		<AlertDialog {...AlertDialogProps} isCentered>
			<AlertDialogOverlay />
			<AlertDialogContent {...contentProps}>
				{header && (
					<AlertDialogHeader {...headerProps}>{header}</AlertDialogHeader>
				)}
				{closeIcon &&
					(closeIcon === true ? <AlertDialogCloseButton /> : closeIcon)}
				<AlertDialogBody>{children}</AlertDialogBody>
				{footer && (
					<AlertDialogFooter {...footerProps}>{footer}</AlertDialogFooter>
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertModal;
