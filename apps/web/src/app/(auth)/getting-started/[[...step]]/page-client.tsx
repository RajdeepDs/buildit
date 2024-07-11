"use client";

import CreateTeamForm from "@/components/getting-started/create-team-form";
import UserProfileForm from "@/components/getting-started/user-profile-form";
import WorkspaceSetupForm from "@/components/getting-started/workspace-setup-form";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

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
      title: "Welcome to BuildIt!",
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
    <div className="h-fit max-w-max space-y-6">
      <p className="text-soft text-xs">
        Step {currentStepIndex + 1} of {steps.length}
      </p>
      <header>
        <h1 className="font-cal text-2xl text-strong">
          {headers[currentStepIndex]?.title || "Undefined title"}
        </h1>
        <p className="text-sm text-soft">
          {headers[currentStepIndex]?.subtitle}
        </p>
      </header>
      <div>
        {currentStep === "workspace-setup" && (
          <WorkspaceSetupForm nextStep={() => goToIndex(1)} />
        )}
        {currentStep === "create-team" && (
          <CreateTeamForm nextStep={() => goToIndex(2)} />
        )}
        {currentStep === "user-profile" && <UserProfileForm />}
      </div>
    </div>
  );
}
