function func(a, b) {
  var rest = Array.prototype.splice.call(arguments, 2);
  
  console.log(a, b);
  console.log(rest);
}

func('arg1', 'arg2', 'arg3', 'arg4', 'arg5');