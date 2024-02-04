
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
    findTotalMonths(startDate, endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      var totalMonth = Math.max(
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          endDate.getMonth() -
          startDate.getMonth(),
        0
      );
      totalMonth = totalMonth + 1;
      return totalMonth;
    },
    dateAddMonth(date, numberOfMonth) {
      var currentDate = new Date(date);
      var newDate = currentDate.setMonth(currentDate.getMonth() + numberOfMonth);
      return new Date(newDate).toJSON().slice(0, 10);
    },
    generateColumnName(length) {
      var result = "";
      var characters = "abcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
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
    isAlpha(str) {
      return /[a-zA-Zğüçşıö]+$/.test(str);
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
    },
    formatFileSize(value) {
      if (value >= 1073741824) {
        value = value / 1073741824;
        value = Number.parseFloat(value).toFixed(2) + " gb";
      } else if (value >= 1048576) {
        value = value / 1048576;
        value = Number.parseFloat(value).toFixed(2) + " mb";
      } else if (value >= 1024) {
        value = value / 1024;
        value = Number.parseFloat(value).toFixed(2) + " kb";
      } else if (value > 1) {
        value = value + " b";
      } else if (value == 1) {
        value = value + " b";
      } else {
        value = "0 b";
      }
      return value;
    },
    requiredArray(value) {
      let array = JSON.parse(value);
      if (!Array.isArray(array)) {
        return false;
      }
      if (array.length > 0) {
        return true;
      }
      return false;
    }
  } 
};