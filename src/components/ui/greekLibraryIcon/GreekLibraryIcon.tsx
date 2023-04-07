type GreekLibraryIconProps = {
  className?: string;
  width?: number;
};

export const GreekLibraryIcon = ({ className, width }: GreekLibraryIconProps) => {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width={width}>
      <path d="M3.425 13.953h24.173c.583-.255.557-.802.011-1.165-.547-.365-12.119-8.718-12.119-8.718S4.008 12.423 3.425 12.788c-.582.363-.619.91 0 1.165zM15.49 8.195c.965 0 1.748.782 1.748 1.747s-.783 1.748-1.748 1.748-1.747-.783-1.747-1.748.782-1.747 1.747-1.747zM4.027 26.932h22.968v-.977H4.027v.977zM9 24.936v-8.903h.978V14.93H4.985v1.003h.978v9.002H9zm8.03 0V15.97h.978v-.978h-4.992v.94h.977v9.002h3.037zm-14 3.994h24.963v-.914H3.03v.914zm21.968-3.994V15.97h.978v-.978h-4.993v.94h.979v9.002h3.036z" />
    </svg>
  );
};

export default GreekLibraryIcon;
