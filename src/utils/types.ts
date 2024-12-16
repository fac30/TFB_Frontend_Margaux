export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }

export interface Item {
  name: string;
  image: string;
}

export interface SubCategory {
  name: string;
  items: Item[];
}

export interface Category {
  name: string;
  subcategories: SubCategory[];
}

export interface ClothingItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}


export interface ButtonConfig {
  id: ComponentType;
  label: string;
}

export interface MainContentProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export interface ChatHistoryProps {
  messages: { message: string; sender: string }[];
}

export interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export interface EcoAdviceComponentProps {
  onRegisterBack: (backFn: () => boolean) => void;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}


export interface ButtonComponentProps {
  onPress: () => void;
  label: string | JSX.Element;
  style?: any;
}

export type ComponentType = 'talks' | 'chat' | 'clothes' | 'upscaling' | 'thrifting';