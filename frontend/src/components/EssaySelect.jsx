import "../styles/Typography.css";
import "../styles/Buttons.css";
import { useState } from "react";
import axios from 'axios';

const EssaySelect = (essayData, userId, {fetchEssays}) => {
    essayData = essayData.essayData;

    const [isSelected, setIsSelected] = useState(false);

    const handleToggle = () => {
        setIsSelected(!isSelected);
    };

    
    const handleDeleteEssay = async (id) => {
        try {
            const response = await axios.post('http://localhost:3000/deleteEssay', {
                essayId: id
            });

            fetchEssays();

        } catch (error) {
            console.error('Error deleting essay:', error.response.data);
        }
    };

    return (
        <div className="position-relative">
            <button
                type="button"
                className={`btn essay-select-button ${isSelected ? 'selected' : ''}`}
                data-bs-toggle="button"
                autoComplete="off"
                aria-pressed={isSelected ? 'true' : 'false'}
                onClick={handleToggle}
            >
                <h3 className="body-text-lg-semibold">{essayData.title}</h3>
                <p className="body-text-lg text-start">{essayData.text.split(' ').slice(0, 20).join(' ')}...</p>
                <div className="d-flex align-items-flex-start align-self-stretch">
                    {essayData.category.map((category, index) => (
                        <div key={index} className="tag-indicator rounded-pill me-3 px-3 py-1">
                            <span className="body-text-sm">{category}</span>
                        </div>
                    ))}
                </div>
            </button>
            <button type="button" onClick={() => handleDeleteEssay(essayData._id)} className="btn-close position-absolute" style={{ top: '10%', right: '5%' }} />
        </div>
    );
}

export default EssaySelect;
