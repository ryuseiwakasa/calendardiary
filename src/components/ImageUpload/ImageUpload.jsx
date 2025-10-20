import { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ images, onImagesChange }) => {
  const [previews, setPreviews] = useState(images || []);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const newImage = event.target.result;
          const updatedImages = [...previews, newImage];
          setPreviews(updatedImages);
          onImagesChange(updatedImages);
        };

        reader.readAsDataURL(file);
      }
    }

    // ファイル入力をリセット
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const updatedImages = previews.filter((_, i) => i !== index);
    setPreviews(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="image-upload">
      <label htmlFor="image-input" className="upload-button">
        📷 画像を追加
      </label>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image} alt={`プレビュー ${index + 1}`} />
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
