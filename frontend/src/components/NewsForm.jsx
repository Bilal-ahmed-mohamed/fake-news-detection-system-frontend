import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

function NewsForm({ text, setText, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-y"
        placeholder="Paste your news text here..."
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            Analyzing...
          </span>
        ) : (
          'Check News'
        )}
      </button>
    </form>
  );
}

NewsForm.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewsForm;