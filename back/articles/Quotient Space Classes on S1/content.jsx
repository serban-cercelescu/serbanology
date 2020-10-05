<h2>Quotient Space Classes on S<sup>1</sup></h2>
<h3>Prerequisites</h3>
<ul>
    <li><a href="https://en.wikipedia.org/wiki/General_topology">Some point-set topology notions</a></li>
    <li><a href="https://en.wikipedia.org/wiki/Dynamic_programming">DP</a></li>
</ul>
<h3>Foreword</h3>
<p>
    Even though 30 minute reads shouldn't come with a foreword, I felt the need to write one now.
    I'd like to thank (and apologise to) my girlfriend for putting up with me when this problem came to me at a New Year's Eve party, when I spent a few hours staring into the distance while surrounded by people, then left for a few hours more to write it all down.
</p>
<h3>Abstract</h3>
<p>
    This article focuses on the <a href="https://en.wikipedia.org/wiki/Quotient_space_(topology)">quotient spaces</a> of \(S^1\), where each equivalence class is finite.
    In simpler terms, consider a circle (\(S^1\)).
    You are allowed to take two points of it and join them.
    You may do this repeatedly.
    The shapes you might obtain look something like this:
</p>
<img src="../pictures/carousel1.jpg" style="display: block; margin: auto"/>
<p>
    We shall explore a few problems involving these objects and analyse some of their proprieties. Throughout the article we will call these shapes <i>carousels</i> and only consider them modulo <a href="https://en.wikipedia.org/wiki/Homeomorphism">homeomorphisms</a>.
</p>
<p><i>
    Disclaimer: I haven't been able to find the standard name of these objects or any related notation so I have used my own.
    If you happen to know anything about them, please let me know so I can change it.
</i></p>

<h3>A Basic Analysis and Representation</h3>
<p>
    First of all, it is obvious that all these may be represented as connected graphs, where the vertices are the non-locally euclidean points and the edges are the paths connecting them.
    This begs the questions of which graphs can be obtained from such quotient spaces.
    A first observation is that all vertices have even degree. \(S^1\) has no vertices, but all carousels can be obtained from \(S^1\) with only a pair of points glued together.
    We shall call this basic carousel \(C^{(1,1)}\) (shown in the picture below). 
</p>
<img src="../pictures/carousel2.jpg" style="display: block; margin: auto"/>
<p>
    The proof of this observation is inductive.
    All carousels must start from \(C_{(1, 1)}\), because their construction always begins with joining two points.
    Then, whenever you merge two points, by the induction hypothesis they already have an even degree, the degree of the resulting degree is the sum of the original points' degrees plus two times the number of common edges, which is even.
    So vertices in all carousels have even degree.
    This means that their corresponding graphs are eulerian.
    This begs the question whether all eulerian graphs have a corresponding carousel or not.
    The answer is no, but if we only consider eulerian graphs without vertices of degree two, then yes.
    The proof of this statement contains quite a fews steps, and I will reveal it by the end of this topic.
    This also implies that not all carousels have corresponding planar graphs, which is interesting but expected (a counterexample is in the picture below). 
</p>
<img src="../pictures/carousel3.jpg" style="display: block; margin: auto"/>
<p>
    Let's look at a more useful way of representing carousels. A picture is worth a thousand words:
</p>
<img src="../pictures/carousel4.jpg" style="display: block; margin: auto"/>
<p>
    Basically, we can encode carousels through the relative order of our equivalence classes with more than one element. Because all equivalence classes are partitions, we can just use the sequence representation of a partition to encode our carousel. If we want to turn such a sequence (be it \(s_1, s_2, s_3, \dots, s_n\)), into the corresponding graph of the carousel, we just have to add an edge between \(s_i\) and \(s_{i+1}\) (considering \(s_{n+1}=s_1\)) for each \(i \in [1..n]\). If we want the sequence representation starting from the corresponding eulerian graph of a carousel, we just need to take it's euler tour. We can take the euler tour of any graph, so for each eulerian graph there is a correspondent sequence representation of a carousel. But these sequences must contain each element value at least twice, as our quotient space equivalence classes must have at least two elements to be non-redundant modulo homeomorphisms. This implies that every connected eulerian graph without verices of degree two has a corresponding carousel. I must state that the partition sequence representation of a carousel is not unique, as the euler tour of an eulerian graph may not be unique. 
</p>

<h3>"The Join Order"</h3>
<p>
    From this point, more notation must be introduced:
</p>
<ul>
    <li>\(C\) is the set of all carousels</li>
