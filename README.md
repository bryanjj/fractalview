# fractalview
Prototyped with CodeSandbox

To run:
```
npm install
npm start
```

you can also play around with this in codesandbox here:
https://codesandbox.io/p/github/bryanjj/fractalview/

---


This app visualizes the 4d space of mandelbrot and julia sets.
this space is a $f: \mathbb{C}^2 \to \mathbb{C}$ space defined with the function:
$Z_{n+1} = Z_{n}^2 + c$
for which the boundary of the points $Z_0$ and $c$ converges

this is a 2d-complex space and the app views a 2d-real slice of this space.

You configure the 2d slice you are viewing by mapping the 
4 real dims to the 2 dims (x and y) of the view window

the other dims not assigned to x and y can be set to specified constants.
This allows you to view the 4d space from any orthogonal slice.

---

The [mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) is defined as:
the set of points c, where the following recursive function converges
$Z_{n+1}=Z_{n}^2$ + c$ where $Z_0 = 0$

So to configure the classic mandelbrot set you would set the following coord mappings:

real $Z_0 = 0$

imag $Z_0 = 0$

real $c = x$

imag $c = y$

<img width="815" alt="mandelbrot_example" src="https://user-images.githubusercontent.com/3630871/213620181-1fb5bc73-ddba-496b-9da8-4967dd52152f.png">

---

The [julia sets](https://en.wikipedia.org/wiki/Julia_set) are defined:
as the set of points Z0, where the following converges: 
$Z_{n+1}=Z_{n}^2 + c$ where $c$ is a constant

for example:

real $Z_0 = x$

imag $Z_0 = y$

real $c = -.4$

imag $c = .6$

<img width="869" alt="juliaset_example" src="https://user-images.githubusercontent.com/3630871/213620151-90498fa4-468f-4785-a886-468597690f4c.png">

