var Utils = {};

Utils.randomRange = function(min, max){
	return min + Math.random() * (max - min);
};

Utils.randomInt = function(min, max){
	return Math.floor(min + Math.random() * (max - min + 1));
};

Utils.randomColor = function() {
   var letters = '0123456789ABCDEF';
   var color = '';
   for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
};

Utils.radToDeg = function(rad){
	return 180 / Math.PI * rad;
};

Utils.degToRad = function(deg){
	return Math.PI / 180 * deg;
};

Utils.rotateCoord = function(options) {
   if (typeof options.angle === 'undefined') return console.error('Angle is not found');
   if (typeof options.dx === 'undefined') return console.error('DistanceX is not found');
   if (typeof options.dy === 'undefined') return console.error('DistanceY is not found');

   var offsetX = typeof options.offsetX === 'undefined' ? 0 : options.offsetX;
   var offsetY = typeof options.offsetY === 'undefined' ? 0 : options.offsetY;

   var cos = Math.cos(options.angle);
   var sin = Math.sin(options.angle);

   var x = options.dx * cos - options.dy * sin + offsetX;
   var y = options.dy * cos + options.dx * sin + offsetY;

   return {x:x, y:y}
};

Utils.cloneArray = function(arr) {
   if (!arr || !Utils.isArray(arr)) {
      throw new Error('To create a clone of the array I need to get the array, stupid programer');
   }

   var newArr = [];

   for (var i = 0; i < arr.length; i++) {

      var el = arr[i];

      if (Utils.isPlainObject(el)) {
         newArr[i] = Utils.cloneObj(el);
         continue;
      }

      if (Utils.isArray(el)) {
         newArr[i] = Utils.cloneArray(el);
         continue;
      }

      newArr[i] = el;
   }

   return newArr;
};

Utils.cloneObj = function(obj) {
   if (!obj || !Utils.isObject(obj)) {
      throw new Error('To create a clone of the object I need to get the object, stupid programer');
   }

   var newObj = {};

   for (var key in obj) {

      if (!obj.hasOwnProperty(key)) continue;

      if (Utils.isArray(obj[key])) {
         newObj[key] = [];

         for (var i = 0; i < obj[key].length; i++) {
            
            var el = obj[key][i];

            if (Utils.isObject(el)) {
               newObj[key][i] = Utils.cloneObj(el);
            }
            else {
               newObj[key][i] = el;
            }
         }
      }

      if (Utils.isPlainObject(obj[key])) {
         newObj[key] = Utils.cloneObj(obj[key]);
         continue;
      }
 
      newObj[key] = obj[key];
   }

   return newObj;
};

Utils.isArray = function(arr) {
   return Object.prototype.toString.call(arr) === "[object Array]";
};

Utils.isObject = function(obj) {
   return typeof obj === 'object' && obj !== null;
};

Utils.isPlainObject = function(obj) {
   if(!obj || !obj.constructor) return false;
   return obj.constructor === Object;
};