"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group";

export function CopyInput({placeholder}:{placeholder:string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(placeholder);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <InputGroup className="w-full max-w-sm bg-background">
      <InputGroupInput placeholder={placeholder} readOnly />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Copy" onClick={handleCopy} size="icon-xs">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

