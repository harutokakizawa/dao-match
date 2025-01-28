import { useState } from 'react';
import { availableTags } from '../app/utils/tags';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
      />
      <div className="flex flex-wrap gap-2">
        {filteredTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition duration-150 ease-in-out ${
              selectedTags.includes(tag)
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

