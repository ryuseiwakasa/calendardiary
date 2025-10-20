import { useState, useEffect } from 'react';
import Calendar from './components/Calendar/Calendar';
import DiaryEditor from './components/DiaryEditor/DiaryEditor';
import { storage } from './utils/storage';
import { formatDateKey, getToday } from './utils/dateUtils';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [datesWithEntries, setDatesWithEntries] = useState([]);

  useEffect(() => {
    loadDatesWithEntries();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadEntry(selectedDate);
    }
  }, [selectedDate]);

  const loadDatesWithEntries = () => {
    const dates = storage.getDatesWithEntries();
    setDatesWithEntries(dates);
  };

  const loadEntry = (date) => {
    const dateKey = typeof date === 'string' ? date : formatDateKey(date);
    const entry = storage.getByDate(dateKey);
    setCurrentEntry(entry);
  };

  const handleDateSelect = (date) => {
    const dateKey = formatDateKey(date);
    setSelectedDate(dateKey);
  };

  const handleSave = (entryData) => {
    storage.save(entryData);
    loadDatesWithEntries();
    loadEntry(entryData.date);
  };

  const handleDelete = (date) => {
    storage.delete(date);
    loadDatesWithEntries();
    setCurrentEntry(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 カレンダー日記</h1>
        <p>毎日の思い出を記録しよう</p>
      </header>

      <div className="app-content">
        <div className="calendar-section">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            datesWithEntries={datesWithEntries}
          />
        </div>

        <div className="editor-section">
          <DiaryEditor
            selectedDate={selectedDate}
            entry={currentEntry}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
