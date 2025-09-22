type InputProps = {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
};

export const Input = ({ label, value, onChange, type }: InputProps) => {
  return (
    <div className='flex flex-col mb-4 w-full'>
      {label && <label className='mb-2 text-md text-gray-900'>{label}</label>}
      <input
        type={type}
        className='border rounded-md py-2 px-3 text-grey-800'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
