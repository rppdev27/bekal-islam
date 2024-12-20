import React from 'react';

interface FileUploadProps {
  accept: string;
  onChange: (file: File) => void;
  icon: React.ReactNode;
  label: string;
}

export function FileUpload({ accept, onChange, icon, label }: FileUploadProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      {icon}
      <span className="text-sm font-medium">{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}