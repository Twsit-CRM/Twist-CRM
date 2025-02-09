import Icon from '@erxes/ui/src/components/Icon';
import React from 'react';
import {
  BoxContent,
  HelperButtons,
  SidebarBox,
  SidebarFooter,
  SidebarHeader,
  SidebarMainContent,
  SidebarTitle,
  SidebarToggle,
  SideContent
} from '../styles';

function Title({
  children,
  onClick,
  noBackground,
  noSpacing
}: {
  children: React.ReactNode;
  onClick?: () => void;
  noBackground?: boolean;
  noSpacing?: boolean;
}) {
  return (
    <SidebarTitle
      onClick={onClick}
      noBackground={noBackground}
      noSpacing={noSpacing}
    >
      {children}
    </SidebarTitle>
  );
}

function QuickButtons({
  children,
  isSidebarOpen
}: {
  children: React.ReactNode;
  isSidebarOpen?: boolean;
}) {
  return (
    <HelperButtons isSidebarOpen={isSidebarOpen}>{children}</HelperButtons>
  );
}

type Props = {
  children: React.ReactNode;
  collapsible?: boolean;
  className?: string;
  noShadow?: boolean;
  noBackground?: boolean;
  full?: boolean;
  maxHeight: number;
  noMargin?: boolean;
};

type State = {
  collapse: boolean;
};

class Section extends React.Component<Props, State> {
  static defaultProps = {
    maxHeight: 255
  };

  static Title = Title;
  static QuickButtons = QuickButtons;

  constructor(props: Props) {
    super(props);

    this.state = { collapse: false };
  }

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  renderCollapseButton = () => {
    const icon = this.state.collapse ? 'angle-double-up' : 'angle-double-down';

    return (
      <SidebarToggle tabIndex={0} onClick={this.toggleCollapse}>
        <Icon icon={icon} />
      </SidebarToggle>
    );
  };

  render() {
    const {
      children,
      collapsible,
      noShadow,
      noBackground,
      full,
      maxHeight,
      noMargin
    } = this.props;

    const style = collapsible
      ? {
          maxHeight: this.state.collapse ? undefined : maxHeight
        }
      : {};

    return (
      <SidebarBox
        collapsible={collapsible}
        style={style}
        noShadow={noShadow}
        noBackground={noBackground}
        full={full}
        noMargin={noMargin}
      >
        <BoxContent>{children}</BoxContent>
        {collapsible ? this.renderCollapseButton() : null}
      </SidebarBox>
    );
  }
}

type HeaderProps = {
  children: React.ReactNode;
  uppercase?: boolean;
  bold?: boolean;
  spaceBottom?: boolean;
  noBackground?: boolean;
  noSpacing?: boolean;
};

function Header({
  children,
  spaceBottom,
  uppercase,
  bold,
  noBackground,
  noSpacing
}: HeaderProps) {
  return (
    <SidebarHeader
      noBackground={noBackground}
      noSpacing={noSpacing}
      spaceBottom={spaceBottom}
      uppercase={uppercase}
      bold={bold}
    >
      {children}
    </SidebarHeader>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return <SidebarFooter>{children}</SidebarFooter>;
}

type SidebarProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
  full?: boolean;
  half?: boolean;
  hasBorder?: boolean;
  noMargin?: boolean;
};

export default class Sidebar extends React.Component<SidebarProps> {
  static Header = Header;
  static Section = Section;
  static Footer = Footer;

  render() {
    const {
      children,
      wide,
      header,
      footer,
      half,
      full,
      hasBorder,
      noMargin
    } = this.props;

    return (
      <SideContent
        half={half}
        wide={wide}
        full={full}
        hasBorder={hasBorder}
        noMargin={noMargin}
      >
        {header}
        <SidebarMainContent>{children}</SidebarMainContent>
        {footer}
      </SideContent>
    );
  }
}
