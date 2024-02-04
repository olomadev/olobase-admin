
import cookies from "js-cookie";
import join from "lodash/join";
import { parseDomain, ParseResultType } from "parse-domain";
/**
 * Global cookie object
 */
export default {
  set: function(key, value) {
    cookies.set(
      key,
      value, 
      { 
        expires: 1, 
        path: "/", 
        domain: this.getBaseHost(), 
        secure: this.getSecure()
      }
    );
  },
  get: function(key) {
    return cookies.get(key)
  },
  remove: function(key) {
    cookies.remove(
      key, 
      { 
        expires: -1, 
        path: "/", 
        domain: this.getBaseHost(), 
        secure: this.getSecure()
      }
    );
  },
  getSecure: function() {
    return (window.location.protocol == 'https:') ? true : false;
  },
  getBaseHost: function() {
    //
    // https://www.npmjs.com/package/parse-domain
    // 
    const parseResult = parseDomain(window.location.hostname);
    if (parseResult.type === ParseResultType.Invalid) {
      alert("Invalid domain name: Your cookie set() and get() methods will not work as expected");
    }
    let baseHost = "";
    if (parseResult.type === ParseResultType.Ip) {
      baseHost = window.location.hostname;
    }
    //
    // your local domains part: it should be sub.example.local or example.local
    // 
    if (parseResult.type === ParseResultType.Reserved) {
      baseHost = join(parseResult.labels, ".");
      if (parseResult.labels.length == 3) { // unset subdomain
        parseResult.labels.shift();
      }
      baseHost = join(parseResult.labels, ".");
    }
    if (parseResult.type === ParseResultType.NotListed) {
      baseHost = join(parseResult.labels, ".");
    }
    if (parseResult.type === ParseResultType.Listed) {
      const { subDomains, domain, topLevelDomains } = parseResult;
      baseHost = domain + "." + join(parseResult.topLevelDomains, ".");
    }
    return baseHost;
  }
}