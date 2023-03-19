### Prerequisites
* [Some combinatorics](https://books.google.co.uk/books/about/Principles_and_Techniques_in_Combinatori.html?id=dN6CQgAACAAJ&redir_esc=y)

### Abstract

The scope of this article is presenting an interesting graph counting problem and its equivalently interesting solution. You may find the original statement in Romanian [here](https://infoarena.ro/problema/ubergraf). I personally think that equipped with this solution, ubergraph is one of the most interesting problems I've ever encountered in my competitive programming journey.

### The Problem Statement

We define an ubergraph as a directed acyclic graph with the propriety that no two nodes have the same set of out-neighbors. Given a number N ($\le$ 300), find the number of unlabelled ubergraphs of N nodes.

*For simplicity, let's call the propriety of our [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) that no two nodes have the same out-neighbors *the distinction propriety*.
**We shall also denote the set of nodes as V, the set of directed edges E and set of out-neighbors of node $x$ as $g(x)$.
***Because of the lack of automorphisms that we'll see later, an ubergraph is just a made up term for an [asymmetric DAG](https://en.wikipedia.org/wiki/Asymmetric_graph).

### My Thought Process and Solution

As this is a counting problem, we have to approach possibilities: a direct combinatorial formula or a DP. The limit though, seems quite small for any popular combinatorics technique and this is a strong suggestion that the solution is a DP.
Even if knowledge of such formalities isn't required in solving the problem, we can think about the restriction as a way of saying that the graph has no automorphisms except for the identity function ( a function $ f:V \mapsto V, f \text{ bijective, s.t. } \forall (a,b) \in E, (f(a), f(b)) \in E $ ).
This means, in simpler terms, that if we decide to label the DAG, there is no way of permuting the labels such that for all pairs of labels $(a, b)$, the nodes with these labels after the permutation is performed will have an edge between them iff they had one in their original placement. 
An implication of this is that the number of labelled ubergraphs is equal to the number of unlabelled ubergraphs times N factorial.
These observations seem quite promising in elaborating a solution. With a little experience, they suggest that we can count labelled ubergraphs instead of unlabelled ones if we find a restriction that gives us a unique labelling for an unlabelled one. This allows us to count structures with stronger conditions, which may dramatically reduce the difficulty of the problem. This may sound a little bit counterintuitive but examples of such difficulty reductions are everywhere (e.g. the number of groups with N elements vs the number of abelian groups with N elements; the number of unlabelled trees vs the number of unlabelled complete binary trees etc).
Now we basically have to find a way of uniquely labelling a DAG, preferably respecting the topological order (i.e. if there are two nodes labelled $x,y$ where $x < y$ there may not be any path from $y$ to $x$ in the DAG. Yes, I know this feels backwards but we will append to our dp from the "sink" up) so that we may approach a natural DP approach of the form $\text{dp[\#nodes][some additional information]}$ where we could append nodes in order of their label.
Let's look at the ubergraphs with four nodes to get an idea of such a labelling: 

![](graph.jpg)


Now call me a madman, but I think it's a good idea to assign the node $x$ with $g(x)=\emptyset$ the label one and we will denote this with a function $\text{label}$, where $\text{label}(x):=1$. Notice that there may only be one function with out-degree equal to zero, so all nodes can reach this node.
Also, notice that all the ubergraphs in the picture have a node pointing only to the sink node (the one with out-degree zero). The reason behind this is just that there is only one sink and the graph is a DAG. It would also not be an absurd idea to label this node $x$ with two: $g(x)=\{1\} \implies label(x):=2$.
So far, we've managed to find the labels for two nodes, which are imposed anyway by the fact that we want our labels to respect the topological order 🥳 🍾. Now let's find something useful for the general case: suppose we have two nodes $x$ and $y$ such that $x$ is not reachable from $y$, $x$ is not reachable from $y$ and we have found the labels of all their out-neighbors. Which one of $x$ and $y$ should have the smaller label?
There is obviously no direct answer, as so far the definition of what we are looking for is *"something that feels useful"*. Now is the moment of thinking of a way of labelling the nodes in a way that may lead to a DP approach. The way I did this was just write down some random criteria, try elaborating from each and stop when I found something promising; and the one I've found is the following: define the "weight" of a node $x$ as $w(x)=\sum_{v \in g(x)} 2^{\text{label}(v)} $ and just give the smaller label to the one with the smaller weight. Keep in mind this weight function, as it will be a crucial part of our DP.
Let's now wrap it all up and see some pseudocode that will label an unlabelled ubergraph using the criteria we've stated before.


```py
# the procedure is basically Kahn's algorithm ran from the sink "up"
layer = [("the sink node")]
gt = ("the transposed graph")
outdeg = ["the out-degrees of the nodes"]
label = ["empty list of length N"]

label[("the sink node")] = 1
label_index = 2 # at each step we will increment this value to assign new labels

while layer != []: 
    newlayer = [] # we will store here the nodes we have yet to label and have all of their out-neighbors labelled
    for node in layer:
        for v in gt[node]:
            outdeg[v]-= 1
            if outdeg[v] == 0:
                newlayer.append(v)
    sort newlayer by w # we sort the yet to be labelled nodes by the weight criterion, as they are interchangeable in the topological order
    for node in newlayer: # we finally label the new nodes
        label[node] = label_index
        label_index+= 1
    layer = newlayer # we continue from the freshly labelled nodes

```

Now the fact that this procedure works is just proof that our labelling method is a valid one and uniquely determines a labelling for an unlabelled ubergraph (ahem! labelling, labelling labelling labelling!). Now let's look at the proprieties of this labelling:

*  $\text{label}(x) < \text{label}(y) \implies w(x) < w(y) $ 
*  $w(\text{nod})$ basically encodes the adjacency list of $\text{nod}$, because $(\text{nod}, v) \in E$ iff the $(v+1)$-th bit is one in the binary representation of $w(\text{nod})$ 
*  $w(\text{nod}) < 2^{\text{label(nod)}} $

These seem quite promising. After analyzing them, you may notice the following quite mesmerizing thing: any $w$ function respecting the first and last proprieties corresponds to a unique ubergraph, which you can reconstruct using the second propriety. In other words, the first and last proprieties are necessary sufficient conditions, so the number of unlabelled ubergraphs is equal to the number of strictly increasing sequences of length N, for which an element on position $i$ is included in $[0...2^{i})$.
So we've just reduced our problem to counting these sequences, which seems much easier. I won't go into very much detail on how to efficiently compute this, but the DP goes something like this:
$$ \text{dp[length of the sequence][index of the most significant bit of the value of the last element]} $$
$$ \text{dp[0][0]}=\text{dp[1][1]}=1 $$
$$ \text{dp[i][j]}=\sum^{j}_{k=0} \binom{2^{j-1}}{i-k} \text{dp[k][j-1]} $$
*Note that the labels start from zero, not from one as explained before.
This may be computed in $O(N^3)$ by [just coding the recurrence above](https://infoarena.ro/job_detail/2403796?action=view-source), or in $O(N^2 log N)$ by optimizing with FFT, but I have my doubts that this is the best attainable complexity.
