import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
    return (
        <div id="home" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
            <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in ">
                <div className='lg:h-16' />
                <h1 className="text-4xl md:text-7xl max-w-4xl font-bold leading-tight gradient-text">
                    Collaborate and Create Without Limits
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Transform your ideas into reality with our powerful open-source whiteboard.
                    Perfect for teams, designers, and creative minds.
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-8">
                    <Link href="/app">
                        <Button size="lg" className="gap-2 rounded-full lg:hover:gap-4 ease-in-out duration-200 transition-all font-semibol bg-primary/60">
                            Get Started Free <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <a
                        href="https://github.com/kiraaziz/Neoflow"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button size="lg" variant="outline" className="gap-2 rounded-full">
                            <Github size={17} />
                            View on GitHub
                        </Button>
                    </a>
                </div>
            </div>
            <div className="mt-16 w-full max-w-6xl mx-auto p-4 animate-float ">
                <div className=" h-max rounded-xl border-4 border-primary/80 shadow-2xl overflow-hidden">
                    <img
                        src="/landing.webp"
                        alt="Neoflow Interface"
                        className="w-full h-max object-cover"
                    />
                </div>
            </div>
        </div>
    );
};