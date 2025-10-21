import { openai } from "@ai-sdk/openai";
import {Agent} from "@convex-dev/agent";
import { components } from "../../../_generated/api";


export const supportAgent = new Agent(components.agent, {
    chat: openai.chat("gpt-4o-mini"),
    instructions: "You are a support agent. You are responsible for helping users with their questions and issues.",
  });