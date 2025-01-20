"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, MessageCircle } from 'lucide-react';
const Community = () => {
    return (
        <section className="py-20 px-4" id="community">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">
                    Join Our Community
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    Connect with developers, share your ideas, and contribute to the future of Neoflow
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto ">
                    <div className="p-8 text-center hover:shadow-lg transition-all duration-300 animate-fade-in  bg-primary/5 rounded-lg">
                        <img src="/contact/9.svg" className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-xl font-semibold mb-2">Chat on Discord</h3>
                        <p className="text-muted-foreground mb-6">
                            Join our Discord community to chat with other users and get help
                        </p>
                        <Button
                            className="w-full"
                            onClick={() => window.open('https://discord.gg/4BpxBW5g', '_blank')}
                        >
                            <img src="/contact/9.svg" className="mr-2 h-4 w-4" />
                            Join Discord
                        </Button>
                    </div>
                    <div className="p-8 text-center hover:shadow-lg transition-all duration-300 animate-fade-in bg-primary/5 rounded-lg" style={{ animationDelay: '0.1s' }}>
                        <Github className="w-12 h-12 mx-auto mb-4 text-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Contribute on GitHub</h3>
                        <p className="text-muted-foreground mb-6">
                            Check out our GitHub repository and start contributing
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => window.open('https://github.com/kiraaziz/Neoflow', '_blank')}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            View on GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Community;