import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCustomQueryParams = (paramName: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const values = params.getAll(paramName);
    setSelectedValues(values.length ? values : []);
  }, [searchParams, paramName]);

  const handleCheckboxChange = (item: string | number) => {
    const value = String(item);
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(paramName);

    const isSelected = currentValues.includes(value);
    const updatedValues = isSelected
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    params.delete(paramName);
    updatedValues.forEach((val) => params.append(paramName, val));

    setSelectedValues(updatedValues);

    router.replace(`${pathname}?${params.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isChecked = (value: string) => selectedValues.includes(value);

  return { selectedValues, handleCheckboxChange, isChecked };
};
