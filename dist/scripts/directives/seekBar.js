(function() {
        function seekBar($document) {

         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };
         
         return {
             templateUrl: '/templates/directives/seek_bar.html',
             replace: true,
             restrict: 'E',
             scope: {
                onChange: '&'
             },
             link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
 
                var seekBar = $(element); 
                 
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };  
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                }; 
                 
                /* 
                *@attr $observe() 
                *@desc Observes the value of attribute "value" in the HTML and adjusts for changes 
                *@param {Object}
                */
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                
                /* 
                *@attr $observe()   
                *@desc Observes the value of attributes "max" in the HTML and adjusts for change
                *@param {Object}
                */
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                /* 
                *@attr fillStyle() 
                *@desc Updates CSS for .fill .seekBar 
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                }; 
                
                /* 
                *@attr thumbStyle() 
                *@desc Updates CSS for .thumb .seekBar 
                */
                scope.thumbStyle = function() {
                    return {left: percentString()}; 
                }; 
                 
                /*
                *@func onClickSeekBar() 
                *@desc Click handler tracks and updates CSS of .thumb 
                *@params click event 
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };  
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                }; 
             }
         };
     }
 
     angular
         .module('blocJams')
         .directive('seekBar',['$document', seekBar]);
 })();