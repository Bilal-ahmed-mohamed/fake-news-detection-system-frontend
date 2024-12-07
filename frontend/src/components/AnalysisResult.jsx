import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, CheckCircle } from 'lucide-react';
import '../App'; // Import the stylesheet

function AnalysisResult({ result }) {
  // Handle cases where result might be undefined or have missing properties
  if (!result) return null;

  // Safely extract predictions and handle '1' as 'True'
  let prediction = result.combined_prediction || result.prediction || 'Fake';
  if (prediction === '1' || prediction === 1) {
    prediction = 'True';
  }

  const confidenceValue =
    result.confidence ||
    (result.confidences &&
      Math.max(...Object.values(result.confidences).filter((c) => c !== null))) ||
    0;

  // Safely extract individual predictions and handle '1' as 'True'
  const individualPredictions = result.predictions || result.individual_predictions || {};
  const formattedIndividualPredictions = Object.fromEntries(
    Object.entries(individualPredictions).map(([model, pred]) => [
      model,
      pred === '1' || pred === 1 ? 'True' : pred,
    ])
  );

  return (
    <div className="analysis-result">
      <h2 className="result-title">Analysis Result</h2>
      <div className="result-content">
        <div
          className={`result-status ${
            prediction === 'Fake' ? 'text-fake' : 'text-real'
          }`}
        >
          {prediction === 'Fake' ? (
            <AlertCircle className="status-icon" size={24} />
          ) : (
            <CheckCircle className="status-icon" size={24} />
          )}
          <p className="status-text">
            This news is predicted as <strong>{prediction}</strong>
          </p>
        </div>
        {/* <p className="confidence-score">
          Confidence Score: {(confidenceValue * 100).toFixed(2)}%
        </p> */}
        {/* <div>
          <h3 className="model-predictions-title">Model Predictions:</h3>
          <ul className="model-predictions-list">
            {Object.entries(formattedIndividualPredictions).map(([model, pred]) => (
              <li key={model} className="model-prediction-item">
                {model}: {pred}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

AnalysisResult.propTypes = {
  result: PropTypes.shape({
    combined_prediction: PropTypes.string,
    prediction: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    confidence: PropTypes.number,
    confidences: PropTypes.object,
    predictions: PropTypes.object,
    individual_predictions: PropTypes.object,
  }),
};

export default AnalysisResult;
