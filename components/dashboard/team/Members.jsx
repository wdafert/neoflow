import { TeamMembers } from "@/app/api/membership/get"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow, format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RoleSelect from "./RoleSelect"

function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
}

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Calendar } from "lucide-react";

function convertISOToReadableDate(isoDateString, formatString = "MMMM d, yyyy HH:mm") {
    const inputDate = new Date(isoDateString);

    const readableDate = format(inputDate, formatString);
    return readableDate;
}

export default async function Members({ id }) {

    const { members, myRank } = await TeamMembers(id)

    return (
        <div className="px-3">
            <div className="border border-input rounded-xl overflow-hidden">
                <Table >
                    <TableHeader className="bg-primary/5">
                        <TableRow className="border-input">
                            <TableHead className="font-medium"></TableHead>
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Joit at</TableHead>
                            <TableHead className="font-medium">Role</TableHead>
                            <TableHead className="font-medium"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow className="border-input whitespace-nowrap">
                                <TableCell>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Avatar className="border border-input">
                                                <AvatarImage className="object-cover " src={member.user.image} />
                                                <AvatarFallback>{member.user.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-max border-input">
                                            <div className="flex justify-between space-x-4">
                                                <Avatar>
                                                    <AvatarImage className="object-cover" src={member.user.image} />
                                                    <AvatarFallback>{member.user.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">{member.user.name}</h4>
                                                    <p className="text-sm">
                                                        {member.user.email}
                                                    </p>
                                                    <div className="flex items-center pt-2">
                                                        <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
                                                        <span className="text-xs text-muted-foreground">
                                                            Joined {convertISOToReadableDate(member.createAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </TableCell>
                                <TableCell>
                                    {member.user.name}
                                </TableCell>
                                <TableCell>
                                    {member.user.email.length > 25 ? `${member.user.email.substring(0, 25)}...` : member.user.email}
                                </TableCell>
                                <TableCell>
                                    {timeAgo(member.createAt)}
                                </TableCell>
                                <TableCell>
                                    {member.role}
                                </TableCell>
                                <TableCell>
                                    <RoleSelect {...{ team: member.teamId, doerId: myRank.userId, doerRank: myRank.role, userId: member.userId, userRank: member.role }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
