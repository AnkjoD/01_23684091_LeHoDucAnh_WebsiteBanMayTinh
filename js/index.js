function safeParse(jsonString, defaultValue = []) {
    try {
        return JSON.parse(jsonString) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}
function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return true
}

const headContainer = document.querySelector('.headContainer');
if(!isEmpty(safeParse(localStorage.getItem("loggedInUser")))) {
    headContainer.classList.add('hidden');
}


