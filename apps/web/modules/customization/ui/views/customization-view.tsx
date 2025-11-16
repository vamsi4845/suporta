"use client";

import { useOrganization } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { WidgetPreview } from "@/modules/customization/ui/components/widget-preview";
import { Loader2, CheckCircle2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/modules/customization/ui/components/color-picker";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";

interface WidgetCustomization {
  buttonColor: string;
  position: "bottom-right" | "bottom-left";
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
}

const DEFAULT_CUSTOMIZATION: WidgetCustomization = {
  buttonColor: "#3b82f6",
  position: "bottom-right",
  logoUrl: "",
  primaryColor: "#3b82f6",
  backgroundColor: "#ffffff",
};

const PRIMARY_COLOR_OPTIONS = [
  { name: "blue", hex: "#3b82f6" },
  { name: "indigo", hex: "#6366f1" },
  { name: "pink", hex: "#ec4899" },
  { name: "red", hex: "#ef4444" },
  { name: "orange", hex: "#f97316" },
  { name: "amber", hex: "#f59e0b" },
  { name: "emerald", hex: "#10b981" },
  { name: "black", hex: "#00000" },
] as const;

const BACKGROUND_COLOR_OPTIONS = [
  { name: "white", hex: "#ffffff" },
  { name: "black", hex: "#000000" },
  { name: "gray-300", hex: "#f3f4f6" },
] as const;

function getColorNameFromHex(hex: string, options: typeof PRIMARY_COLOR_OPTIONS | typeof BACKGROUND_COLOR_OPTIONS): string {
  const color = options.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
  return color?.name || (options === PRIMARY_COLOR_OPTIONS ? "blue" : "white");
}

export function CustomizationView() {
  const { organization } = useOrganization();
  const [customization, setCustomization] = useState<WidgetCustomization>(DEFAULT_CUSTOMIZATION);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedCustomization, setSavedCustomization] = useState<WidgetCustomization | null>(null);

  const saveCustomization = useMutation(api.public.widgetCustomizations.upsert);
  const existingCustomization = useQuery(
    api.public.widgetCustomizations.getByOrganizationId,
    organization?.id ? { organizationId: organization.id } : "skip"
  );

  useEffect(() => {
    if (existingCustomization) {
      const saved = {
        buttonColor: existingCustomization.buttonColor,
        position: existingCustomization.position,
        logoUrl: existingCustomization.logoUrl || "",
        primaryColor: existingCustomization.primaryColor,
        backgroundColor: existingCustomization.backgroundColor || "#ffffff",
      };
      setCustomization(saved);
      setSavedCustomization(saved);
      if (existingCustomization.logoUrl) {
        setLogoPreview(existingCustomization.logoUrl);
      }
    }
  }, [existingCustomization]);

  const handleColorChange = (field: keyof WidgetCustomization, value: string) => {
    setCustomization((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrimaryColorSelect = (colorName: string) => {
    const selectedColor = PRIMARY_COLOR_OPTIONS.find((c) => c.name === colorName);
    if (selectedColor) {
      setCustomization((prev) => ({
        ...prev,
        buttonColor: selectedColor.hex,
        primaryColor: selectedColor.hex,
      }));
    }
  };

  const handleBackgroundColorSelect = (colorName: string) => {
    const selectedColor = BACKGROUND_COLOR_OPTIONS.find((c) => c.name === colorName);
    if (selectedColor) {
      setCustomization((prev) => ({
        ...prev,
        backgroundColor: selectedColor.hex,
      }));
    }
  };

  const handlePositionChange = (position: "bottom-right" | "bottom-left") => {
    setCustomization((prev) => ({ ...prev, position }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setCustomization((prev) => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!organization?.id) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await saveCustomization({
        organizationId: organization.id,
        buttonColor: customization.buttonColor,
        position: customization.position,
        logoUrl: customization.logoUrl || undefined,
        primaryColor: customization.primaryColor,
        backgroundColor: customization.backgroundColor,
      });
      setSavedCustomization({ ...customization });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save customization:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const previewUrl = organization?.id
    ? `https://ai-support-bot-widget-beta.vercel.app/?organizationId=${organization.id}`
    : "";

  return (
    <div className="flex min-h-screen flex-col bg-muted">
       <header className="flex items-center gap-2 border-b bg-background px-4 py-3">
                <ToggleSidebar />
                <h1 className="text-lg font-semibold">Customization</h1>
            </header>
      <div className="mx-auto w-full md:max-w-4xl mt-10 p-2">
        <div className="mb-2 space-y-2">
          <h1 className="text-2xl md:text-4xl font-semibold">Widget Customization</h1>
          <p className="text-muted-foreground">
            Customize the appearance and behavior of your support widget
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="lg:sticky lg:top-8 lg:h-fit">
           <WidgetPreview
             organizationId={organization?.id || null}
             customization={customization}
             previewUrl={previewUrl}
           />
          </div>
          <div className="space-y-6">
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Primary</Label>
                    </div>
                    <fieldset className="space-y-2">
                      <RadioGroup
                        className="flex gap-1.5"
                        value={getColorNameFromHex(customization.primaryColor, PRIMARY_COLOR_OPTIONS)}
                        onValueChange={handlePrimaryColorSelect}
                      >
                        {PRIMARY_COLOR_OPTIONS.map((color) => {
                          const isSelected = customization.primaryColor === color.hex || savedCustomization?.primaryColor === color.hex;
                          return (
                            <RadioGroupItem
                              key={color.name}
                              checked={isSelected}
                              value={color.name}
                              id={`primary-${color.name}`}
                              aria-label={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                              className={`size-6 shadow-none !bg-[${color.hex}]`}
                              style={{
                                border: isSelected ? "2px solid #e5e7eb" : `2px solid ${color.hex}`,
                                backgroundColor: color.hex,
                                color: color.hex,
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </fieldset>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Background</Label>
                    </div>
                    <fieldset className="space-y-2">
                      <RadioGroup
                        className="flex gap-1.5"
                        value={getColorNameFromHex(customization.backgroundColor, BACKGROUND_COLOR_OPTIONS)}
                        onValueChange={handleBackgroundColorSelect}
                      >
                        {BACKGROUND_COLOR_OPTIONS.map((color) => {
                          const isSaved = savedCustomization?.backgroundColor === color.hex;
                          const isSelected = customization.backgroundColor === color.hex;
                          const borderColor = isSelected 
                            ? "#e5e7eb" 
                            : color.hex === "#ffffff" 
                              ? "#e5e7eb" 
                              : color.hex;
                          return (
                            <RadioGroupItem
                              key={color.name}
                              value={color.name}
                              checked={isSelected}
                              id={`bg-${color.name}`}
                              aria-label={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                              className={`size-6 shadow-none border-2 [&[data-state=checked]]:bg-[currentColor]`}
                              style={{
                                borderColor: borderColor,
                                backgroundColor: color.hex,
                                color: color.hex,
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </fieldset>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="space-y-4">
                    {logoPreview && (
                      <div className="flex items-center gap-4">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="h-16 w-16 rounded-md object-contain border"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview("");
                            setCustomization((prev) => ({ ...prev, logoUrl: "" }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload your logo (PNG, SVG, or JPG). Recommended size: 64x64px
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="position">Widget Position</Label>
                  </div>
                  <Select
                    value={customization.position}
                    onValueChange={(value) =>
                      handlePositionChange(value as "bottom-right" | "bottom-left")
                    }
                  >
                    <SelectTrigger id="position" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button onClick={handleSave} size="lg" disabled={isSaving || !organization?.id}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

