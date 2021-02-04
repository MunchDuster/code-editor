  //button and line no
  var heightLimit = {
    val: 50
  };
  var lineHeight = {
    val: 20
  };
	const fc = 5 / 3;
  const fs = 18;
  var maxChars;
  var pgname = document.getElementById("pgname");
  var button = document.getElementById("btn");
  var textarea = document.getElementById("text");
  var lineNos = document.getElementById("lineNo");
	var con = document.getElementById("con");
  
  
  function onLoad() {
    text.style.lineHeight = lineHeight.val.toString() + "px;";
    lineNos.lineHeight = lineHeight.val.toString() + "px";
  }
  function ontextinput() {
    maxChars = textarea.scrollWidth * fc / fs;
    var Nos = "";
    var splits = textarea.innerText.split('\n')
    var no = 1;
    var nno = 0;
    for (var i = 0; i < splits.length; i++) {
      if (splits[i] != "") {
        Nos += (no++).toString() + '\n';
        var charsLeft = splits[i].length;
        while (charsLeft > maxChars) {
          charsLeft -= maxChars;
          Nos += ' \n';
        }
      } else {
        if (++nno % 2 == 0)
          Nos += '-\n';
      }
    }

    lineNos.innerText = Nos;
    lineNos.style.marginTop = (-lineNos.clientHieght).toString() + 'px';
	
  }
  function run() {
    var scrit = document.createElement('script');
    
    scrit.innerHTML = "try{(function "+ pgname.innerText.toString() + "(){" + text.innerText + "})();}catch(err){console.log(err);}";
    document.body.append(scrit);
  }

  ontextinput();
  onLoad();

//console controller
  console.olog = console.log;
  const url = window.location.href;
  console.log = function(message) {
    console.olog(message);
    var trace = new Error().stack.split(url)[1].split("at")[1];
    
    con.innerText += message + "-" + trace;
  };
  console.error = console.debug = console.info = console.log;
  
  //placeholder handler
  Array.from(document.getElementsByClassName("placeholder")).forEach((ele) => {
	
    // Set the placeholder as initial content
    ele.innerText = ele.getAttribute('data-placeholder');

    ele.addEventListener('focus', function(e) {
      const value = e.target.innerText;
      if (value === ele.getAttribute('data-placeholder')) {
        e.target.innerText = '';
      }
    });

    ele.addEventListener('blur', function(e) {
      const value = e.target.innerText;
      if (value === '') {
        e.target.innerText = ele.getAttribute('data-placeholder');

      }
    });
  });
//
Array.from(document.getElementsByClassName("writeableDiv")).forEach((ele) => {
ele.addEventListener("input", function() {
    if(ele.innerText.length > ele.getAttribute('data-maxlength'))
    	ele.innerText = ele.innerText.substring(ele.innerText.length-ele.getAttribute('data-maxlength'), ele.innerText.length);
});
  });
