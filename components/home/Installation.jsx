import React from 'react';
import { Terminal } from 'lucide-react';
const Installation = () => {
    const steps = [
        {
            command: 'git clone https://github.com/kiraaziz/Neoflow.git',
            description: 'Clone the repository'
        },
        {
            command: 'cd Neoflow',
            description: 'Navigate to project directory'
        },
        {
            command: 'Setup .env file with required variables',
            description: 'Configure environment variables'
        },
        {
            command: 'npm --force i',
            description: 'Install dependencies'
        },
        {
            command: 'npm run dev',
            description: 'Start development server'
        },
        {
            command: 'Enjoy! 🎉',
            description: 'Open http://localhost:3000 in your browser'
        }
    ];
    return (
        <section className="py-20 px-4" id="installation">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">
                    Quick Installation
                </h2>
                <p className="text-muted-foreground text-center mb-12">
                    Get started with Neoflow in minutes
                </p>

                <div className="p-6 ">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5" />
                        <span className="font-mono font-semibold">Installation Steps</span>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="font-mono bg-primary/5 p-3 rounded-md">
                                    $ {step.command}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 ml-2">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Installation;