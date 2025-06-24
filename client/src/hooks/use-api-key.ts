import { useState, useEffect } from "react";

export interface ApiKeyState {
  hasApiKey: boolean;
  provider: string | null;
  creditsRemaining: number;
}

export function useApiKey() {
  const [apiKeyState, setApiKeyState] = useState<ApiKeyState>({
    hasApiKey: false,
    provider: null,
    creditsRemaining: 1
  });

  useEffect(() => {
    // In a real app, this would fetch from the API
    // For demo purposes, we'll use mock data
    setApiKeyState({
      hasApiKey: true,
      provider: "openai",
      creditsRemaining: 89
    });
  }, []);

  const getCostPerArticle = () => {
    return apiKeyState.hasApiKey ? 1 : 2;
  };

  const canGenerateContent = () => {
    return apiKeyState.creditsRemaining > 0 || apiKeyState.hasApiKey;
  };

  return {
    ...apiKeyState,
    getCostPerArticle,
    canGenerateContent,
    setApiKeyState
  };
}
