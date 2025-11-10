"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, RotateCcwIcon } from "lucide-react"
import { DatabaseIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

import { IntroDisclosure } from "@/modules/dashboard/ui/components/intro-disclosure"


const steps = [
  {
    title: "Setup Organization",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" className="nc-icon-wrapper">
          <path fillRule="evenodd" clipRule="evenodd" d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_0_t4csz04ye)" data-glass="origin" mask="url(#h33gm8ic3sh-1752500502811-9294189_user_mask_s86i2afs5)"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_0_t4csz04ye)" data-glass="clone" filter="url(#h33gm8ic3sh-1752500502811-9294189_user_filter_nsyh9isk4)" clipPath="url(#h33gm8ic3sh-1752500502811-9294189_user_clipPath_1jvvjoq1t)"></path>
          <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_1_bnqb6d6gm)" data-glass="blur"></path>
          <path d="M17.5586 22.25V23H6.44141V22.25H17.5586ZM18.75 21.0586C18.7499 17.5745 15.9255 14.7501 12.4414 14.75H11.5586C8.07451 14.7501 5.25012 17.5745 5.25 21.0586C5.25 21.7165 5.78354 22.25 6.44141 22.25V23L6.24316 22.9902C5.26408 22.891 4.5 22.0638 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414L12.8047 14.0088C16.5342 14.198 19.4999 17.2821 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23V22.25C18.2165 22.25 18.75 21.7165 18.75 21.0586Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_2_duz35xtpd)"></path>
          <path d="M14.75 8.5C14.75 6.98122 13.5188 5.75 12 5.75C10.4812 5.75 9.25 6.98122 9.25 8.5C9.25 10.0188 10.4812 11.25 12 11.25V12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12V11.25C13.5188 11.25 14.75 10.0188 14.75 8.5Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_3_x5xjz4yjs)"></path>
          <defs>
            <linearGradient id="h33gm8ic3sh-1752500502811-9294189_user_existing_0_t4csz04ye" x1="12" y1="1" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(87, 87, 87, 1)" data-glass-11="on"></stop>
              <stop offset="1" stopColor="rgba(21, 21, 21, 1)" data-glass-12="on"></stop>
            </linearGradient>
            <linearGradient id="h33gm8ic3sh-1752500502811-9294189_user_existing_1_bnqb6d6gm" x1="12" y1="5" x2="12" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(227, 227, 229, 0.6)" data-glass-21="on"></stop>
              <stop offset="1" stopColor="rgba(187, 187, 192, 0.6)" data-glass-22="on"></stop>
            </linearGradient>
            <linearGradient id="h33gm8ic3sh-1752500502811-9294189_user_existing_2_duz35xtpd" x1="12" y1="14" x2="12" y2="19.212" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255, 255, 255, 1)" data-glass-light="on"></stop>
              <stop offset="1" stopColor="rgba(255, 255, 255, 1)" stopOpacity="0" data-glass-light="on"></stop>
            </linearGradient>
            <linearGradient id="h33gm8ic3sh-1752500502811-9294189_user_existing_3_x5xjz4yjs" x1="12" y1="5" x2="12" y2="9.054" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255, 255, 255, 1)" data-glass-light="on"></stop>
              <stop offset="1" stopColor="rgba(255, 255, 255, 1)" stopOpacity="0" data-glass-light="on"></stop>
            </linearGradient>
            <filter id="h33gm8ic3sh-1752500502811-9294189_user_filter_nsyh9isk4" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
            </filter>
            <clipPath id="h33gm8ic3sh-1752500502811-9294189_user_clipPath_1jvvjoq1t">
              <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="url(#h33gm8ic3sh-1752500502811-9294189_user_existing_1_bnqb6d6gm)"></path>
            </clipPath>
            <mask id="h33gm8ic3sh-1752500502811-9294189_user_mask_s86i2afs5">
              <rect width="100%" height="100%" fill="#FFF"></rect>
              <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="#000"></path>
            </mask>
          </defs>
        </g>
      </svg>
    ),
  },
  {
    title: "Install Widget",
    icon:(
        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" className="nc-icon-wrapper"><path d="M9.42383 3.39355C8.55717 3.61022 8.12343 3.71934 7.80078 3.96094C7.51632 4.17406 7.29393 4.45941 7.15625 4.78711C7.00022 5.15863 7 5.60513 7 6.49805V17.502C7 18.3949 7.00022 18.8414 7.15625 19.2129C7.29393 19.5406 7.51632 19.8259 7.80078 20.0391C8.12343 20.2807 8.55716 20.3898 9.42383 20.6064L11 21H7.40039C5.16018 21 4.03924 21.0004 3.18359 20.5645C2.43109 20.181 1.81902 19.5689 1.43555 18.8164C0.999573 17.9608 1 16.8398 1 14.5996V9.40039C1 7.16018 0.999573 6.03924 1.43555 5.18359C1.81902 4.43109 2.43109 3.81902 3.18359 3.43555C4.03924 2.99957 5.16018 3 7.40039 3H11L9.42383 3.39355ZM15 15.5C15.8284 15.5 16.5 16.1716 16.5 17C16.5 17.8284 15.8284 18.5 15 18.5H13C12.1716 18.5 11.5 17.8284 11.5 17C11.5 16.1716 12.1716 15.5 13 15.5H15ZM20 12C20.8284 12 21.5 12.6716 21.5 13.5C21.5 14.3284 20.8284 15 20 15H15C14.1716 15 13.5 14.3284 13.5 13.5C13.5 12.6716 14.1716 12 15 12H20ZM16 8.5C16.8284 8.5 17.5 9.17157 17.5 10C17.5 10.8284 16.8284 11.5 16 11.5H13C12.1716 11.5 11.5 10.8284 11.5 10C11.5 9.17157 12.1716 8.5 13 8.5H16ZM10.1533 5.50781C10.9097 5.58461 11.5 6.22334 11.5 7C11.5 7.77666 10.9097 8.41539 10.1533 8.49219L10 8.5H9C8.17157 8.5 7.5 7.82843 7.5 7C7.5 6.17157 8.17157 5.5 9 5.5H10L10.1533 5.50781Z" fill="url(#vea0m1ecwx-1752500502779-6353005_code-editor_existing_0_gs8ov81vs)" data-glass="origin" mask="url(#vea0m1ecwx-1752500502779-6353005_code-editor_mask_qbqf3x7kx)"></path><path d="M9.42383 3.39355C8.55717 3.61022 8.12343 3.71934 7.80078 3.96094C7.51632 4.17406 7.29393 4.45941 7.15625 4.78711C7.00022 5.15863 7 5.60513 7 6.49805V17.502C7 18.3949 7.00022 18.8414 7.15625 19.2129C7.29393 19.5406 7.51632 19.8259 7.80078 20.0391C8.12343 20.2807 8.55716 20.3898 9.42383 20.6064L11 21H7.40039C5.16018 21 4.03924 21.0004 3.18359 20.5645C2.43109 20.181 1.81902 19.5689 1.43555 18.8164C0.999573 17.9608 1 16.8398 1 14.5996V9.40039C1 7.16018 0.999573 6.03924 1.43555 5.18359C1.81902 4.43109 2.43109 3.81902 3.18359 3.43555C4.03924 2.99957 5.16018 3 7.40039 3H11L9.42383 3.39355ZM15 15.5C15.8284 15.5 16.5 16.1716 16.5 17C16.5 17.8284 15.8284 18.5 15 18.5H13C12.1716 18.5 11.5 17.8284 11.5 17C11.5 16.1716 12.1716 15.5 13 15.5H15ZM20 12C20.8284 12 21.5 12.6716 21.5 13.5C21.5 14.3284 20.8284 15 20 15H15C14.1716 15 13.5 14.3284 13.5 13.5C13.5 12.6716 14.1716 12 15 12H20ZM16 8.5C16.8284 8.5 17.5 9.17157 17.5 10C17.5 10.8284 16.8284 11.5 16 11.5H13C12.1716 11.5 11.5 10.8284 11.5 10C11.5 9.17157 12.1716 8.5 13 8.5H16ZM10.1533 5.50781C10.9097 5.58461 11.5 6.22334 11.5 7C11.5 7.77666 10.9097 8.41539 10.1533 8.49219L10 8.5H9C8.17157 8.5 7.5 7.82843 7.5 7C7.5 6.17157 8.17157 5.5 9 5.5H10L10.1533 5.50781Z" fill="url(#vea0m1ecwx-1752500502779-6353005_code-editor_existing_0_gs8ov81vs)" data-glass="clone" filter="url(#vea0m1ecwx-1752500502779-6353005_code-editor_filter_24ly62tit)" clip-path="url(#vea0m1ecwx-1752500502779-6353005_code-editor_clipPath_bhp8xtrhs)"></path><path d="M16.5996 3C18.8398 3 19.9608 2.99957 20.8164 3.43555C21.5689 3.81902 22.181 4.43109 22.5645 5.18359C23.0004 6.03924 23 7.16018 23 9.40039V14.5996C23 16.8398 23.0004 17.9608 22.5645 18.8164C22.181 19.5689 21.5689 20.181 20.8164 20.5645C19.9608 21.0004 18.8398 21 16.5996 21H11.4004C9.16018 21 8.03924 21.0004 7.18359 20.5645C6.43109 20.181 5.81902 19.5689 5.43555 18.8164C4.99957 17.9608 5 16.8398 5 14.5996V9.40039C5 7.16018 4.99957 6.03924 5.43555 5.18359C5.81902 4.43109 6.43109 3.81902 7.18359 3.43555C8.03924 2.99957 9.16018 3 11.4004 3H16.5996ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H13ZM15 12.5C14.4477 12.5 14 12.9477 14 13.5C14 14.0523 14.4477 14.5 15 14.5H20C20.5523 14.5 21 14.0523 21 13.5C21 12.9477 20.5523 12.5 20 12.5H15ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H13ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H10C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6H9Z" fill="url(#vea0m1ecwx-1752500502779-6353005_code-editor_existing_1_nb13hb1tf)" data-glass="blur"></path><path d="M16.5996 3C18.8398 3 19.9608 2.99957 20.8164 3.43555C21.5689 3.81902 22.181 4.43109 22.5645 5.18359C23.0004 6.03924 23 7.16018 23 9.40039V14.5996C23 16.8398 23.0004 17.9608 22.5645 18.8164C22.181 19.5689 21.5689 20.181 20.8164 20.5645C19.9608 21.0004 18.8398 21 16.5996 21H11.4004C9.16018 21 8.03924 21.0004 7.18359 20.5645C6.43109 20.181 5.81902 19.5689 5.43555 18.8164C4.99957 17.9608 5 16.8398 5 14.5996V9.40039C5 7.16018 4.99957 6.03924 5.43555 5.18359C5.81902 4.43109 6.43109 3.81902 7.18359 3.43555C8.03924 2.99957 9.16018 3 11.4004 3H16.5996ZM11.4004 3.75C10.268 3.75 9.4636 3.75045 8.83398 3.80176C8.2133 3.85235 7.8287 3.94856 7.52441 4.10352C6.913 4.41508 6.41508 4.913 6.10352 5.52441C5.94856 5.8287 5.85235 6.2133 5.80176 6.83398C5.75045 7.4636 5.75 8.268 5.75 9.40039V14.5996C5.75 15.732 5.75045 16.5364 5.80176 17.166C5.85235 17.7867 5.94856 18.1713 6.10352 18.4756C6.41508 19.087 6.913 19.5849 7.52441 19.8965C7.8287 20.0514 8.2133 20.1476 8.83398 20.1982C9.4636 20.2495 10.268 20.25 11.4004 20.25H16.5996C17.732 20.25 18.5364 20.2495 19.166 20.1982C19.7867 20.1476 20.1713 20.0514 20.4756 19.8965C21.087 19.5849 21.5849 19.087 21.8965 18.4756C22.0514 18.1713 22.1476 17.7867 22.1982 17.166C22.2495 16.5364 22.25 15.732 22.25 14.5996V9.40039C22.25 8.268 22.2495 7.4636 22.1982 6.83398C22.1476 6.2133 22.0514 5.8287 21.8965 5.52441C21.5849 4.913 21.087 4.41508 20.4756 4.10352C20.1713 3.94856 19.7867 3.85235 19.166 3.80176C18.5364 3.75045 17.732 3.75 16.5996 3.75H11.4004Z" fill="url(#vea0m1ecwx-1752500502779-6353005_code-editor_existing_2_9p0khepk8)"></path><defs><linearGradient id="vea0m1ecwx-1752500502779-6353005_code-editor_existing_0_gs8ov81vs" x1="11.25" y1="3" x2="11.25" y2="21" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(87, 87, 87, 1)" data-glass-11="on"></stop><stop offset="1" stop-color="rgba(17, 15, 15, 1)" data-glass-12="on"></stop></linearGradient><linearGradient id="vea0m1ecwx-1752500502779-6353005_code-editor_existing_1_nb13hb1tf" x1="14" y1="3" x2="14" y2="21" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(187, 187, 199, 0.6)" data-glass-21="on"></stop><stop offset="1" stop-color="rgba(187, 187, 192, 0.6)" data-glass-22="on"></stop></linearGradient><linearGradient id="vea0m1ecwx-1752500502779-6353005_code-editor_existing_2_9p0khepk8" x1="14" y1="3" x2="14" y2="13.424" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(255, 255, 255, 1)" data-glass-light="on"></stop><stop offset="1" stop-color="rgba(255, 255, 255, 1)" stop-opacity="0" data-glass-light="on"></stop></linearGradient><filter id="vea0m1ecwx-1752500502779-6353005_code-editor_filter_24ly62tit" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="vea0m1ecwx-1752500502779-6353005_code-editor_clipPath_bhp8xtrhs"><path d="M16.5996 3C18.8398 3 19.9608 2.99957 20.8164 3.43555C21.5689 3.81902 22.181 4.43109 22.5645 5.18359C23.0004 6.03924 23 7.16018 23 9.40039V14.5996C23 16.8398 23.0004 17.9608 22.5645 18.8164C22.181 19.5689 21.5689 20.181 20.8164 20.5645C19.9608 21.0004 18.8398 21 16.5996 21H11.4004C9.16018 21 8.03924 21.0004 7.18359 20.5645C6.43109 20.181 5.81902 19.5689 5.43555 18.8164C4.99957 17.9608 5 16.8398 5 14.5996V9.40039C5 7.16018 4.99957 6.03924 5.43555 5.18359C5.81902 4.43109 6.43109 3.81902 7.18359 3.43555C8.03924 2.99957 9.16018 3 11.4004 3H16.5996ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H13ZM15 12.5C14.4477 12.5 14 12.9477 14 13.5C14 14.0523 14.4477 14.5 15 14.5H20C20.5523 14.5 21 14.0523 21 13.5C21 12.9477 20.5523 12.5 20 12.5H15ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H13ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H10C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6H9Z" fill="url(#vea0m1ecwx-1752500502779-6353005_code-editor_existing_1_nb13hb1tf)"></path></clipPath><mask id="vea0m1ecwx-1752500502779-6353005_code-editor_mask_qbqf3x7kx"><rect width="100%" height="100%" fill="#FFF"></rect><path d="M16.5996 3C18.8398 3 19.9608 2.99957 20.8164 3.43555C21.5689 3.81902 22.181 4.43109 22.5645 5.18359C23.0004 6.03924 23 7.16018 23 9.40039V14.5996C23 16.8398 23.0004 17.9608 22.5645 18.8164C22.181 19.5689 21.5689 20.181 20.8164 20.5645C19.9608 21.0004 18.8398 21 16.5996 21H11.4004C9.16018 21 8.03924 21.0004 7.18359 20.5645C6.43109 20.181 5.81902 19.5689 5.43555 18.8164C4.99957 17.9608 5 16.8398 5 14.5996V9.40039C5 7.16018 4.99957 6.03924 5.43555 5.18359C5.81902 4.43109 6.43109 3.81902 7.18359 3.43555C8.03924 2.99957 9.16018 3 11.4004 3H16.5996ZM13 16C12.4477 16 12 16.4477 12 17C12 17.5523 12.4477 18 13 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H13ZM15 12.5C14.4477 12.5 14 12.9477 14 13.5C14 14.0523 14.4477 14.5 15 14.5H20C20.5523 14.5 21 14.0523 21 13.5C21 12.9477 20.5523 12.5 20 12.5H15ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11H16C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9H13ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H10C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6H9Z" fill="#000"></path></mask></defs></g></svg>
    )
  },
  {
    title: "Customize Branding",
    icon:(
        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" className="nc-icon-wrapper"><path d="M14.2929 8.29295C14.6834 7.90243 15.3164 7.90243 15.707 8.29295C16.0975 8.68348 16.0975 9.31649 15.707 9.70702L3.70696 21.707C3.31643 22.0975 2.68342 22.0975 2.29289 21.707C1.90237 21.3165 1.90237 20.6835 2.29289 20.293L14.2929 8.29295Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_0_i1nxefgaa)" data-glass="origin" mask="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_mask_96tcne3cx)"></path><path d="M14.2929 8.29295C14.6834 7.90243 15.3164 7.90243 15.707 8.29295C16.0975 8.68348 16.0975 9.31649 15.707 9.70702L3.70696 21.707C3.31643 22.0975 2.68342 22.0975 2.29289 21.707C1.90237 21.3165 1.90237 20.6835 2.29289 20.293L14.2929 8.29295Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_0_i1nxefgaa)" data-glass="clone" filter="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_filter_xqtsyibol)" clip-path="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_clipPath_vakbegpsh)"></path><path d="M19.1786 3.31611C20.1577 2.98709 21.0907 3.92011 20.7617 4.89918L19.5725 8.43775L21.8104 11.4304C22.4324 12.2622 21.8276 13.4457 20.7891 13.4288L17.073 13.3687L14.9321 16.4039C14.3355 17.2497 13.0283 17.0455 12.7181 16.0581L11.595 12.4828L8.01972 11.3597C7.03228 11.0495 6.82806 9.74224 7.67385 9.14566L10.7091 7.00474L10.6489 3.28866C10.6321 2.25022 11.8156 1.6454 12.6473 2.26737L15.64 4.50527L19.1786 3.31611Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_1_drkpt23i0)" data-glass="blur"></path><path d="M10.6489 3.28852C10.6322 2.25037 11.8153 1.64567 12.6469 2.26704L15.6401 4.50532L19.1782 3.31586C20.1571 2.98689 21.0908 3.91996 20.7622 4.89887L19.5727 8.43794L21.81 11.4301C22.4319 12.2618 21.8277 13.4457 20.7895 13.4291L20.8012 12.6791C21.2166 12.6859 21.4582 12.212 21.2094 11.8793L18.9721 8.88715C18.8246 8.68984 18.7833 8.43222 18.8618 8.19868L20.0512 4.66059C20.1829 4.26896 19.8091 3.89519 19.4175 4.0268L15.8794 5.21626C15.6458 5.29474 15.3882 5.25345 15.1909 5.1059L12.1987 2.86762C11.866 2.61883 11.3922 2.86143 11.3989 3.2768L11.4594 6.99262C11.4635 7.24066 11.3438 7.47463 11.1411 7.61762L8.10593 9.75825C7.76766 9.99689 7.84964 10.5199 8.2446 10.644L11.8198 11.767C12.0538 11.8405 12.2375 12.0243 12.311 12.2582L13.4341 15.8334C13.5582 16.228 14.0801 16.3097 14.3188 15.9721L16.4604 12.936L16.518 12.8647C16.662 12.7061 16.8683 12.6151 17.0854 12.6186L20.8012 12.6791L20.7895 13.4291L17.0727 13.3686L14.9321 16.4038C14.3728 17.1967 13.1889 17.0669 12.7876 16.2338L12.7182 16.0581L11.5952 12.4829L8.01999 11.3598C7.09412 11.069 6.85656 9.90134 7.5278 9.26508L7.67429 9.14594L10.7094 7.00434L10.6489 3.28852Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_2_jn1rsooh1)"></path><path d="M5.07314 4.88824L4.44324 3.30101C4.28398 2.8997 3.71603 2.89965 3.55669 3.30094L2.92644 4.88824C2.91951 4.90563 2.90577 4.91938 2.88838 4.9263L1.30091 5.55671C0.899694 5.71604 0.899695 6.28396 1.30092 6.44329L2.88838 7.0737C2.90577 7.08063 2.91951 7.09437 2.92644 7.11176L3.55668 8.69906C3.71602 9.10035 4.28397 9.1003 4.44324 8.69899L5.07314 7.11176C5.08008 7.0943 5.094 7.08061 5.11147 7.0737L6.69907 6.4433C7.10031 6.28398 7.10031 5.71602 6.69907 5.5567L5.11147 4.9263C5.094 4.91939 5.08008 4.9057 5.07314 4.88824Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_3_j4jx5kmfo)"></path><path d="M19.0731 18.8882L18.4432 17.301C18.284 16.8997 17.716 16.8996 17.5567 17.3009L16.9264 18.8882C16.9195 18.9056 16.9058 18.9194 16.8884 18.9263L15.3009 19.5567C14.8997 19.716 14.8997 20.284 15.3009 20.4433L16.8884 21.0737C16.9058 21.0806 16.9195 21.0944 16.9264 21.1118L17.5567 22.6991C17.716 23.1003 18.284 23.1003 18.4432 22.699L19.0731 21.1118C19.0801 21.0943 19.094 21.0806 19.1115 21.0737L20.6991 20.4433C21.1003 20.284 21.1003 19.716 20.6991 19.5567L19.1115 18.9263C19.094 18.9194 19.0801 18.9057 19.0731 18.8882Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_4_f1vhr76mq)"></path><defs><linearGradient id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_0_i1nxefgaa" x1="9" y1="8" x2="9" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(87, 87, 87, 1)" data-glass-11="on"></stop><stop offset="1" stop-color="rgba(17, 15, 15, 1)" data-glass-12="on"></stop></linearGradient><linearGradient id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_1_drkpt23i0" x1="21.563" y1="2.515" x2="9.542" y2="14.536" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(187, 187, 199, 0.6)" data-glass-21="on"></stop><stop offset="1" stop-color="rgba(187, 187, 192, 0.6)" data-glass-22="on"></stop></linearGradient><linearGradient id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_2_jn1rsooh1" x1="14.603" y1="2.016" x2="14.603" y2="10.655" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(255, 255, 255, 1)" data-glass-light="on"></stop><stop offset="1" stop-color="rgba(255, 255, 255, 1)" stop-opacity="0" data-glass-light="on"></stop></linearGradient><linearGradient id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_3_j4jx5kmfo" x1="4" y1="3" x2="4" y2="9" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(87, 87, 87, 1)" data-glass-11="on"></stop><stop offset="1" stop-color="rgba(17, 15, 15, 1)" data-glass-12="on"></stop></linearGradient><linearGradient id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_4_f1vhr76mq" x1="18" y1="17" x2="18" y2="23" gradientUnits="userSpaceOnUse"><stop stop-color="rgba(87, 87, 87, 1)" data-glass-11="on"></stop><stop offset="1" stop-color="rgba(17, 15, 15, 1)" data-glass-12="on"></stop></linearGradient><filter id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_filter_xqtsyibol" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_clipPath_vakbegpsh"><path d="M19.1786 3.31611C20.1577 2.98709 21.0907 3.92011 20.7617 4.89918L19.5725 8.43775L21.8104 11.4304C22.4324 12.2622 21.8276 13.4457 20.7891 13.4288L17.073 13.3687L14.9321 16.4039C14.3355 17.2497 13.0283 17.0455 12.7181 16.0581L11.595 12.4828L8.01972 11.3597C7.03228 11.0495 6.82806 9.74224 7.67385 9.14566L10.7091 7.00474L10.6489 3.28866C10.6321 2.25022 11.8156 1.6454 12.6473 2.26737L15.64 4.50527L19.1786 3.31611Z" fill="url(#2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_existing_1_drkpt23i0)"></path></clipPath><mask id="2ycm4fj87db-1752500502795-5395688_magic-wand-sparkle_mask_96tcne3cx"><rect width="100%" height="100%" fill="#FFF"></rect><path d="M19.1786 3.31611C20.1577 2.98709 21.0907 3.92011 20.7617 4.89918L19.5725 8.43775L21.8104 11.4304C22.4324 12.2622 21.8276 13.4457 20.7891 13.4288L17.073 13.3687L14.9321 16.4039C14.3355 17.2497 13.0283 17.0455 12.7181 16.0581L11.595 12.4828L8.01972 11.3597C7.03228 11.0495 6.82806 9.74224 7.67385 9.14566L10.7091 7.00474L10.6489 3.28866C10.6321 2.25022 11.8156 1.6454 12.6473 2.26737L15.64 4.50527L19.1786 3.31611Z" fill="#000"></path></mask></defs></g></svg>
    )
  },
]

