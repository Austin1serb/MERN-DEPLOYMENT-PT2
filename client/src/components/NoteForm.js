import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const NoteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validation checks before submitting the form
    if (title.length < 2) {
      setTitleError('Title must be at least 2 characters long.');
      return; // Return early if there are validation errors
    } else if (title.length > 255) {
      setTitleError('Title must be less than 256 characters long.');
      return; // Return early if there are validation errors
    } else {
      setTitleError('');
    }

    if (body.length > 255) {
      setBodyError('Body must be less than 256 characters long.');
      return; // Return early if there are validation errors
    } else {
      setBodyError('');
    }

    // Check if the title is unique before submitting the form
    axios
      .get(`http://localhost:8000/api/note/check-title/${title}`)
      .then((res) => {
        if (!res.data.isUnique) {
          setTitleError('Title must be unique.');
          return; // Return early if the title is not unique
        }

        // Submit the form if there are no validation errors and the title is unique
        axios
          .post('http://localhost:8000/api/note', { title, body })
          .then((res) => {
            navigate('/');
          })
          .catch((err) => console.log('Error:', err));
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h1>Submit Your Favorite Notes</h1>
        <Link to="/">Back to Home</Link>
        <p>
          <label>Title:</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
          {titleError && <span>{titleError}</span>}
        </p>
        <p>
          <label>Body:</label>
          <input type="text" name="body" onChange={(e) => setBody(e.target.value)} />
          {bodyError && <span>{bodyError}</span>}
        </p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default NoteForm;
