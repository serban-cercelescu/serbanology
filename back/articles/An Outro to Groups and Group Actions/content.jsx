<div>
<h3>Foreword</h3>
<p>
This is an article I've been wanting to write for a long time. It was initially supposed to be called "an intro to (something)", but I feel that the current title
much better reflects my intentions. The purpose of this article is to shed a bit of light and motivation behind the theory of groups, by presenting their origin
and applicability through a list of examples, while also providing some tools to better visualise and argue about finite groups and their structure. I feel like
the audience that would benefit most from this article would be Oxford undergraduates who've only worked through the first group theory course. For the remainder
of the readers of this article, I have written down some minimal prerequisites below, which are all part of the Oxford's <a href="https://courses.maths.ox.ac.uk/node/37471">
"Groups and Group Actions"</a> course, which is fully covered by the lecture notes written by Richard Earl. The course can be found on the
<a href="https://courses.maths.ox.ac.uk/archive">archive</a> of the Mathematics Department on the academic year 2018-2019 page, in the prelims section. The thing
which determined me to write this article was the realization that Bird's lecture notes, while remarkable in their cohesion and their systematic approach on the
subject matter, fails to provide enough motivation for some of the core concepts it presents, thus not allowing the reader to grasp some of them, forcing them
to treat the theory of groups as some ensemble of very arbitrary rules to manipulate symbols which represent abstract, untangible objects, whose origin is inexplicable.
This is not necessarily as a critique of the course notes, as they, by the nature of course notes, are supposed to as concise as possible while being a comprehensive
resource for the examinable syllabus, which the lecture notes most definetly are and I don't think I could possibly do a better job, as a bit of a beginner in mathematics
and with no sort of formal training in teaching, nor would I raise many objections while confortable that I would have thought about some pedagogical quirk that
Bird hasn't thought of long before me.
</p>
<p>
I have taken the freedom to sacrifice some formalism and rigor for the sake of conciseness, as the article has the purpose to give its reader a more intuitive
perspective of gropus rather than serve as a systematic and rigurous introduction to them. Moreover, so far I have only published articles on topics I've only
recently aquired and only focused on things which I found more difficult to grasp, whereas in this article, I took the risk of overemphasing trivial things for the
sake of clarity and accessibility.
</p>
<p>
Finally, I would like to dedicate this article to one of my classmates (you know who you are), who in some sense say broke my heart when they told me that they can't
feel like they understand anything about groups, while I knew that the lecture notes and problem sheets from the course would not be enough to grasp what a group
can be, and I myself having struggled to get a good grip on them when I was learning group theory and having to read quite more to answer some questions that have
been bugging me.
</p>


<h3>Prerequisites</h3>
<ul>
    <li>The concept of group as a set and an associated operation which obeys certain rules</li>
    <li>The concepts of subgroup, homomorphism, graph and generators</li>
    <li>Lagrange's theorem</li>
    <li>Group Actions</li>
</ul>

<h3>Index</h3>
<ol>
    <li>Visualizing Groups</li>
    <li>An Intuitive Origin of the Concept of Groups</li>
    <li>The Structure of Subgroups</li>
    <li>An Intuitive Origin of the Concept of Normal Subgroups</li>
    <li>Relating Subgroups and Building Subgroups</li>
    <li>Some Nice Educational Problems to Think about</li>
</ol>

<hr/>

<h3>1. Visualizing Groups</h3>
<p>
A great barier to grasping the concept of group is the seeming lack of a method to visualise them.  While mathematics is a field
in which the fact that some abstract objects cannot be visualised and in order to work with them one must get used to reasoning through more abstract representations, I feel
that as long as a visualisation is available, it should be used. After all, one could be an expert on facts about the geology of Pluto without having ever seen even a picture
of the planet, and seeing such a picture probably wouldn't help one find out that much more about the topic, but wouldn't seeing one such picture just feel so good and grounding?
Of course, imagining the Cayley table can be considered such a method, but I do not think there is much insight about a group one could gain by thinking of it, nor do I think
that it's that easy to visualise one. Fortunately, Cailey Graphs come to resque. We'll first define what Cailey Graph are, then proceed to exemplify them by showing Cailey graphs of certain familiar groups.