type StorageState = {
  desktop: string | null
  mobile: string | null
}

export function IntroDisclosureDemo() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [openMobile, setOpenMobile] = useState(true)
  const [debugOpen, setDebugOpen] = useState(false)
  const [storageState, setStorageState] = useState<StorageState>({
    desktop: null,
    mobile: null,
  })

  const updateStorageState = () => {
    setStorageState({
      desktop: localStorage.getItem("feature_intro-demo"),
      mobile: localStorage.getItem("feature_intro-demo-mobile"),
    })
  }

  // Update storage state whenever localStorage changes
  useEffect(() => {
    updateStorageState()
    window.addEventListener("storage", updateStorageState)
    return () => window.removeEventListener("storage", updateStorageState)
  }, [])

  // Update storage state after reset
  const handleReset = () => {
    // localStorage.removeItem("feature_intro-demo")
    setOpen(true)
    if (storageState.desktop === "false") {
      toast.info("Clear the local storage to trigger the feature again")
      setDebugOpen(true)
    }
    if (storageState.desktop === null) {
      updateStorageState()
    }
  }

  const handleResetMobile = () => {
    // localStorage.removeItem("feature_intro-demo-mobile")
    setOpenMobile(true)
    updateStorageState()
  }

  const handleClearDesktop = () => {
    localStorage.removeItem("feature_intro-demo")
    updateStorageState()
    router.refresh()
    toast.success("Desktop storage cleared")
  }

  const handleClearMobile = () => {
    localStorage.removeItem("feature_intro-demo-mobile")
    updateStorageState()
    router.refresh()
    toast.success("Mobile storage cleared")
  }

  const handleDebugOpenChange = (open: boolean) => {
    if (open) {
      updateStorageState()
    }
    setDebugOpen(open)
  }

  return (
    <div className="w-full space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">
            IntroDisclosure Demo
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience our feature introduction component in both desktop and
            mobile variants. Click the reset buttons to restart the demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-0">
          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors",
                !open && "border-muted bg-muted/50",
                open && "border-primary"
              )}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex   flex-col">
                  <p className="text-sm text-muted-foreground text-left">
                    (Disclosure)
                  </p>
                  <h3 className="text-xl font-semibold">Desktop View</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <RotateCcwIcon className="mr-2 h-4 w-4" />
                  Start Demo
                </button>
              </div>
              <IntroDisclosure
                open={open}
                setOpen={setOpen}
                steps={steps}
                featureId="intro-demo"
                showProgressBar={false}
                onComplete={() => toast.success("Tour completed")}
                onSkip={() => toast.info("Tour skipped")}
              />
              <div className="text-sm text-muted-foreground">
                Status: {open ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors",
                !openMobile && "border-muted bg-muted/50",
                openMobile && "border-primary"
              )}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex  flex-col">
                  <p className="text-sm text-muted-foreground">
                    (Drawer + Swipe)
                  </p>
                  <h3 className="text-xl font-semibold">Mobile View</h3>
                </div>
                <button
                  onClick={handleResetMobile}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <RotateCcwIcon className="mr-2 h-4 w-4" />
                  Start Demo
                </button>
              </div>
              <IntroDisclosure
                open={openMobile}
                setOpen={setOpenMobile}
                steps={steps}
                featureId="intro-demo-mobile"
                onComplete={() => toast.success("Mobile tour completed")}
                onSkip={() => toast.info("Mobile tour skipped")}
                forceVariant="mobile"
              />
              <div className="text-sm text-muted-foreground">
                Status: {openMobile ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <Collapsible
            open={debugOpen}
            onOpenChange={handleDebugOpenChange}
            className="w-full"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-2  text-sm hover:bg-muted/50">
              <div className="flex flex-col items-start text-left">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <DatabaseIcon className="size-4" />{" "}
                  <span className="text-muted-foreground">
                    Browser Local Storage State
                  </span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl">
                  These values represent the "Don't show again" checkbox state.
                  <br />- When set to{" "}
                  <code className="bg-background px-1">true</code>, the intro
                  will be hidden. <br /> - When{" "}
                  <code className="bg-background px-1">null</code>, the intro
                  will be shown.
                </p>
              </div>
              <ChevronDownIcon
                className={cn(
                  "size-8 transition-transform duration-200",
                  debugOpen && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md bg-muted p-4 text-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-muted-foreground">
                        Desktop State:{" "}
                      </span>
                      <code className="rounded bg-background px-2 py-1">
                        {storageState.desktop === null
                          ? "null"
                          : storageState.desktop}
                      </code>
                    </div>
                    <Button size="sm" onClick={handleClearDesktop}>
                      Reset Local Storage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-muted-foreground">
                        Mobile State:{" "}
                      </span>
                      <code className="rounded bg-background px-2 py-1">
                        {storageState.mobile === null
                          ? "null"
                          : storageState.mobile}
                      </code>
                    </div>
                    <Button size="sm" onClick={handleClearMobile}>
                      Reset Local Storage
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}
