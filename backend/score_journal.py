from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS  # To handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    # Get the journal entry from the request
    data = request.json
    journal_entry = data.get('text')
    
    # Check if text is provided
    if not journal_entry:
        return jsonify({"error": "No text provided"}), 400
    
    # Analyze sentiment using TextBlob
    analysis = TextBlob(journal_entry)
    polarity = analysis.sentiment.polarity
    
    # Determine sentiment based on polarity
    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    
    # Return the result
    return jsonify({
        "text": journal_entry,
        "sentiment": sentiment,
        "polarity": polarity
    })

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app