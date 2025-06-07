import './AddQuestionForm.css';
import { useState } from 'react';

const AddQuestionForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    Name: '',
    QID: '',
    Platform: '',
    Content: '',
    Difficulty: 1,
    Tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...formData,
      Difficulty: parseInt(formData.Difficulty),
      DateAdded: new Date().toString(),
      Tags: formData.Tags.split(',').map(tag => tag.trim())
    };
    onAdd(newQuestion);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="add-question-form" onSubmit={handleSubmit}>
            <h2>Add New Question</h2>
            <div className="form-columns">
                <div className="form-left">
                    <div className="field-group">
                        <label htmlFor="Name">Name</label>
                        <input name="Name" value={formData.Name} onChange={handleChange} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="QID">QID</label>
                        <input name="QID" value={formData.QID} onChange={handleChange} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="Platform">Platform</label>
                        <input name="Platform" value={formData.Platform} onChange={handleChange} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="Difficulty">Difficulty</label>
                        <input type="number" name="Difficulty" min={1} max={10} value={formData.Difficulty} onChange={handleChange} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="Tags(Comma seperated)">Tags</label>
                        <input name="Tags" value={formData.Tags} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-right">
                <label>
                    Problem Description
                    <textarea
                    name="Content"
                    placeholder="Enter the question link or write the full problem description here..."
                    value={formData.Content}
                    onChange={handleChange}
                    rows={16}
                    required
                    />
                </label>
                </div>
            </div>

            <div className="form-buttons">
                <button type="submit">Add</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
            </form>

    </div>
  );
};

export default AddQuestionForm;