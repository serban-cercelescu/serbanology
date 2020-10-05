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
