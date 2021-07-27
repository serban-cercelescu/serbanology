<div>
<h3>Prerequisites</h3>
<ul>
    <li>Basic real analysis (differentiation and continuity)</li>
</ul>

<h3>Foreword</h3>
<p>
During my first year at univ, I was quite frustrated by my percieved lack of understanding of Taylor's theorem, even after having to use it in
a wide variety of problems, from pure maths to estimating the error of numerical integration methods. This is because my gold standard of understanding something
is figuring out how I would have come up with the concept myself. However, after many attempts to reach the Lagrange form of the remainder, I ended up giving up
and looked over the proof from my analysis course: applying Cauchy's mean value theorem in a context that seemed to come out of nowhere. By that I mean that if I were provided with the Lagrange form
of the reminder before and was asked to prove that it worked, this would have definitely been the way I would have done it, however, what kept me away from claiming 
hat I've reached my standard of understanding was the obvious question - how did Lagrange come up with that?
Thus, this article has the purpose of sharing how I have eventually arrived at the Lagrange form of the reminder and maybe, just maybe... how Lagrange himself did so.
</p>
<p>
Before diving into the technical stuff, let me reveal a little disclaimer: if you lack a basic intuition behind the reason why Taylor polynomials effectively approximate
some functions around a point, 3Blue 1Brown made <a href="https://www.youtube.com/watch?v=3d6DsjIBzJ4">a whole video</a> on the topic and he explains it
better than I think I ever could. All of this being said, let's get to the maths.
</p>

<h3>Taylor Polynomials</h3>
<p>
Once upon a time, there was a guy called Taylor, who wanted to approximate functions by polynomials. Why polynomials? Because polynomials are very easy to work with.
By this I do not mean that it's easy to solve polynomial equations, but that evaluating polynomials and algebraically manipulating them is very easy compared to other
classes of functions. Thus, to approximate some function <$>f</$> around some point <$>a \in \mathbb{R}</$>, Taylor employed a polynomial <$>P_n</$> that matches the
first <$>n</$> derivatives of <$>f</$> at <$>a</$> (i.e. <$>f(a)=P(a), f'(a)=P'(a), \dots, f^{(n-1)}(a)=P^{(n-1)}(a)</$>). This choice of approximation is quite intuitive,
as derivatives by definition tell you something about the value of the function around some point (think of the limit definition of the derivative). The most straightforward such polynomial is
just <$>P_n(x)=\sum^{n-1}_{k=0} f^{(k)}(a) \frac{(x-a)^k}{k!}</$>. Perhaps surprisingly, this approximation turned out to be very good for approximating functions such as the
trigonometric ones and many others.
</p>
<p>
If this choice polynomial doesn't seem intuitive, try making one up yourself or prove that the given one works. If you feel stuck, again, I warmly recommend you to watch
3Blue 1Brown's video on Taylor Series.
</p>

<h3>Error Analysis</h3>
<p>
Once provided with an approximation, an obvious question to ask is: <i>how good is it?</i> Which functions are approximated well and how well? Before anything else, let's establish some conventions:
</p>
<ul>
    <li><$>P_n(x) :=\sum^{n-1}_{k=0} f^{(k)}(a) \frac{(x-a)^k}{k!}</$> - i.e. <$>P_n</$> will always mean this specific polynomial whose definition is dependent on <$>f</$>.</li>
    <li>The function <$>f</$> is defined on the interval <$>[a, b]</$> and is <$>n</$> times differentiable</li>
    <li><$>f, f', f'' , \dots , f^{(n-1)} </$> are continuous on <$>[a, b]</$></li>
    <li>The approximation error is denoted by <$>e(x) := f(x) - P_n(x)</$></li>
</ul>
<p>
The constraints on <$>f</$> are chosen such that they are loose enough such that many functions fit them, but strong enough such that we have a decently large collection of
premises to start doing some reasoning starting from.
To see how "off" our approximation basically means to find some bounds for "how big" <$>e(x)</$> can be. In order to do that, we must first collect some observations. One such observation
is that <$>e(a)=0</$>. Moreover, by linearity, the derivatives of <$>e</$> also coincide with the difference between the derivatives of our function <$>f</$> and the derivatives of the
Taylor polynomial that we're using to approximate it (<$>e^{(k)}(x)=f^{(k)}(x)-P_n^{(k)}(x)  </$>). Thus <$>e(a)=e'(a)=e''(a)= \dots = e^{(n-1)}(a)=0</$>. Now let's move on from the maybe
obvious stuff and let's try get to some bounds for <$>e(x)</$>. One way to do this is to spend a while attempting to get stuff by algebraic manipulation and then notice that
the MVT works:
</p>

<$$>e(x) = e(x) - e(a) = (x - a)e'(\xi_1) \text{ for some } \xi_1 \in (a, b) </$$>

