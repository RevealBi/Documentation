const baseSettings = {
    apiKey: "d3c8d5f69fbc363dfb78a55ff2b3a6b2e09a92a012d41396",
    organizationDisplayName: "Reveal",
    primaryBrandColor: "#ec417a",
};
const aiChatSettings = {
    placeholder: "Type your question...",
    chatSubjectName: "Reveal",
    aiAssistantName: "Reveal AI",
    aiAssistantAvatar: "https://help.revealbi.io/img/logo.png",
    exampleQuestions: [
        "What data sources are supported?",
        "How do I create a bar chart?",
        "How to add the Microsoft SQL Server data source?",
    ],
};
const searchSettings = {
    placeholder: "Search",
};
export const searchBarSettings = {
    baseSettings: baseSettings,
    searchSettings: searchSettings,
    aiChatSettings: aiChatSettings,
    canToggleView: true,
    forceDefaultView: true,
    askAILabel: "Ask Reveal AI",
};
export const chatButtonSettings = {
    baseSettings: baseSettings,
    searchSettings: searchSettings,
    aiChatSettings: aiChatSettings,
    label: "Chat with Reveal AI",
    askAILabel: "Ask Reveal AI",
};
