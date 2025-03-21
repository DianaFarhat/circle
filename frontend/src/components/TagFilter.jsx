import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

const availableTags = [
  'Gallery', 'App', 'Album', 'Storage', 'Icon', 'Lens', 'Pink', 'Svg', 'Aesthetic', 'Screensaver', 'Photobook', 'Google Play', 'Music', 'Recipes', 'Travel', 'Nature', 'Work', 'Family', 'Friends', 'Memories'
];

const TagFilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Searchable Dropdown */}
      <div className="input-group mb-3">
        <span className="input-group-text bg-light">
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for tags..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Selected Tags */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {selectedTags.map((tag) => (
          <span key={tag} className="badge bg-warning text-dark px-3 py-2 rounded-pill d-flex align-items-center">
            {tag}
            <AiOutlineClose
              className="ms-2 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}
      </div>

      {/* Available Tags */}
      <div className="d-flex flex-wrap gap-2">
        {filteredTags.map((tag) => (
          <button
            key={tag}
            className="btn btn-outline-primary rounded-pill"
            onClick={() => addTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilterComponent;