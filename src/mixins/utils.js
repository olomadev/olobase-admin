
/**
 * Common utility functions 
 */
export default {
  methods: {
    generateUid(uppercase = false) {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        let uuid = v.toString(16);
        return (uppercase) ? uuid.toUpperCase() : uuid;
      });
    },
    generateId(object) {
      return object.$route.name.slice(-6) == "create" ? this.generateUid() : object.id;
    },
    generateKey(keyValue, index = 0) {
      if (Array.isArray(keyValue)) {
        let ids = [];
        for (let i = 0; i < keyValue.length; i++) {
          ids.push(keyValue[i].id);
        }
        return ids.join() + "-" + String(index);
      }
      return keyValue + "-" + String(index);
    },
    validateForm(object, form) {
      const fields = Object.keys(object.v$[form]);
      let invalid = false;
      fields.forEach(function(val){
        if (val.charAt(0) != "$") {  // reserved variables
          object.v$[form][val].$touch();
          if (object.v$[form][val].$invalid) {
            invalid = true
          }  
        }        
      });
      return invalid;
    },
    dateAddMonth(date, numberOfMonth) {
      var currentDate = new Date(date);
      var newDate = currentDate.setMonth(currentDate.getMonth() + numberOfMonth);
      return new Date(newDate).toJSON().slice(0, 10);
    },
    dayDiff(firstDate, secondDate = null) {
      let date1 = new Date(firstDate);
      let date2 = new Date();
      if (secondDate) {
        date2 = new Date(secondDate);
      }
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    },
    monthDiff(firstDate, secondDate) {
      firstDate = new Date(firstDate);
      secondDate = new Date(secondDate);
      var totalMonth = Math.max(
        (secondDate.getFullYear() - secondDate.getFullYear()) * 12 +
          secondDate.getMonth() -
          firstDate.getMonth(),
        0
      );
      totalMonth = totalMonth + 1;
      return totalMonth;
    },
    arrayGroupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    generatePassword(size) {
      // let characters = "a-z,A-Z,0-9,#"
      let characters = "a-z,0-9,$";
      let charactersArray = characters.split(",");
      let CharacterSet = "";
      let password = "";
      if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnpqrstuvwxyz";
      }
      // if (charactersArray.indexOf('A-Z') >= 0) {
      //     CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      // }
      if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "123456789";
      }
      if (charactersArray.indexOf("$") >= 0) {
        CharacterSet += "#@_-?";
      }
      for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        );
      }
      return password;
    },
    getQueryParam(name, url = window.location.href) {
      name = name.replace(/[[]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  } 
};