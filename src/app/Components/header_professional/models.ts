export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
  isIcon?: boolean; // Optional property to indicate if the link is an icon
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
}
