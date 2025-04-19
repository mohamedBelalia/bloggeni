// "use client";

import {
    Cloud,
    LogOut,
} from "lucide-react"
import { logout } from "./action";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EmailAvatar from "./EmailAvatar"
import Link from "next/link";
import { CiMoneyCheck1 } from "react-icons/ci";
// import LogoutButton from "./LogoutButton"

export function ProfileActions({email} : {email : string}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EmailAvatar email={email} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Cloud />
                        <Link href={"/saved-blogs"}>Saved Blogs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <CiMoneyCheck1 />
                        <Link href={"/user/subscriptions"}>Subscriptions</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />


                <form action={logout}>
                    <DropdownMenuItem asChild className="w-full">
                        <button type="submit">
                            <LogOut />
                            <span>Log out</span>
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
