type ButtonProps = {
    children: React.ReactNode;
    onClick?: (object?: any) => void;
    className?: string;
};

const Button = (props: ButtonProps) => {
    const { children, className, onClick } = props;

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export default Button;
