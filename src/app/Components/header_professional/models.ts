export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
  isIcon?: boolean; // Optional property to indicate if the link is an icon
}

export interface HeaderProfessionalDropdownAction {
  text: string;
  action: () => void; // Function to execute when the action is triggered
  icon?: string; // Optional icon for the action
  iconPosition?: 'left' | 'right'; // Optional position of the icon
  imageUrl?: string;
}

export interface HeaderProfessionalDropdownActionsConfiguration {
  selectedIndex: number;
  hideTextInButton?: boolean; // Optional property to control text visibility in dropdown
  actions: HeaderProfessionalDropdownAction[];
}

export interface HeaderProfessionalConfiguration {
  links: HeaderLinkConfiguration[];
  dynamicShow?: boolean; // If true, header visibility is controlled by scroll events
  showLogo?: boolean;
  showTitle?: boolean;
  title?: string;
  logoPath?: string;
  textColor?: string;
  backgroundGradientStart?: string;
  backgroundGradientEnd?: string;
  dropdownsConfigurations?: HeaderProfessionalDropdownActionsConfiguration[]; // Optional dropdown actions
}
