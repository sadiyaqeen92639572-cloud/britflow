"use client";


import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCollapsibleProps {
    items: FAQItem[];
    title?: string;
}

const FAQCollapsible: React.FC<FAQCollapsibleProps> = ({
    items,
    title = "Questions Fréquentes & Savoir"
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for visibility

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQPage Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <>
            {/* Invisible SEO Layer */}
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>

            {/* Visible UI Layer */}
            <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                        <HelpCircle size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                        {title}
                    </h3>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl transition-all duration-300 ${openIndex === index
                                    ? 'border-blue-200 bg-blue-50/50'
                                    : 'border-slate-100 hover:border-slate-300 bg-transparent'
                                }`}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className={`font-bold text-sm md:text-base ${openIndex === index ? 'text-blue-900' : 'text-slate-600'
                                    }`}>
                                    {item.question}
                                </span>
                                <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-500' : 'text-slate-400'}`}>
                                    <ChevronDown size={20} />
                                </span>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-slate-400 italic">
                        * Ces réponses sont générées par notre base de connaissance juridique Societe Anglaise et validées pour l'année fiscale en cours.
                    </p>
                </div>
            </div>
        </>
    );
};

export default FAQCollapsible;