<p>
The key observation that should follow this is that we can iterate the application of MVT until we get to the n<sup>th</sup> derivative of <$>e</$>, which equals <$>f^{(n)}</$> at all points,
as the Taylor polynomial "cancels out" (the n<sup>th</sup> derivative of a polynomial of degree <$>n-1</$> is zero):
</p>

<$$>e(x)=(x-a)e'(\xi_1)= (x-a)(e'(\xi_1) - e'(a)) = (x-a)(\xi_1 - a)e''(\xi_2) = (x-a)(\xi_1 - a)(\xi_2 - a)e'''(\xi_3) = \dots </$$>
<$$>(x-a)(\xi_1 - a)(\xi_2 - a) \dots (\xi_{n-1} - a)e^{(n)}(\xi_n) \text{ for some } \xi_1, \dots, \xi_n \text{ s.t. } a < \xi_n < \xi_{n-1} < \dots < \xi_1 < \text{} x </$$>

"Prettified", this is:

<$$> e(x) = (x-a)(\xi_1 - a)(\xi_2 - a) \dots (\xi_{n-1} - a)f^{(n)}(\xi_n) </$$>

<p>
From which we can get some "crude" bounds, by noticing the fact that for any <$>k \in \{ 1, \dots, n-1 \} </$>, <$>0 < (\xi_k - a) < \text{} x - a  </$>, thus:
</p>

<$$> |e(x)| \leq (x-a)^n sup_{t \in (a, x)} |f^{(n)}(t)| </$$>

<p>
However, this is not the end of the story. This bound has a few serious issues. First, it's ugly. By that I mean, it's not something which looks that useful. I would quite
safely say that one can't easily extract that much information about the behaviour of the error from this expression. Second, the bound is very loose. You can notice the fact that as long as the values of
<$>f^{(k)}</$> are bounded by some constants for all <$>k</$> (more formally, <$>\exists A, B \in \mathbb{R} \text{ s.t. } \forall x \in (a, b)</$>, for any valid <$>k</$> one has <$>A < f^{(k)}(x) < \text{} B</$> ),
increasing the number of derivatives we employ in computing our polynomial, that is - increasing <$>n</$> - only provides a better approximation if <$>x</$> is at distance less than 1
from <$>a</$>. This can be mitigated, but it underlines my first point: the bound is ugly, it does not appear to be that helpful. That aside, the loosness of the bound is a real game
killer here, so let's see how we can get to a more reasonable (tighter) bound.
</p>

<h3>The Generalized MVT and Rolle perspective</h3>
<p>
Let's consider the case when <$>n=1</$>. In this case <$>P_n(x)</$> is constant and equal to <$>f(a)</$>. From this we get <$>e(x)=f(x)-P_n(x)=f(x)-f(a)=(x-a)f'(\xi) </$>
for some <$>\xi \in (a, x)</$>. So far nothing new, as this is just a weaker version of some of the expressions we've encountered in the previous section. However the
reason I'm bringing this up is that I want to point out the similarity between Taylor sums and the MVT. In the case of <$>n=1</$>, the error is something involving the first
derivative of <$>f</$>. In the general case (our loose and ugly bound), the error was something involving the n-th derivative of <$>f</$>. Where I am trying to get is that in order to better reason about
Taylor's theorem, one should think of it as a generalized version of the MVT, that is: if the "regular" MVT tells you something about a value of the first derivative of <$>f</$> inside
<$>(a, b)</$> if you know something about the value <$>f</$> at points <$>a</$> and <$>b</$>, the generalized MVT must be something that tells you stuff about the value of the n-th
derivative of <$>f</$> inside <$>(a, b)</$> if you know something more about the value of <$>f</$> at points <$>a</$> and <$>b</$> - and so far, such a result seems to be reachable
using the concept of Taylor polynomials and their approximation error. So hopefully, by imitating the proof of the MVT, we could get a much better bound for the error term of our
Taylor approximation. If you are still not in the clear about our approach, that's alright, hopefully by the end of the next section you'll see where I'm trying to get. Just keep
in mind that our approach to getting a better bound for the error is to imitate the proof of the MVT in order to get to some statement about the higher derivatives of <$>f</$>
inside the interval <$>(a, b)</$>.
</p>

<p>
Before moving on, let's refresh our memory and look over the formal statement and proof of the mean value theorem:
</p>

<$$>\text{If } f:[a, b] \rightarrow \mathbb{R} \text{ is a continuous function which is differentiable on } (a, b) \text{, then } </$$>
<$$>\exists \xi \in (a, b) \text{ such that } f'(\xi)= \frac{f(b) - f(a)}{b - a} </$$>

