const API = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: ''
    };
    this.getQuote = this.getQuote.bind(this);
  }
  
  getQuote() {
      $.getJSON(API, function(json) {
        var quoteText = JSON.stringify( json.quoteText );
        var quoteAuthor = JSON.stringify(json.quoteAuthor ).replace( /["]/g, '' );
        if (quoteText.length + quoteAuthor.length > 280 ) {
            var shortenedLength = 274 - quoteAuthor.length;
            var twitter_quoteText = quoteText.substring(0, shortenedLength)+'..."';
            var twitter_quoteText = twitter_quoteText.replace(';', '%3B');
          } else {
            twitter_quoteText = quoteText.replace(';', '%3B');
          }
        this.setState({
          quoteText: quoteText, 
          quoteAuthor: quoteAuthor
        })
        var pattern = GeoPattern.generate();
        $('body').css('background-image', pattern.toDataUrl());
        $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?text=" + twitter_quoteText + " " + quoteAuthor);
    }.bind(this));
  }
  componentDidMount() {
    this.getQuote();
  }
  
  render() {
    return (
    <div id="quote-box" className="container">
        <h1 id="text">{this.state.quoteText}</h1>
        <p id="author">{this.state.quoteAuthor}</p>
        <button id="new-quote" onClick={this.getQuote}><i className="fas fa-sync"></i><span> New Quote</span></button>
        <button id="share"><a id="tweet-quote" href="https://twitter.com/intent/tweet" className="tweet twitter-share-button" target="_blank"><i class="fab fa-twitter"></i><span> Share</span></a>
        </button>
    </div>
    )
  }
  
}

ReactDOM.render(
    <Quote />, 
    document.getElementById('mainContainer')
);