<ul>
    <li>
        <b>Definition: </b> Given a group <$>(G, *)</$> such that <$>G = \langle g_1, \dots, g_n \rangle </$>, we can obtain a coloured graph in the following way:
        <ul>
            <li>Associate each element of the group a vertex, such that there is a one to one correspondence between the vertices of the graph and the elements of the group</li>
            <li>Associate each one of the generators a unique colour</li>
            <li>For each generator <$>g_k</$> and each element of the group <$>x</$>, draw an edge coloured in the specific colour of <$>g_k</$> from the vertex
            associated to <$>x</$> to the vertex associated to <$>x * g_k</$>.
            </li>
        </ul>
        The resulting structure is called the Cayley graph of the group.<br/>
        Note: For a more formal definition, <a href="https://en.wikipedia.org/wiki/Cayley_graph">wikipedia</a> has an excelent one.
    </li>
</ul>

Now let's see some examples to see this defined structure in action:

<h4>The Cayley Graph of <$>C_5</$> </h4>
<p>
    Denoting <$>C_5 = \langle r \rangle (= \{ e, r, \dots, r^{n-1} \}) </$>, we get: <br />
    [* Insert image here *] <br />
    Each vertex is labeled by its corresponding group element, and an arrow between a vertex <$>x</$> and a vertex <$>y</$> signifies that <$>y = xr</$>.
    We chose only one generator, thus the graph only contains one edge colour. Note that the Cayley graph is defined using the elements of the group <b>and</b>
    the generators, in this case - just <$>r</$>. But <$>C_5</$> is generated by all of its non-identity elements, and choosing any one of them will result in
    a different graph: <br />
    [* Insert image here *] <br /> 
    All of these should serve as a warning that different choices of generators result in different graphs. A consequence of this is that one cannot tell if two
    Cayley graphs correspond to the same group. This fact is even more striking in the next example.
</p>
<h4>The Cayley Graph of <$>C_6</$></h4>
<p>
    Denoting <$>C_6 = \langle r \rangle </$>, we get the following Cayley graph: <br/>
    [* Insert image here *] <br /> 
    However, <$>\{ r^2, r^3 \}</$> also generates <$>C_6</$>, and we get our first example of a Cayley graph with edges with multiple colours: <br />
    [* Insert image here *] <br /> 
    Notice how if you start from any node
</p>

<h4>The Cayley Graph of <$> D_6 </$> </h4>
    Denoting <$>D_3 = \{ e, s, r, rs, r^2, r^2 s \} = \langle s, r \rangle </$>, we get the following Cayley graph:
    [* Insert image here *] <br /> 
    
<h4>The Cayley Graph of <$> S_3 </$> </h4>

<h4>The Cayley Graph of <$> A_4 </$>  </h4>

<h4>Cayley Graphs as a Multiplication Table</h4>

<h4>Neat Looking </h4>

<h4>The Irresistible Category Theory Reference</h4>
Before continuing any further with this subject I would like to state the fact that reading this subsection is not necessary for understanding the rest of the article's content.

<h4>End Note</h4>
I feel like I could not end this section without mentioning the book <a href="https://books.google.co.uk/books/about/Visual_Group_Theory.html?id=T_o0CnMZecMC">"visual group theory"</a> which basically teachest most of the essential parts of group theory
purely through Cayley Graphs, to the point where Cayley Graphs are introduced before defining groups algebraically. Reading it served fifteen or sixteen year old me as the smoothest and most exciting introduction to the theory of groups I could get as someone
who has just started getting into maths. Even if you are familiar with groups already, I feel like reading it would just be a nice experience and serve as a very cute way of reffering to and presenting groups from time to time. <br />
</p>


