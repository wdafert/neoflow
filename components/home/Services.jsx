import React from 'react';
import { Sparkles, Github, Palette, Users, Brain, Puzzle } from 'lucide-react';
const Services = () => {
    const services = [
        {
            title: "Free Forever",
            description: "No hidden costs. Create and collaborate without limits.",
            icon: <Sparkles className="w-8 h-8 text-purple-500" />,
            className: "md:col-span-1 row-span-1"
        },
        {
            title: "Open Source",
            description: "Built with transparency. Powered by community.",
            icon: <Github className="w-8 h-8 text-blue-500" />,
            className: "md:col-span-1 row-span-1"
        },
        {
            title: "Fun & Easy",
            description: "Intuitive interface for seamless creativity.",
            icon: <Palette className="w-8 h-8 text-green-500" />,
            className: "md:col-span-2 row-span-1"
        },
        {
            title: "AI Integration",
            description: "Smart features to enhance your workflow.",
            icon: <Brain className="w-8 h-8 text-rose-500" />,
            className: "md:col-span-2 row-span-1"
        },
        {
            title: "tldraw Powered",
            description: "Built on top of the powerful tldraw engine.",
            icon: <Puzzle className="w-8 h-8 text-amber-500" />,
            className: "md:col-span-1 row-span-1"
        },
        {
            title: "Real-time Collaboration",
            description: "Work together in real-time with your team.",
            icon: <Users className="w-8 h-8 text-indigo-500" />,
            className: "md:col-span-1 row-span-1"
        }
    ];
    return (
        <section className="py-20 px-4" id="features">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">
                    Everything You Need
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    A powerful whiteboard application that combines simplicity with advanced features
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-4">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className={`p-6 hover:shadow-lg transition-all duration-300 ${service.className} animate-fade-in bg-primary/5 rounded-xl `}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-4 p-2 w-fit rounded-lg bg-background">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-muted-foreground">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Services;