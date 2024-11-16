// 추후 css 저장전 테스트용입니다


// 1. fnDynamicStyle ------------------------------------------------------------------------------>
var fnDynamicStyle = function (baseElement = document) {

  // 1-1. style 접두사 + css속성 + 단위
  var stylesNumber = {
    w  : ["width", "%"],
    h  : ["height", "%"],
    p  : ["padding", "px"],
    pt : ["padding-top", "px"],
    pb : ["padding-bottom", "px"],
    ps : ["padding-left", "px"],
    pe : ["padding-right", "px"],
    m  : ["margin", "px"],
    mt : ["margin-top", "px"],
    mb : ["margin-bottom", "px"],
    ms : ["margin-left", "px"],
    me : ["margin-right", "px"],
    fw : ["font-weight", "00"],
    fs : ["font-size", "px"],
    fsr : ["font-size", "rem"],
    z : ["z-index", ""],
  };

  // 1-2. style 접두사 + css속성
  var stylesString = {
    "d-center": {
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
      "text-align": "center",
    },
    "d-left": {
      "display": "flex",
      "justify-content": "flex-start",
      "align-items": "center",
      "text-align": "left",
    },
    "d-right": {
      "display": "flex",
      "justify-content": "flex-end",
      "align-items": "center",
      "text-align": "right",
    },
    "d-none": {
      "display": "none",
    },
    "d-flex": {
      "display": "flex",
    },
    "d-inline": {
      "display": "inline-block",
    },
    "d-inline-flex": {
      "display": "inline-flex",
    },
    "pos-static": {
			"position": "static",
		},
		"pos-relative": {
			"position": "relative",
		},
    "over-hidden": {
      "overflow": "hidden",
    },
    "over-auto": {
      "overflow": "auto",
    },
    "pointer": {
      "cursor": "pointer",
      "caret-color": "transparent",
    },
    "resize-none": {
      "resize": "none",
    },
    "webkit-fill": {
      "width": "-webkit-fill-available",
      "height": "-webkit-fill-available",
    },
    "fw-normal": {
      "font-weight": "normal",
    },
    "fw-bold": {
      "font-weight": "bold",
    },
    "fw-bolder": {
      "font-weight": "bolder",
    },
  };

  // 2. 정의한 속성에 존재하는 클래스 이름인지 확인
  function checkValidClass(className) {
    if (stylesString[className]) {
      return true;
    }

    var parts = className.split("-");
    var prefix = parts[0];
    var value = parts[1];

    if (value && value.startsWith("n")) {
      // Remove 'n'
      value = value.substring(1);
    }

    return (
      stylesNumber[prefix] &&
      !isNaN(value) &&
      parts.length === 2
    );
  };

  // 3-1. 스타일 적용
  function applyStyle(element, className) {
    if (stylesString[className]) {
      for (let prop in stylesString[className]) {
        element.style[prop] = stylesString[className][prop];
      }
      return;
    }

    var parts = className.split("-");
    var prefix = parts[0];
    var value = parts[1];

    if (value && value.startsWith("n")) {
      value = "-" + value.substring(1);
    }

    if (stylesNumber[prefix] && !isNaN(value) && parts.length === 2) {
      var styleInfo = stylesNumber[prefix];
      element.style.setProperty(
        styleInfo[0],
        value + styleInfo[1],
        "important"
      );
    }
  };

  // 3-2. 적용된 스타일 저장
  /* function saveStyle(element, className) {
    var pageName = location.pathname.split("/").pop().split(".")[0];
    var dynamicStyle = JSON.parse(localStorage.getItem("fnDynamicStyle")) || {};
    dynamicStyle[pageName] = dynamicStyle[pageName] || {};
    dynamicStyle[pageName][className] = element.style.cssText;
    localStorage.setItem("fnDynamicStyle", JSON.stringify(dynamicStyle));
  } */

  // 4. style 접두사를 기반으로 css 선택자 생성
  var numberSelector = Object.keys(stylesNumber).flatMap(function (prefix) {
    return `[class*=${prefix}-]`;
  })
  .join(", ");

  var stringSelector = Object.keys(stylesString).flatMap(function (prefix) {
    return `.${prefix}`;
  })
  .join(", ");

  // 5. 선택자를 기반으로 DOM 요소를 가져옴
  var selector = `${numberSelector}, ${stringSelector}`;
  var elements = document.querySelectorAll(selector);

  // 6. 가져온 요소에 스타일 적용
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var classNames = element.className;

    if (typeof element.className === "string") {
      classNames = element.className.split(" ");
    }
    else if (element.className instanceof SVGAnimatedString) {
      classNames = element.className.baseVal.split(" ");
    }
    for (var j = 0; j < classNames.length; j++) {
      var className = classNames[j];
      if (checkValidClass(className)) {
        applyStyle(element, className);
        /* saveStyle(element, className); */
      }
    }
  }

  // 7. 동적으로 생성된 요소에도 스타일 적용
  /* var observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      if (mutation.type === "childList") {
        for (let addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            fnDynamicStyle(addedNode);
          }
        }
      }
    }
  });

  observer.observe(baseElement, {
    attributes: false,
    childList: true,
    subtree: true,
  }); */
};

// 0. fnMediaQuery -------------------------------------------------------------------------------->
// 카드 하단 여백이 많이 생기는 이슈
var fnMediaQuery = function () {

  var mediaQuery = window.matchMedia("(min-width: 980px) and (max-width: 10000px)");
  var cardsEl = document.querySelectorAll(".cards");
  var emptyRowEl = document.getElementById("isEmptyRow");

  // 미디어 쿼리 변경 시 실행할 함수
  var checkMediaQuery = function() {
    cardsEl.forEach((element) => {
      if (emptyRowEl) {
        if (mediaQuery.matches && element.id === "gridView") {
          element.style.height = "93%";
        }
        else if (!mediaQuery.matches && element.id === "gridView") {
          element.style.height = "93%";
        }
        if (mediaQuery.matches && element.id === "contentView") {
          element.style.height = "93%";
        }
        else if (!mediaQuery.matches && element.id === "contentView") {
          element.style.height = "fit-content";
        }
      }
      else {
        if (mediaQuery.matches && element.id === "gridView") {
          element.style.height = "88%";
        }
        else if (!mediaQuery.matches && element.id === "gridView") {
          element.style.height = "88%";
        }
        if (mediaQuery.matches && element.id === "contentView") {
          element.style.height = "88%";
        }
        else if (!mediaQuery.matches && element.id === "contentView") {
          element.style.height = "fit-content";
        }
      }
    });
  };

  // 초기 상태에서 미디어 쿼리 체크
  checkMediaQuery();

  // 미디어 쿼리 변경 시 checkMediaQuery 함수를 호출
  mediaQuery.addEventListener("change", checkMediaQuery);
};


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fnDynamicStyle);
  document.addEventListener("DOMContentLoaded", fnMediaQuery);
}
else {
  fnDynamicStyle();
  fnMediaQuery();
}