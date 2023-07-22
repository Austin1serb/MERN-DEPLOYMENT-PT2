import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Update = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isTitleUnique, setIsTitleUnique] = useState(true);
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/note/' + id)
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch((err) => console.error(err));
  }, []);

  const checkTitleUniqueness = () => {
    // Make a request to check if the new title is unique
    axios
      .get('http://localhost:8000/api/note/check-title/' + title)
      .then((res) => {
        setIsTitleUnique(res.data.isUnique);
      })
      .catch((err) => console.error(err));
  };

  const updateNote = (e) => {
    e.preventDefault();

    // Validation checks for title and body
    if (title.length < 2) {
      setTitleError('Title must be at least 2 characters long.');
      return;
    } else if (title.length > 255) {
      setTitleError('Title must be less than 256 characters long.');
      return;
    } else {
      setTitleError('');
    }

    if (body.length > 255) {
      setBodyError('Body must be less than 256 characters long.');
      return;
    } else {
      setBodyError('');
    }

    if (title !== props.title && !isTitleUnique) {
      // The new title is not unique, show an error message and prevent the update
      setTitleError('Title must be unique.');
      return;
    }

    // Submit the form if there are no validation errors
    axios
      .patch('http://localhost:8000/api/note/' + id + '/edit', {
        title,
        body,
      })
      .then((res) => {
        console.log(res);
        navigate('/'); // Navigate back to the '/' page after updating the note
      })
      .catch((err) => console.error(err));
  };

  const deleteNote = () => {
    axios
      .delete('http://localhost:8000/api/note/' + id)
      .then((res) => {
        console.log(res);
        navigate('/'); // Navigate back to the '/' page after deleting the note
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Update a Note</h1>
      <Link to="/">Back to Home</Link>
      <form onSubmit={updateNote}>
        <p>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsTitleUnique(true); // Reset the title uniqueness check on input change
            }}
            onBlur={checkTitleUniqueness} // Check title uniqueness when the input loses focus
          />
          {titleError && <span>{titleError}</span>}
        </p>
        <p>
          <label>Body</label>
          <br />
          <input
            type="text"
            name="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          {bodyError && <span>{bodyError}</span>}
        </p>
        <input type="submit" value="Update" />
      </form>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
};

export default Update;
