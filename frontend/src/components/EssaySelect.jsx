import "../styles/Typography.css";
import "../styles/Buttons.css";
import { useState } from "react";

const EssaySelect = (essayData) => {
    essayData = essayData.essayData;

    const [isSelected, setIsSelected] = useState(false);

    const handleToggle = () => {
        setIsSelected(!isSelected);
    };

    return (
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
    );
}

export default EssaySelect;
