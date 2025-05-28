import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  loadingText,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'font-medium rounded-[10px] transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant-specific classes
  const variantClasses = {
    primary: `
      bg-[#0077B6] text-white 
      hover:bg-[#006BA4] 
      focus:ring-[#0077B6] 
      disabled:bg-gray-400
    `,
    secondary: `
      bg-white text-[#002A40] border border-gray-300
      hover:bg-gray-50 
      focus:ring-[#0077B6] 
      disabled:bg-gray-100 disabled:text-gray-400
    `,
    text: `
      bg-transparent text-[#0077B6] 
      hover:bg-[#006BA4] hover:text-white
      focus:ring-[#0077B6] 
      disabled:text-gray-400
    `
  };
  
  // Size-specific classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : 'w-[154px]';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (loadingText || 'Loading...') : children}
    </button>
  );
};

export default Button;