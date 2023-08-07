import React, { useState,useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../Utility.js/Auth';
import { CheckCircleOutlined} from '@ant-design/icons';

function AddContent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [language, setLanguage] = useState('en');
  const [showSuccessPopup, setSuccessPopUp] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setSuccessPopUp(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSuccessPopup]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const contentData = {
      title,
      description,
      image,
      link,
      language,
    };
    console.log(contentData);

    axios
      .post('http://localhost:9091/content/createContent', contentData, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Reset form fields
        setTitle('');
        setDescription('');
        setImage('');
        setLink('');
        setSuccessPopUp(true);
      })
      .catch((error) => {
        setSuccessPopUp(false);
        console.error(error);
      });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        height: '100vh',
        marginLeft:'400px'
      }}
    >
      <div
        style={{
          width: '700px',
          backgroundColor: '#fff',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: '10px',
          boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Create News Content</h1>
        <div style={{ marginBottom: '20px', width: '50%' }}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="language-select-label" style={{ color: '#555', fontWeight: 'bold' }}>
              Language
            </InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              style={{ fontSize: '16px' }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="mr">Marathi</MenuItem>
              <MenuItem value="te">Telugu</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            id="title-input"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            multiline
            rows={3}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            id="description-input"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={6}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ marginBottom: '20px', width: '50%' }}>
          <TextField
            id="image-input"
            label="Image"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px', marginBottom: '10px', width: '80%', background: '#861f41',borderRadius:'4px' }}
        >
          Add News 
        </Button>
      </div>
      {showSuccessPopup && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '450px', padding: '16px', background: 'white',borderRadius:'4px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
            <CheckCircleOutlined style={{ fontSize: '40px', color: 'green' }} />
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>News Added Successfull....</span>
          </div>
          {/* Additional content for success popup */}
        </div>
      </div>
    )}
    </div>
  );
}

export default AddContent;
