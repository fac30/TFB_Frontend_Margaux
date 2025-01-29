// Clothing and Outfit Types
export interface ClothingItem {
  item_id: number;
  item_desc: string;
  photo_link: string;
  category_id: number;
}

export interface SavedOutfit {
  outfit_id: number;
  outfit_name: string;
  outfit_items: {
    clothing_items: ClothingItem;
  }[];
}

// Component Props Types
export interface OutfitGalleryProps {
  isVisible: boolean;
  onClose: () => void;
  outfit: SavedOutfit | null;
}

export interface MainContentProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export interface EcoAdviceComponentProps {
  onRegisterBack: (backFn: () => boolean) => void;
}

// Category Types
export interface Category {
  id: number;
  name: string;
}

// CategoryMenu Types
export interface ClothingMenuItem {
  name: string;
  image: string;
  category: string;
  subcategory: string;
}

export interface CategoryMenuProps {
  categories: {
    name: string;
    subcategories: {
      name: string;
      items: {
        name: string;
        image: string;
      }[];
    }[];
  }[];
  onSelectItem: (item: ClothingMenuItem) => void;
}

// Component Types for EcoAdvice
export type ComponentType =
  | "talks"
  | "chat"
  | "clothes"
  | "upscaling"
  | "thrifting";

export interface ButtonConfig {
  id: ComponentType;
  label: string;
}

// Add this with the other Component Props Types
export interface ButtonComponentProps {
  onPress: () => void;
  label: string | JSX.Element;
  style?: any;
  isLoading?: boolean;
}
