module.exports = {
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  //returns string "affirmative", "negative", or "neutral" depending on sentiment of input
  checkSentiment(input) {
    const threshold = 0.5; //sentiment ranked scale +-5
    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var analysis = sentiment.analyze(input);
  
    if(analysis.comparative < -threshold) {
    ret = "negative";
    } else if(analysis.comparative >= -threshold && analysis.comparative < threshold) {
    ret = "neutral";
    } else if(analysis.comparative >= threshold ) {
    ret = "affirmative";
    }
  
    return ret;
  }
}