import { useState, useEffect } from 'react';
import { formatDisplayDate } from '../../utils/dateUtils';
import ImageUpload from '../ImageUpload/ImageUpload';
import './DiaryEditor.css';

const DiaryEditor = ({ selectedDate, entry, onSave, onDelete }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (entry) {
      setContent(entry.content || '');
      setImages(entry.images || []);
    } else {
      setContent('');
      setImages([]);
    }
  }, [entry, selectedDate]);

  const handleSave = () => {
    if (!content.trim() && images.length === 0) {
      alert('日記の内容または画像を入力してください');
      return;
    }

    onSave({
      date: selectedDate,
      content: content.trim(),
      images
    });

    alert('日記を保存しました');
  };

  const handleDelete = () => {
    if (window.confirm('この日記を削除しますか？')) {
      onDelete(selectedDate);
      setContent('');
      setImages([]);
      alert('日記を削除しました');
    }
  };

  if (!selectedDate) {
    return (
      <div className="diary-editor">
        <p className="no-selection">カレンダーから日付を選択してください</p>
      </div>
    );
  }

  return (
    <div className="diary-editor">
      <div className="editor-header">
        <h3>{formatDisplayDate(new Date(selectedDate))}</h3>
      </div>

      <textarea
        className="diary-textarea"
        placeholder="今日の出来事を記録しましょう..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ImageUpload images={images} onImagesChange={setImages} />

      <div className="editor-actions">
        <button className="save-button" onClick={handleSave}>
          💾 保存
        </button>
        {entry && (
          <button className="delete-button" onClick={handleDelete}>
            🗑️ 削除
          </button>
        )}
      </div>
    </div>
  );
};

export default DiaryEditor;
