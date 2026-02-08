import LottieWrapper from "@/components/common/LottieWrapper";
import loadingAnimation from "@/public/animations/loading.json";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Fetching intelligent insights..."
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <LottieWrapper
        animationData={loadingAnimation}
        className="w-36 h-36"
      />
      <p className="text-text-200 text-sm">{message}</p>
    </div>
  );
}
