module.exports = (function() {
  return {
    makeRandomString: (length) => {
      length = length ? length : 10;
      let text = "";
      const randomItems = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for( var i=0; i < length; i++ )
          text += randomItems.charAt(Math.floor(Math.random() * randomItems.length));
  
      return text;
    }
  }
})();
