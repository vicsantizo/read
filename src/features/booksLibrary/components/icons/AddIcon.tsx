type AddIconProps = {
  className?: string;
  width?: number;
};

export const AddIcon = ({ className, width }: AddIconProps) => {
  return (
    <svg
      className={className}
      width={width || 24}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 100 100"
    >
      <path
        d="M80.5 0c-7.145 0-13.252 4.246-15.977 10.357H28.135a3.5 3.5 0 0 0-2.668 1.235L.832 40.607a3.5 3.5 0 0 0 2.67 5.766l93-.064a3.5 3.5 0 0 0 2.666-5.766l-7.87-9.272A17.428 17.428 0 0 0 98 17.5C98 7.805 90.195 0 80.5 0zM77 5h7v9h9v7h-9v9h-7v-9h-9v-7h9V5zm12.91 46.313-9.178.007 8.211 9.67-77.875.053 8.22-9.682-9.188.008L.832 62.283a3.5 3.5 0 0 0 2.67 5.766l93-.065a3.5 3.5 0 0 0 2.666-5.765L89.91 51.312zm0 21.593-9.178.008 8.211 9.67-77.875.053 8.22-9.682-9.188.008L.832 83.877a3.5 3.5 0 0 0 2.67 5.766l93-.065a3.5 3.5 0 0 0 2.666-5.766L89.91 72.906z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AddIcon;
