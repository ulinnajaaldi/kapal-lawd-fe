import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { Link, Navigate, Outlet } from "react-router";

import { AuthUseCases } from "@/useCases/Auth";

import { useAuthStore } from "@/hooks/use-auth";

import { ACCESS_TOKEN } from "@/constants/config";
import { ROUTES } from "@/constants/routes";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "../ui/skeleton";

const BaseLayout: React.FC = () => {
  const { setData } = useAuthStore();

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

  const queryMe = AuthUseCases.useGetProfile();

  useEffect(() => {
    if (queryMe.data) {
      setData(queryMe.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryMe.data]);

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN);
    setIsLogoutOpen(false);
    window.location.href = ROUTES.AUTH.LOGIN;
  };

  if (queryMe.isError) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return (
    <>
      <header className="bg-background/20 fixed top-0 right-0 left-0 z-50 w-full border-b backdrop-blur-2xl">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-5">
            <Link to={ROUTES.HOME} className="flex items-center gap-1">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto shrink-0" />
              <p className="hidden font-semibold md:inline">
                Kapal Lawd Article
              </p>
            </Link>
            {queryMe.isLoading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-20" />
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger disabled={queryMe.isLoading}>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6 md:size-7">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${queryMe.data?.name}`}
                      />
                      <AvatarFallback>KL</AvatarFallback>
                    </Avatar>
                    <p className="text-xs md:text-sm">
                      {(queryMe.data?.name || "").length > 10
                        ? `${(queryMe.data?.name || "").slice(0, 10)}...`
                        : queryMe.data?.name || ""}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex flex-col">
                    <span>{queryMe.data?.name}</span>
                    <span className="text-muted-foreground text-xs font-normal">
                      {queryMe.data?.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.PROFILE}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.MAKE_ARTICLE}>Make Article</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsLogoutOpen(true)}
                    className="w-full"
                    variant="destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      </header>
      <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout from your account?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will need to login again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="my-20 min-h-[80svh]">
        <Outlet />
      </div>
      <footer className="border-t py-2">
        <p className="text-muted-foreground container mx-auto px-4 text-center text-sm">
          © Kapal Lawd Article {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
};

export default BaseLayout;