<h3>2. An Intuitive Origin of the Concept of Groups</h3>
<p>
Before actually providing one, I feel like I have to explain what I mean by an <i>intuitive</i> origin. Very often throughout one's mathematical education, one gets
a working knowledge of some concept but has the feeling that they don't actually understand the concept. I have very often had this experience myself, read of that of others
and saw friends going through it. At some point I started wondering what kind of knowledge one should aim for such that this feeling (which I can quite safely say is
almost universal in fellow maths students) goes away. After quite a few years I arrived at a conclusion which satisfied this curiosity and proved to be quite true, at
least in my case: <u>I only feel like I properly understand a concept when I understand how I would have discovered the concept myself if I worked enough with other related mathematical
objects that I can already understand</u>. In the case of groups, they arise from group actions. While this might sound quite paradoxical at first to some readers, there is
some good reasonging behind it. The purpose of this section is to outline how, through enough investigation of more natural and intuitive concepts one could arrive at the concept of groups.
</p>
<p>
Before considering group actions, let's explore the more general concept of "action". We will first outline the concept of action and then combine all the properties such
an "action" must have. At its core, an action is a formal way of expressing the way some transformations change some objects. We can represent this as a tuple <$>(T, S, \rho)</$>,
where <$>\rho : T \times S \rightarrow S </$> is a function that takes a transformation from <$>T</$> and an object from <$>S</$> and returns "the transformed object". Let's
go through a silly example: <$>T = \{ \text{bake}, \text{eat} \} </$> <$>S = \{ \text{unbaked pie}, \text{baked pie}, \text{burnt pie}, \text{no pie} \} </$>. And <$>\rho</$> takes the following values:
<$> \rho(\text{bake}, \text{unbaked pie}):=\text{baked pie} </$>, <$> \rho(\text{bake}, \text{baked pie}):=\text{burnt pie} </$>, <$> \rho(\text{bake}, \text{burnt pie}):=\text{burnt pie} </$>,
<$> \rho(\text{bake}, \text{no pie}):=\text{no pie} </$> and for all <$>x \in S</$> we naturally have <$>\rho(\text{eat}, x) = \text{no pie}</$>. This pattern occurs very often in mathematics
- the ensemble of a set of transformations, a set of objects and a function that defines how the transformations change these objects.
</p>
<p>
Let's think for a bit about what transformations are. Intuitively, they are matematical objects which take an object <$>x</$> to another object <$>y</$>. Such an object very much sounds like
a function, and in fact, transformations are equivalent to functions from <$>S</$> to <$>S</$>. Let's consider an arbitrary action <$>(T, S, \rho)</$>. For any transformation <$>t \in T</$>,
we can define <$>\theta_t : S \rightarrow S</$>, where for all <$>x \in S, \theta_t (x) := \rho(t, x)</$>. While this might feel trivial, I feel like I have to state the fact that an action
<$>(T, S, \rho)</$> and the set of the functions corresponding to its transformations, be it <$>F_\rho :=\{ \theta_t : T \rightarrow S | \forall s \in S . \theta_t (s) = \rho(t, s) \} </$>, are equivalent,
as in we can find the values that <$>\rho</$> takes for all of its possible arguments from the set <$>F_\rho</$> and we can obtain the set <$>F_\rho</$> from <$>\rho</$> the values that <$>\rho</$> takes,
that is one can define <$>\rho</$> in terms of <$>F_\rho</$> and one can define <$>F_\rho</$> in terms of <$>\rho</$>. One way of formalizing this is defining a bijective function <$>\Theta : T \rightarrow F_\rho </$>,
where for any <$>t \in T</$>, <$>\Theta (t) = \theta_t</$>.
</p>
<p>
So in the last two paragraphs, we've introduced the intuitive concept of action and outlined the natural observation that actions are in some sense equivalent to a set of functions from objects to objects
(i.e. functions from <$>S</$> to <$>S</$>). This is the paragraph where the magic happens, that is, where we get our binary operation. To get to that, notice the fact that we can compose transformations:
<$>\rho(t_1, \rho (t_2, s)) = \theta_{t_2} ( \theta_{t_1} (s) ) = (\theta_{t_1} \circ \theta_{t_2}) (s) </$>. Now notice the fact that composing two transformations is in some sense a binary operation that
takes two transformations and returns another transformation. This is how we are going to get to a natural definition of groups, but first, let's try and formalize all of the concepts so far.
</p>
<ul>
    <li>An action is a pair of sets <$>T</$> and <$>S</$> endowed with a function <$>\rho : T \times S \rightarrow S</$></li>
    <li>The transformation structure of an action <$>\rho</$> is the pair <$>(F_\rho, \circ)</$> where <$>F_\rho</$>is the set of functions <$>\{ \theta_t : T \times S \rightarrow S | t \in T, \forall s \in S, \theta_t(s)=\rho(t, s) \}</$> correspondent
    to the transformations of the action and <$>\circ</$> is just the composition of these function</li>
    <li>The algebraic structure of an action is a pair <$>(T, *)</$>, where <$>*:T \times T \rightarrow T</$> is a function which takes two transformations and returns the transformation corresponding to their compositions, that is: for all <$>x, y, z \in T</$>, <$>x*y=z</$> if and only if <$>\theta_x \circ \theta_y = \theta_z</$></li>
