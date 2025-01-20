import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
const FAQ = () => {
    return (
        <section className="py-20 px-4" id="faq">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">
                    Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-center mb-12">
                    Everything you need to know about Neoflow
                </p>
                <Accordion type="single" collapsible className="w-full ">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold"  >What is Neoflow?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Neoflow is a free and open-source whiteboard application built on top of tldraw. It provides a collaborative space for creativity and ideation.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Is Neoflow really free?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Yes! Neoflow is completely free to use and will remain free forever. As an open-source project, we believe in making collaborative tools accessible to everyone.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">Who created Neoflow?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Neoflow was created by <a href="https://rjaziz.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Kira Aziz</a>. You can check out more of their work on their website.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">What technologies does Neoflow use?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Neoflow is built using a modern tech stack including Next.js, Prisma, PostgreSQL, and tldraw as the core whiteboard engine. We also integrate with Firework AI for intelligent features.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="font-semibold">What version is Neoflow currently in?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Neoflow is currently in beta version. We're actively developing new features and improvements based on user feedback.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="font-semibold">Does Neoflow support AI features?</AccordionTrigger>
                        <AccordionContent className="text-foreground/80">
                            Yes! Neoflow integrates with Firework AI to provide intelligent features that enhance your whiteboarding experience. This integration helps make your workflow more efficient and creative.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
};
export default FAQ;