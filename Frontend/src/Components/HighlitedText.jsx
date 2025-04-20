const HighlitedText = ({ input, response }) => {
    const highlightWords = input.toLowerCase().split(" ").filter(word => word.length > 2);
  
    const highlighted = response.split(/(\s+)/).map((word, idx) => {
      const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
      return highlightWords.includes(cleanWord) ? (
        <span key={idx} className="bg-yellow-300 text-black px-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-yellow-400">
          {word}
        </span>
      ) : (
        word
      );
    });
  
    return (
      <div className="leading-relaxed whitespace-pre-wrap mt-6 p-6 border border-gray-300 rounded-lg shadow-md max-w-full break-words bg-white">
        <p className="text-lg font-medium text-gray-800">{highlighted}</p>
      </div>
    );
  };
  
  export default HighlitedText;
  