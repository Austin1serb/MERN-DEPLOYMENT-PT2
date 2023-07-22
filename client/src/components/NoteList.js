import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NoteList = (props) => {
  // Initialize the sorting order state with 'oldest' as the default
  const [sortingOrder, setSortingOrder] = useState('oldest');

  // Sort the notes based on the selected sorting order
  const sortedNotes = [...props.notes];
  if (sortingOrder === 'oldest') {
    sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortingOrder === 'newest') {
    sortedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div>
      <div>
        {/* Buttons to toggle sorting order */}
        <button onClick={() => setSortingOrder('oldest')}>Sort by Oldest</button>
        <button onClick={() => setSortingOrder('newest')}>Sort by Newest</button>
      </div>
      {sortedNotes.map((note, i) => {
        return (
          <p key={i}>
            <>
              {note.title}, {note.body}
            </>
            {' | '}
            <Link to={'/api/note/' + note._id + '/edit'}>Edit</Link>
          </p>
        );
      })}
    </div>
  );
};

export default NoteList;
