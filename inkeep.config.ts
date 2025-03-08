import { InkeepAIChatSettings, InkeepBaseSettings, InkeepChatButtonProps, InkeepSearchBarProps, InkeepSearchSettings } from "@inkeep/cxkit-docusaurus";

  const baseSettings: InkeepBaseSettings = {
    apiKey: "d3c8d5f69fbc363dfb78a55ff2b3a6b2e09a92a012d41396",
    organizationDisplayName: "Reveal",
    primaryBrandColor: "#ec417a",
  }

  const aiChatSettings: InkeepAIChatSettings = {
    placeholder: "Type your question...",
    chatSubjectName: "Reveal",
    aiAssistantName: "Reveal AI",
    aiAssistantAvatar: "https://help.revealbi.io/img/logo.png",
    exampleQuestions: [
      "How to choose a visualization type?",
      "What are dot maps?",
      "How to use dashboard filters?",
    ],
  }

  const searchSettings: InkeepSearchSettings = {
    placeholder: "Search",
  }

  export const searchBarSettings: InkeepSearchBarProps = {
    baseSettings: baseSettings,
    searchSettings: searchSettings,
    aiChatSettings: aiChatSettings,
    canToggleView: true,
    forceDefaultView: true,
    askAILabel: "Ask Reveal AI",
  };

  export const chatButtonSettings: InkeepChatButtonProps = {
    baseSettings: baseSettings,
    searchSettings: searchSettings,
    aiChatSettings: aiChatSettings,    
    label: "Chat with Reveal AI",
    askAILabel: "Ask Reveal AI",
  };