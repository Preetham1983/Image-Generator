import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image',
        { inputs: prompt },
        {
          headers: {
            Authorization: '//use your access token',
          },
          responseType: 'arraybuffer',
        }
      );
      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="input"
        />
        <button type="submit" className="button">Generate Image</button>
      </form>
      {loading ? (
        <p  className='loading'>Loading...</p>
      ) : (
        image && <img src={image} alt="Generated" className="image" />
      )}
    </div>
  );
};

export default ImageGenerator;

