def tex_tag_parser(txt):
    [outside, inside] = [0, 1]

    res = ""
    state = outside
    idx = -1
    while True:
        idx+= 1
        if idx >= len(txt):
            break

        # Latex Tag Catching
        try:
            if txt[slice(idx, idx + 3)] == '<$>':
                idx += 2
                res += '<Tex2SVG display="inline" class="tex" tabindex={-1} latex={`'
                state = inside
                continue
            elif txt[slice(idx, idx + 4)] == '<$$>':
                idx += 3
                res += '<Tex2SVG class="tex" tabindex={-1} latex={`'
                state = inside
                continue
            elif txt[slice(idx, idx + 4)] == '</$>':
                idx += 3
                res += '`}/>'
                state = outside
                continue
            elif txt[slice(idx, idx + 5)] == '</$$>':
                idx += 4
                res += '`}/>'
                state = outside
                continue
        except IndexError:
            pass

        if state == outside:
            res += txt[idx]
        elif state == inside:
            if txt[idx] == '\\':
                res += '\\\\';
            else:
                res += txt[idx]

    return res