<p>
The proof relies on Rolle's theorem. This fact is quite intuitive, as in some sense both convey a similar form of argument "tell me something about the values of <$>f</$> on the boundaries
of the interval and you'll deduce something about the value of the derivative inside it. Before going on any further, let's just look over the statement of Rolle's theorem:
</p>

<$$>\text{If } g:[a, b] \rightarrow \mathbb{R} \text{ is a continuous function which is differentiable on } (a, b) \text{ and } g(a)=g(b) \text{, then } </$$>
<$$>\exists \xi \in (a, b) \text{ such that } g'(\xi)=0 </$$>

<p>
The proof of Rolle's theorem is beyond the scope of this article and it isn't necessary to continue our reasoning. If curious, you can find it <a href="https://en.wikipedia.org/wiki/Rolle%27s_theorem">on wikipedia</a>.
</p>
<p>
Now in order to prove the MVT, we will modify the function <$>f</$> in such a way that we can use Rolle's theorem to obtain some information about the derivative. Thus, we will define
a function <$>g</$> such that <$>g(x) = f(x) - (x - a) \frac{f(a) - f(b)}{b - a} </$>. The intuition behind this is quite straight-forward: we can add a linear function to
<$>f</$> to ensure that the resulting function will have equal values at the interval endpoints. Moreover, the derivative of the resulting function only differs from the
one of the original by a constant, so it is very easy to find out the value of the derivative of <$>f</$> at some point if given that of <$>g</$>. Now let's see this in action:
</p>
<$$> g(a) := f(a) + (a - a) \frac{f(a) - f(b)}{b - a} = f(a) \text { and } g(b) = f(b) + (b - a) \frac{f(a) - f(b)}{a - b} = f(a) \text{, thus: } g(a)=g(b) </$$>
<$$> \text{ Therefore: } \exists \xi \in (a, b) \text{ s.t } g'(\xi)=f'(\xi) - \frac{f(a) - f(b)}{b-a} = 0 \text{   } \square </$$>

<p>
Similarly, it's intuitive that to get to a statement and proof for a generalized version of the MVT, one should start from a generalized version of Rolle's theorem. So what should the statement of such
a theorem look like? Well, similarly to where we're trying to get with the generalized MVT, it should be something implything that if something is true involving <$>f</$> at the boundaries of the interval, then there
must be some <$>\xi \in (a, b)</$> such that <$>f^{(n)}(\xi)=0</$>. Moreover, because or end goal is getting some useful bound for the error term, that "something"
that must hold at the boundaries should at least intuitively be connected to what we already know about <$>e</$>. Fortunately we already have a lot of information about
<$>e</$> at the boundaries, that is, the equality: <$>e(a)=e'(a)= \dots = e^{(n-1)}(a)=0 </$>. However, this is clearly not sufficient to imply the existence of such a
<$>\xi</$>. Now let's see what could complete the statement. We know that <$>e</$> and its first <$>n-1</$> derivatives are equal to 0 at <$>a</$> and that we need
something else that would imply the existence of a <$>\xi \in (a, b)</$> such that <$>e^{(n)}(\xi)=0</$>. The only such thing that I can personally think of is the requirement
that <$>e(b)=0</$>. Thus by (the regular) Rolle's theorem, because <$>e(a)=e(b)=0</$>, <$>\exists \xi_1 \in (a, b)</$> such that <$>e'(\xi_1) =0</$>. Now we can apply
Rolle's theorem again, as <$>e'(\xi_1) = e'(a) = 0</$>, thus <$>\exists \xi_2 \in (a, \xi_1)</$> such that <$>f''(\xi_2) = 0</$>. We can iterate this eventually reaching
<$>e^{(n)}(\xi_n)=0</$> for some <$>\xi_n</$> such that <$>a < \xi_n < \xi_{n-1} < \dots < \xi_1 < \text{} b </$>. Now let's write down the full statement of our theorem:
</p>
<$$>\text{If } f:[a, b] \rightarrow \mathbb{R} \text{ is n times differentiable and for all } k \in \{ 0, \dots , n \}, f^{(k)}(a)=0 \text{ and } f(b)=0 </$$>
<$$>\text{Then } \exists \xi \in (a, b) \text{ such that } f^{(n)}(\xi)=0. </$$>

<p>
While this is a cute result, with a statement harder to reach than the proof itself, this is clearly not the end of the story. As you might have noticed, we made the assumption
along the way that <$>e(b)=0</$>, which is quite problematic for many reasons. However, we are not going to find our bound for the error term using this result. Instead,
we are going to adapt <$>e</$> to another function <$>E</$> in such a manner that we can apply the generalized Rolle's theorem to <$>E</$> and used the information gained
about the derivative of <$>E</$> to deduce something about the derivative of <$>e</$>, as we did for the regular MVT. Here is where Louis Lagrange finally comes into play.
</p>

