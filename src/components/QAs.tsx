import { useState, useRef, useEffect } from "react";

type QA = {
  question: string;
  answer: string;
};

const faqs: QA[] = [
  {
    question: "What is Turbo Blog?",
    answer: `Turbo Blog is the ultimate AI writing tool for SEO. It helps you generate high-quality, long-form, SEO-rich blog posts while keeping a natural, human tone. 
Beyond writing, Turbo Blog includes in-depth SEO research and AI-generated visuals to make your content fully optimized. It’s a complete solution for creating engaging, high-ranking content with ease.`
  },
  {
    question: "How does Turbo Blog differ from other AI writing tools?",
    answer: `Turbo Blog is built specifically for long-form SEO content. Unlike generic AI tools, it handles everything from research to writing and optimization. 
With its unique AI Article Workflow, you can easily generate 3000+ word articles that are authentic, brand-consistent, and SEO-optimized. 
It’s also far more cost-effective — while other platforms may charge $30 per article, Turbo Blog offers a free trial with no upfront cost.
Future updates will integrate project management and team collaboration features, making Turbo Blog an essential tool for scaling your SEO strategy.`
  },
  {
    question: "How does Turbo Blog use my data?",
    answer: `Turbo Blog takes your privacy seriously. Your data is never sold or used for training purposes. 
Visit our security policy to learn more about how we protect your information. You can create and manage content confidently, knowing your data stays private and secure.`
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      const content = contentRefs.current[openIndex];
      const a = content?.scrollHeight;
      console.log(a);
    }
  }, [openIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="mb-4 border-b border-gray-200">
            <button
              onClick={() => toggle(index)}
              className="flex cursor-pointer justify-between items-center w-full py-3 text-left text-lg font-semibold text-gray-800 hover:text-fuchsia-700 focus:outline-none"
            >
              {faq.question}
              <span className="ml-2 text-fuchsia-700 text-2xl">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={`transition-all duration-500 ease-in-out overflow-hidden`}
              style={{
                maxHeight: isOpen
                  ? contentRefs.current[index]?.scrollHeight + "px"
                  : "0px"
              }}
            >
              <div className="pb-4 text-gray-700 text-base px-1 pt-2">
                {faq.answer.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
