(function() {
    var app = angular.module("angular-popover", []);
    app.directive("angularPopover", [ "$window", function($window) {
        return {
            restrict: "A",
            transclude: true,
            scope: true,
            template: '<div class="angular-popover-container"><div class="angular-popover hide-popover-element"><div ng-if="isTemplateUrl()" ng-include="getContentPopover()" class="angular-popover-template"></div><div ng-if="!isTemplateUrl()" class="angular-popover-template"></div></div><div class="angular-popover-triangle hide-popover-element" ng-class="getTriangleClass()"></div></div><ng-transclude></ng-transclude>',
            link: function(scope, element, attrs) {
                var elementPositionProperty = $window.getComputedStyle(element[0]).position;
                if (elementPositionProperty === "static") {
                    element[0].style.position = "relative";
                }
                var popover_container = element[0].querySelector(".angular-popover-container"), popover, parent_height, parent_width, popover_height, popover_width, triangle, triangle_height, triangle_diagonal, triangle_div_side = 15, triangle_rect_div_side = 30;
                triangle_height = Math.sqrt(triangle_div_side * triangle_div_side / 2);
                triangle_diagonal = Math.sqrt(triangle_div_side * triangle_div_side * 2);
                var mode = attrs.mode || "click";
                var closeOnClick = attrs.closeOnClick === undefined ? mode === "click" : attrs.closeOnClick === "true";
                var closeOnMouseleave = attrs.closeOnMouseleave === undefined ? mode === "mouseover" : attrs.closeOnMouseleave === "true";
                var createPopover = function() {
                    if (attrs.template) {
                        var templateElement = element[0].querySelector(".angular-popover-template");
                        templateElement.innerHTML = attrs.template;
                    }
                    if (attrs.backgroundColor) {
                        popover.style["background-color"] = attrs.backgroundColor;
                    }
                    if (attrs.textColor) {
                        popover.style.color = attrs.textColor;
                    }
                    if (attrs.padding) {
                        popover.style.padding = attrs.padding;
                    }
                    popover_height = popover.clientHeight;
                    popover_width = popover.clientWidth;
                    switch (attrs.direction) {
                      case "top":
                        popover.style.top = -parent_height - popover_height - triangle_height + "px";
                        popover.style.left = (parent_width - popover_width) / 2 + "px";
                        triangle.style.top = -parent_height - triangle_height + "px";
                        triangle.style.left = (parent_width - triangle_rect_div_side) / 2 + "px";
                        break;

                      case "bottom":
                        popover.style.top = triangle_height + "px";
                        popover.style.left = (parent_width - popover_width) / 2 + "px";
                        triangle.style.top = -(triangle_rect_div_side - triangle_height) + "px";
                        triangle.style.left = (parent_width - triangle_rect_div_side) / 2 + "px";
                        break;

                      case "right":
                        popover.style.top = (parent_height - popover_height) / 2 - parent_height + "px";
                        popover.style.left = parent_width + triangle_height + "px";
                        triangle.style.top = (parent_height - triangle_rect_div_side) / 2 - parent_height + "px";
                        triangle.style.left = parent_width - (triangle_rect_div_side - triangle_height) + "px";
                        break;

                      case "left":
                        popover.style.top = (parent_height - popover_height) / 2 - parent_height + "px";
                        popover.style.right = triangle_height + "px";
                        triangle.style.top = (parent_height - triangle_rect_div_side) / 2 - parent_height + "px";
                        triangle.style.left = -triangle_height + "px";
                        break;
                    }
                };
                scope.getContentPopover = function() {
                    return attrs.templateUrl;
                };
                scope.isTemplateUrl = function() {
                    if (attrs.templateUrl) {
                        return true;
                    }
                    return false;
                };
                scope.getTriangleClass = function() {
                    return "angular-popover-triangle-" + attrs.direction;
                };
                if (closeOnMouseleave) {
                    element[0].addEventListener("mouseleave", function() {
                        if (popover) {
                            popover.classList.add("hide-popover-element");
                            triangle.classList.add("hide-popover-element");
                        }
                    });
                }
                if (mode !== "click" && closeOnClick) {
                    element[0].addEventListener("click", function() {
                        if (popover) {
                            popover.classList.add("hide-popover-element");
                            triangle.classList.add("hide-popover-element");
                        }
                    });
                }
                element[0].addEventListener(mode, function() {
                    parent_height = element[0].clientHeight;
                    popover_container.style.top = parent_height + "px";
                    parent_width = element[0].clientWidth;
                    popover = element[0].querySelector(".angular-popover");
                    triangle = element[0].querySelector(".angular-popover-triangle");
                    if (mode === "click" && closeOnClick) {
                        popover.classList.toggle("hide-popover-element");
                        triangle.classList.toggle("hide-popover-element");
                        popover_container.classList.toggle("popover-animation");
                        popover_container.classList.toggle("popover-floating-animation-" + attrs.direction);
                    } else if (mode === "click" && !closeOnClick) {
                        popover.classList.remove("hide-popover-element");
                        triangle.classList.remove("hide-popover-element");
                        popover_container.classList.add("popover-animation");
                        popover_container.classList.add("popover-floating-animation-" + attrs.direction);
                    } else if (popover.classList.contains("hide-popover-element")) {
                        popover.classList.remove("hide-popover-element");
                        triangle.classList.remove("hide-popover-element");
                        popover_container.classList.add("popover-animation");
                        popover_container.classList.add("popover-floating-animation-" + attrs.direction);
                    }
                    if (!popover.classList.contains("hide-popover-element")) {
                        createPopover();
                    }
                });
            }
        };
    } ]);
})();
//# sourceMappingURL=angular-popover.js.map
