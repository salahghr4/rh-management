export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-l text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