</ul>
<p>
There are a few things to note here. First, that the "algebraic structure" is basically the same thing as the "transformation structure". While that is true, it's important to note that the "algebraic structure" totally "abstracts away" the set of objects, as you can be given <u>just</u> a pair <$>(T, *)</$> devoid of any reference to <$>S</$>, you can reason about the transformations
that <$>T</$> induces on <$>S</$> without having any idea what <$>S</$> looks like (think of recieving <$>*</$> in the form of a multiplication table). In other words, by studying general such "algebraic structures" independently of the actions they can stem from, one basically studies the <i>general</i> way in which transformations can possibly compose
with each other. Second, 

Second - need for totality and modulo equivalence, the algebraic structure and the transformation structure don't exists sometimes.

Third - associativity

</p>
<p>
Let <$>T=\{ e, a, b, c \}</$> and <$>S = \{ \text{AB}, \text{BA}, \text{XY}, \text{YX} \}</$> (just for the sake of clarity: the elements of <$>S</$> are just some two letter combinations). Instead of just writing down the values
that <$>\rho</$> takes for each transformation-object pair, I'll give the following pictorial representation of <$>\rho</$>, where to compute <$>\rho(t, s)</$>, just find the vertex in the diagram corresponding to <$>s</$> and follow the
edge from <$>s</$> correspodning to the transformation <$>t</$>.


</p>


<br />
<br />
*[Things to do:
    <ul>
        <li>Consider the problem of integrating associativity into the </li>
        <li>Move on to reversible transformations</li>
        <li>Expose groups as T and the binary operation on T - the structure of reversible transformations</li>
        <li>Go on a bit further on how to extract the group axioms</li>
        <li>Say some really nice things about the concept of group and their power</li>
        <li></li>
        <li>On a final note, talk about associativity and why it was needed</li>
    </ul>
*]

<h3>3. The Structure of Subgroups</h3>
<p>
    Ordering of subgroups by inclusion, <br />
    Meets and joins in this order, <br />
    Draw out some lattices, <br />
</p>

<h3>4. An Intuitive Origin of the Concept of Normal Subgroups</h3>
<p>
    
</p>


<h3>5. Relating Subgroups and Building Subgroups</h3>
<p>

</p>

<h3>6. Some Nice Educational Problems to Think about</h3>
<ul>
    <li>Let <$>G</$> be a finite group and <$>H \le G, N \triangleleft G, H \cap N = \{ e \} </$></li>
    <li></li>
</ul>


</div>