<!--    <li>\(C_m\) is the set of carousels with \(m\) edges</li>
    <li>\(C^n\) is the set of carousels with \(n\) vertices</li>
    <li>\(C^n_m = C^n \cap C_m \)</li> -->
    <li>\(V: C \rightarrow \N, V(a) = \text{["the number of vertices in a"]} \)</li>
    <li>\(E: C \rightarrow \N, E(a) = \text{["the number of edges in a"]} \)</li>
    <li>We will the denote the fact that a carousel \(a\) can be turned into another carousel \(b\) by joining only two points by \(a \rightarrow b\)</li>
    <li>Given \(a, b \in C\) if \(\exists t_1, t_2, \dots, t_n \in C \) such that \(a \rightarrow t_1 \rightarrow t_2 \rightarrow \dots \rightarrow b\), then we can write \(a \rightarrow^* b\) </li> 
</ul>
<p>
    We want to show that \( (C, \rightarrow^*) \) defines an order.
    Transitivity and reflexivity are given by definition, what remains is to show that the relationship \(\rightarrow^*\) is antisymmetric.
    Which comes from the fact that \(\forall a, b \in C\) such that \(a \rightarrow b \implies E(a) - V(a) \leq E(b) - V(b) + 1\) so we have an invariant strictly increasing with each join.
</p>
<p>
    So \( (C, \rightarrow^*) \) forms an order structure, which is kinda mindblowing, given that this means that we can compare some eulerian graphs.
    Now I must dissapoint my reader and tell you that graph isomporphism polynomialy reduces to comparing two carousels.
    The proof is quite straightforward:
</p>
<p>
    Suppose we want to show that two graphs \(A\) and \(B\) are isomorphic.
    Apply the following transformation to obtain \(A'\) and \(B'\): for each edge of a graph, double it (create another parallel edge).
    Now our graphs are eulerian, as all vertices have even degree.
    This means that they have corresponding carousels, let them be \(a\) and \(b\). If \(E(a) - V(a) \neq E(b) - V(b)\) then obviously \(A\ncong B\).
    But if our invariants are equal, then the only way \(A \rightarrow^* B\) or \(B \rightarrow^* A\) is if \(A \cong B\).
    So graph isomporhism reduces polynomialy to carousel comparison. 
    For the same reason, the decision problem of whether two carousels are comparable is also at least as hard as graph isomorphism.
    I haven't been able to prove yet if carousel comaprison reduces to graph ismorphism.
</p>
<p>
    A very interesting consequence of this is having a stronger version of the graph isomorphism problem.
    Also we get a generalization of the problem by using different \(\rightarrow\) transitions and starting from a topological space different than \(S^1\).
    Of course, this is not solvable in the general case, but yields an interesting range of problems.
</p>
<p>
    The transformation we used also proves quite useful in extending our circuit representation for graphs beyond eulerian graphs, enabling us to compare them, because we can just compare \(a\) and \(b\) from \(A'\) and \(B'\).
    This transformation also has the useful propriety that if \(a \rightarrow^* b\) then \(a' \rightarrow^* b'\) and \(a \rightarrow^* a'\).
    Proof sketch: concatenate the sequence representations of the circuits with themselves, the elements from the second halves may just be joined with their first halves equivalents. 
</p>

<h3>More on the Order Structure</h3>
<p>
    Of course, this order structure analysis couldn't end without some study on the structure itself.
</p>

<h3>Counting Carousels</h3>
<p>
    
</p>

<h3>Pointed Carousels</h3>
<p>
    Note: so far we have defined carousels as quotient spaces on \(S^1\) where each equivalence class is finite.
    But there is something we haven't considered so far.
    If the number of equivalence classes with more than one element isn't finite (we shall refer to these objects as infinite carousels and to the rest infinite), we obtain shapes we haven't considered so far.
    The scope of this article is only to describe the finite ones. 
</p>
<p>
    I've mentioned at the beginning of the article that all carousels start from \( C_{(1, 1)} \).
    This is important, because \( C_{(1, 1)} \) has a vertex that we can retain throughout our transformation (hence the carousel becomes pointed).
    Formally, we can now represent carousels as pairs \( (p,  \text{\textasciitilde} ) \) between a point \(p \in S^1\) and a quotient space \(\text{\textasciitilde}\) that obeys our constraints. We will denote the set of pointed carousels with \(K\).
    We will call two pointed carousels \( (p_1, f_1) \) and \( (p_2, f_2) \) equivalent if there exists a homeomorhism \( f : (S^1 / f_1) \rightarrow (S^1 / f_2) \) such that \( f(p_1)=p_2\).
</p>
