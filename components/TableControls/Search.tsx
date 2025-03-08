import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type TableSearchProps = {
  value: string;
  onChange: (value: string) => void;
};
const TableSearch = ({ value, onChange }: TableSearchProps) => {
  const [showSearch, setShowSearch] = useState(!!value);

  return (
    <div className="flex items-center gap-2 border-l-4 border-r-4 border-grey p-1">
      <Button
        onClick={() => {
          setShowSearch((prev) => !prev);
        }}
        variant="ghost"
      >
        <SearchIcon className="cursor-pointer  h-4 w-4" />
      </Button>
      {showSearch && (
        <Input
          type="text"
          placeholder="Search..."
          className="w-48"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      )}
    </div>
  );
};

export default TableSearch;
