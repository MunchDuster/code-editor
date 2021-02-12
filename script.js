//button and line no
var heightLimit = {
  val: 50
};
var lineHeight = {
  val: 20
};
const fc = 5 / 3;
const fs = 18;
const fullUrl = window.location.href;
const url = fullUrl.replace(fullUrl.split("/")[fullUrl.split("/").length - 1],"");
var maxChars;
var pgname = document.getElementById("pgname");
var button = document.getElementById("btn");
var textarea = document.getElementById("text");
var lineNos = document.getElementById("lineNo");
var con = document.getElementById("con");

console.log(url);

function onLoad() {
  text.style.lineHeight = lineHeight.val.toString() + "px;";
  lineNos.lineHeight = lineHeight.val.toString() + "px";
}
function ontextinput() {
  maxChars = (textarea.scrollWidth * fc) / fs;
  var Nos = "";
  var splits = textarea.innerText.split("\n");
  var no = 1;
  var nno = 0;
  for (var i = 0; i < splits.length; i++) {
    if (splits[i] != "") {
      Nos += (no++).toString() + "\n";
      var charsLeft = splits[i].length;
      while (charsLeft > maxChars) {
        charsLeft -= maxChars;
        Nos += " \n";
      }
    } else {
      if (++nno % 2 == 0) Nos += "-\n";
    }
  }

  lineNos.innerText = Nos;
  lineNos.style.marginTop = (-lineNos.clientHieght).toString() + "px";
}
function addto(obj) {
  var scrit = document.createElement("div");
  obj.innerHTML += textarea.innerText;
}


ontextinput();
onLoad();

//console controller
console.olog = console.log;
console.log = function (message) {
  var trace = new Error().stack;
  var getStackTrace = function () {
    var str = "";
    var lines = new Error().stack.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      var lineEnd =
        "at <anonymous>:" +
        (textarea.innerText.split("\n").length + 5).toString() +
        ":1";
      if (i > 2) {
        
        if (line != lineEnd) {
          var splits = (line.indexOf(url) != -1
            ? line.split(url)[1]
            : line
          ).split(":");
		  str += splits[0].split("<anonymous>")[0] +
            (parseInt(splits[1]) - 3).toString() +
            ":" +
            splits[2] +
            "\n";

        } else {
          break;
        }
      }
    }

    return str;
  };
  con.innerText += message + " - " + getStackTrace();
};
console.error = console.debug = console.info = console.log;

//noSpecialCharacters handler
Array.from(document.getElementsByClassName("noSpecialCharacters")).forEach(
  (ele) => {
    //Remove any unacceptable input (like \ (space) / , . - ) note: underscore is A-OK.
	
	ele.setAttribute("data-lastcontent",ele.innerText);
    ele.addEventListener("input", function (s) {
     
	  const code = s.data != null ? s.data.charCodeAt(0) : 0;
	  if (code == 0 || (code >= 97 && code <= 123) || (code >= 65 && code <= 97) || (code >= 48 && code <= 59) ){//if s is null, a backspace was pressed
		ele.setAttribute("data-lastcontent",ele.innerText);
	  }else{
		ele.innerText = ele.getAttribute("data-lastcontent");
	}
    });
  }
);
//placeholder handler
Array.from(document.getElementsByClassName("placeholder")).forEach((ele) => {
  // Set the placeholder as initial content
    ele.innerText = ele.getAttribute("data-placeholder");
	
  ele.addEventListener("focus", function (e) {
    const value = e.target.innerText;
    if (value == ele.getAttribute("data-placeholder")) {
      e.target.innerText = "";
    }
  });

  ele.addEventListener("blur", function (e) {
    const value = e.target.innerText;
    if (value === "") {
      e.target.innerText = ele.getAttribute("data-placeholder");
    }
  });
});
//limit the amount of chars entered into a writeableDiv
Array.from(document.getElementsByClassName("writeableDiv")).forEach((ele) => {
	ele.setAttribute("data-lastcontent",ele.innerText);
	
  ele.addEventListener("input", function () {
    if (ele.innerText.length > ele.getAttribute("data-maxlength")){
       ele.innerText = ele.getAttribute("data-lastcontent");
	}else{
		ele.setAttribute("data-lastcontent",ele.innerText);
	}
	  //ele.innerText.substring( ele.innerText.length - ele.getAttribute("data-maxlength"),ele.innerText.length);
  });
});
