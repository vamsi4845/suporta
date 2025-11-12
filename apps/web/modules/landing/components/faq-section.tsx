"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Supportly and who is it for?",
    answer:
      "Supportly is an AI-powered support agent platform designed for businesses that want to provide instant, accurate customer support. It's perfect for SaaS companies, e-commerce stores, and any business with a knowledge base that wants to automate customer support while maintaining the option for human escalation.",
  },
  {
    question: "How does the AI support agent work?",
    answer:
      "After you upload your knowledge base documents, the AI agent searches through them to answer customer questions in real-time. If it can't find an answer or detects that a customer needs human help, it automatically escalates the conversation to your support team. The agent can also automatically resolve conversations when issues are solved.",
  },
  {
    question: "How do I integrate the widget into my website?",
    answer:
      "Integration is simple! After creating your account and organization, you'll get a script tag with your unique organization ID. Just copy and paste this single line of code into your website's HTML, and the support widget will appear on your site. No complex setup or configuration required.",
  },
  {
    question: "Can I customize the widget appearance?",
    answer:
      "Yes! You can customize your widget's colors, upload your logo, and choose its position (bottom-left or bottom-right). All customization options are available in your dashboard and take effect immediately.",
  },
  {
    question: "What happens when the AI can't answer a question?",
    answer:
      "When the AI can't find information in your knowledge base or detects that a customer needs human assistance, it automatically escalates the conversation. Your support team will see these escalated conversations in the dashboard and can take over seamlessly.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Sign up for a free account, create your organization, upload your knowledge base files, and add the widget script to your website. Your AI support agent will be live and ready to help customers within minutes.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div id="faq" className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
            Everything you need to know about
            <br className="hidden md:block" />
            setting up your AI support agent.
          </div>
        </div>

        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[rgba(73,66,61,0.60)] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
