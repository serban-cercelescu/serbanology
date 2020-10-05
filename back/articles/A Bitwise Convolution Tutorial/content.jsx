<h3>Prerequisites</h3>
<ul>
    <li><a href="http://math.mit.edu/~gs/linearalgebra/">Linear Algebra</a></li>
    <li><a href="https://codeforces.com/blog/entry/43499">FFT</a></li>
</ul>
<h3>An introduction</h3>
<p>
    <i><a class="nodec" href="https://youtu.be/N_dUmDBfp6k?t=28">It is an important and popular fact</a></i> that the things that we classify as FFT on code-drills, are not always actual fast fourier transforms (if we're being overly-technical). Suppose you are given two arrays <$>A</$> and <$>B</$> and an operation <$>*</$>. We will call the <$>*</$> convolution of <$>A</$> and <$>B</$> the array <$>C</$>, such that:
    <$$>
        C_p = (A*B)_p = \sum_{i*j=p}{A_i B_j}
    </$$>
    In the case of actual FFT, <$>*</$> is addition, but it might as well be something else, like AND, OR, XOR, or something like gcd or lcm that require techniques far less advanced than the ones presented in this article, intended to introduce the (<i>*sighs* </i> rare) reader to techniques that allow us to efficiently compute such convolutions by linear algebraic means.<br/>
    I will also present the solutions to some problems that involve these techniques such as <a href="https://csacademy.com/contest/archive/task/random_nim_generator">Random Nim Generator</a>.
</p>
<h3>Throwback to FFT</h3>
<p>
    As you should know, FFT is basically a divide and conquer algorithm designed to reduce the complexity of the multiplication of a vector with a specific <a href="https://en.wikipedia.org/wiki/Vandermonde_matrix">Vandermonde matrix</a>:
    <$$>
        V_n = 
        \begin{bmatrix}
            \omega^{0 \cdot 0}  & \omega^{0 \cdot 1} & \omega^{0 \cdot 2} & \dots  & \omega^{0 \cdot n} \\
            \omega^{1 \cdot 0}  & \omega^{1 \cdot 1} & \omega^{1 \cdot 2} & \dots  & \omega^{1 \cdot n} \\
            \vdots              & \vdots             & \vdots             & \ddots & \vdots \\
            \omega^{n \cdot 0}  & \omega^{n \cdot 1} & \omega^{n \cdot 2} & \dots  & \omega^{n \cdot n}
        \end{bmatrix}
        \large{
        , \omega=e^{ \frac{2\pi i}{n} } } 
    </$$>
    Let's recap a bit the FFT process:
</p>
<ul>
    <li>
        We define the product operation <$>*</$> on two vectors as the following: given two vectors <$>A</$> and <$>B</$>, <$>A*B=C</$>, where <$>|C|=|A|+|B|-1</$> and 
        <$$>
            C_p = \sum_{k=0}^{p}{A_k B_{p-k}}
        </$$>
        <i>Note: Despite the horrific notation colision, in the reminder of the article <$>|V|</$> will denote the number of elements in the corresponding array of vector <$>V</$>.</i>
    </li><br/>
    <li>
        Using the definition, the operation uses <$>O(|A| |B|)</$> time, so we resize our vectors to the smallest power of two larger than <$>|A|+|B|</$> (let that power of two be <$>n=2^\text{some exponent}</$>). And multiply each of these vectors with <$>V_n</$> to obtain <$>A'</$> and <$>B'</$>. We define <$>C'=A' \odot B'</$>, where <$>\odot</$> denotes element by element multiplication (e.g.: <$> (A \odot B)_i = A_i \cdot B_i </$> ), and we multiply <$>C'</$> with <$>V_n^{-1}</$> to obtain the desired <$>C</$> matrix. In short:
        <$$>
            C=V_n^{-1}((V_n A) \odot (V_n B))
        </$$>
        where <$>A</$> and <$>B</$> have already been resized to <$>n</$>.
        This works because our <$>*</$> operation is equivalent to polynomial multiplication, and multiplying a vector <$>P=[P_0, P_1, \dots, P_n]</$> with <$>V_n</$> esentially evaluates a polynomial at the roots of unity:
        <$$>
            (V_nP)_t = \sum_{k=0}^{n}{P_k \omega^{tk}}
        </$$>
        So <$> ((V_n A) \odot (V_n B))_k </$> is equal to the product of the corresponding polynomials of <$>A</$> and <$>B</$> evaluated at <$>\omega^k</$> and multiplying the <$>((V_n A) \odot (V_n B))</$> vector with <$>V_n^{-1}</$> basically interpolates the polynomial from the values evaluated at all these roots of unity.
    </li><br/>
    <li>
        Now let's see how we multiply such a vector with <$>V_n</$> fast, or because FFT is among the prerequisites, why the algorithm works from a linear algebraic point of view.

    </li><br/>
    <li>
        Basically, after applying a permutation to the initial vector, at each level (value of step), it divides the sequence into buckets of length step*2 and multiplies the vector <$>S</$> correspondent to that bucket with a matrix <$>M_\text{step}</$> that looks like this:
        
        <$$>
            M_\text{step} = 
            \begin{bmatrix}
                1 & 0 & 0 & 0 & \dots & 0 & \omega^{0} & 0 & 0 & 0 & \dots & 0 \\
                0 & 1 & 0 & 0 & \dots & 0 & 0 & \omega^{1} & 0 & 0 & \dots & 0 \\
                0 & 0 & 1 & 0 & \dots & 0 & 0 & 0 & \omega^{2} & 0 & \dots & 0 \\
                0 & 0 & 0 & 1 & \dots & 0 & 0 & 0 & 0 &\omega^{3}  & \dots & 0 \\
            
                \vdots & \vdots & \vdots & \vdots &\ddots & \vdots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots  \\
                0 & 0 & 0 & 0 & \dots & 1 & 0 & 0 & 0 & 0 & \dots & \omega^{\text{step} - 1} \\
                1 & 0 & 0 & 0 & \dots & 0 & -\omega^{0} & 0 & 0 & 0 & \dots & 0 \\
                0 & 1 & 0 & 0 & \dots & 0 & 0 & -\omega^{1} & 0 & 0 & \dots & 0 \\
                0 & 0 & 1 & 0 & \dots & 0 & 0 & 0 & -\omega^{2} & 0 & \dots & 0 \\
                0 & 0 & 0 & 1 & \dots & 0 & 0 & 0 & 0 & -\omega^{3}  & \dots & 0 \\
            
                \vdots & \vdots & \vdots & \vdots &\ddots & \vdots & \vdots & \vdots & \vdots & \vdots & \ddots & \vdots  \\
                0 & 0 & 0 & 0 & \dots & 1 & 0 & 0 & 0 & 0 & \dots & -\omega^{\text{step} - 1} \\
            
            \end{bmatrix}
            \large{
            , \omega=e^{\frac{2\pi i}{\text{step}}} }
        </$$>
        Multiplying <$>M_\text{step}</$> with <$>S</$> takes <$>O(\text{step})</$> time, because the matrix is sparse. This multiplication is found in the <code class="language-cpp">for (int pos = 0; ...)</code> loop. Now as you might expect, FFT basically decomposes <$>V_n</$> into a product of these matrices and a permutation matrix. So
        <$$>
            V_n = (I_2^{\otimes (\log{n})-1} \otimes M_1) (I_2^{\otimes (\log{n})-2} \otimes M_2) \dots (I_2^{\otimes 1} \otimes M_\frac{n}{4}) M_\frac{n}{2} (\text{"The permutation matrix"})
        </$$>
        Where '<$> \otimes </$>' denotes the <a href="https://en.wikipedia.org/wiki/Kronecker_product">Kronecker product</a>, a key operation troughout the whole of this article and you must know at least its definition to grasp the remainder of this article. In this particular case, you may interpret it as <$>M_\text{step}</$> is applied on all the buckets (i.e. the Kroneker product distributes the <$>M_\text{step}</$> multiplication on each of the buckets). The proof of the equivalence of this decomposition to <$>V_n</$> is based on induction and quite beyond the scope of this article.        
    </li>
</ul>
<h3>The Bitwise Convolutions Matrices</h3>
<p>
    Now that there we're done with the <i>short</i> "classical FFT" recap, we may dive into XOR, AND and OR covolutions, and there is good news! They are quite easier to understand, don't require complex numbers or roots of unity in some field, run much faster and are shorter to code. All of that matrix decomposition maths was there to point out the fact that most convolution algorithms (but not gcd convolution for example) are based on such matrix decompositions and present a familiar example, even though it is one of the most complex ones from this perspective.<br/><br/>
    Remember the <$>C=V_n^{-1}((V_n A) \odot (V_n B))</$> relation from the beginning of the article? Let's change <$>V_n</$> to <$>T_n</$> (for "transformation") to avoid confusion. Now the meaning of <$>C=T_n^{-1}((T_n A) \odot (T_n B))</$> is that we apply some transformation to each of the vectors, obtain another vector trough one by one multiplication ('<$>\odot</$>') and then reverse the transformation in order to get the result of the convolution. Looking at this equation from above, <$>T_n</$> (the transformation) is the unknown. In the case of "classical FFT", the vandermonde matrix over the roots of unity worked, but now we must find another that yelds the XOR convolution for example. Let's see how we find out the values of <$>T_n</$> in that case!<br/>
    We will use <$> \oplus </$> as the operator symbol of XOR, as it is shorter and looks fancier and <$>\$</$> as the XOR convolution symbol. Also, <$>n</$> will be a power of two to ensure that everything is contained.<br/>
    Let's see how this convolution would work for vectors of size 2.
    By definition:
    <$$>
        (A\$B)_p=\sum_{k=0}^{n - 1}{A_k B_{k \oplus p}}
    </$$>
    Additionally:
    <$$>
        (A\$B)_p=T_n^{-1}((T_nA) \odot \ (T_nB))
    </$$>
    And we'll set
    <$$>
        A=
        \begin{bmatrix}
        a_0 \\
        a_1 \\
        \end{bmatrix},

        B=
        \begin{bmatrix}
        b_0 \\
        b_1 \\
        \end{bmatrix},
    
        T_2=
        \begin{bmatrix}
        w & x \\
        y & z \\
        \end{bmatrix}
    
        </$$><$$> \text{so} </$$><$$>
    
        A\$B=
        \begin{bmatrix}
        a_0b_0 + a_1b_1 \\
        a_0b_1 + a_1b_0 \\
        \end{bmatrix}
    </$$>
    So now we can start solving for <$>T_2</$>.
    <$$>
        (A\$B)_p = T_n^{-1}((T_nA) \odot \ (T_nB)) 
        \implies 
        T_n (A\$B) = (T_nA) \odot \ (T_nB)
    
        \implies </$$><$$>
        
        \begin{bmatrix}
        w & x \\
        y & z \\
        \end{bmatrix}
        \begin{bmatrix}
        a_0b_0 + a_1b_1 \\
        a_0b_1 + a_1b_0 \\
        \end{bmatrix}
        = 
        \begin{bmatrix}
        w & x \\
        y & z \\
        \end{bmatrix}
        \begin{bmatrix}
        a_0 \\
        a_1 \\
        \end{bmatrix}
        \odot
        \begin{bmatrix}
        w & x \\
        y & z \\
        \end{bmatrix}
        \begin{bmatrix}
        b_0 \\
        b_1 \\
        \end{bmatrix} 
    
        \implies </$$><$$>
    
        \begin{bmatrix}
        w (a_0b_0 + a_1b_1) + x (a_0b_1 + a_1b_0) \\
        y (a_0b_0 + a_1b_1) + z (a_0b_1 + a_1b_0) \\
        \end{bmatrix}
        =
        \begin{bmatrix}
        w a_0 + x a_1 \\
        y a_0 + z a_1 \\
        \end{bmatrix}
        \odot
        \begin{bmatrix}
        w b_0 + x b_1 \\
        y b_0 + z b_1 \\
        \end{bmatrix}

        \implies </$$><$$>
        
        \begin{bmatrix}
        w (a_0b_0 + a_1b_1) + x (a_0b_1 + a_1b_0) \\
        y (a_0b_0 + a_1b_1) + z (a_0b_1 + a_1b_0) \\
        \end{bmatrix}
        =
        \begin{bmatrix}
        (w a_0 + x a_1) (w b_0 + x b_1) \\
        (y a_0 + z a_1) (y b_0 + z b_1) \\
        \end{bmatrix}
    
        \implies </$$><$$>
    
       \begin{bmatrix}
        w (a_0b_0 + a_1b_1) + x (a_0b_1 + a_1b_0) \\
        y (a_0b_0 + a_1b_1) + z (a_0b_1 + a_1b_0) \\
        \end{bmatrix}
        =
        \begin{bmatrix}
        w^2 a_0b_0 + x^2 a_1b_1 + wx (a_0b_1 + a_1b_0) \\
        y^2 a_0b_0 + z^2 a_1b_1 + wx (a_0b_1 + a_1b_0) \\
        \end{bmatrix}
    </$$>
    Now, because <$>a_0, a_1, b_0, b_1</$> are variables, this gives us a system of equations:
    <$$>
        \begin{cases}
        w^2=w,
        x^2=w,
        x=wx \\
        y^2=y,
        z^2=y,
        z=yz \\
        \end{cases}
    </$$>
    Which has the following solutions:
    <$$>
        (w,x) \in \{(0, 0), (1, 1), (1, -1) \} \\
        \land \\
        (y,z) \in \{(0, 0), (1, 1), (1, -1)\}
    </$$>
    But there is a catch, <$>T_2</$> must be invertible. That is <$>\det{T_2} \neq 0</$>, which leaves us with these solutions
    <$$>
        T_2 \in \left \{
        \begin{bmatrix}
        1 &  1 \\
        1 & -1 \\
        \end{bmatrix},
        
        \begin{bmatrix}
        1 & -1 \\
        1 &  1 \\
        \end{bmatrix}
        \right \}
    </$$>
    And indeed, these are the the matrices whose correspondend transformation gives us the XOR convolution for arrays of length <$>n=2</$>. So we'd better figure out a way to extend this to larger powers of 2, let's say <$>n=2^k</$>. Then, the transformation matrix would be <$>T_n=T_2^{\otimes k}</$>, which in our case is the <a href="https://en.wikipedia.org/wiki/Hadamard_matrix">Hadamard Matrix</a>. The proof of this, again is based on induction (and actually not that hard) and will appear in case of popular demand. But the main principle behind it is that for XOR, OR and AND, the bits are independent and the Kroenenker product has a distributive multiplication efect, as in the case of "classical FFT", on the sequence partitioned in buckets of size 2, then 4, then 8 etc.<br/>
    There's just one more thing to point out about the kroneker product:
    <$$>
        (M^{\otimes n})^{-1} = (M^{-1})^{\otimes n}
    </$$>
    <br/>
    Let's see how we efficiently multiply these kroneker products with vectors if 
    <$$>
        T_2=
        \begin{bmatrix}
        w & x \\
        y & z
        \end{bmatrix}
        \implies
        T_2^{-1}=
        \frac{1}{wz-xy}
        \begin{bmatrix}
         z & -x \\
        -y &  w \\
        \end{bmatrix}
    </$$>
</p>


<p>
    And in case you want a XOR convolution, just set <$>w, x, y, z</$> to the values from the specific XOR transformation matrix.
</p>
<h3>Some Pen and Paper Exercises</h3>
<ul>
    <li>Find <$>T_2</$> for OR and AND transforms</li>
    <li>Given an operation that "ORs" the first bit, "ANDs" the second bit, "XORs" the third one and then repeats, find the transformation matrix for such a convolution on arrays of <$>k</$> bits (of length <$>n=2^k</$>). </li>
    <li>Find a transformation matrix where the operation is XOR but in base 3 (addition with no carry).</li>    
</ul>
<a href="https://csacademy.com/contest/archive/task/random_nim_generator"><h3>Random Nim Generator</h3></a>
<p>
    <i>"How many sequences of length <$>n</$> containing numbers from <$>0</$> to <$>k</$> have their total XOR sum greater than <$>0</$>?"</i><br/>
    Let's see a dp approach!
    <$$>
        \text{dp[a][b]} = \sum_{i=0}^{k}{dp[a - 1][i \oplus b]}
    </$$>
    where <$>\text{a}</$> is the number of elements taken so far and <$>\text{b}</$> is their current XOR sum. And the dp is initialized with <$>\text{dp[1][i]}=1, \forall i \in [0..k] \text{ and } 0 \text{ in rest}</$>.<br/>
    Let's define <$>K=[1, 1, 1, ..., 1, 0, 0, ..., 0]</$> (the first k + 1 values are <$>1</$> and the rest are <$>0</$>, the array's length being the smallest power of <$>2</$> greater or equal to <$>k</$>). Now we can write the recurrence as
    <$$>
        \text{dp[a]} = \text{dp[a-1]}\$K \\
        \text{but} \\
        \text{dp[1]}=K \\
        \text{so} \\
        \text{dp[a]} = K\$K\$K\$ \dots \$K \text{ (a times)}
    </$$>
    So you just have to use the XOR transform on <$>K</$> convolute it with itself <$>n</$> times and output the sum of the values of the non-zero positions of the resulting vector.<br/>
    <a href="https://csacademy.com/code/mBPsczRP/">Here</a> is my source code.
</p>
<a href="https://csacademy.com/contest/archive/task/and-closure/"><h3>AND closure</h3></a>
<p>
    Just apply a "self-AND-convolution" to the frequency array log times and output the positions with non-zero corresponding values.<br/>
    <a href="https://csacademy.com/code/Be3hr4Gh/">Here</a> is my source code.
</p>
