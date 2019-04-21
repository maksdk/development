function func(a,b,c) {
   console.log(a);
   console.log(b);
   console.log(c);
}

var arr = [
  'First',
  'Second',
  'Third'
];

func.apply(null, arr);