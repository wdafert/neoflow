import TableTop from "./TableHeader"
import { GetProjects } from "@/app/api/team/get";
import Cell from './cell/Cell'

export default async function LinksTable({ params, myRanc, team }) {

    const projects = await GetProjects(team.id)

    return (
        <TableTop role={["assistant", "leader"].includes(myRanc.role)} teamId={team.id} total={projects.total}>
            {projects.projects && (
                projects.projects.map((project) => (
                    <Cell team={team.id} role={myRanc.role} project={project} />
                ))
            )}
        </TableTop>

    )
}