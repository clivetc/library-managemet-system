// Layout.tsx
import { logout, userAsyncActions } from "@/redux/slice/authReducer";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { FC, ReactNode, startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import AuthLayout from "./auth";
import MainLayout from "./main";

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDomLoaded, setIsDomLoaded] = useState(false);
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);
	const isAuthorized = useSelector(
		(state: RootState) => state.auth.isAuthorized,
	);
	const loading = useSelector((state: RootState) => state.auth.loading);

	const dispatch = useDispatch();

	const authRoutes = ["/users/auth/login", "/users/auth/register"];

	useEffect(() => {
		setIsDomLoaded(true);
	}, []);

	useEffect(() => {
		if (isAuthorized) {
			startTransition(() => {
				dispatch(userAsyncActions.userData() as unknown as AnyAction);
			});
		}
	}, [dispatch, isAuthorized]);

	useEffect(() => {
		if (loading === "pending") {
			setIsLoading(true);
		} else if (!isAuthorized) {
			if (authRoutes.includes(router.pathname)) {
				setIsLoading(false);
			} else {
				router.replace("/users/auth/login");
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	}, [loading, isAuthorized]);

	const handleLogout = () => {
		dispatch(logout());
		setIsLoading(true);
		localStorage.clear();
	};
	if (!isDomLoaded) return <></>;

	if (!isAuthorized && !isLoading) {
		return (
			<div>
				<AuthLayout>{children}</AuthLayout>
			</div>
		);
	}

	return (
		<div>
			{!isLoading && (
				<MainLayout userName={user?.name ?? "N/A"} logOut={handleLogout}>
					{children}
				</MainLayout>
			)}
		</div>
	);
};

export default Layout;
