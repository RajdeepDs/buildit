"use client";

import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import CreateTeamForm from "@/components/getting-started/create-team-form";
import UserProfileForm from "@/components/getting-started/user-profile-form";
import WorkspaceSetupForm from "@/components/getting-started/workspace-setup-form";
import Steps from "@/components/ui/steps";

const INITIAL_STEP = "workspace-setup";

const steps = ["workspace-setup", "create-team", "user-profile"] as const;

const stepRouteSchema = z.object({
  step: z.array(z.enum(steps)).default([INITIAL_STEP]),
});

const stepTransform = (step: (typeof steps)[number]) => {
  const stepIndex = steps.indexOf(step);
  if (stepIndex > -1) {
    return steps[stepIndex];
  }
  return INITIAL_STEP;
};

export default function OnboardingPageClient(): JSX.Element {
  const params = useParams<{ step: string | string[] }>();

  const router = useRouter();

  const result = stepRouteSchema.safeParse({
    ...params,
    step: Array.isArray(params.step) ? params.step : [params.step],
  });

  const currentStep = result.success ? result.data.step[0] : INITIAL_STEP;

  const headers = [
    {
      title: "Welcome to BuildIt",
      subtitle: "Let's get you started with your workspace setup.",
    },
    {
      title: "Create your team",
      subtitle: "Start by creating your team for your workspace.",
    },
    {
      title: "User profile",
      subtitle: "We need some information to set up your user profile.",
    },
  ];

  const goToIndex = (index: number) => {
    const newStep = steps[index];
    router.push(`/getting-started/${stepTransform(newStep!)}`);
  };
  const currentStepIndex = steps.indexOf(currentStep!);

  return (
    <div className="bg-subtle mx-auto h-dvh py-6">
      <div className="mx-auto max-w-[600px]">
        <div className="mx-auto max-w-[550px] px-4">
          <header>
            <h1 className="font-cal text-emphasis text-2xl">
              {headers[currentStepIndex]?.title || "Undefined title"}
            </h1>
            <p className="text-subtle text-sm">
              {headers[currentStepIndex]?.subtitle}
            </p>
          </header>
          <Steps
            currentStepIndex={currentStepIndex + 1}
            maxSteps={steps.length}
          />
        </div>
        <div className="mt-10 rounded-md border bg-white p-10">
          {currentStep === "workspace-setup" && (
            <WorkspaceSetupForm nextStep={() => goToIndex(1)} />
          )}
          {currentStep === "create-team" && (
            <CreateTeamForm nextStep={() => goToIndex(2)} />
          )}
          {currentStep === "user-profile" && <UserProfileForm />}
        </div>
      </div>
    </div>
  );
}
