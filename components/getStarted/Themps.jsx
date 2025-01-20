"use client"
import { Workflow } from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";


export function Themps() {
    return (
        <BentoGrid className="mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
    {
        title: "Start with Neoflow",
        description: "Explore the genesis of groundbreaking ideas and inventions with Neoflow.",
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <Workflow size={22} className="text-primary" />
    },
    {
        title: "Begin a Sequence in Neoflow",
        description: "Kickstart your project with a foundational Sequence Diagram template in Neoflow.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <Workflow size={22} className="text-primary" />
    },
    {
        title: "Start a Flowchart in Neoflow",
        description: "Jump into the world of thoughtful and functional design with Neoflow.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <Workflow size={22} className="text-primary" />
    },
    {
        title: "Initialize a Class Diagram in Neoflow",
        description:
            "Get a head start on effective communication and organization with Neoflow.",
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <Workflow size={22} className="text-primary" />
    },
];
