import { useDebounce } from "@/app/hooks";
import { useEffect, useState } from "react";

type SearchFunction = (search: string) => void;
export default function useSearch(initialValue: string, searchFn: SearchFunction) {
  const [search, setSearch] = useState(initialValue);
  
  useEffect(() => {
    setSearch(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      searchFn(search);
    }
  };

  const inputProps = {
    value: search,
    onChange: handleChange,
    onKeyDown: onKeyDown
  };

  const debouncedSearch = useDebounce(search, 500);

  return { debouncedSearch, inputProps };
}