<p>
Before ending this section, I'd like to point out that this result that I've called "the generalized Rolle's theorem" is not actually "the generalized Rolle's theorem", whose statement
you can easily find online. However for the remainder of this article I shall reffer to it as such for convenience.
</p>

<h3>Finally, the Lagrange form of the Remainder</h3>
<p>
For the "regular MVT", in order to ensure that <$>g(a)=g(b)</$> so that we can apply Rolle's theorem, we have added a linear function to our original <$>f</$>. In the case of
higher derivatives, that doesn't work anymore, however it does suggest trying the next simplest thing: a polynomial. In other words, we want to add a polynomial <$>Q</$>
to <$>e</$>, such that the resulting function <$>E(x):=e(x)+Q(x)</$> satisfies the conditions of our generalized Rolle's theorem, that is: for all <$>k \in \{ 0, \dots, n - 1 \} </$>, 
<$>E^{(k)}(a)=0</$> holds and <$>E(b)=0</$>. Let's now see if such a polynomial exists and if yes how can we find it. We know that <$>e(a)=e'(a)=\dots=e^{(n-1)}(a)=0</$>, so by
the linearity of derivation, <$>Q</$> and its first <$>n-1</$> derivatives must be zero at <$>a</$>. Moreover, <$>Q(b)</$> must be equal to <$>-e(b)</$> so that <$>E(b)=0</$>.
The first condition is satisfied if <$>Q</$> has a root of multiplicity at least <$>n</$> at point <$>a</$>. Once enforcing that, we can ensure that <$>Q(b)=-e(b)</$>
bt just "normalizing" the simplest polynomial satisfying the first condition: <$>(x-a)^n</$>, thus we can set <$>Q(x):=-e(b)\frac{(x-a)^n}{(b-a)^n}</$> an
 <$>E(x)=e(x)+Q(x)=e(x)-e(b)\frac{(x-a)^n}{(b-a)^n}</$>. Applying our generalized Rolle's theorem we get:
</p>

<$$>\exists \xi \in (a, b) \text{ s.t. } E^{(n)}(\xi)=e^{(n)}(\xi)+Q^{(n)}(\xi)=e^{(n)}(\xi) - e(b) \frac{n!}{(b-a)^n}=0</$$>

<p>
Considering the fact that <$>e^{(n)}=f^{(n)}</$> and rearranging the terms in the expression above we get:
</p>

<$$>e(b)= \frac{ (b-a)^n }{n!}  f^{(n)}(\xi) </$$>

<p> Which is the kind of error term expression we wanted to get :) </p>
<p>
The thing I find really cute about this approach is that it actually uses <a href="https://en.wikipedia.org/wiki/Lagrange_polynomial">Lagrange interpolation</a> to obtain the
Lagrange form of the Taylor reminder, which is a pretty solid indicator that this might be the way this Taylor remainder was originally discovered.
</p>

<h3>Another Way</h3>
<p>
As with all things mathemagical, there are many ways of deriving the Lagrange form of the reminder in Taylor's theorem. I have chosen to focus on the one above for a few reasons.
First, because it only employ's differentiation. Second, because it actually hints towards the probable thinking process behind the genesis of the concept. And last, but perhaps
most important, because it is a very good example of "reverse-engineering" the intuition behind a result. However there's a much
more straightforward way to get the Lagrange Form of the remainder using integrals. This was actually also the first proof I came up with, but for some reason I was very dissatisfied
with it - as it requires the <$>n^\text{th}</$> derivative of <$>f</$> to be continuous,
so I kept returning to the problem until I reached the solution above. The proof relies almost entirely on the fundamental theorem of calculus and it's iterated application.
</p>

<$$> f(x) = f(a)+ \int^x_a f'(t_1) dt_1 = f(a)+ \int^x_a f'(a) + \int^x_{t_1} f''(t_2) dt_2 dt_1= f(a) + (x-a) f'(a) + \int^x_{a} \int^x_{t_1} f''(t_2) dt_2 dt_1 = </$$>
<$$> f(a) + (x-a) f'(a) + \int^x_{a} \int^x_{t_1} f''(a) + \int^x_{t_2} f'''(t_3) dt_3 dt_2 dt_1 = f(a) + (x-a) f'(a) + \frac{(x-a)^2}{2!} f''(a) + \int^x_{a} \int^x_{t_1} \int^x_{t_2} f'''(t_3) dt_3 dt_2 dt_1 = \dots </$$>

<p>
If we keep iterating this, we'll end up with a longer Taylor polynomial and a nasty looking integral on the right. Fortunartely, the integral MVT comes to our rescue turning that chain of integrals
exactly into the Lagrange form of the reminder.
</p>

<h3>Conclusion</h3>
<p>
    The gold standard of understanding a concept is figuring out how and why you would have come up with the concept yourself :P
</p>

</div>